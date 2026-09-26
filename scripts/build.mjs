// Builds the static site into dist/.
// Content lives in content/: chapters (Markdown), glossary.json, players.json, updates/*.json.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import { Marked } from 'marked';
import { diagrams } from './diagrams.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = process.env.EDGE_CONTENT ? path.resolve(process.env.EDGE_CONTENT) : path.join(ROOT, 'content');
const SITE = path.join(ROOT, 'site');
const DIST = path.join(ROOT, 'dist');

const SITE_NAME = 'The Edge';
const TAGLINE = 'Artificial intelligence from the ground up. Updated every week.';

// ---------- helpers ----------

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const normKey = (s) => String(s).toLowerCase().trim().replace(/[\s_-]+/g, ' ');

const readJSON = (p, fallback) => (fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : fallback);

const fmtDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

function parseFrontMatter(src) {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(src);
  if (!m) return { data: {}, body: src };
  const data = {};
  for (const line of m[1].split('\n')) {
    const kv = /^(\w+):\s*(.*)$/.exec(line);
    if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, '').trim();
  }
  return { data, body: src.slice(m[0].length) };
}

function writeFile(rel, contents) {
  const out = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, contents);
  builtFiles.push(rel);
}
const builtFiles = [];

// ---------- data ----------

const glossary = readJSON(path.join(CONTENT, 'glossary.json'), []).sort((a, b) =>
  a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }),
);
const players = readJSON(path.join(CONTENT, 'players.json'), []);

const termIndex = new Map();
for (const g of glossary) {
  for (const k of [g.id, g.term, ...(g.aka || [])]) {
    const key = normKey(k);
    if (!termIndex.has(key)) termIndex.set(key, g);
  }
}
function resolveTerm(raw) {
  const key = normKey(raw);
  if (termIndex.has(key)) return termIndex.get(key);
  // Tolerate simple plurals: "agents" -> "agent", "gpus" -> "gpu"
  if (key.endsWith('s') && termIndex.has(key.slice(0, -1))) return termIndex.get(key.slice(0, -1));
  if (key.endsWith('es') && termIndex.has(key.slice(0, -2))) return termIndex.get(key.slice(0, -2));
  return null;
}

const chapters = fs
  .readdirSync(path.join(CONTENT, 'chapters'))
  .filter((f) => f.endsWith('.md'))
  .sort()
  .map((file) => {
    const { data, body } = parseFrontMatter(fs.readFileSync(path.join(CONTENT, 'chapters', file), 'utf8'));
    const slug = file.replace(/^\d+-/, '').replace(/\.md$/, '');
    const words = body.split(/\s+/).length;
    return {
      file,
      slug,
      number: Number(data.number) || Number(file.slice(0, 2)),
      title: data.title || slug,
      subtitle: data.subtitle || '',
      minutes: Number(data.minutes) || Math.max(3, Math.round(words / 230)),
      body,
    };
  });

const updates = fs.existsSync(path.join(CONTENT, 'updates'))
  ? fs
      .readdirSync(path.join(CONTENT, 'updates'))
      .filter((f) => f.endsWith('.json'))
      .sort()
      .reverse()
      .map((f) => readJSON(path.join(CONTENT, 'updates', f)))
  : [];

// ---------- markdown ----------

const BOX_LABELS = {
  why: 'Why this matters to you',
  analogy: 'Analogy',
  room: 'Say this in the room',
  teach: 'Teach it in 60 seconds',
  myth: 'Myth vs. reality',
  key: 'Key takeaways',
  note: 'Note',
};

let ctx = { root: '', usedTerms: new Map(), toc: [], missing: new Set(), linkedOnPage: new Set() };

