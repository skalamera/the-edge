# The Edge — Book Outline

Each chapter owns its topics. Don't re-teach another chapter's topic in depth; mention it briefly and link the glossary term instead. The book reads in order, so later chapters can assume earlier ones.

File names: `content/chapters/NN-slug.md`.

## 01-start-here.md: Start Here
*Why AI is different from every other tech wave, and how to use this playbook.*
- The moment: why this wave is moving faster than the internet or mobile; why being early matters (his "chance to get ahead")
- What "fluent" means: not engineering; understanding the mechanism, the economics, the vocabulary, and what's real vs hype
- How the playbook works: chapter structure, the boxes (why / analogy / say this in the room / teach it / myth / key takeaways), glossary, players map, weekly updates in "This Week"
- A 30-day study plan (one chapter every 2–3 days, reread the cheat sheet before meetings, read This Week every Monday)
- The mindset: use AI daily. Reading about it isn't enough; the fastest learners use it while they learn
- Short, 1,200–1,800 words.

## 02-what-ai-is.md: What AI Actually Is
*From chess computers to ChatGPT in ten minutes: the nesting dolls of AI.*
- Definitions: AI, machine learning, deep learning, neural networks, generative AI, LLMs (use `{{diagram:ai-nesting}}`)
- Rules vs learning from examples (old-school programmed odds vs a model that learns from millions of games)
- The short history: Turing, early AI winters, Deep Blue, the deep learning breakthrough (ImageNet 2012), AlphaGo, the Transformer paper 2017 ("Attention Is All You Need"), GPT-3, ChatGPT (Nov 2022), and the 2023–2026 race (use `{{diagram:timeline}}`)
- Types of AI output: predictive (classify, forecast) vs generative (text, images, video, audio, code)
- Narrow AI vs AGI vs superintelligence: brief intro; deep treatment is in chapter 09
- Why it all took off now: data + compute (GPUs) + the Transformer + money

## 03-how-llms-work.md: How LLMs Actually Work
*What's happening inside ChatGPT or Claude when you hit enter.*
- Next-token prediction: the "autocomplete that read the internet" intuition, and why that undersells it
- Tokens, parameters/weights, neural network (just enough)
- Training: pre-training on huge text, then post-training (instruction tuning, RLHF, constitutional AI), the cost of training runs
- Inference: what happens when you send a prompt; why inference costs money every time; latency
- Context window, memory (and the lack of it), system prompts
- Reasoning / "thinking" models: models that think before answering; test-time compute
- Multimodal: images, audio, video in and out
- Hallucinations: why they happen, how to reduce them
- Making models know your stuff: prompting vs RAG vs fine-tuning (the "three ways to teach a new hire" analogy)
- Open-weight vs closed models (brief; economics are in 04)
- Use `{{diagram:llm-pipeline}}`

## 04-the-stack.md: The AI Stack: Who Makes Money Where
*Follow the money from the silicon to the app on your phone.*
- The layers: energy & data centers → chips (Nvidia GPUs, TPUs, custom silicon, TSMC) → cloud / hyperscalers (AWS, Azure, Google Cloud, Oracle, CoreWeave) → foundation model labs (OpenAI, Anthropic, Google DeepMind, Meta, xAI, Mistral, DeepSeek, etc.) → tooling / infrastructure → applications (use `{{diagram:stack}}`)
- The economics: capex boom, training vs inference cost, token pricing, why prices per token keep falling, gross margins at each layer
- Moats: compute, talent, distribution, data, brand/trust; why owning proprietary data (like official league data) matters more in an AI world
- Open vs closed models as a business strategy
- The partnerships web (Microsoft–OpenAI, Amazon/Google–Anthropic, etc.; use hedged "as of mid-2026" language)
- How to read an AI headline: which layer is this, who pays whom
- Investor lens: where value is accruing, bubble debate, what to watch
- Point readers to the Players page for company-by-company detail

## 05-agentic-ai.md: Agentic AI: From Chatbots to Coworkers
*The shift from AI that answers to AI that does.*
- Chatbot vs copilot vs agent: the spectrum of autonomy
- How an agent works: goal → plan → use tools → observe → repeat (use `{{diagram:agent-loop}}`)
- Tools and integrations: function calling, APIs, MCP (Model Context Protocol), computer use / browser agents
- Coding agents as the leading example (Claude Code, Codex, Cursor, etc.) and why coding went first
- Multi-agent systems, orchestration
- What agents are good at today vs where they break: reliability, compounding errors, long tasks, permissions, security (prompt injection)
- Human-in-the-loop, guardrails, evaluation
- Where it's going: agents doing hours/days of work, the "AI employee" framing, and what it means for jobs and org design
- Concrete agent examples from his world (a trading-desk monitoring agent, a sponsorship-proposal agent, a partner-research agent) but save deep sports treatment for 07

