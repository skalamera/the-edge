// Weekly update agent for The Edge.
//
// 1. Research: Claude searches the web for the week's most important AI developments,
//    general and sports/betting/media specific, and writes a sourced research brief.
// 2. Write: Claude turns the brief into a structured update in the book's voice
//    (JSON, validated against a schema).
// 3. Save: writes content/updates/YYYY-MM-DD.json and merges new glossary terms.
//
// Usage: ANTHROPIC_API_KEY=... node scripts/weekly-update.mjs [--dry-run]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'content');
const UPDATES = path.join(CONTENT, 'updates');
const GLOSSARY = path.join(CONTENT, 'glossary.json');
const DRY_RUN = process.argv.includes('--dry-run');

const MODEL = process.env.EDGE_MODEL || 'claude-opus-5';
// Server-side fallback: if the model declines a request, the API re-runs it on a
// recommended fallback model instead of failing the weekly run.
const BETAS = ['server-side-fallback-2026-07-01'];

const client = new Anthropic();

const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date());
const glossary = JSON.parse(fs.readFileSync(GLOSSARY, 'utf8'));
const pastUpdates = fs.existsSync(UPDATES)
  ? fs
      .readdirSync(UPDATES)
      .filter((f) => f.endsWith('.json') && f.slice(0, 10) !== today)
      .sort()
      .reverse()
      .map((f) => JSON.parse(fs.readFileSync(path.join(UPDATES, f), 'utf8')))
  : [];
const lastDate = pastUpdates[0]?.date;
const chapters = fs
  .readdirSync(path.join(CONTENT, 'chapters'))
  .filter((f) => f.endsWith('.md'))
  .sort()
  .map((f) => /^title:\s*(.+)$/m.exec(fs.readFileSync(path.join(CONTENT, 'chapters', f), 'utf8'))?.[1] ?? f);
const styleGuide = fs.readFileSync(path.join(ROOT, 'docs', 'STYLE_GUIDE.md'), 'utf8');

const READER = `The reader is a senior executive in sports betting and sports data: VP of Betting & Gaming for the Americas at Genius Sports (official sports data, betting technology, sports media and advertising). His background is partnerships and sponsorship sales in pro sports, and he teaches sports industry management at Georgetown. He is commercially sharp but not an engineer. He is studying AI so he can lead conversations about it at work, teach it, and stay ahead of what's coming.`;

const CATEGORIES = ['Models', 'Agents', 'Business & deals', 'Infrastructure & chips', 'Policy & safety', 'Sports, betting & media', 'Products & tools'];
const TERM_CATEGORIES = [
  'Foundations',
  'How models work',
  'Agents',
  'Infrastructure & compute',
  'Business & strategy',
  'Safety, risk & policy',
  'Sports, betting & media',
];

// ---------- step 1: research ----------

async function research() {
  const window = lastDate ? `since ${lastDate} (the previous update)` : 'in the past 7 days';
  const recent = pastUpdates
    .slice(0, 4)
    .flatMap((u) => (u.items || []).map((i) => `- (${u.date}) ${i.headline}`))
    .join('\n');

  const system = `You are the research desk for "The Edge", a weekly AI briefing that extends a study guide for one reader.

${READER}

Today is ${today}. Your job is to find the most important developments in AI ${window}, and write a research brief with sources.

What to look for, in priority order:
1. Developments that change how a business person should think about AI: major model releases and capability jumps, agentic AI milestones, big deals, partnerships, funding and acquisitions that shift the landscape, pricing changes, notable enterprise adoption stories.
2. AI in sports, betting and sports media: sportsbooks, leagues, sports data companies (Genius Sports, Sportradar, Stats Perform and others), broadcasters, integrity and responsible-gaming uses, prediction markets where AI is involved, regulators' statements on AI in gambling. Always search for this category specifically, even in quiet weeks.
3. Policy, regulation, safety and chips/infrastructure news that a well-informed executive would be expected to know.

Rules:
- Only include items you verified from sources dated within the window. Prefer primary sources (company announcements, filings, regulators) and top-tier reporting.
- Skip hype, rumor, minor product tweaks and funding rounds that don't change the picture.
- Aim for 5 to 7 items total, including at least one sports/betting/media item if anything real happened. If nothing meaningful happened in sports, say so rather than stretching.
- For each item record: what happened (facts, dates, numbers exactly as reported), why it matters, any sports/betting angle, and the source URLs you actually read.
- Also note one fundamental concept from the week's news that would be worth teaching (e.g., "why inference costs are falling"), and 2 to 4 things to watch next week.

Already covered in recent weeks (don't repeat unless there is a genuinely new development):
${recent || '- (nothing yet, this is the first update)'}

Finish with the complete brief between <brief> and </brief> tags.`;

  const messages = [{ role: 'user', content: `Research the AI news ${window} and write the brief.` }];
  const urls = new Set();
  let text = '';

  for (let turn = 0; turn < 8; turn++) {
    const stream = client.beta.messages.stream({
      model: MODEL,
      max_tokens: 64000,
      betas: BETAS,
      fallbacks: 'default',
      thinking: { type: 'adaptive' },
      output_config: { effort: 'high' },
      system,
      tools: [
        { type: 'web_search_20260209', name: 'web_search', max_uses: 25 },
        { type: 'web_fetch_20260209', name: 'web_fetch', max_uses: 15 },
      ],
      messages,
    });
    const msg = await stream.finalMessage();
    logUsage('research', msg);
    collectUrls(msg.content, urls);
    text += msg.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('');

    if (msg.stop_reason === 'refusal') throw new Error(`Research step was declined: ${JSON.stringify(msg.stop_details)}`);
    if (msg.stop_reason === 'pause_turn') {
      messages.push({ role: 'assistant', content: msg.content });
      continue;
    }
    break;
  }

  const brief = /<brief>([\s\S]*?)<\/brief>/.exec(text)?.[1]?.trim();
  if (!brief) throw new Error('Research step finished without a <brief> block.');
  // Only URLs that came back from real search/fetch results count as verified sources.
  return { brief, urls };
}

