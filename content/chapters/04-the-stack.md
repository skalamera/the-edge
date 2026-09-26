---
number: 4
title: "The AI Stack: Who Makes Money Where"
subtitle: Follow the money from the silicon to the app on your phone.
minutes: 14
---

Every time you ask ChatGPT a question, a chain of companies gets paid. The app pays a model lab. The lab pays a cloud provider. The cloud already paid a chipmaker, the chipmaker paid a factory in Taiwan, and all of them pay the power company.

That chain is the [[ai stack|AI stack]]. Learn it once and every AI headline sorts itself: which layer it's about, who is paying whom, and whether the money is real.

:::why Why this matters to you
You already know how supply chains work. Money flows from the customer back through every supplier, and margin pools wherever something is scarce. AI runs on the same logic. Once you see the stack, you can size up any AI partner, pitch or stock in one conversation, and you'll see why owning data nobody else has, like official sports data, gets more valuable as AI spreads, not less.
:::

## The stack, floor by floor

{{diagram:stack}}

Picture a building. Each floor buys from the one below and sells to the one above.

### Ground floor: energy and data centers

AI runs in [[data center|data centers]]: warehouse-sized buildings full of computers, power gear and cooling. The biggest new campuses are sized in gigawatts; one gigawatt is roughly the output of a large nuclear reactor.

The winners here don't look like tech companies: power producers signing 20-year contracts with Big Tech, makers of turbines and cooling gear, and developers who build and lease the buildings. Power is now a real bottleneck. You can order chips. You can't order a grid connection for next quarter.

### Floor two: chips

AI runs on specialized chips. The star is the [[gpu|GPU]] (graphics processing unit), built for video games and perfect for the thousands of small calculations at once that AI needs.

Nvidia dominates this floor, and not only through hardware. Its software toolkit, [[cuda|CUDA]], is nearly twenty years old and the default for AI engineers, so switching away is painful.

Challengers come from two sides. AMD sells rival GPUs. And the biggest buyers now design [[custom silicon|custom chips]] to cut their dependence on Nvidia: Google's [[tpu|TPUs]], Amazon's Trainium, and chips for Meta and OpenAI, often built with Broadcom.

Then the choke points. Almost every advanced AI chip, whoever designs it, is made by TSMC in Taiwan, and TSMC's best factories rely on machines only one company makes: ASML, in the Netherlands. And every AI chip needs [[hbm|high-bandwidth memory]] from essentially three suppliers: SK hynix, Samsung and Micron.

### Floor three: cloud

Most companies don't buy AI chips. They rent. The [[hyperscaler|hyperscalers]] (Amazon Web Services, Microsoft Azure and Google Cloud) and Oracle buy chips by the hundreds of thousands and rent out computing power by the hour, as do AI-only landlords called [[neocloud|neoclouds]], such as CoreWeave and Nebius. Cloud is the toll road: whichever model wins, somebody pays a cloud to run it.

### Floor four: model labs

The floor everyone talks about: OpenAI, Anthropic, Google DeepMind, Meta, xAI, Mistral, DeepSeek and Alibaba's Qwen team. They build [[foundation model|foundation models]] (Chapter 3), spend staggering sums on [[training]], then sell access two ways: subscriptions, and an [[api|API]], a pay-per-use connection that lets other companies build the model into their own products.

### Floor five: tools and infrastructure

The plumbing between a raw model and a finished product: companies that store and prepare data (Databricks, Snowflake), host models (Hugging Face), and supply the human experts who train and grade them (Scale AI, Mercor). Rarely famous. Usually essential.

### Top floor: applications

Where people meet AI: ChatGPT and Claude themselves, Microsoft Copilot, coding tools like Cursor, the answer engine Perplexity, legal AI like Harvey, and AI features inside products from Salesforce to your banking app. Apps own the customer, but most rent their intelligence from the floor below, paying by the answer.

:::analogy The restaurant supply chain
Think about a dinner out. You pay the restaurant. The restaurant pays a food distributor. The distributor pays the farms, ranches and fishing boats. And everyone along the way pays the utility company to keep the lights on and the walk-in freezer cold.

AI is the same shape. The user pays the app. The app pays the model lab by the token. The lab pays the cloud. The cloud has already paid Nvidia, and Nvidia has paid TSMC.