## 06-using-ai-well.md: Using AI Well: Your Personal Edge
*The fastest way to understand AI is to use it every day. Here's how.*
- The main assistants (ChatGPT, Claude, Gemini, Copilot, Perplexity, Grok, Meta AI) and what each is known for, hedged and brief
- Prompting that works: context, role, goal, examples, format, constraints; the "brief a new hire" mental model; iterate
- 10 concrete workflows for his job: meeting prep, partner research, deal memos, RFP responses, summarizing long contracts, drafting emails, building a pitch deck outline, analyzing a spreadsheet, preparing a lecture, learning a new topic
- Projects / custom instructions / memory; voice mode on the go; deep research features
- What NOT to put into AI tools at work: confidential data, company policies, enterprise vs consumer accounts
- Checking AI's work: verify facts, ask for sources
- A 7-day "use it daily" challenge

## 07-ai-in-sports-betting-media.md: AI in Sports, Betting & Media
*Where AI is already reshaping your industry, and where it's headed next.*
- Why sports is a perfect AI domain: tons of structured data, live events, video, massive fan attention
- Data & tracking: optical/computer-vision tracking, the value of official data; public info that Genius Sports acquired Second Spectrum (2021) and supplies official data for leagues like the NFL and Premier League (general, hedged)
- Betting: pricing and odds compilation, in-play/live trading, player props, same-game parlays and micro-betting, risk management, personalization; integrity monitoring and fraud detection; responsible gaming (detecting problem-gambling signals); KYC/AML
- Media & content: automated highlights, personalized feeds, AI commentary and translation, dynamic ad insertion, sponsorship measurement via computer vision (logo exposure valuation — tie to his sponsorship background)
- Teams & leagues: scouting, performance, injury prediction, ticket pricing, fan engagement
- Regulation specific to AI in betting (state regulators, UK Gambling Commission, integrity and responsible gaming expectations): hedged, general
- Data rights in the AI era: licensing data for model training, why official data + low latency is a moat
- Competitive frame: the category (e.g., Sportradar, sportsbooks building in-house) at a general level
- "Questions worth asking" at Genius and with partners (not claims about internal strategy)
- Opportunities for him personally

## 08-ai-at-work.md: AI at Work: Buying, Selling & Deploying
*How companies actually adopt AI, and how to be the person who gets it right.*
- How enterprises adopt: pilots, "pilot purgatory", the build vs buy vs partner decision
- Evaluating an AI vendor: 10 questions to ask; red flags ("AI-washing", demos that don't generalize, no evals, unclear data usage)
- Pricing models: per seat, per token/usage, per outcome; why AI changes SaaS pricing
- Measuring ROI: time saved vs revenue generated vs risk reduced; start with a painful, measurable workflow
- Data: your data as advantage, data readiness, privacy, security, data licensing and contract terms (training rights, indemnities, IP)
- Selling AI-powered products: how to position AI features to sportsbooks, leagues, media partners; talking about accuracy honestly
- Change management: people, training, incentives; the "AI champion" role he can play
- Governance: AI policies, responsible use, human review
- Career angle: how to become the AI-fluent leader in his org

## 09-risks-regulation-big-debates.md: Risks, Regulation & the Big Debates
*The questions everyone argues about, and how to sound informed on all sides.*
- Everyday risks: hallucinations, bias, privacy, IP/copyright lawsuits, deepfakes and fraud, security
- Jobs and the economy: augmentation vs automation, which roles change first, the historical pattern
- Regulation: EU AI Act (risk tiers, timelines, hedged), US approach (executive actions, state laws like Colorado/California, hedged "as of mid-2026"), China, UK; what it means for a global company
- AI safety & alignment: what the labs worry about, responsible scaling policies, the frontier-risk debate
- AGI and superintelligence: definitions, timelines debate (optimists vs skeptics), the key figures and camps, how to discuss it without sounding naive or alarmist
- Energy and environment: data center power demand
- Geopolitics: US–China chip controls, compute as national strategy
- How to hold a balanced view in the room

## 10-whats-next.md: What's Next & How to Stay Ahead
*Where this is going over the next few years, and your system for staying current.*
- Trends to watch: agents doing longer tasks, cheaper and faster models, on-device AI, robotics/physical AI, AI in science, voice-first interfaces, AI-native companies with tiny teams
- What stays constant: fundamentals from this book; how to evaluate any new announcement (which layer? real or demo? who pays?)
- A system for staying current: This Week in The Edge, a short list of high-signal sources (newsletters/podcasts; well-known and durable), the 15-minutes-a-day habit
- Becoming a teacher: turning this into a guest lecture or a lunch-and-learn at work
- Closing: the edge is compounding; start today

## 11-cheat-sheet.md: The Cheat Sheet
*One page to reread in the car before any meeting.*
- 20 concepts in one line each
- "Sound smart" phrases (10) and "avoid saying" traps (10), with the better alternative
- The 5 questions to ask about any AI announcement or pitch
- The 5 numbers/facts worth knowing (hedged, durable)
- Short, and exempt from the per-chapter box requirements except `:::key`. No "Check yourself".
