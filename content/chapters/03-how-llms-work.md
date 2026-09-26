---
number: 3
title: How LLMs Actually Work
subtitle: What's really happening inside ChatGPT or Claude when you hit enter, and why it explains almost everything these tools get right and wrong.
minutes: 17
---

You've typed a question into ChatGPT or Claude and watched a sharp answer stream back in seconds. It feels like magic, or like talking to a person. It's neither. It's a machine doing one simple thing at a scale that's hard to picture.

By the end of this chapter, you'll know why these tools are brilliant one minute and confidently wrong the next, why they forget what you told them yesterday, and why every answer costs somebody money.

:::why Why this matters to you
Almost every AI conversation you'll sit in, about pricing, vendors, risk or "can we build this?", traces back to the mechanics in this chapter. Understand them and you can pressure-test any pitch in real time. In a business built on fast, accurate data, like sports data, that's the difference between buying a real capability and buying a slick demo.
:::

## The big idea: a prediction engine for words

A [[large language model]] (LLM) does one thing. It looks at a stretch of text and predicts what comes next.

You already do this. Finish the sentence: "Peanut butter and..." You thought "jelly" before you could stop yourself. You didn't look it up. You've heard that phrase so often that your brain filled in the blank on its own.

An LLM does the same thing with math. It gives every possible next word a probability. "Jelly" gets most of it. "Honey" and "banana" get a sliver. "Stapler" gets almost nothing. It picks one, adds it to the text, and scores the next word from scratch, over and over, until the answer is done. Every email, summary and line of code these models produce is built this way, one piece at a time.

### Tokens: the unit everything is measured in

Those pieces are [[token|tokens]], not quite words. Common words are usually one token; longer or rarer ones get chopped up ("unbelievable" might become "un" + "believ" + "able"). In English, a token is roughly half to three-quarters of a word, depending on the model.

Remember the unit: pricing, speed and memory limits for every AI product are measured in tokens.

### Why "fancy autocomplete" undersells it

Skeptics call this "autocomplete on steroids." Fair, but consider what it takes to predict the next word *well*.

OpenAI co-founder Ilya Sutskever has used a version of this example: feed a model an entire detective novel, up to the line where the detective says, "The killer is..." To predict that next word, the model has to have tracked the plot, the clues and the motives.

Scale that across contracts, code, medicine and history, and the model has to absorb facts, logic and how experts reason. Prediction is the task. Something that behaves a lot like understanding is what falls out of doing it at enormous scale.

## What's inside: dials, not a database

An LLM is a [[neural network]]: a tall stack of layers of simple math, loosely inspired by the brain. Text goes in as numbers, each layer transforms them a little, and out the top come the probabilities for the next token.

How each layer transforms those numbers is set by billions of adjustable settings called [[parameter|parameters]], or weights. Picture a mixing board with billions of dials. The exact position of every dial *is* the model. GPT-3 had 175 billion in 2020. As of 2026, the largest open models run past a trillion, and the top labs generally don't disclose their counts.

The blueprint behind modern LLMs is the [[transformer]] from Chapter 2. Its key trick, [[attention]], lets every token look at every other token to work out what matters. It's how the model knows what "it" means in "The trophy didn't fit in the suitcase because it was too big." Swap "big" for "small" and "it" flips from the trophy to the suitcase. Attention is what catches that.

:::analogy The veteran chef
Think of a chef who has spent thirty years in professional kitchens. Hand her a sauce and she doesn't reach for a cookbook. She just *knows*: it needs acid, that pan is seconds from burning, this fish wants one more minute.

Where in her head does "one more minute" live? Nowhere specific. It's spread across tens of thousands of dishes, compressed into instinct.

That's what a model's weights are. Nobody typed facts in. Patterns learned from an ocean of text are smeared across billions of dials. That's why a model can't point to where it learned something, and why, like any expert working from memory, it sometimes misremembers.
:::

### Open-weight vs closed

