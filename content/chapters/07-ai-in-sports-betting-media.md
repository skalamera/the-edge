---
number: 7
title: AI in Sports, Betting & Media
subtitle: Where AI is already reshaping your industry, and where it's headed next.
minutes: 16
---

Most industries are still working out where AI fits. Yours has run on it for years under other names: tracking, trading models, automated highlights. What changed between 2024 and 2026 is speed and reach. Cameras map every limb on the pitch. Prices update between pitches. Sponsors buy moments instead of boards. This chapter maps where AI actually sits across sports, betting and media, and where the value and the risk are moving.

:::why Why this matters to you
You sit where three AI stories meet: data, betting and advertising. Every partner you talk to, from a sportsbook's head of trading to a league's media team, is making AI decisions right now. The person who can connect those pieces accurately, without hype, is the one they call first.
:::

## Why sports is built for AI

Recall the core idea from earlier chapters: a [[machine-learning|machine learning]] model learns patterns from examples, and more (and cleaner) examples make it better. Sports is almost unfairly well suited to that:

- **Structured data at scale.** Every game produces clearly labeled events: a completed pass, a missed shot, a 97 mph fastball. Decades of it.
- **Clear outcomes.** Most business forecasts never get a clean verdict. A game ends and the model learns whether it was right. That feedback loop is gold.
- **Live events.** Games unfold in real time, creating demand for predictions that update in seconds.
- **Video and attention.** Enormous volumes of broadcast video, and enormous audiences to sell to.

In your industry, AI isn't a side project. It's the plumbing.

## Data and tracking: the raw material

### From clipboards to cameras

For most of history, sports data meant a person logging events. That's still part of official data: trained data collectors in the venue log each event into a live feed.

The big change is [[computer-vision|computer vision]], software that turns video into structured data. Point cameras at a field and a model identifies every player and the ball, frame by frame, and outputs their coordinates. Stack the frames and you have a moving digital replica of the game.

The detail keeps jumping. Early optical systems tracked each player as a single dot. Newer ones track a "skeleton" of body points. The latest map a full surface "mesh." The Premier League's semi-automated offside system, developed with Genius Sports and introduced in April 2025, uses up to 30 cameras per stadium and up to 10,000 surface points per player, according to the league.

That stream of coordinates feeds officiating, broadcast graphics, team analytics and betting. One capture, many buyers.

### Where Genius Sports fits (public information)

A few public facts worth having straight:

- Genius Sports acquired Second Spectrum, an optical tracking and sports AI company, in 2021.
- It is the NFL's exclusive distributor of real-time official play-by-play data, Next Gen Stats data and the league's official betting data feed, under a deal extended in June 2025 through the 2029 season.
- Under a deal with Football DataCo, it holds exclusive official betting data rights for the Premier League, EFL and Scottish Professional Football League through 2029, and is the official tracking data partner for the Premier League and Championship.
- In August 2024 it launched GeniusIQ, which it describes as the AI and data platform tying these products together.

### Why "official" matters

Official data is licensed from the league and captured with its cooperation, usually inside the venue. It matters for three reasons. It's fast: Genius says its English football feed reaches sportsbooks in under a second. It's the recognized source of truth when a bet is settled. And it comes with rights: the league has blessed it and, often, linked it to integrity monitoring.

## Betting: where models meet money

### Pricing and live trading

A sportsbook's core product is a price. Odds compilation means estimating the probability of each outcome, then adding a margin so the book profits over time.

Before a game, models trained on past results, player data and market prices draft the odds, and traders adjust. In-play (betting while the game is on), the price must update after every event, with the live data feed as its input. Across thousands of games at once, only models can do that first pass; traders supervise, handle unusual situations and manage exposure. Operators buy prices and trading services from specialist suppliers, build in-house, or mix the two.

### Props, parlays and the correlation problem

Player props, bets on individual stats like a quarterback's passing yards, multiplied the markets per game. Same-game parlays ("bet builders" in Europe) let a bettor combine several.

The hard part: the legs are connected. If the quarterback throws for 350 yards, his top receiver probably had a big day too, so you can't just multiply the odds. The book needs a model of how outcomes move together, often built by simulating the game thousands of times. Get the correlation wrong and sharp bettors find it fast.

