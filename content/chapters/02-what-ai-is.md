---
number: 2
title: What AI Actually Is
subtitle: From chess computers to ChatGPT: the nesting dolls of AI, the seventy-year road here, and why it all exploded now.
minutes: 13
---

"AI" is one of the most overloaded words in business. A vendor uses it to describe a souped-up spreadsheet. A headline uses it to describe a robot uprising. Your phone uses it to sort your photos. By the end of this chapter you'll know what the word covers, how the pieces fit together, how we got here and why it all took off now.

:::why Why this matters to you
When someone pitches you an "AI-powered" product, your first question should be: what kind? A model that flags suspicious bets and a chatbot that writes match previews are both called AI, but they work differently, cost differently and fail differently. Knowing the family tree lets you ask the right question in the first five minutes, and spot when "AI" is just a new label on old software.
:::

## The nesting dolls

Picture AI as a set of nesting dolls, each sitting inside a bigger one.

{{diagram:ai-nesting}}

**The outer doll: [[artificial intelligence]].** Any technique that gets a computer to do something we'd call intelligent: recognize a face, win a game, translate a sentence, make a decision. AI is a goal, not a specific technology. A chess program from 1997 counts. So does ChatGPT.

**Inside it: [[machine learning]].** The approach that won. Instead of programmers writing the rules, the computer learns patterns from examples and works out the rules itself. Nearly everything called AI today is machine learning.

**Inside that: [[deep learning]].** Machine learning done with [[neural network|neural networks]]: software loosely inspired by the brain, built from layers of simple math units wired together. Each connection has a strength, like a dial, that gets tuned during training. "Deep" just means many layers. Deep learning finally made computers good at messy, human things: seeing, hearing, reading.

**Inside that: [[generative ai|generative AI]].** Deep learning that creates new things (text, images, video, audio, code) instead of only sorting or scoring what already exists.

**The smallest doll: [[large language model|large language models]].** LLMs are generative AI for language. They learn from enormous amounts of text, and they can write, summarize, answer questions and work through problems. [[gpt|GPT]] (OpenAI), Claude (Anthropic), Gemini (Google) and Llama (Meta) are all LLM families.

One distinction trips people up: the model and the product are different things. GPT is the model; ChatGPT is the app built on it. The model is the engine, the app is the car, and one engine can power many cars.

## Rules vs. learning from examples

The biggest idea in this chapter: there are two ways to make a computer smart.

**Write the rules.** A human expert turns their knowledge into instructions: if this, then that. For decades, this is what AI meant. In the 1980s, companies spent heavily on "expert systems" packed with thousands of hand-written rules.

**Learn from examples.** Feed the computer a mountain of examples with the answers attached, and let it find the patterns itself. That's machine learning.

:::analogy Two ways to set a line
Picture two ways to price an NFL game.

The first is an old-school oddsmaker with a rulebook. Home field is worth three points. Knock off several points if the starting quarterback is out. Adjust for weather, travel and rest. Every rule is sensible, and every rule was written by a person.

The second is a model that has been shown every game, every play and every line move for twenty years. Nobody tells it home field is worth three points. It works out what home field is actually worth, for which teams, in which conditions, and it notices when that number drifts. It also finds patterns no human thought to write down.

The rulebook is easy to explain and audit, but it's brittle: the world changes and the rules don't. The model adapts and catches subtler signals, but it's only as good as the data it learned from, and it can't always tell you why it landed on a number.

That trade-off, rules you can read versus patterns you can't always see, runs through everything in AI.
:::

Why did learning win? Because most of the world is too messy for rules. Try writing rules to spot a sponsor's logo on a jersey: at every angle, in every light, half-hidden by an arm, blurred mid-sprint. You'd never finish. Show a system enough labeled examples, though, and it learns to spot the logo itself. That's [[computer vision]], the same family of technology that can now track every player on a pitch from video.

The catch: you stop programming the answer and start curating the examples. The quality of the [[training data]] matters as much as the cleverness of the software. That's why, in an AI world, whoever owns the best data holds a card others can't easily copy.

## A short history, in four eras

AI didn't appear in November 2022. It's a seventy-year story of big promises, hard crashes and a few breakthroughs that changed everything.