const md = new Marked({ gfm: true });
md.use({
  extensions: [
    {
      name: 'term',
      level: 'inline',
      start: (src) => src.indexOf('[['),
      tokenizer(src) {
        const m = /^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/.exec(src);
        // Without an explicit label, show the id as words ("machine-learning" -> "machine learning").
        if (m) return { type: 'term', raw: m[0], ref: m[1].trim(), label: (m[2] || m[1].replace(/-/g, ' ')).trim() };
      },
      renderer(tok) {
        const g = resolveTerm(tok.ref);
        if (!g) {
          ctx.missing.add(tok.ref);
          return esc(tok.label);
        }
        ctx.usedTerms.set(g.id, { term: g.term, short: g.short });
        return `<a class="term" href="${ctx.root}glossary.html#${g.id}" data-term="${g.id}">${esc(tok.label)}</a>`;
      },
    },
  ],
  renderer: {
    heading({ tokens, depth, text }) {
      const html = this.parser.parseInline(tokens);
      const id = slugify(text);
      if (depth === 2) ctx.toc.push({ id, text: html.replace(/<[^>]+>/g, '') });
      return `<h${depth} id="${id}">${html}</h${depth}>\n`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href);
      return `<a href="${esc(href)}"${title ? ` title="${esc(title)}"` : ''}${external ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
    },
  },
});

function renderMarkdown(src, { root = '', openDetails = false } = {}) {
  ctx.root = root;
  const blocks = [];
  const lines = src.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const open = /^:::(\w+)[ \t]*(.*)$/.exec(lines[i]);
    const diagram = /^\{\{diagram:([\w-]+)\}\}\s*$/.exec(lines[i].trim());
    if (open) {
      const inner = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ':::') inner.push(lines[i++]);
      const [, type, title] = open;
      const label = title || BOX_LABELS[type] || '';
      const html = `<aside class="box box-${type}"><div class="box-label">${esc(label)}</div><div class="box-body">${md.parse(inner.join('\n'))}</div></aside>`;
      out.push('', `@@BLOCK${blocks.push(html) - 1}@@`, '');
    } else if (diagram) {
      const html = diagrams[diagram[1]] || '';
      if (!html) console.warn(`  ! unknown diagram: ${diagram[1]}`);
      out.push('', `@@BLOCK${blocks.push(html) - 1}@@`, '');
    } else {
      out.push(lines[i]);
    }
  }
  let html = md.parse(out.join('\n'));
  html = html.replace(/<p>@@BLOCK(\d+)@@<\/p>/g, (_, n) => blocks[Number(n)]);
  html = html.replace(/@@BLOCK(\d+)@@/g, (_, n) => blocks[Number(n)]);
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  if (openDetails) html = html.replace(/<details>/g, '<details open>');
  return html;
}

function resetCtx() {
  ctx = { root: '', usedTerms: new Map(), toc: [], missing: ctx.missing, linkedOnPage: new Set() };
}

// ---------- layout ----------

const ICONS = {
  moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
};

function layout({ title, description = TAGLINE, root = '', body, bodyClass = '', active = '', extraHead = '' }) {
  const nav = [
    ['index.html', 'Contents', 'home'],
    ['this-week.html', 'This Week', 'week'],
    ['glossary.html', 'Glossary', 'glossary'],
    ['players.html', 'Players', 'players'],
  ]
    .map(([href, label, key]) => `<a href="${root}${href}"${active === key ? ' aria-current="page"' : ''}>${label}</a>`)
    .join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<title>${esc(title === SITE_NAME ? SITE_NAME : `${title} · ${SITE_NAME}`)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#FAF8F4" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0F1013" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${root}assets/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${root}assets/icon-180.png">
<link rel="manifest" href="${root}manifest.webmanifest">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="The Edge">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${root}assets/style.css?v=${BUILD_ID}">
<script>try{var t=localStorage.getItem('edge.theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}</script>
${extraHead}
</head>
<body class="${bodyClass}" data-root="${root}">
<div class="progress" aria-hidden="true"><span></span></div>
<header class="site-header">
  <div class="header-inner">
    <a class="wordmark" href="${root}index.html"><span class="mark" aria-hidden="true"></span>The Edge</a>
    <nav class="site-nav" aria-label="Main">${nav}</nav>
    <button class="theme-toggle" type="button" aria-label="Toggle dark mode">${ICONS.moon}${ICONS.sun}</button>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="footer-inner">
    <span>The Edge · a living study guide</span>
    <span><a href="${root}book.html">Full book</a> · <a href="${root}the-edge.pdf">PDF</a></span>
  </div>
</footer>
<script src="${root}assets/app.js?v=${BUILD_ID}" defer></script>
</body>
</html>`;
}

const termsScript = () =>
  ctx.usedTerms.size
    ? `<script type="application/json" id="term-data">${JSON.stringify(Object.fromEntries(ctx.usedTerms)).replace(/</g, '\\u003c')}</script>`
    : '';

// ---------- pages ----------

const BUILD_ID = crypto.randomBytes(4).toString('hex');

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

// Static assets
for (const f of fs.readdirSync(path.join(SITE, 'assets'))) {
  fs.mkdirSync(path.join(DIST, 'assets'), { recursive: true });
  fs.copyFileSync(path.join(SITE, 'assets', f), path.join(DIST, 'assets', f));
  builtFiles.push(`assets/${f}`);
}

// Chapters
const chapterHref = (c, root = '') => `${root}chapters/${c.slug}.html`;
const renderedChapters = [];

for (const [i, c] of chapters.entries()) {
  resetCtx();
  const root = '../';
  const html = renderMarkdown(c.body, { root });
  const toc = ctx.toc;
  renderedChapters.push({ ...c, html: null });
  const prev = chapters[i - 1];
  const next = chapters[i + 1];
  const body = `
<div class="chapter-layout">
  <aside class="chapter-toc" aria-label="In this chapter">
    <div class="toc-inner">
      <div class="toc-label">In this chapter</div>
      <ol>${toc.map((t) => `<li><a href="#${t.id}">${esc(t.text)}</a></li>`).join('')}</ol>
    </div>
  </aside>
  <article class="chapter prose" data-slug="${c.slug}">
    <header class="chapter-head">
      <div class="eyebrow">Chapter ${String(c.number).padStart(2, '0')} · ${c.minutes} min read</div>
      <h1>${esc(c.title)}</h1>
      ${c.subtitle ? `<p class="dek">${esc(c.subtitle)}</p>` : ''}
    </header>
    ${html}
    <div class="chapter-end">
      <button class="finish" type="button" data-slug="${c.slug}">${ICONS.check}<span>Mark chapter as finished</span></button>
    </div>
    <nav class="pager" aria-label="Chapters">
      ${prev ? `<a class="pager-prev" href="${prev.slug}.html"><span>Previous</span>${esc(prev.title)}</a>` : '<span></span>'}
      ${next ? `<a class="pager-next" href="${next.slug}.html"><span>Next</span>${esc(next.title)}</a>` : `<a class="pager-next" href="../this-week.html"><span>Next</span>This Week</a>`}
    </nav>
  </article>
</div>
${termsScript()}`;
  writeFile(
    `chapters/${c.slug}.html`,
    layout({ title: c.title, description: c.subtitle, root, body, bodyClass: 'page-chapter', active: 'home' }),
  );
}

// Updates
function renderUpdate(u, root) {
  resetCtx();
  ctx.root = root;
  const items = (u.items || [])
    .map(
      (it) => `
  <section class="update-item">
    <div class="eyebrow">${esc(it.category || '')}</div>
    <h3>${esc(it.headline)}</h3>
    <div class="update-grid">
      <div><div class="mini-label">What happened</div>${md.parse(it.what || '')}</div>
      <div><div class="mini-label">Why it matters</div>${md.parse(it.why || '')}</div>
      ${it.sports_angle ? `<div><div class="mini-label">Sports &amp; betting angle</div>${md.parse(it.sports_angle)}</div>` : ''}
    </div>
    ${it.say ? `<aside class="box box-room"><div class="box-label">Say this in the room</div><div class="box-body"><p>${esc(it.say)}</p></div></aside>` : ''}
    ${
      it.sources?.length
        ? `<div class="sources">Sources: ${it.sources
            .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title || new URL(s.url).hostname)}</a>`)
            .join(' · ')}</div>`
        : ''
    }
  </section>`,
    )
    .join('');
  const concept = u.concept
    ? `<aside class="box box-teach"><div class="box-label">Concept of the week · ${esc(u.concept.title)}</div><div class="box-body">${renderMarkdown(u.concept.body, { root })}</div></aside>`
    : '';
  const terms = u.new_terms?.length
    ? `<section class="update-terms"><h2>New in the glossary</h2><ul class="term-list">${u.new_terms
        .map((t) => `<li><a href="${root}glossary.html#${t.id}">${esc(t.term)}</a><span>${esc(t.short)}</span></li>`)
        .join('')}</ul></section>`
    : '';
  const watch = u.watch?.length
    ? `<section><h2>What to watch next</h2><ul>${u.watch.map((w) => `<li>${esc(w)}</li>`).join('')}</ul></section>`
    : '';
  return `
<article class="update prose-wide">
  <header class="page-head">
    <div class="eyebrow">This Week · ${fmtDate(u.date)}</div>
    <h1>${esc(u.title)}</h1>
    <p class="dek">${esc(u.summary)}</p>
  </header>
  ${items}
  ${concept}
  ${terms}
  ${watch}
</article>`;
}

for (const u of updates) {
  const root = '../';
  const body = renderUpdate(u, root) + archiveList(u.date, root) + termsScript();
  writeFile(`updates/${u.date}.html`, layout({ title: u.title, description: u.summary, root, body, active: 'week' }));
}

function archiveList(current, root) {
  if (updates.length < 2) return '';
  return `<section class="archive prose-wide"><h2>Past weeks</h2><ol class="archive-list">${updates
    .filter((u) => u.date !== current)
    .map((u) => `<li><a href="${root}updates/${u.date}.html"><time>${fmtDate(u.date)}</time><span>${esc(u.title)}</span></a></li>`)
    .join('')}</ol></section>`;
}

{
  const root = '';
  const latest = updates[0];
  const body = latest
    ? renderUpdate(latest, root) + archiveList(latest.date, root) + termsScript()
    : `<article class="prose-wide"><header class="page-head"><div class="eyebrow">This Week</div><h1>The first update is on its way</h1><p class="dek">Every Monday, The Edge researches the week in AI and writes a new chapter: what happened, why it matters, and what it means for sports and betting.</p></header></article>`;
  writeFile('this-week.html', layout({ title: 'This Week', root, body, active: 'week' }));
}

// Glossary
{
  resetCtx();
  const root = '';
  const categories = [...new Set(glossary.map((g) => g.category))];
  const byLetter = new Map();
  for (const g of glossary) {
    const L = /[a-z]/i.test(g.term[0]) ? g.term[0].toUpperCase() : '#';
    if (!byLetter.has(L)) byLetter.set(L, []);
    byLetter.get(L).push(g);
  }
  const byId = new Map(glossary.map((g) => [g.id, g]));
  const entry = (g) => `
    <article class="gloss" id="${g.id}" data-category="${esc(g.category)}" data-search="${esc(
      [g.term, ...(g.aka || []), g.short].join(' ').toLowerCase(),
    )}">
      <h3>${esc(g.term)}${g.aka?.length ? ` <span class="aka">${esc(g.aka.filter((a) => a.toLowerCase() !== g.term.toLowerCase()).slice(0, 3).join(' · '))}</span>` : ''}</h3>
      <p class="gloss-short">${esc(g.short)}</p>
      ${g.explain ? `<p>${esc(g.explain)}</p>` : ''}
      ${g.analogy ? `<p class="gloss-analogy"><span>Analogy</span>${esc(g.analogy)}</p>` : ''}
      <div class="gloss-meta"><span class="chip">${esc(g.category)}</span>${(g.related || [])
        .filter((r) => byId.has(r))
        .map((r) => `<a href="#${r}">${esc(byId.get(r).term)}</a>`)
        .join('')}</div>
    </article>`;
  const body = `