That's why player-level official data has become its own product. From the 2025/26 season, Genius distributes official Player Market Data for English football (shots on target, assists, pass completions) to power these markets.

### Micro-betting: a race against the screen

Micro-betting shrinks the market to the next play: next pitch, next point, next drive. Each market lives for seconds, so the system must price and settle almost instantly.

:::analogy The friend in the stands
Picture a friend at the ballpark texting you each pitch while you watch on TV, a few seconds behind. If the sportsbook's data were as slow as your TV, you'd know the result before its market closed. Betting on that gap from inside the venue is called "courtsiding." It's why [[latency]], the delay between something happening and the data arriving, is the whole ballgame in micro-betting. The book's data has to beat the fastest person in the building. A brilliant pricing model that's a second late is a model that gives money away.
:::

### Risk and personalization

Behind every price sits the risk desk. Models watch liability (how much the book loses on each outcome) and flag accounts that consistently beat the market, which books use to set betting limits.

Personalization works like Netflix recommendations: show each customer the markets, promotions and suggested bets they're most likely to act on. [[generative-ai|Generative AI]] is adding a conversational layer, such as assistants that explain odds or help build a bet slip.

### Integrity, responsible gaming and KYC/AML

Here, AI plays defense.

**Integrity.** Monitoring systems compare betting patterns across many sportsbooks and flag anomalies, like a sudden rush of money on an obscure prop. In 2024, a monitor flagged irregular bets tied to NBA player Jontay Porter; he was banned for life and later pleaded guilty to a federal conspiracy charge. In November 2025, federal prosecutors indicted two Cleveland Guardians pitchers, alleging they agreed in advance on specific pitch types and speeds for bettors. The lesson: the smaller the market, the easier one player can control it, so integrity risk concentrates in props and micro-bets.

**Responsible gaming.** Models can spot markers of harm: chasing losses, rising deposits, late-night sessions, cancelled withdrawals. Sportradar, for example, launched an AI responsible-gaming product, Bettor Sense, in 2025. The uncomfortable truth: the model that finds a book's most valuable customer and the one that finds its most at-risk customer read the same signals. Which way the system leans is a governance decision, not a technical one.

**KYC and AML.** "Know your customer" checks confirm a bettor is who they claim, of legal age and somewhere betting is legal; anti-money-laundering (AML) monitoring flags suspicious money flows. AI reads ID documents, matches a selfie to the photo and runs "liveness" checks to confirm a real person is present. The new threat is [[deepfake|deepfakes]], AI-generated faces and documents good enough to fool weak checks. Both sides of that arms race use AI.

:::room Say this in the room
- "Micro-betting is a latency business before it's a product business. The model is only as good as the speed of the feed it prices from."
- "Same-game parlays are a correlation problem. Player-level official data is what lets a book price those connections with confidence."
- "The signals that identify a VIP also identify someone at risk. I'd want to know who decides which way the model leans."
:::

## Media and sponsorship: from logos to moments

### Automated content

AI now cuts highlights on its own. WSC Sports, whose clients include the NBA, NHL and NASCAR, uses models that recognize key moments in a broadcast and publish clips within minutes. Volume enables personalization: instead of one reel for everyone, feeds assemble around the teams, players and bets each fan follows.

Voice and translation are next. For the Paris 2024 Olympics, NBC's Peacock offered personalized daily recaps narrated by an AI-generated version of Al Michaels' voice, with his consent. AI commentary and translation can carry one broadcast into many languages cheaply. The risk is accuracy: a [[large-language-model|large language model]] can [[hallucination|hallucinate]] a stat. The fix is grounding it in live official data, one more reason trusted feeds matter.

### Sponsorship measurement, rebuilt

You know the old way. A sponsor bought signage. After the game, someone reviewed the broadcast, timed every second the logo was clearly visible and multiplied by a media rate. Slow, sampled and easy to argue with.

Computer vision does that on every frame, across broadcast, streaming and social clips. Firms such as Relo Metrics sell exactly this to teams including the Kansas City Chiefs. The renewal conversation changes: instead of debating an estimate, both sides look at the same detailed record.

### Selling the moment

The bigger shift is from measuring exposure to creating inventory. With live tracking data, a broadcast can fire a branded graphic when something specific happens, such as shot probability crossing a threshold.