function collectUrls(content, urls) {
  for (const block of content) {
    if (block.type === 'web_search_tool_result' && Array.isArray(block.content)) {
      for (const r of block.content) if (r.url) urls.add(normUrl(r.url));
    }
    if (block.type === 'web_fetch_tool_result' && block.content?.url) urls.add(normUrl(block.content.url));
    if (block.type === 'text') for (const c of block.citations || []) if (c.url) urls.add(normUrl(c.url));
  }
}
const normUrl = (u) =>
  u
    .trim()
    .replace(/[?#].*$/, '')
    .replace(/[.,;]+$/, '')
    .replace(/\/$/, '')
    .replace(/^https?:\/\/(www\.)?/i, '')
    .toLowerCase();

// ---------- step 2: write ----------

const str = { type: 'string' };
const UPDATE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['title', 'summary', 'items', 'concept', 'new_terms', 'watch'],
  properties: {
    title: { type: 'string', description: 'Headline for the week, 4 to 10 words, no clickbait.' },
    summary: { type: 'string', description: 'The week in one breath: 2 to 3 sentences.' },
    items: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['headline', 'category', 'what', 'why', 'sports_angle', 'say', 'sources'],
        properties: {
          headline: str,
          category: { type: 'string', enum: CATEGORIES },
          what: { type: 'string', description: 'What happened, 2 to 4 plain-English sentences. Markdown allowed; link glossary terms as [[id]].' },
          why: { type: 'string', description: 'Why it matters to him, 2 to 4 sentences.' },
          sports_angle: { type: 'string', description: 'The sports, betting or media angle in 1 to 3 sentences, or an empty string if there genuinely is none.' },
          say: { type: 'string', description: 'One natural sentence he could say in a meeting.' },
          sources: {
            type: 'array',
            items: { type: 'object', additionalProperties: false, required: ['title', 'url'], properties: { title: str, url: str } },
          },
        },
      },
    },
    concept: {
      type: 'object',
      additionalProperties: false,
      required: ['title', 'body'],
      properties: {
        title: str,
        body: { type: 'string', description: 'A mini-lesson of 120 to 220 words in Markdown that teaches one fundamental concept surfaced by this week’s news, ideally with a sports or betting analogy.' },
      },
    },
    new_terms: {
      type: 'array',
      description: 'Zero to four genuinely new glossary terms that appeared in this week’s news and are not already in the glossary.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'term', 'aka', 'category', 'short', 'explain', 'analogy', 'related'],
        properties: {
          id: { type: 'string', description: 'lowercase, hyphens instead of spaces' },
          term: str,
          aka: { type: 'array', items: str },
          category: { type: 'string', enum: TERM_CATEGORIES },
          short: str,
          explain: str,
          analogy: { type: 'string', description: 'Optional analogy, or empty string.' },
          related: { type: 'array', items: str, description: 'ids of existing glossary terms' },
        },
      },
    },
    watch: { type: 'array', items: str, description: '2 to 4 things to watch next week, one sentence each.' },
  },
};