<div class="prose-wide">
  <header class="page-head">
    <div class="eyebrow">Reference</div>
    <h1>Glossary</h1>
    <p class="dek">${glossary.length} terms in plain English${glossary.length > 1 ? `, from “${esc(glossary[0].term)}” to “${esc(glossary[glossary.length - 1].term)}.”` : '.'} New terms are added every week.</p>
  </header>
  <div class="filters" role="search">
    <input class="search" type="search" placeholder="Search terms" aria-label="Search the glossary" autocomplete="off">
    <div class="chips" role="group" aria-label="Filter by category">
      <button class="chip-btn" aria-pressed="true" data-filter="all">All</button>
      ${categories.map((c) => `<button class="chip-btn" aria-pressed="false" data-filter="${esc(c)}">${esc(c)}</button>`).join('')}
    </div>
  </div>
  <nav class="letters" aria-label="Jump to letter">${[...byLetter.keys()].map((L) => `<a href="#letter-${L}">${L}</a>`).join('')}</nav>
  <div class="gloss-list">
    ${[...byLetter.entries()]
      .map(([L, list]) => `<section class="letter-group" id="letter-${L}"><h2 class="letter">${L}</h2>${list.map(entry).join('')}</section>`)
      .join('')}
    <p class="empty" hidden>No terms match. Try a different word.</p>
  </div>