Genius has publicly announced products in this direction. In February 2026 it launched AI-driven "augmented advertising" with NBC Sports Regional Networks across more than 600 local NBA games per season for 15 teams, using GeniusIQ to trigger branded integrations around real-time insights such as shot probability and defender distance. Its May 2026 Liga MX partnership includes a "Moment Engine" that lets sponsors trigger campaigns around key game events.

For someone who has sold signage and stadium partnerships, this is the headline: the unit of sale is moving from a location to a moment, and moments can be targeted, measured and priced.

## Teams and leagues

The same tools reach the front office and the field.

- **Scouting and performance.** Tracking turns film study into measurement (sprint speeds, spacing, workload) for recruiting, game planning and load management.
- **Injury risk.** The NFL's Digital Athlete program, built with AWS, analyzes game and practice data to estimate injury risk; AWS says this work helped shape safety changes such as the 2024 Dynamic Kickoff rule. Injuries are hard to predict, so the honest word is "risk," not "forecast."
- **Officiating.** Semi-automated offside is live in the Premier League, which expected it to save roughly 30 seconds on close calls, and in Liga MX through a 2026 Genius partnership.
- **Ticketing and fans.** Dynamic pricing moves seat prices with demand signals like opponent, weather and resale activity. Apps and chat assistants personalize the fan experience.

## The rules and the rights

### Regulation: AI inherits gambling's rulebook

There isn't much AI-specific gambling law yet. There is a strict gambling rulebook that AI now has to live inside.

- **US states** license operators and many suppliers, approve systems, and set responsible gaming and marketing rules. For any model touching pricing, bonuses or customer treatment, expect the question: can you explain why it did what it did?
- **Britain's Gambling Commission** already requires online operators to monitor customers for indicators of harm and act on them. AI sharpens that monitoring and shrinks the room for "we didn't know."
- **The [[eu-ai-act|EU AI Act]]** has, since February 2025, banned AI that manipulates people or exploits their vulnerabilities in harmful ways. A promotions engine aimed at a struggling bettor is exactly what regulators will test against that line. (Chapter 9 covers the Act.)
- **Proposals go further.** The SAFE Bet Act, a federal bill first introduced in 2024, would bar operators from using AI to track individual bettors' habits or create individualized offers.

Then there are prediction markets: exchanges overseen by the federal Commodity Futures Trading Commission (CFTC), where users trade contracts on outcomes, including games. As of late September 2026, federal appeals courts are split on whether states can regulate their sports contracts, and the question looks headed for the Supreme Court. Either way, these platforms now buy official data. Kalshi signed a data and integrity deal with Sportradar in June 2026. In August, Polymarket and Kalshi each signed one with Genius, with official data used to settle contracts.

### Data rights in the AI era

AI changes what a data license is worth, and what it needs to say. Three questions every rights holder and buyer now faces:

1. **Training rights.** Can the licensee use the data to train models, or only to display and price with it?
2. **Derived data.** If a model trained on official data produces its own probabilities or stats, who owns those outputs?
3. **AI distribution.** When a fan asks an AI assistant, "Will the Commanders cover tonight?", a good answer needs live, licensed data, fetched at answer time through [[rag|retrieval]] rather than recalled from memory. That makes AI platforms a new kind of data customer.

:::myth Myth vs. reality
**Myth:** Computer vision lets anyone turn a broadcast into data, so official data is becoming a commodity.
**Reality:** Computer vision does lower the cost of producing some data, and that pressure is real at the low end. But a broadcast is delayed, partial and unlicensed. Official data's value is being first, accurate, the legally recognized settlement source and tied to integrity monitoring. The more models depend on live inputs, the more that combination is worth. That's the [[moat]] (see chapter 4).
:::

## The competitive frame, and questions worth asking

### Who else is on the field

- **Sportradar**, the largest direct competitor, holds official partnerships with the NBA, NHL and MLB (extended through 2032, with MLB taking an equity stake). It took over IMG Arena's betting rights portfolio in November 2025 and has launched AI products including Alpha Odds (odds and risk) and Bettor Sense.
- **Other data and tracking players** include Stats Perform (Opta) and Sony's Hawk-Eye, which runs optical tracking for the NBA and MLB.
- **Sportsbooks building in-house.** Large operators develop their own pricing and personalization, and are moving into prediction markets: FanDuel announced a prediction product in November 2025, and DraftKings, after agreeing to buy the predictions platform Railbird, launched DraftKings Predictions that December.
- **Big tech clouds** such as AWS supply AI infrastructure to leagues and increasingly co-brand the insights.