async function write(brief) {
  const system = `You write the weekly "This Week" update for "The Edge", a living AI study guide.

${READER}

Follow the Voice rules of the book's style guide below. The JSON schema you must return replaces the chapter format; ignore the chapter-specific formatting rules except the [[glossary-id]] link syntax, which you should use for the first mention of key terms in "what" and "why" fields and in the concept body.

<style_guide>
${styleGuide}
</style_guide>

The book's chapters, for context (the concept of the week can reinforce one): ${chapters.join(' | ')}

Existing glossary ids (link to these; don't propose them as new terms): ${glossary.map((g) => g.id).join(', ')}

Rules:
- Use only facts from the research brief. Never add facts, numbers or sources that aren't in it.
- Every item must cite at least one source URL copied exactly from the brief.
- Order items by importance to this reader. Keep 4 to 7 items.
- Write so he can understand each item even if he skipped last week.`;

  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 32000,
    betas: BETAS,
    fallbacks: 'default',
    thinking: { type: 'adaptive' },
    output_config: { effort: 'high', format: { type: 'json_schema', schema: UPDATE_SCHEMA } },
    system,
    messages: [{ role: 'user', content: `Today is ${today}. Here is this week's research brief:\n\n<brief>\n${brief}\n</brief>\n\nWrite the update.` }],
  });
  const msg = await stream.finalMessage();
  logUsage('write', msg);
  if (msg.stop_reason === 'refusal') throw new Error(`Write step was declined: ${JSON.stringify(msg.stop_details)}`);
  if (msg.stop_reason === 'max_tokens') throw new Error('Write step hit max_tokens.');
  const text = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
  return JSON.parse(text);
}

// ---------- step 3: validate & save ----------

function validate(update, urls) {
  const items = [];
  for (const it of update.items || []) {
    const sources = (it.sources || []).filter((s) => {
      try {
        new URL(s.url);
      } catch {
        return false;
      }
      return urls.has(normUrl(s.url));
    });
    if (!sources.length) {
      console.warn(`  - dropped item without a verified source: ${it.headline}`);
      continue;
    }
    items.push({ ...it, sources, sports_angle: it.sports_angle?.trim() || undefined });
  }
  if (!items.length) throw new Error('No items survived source verification.');

  const taken = new Set();
  for (const g of glossary) for (const k of [g.id, g.term, ...(g.aka || [])]) taken.add(normKey(k));
  const newTerms = [];
  for (const t of update.new_terms || []) {
    const id = t.id.toLowerCase().trim().replace(/[\s_]+/g, '-');
    const keys = [id, t.term, ...(t.aka || [])].map(normKey);
    if (keys.some((k) => taken.has(k))) continue;
    keys.forEach((k) => taken.add(k));
    newTerms.push({ ...t, id, analogy: t.analogy?.trim() || undefined });
  }
  const ids = new Set([...glossary.map((g) => g.id), ...newTerms.map((t) => t.id)]);
  for (const t of newTerms) t.related = (t.related || []).filter((r) => ids.has(r) && r !== t.id);

  return { date: today, title: update.title, summary: update.summary, items, concept: update.concept, new_terms: newTerms, watch: update.watch || [] };
}
const normKey = (s) => String(s).toLowerCase().trim().replace(/[\s_-]+/g, ' ');

const usage = { input: 0, output: 0, searches: 0 };
function logUsage(step, msg) {
  const u = msg.usage || {};
  usage.input += (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0);
  usage.output += u.output_tokens || 0;
  usage.searches += u.server_tool_use?.web_search_requests || 0;
  console.log(`  ${step}: stop=${msg.stop_reason} in=${u.input_tokens} out=${u.output_tokens} model=${msg.model}`);
}

// ---------- main ----------

console.log(`The Edge weekly update for ${today} (model ${MODEL})`);
console.log('Researching…');
const { brief, urls } = await research();
console.log(`  brief: ${brief.length} chars, ${urls.size} source URLs seen`);
console.log('Writing…');
const draft = await write(brief);
const update = validate(draft, urls);

console.log(`Update: "${update.title}" · ${update.items.length} items · ${update.new_terms.length} new terms`);
console.log(`Usage: ${usage.input} input tokens, ${usage.output} output tokens, ${usage.searches} web searches`);

if (DRY_RUN) {
  console.log(JSON.stringify(update, null, 2));
} else {
  fs.mkdirSync(UPDATES, { recursive: true });
  fs.writeFileSync(path.join(UPDATES, `${today}.json`), `${JSON.stringify(update, null, 2)}\n`);
  if (update.new_terms.length) {
    const merged = [...glossary, ...update.new_terms.map((t) => ({ ...t, added: today }))];
    fs.writeFileSync(GLOSSARY, `${JSON.stringify(merged, null, 2)}\n`);
  }
  console.log(`Saved content/updates/${today}.json`);
}