Profit in any chain like this pools wherever something is scarce. The restaurant owns the customer, yet restaurants famously run on thin margins, while the only farm growing an ingredient every chef wants can name its price. In AI today the scarce things are chips and power, so the fattest margins sit at the bottom of the building. Investors have an old name for this: in a gold rush, sell picks and shovels. The big question is whether the profits shift upward.
:::

## Follow the money

### The capex boom

[[capex|Capex]] (capital expenditure) is spending on long-lived assets: buildings, chips, power equipment. As of mid-2026, Amazon, Microsoft, Alphabet and Meta were together guiding to more than $700 billion of capex for 2026, up from roughly $400 billion in 2025, most of it for AI.

That strains even the richest companies on earth. By mid-2026, Amazon's free cash flow over the prior twelve months had turned negative: it was spending more on buildings and chips than its businesses generated.

### Training vs. inference

Training builds the model: a huge, lumpy, upfront bill, like building and fitting out the restaurant. [[inference|Inference]] runs it: every question costs compute, like the ingredients and staff behind every meal served. Inference is increasingly the bigger bill, because hundreds of millions of people use these tools weekly and [[reasoning model|reasoning models]] "think" through many steps per answer. It's also where the business model lives: it grows with customers.

### The token: AI's unit of sale

Labs sell by the [[token]], a chunk of text about three-quarters of a word. Businesses pay per million tokens, with output (the answer) priced higher than input (the question).

The striking part: the price of a given level of capability keeps collapsing. The venture firm a16z estimated in 2024 that the same quality of answer was getting about ten times cheaper each year; the research group Epoch AI has measured even steeper drops on some tasks.

Yet total spending keeps rising. When something gets cheaper, people use far more of it; economists call this the [[jevons paradox|Jevons paradox]]. Cheaper tokens mean more products built on AI, longer jobs handed to [[agent|agents]], and more "thinking" per question.

:::myth Myth vs. reality
**Myth:** AI prices are collapsing, so AI will soon be a rounding error in the budget.
**Reality:** The price per unit of intelligence is collapsing. The number of units consumed is growing faster. Companies that succeed with AI usually see the bill go up. Budget for volume, not price.
:::

### Margins, floor by floor

[[gross margin|Gross margin]] is the share of each revenue dollar left after the direct cost of delivering the product: the quickest read on pricing power. Mature software companies typically keep 70 to 80 cents. As of mid-2026:

- **Chips:** Nvidia reported a 75% gross margin for the quarter ending July 2026, software-like profits on hardware. TSMC reported about 68% for April to June.
- **Cloud:** AWS earned about a 39% operating margin in the April-to-June quarter, on revenue up 37%. The real test is the return on all that capex.
- **Model labs:** Historic revenue growth, and still deep losses. Reported gross margins sit well below software norms, because every answer burns compute bought from the floor below.
- **Apps:** Many pay a lab for every answer, so margins run thinner than classic software unless they own the model, the workflow or the outcome.

The pattern so far: the lower the floor, the fatter the margin.

## Moats: what protects the profits

A [[moat]] is an advantage that keeps competitors from taking your profits. Five matter most in AI.

1. **Compute.** Chips and power are rationed. Locking them up early is a moat, and a trap if demand disappoints.
2. **Talent.** A few hundred elite researchers can build a [[frontier model]]; companies now court them the way studios court movie stars.
3. **Distribution.** Microsoft is in the office, Google in search, Apple on the iPhone. A good model inside a product people already use beats a great one they have to go find.
4. **Data.** Models trained on the same public internet converge. What stays different is data nobody else has.
5. **Trust.** Regulated enterprises buy from vendors they trust with their data.

### Why proprietary data matters more now

As models get better and more alike, value shifts to the ingredients they can't get elsewhere. Much of the public internet has already been used for training, and copyright lawsuits are raising the cost of scraping the rest. And no trained model knows what happened this morning; someone has to feed it live data.

So data that is official, accurate, fast and rights-cleared gets more valuable. Back to the restaurant: models are kitchens, and new ones open every year. Proprietary data is the ingredient only one farm grows. Kitchens compete; the farm stays scarce. Chapter 7 takes this into sports and betting.

:::room Say this in the room
- "The models are getting cheaper and more alike every quarter. The durable value is what they can't get anywhere else: proprietary, rights-cleared, real-time data."
- "Before we pick a model, tell me what data it's grounded in and who owns the rights."
- "Cheaper tokens won't shrink the bill. Budget for volume."
:::

## Open vs. closed: two business strategies