Genius has also publicly broadened into media. In 2026 it completed the acquisition of Legend, the network behind Covers.com and Casino.org, in a deal valued at up to $1.2 billion. In September 2026, Legend launched Prediction.com, which compares prediction-market prices across platforms alongside live game data.

### Questions worth asking

These aren't claims about anyone's strategy. They're the questions that make you the most useful person in the meeting.

**With sportsbooks and prediction markets**
- Which parts of pricing do you want to own, and which to buy? Where does official data measurably improve your models?
- What's your end-to-end latency, from event to repriced market to settled bet?
- How do your personalization and responsible gaming models interact, and who arbitrates when they disagree?

**With leagues and rights holders**
- How should training rights and derived data be handled in the next data agreement?
- What new inventory could tracking data create for you, from officiating graphics to moment-based ads?

**Inside your own shop**
- Where do our tracking and data let us build something no one else can?
- As fans shift from search engines to AI assistants, what changes for distributing data, content and affiliate media?

### Your personal edge

You speak both languages this chapter joins: the sponsor's and the sportsbook's. The industry is fusing them into one product, a data-triggered moment that can be bet on, sponsored and measured. Few people can explain that to a CMO and a head of trading in the same week.

:::teach Teach it in 60 seconds
Open with a question: how does the Premier League call offside now? Up to 30 cameras track up to 10,000 points on each player's body. That's the heart of AI in sports: computer vision turns a live game into data in real time. Once the game is data, it can be priced (in-play odds), protected (alerts on strange betting patterns) and sold (a sponsor's graphic that fires when a scoring chance spikes). Whoever controls the fastest, most trusted, officially licensed version of that data holds the strongest hand.
:::

## Check yourself

1. A sportsbook executive says, "We can scrape broadcast video with computer vision, so why pay for official data?" What's your answer?

<details><summary>Answer</summary>

A broadcast runs seconds behind the action, and in in-play and micro markets a slow feed gets picked off. Scraped data also isn't the recognized settlement source, isn't licensed and has no integrity link to the league. Books pay for speed, accuracy, rights and trust.

</details>

2. Why can't a sportsbook price a same-game parlay by multiplying the odds of each leg?

<details><summary>Answer</summary>

Because the legs are correlated. A quarterback's big day makes his top receiver's big day more likely, so the combined probability differs from the simple product. Books use models, often simulations, to estimate how outcomes move together, and player-level data feeds those models.

</details>

3. A longtime sponsor asks how "moment-based" inventory differs from the LED board package they've bought for years. How do you explain it?

<details><summary>Answer</summary>

A board sells a location for a stretch of time, valued by estimated exposure. Moment-based inventory triggers the brand when a defined game event happens, using live tracking data, so it's tied to peak attention, targeted to the moments the sponsor cares about and measurable frame by frame with computer vision.

</details>

4. A sportsbook partner describes a new AI model that sends bigger bonuses to customers whose betting is accelerating. What concerns do you raise?

<details><summary>Answer</summary>

Accelerating activity is also a classic marker of harm, so the model may target exactly the customers it should protect. Regulators focus on this tension, from UK customer-interaction rules to the EU AI Act's ban on exploiting vulnerabilities. You'd want responsible gaming checks built in, human oversight and the ability to explain its decisions.

</details>

:::key Key takeaways
- Sports is a natural AI domain: structured data, clear outcomes, live events, and massive video and attention.
- Computer vision turns games into data, and one tracking stream feeds officiating, broadcast, teams and betting.
- In betting, AI prices, trades and protects. Micro-betting is a latency race, parlays are a correlation problem, and integrity risk concentrates in the smallest markets.
- In media, the unit of sale is shifting from a location to a moment, triggered by live data and measured by computer vision.
- Regulation is mostly gambling law applied to AI; the central tension is personalization versus player protection. Prediction markets are a new, contested buyer of official data.
- In the AI era, official data's moat is speed, accuracy, legal rights and integrity, not just possession.
:::