</div>`;
  writeFile('glossary.html', layout({ title: 'Glossary', root, body, bodyClass: 'page-glossary', active: 'glossary' }));
}

// Players
{
  const root = '';
  const LAYERS = [
    ['apps', 'Applications'],
    ['tools', 'Tools & infrastructure'],
    ['models', 'Model labs'],
    ['cloud', 'Cloud'],
    ['chips', 'Chips'],
    ['energy-datacenters', 'Energy & data centers'],
    ['sports', 'Sports, betting & media'],
  ];
  const byId = new Map(players.map((p) => [p.id, p]));
  const card = (p) => `
    <article class="player" id="${p.id}" data-layer="${p.layer}" data-search="${esc(
      [p.name, p.type, p.oneliner].join(' ').toLowerCase(),
    )}">
      <div class="player-top"><h3>${esc(p.name)}</h3><span class="player-status">${esc(p.status || '')}</span></div>
      <div class="player-type">${esc(p.type || '')}${p.hq ? ` · ${esc(p.hq)}` : ''}</div>
      <p class="player-one">${esc(p.oneliner)}</p>
      <p>${esc(p.why)}</p>
      ${p.watch ? `<p class="player-watch"><span>Watch</span>${esc(p.watch)}</p>` : ''}
      ${
        p.related?.length
          ? `<div class="player-rel">${p.related
              .filter((r) => byId.has(r))
              .map((r) => `<a href="#${r}">${esc(byId.get(r).name)}</a>`)
              .join('')}</div>`
          : ''
      }
    </article>`;
  const counts = Object.fromEntries(LAYERS.map(([k]) => [k, players.filter((p) => p.layer === k).length]));
  const body = `