{{diagram:timeline}}

### The dream (1950s to 1980s)

- **1950: Turing asks the question.** British mathematician Alan Turing publishes a paper asking, "Can machines think?" He proposes a test: if a person chatting by text can't reliably tell a machine from a human, the machine is showing something like intelligence. The [[turing test]] became AI's first famous benchmark.
- **1956: The field gets its name.** A summer workshop at Dartmouth College launches "artificial intelligence" as a field. The organizers' proposal suggested a small group could make major progress in a single summer. It took a little longer.
- **1959: Machines that learn.** IBM's Arthur Samuel describes a checkers program that improves with experience, popularizing the phrase "machine learning."
- **1970s and late 1980s: The winters.** Twice, the promises outran the results and funding dried up. The second of these [[ai winter|AI winters]] followed the collapse of the expert-systems boom, when rule-based systems proved expensive and brittle.

The lesson for today: AI has been overhyped before, which doesn't mean it's overhyped now. It does mean the calm, evidence-first voice wins the room.

### The machines start learning (1997 to 2016)

- **1997: Deep Blue beats Kasparov.** IBM's chess computer defeats world champion Garry Kasparov in a six-game match. But Deep Blue won mostly on brute force and hand-tuned rules, searching around 200 million positions a second. It learned very little, and it couldn't play anything but chess.
- **2012: The deep learning breakthrough.** A neural network called AlexNet, from Geoffrey Hinton's lab at the University of Toronto, crushes the ImageNet challenge, an annual contest to identify objects in photos. Its error rate was about 15%; the next best was about 26%. The detail that mattered: it was trained on two Nvidia [[gpu|GPUs]], chips designed for video games. Neural networks, around since the 1950s and long written off, became the main event.
- **2016: AlphaGo beats Lee Sedol.** The board game Go has more possible positions than there are atoms in the observable universe, so brute force is hopeless. Google DeepMind's AlphaGo studied a library of human games, then improved by playing millions of games against itself, a technique called [[reinforcement learning]]. It beat Lee Sedol, one of the greatest players of his era, four games to one. In game two it played "Move 37," so unusual that expert commentators first thought it was a mistake. It wasn't. A machine had found something new.

The contrast is the whole story. Deep Blue was programmed. AlphaGo learned.

### The language explosion (2017 to 2022)

- **2017: The Transformer.** Eight Google researchers publish a paper called "Attention Is All You Need." It introduces the [[transformer]], a new neural network design built for translation. Its key trick, called attention, lets the model look at every word in a passage at once and work out which words matter most to each other. In "The book moved the line because it was taking too much money on the favorite," attention is how the model works out that "it" means the book, not the line. The Transformer is the "T" in GPT, and it sits under nearly every major LLM today.
- **2018 to 2020: Bigger gets better.** OpenAI builds a series of models called GPT, short for Generative Pre-trained Transformer. GPT-3, released in 2020, was more than 100 times larger than GPT-2 from the year before, and it could suddenly write essays, answer questions and produce simple code. Researchers found that bigger models, fed more data and computing power, improved in a predictable way. Those patterns, called [[scaling laws]], became the industry's playbook.
- **November 30, 2022: ChatGPT.** OpenAI puts a chat window on one of its GPT models and releases it as a free "research preview." It reaches a million users in five days. The technology wasn't brand new. What was new was that anyone could talk to it.

### The race (2023 to 2026)

After ChatGPT, big tech and a wave of startups went all in.

- **2023:** OpenAI releases GPT-4, a major leap, and Anthropic launches Claude the same day. Google launches Bard (later renamed Gemini). Meta releases Llama, a family of [[open-weight model|open-weight models]] that developers can download and run themselves.
- **2024:** Models get fluent with images and voice, not just text, which the industry calls [[multimodal]] AI. OpenAI introduces [[reasoning model|reasoning models]] that work through a problem step by step before answering (chapter 3). And AI research wins two Nobel Prizes: physics, for Hinton and John Hopfield's work on neural networks, and chemistry, for the Google DeepMind scientists behind AlphaFold, which predicts the shapes of proteins.
- **January 2025:** DeepSeek, a Chinese lab, releases a strong reasoning model as open weights, reportedly built for a fraction of what US rivals spend. Nvidia loses nearly $600 billion in market value in a single day, at the time the largest one-day drop for any company in US stock market history.
- **2025 to 2026:** The race shifts from chatbots that answer to [[agent|agents]] that act: AI that uses software, writes and runs code, and works through multi-step tasks (chapter 5). OpenAI ships GPT-5 in August 2025. As of 2026, OpenAI, Anthropic and Google trade the lead with major releases every few months, with xAI, Meta and Chinese labs such as DeepSeek and Alibaba also in the race.

