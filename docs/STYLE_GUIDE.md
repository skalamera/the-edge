# The Edge — Writing Style Guide

This guide governs every chapter of **The Edge**, a living AI study guide, and the weekly updates that extend it.

## Who the reader is

The reader is a senior sports-business executive, **VP of Betting & Gaming for the Americas at Genius Sports** (official sports data, betting technology, and sports media/advertising). He built his career in partnership and sponsorship sales with the Washington Commanders, NASCAR and the Miami Dolphins / Hard Rock Stadium. He holds a Master's in Sports Industry Management from Georgetown, where he is now adjunct faculty. His undergraduate degree is in political science and legal policy. He is interested in due diligence and investing.

- He is **commercially sharp and not an engineer**. Never talk down to him, and never assume he knows a technical term without explaining it first.
- He wants to **understand, not memorize**. He wants to teach others and hold his own in any business room where AI comes up (short of deep product/engineering specialists).
- He reads on the couch and on planes, often on a phone. Keep paragraphs short.
- He responds to direct, confident, motivating framing (think Tony Robbins or Gary Vee energy, dialed to 30% — confident, not cheesy). He wants an **edge**.

## Voice

- Plain English. Short sentences. Active voice. Second person ("you").
- Explain every concept **from the ground up** before using it. Build each idea on the previous one.
- Lead with the intuition, then the mechanism, then why it matters commercially.
- **Use sports, betting, sponsorship and media analogies** wherever they genuinely clarify: odds-making, live trading, player tracking, scouting, the draft, film study, a sportsbook's risk desk, sponsorship activation, media rights. Don't force them where they don't fit.
- Be honest about uncertainty and hype. Separate "what's real today" from "what's promised." He'll lose credibility repeating hype; he gains credibility by being the calm, accurate person in the room.
- No filler, no throat-clearing ("In today's fast-paced world…"). No emoji. Avoid the words "delve", "landscape", "leverage" (as a verb), "robust", "game-changer", "revolutionize".
- Numbers: use them where they make things concrete, but prefer durable facts. If a figure is time-sensitive (market share, valuations, model rankings, funding), say "as of mid-2026" or similar. Never invent a number. If unsure, describe qualitatively.
- About Genius Sports specifically: use only public information and describe it at a general level. Never imply knowledge of internal strategy or roadmap. Frame company-specific points as "questions worth asking" or "how to think about it."

## Format (Markdown, with a few custom blocks)

Each chapter file starts with front matter:

```
---
number: 3
title: How LLMs Actually Work
subtitle: One sentence that promises the payoff of this chapter.
minutes: 15
---
```

Then the body in Markdown. Use `##` for sections and `###` for sub-sections (never `#`, the title renders automatically). Keep sections short, 3–7 per chapter.

### Custom blocks

Use these fenced blocks (three colons, a type, an optional title). The inner text is Markdown.

```
:::why Why this matters to you
Two to four sentences connecting this chapter to his career and the rooms he's in. Put one at the top of every chapter, right after the intro paragraph.
:::

:::analogy The sportsbook analogy
An extended analogy that makes a concept click.
:::

:::room Say this in the room
- 2–4 bullet lines he could actually say out loud in a leadership meeting or on a partner call. Natural, confident, specific. Not jargon salad.
:::

:::teach Teach it in 60 seconds
How he'd explain the chapter's core idea to a Georgetown class or a colleague: a hook, the key point, one example. 4–6 sentences.
:::

:::myth Myth vs. reality
**Myth:** …
**Reality:** …
:::

:::key Key takeaways
- 3–6 bullets summarizing the chapter.
:::
```

Required per chapter: one `:::why` near the top, at least one `:::analogy`, at least one `:::room`, exactly one `:::teach` near the end, and one `:::key` as the very last block. `:::myth` is optional (use 1–2 where a common misconception exists).

### Glossary links

When you use a term that belongs in the glossary, link it the first time it appears in a chapter with double brackets: `[[inference]]`, `[[large language model]]`, `[[agent|agents]]` (the part after `|` is the display text). Use lowercase ids. Only link the first occurrence per chapter. The glossary lives in `content/glossary.json`; the id is the term's `id` field (lowercase, hyphens for spaces are also accepted: `[[context-window]]` and `[[context window]]` both work).

### Diagrams

Don't try to draw diagrams. Where a diagram would help, insert a placeholder line on its own:

```
{{diagram:stack}}
```

Available diagram ids: `stack` (chips → cloud → models → apps layers), `llm-pipeline` (training data → training → model → prompt → inference → output), `agent-loop` (goal → think → act with tools → observe → repeat), `ai-nesting` (AI ⊃ machine learning ⊃ deep learning ⊃ generative AI / LLMs), `timeline` (history of AI milestones). Use each at most once in the whole book, in the chapter where it fits best.

### Self-check questions

End every chapter (right before `:::key`) with a section:

```
## Check yourself
1. A question that tests understanding, not recall. ("Your CFO asks why the AI bill went up when usage doubled. What do you tell them?")
2. …
3. …
```

3–4 questions. Write the answer to each in a collapsible details element directly under the question:

```
<details><summary>Answer</summary>

The answer, in 2–4 sentences.

</details>
```

## Length

Target 2,000–3,200 words per chapter. Longer is not better. Every paragraph must earn its place.