**Closed models** stay private and are sold as access. OpenAI's, Anthropic's and Google's top models work this way.

**[[open-weight model|Open-weight models]]** are published for anyone to download, run and modify. DeepSeek, Alibaba's Qwen, several Mistral models and Meta's Llama family are the best-known examples.

Why give away something that cost a fortune to build? Think of how Google gives Android to phone makers for free. It isn't charity: it keeps any rival from owning the phone, and Google makes its money on the search and apps that run on it. Meta earns its money from ads, so free models mean no rival can charge it a toll. Chinese labs have won global adoption this way despite US limits on their access to top chips. Mistral and Alibaba sell what surrounds the model: enterprise deployments and cloud.

It's strategy, not ideology, and it shifts with position. Meta made open models famous with Llama, then in April 2026 launched its new flagship, Muse Spark, as a closed model. When you think you're ahead, you charge.

The commercial effect is a price ceiling: open models set a free floor for "good enough," so closed labs must stay clearly ahead to earn premium prices. For buyers, that means more options, lower costs and the ability to run AI inside their own walls.

## Who pays whom

### The partnerships web

AI's giants are each other's customers, suppliers, investors and competitors at once, like Samsung, which supplies parts for the iPhone while selling the phones that compete with it. The main threads, as of mid-2026:

- **Microsoft and OpenAI.** Microsoft held about 27% of OpenAI after an October 2025 restructuring and remains its primary cloud. But since April 2026 OpenAI can sell on any cloud, and Microsoft builds its own models and uses Anthropic's inside Copilot.
- **Amazon and Google with Anthropic.** Both are major investors and suppliers. Amazon is Anthropic's primary training partner, on its Trainium chips; Google supplies up to a million TPUs. Microsoft and Nvidia joined in November 2025.
- **Everyone with OpenAI.** OpenAI has compute deals with Oracle (the Stargate project), AWS, CoreWeave and others, plus chip deals with Nvidia, AMD and Broadcom. Amazon, while backing Anthropic, also agreed in early 2026 to invest up to $50 billion in OpenAI.
- **Suppliers funding customers.** Nvidia has invested in OpenAI, Anthropic and neoclouds that buy its chips. AMD gave OpenAI, and later Meta, warrants for up to 160 million AMD shares each, vesting in stages as they deploy its chips.
- **Rivals renting from rivals.** SpaceX, which absorbed xAI in February 2026, rents xAI's original Colossus supercomputer to Anthropic. Apple chose Google's Gemini to help power the new Siri.

In AI, a partner is often a competitor you haven't fought yet.

### How to read an AI headline

Ask four questions.

1. **Which floor?** A chip launch, a data center deal, a model release and an app launch have different economics.
2. **Who pays whom, and in what?** Cash, cloud credits, chips, equity or warrants (the right to buy stock later at a set price). Much AI "investment" makes a round trip: the money comes back as purchases of the investor's own product.
3. **Spent, committed or "up to"?** "Up to," "letter of intent" and deals sized in gigawatts are the language of options, not cash. Deals get resized.
4. **Who's exposed if demand disappoints?** Look for debt, one dominant customer, or long contracts with a money-losing startup.

Try it on a real one. In January 2025, the Chinese lab DeepSeek released a reasoning model it said was trained for a fraction of what US labs spend. Investors feared AI would need fewer chips, and Nvidia lost roughly $590 billion of market value in a day. Run the questions and the read changes: this was model-floor news about efficiency, and cheaper AI tends to grow demand. Nvidia's quarterly revenue more than doubled over the next eighteen months.

A harder one. In September 2025, Nvidia said it would invest "up to" $100 billion in OpenAI as OpenAI deployed 10 gigawatts of Nvidia systems: money that would largely flow back as chip purchases, under a letter of intent, with a money-losing lab carrying the risk. It never became a final contract. In early 2026 Nvidia instead put $30 billion of equity into OpenAI's funding round, and in August it agreed to guarantee up to $105 billion in support of a data center campus being built for OpenAI. Same relationship, different shape.

:::room Say this in the room
- "Which floor of the stack is this, and who's paying whom?"
- "Is that number spent, committed or 'up to'? What triggers the rest?"
- "If the investor is also the supplier, part of that investment is really a sale."
:::

## The investor lens

### Where the value has gone so far