Model names go stale fast; the Players page and This Week keep them current.

:::myth Myth vs. reality
**Myth:** ChatGPT came out of nowhere in 2022.

**Reality:** It was a seventy-year overnight success. The core ideas date to the 1950s, the deep learning breakthrough to 2012, the Transformer to 2017. ChatGPT's real innovation was access: it let anyone talk to a technology researchers had been building for decades. Think of the rookie who "comes out of nowhere" after five years in the minors.
:::

## Two kinds of output: predictive and generative

Almost everything AI produces falls into one of two buckets.

**[[predictive ai|Predictive AI]] looks at data and makes a call about it.** It classifies (is this betting pattern suspicious? is that player offside?), forecasts (what's the win probability right now? which customers are about to leave?) and ranks (which sponsorship leads are most likely to close?). It was the workhorse of business AI for the decade before ChatGPT, and it still quietly runs fraud alerts, recommendations and dynamic pricing across the economy.

**Generative AI makes something new.** Text (a match preview, a contract summary), images (campaign visuals, a mock-up of in-stadium signage), video (highlight packages, ad variations), audio (commentary, voice-overs, translation) and code, which turns out to matter enormously (chapter 5).

Two caveats. Products often blend both: a system might predict which moments a fan cares about, then generate a personalized highlight reel. And the line is blurrier than it looks. An LLM writes by predicting, over and over, which word should come next. Generation is prediction, repeated at speed.

The commercial point: predictive AI is judged on accuracy you can measure (did the fraud flag hit or miss?). Generative AI is judged on quality, which is harder to measure, and it can be fluent and wrong at the same time. Different products, different buying questions.

## Narrow AI, AGI and superintelligence

You'll hear three terms for how capable AI is, or might become.

- **[[narrow ai|Narrow AI]]** does one thing well. Deep Blue could beat the world chess champion but couldn't play checkers. Almost every AI system in history has been narrow, including most predictive models in business today.
- **[[agi|Artificial general intelligence]]**, or AGI, means AI that can do most of the thinking work a capable person can, across domains. There's no agreed definition. OpenAI's charter, for instance, describes it as highly autonomous systems that outperform humans at most economically valuable work. Others set the bar elsewhere, which is why AGI arguments often go nowhere: people mean different things.
- **[[superintelligence]]** means AI that far exceeds the best humans at nearly everything. It's hypothetical, and central to the biggest debates about AI risk.

So where are we? Today's LLMs are far more general than anything before them. The same model can summarize a contract, write code and explain a same-game parlay. But they're uneven: superhuman at some tasks, surprisingly weak at others that seem easier. Researchers from Harvard Business School and Boston Consulting Group gave this a name in 2023: the [[jagged frontier]]. Whether that smooths out in years or decades is one of the biggest open questions in tech (chapter 9).

:::room Say this in the room
- "When someone says 'AI,' I ask which kind. Predicting a number, flagging a risk and writing content are different problems, with different costs and failure modes."
- "Modern AI learns from examples, so the data matters as much as the model. Whoever owns the best data has an advantage that's hard to copy."
- "These systems are powerful but uneven. They can nail a hard task and fumble an easy one, so we test them on our own workflows before we trust them."
:::

## Why it all took off now

If the ideas are decades old, why the explosion now? Four ingredients arrived at once.

**1. Data.** Neural networks are hungry, and the internet fed them. Websites, books, forums, code, photos and video gave models trillions of words and billions of images to learn from: far more text than a person could read in thousands of lifetimes.

**2. Compute.** Training a neural network takes an astronomical amount of [[compute]], the industry's word for raw computing power, and much of that math can run side by side. GPUs, built to render video games, turned out to be perfect for it. That's how Nvidia went from gaming chips to one of the world's most valuable companies. The research group Epoch AI estimates that the computing power used to train leading models grew about four to five times per year between 2010 and 2024.

**3. The Transformer.** Earlier designs read text one word at a time, which made them slow to train and forgetful over long passages. The Transformer reads everything in parallel, so it could finally soak up all that data and all those GPUs, and bigger reliably meant better.

**4. Money.** Once ChatGPT proved that hundreds of millions of people wanted this, capital flooded in. As of mid-2026, Amazon, Alphabet, Microsoft and Meta had guided to roughly $700 billion in combined capital spending for the year, most of it for AI data centers. Chapter 4 follows that money.

The four feed each other. Better models attract users, users attract money, money buys compute, and compute trains better models. That flywheel is why progress has felt so fast since 2022.

:::analogy The PASPA moment
You've seen this pattern before. Sports betting existed in America for decades: legally in Nevada, in the shadows almost everywhere else. Then in May 2018, in Murphy v. NCAA, the Supreme Court struck down the federal law that had kept states from legalizing it. Within a few years, more than half the states had legal sports betting.

The ruling alone didn't build the industry. It took several things converging: smartphones in every pocket, official real-time data feeds to power live betting, and billions of dollars in marketing and investment.

AI's takeoff is the same story. The ideas were old. Data, compute, the right design and a flood of money all arrived in the same few years. When someone asks "why now?", that's your answer.
:::

:::teach Teach it in 60 seconds
Ask the room: what's the difference between Deep Blue beating Kasparov at chess in 1997 and AlphaGo beating Lee Sedol at Go in 2016? Deep Blue was programmed: engineers gave it rules and raw speed. AlphaGo learned: it studied human games, then played itself millions of times until it found moves no human had considered. That shift, from writing rules to learning from examples, is machine learning, the heart of modern AI, and ChatGPT sits a few nesting dolls inside it. It took off now because data, computing power, a 2017 design called the Transformer and a flood of money all arrived at once.
:::

## Check yourself

1. One vendor pitches an "AI-powered" tool that flags suspicious betting patterns. Another pitches one that writes personalized promo emails. Why would you evaluate them differently?

<details><summary>Answer</summary>

The first is predictive AI, so you can measure it against known outcomes: how many flags were real, how many cases it missed. The second is generative AI. Quality is more subjective and it can be fluent and wrong at once, so it needs human review and different tests.

</details>

2. Your boss asks, "Why not have our best traders write down their rules and automate them? Isn't that AI?" How do you respond?

<details><summary>Answer</summary>

It is AI, the rules-based kind: transparent and easy to audit, but brittle when conditions change and only as good as the rules people think to write down. A learned model can find patterns nobody wrote down and adapt as the data shifts, but it needs good data and can be harder to explain. Many real systems combine both.

</details>

3. A friend says, "AI has been hyped since the 1950s and never delivered. This is just another bubble." What's the accurate response?

<details><summary>Answer</summary>

The hype cycles were real: AI went through two winters. But this wave rests on things earlier waves lacked: proven deep learning results since 2012, the Transformer, massive data and compute, and hundreds of millions of weekly users. Whether valuations are too high is a separate question. Whether the technology works is not.

</details>

4. Someone asks whether ChatGPT is AGI. What do you say?

<details><summary>Answer</summary>

Not by most definitions. Today's LLMs are far more general than earlier AI, but uneven: excellent at some tasks, unreliable at others. And AGI has no agreed definition, so the more useful question is what the system can reliably do for a specific job.

</details>

:::key Key takeaways
- AI is the broad goal. Machine learning (learning from examples) is how nearly all modern AI works. Deep learning uses neural networks, generative AI creates, and LLMs are generative AI for language.
- The core shift is from rules written by people to patterns learned from data, which is why data ownership matters so much.
- ChatGPT was a seventy-year overnight success, built on milestones like ImageNet (2012), AlphaGo (2016) and the Transformer (2017).
- Predictive AI classifies and forecasts; generative AI creates. They get judged, and bought, differently.
- Today's AI is powerful but uneven, and AGI has no agreed definition.
- It took off now because data, compute, the Transformer and money converged, and each now feeds the others.
:::