<div class="prose-wide wide">
  <header class="page-head">
    <div class="eyebrow">Reference</div>
    <h1>The Players</h1>
    <p class="dek">Who's who in AI, layer by layer. Tap a layer to filter. Every headline you read involves one of these layers.</p>
  </header>
  <div class="layer-picker" role="group" aria-label="Filter by layer">
    <button class="layer-btn" aria-pressed="true" data-filter="all"><span>All players</span><em>${players.length}</em></button>
    ${LAYERS.filter(([k]) => counts[k])
      .map(([k, label]) => `<button class="layer-btn" aria-pressed="false" data-filter="${k}"><span>${label}</span><em>${counts[k]}</em></button>`)
      .join('')}
  </div>
  <div class="filters"><input class="search" type="search" placeholder="Search companies" aria-label="Search players" autocomplete="off"></div>
  ${LAYERS.filter(([k]) => counts[k])
    .map(
      ([k, label]) =>
        `<section class="player-group" data-group="${k}"><h2>${label}</h2><div class="player-grid">${players
          .filter((p) => p.layer === k)
          .map(card)
          .join('')}</div></section>`,
    )
    .join('')}
  <p class="empty" hidden>No companies match.</p>
</div>`;
  writeFile('players.html', layout({ title: 'The Players', root, body, bodyClass: 'page-players', active: 'players' }));
}

// Home
{
  const root = '';
  const latest = updates[0];
  const main = chapters.filter((c) => !/cheat-sheet/.test(c.slug));
  const cheat = chapters.find((c) => /cheat-sheet/.test(c.slug));
  const body = `
<section class="hero">
  <div class="eyebrow">A living study guide</div>
  <h1 class="hero-title">The Edge</h1>
  <p class="hero-dek">${TAGLINE.replace('. ', '. <br class="br-wide">')}</p>
  <div class="hero-actions">
    <a class="btn btn-primary" data-continue href="${chapterHref(chapters[0])}"><span>Start reading</span>${ICONS.arrow}</a>
    <a class="btn" href="this-week.html">This Week</a>
  </div>
  <div class="reading-progress" data-total="${chapters.length}" hidden>
    <div class="rp-bar"><span></span></div>
    <div class="rp-text"></div>
  </div>
</section>

${
  latest
    ? `<a class="latest" href="this-week.html">
  <div class="eyebrow">This Week · ${fmtDate(latest.date)}</div>
  <h2>${esc(latest.title)}</h2>
  <p>${esc(latest.summary)}</p>
  <span class="latest-more">Read this week's update ${ICONS.arrow}</span>
</a>`
    : ''
}

