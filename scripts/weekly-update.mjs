// Weekly update agent for The Edge (Gemini).
//
// 1. Research: Gemini searches the web (Google Search grounding + URL context) for the
//    week's most important AI developments, general and sports/betting/media specific,
//    and writes a research brief. Every source it actually used becomes a numbered,
//    verified source; claims in the brief are tagged [n] from Google's grounding data.
// 2. Write: Gemini turns the brief into a structured update in the book's voice
//    (JSON, validated against a schema). It cites sources by number only, so it can't
//    invent a URL.
// 3. Save: writes content/updates/YYYY-MM-DD.json and merges new glossary terms.
//
// Usage: GEMINI_API_KEY=... node scripts/weekly-update.mjs [--dry-run]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(ROOT, 'content');
const UPDATES = path.join(CONTENT, 'updates');
const GLOSSARY = path.join(CONTENT, 'glossary.json');
const DRY_RUN = process.argv.includes('--dry-run');

const MODEL = process.env.EDGE_MODEL || 'gemini-3.8-flash';
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set.');
  process.exit(1);
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date());
// A re-run on the same day replaces that day's additions rather than treating them as existing terms.
const glossary = JSON.parse(fs.readFileSync(GLOSSARY, 'utf8')).filter((g) => g.added !== today);
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
  .map((f) => /^title:\s*(.+)$/m.exec(fs.readFileSync(path.join(CONTENT, 'chapters', f), 'utf8'))?.[1]?.replace(/^"|"$/g, '') ?? f);
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

const usage = { input: 0, output: 0, searches: 0 };
function logUsage(step, res) {
  const u = res.usageMetadata || {};
  usage.input += u.promptTokenCount || 0;
  usage.output += (u.candidatesTokenCount || 0) + (u.thoughtsTokenCount || 0);
  const queries = res.candidates?.[0]?.groundingMetadata?.webSearchQueries?.length || 0;
  usage.searches += queries;
  console.log(`  ${step}: finish=${res.candidates?.[0]?.finishReason} in=${u.promptTokenCount} out=${u.candidatesTokenCount} thinking=${u.thoughtsTokenCount ?? 0} searches=${queries}`);
}

async function generate(step, request, attempts = 3) {
  for (let i = 1; ; i++) {
    try {
      const res = await ai.models.generateContent(request);
      logUsage(step, res);
      const finish = res.candidates?.[0]?.finishReason;
      if (!res.text) throw new Error(`${step}: empty response (finish reason ${finish}, block ${res.promptFeedback?.blockReason ?? 'none'})`);
      if (finish === 'MAX_TOKENS') throw new Error(`${step}: hit the output token limit`);
      return res;
    } catch (err) {
      const status = err?.status ?? err?.code;
      const retryable = !status || status === 429 || status >= 500;
      if (i >= attempts || !retryable) throw err;
      console.warn(`  ${step}: attempt ${i} failed (${err.message}); retrying`);
      await new Promise((r) => setTimeout(r, 15000 * i));
    }
  }
}

// ---------- step 1: research ----------

async function research() {
  const window = lastDate ? `since ${lastDate} (the previous update)` : 'in the past 7 days';
  const recent = pastUpdates
    .slice(0, 4)
    .flatMap((u) => (u.items || []).map((i) => `- (${u.date}) ${i.headline}`))
    .join('\n');

  const prompt = `You are the research desk for "The Edge", a weekly AI briefing that extends a study guide for one reader.

${READER}

Today is ${today}. Find the most important developments in AI ${window} and write a research brief.

What to look for, in priority order:
1. Developments that change how a business person should think about AI: major model releases and capability jumps, agentic AI milestones, big deals, partnerships, funding and acquisitions that shift the landscape, pricing changes, notable enterprise adoption stories.
2. AI in sports, betting and sports media: sportsbooks, leagues, sports data companies (Genius Sports, Sportradar, Stats Perform and others), broadcasters, integrity and responsible-gaming uses, prediction markets where AI is involved, regulators' statements on AI in gambling. Always search this category specifically, even in quiet weeks.
3. Policy, regulation, safety and chips/infrastructure news that a well-informed executive would be expected to know.

Rules:
- Search thoroughly: run many searches across the categories above before writing.
- Only include items you verified in sources dated within the window. Prefer primary sources (company announcements, filings, court documents, regulators) and established news outlets and trade press. Never rely on social media posts, forums or video pages.
- Skip hype, rumor, minor product tweaks and funding rounds that don't change the picture.
- Aim for 5 to 7 items, including at least one sports/betting/media item if anything real happened. If nothing meaningful happened in sports, say so rather than stretching.
- For each item: what happened (facts, dates, numbers exactly as reported), why it matters, and any sports/betting angle.
- Then note one fundamental concept from the week's news worth teaching (for example, why inference costs are falling), and 2 to 4 things to watch next week.

Already covered in recent weeks (don't repeat unless there is a genuinely new development):
${recent || '- (nothing yet, this is the first update)'}

Write the brief as plain text with a short heading per item.`;

  const res = await generate('research', {
    model: MODEL,
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }, { urlContext: {} }],
      thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
      maxOutputTokens: 32768,
    },
  });

  const candidate = res.candidates[0];
  const meta = candidate.groundingMetadata || {};
  const chunks = meta.groundingChunks || [];

  // Resolve Google's grounding redirect links to the real article URLs.
  const sources = [];
  const chunkToSource = new Map();
  const resolved = await Promise.all(chunks.map((c) => (c.web?.uri ? resolveUrl(c.web.uri) : null)));
  chunks.forEach((c, i) => {
    const url = resolved[i];
    if (!url || BLOCKED_HOSTS.test(hostname(url))) return;
    let n = sources.findIndex((s) => s.url === url);
    if (n === -1) n = sources.push({ id: sources.length + 1, title: c.web.title || hostname(url), url }) - 1;
    chunkToSource.set(i, sources[n].id);
  });
  for (const m of candidate.urlContextMetadata?.urlMetadata || []) {
    if (
      m.urlRetrievalStatus === 'URL_RETRIEVAL_STATUS_SUCCESS' &&
      m.retrievedUrl &&
      !BLOCKED_HOSTS.test(hostname(m.retrievedUrl)) &&
      !sources.some((s) => s.url === m.retrievedUrl)
    ) {
      sources.push({ id: sources.length + 1, title: hostname(m.retrievedUrl), url: m.retrievedUrl });
    }
  }

  const brief = addCitations(res.text, meta.groundingSupports || [], chunkToSource);
  return { brief, sources };
}