Follow the profits, not the headlines. The clearest winners so far sit at the bottom of the building: Nvidia, TSMC, the memory makers and the power-equipment suppliers. The clouds come next, growing faster (as of mid-2026, AWS was up 37% a year and Azure more than 40%) while spending more than ever. The labs grow revenue at historic speed and still lose billions. At the top, a few apps have broken out, coding tools most of all; many others are thin "wrappers," exposed the day the lab ships the same feature.

### The bubble debate

**The bear case:** Spending is far ahead of revenue; in 2024, Sequoia's David Cahn called it "AI's $600 billion question," and spending has grown enormously since. Suppliers invest in customers who then buy their products, which can flatter demand. More data centers are financed with debt. And if chips lose value faster than the accounting assumes, today's profits are overstated.

**The bull case:** Unlike the dot-com era, most of the money comes from some of the most profitable companies ever built. The clouds report large backlogs and say they can't build fast enough. Hundreds of millions of people use these tools weekly, and businesses pay for them.

The calm view: both can be true. Railroads in the 1800s and fiber-optic networks in the late 1990s were transformative, and overbuilt. Investors lost money; the infrastructure got used for decades. So don't ask "Is AI real?" Ask "Who is overpaying, and who holds the debt if the timing is off?"

### What to watch

- **Capex vs. cloud revenue.** If spending keeps rising while cloud growth slows, worry.
- **The labs' real numbers.** Anthropic has confidentially filed to go public, and OpenAI may follow. Public filings will show true margins.
- **Nvidia's gross margin.** The pressure gauge for custom chips taking share.
- **Power.** Grid connections, turbine backlogs and nuclear restarts pace the buildout.
- **Price wars.** Cheap open-weight models, many from China, keep pulling prices down.

For company-by-company detail, see the **Players** page.

:::teach Teach it in 60 seconds
Every time you ask ChatGPT a question, about half a dozen companies get paid. AI is a stack: power and data centers at the bottom, then chips, cloud, model labs, tools, and the apps you touch. Like any supply chain, profit pools wherever something is scarce, and right now that's chips and power. That's why Nvidia earns software-like margins while most labs still lose money. The twist: the price of an answer of a given quality falls roughly tenfold a year, yet total spending keeps climbing, because cheaper answers mean far more of them. So for any AI headline, ask: which floor, and who pays whom?
:::

## Check yourself

1. Your CFO asks, "Token prices fell sharply this year, so why did our AI bill triple?" What do you tell them?

<details><summary>Answer</summary>

The price per token fell, but usage rose much faster: more teams adopted AI, tasks got longer, and reasoning models and agents use many more tokens per job. That's the Jevons paradox. Track cost per outcome (per contract reviewed, per ticket resolved), not the total bill.

</details>

2. A headline reads: "Chipmaker to invest up to $50 billion in AI lab; lab commits to deploy 5 gigawatts of the chipmaker's systems." What do you ask before you're impressed?

<details><summary>Answer</summary>

Who pays whom: the chipmaker's cash likely comes back as chip purchases, so part of the "investment" is really a sale. Spent or "up to": this is staged money tied to milestones, and such deals get resized. Who's exposed: a money-losing lab carrying a huge commitment.

</details>

3. A startup pitches an app built entirely on a leading lab's model. What's the biggest risk to its margins and its moat?

<details><summary>Answer</summary>

It pays the lab for every answer, so costs rise with usage and margins may never look like classic software. If the product is mostly the model, the lab or a rival can copy it. Ask what it owns that the lab doesn't: proprietary data, a workflow customers depend on, or distribution.

</details>

4. Why might a company with exclusive, official, real-time data gain bargaining power as models get better and cheaper?

<details><summary>Answer</summary>

As models converge, the scarce input becomes data they can't get elsewhere. Live information, like today's prices or tonight's results, can't be baked into a trained model; whoever holds the rights must supply it live. Cheaper models mean more products that need that feed, so more buyers for the scarce ingredient.

</details>

:::key Key takeaways
- AI is a six-floor stack: energy and data centers, chips, cloud, model labs, tools, and applications.
- Profit pools where something is scarce. Today that's chips and power, so the bottom of the stack has the fattest margins.
- The price of a given level of AI capability falls roughly tenfold a year, but total spending keeps rising because usage grows faster.
- The moats that matter are compute, talent, distribution, data and trust. As models converge, proprietary real-time data gets more valuable.
- Open vs. closed is business strategy: closed labs sell access; open-weight models win adoption and cap prices.
- Read every headline with four questions: which floor, who pays whom, spent or "up to," and who's exposed.
:::