<section class="contents">
  <div class="section-head"><h2>Contents</h2><span>${chapters.length} chapters · about ${Math.round(chapters.reduce((s, c) => s + c.minutes, 0) / 60 * 2) / 2} hours</span></div>
  <ol class="toc-list">
    ${main
      .map(
        (c) => `<li><a href="${chapterHref(c)}" data-slug="${c.slug}">
      <span class="toc-num">${String(c.number).padStart(2, '0')}</span>
      <span class="toc-body"><span class="toc-title">${esc(c.title)}</span><span class="toc-sub">${esc(c.subtitle)}</span></span>
      <span class="toc-meta"><span class="toc-min">${c.minutes} min</span><span class="toc-check" aria-label="Finished">${ICONS.check}</span></span>
    </a></li>`,
      )
      .join('')}
  </ol>
</section>

<section class="refs">
  ${cheat ? `<a class="ref" href="${chapterHref(cheat)}"><h3>The Cheat Sheet</h3><p>One page to reread before any meeting.</p></a>` : ''}
  <a class="ref" href="glossary.html"><h3>Glossary</h3><p>${glossary.length} terms in plain English.</p></a>
  <a class="ref" href="players.html"><h3>The Players</h3><p>${players.length} companies, layer by layer.</p></a>
  <a class="ref" href="the-edge.pdf"><h3>Take it offline</h3><p>Download the full book as a PDF, or add this site to your home screen.</p></a>
</section>

<p class="dedication">Written for Surena. Study it, use it, teach it.</p>`;
  writeFile('index.html', layout({ title: SITE_NAME, root, body, bodyClass: 'page-home', active: 'home' }));
}

// Full book (print / PDF)
{
  resetCtx();
  const root = '';
  const parts = chapters.map((c) => {
    ctx.toc = [];
    const html = renderMarkdown(c.body, { root, openDetails: true });
    return `<section class="book-chapter" id="${c.slug}">
      <header class="chapter-head"><div class="eyebrow">Chapter ${String(c.number).padStart(2, '0')}</div><h1>${esc(c.title)}</h1>${c.subtitle ? `<p class="dek">${esc(c.subtitle)}</p>` : ''}</header>
      ${html}
    </section>`;
  });
  const gloss = `<section class="book-chapter book-glossary" id="glossary"><header class="chapter-head"><div class="eyebrow">Reference</div><h1>Glossary</h1></header>
    <dl>${glossary.map((g) => `<dt id="g-${g.id}">${esc(g.term)}</dt><dd>${esc(g.short)}${g.explain ? ` ${esc(g.explain)}` : ''}</dd>`).join('')}</dl></section>`;
  const body = `
<div class="book prose">
  <section class="book-cover">
    <div class="eyebrow">A living study guide</div>
    <h1 class="hero-title">The Edge</h1>
    <p class="hero-dek">${TAGLINE}</p>
    <p class="book-edition">Edition of ${fmtDate(new Date().toISOString().slice(0, 10))}</p>
  </section>
  <section class="book-toc"><h2>Contents</h2><ol>${chapters.map((c) => `<li><a href="#${c.slug}">${esc(c.title)}</a></li>`).join('')}<li><a href="#glossary">Glossary</a></li></ol></section>
  ${parts.join('\n')}
  ${gloss}
</div>`;
  writeFile('book.html', layout({ title: 'The Full Book', root, body, bodyClass: 'page-book' }));
}

// PWA: manifest, service worker, robots
writeFile(
  'manifest.webmanifest',
  JSON.stringify(
    {
      name: 'The Edge',
      short_name: 'The Edge',
      description: TAGLINE,
      start_url: './index.html',
      scope: './',
      display: 'standalone',
      background_color: '#FAF8F4',
      theme_color: '#FAF8F4',
      icons: [
        { src: 'assets/icon.svg', sizes: 'any', type: 'image/svg+xml' },
        { src: 'assets/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  ),
);
writeFile('robots.txt', 'User-agent: *\nDisallow: /\n');
const precache = builtFiles.filter((f) => !f.endsWith('.webmanifest')).concat(['./']);
writeFile(
  'sw.js',
  fs
    .readFileSync(path.join(SITE, 'sw.template.js'), 'utf8')
    .replace('__VERSION__', BUILD_ID)
    .replace('__PRECACHE__', JSON.stringify(precache)),
);

if (ctx.missing.size) console.warn(`  ! glossary terms not found (${ctx.missing.size}): ${[...ctx.missing].sort().join(', ')}`);
console.log(`Built ${builtFiles.length} files → dist/ (${chapters.length} chapters, ${glossary.length} terms, ${players.length} players, ${updates.length} updates)`);
