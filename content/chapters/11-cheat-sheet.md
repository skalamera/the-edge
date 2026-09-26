---
number: 11
title: The Cheat Sheet
subtitle: One page to reread in the car before any meeting.
minutes: 5
---

The whole book on one page. Two minutes in the car, and you walk in as the calmest, most accurate person in the room.

## 20 concepts, one line each

### How it works

- **[[machine learning|Machine learning]]:** Software that learns patterns from examples instead of following hand-written rules.
- **[[generative ai|Generative AI]]:** Machine learning that creates new content (text, images, audio, video, code) rather than just scoring or sorting.
- **[[large language model|Large language model (LLM)]]:** A model trained on vast amounts of text to predict the next token. The engine inside ChatGPT, Claude and Gemini.
- **[[token|Token]]:** The chunk of text a model reads, writes and bills by; roughly three-quarters of an English word.
- **[[training|Training]]:** The huge up-front build. Pre-training on oceans of text, then post-training to turn it into a helpful assistant.
- **[[inference|Inference]]:** Running the model on a request. It costs compute every single time, so AI has a real marginal cost.
- **[[context window|Context window]]:** How much the model can hold in view at once. What's outside it, the model can't see.
- **[[hallucination|Hallucination]]:** Fluent, confident and wrong. A by-product of prediction, reduced but never fully eliminated.
- **[[reasoning model|Reasoning model]]:** Spends extra compute "thinking" before it answers. Better on hard problems, slower and pricier.
- **[[multimodal|Multimodal]]:** Takes in and produces images, audio and video, not just text.

### Making it useful

- **[[rag|RAG]]:** Short for retrieval-augmented generation. The model looks up your documents first, then answers from them. The standard way to make AI know your stuff.
- **[[fine-tuning|Fine-tuning]]:** Extra training on your examples to shape style or specialist behavior. Rarely the first fix for missing knowledge.
- **[[agent|Agent]]:** AI that pursues a goal by planning, using tools, checking results and repeating. It does, not just answers.
- **[[mcp|MCP]]:** The Model Context Protocol, a common plug that connects AI to tools and data. Think USB for AI.
- **[[evals|Evals]]:** Structured tests of whether a system does *your* task well enough. The line between a demo and a deployment.
- **[[prompt injection|Prompt injection]]:** Hidden instructions in content an AI reads that trick it into misbehaving. The top security risk for agents.

### The business and the big picture

- **[[ai stack|The stack]]:** Energy → chips → cloud → models → tools → apps. Name the layer before you react to a headline.
- **[[compute|Compute]]:** The processing power that trains and runs models, mostly Nvidia [[gpu|GPUs]], often rented from [[hyperscaler|hyperscalers]] like AWS, Azure and Google Cloud. The scarce input.
- **[[open-weight|Open-weight vs. closed]]:** Models you can download and run yourself (such as DeepSeek or Alibaba's Qwen) vs. models you rent by the token (GPT, Claude, Gemini).
- **[[agi|AGI]]:** AI that matches people across most thinking work. No agreed definition or date, so ask "whose definition?"

## Sound smart: 10 lines that land

| Say this | Use it when |
|---|---|
| "Which layer of the stack is this, and who's paying whom?" | Any AI headline or partnership announcement. |
| "Is our edge the model or the data? Models get copied; proprietary data is the real [[moat]]." | Strategy and build-vs-buy discussions. |
| "What does it cost per task at our volume, not in the demo?" | Vendor pitches and budget reviews. |
| "What's the eval? How often is it right on our real cases, and what happens when it's wrong?" | Before any pilot goes live. |
| "Is it answering from our documents, or from memory?" | Someone trusts an AI answer about your business. |
| "Where's the [[human in the loop]], and what can the agent do without asking?" | Any agent or automation proposal. |
| "Let's prove it on one painful, measurable workflow first." | Someone wants to buy an "AI platform." |
| "Speed is part of the product. What's the [[latency]] on our busiest day, not a quiet Tuesday?" | Anything real-time or customer-facing. |
| "Prices for this capability fall every year. Let's not lock in today's rate for three years." | Contract negotiations. |
| "The capability is real. The timeline is what's debated." | AGI and jobs conversations. |

## Avoid saying: 10 traps and the better line

Each one costs you credibility: it sounds naive, overconfident or like [[ai-washing|AI-washing]]. Swap in the better line.

| Instead of… | Say… |
|---|---|
| "The AI knows our business." | "We've connected it to our documents, so it can look things up." It only knows what it was trained on or given. |
| "We should train our own model." | "Let's ground an existing model in our data first, and fine-tune only if that falls short." Training from scratch costs a fortune. |
| "It's 95% accurate." | "On [number] of our real cases, it was right [X]% of the time, and here's what happens with the misses." Accuracy means nothing without the test and the cost of errors. |
| "AI will replace [role]." | "AI will take over specific tasks in that role, and the job shifts toward judgment and relationships." |
| "AGI is two years away." / "AGI is pure hype." | "Serious people disagree on timing. What matters for us is what today's systems can do and how fast they're improving." |
| "ChatGPT told me…" | "I used AI to draft this and checked the key facts against the source." |
| "It's just autocomplete." | "It's trained to predict the next word, and at massive scale that produced surprisingly general skills." |
| "They'll fix hallucinations soon." | "Hallucinations are being reduced, not eliminated, so we build in verification." |
| "It's open source, so it's free." | "Open-weight saves license fees, not the cost of compute, hosting, security and people." |
| "Our product is AI-powered." | "It does [X] for the customer, using a model to [Y], and we measure it by [Z]." Say what it does, or it sounds like marketing. |

## The 5 questions for any announcement or pitch

1. **Which layer is this?** Energy, chips, cloud, models, tools or apps. The layer tells you who makes money and who gets squeezed.
2. **Real or demo?** Is it shipping, to whom, at what price? *In a pitch:* "Show me on our data."
3. **Who checked?** Independent results, or the company grading its own test? *In a pitch:* "Which customers can I call?"
4. **Who pays whom?** Contract, investment or cloud credits? *In a pitch:* "What does it cost per task at our volume?"
5. **What changes for us?** What would we do differently in the next 12 months? If nothing yet, file it and move on.

## 5 numbers worth knowing

| Number | What it means |
|---|---|
| **2017 → 2022** | The [[transformer]] paper (Google, 2017) made modern AI possible; ChatGPT launched in November 2022. The whole ChatGPT era fits inside a few years. |
| **1 billion+** | Active users of OpenAI's products, per the company in July 2026. Generative AI has spread faster than the PC or the internet did (Stanford AI Index, 2026). |
| **~13x a year** | How fast the cost of a given level of AI performance has fallen since 2023 (Epoch AI estimate, September 2026). Uneven by task, but relentless. |
| **~$700 billion** | Planned 2026 capital spending by Amazon, Microsoft, Alphabet and Meta combined, mostly on AI data centers (company guidance, some raised mid-year). |
| **4–7 months** | How often the length of task AI agents can finish doubles (METR; mostly software tasks, at about 50% success). |

Date every number when you use it: "as of fall 2026." It keeps you accurate, and it signals that you know the numbers move.

:::key Key takeaways
- **The mechanism:** models predict tokens. Training is the big up-front cost; inference is the meter that never stops running.
- **The money:** name the layer, follow who pays whom, and remember that proprietary data outlasts any model.
- **The limits:** hallucinations, prompt injection and demos that don't survive real data. Evals are the difference.
- **The filter:** layer, real or demo, who checked, who pays whom, what changes for us.
- **The voice:** precise, calm and dated. In a room full of hype, accuracy is the edge.
:::