Because the model *is* its weights, whoever holds that file holds the model. **Closed** models (OpenAI's GPT, Anthropic's Claude, Google's Gemini) keep their weights on company servers. You rent access through an app or an [[api|API]], the connection developers plug into.

**[[open-weight model|Open-weight]]** models (Meta's Llama, DeepSeek, Alibaba's Qwen, Mistral, OpenAI's gpt-oss) publish the weights, so anyone can download and run them, even on their own servers. It's "open-weight," not "open-source," because the training data and recipe usually stay private. Chapter 4 covers the strategy.

## How a model is made: pre-training and post-training

Every model lives two lives. It's trained once, at enormous cost. Then it's used, millions of times a day.

{{diagram:llm-pipeline}}

### Pre-training: reading a huge slice of the written world

[[pre-training|Pre-training]] is where the raw talent comes from. The lab gathers a vast pile of text (web pages, books, articles, code) and plays one game with the model, across trillions of tokens: hide the next token, let the model guess, measure the miss, and nudge every dial so it would be slightly less wrong next time.

The scale is staggering. Meta said its Llama 3 models (2024) trained on more than 15 trillion tokens, and newer models have used more. Runs take weeks or months on tens of thousands of [[gpu|GPUs]], the specialized chips that power AI. The cost of the biggest runs has more than doubled year after year; in 2024, Anthropic's CEO said models costing around $1 billion to train were already underway. As of 2026, a frontier run is a nine- or ten-figure investment (Chapter 4 follows the money).

What comes out is a "base model" that knows an astonishing amount but isn't an assistant. It's a document-continuer. Ask it "What's the capital of France?" and it may reply "What's the capital of Germany?", as if it were writing a trivia worksheet. It also has a [[knowledge cutoff]]: it knows nothing that happened after its training data was collected, unless you tell it.

### Post-training: turning raw talent into a pro

If pre-training produces a brilliant graduate who has read everything and never held a job, [[post-training|post-training]] is onboarding: teaching them what the job is, the house rules and how to treat a customer.

- **[[instruction tuning|Instruction tuning]].** The model studies thousands of examples of good requests and good answers, written or checked by people. It learns the format: you ask, it helps.
- **[[rlhf|RLHF]]**, short for [[reinforcement learning]] from human feedback. Reinforcement learning is learning by trial and reward; here, people supply the reward. They compare pairs of answers and pick the better one, a second model learns their taste, and the main model is tuned to win its approval. It was a key ingredient in ChatGPT: in OpenAI's 2022 research, people preferred a small model tuned this way over an untuned one more than 100 times its size.
- **[[constitutional ai|Constitutional AI]].** Anthropic's approach, introduced in 2022: write down a set of principles, a "constitution," and have AI, not just human raters, critique and revise the model's answers against it during training. Anthropic published a far longer, more detailed constitution for Claude in January 2026.

Post-training is why ChatGPT, Claude and Gemini feel so different despite similar raw ingredients: personality, caution and style are largely onboarding choices. It's also the front line of [[alignment]], the work of making models behave as intended (Chapter 9).

Onboarding has side effects, too. Reward a new hire mainly for keeping the boss happy and you get a yes-man. Tune a model hard toward what people *like* and it can learn to flatter, a failure called [[sycophancy]]. In 2025, OpenAI rolled back a ChatGPT update after users found it excessively agreeable.

## What happens when you hit enter

Using a trained model is called [[inference]]. If training is the chef's thirty years in kitchens, inference is her working tonight's dinner service: fixed instincts, applied to the orders in front of her.

The mechanics: your message, the conversation so far and any hidden instructions are converted into tokens. They run through the entire network, every one of those dials, and out comes a probability for every possible next token. The model picks one, adds it to the text, and runs the *whole thing again* for the next.

A 500-word answer means hundreds of full passes. That one fact explains a lot:

- **Answers stream in word by word** because that's how they're made.
- **AI costs money every single time.** Traditional software costs next to nothing to serve one more user. An LLM burns chip time, what the industry calls [[compute]], on every answer. That's why AI is priced per token, and why, as of 2026, the tokens a model writes typically cost several times more than the ones it reads.
- **Speed is a design choice.** Bigger models and longer answers mean more delay, or [[latency]]. Fine for a deal memo; far too slow for approving a card payment at checkout, where fraud checks run on specialized, much faster models, not chatbots.
- **The same question gets different answers.** The model doesn't always pick the most likely word. A setting called [[temperature]] controls how often it picks a less likely token: higher is more creative, lower is more consistent.

### Context window, memory and system prompts

Here's what surprises most people: **the model doesn't learn from your conversations.** Its dials are frozen after training, just as the chef doesn't relearn cooking in the middle of a dinner rush.

What it has instead is a [[context window]]: all the text it can see at once, measured in tokens. Think of it as the chef's counter: everything laid out within reach for this order. It holds the instructions, your conversation, any pasted documents and the answer being written. As of 2026, leading models from the big labs handle around a million tokens, well over a thousand pages, and a few advertise more. But bigger isn't perfect recall. Models get less reliable as the window fills, and details buried mid-document are easier to miss.

So how does ChatGPT "remember" you? Within a chat, the app quietly re-sends the whole conversation with every message. Across chats, "memory" features save notes about you and slip them back into the window. A note taped to the counter, not new instincts.

Finally, the [[system prompt]]: instructions the company or developer puts at the top of the context, usually invisible to you. "You are a support assistant for an airline. Be concise. Never promise a refund." That's how one general model becomes a thousand products. Many "AI-powered" tools you'll be pitched are a general model, a system prompt and some company data in a nice wrapper.

:::room Say this in the room
- "Every answer these models give costs compute, so usage growth is cost growth unless we match the model to the job."
- "A million-token window isn't perfect recall. Let's test it on our longest contracts before we trust it."
:::

## New tricks: models that think, see and speak

### Thinking before answering

A standard model commits to each token as it goes. It can't pause, plan or go back, which hurts on hard, multi-step problems.

[[reasoning model|Reasoning models]] fix this. Starting with OpenAI's o1 in September 2024 and DeepSeek's R1 in early 2025, labs trained models to write a long internal scratchpad, a [[chain of thought]], before answering: break the problem down, try an approach, check it, backtrack. They learn this mainly through reinforcement learning on problems with checkable answers, like math and code. As of 2026, most leading models can do this, and many decide for themselves how long to think.

The big idea is [[test-time compute]]. For years, the main route to a smarter model was a bigger training run. Now there's a second dial: spend more computing power at the moment of answering. On hard problems, more thinking means better answers.

Back to the chef. Ask for an omelet and she makes it on autopilot. Ask her to design a new tasting menu and she spends days testing, tasting and throwing out drafts. Same chef, same instincts. Better result, more time.

Same trade-off here. Thinking tokens are billed like any other output, and you wait while the model thinks. Save it for analysis, math, code and planning. Don't pay tasting-menu prices to rewrite an email.

One caution: the visible "thinking" is a useful window, not sworn testimony. Anthropic's own 2025 research found that reasoning models don't always accurately report what drove their answers.

Give a reasoning model tools and it becomes an [[agent]] (Chapter 5).

### Seeing, hearing, speaking

The same machinery works beyond text. Images, audio and video can be chopped into token-like pieces and processed the same way, which makes today's leading models [[multimodal]]. They can read a chart or a scanned contract, listen to speech and answer in a natural voice. Many apps also generate images and video, often using specialist models behind the scenes. For a video-first industry like sports, that means models that can watch the broadcast, not just read the box score (more in Chapter 7).

## When it's wrong, and how to teach it your business

### Hallucinations: confident, fluent, false

A [[hallucination]] is a model stating something false as fact: an invented statistic, a fake quote, a court case that doesn't exist. In 2023, lawyers in a New York federal case were sanctioned for filing a brief that cited cases ChatGPT had made up.

It's not a glitch. It falls out of the mechanism:

- **Plausible, not verified.** The model picks the next token by what sounds right. There's no built-in fact-check.
- **Fuzzy memory.** Facts that appear constantly in training (who wrote *Romeo and Juliet*) are sharp. Rare ones (the founding year of a small regional law firm) are blurry, and the model fills the gap with something that looks right.
- **Rewarded for guessing.** A 2025 OpenAI paper argued that training and testing have favored confident guesses over "I don't know." Picture a student on a multiple-choice test where a wrong answer costs nothing and a blank scores zero. The smart move is to guess on every question.

Ask the chef to cook a cuisine she's never tasted and she'll still send out a plate, with the same confident flourish.

Newer models hallucinate less, but none are at zero. To reduce it: give the model the source documents, turn on web search for current facts, ask it to quote and cite its sources (then check them), tell it "I don't know" is acceptable, and keep a human on anything going to a client, a regulator or the public.

### Three ways to teach it your business

Out of the box, a model doesn't know your contracts, your rate card or this morning's sales numbers. There are three ways to fix that.

:::analogy Three ways to teach a new hire
You've just hired a sharp analyst. How do you get them productive?

1. **Brief them before each task** ([[prompt|prompting]]). Fast and cheap, but you do it every time.
2. **Give them keys to the filing cabinet** ([[retrieval-augmented generation|RAG]]). They look things up before answering and show you where they found it.
3. **Send them on a training course** ([[fine-tuning]]). It changes how they work at a deeper level, but it's slow and costly, and last month's course doesn't cover this morning's news.
:::

**RAG**, short for retrieval-augmented generation, connects the model to your documents or data. For each question, the system finds the most relevant passages (matching on meaning, not just keywords, using a technique called [[embedding|embeddings]]) and pastes them into the context window alongside the question. The model answers from your sources, with citations, and stays current as documents change. Most "chat with your data" products work this way. It's your best defense against hallucination on your own facts.

**Fine-tuning** runs extra training on your examples, actually adjusting the dials. It's the right tool for teaching *behavior*: a house style, a set format, a narrow task done at huge volume. It's the wrong tool for *facts* that change: they become fuzzy instinct like everything else, and you'd retrain every time they move.

The rule of thumb: start with prompting, which goes further than most people expect (Chapter 6 shows how). Add RAG for knowledge. Fine-tune for behavior, and only once you've proven the need. When a vendor leads with "we'll fine-tune a model on your data," ask why retrieval wouldn't do the job.

:::room Say this in the room
- "Before we talk fine-tuning, have we tried a strong prompt and retrieval over our own documents?"
- "For anything factual, I want answers grounded in our sources, with citations and a human sign-off."
- "Hallucination isn't a bug they'll patch next quarter. It's how the technology works, so we design around it."
:::

:::teach Teach it in 60 seconds
Open with: "Finish this sentence: peanut butter and..." Everyone says "jelly," and that's the whole trick behind ChatGPT, done with math at enormous scale. The model has read a huge slice of everything humans have written and compressed it into billions of dials, its instincts. When you type, it scores every possible next word, picks a likely one, and repeats until it's done. That's why it's fluent on almost any topic, and why it can be confidently wrong: it predicts the most plausible answer, not the true one. So treat it like a brilliant analyst who's never been fact-checked: hand it the source documents, and check its work.
:::

## Check yourself

1. A partner's product team says their chatbot "learns from every conversation with your users." What do you ask them?

<details><summary>Answer</summary>

Ask what "learns" means, because a model's weights don't change during a conversation. They likely mean saved notes fed back into the context window, retrieval over past chats, or periodic retraining on user data. That last one raises real questions about data rights and privacy.

</details>

2. Your team wants an assistant that accurately answers questions about 400 partner contracts. Someone proposes fine-tuning a model on them. What do you push for instead?

<details><summary>Answer</summary>

Retrieval (RAG). Contract terms are facts that change and must be traceable. RAG pulls the relevant clauses into the context window for each question, so answers cite the exact contract and stay current. Fine-tuning turns facts into fuzzy instinct and can't show its sources.

</details>

3. The AI bill jumped after the team switched every task to a "thinking" model, including rewriting emails. What happened?

<details><summary>Answer</summary>

Reasoning models write a long scratchpad before answering, and those thinking tokens are billed like any other output. That's test-time compute: paying more at answer time for better results on hard problems. An email rewrite isn't one, so route simple work to a faster, cheaper model.

</details>

4. A partner in a heavily regulated business, say a bank, wants an AI assistant, but its compliance team won't let customer data leave its own servers. What option do you put on the table?

<details><summary>Answer</summary>

An open-weight model. Because the weights are downloadable, the partner can run it on its own servers, so customer data never leaves the building. The trade-off: they take on the cost and expertise of hosting, and the strongest models are often closed.

</details>

:::key Key takeaways
- An LLM predicts the next token by scoring every possibility. Doing that well at scale forces it to learn a lot about the world.
- Its knowledge lives in billions of parameters set during pre-training. Post-training (instruction tuning, RLHF, constitutional AI) turns that raw talent into a helpful assistant.
- Every answer is fresh computation (inference), which is why AI costs money per use. The model doesn't learn from your chats; the context window is its only working memory.
- Reasoning models add a second dial: more thinking at answer time for better answers on hard problems, paid for in time and money.
- Hallucinations come from the mechanism: plausible, not verified. Ground models in your sources and keep humans in the loop.
- To teach a model your business: prompt first, RAG for knowledge, fine-tuning for behavior.
:::