async function resolveUrl(uri) {
  if (!/grounding-api-redirect/.test(uri)) return uri;
  try {
    const res = await fetch(uri, { redirect: 'manual', signal: AbortSignal.timeout(10000) });
    const loc = res.headers.get('location');
    if (loc && /^https?:\/\//.test(loc)) return loc;
    const followed = await fetch(uri, { redirect: 'follow', signal: AbortSignal.timeout(15000) });
    return followed.url && !/grounding-api-redirect/.test(followed.url) ? followed.url : null;
  } catch {
    return null;
  }
}

// Social and user-generated pages aren't acceptable sources for a briefing.
const BLOCKED_HOSTS = /(^|\.)(facebook|fb|instagram|x|twitter|threads|tiktok|reddit|youtube|youtu|linkedin|pinterest|quora)\.(com|net|be)$/i;
const MAX_SOURCES_PER_ITEM = 3;

const hostname = (u) => {
  try {
    return new URL(u).hostname.replace(/^www\./, '');
  } catch {
    return u;
  }
};

// Insert [n] markers after each grounded segment. Grounding indices are UTF-8 byte offsets.
function addCitations(text, supports, chunkToSource) {
  const inserts = [];
  for (const s of supports) {
    const end = s.segment?.endIndex;
    const ids = [...new Set((s.groundingChunkIndices || []).map((i) => chunkToSource.get(i)).filter(Boolean))];
    if (end != null && ids.length) inserts.push({ end, tag: ` [${ids.join('][')}]` });
  }
  inserts.sort((a, b) => b.end - a.end);
  let out = Buffer.from(text, 'utf8');
  for (const { end, tag } of inserts) {
    if (end > out.length) continue;
    out = Buffer.concat([out.subarray(0, end), Buffer.from(tag, 'utf8'), out.subarray(end)]);
  }
  return out.toString('utf8');
}

// ---------- step 2: write ----------

const str = { type: 'string' };
const UPDATE_SCHEMA = {
  type: 'object',
  required: ['title', 'summary', 'items', 'concept', 'new_terms', 'watch'],
  properties: {
    title: { type: 'string', description: 'Headline for the week, 4 to 10 words, no clickbait.' },
    summary: { type: 'string', description: 'The week in one breath: 2 to 3 sentences.' },
    items: {
      type: 'array',
      items: {
        type: 'object',
        required: ['headline', 'category', 'what', 'why', 'sports_angle', 'say', 'source_ids'],
        properties: {
          headline: str,
          category: { type: 'string', enum: CATEGORIES },
          what: { type: 'string', description: 'What happened, 2 to 4 plain-English sentences. Markdown allowed; link glossary terms as [[id]].' },
          why: { type: 'string', description: 'Why it matters to him, 2 to 4 sentences.' },
          sports_angle: { type: 'string', description: 'The concrete sports, betting or media angle in 1 to 3 sentences, or an empty string. Leave it empty unless the connection is direct and factual.' },
          say: { type: 'string', description: 'One natural sentence he could say in a meeting.' },
          source_ids: { type: 'array', items: { type: 'integer' }, description: 'The 1 to 3 best sources (by number) that directly report this item, strongest first.' },
        },
      },
    },
    concept: {
      type: 'object',
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

async function write(brief, sources) {
  const systemInstruction = `You write the weekly "This Week" update for "The Edge", a living AI study guide.

${READER}

Follow the Voice rules of the book's style guide below. The JSON schema you must return replaces the chapter format; ignore the chapter-specific formatting rules except the [[glossary-id]] link syntax, which you should use for the first mention of key terms in "what" and "why" fields and in the concept body.

<style_guide>
${styleGuide}
</style_guide>

The book's chapters, for context (the concept of the week can reinforce one): ${chapters.join(' | ')}

Existing glossary ids (link to these with [[id]]; don't propose them as new terms): ${glossary.map((g) => g.id).join(', ')}

Rules:
- Use only facts from the research brief. Never add facts or numbers that aren't in it.
- Cite sources only by their numbers from the numbered source list: the 1 to 3 that directly report the item, strongest (primary or most authoritative) first. Never attach a source that is only loosely related (the [n] markers in the brief show which sources support which claims).
- Sports angle: for items in the "Sports, betting & media" category, explain the practical consequence for the industry. For every other item, sports_angle MUST be an empty string unless the brief itself reports a sports, betting or media connection for that news (for example, a company explicitly marketing a product for live sports). Never speculate about how sports companies might use a technology, and never make technical claims about betting systems. When in doubt, leave it empty; the "why" field already covers relevance.
- Prefer items that matter to a sports-betting executive or that any informed executive must know. Skip consumer gadget news unless it's a major platform shift.
- Order items by importance to this reader. Keep 4 to 7 items.
- Write so he can understand each item even if he skipped last week.`;

  const sourceList = sources.map((s) => `[${s.id}] ${s.title} — ${s.url}`).join('\n');
  const res = await generate('write', {
    model: MODEL,
    contents: `Today is ${today}. Here is this week's research brief:\n\n<brief>\n${brief}\n</brief>\n\nNumbered sources:\n${sourceList}\n\nWrite the update.`,
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
      responseJsonSchema: UPDATE_SCHEMA,
      thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
      maxOutputTokens: 32768,
    },
  });
  return JSON.parse(res.text);
}

// ---------- step 3: validate & save ----------

function validate(update, sources) {
  const byId = new Map(sources.map((s) => [s.id, s]));
  const items = [];
  for (const it of update.items || []) {
    const cited = [...new Set(it.source_ids || [])]
      .map((n) => byId.get(n))
      .filter(Boolean)
      .slice(0, MAX_SOURCES_PER_ITEM);
    if (!cited.length) {
      console.warn(`  - dropped item without a verified source: ${it.headline}`);
      continue;
    }
    const { source_ids, ...rest } = it;
    items.push({
      ...rest,
      category: CATEGORIES.includes(it.category) ? it.category : 'Business & deals',
      sports_angle: it.sports_angle?.trim() || undefined,
      sources: cited.map(({ title, url }) => ({ title, url })),
    });
  }
  if (!items.length) throw new Error('No items survived source verification.');

  const taken = new Set();
  for (const g of glossary) for (const k of [g.id, g.term, ...(g.aka || [])]) taken.add(normKey(k));
  const newTerms = [];
  for (const t of update.new_terms || []) {
    if (!t.id || !t.term || !t.short) continue;
    const id = t.id.toLowerCase().trim().replace(/[\s_]+/g, '-');
    const keys = [id, t.term, ...(t.aka || [])].map(normKey);
    if (keys.some((k) => taken.has(k))) continue;
    keys.forEach((k) => taken.add(k));
    newTerms.push({
      ...t,
      id,
      category: TERM_CATEGORIES.includes(t.category) ? t.category : 'Foundations',
      analogy: t.analogy?.trim() || undefined,
    });
  }
  const ids = new Set([...glossary.map((g) => g.id), ...newTerms.map((t) => t.id)]);
  for (const t of newTerms) t.related = (t.related || []).filter((r) => ids.has(r) && r !== t.id);

  return { date: today, title: update.title, summary: update.summary, items, concept: update.concept, new_terms: newTerms, watch: update.watch || [] };
}
const normKey = (s) => String(s).toLowerCase().trim().replace(/[\s_-]+/g, ' ');

// ---------- main ----------

console.log(`The Edge weekly update for ${today} (model ${MODEL})`);
console.log('Researching…');
const { brief, sources } = await research();
console.log(`  brief: ${brief.length} chars, ${sources.length} verified sources`);
if (!sources.length) throw new Error('Research returned no verifiable sources.');
console.log('Writing…');
const draft = await write(brief, sources);
const update = validate(draft, sources);

console.log(`Update: "${update.title}" · ${update.items.length} items · ${update.new_terms.length} new terms`);
console.log(`Usage: ${usage.input} input tokens, ${usage.output} output tokens, ${usage.searches} search queries`);

if (DRY_RUN) {
  console.log(JSON.stringify(update, null, 2));
} else {
  fs.mkdirSync(UPDATES, { recursive: true });
  fs.writeFileSync(path.join(UPDATES, `${today}.json`), `${JSON.stringify(update, null, 2)}\n`);
  const merged = [...glossary, ...update.new_terms.map((t) => ({ ...t, added: today }))].sort((a, b) =>
    a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }),
  );
  fs.writeFileSync(GLOSSARY, `${JSON.stringify(merged, null, 2)}\n`);
  console.log(`Saved content/updates/${today}.json`);
}
