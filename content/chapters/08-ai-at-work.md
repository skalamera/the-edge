---
number: 8
title: AI at Work: Buying, Selling & Deploying
subtitle: How companies actually adopt AI, and how to be the person who gets it right.
minutes: 15
---

Every company now says it's "doing AI." Far fewer can show you what it changed. The gap between those two statements is where careers get made in this cycle.

This chapter is the operator's manual: adoption, vendors, pricing, ROI, contracts, selling, and getting people to actually use it.

:::why Why this matters to you
You sit on both sides of the AI table. You buy tools for your team, and you sell data, betting technology and media products to sportsbooks, leagues and media partners who all want to know what's AI-powered and what it's worth. The winners of this cycle won't be the people who bought the most AI. They'll be the ones who made it pay off without getting burned.
:::

## How companies actually adopt AI

Most companies go through three stages. First, everyone experiments, often on personal accounts the company can't see. That's [[shadow ai|shadow AI]], and it's usually well underway before leadership notices. Second, the company buys an enterprise tool and runs [[pilot|pilots]]. Third, a few pilots become real workflows. Most don't.

That third stage has a name: [[pilot purgatory]]. The pilot "worked," everyone liked the demo, and six months later it's still a pilot.

The data backs this up, with caveats. A widely cited 2025 report from MIT's Project NANDA found about 95% of enterprise generative AI pilots showed no measurable profit impact. It drew fair criticism for its small sample, so treat it as directional. McKinsey's late-2025 global survey told a similar story: most companies use AI somewhere, but only about 6% were "high performers" getting meaningful profit from it.

Pilots rarely die because the model is bad. They die because:

- **Nobody owns the result.** There's a sponsor, but no one whose number depends on it.
- **There's no baseline.** Nobody measured the old way, so nobody can prove the new way is better.
- **The demo ran on clean data.** Real data is messy and scattered.
- **AI got bolted onto the old process** instead of changing it.
- **Legal and security showed up last,** found a problem, and reset the clock.

The fix is the mirror image. Pick one painful, frequent, measurable workflow. Agree up front on what success looks like and what would kill the project. Put the people who do the work in the room, redesign the process around the tool, and bring legal and security in on day one. McKinsey's high performers were far more likely than everyone else to have redesigned workflows, not just added tools.

### Build, buy or partner

- **Buy** when the capability is common and isn't your edge: meeting notes, coding assistants, support drafting, contract review. Vendors spread R&D across thousands of customers. You won't keep up.
- **Build** when it's core to how you win and depends on data only you have. "Build" today rarely means training your own model. It usually means building on a [[foundation model]] from a major lab, reached through an [[api|API]], with your data plugged in through [[retrieval-augmented generation|RAG]] or [[fine-tuning]] (Chapter 3).
- **Partner** when you have the data or distribution but not the talent or speed, with clear terms on who owns what.

The rule of thumb: **buy the commodity, build the edge, partner for speed.** The MIT study found tools bought from specialized vendors succeeded roughly three times as often as internal builds.

When you buy, watch for the **[[wrapper|thin wrapper]]**: a nice interface on someone else's model. Fine if the workflow is valuable. Risky if OpenAI, Anthropic or Google could ship the same feature next quarter. Ask what the vendor owns that the model makers can't copy: proprietary data, deep integrations, a workflow customers depend on.

## Judging a vendor: ten questions

Every pitch deck now has "AI" on slide one. You don't need the engineering to ask these. You just need to notice when the answers get vague.

1. **What does the AI actually do, and what would the product be without it?** If they can't name the specific task the model performs, you may be looking at [[ai-washing|AI-washing]]: ordinary software with a new label.
2. **Can we test it on our data?** Demo data is hand-picked. Insist on a trial with your own messy inputs and success criteria agreed in advance.
3. **How do you measure quality?** Ask for their [[evals]], the tests that score the system on realistic tasks. "97% accurate" means nothing until you know: at what, on which data, compared with what?
4. **What happens when it's wrong?** Every system makes mistakes. Good vendors show you the failure modes and where a person steps in, keeping a [[human-in-the-loop]].
5. **Which models are under the hood, and what happens when they change?** Ask for notice before a model swap and proof they re-test afterward. A silent update can change your results overnight.
6. **Where does our data go?** Is it used to train anyone's model? How long is it kept, where, and which subcontractors can see it? Get "no training on your data" in writing.
7. **Who owns the outputs, and who's on the hook if they infringe?** You should own them, and the vendor should defend you if an output triggers a copyright claim.
8. **How is it secured?** Look for independent audits (SOC 2 Type II, ISO 27001, and increasingly ISO/IEC 42001, a certifiable standard for managing AI). If it's an [[agent]] that takes actions, ask how it resists [[prompt injection]].
9. **What does it cost at ten times today's volume?** AI costs money every time it runs. Get the pricing curve and the overage terms.
10. **Who uses it in production today, and can I call them?** Not pilots. Production. A reference at a company like yours beats any demo.

The red flags write themselves: "proprietary AI" that's a standard model with a clever prompt, numbers without definitions, a demo they won't run on your inputs, shifting answers about data, "fully autonomous" for anything high-stakes, and pricing they can't model for you.

:::analogy Hiring off a polished interview
A vendor demo is a job interview where the candidate wrote the questions. Every answer is rehearsed, every example is their best work, and nothing goes wrong. No good hiring manager makes an offer on that alone. They ask for a work sample, hand the candidate a messy real problem, and watch how the person handles a mistake, not just a win.

Treat AI the same way. A trial on your own data is the work sample. Evals are the skills test, useful only if the test looks like the actual job. References are the calls to former managers. Hire on the work, never the interview.
:::

## Pricing and ROI

### Seats, usage and outcomes

AI gets sold three ways, and most contracts mix them.

- **Per seat:** a monthly fee per user. Microsoft launched its enterprise Microsoft 365 Copilot at $30 per user per month in 2023. Easy to budget, but you pay for people who never open it.
- **Per usage:** you pay for what you consume, often counted in [[token|tokens]] or credits. Fair, but hard to forecast.
- **Per outcome:** you pay when the AI finishes a job, like a resolved support ticket. Customer-service vendors such as Intercom have priced per resolved conversation, at under a dollar each (as of 2026).

Why is AI breaking the old model? Traditional software cost almost nothing to run for one more user. AI doesn't: every answer requires [[inference]], which costs real money (Chapter 4). And if AI does the work, companies need fewer people using the software, so a vendor charging per seat is selling against itself. Buyers increasingly want to pay for results, not access.

:::analogy Paying AI like you'd pay a recruiter
Think about how companies pay recruiters. A retained search firm gets paid up front, whether or not anyone gets hired. A contingency recruiter gets paid only when the new hire actually starts. Each deal shifts risk. The retainer protects the recruiter. The contingency fee means you pay only for a result.

AI pricing is making the same moves. Per seat is the retainer. Per outcome is the contingency fee. And the same fights follow. Does a hire count at the signed offer, the first day or ninety days in? Who keeps the records? What stops the recruiter from claiming credit for a candidate who had already applied on their own? Swap "hire" for "resolved ticket" and those are exactly the questions to settle with an AI vendor.
:::

As a buyer, model three volume scenarios before you sign, negotiate caps, and push for price reductions over time, since the cost of running AI keeps falling (Chapter 10). If you pay per outcome, define "outcome" as tightly as a good recruiting contract defines a hire: what counts, who confirms it and what happens if it doesn't stick.

### Proving it pays

AI value lands in three buckets:

- **Time saved.** The most common claim and the most inflated.
- **Revenue generated.** More deals worked, faster responses, better conversion, new products.
- **Risk reduced.** Fewer errors, faster fraud detection, cleaner compliance. Hardest to see, sometimes the biggest.

Beware the time-saved trap. "Five hours a week per person" times 200 people makes a great slide. Then the CFO sees no change in costs or revenue. Saved time only becomes value when it goes somewhere: more partners covered, faster turnaround, a hire you didn't need. Always ask "and then what?"

A simple way to measure:

1. **Pick one painful, frequent, measurable workflow.** RFP responses, partner meeting prep and contract summaries are good candidates.
2. **Measure the baseline first:** time per task, error rate, win rate.
3. **Compare:** a team using AI against one that isn't, or before against after.
4. **Count every cost,** including the time people spend checking the AI's work.
5. **Report results, not usage.** "80% of the team logged in" is an impression count. "RFP turnaround fell from ten days to four, and we bid on a third more deals" is a result.

Marketing went through this exact shift, from counting impressions to proving attribution. AI is on the same arc, only faster.

## Data and the contract

### Your data is the edge

Your competitors can rent the same model you do. They can't rent your data, workflows and relationships. That's the [[moat]] (Chapter 4). Before any project, ask: Is the data accurate? Is it in one place? Is it labeled so a machine can tell what's what? Do we have the rights to use it this way? Many failed AI projects are data problems wearing an AI costume.

Privacy raises the stakes. Some of what companies hold is deeply sensitive: identity documents, financial details, health information and behavior patterns that reveal more about a person than they'd ever volunteer. Privacy law and industry regulators can both apply, so legal and compliance belong in the room from the start.

### The terms that matter when you buy

- **Training rights.** Can the vendor use your inputs or outputs to train models? The answer should be no, in writing, for every vendor in the chain. The major labs' enterprise plans generally don't train on business data by default, but verify.
- **Retention and location.** How long is data kept, and where? For sensitive uses, ask about [[zero data retention]]: the provider processes your request and keeps nothing.
- **Output ownership.** You own what the system produces for you.
- **IP [[indemnity]].** Microsoft, Google, OpenAI and others have promised to defend enterprise customers against copyright claims over AI outputs. Read the conditions: they often require using the vendor's safety filters and exclude outputs you've modified.
- **Model changes.** Advance notice and the right to re-test.
- **Service levels.** Uptime, [[latency]], and what happens if it fails at your busiest moment.
- **Exit.** Data export and certified deletion when you leave.

### When you're the one licensing data

Now flip the table. If your company licenses data to others, AI raises a question older contracts never anticipated: can the licensee train a model on it? And what happens to that model when the license ends?

You can't un-bake a cake. A model trained on your data keeps what it learned after the data is deleted.

So treat AI training as its own right, the way an author sells print, audiobook, translation and film rights separately, each with its own price and term. Define it. Price it. Decide whether trained models and their outputs survive termination. Chapter 7 covers why this matters so much in sports data. Questions worth asking internally: do our standard terms define AI training at all, and do our partners' terms let them train on what we send them?

:::room Say this in the room
- "Before we talk features, can we run it on a month of our real data, with success criteria we agree on today?"
- "What's the error rate, measured how, and what happens downstream when it's wrong?"
- "Let's carve out AI training as a separate right in this license, with its own price and its own term."
- "If this saves time, where does the time go? Let's name the number that should move."
:::

## Selling AI-powered products honestly

Now you're across the table. Your buyers hear "AI-powered" in every pitch. It's wallpaper. What cuts through is specificity.

- **Lead with the problem, not the technology.** "We cut partner onboarding from six weeks to two" beats "our AI-driven platform."
- **Say what the AI does and what people do.** Buyers trust a clear division of labor more than claims of full autonomy. Think of an expense system: "the AI clears routine claims, and a manager approves anything over $500" is a selling point, not a weakness.
- **Talk about accuracy like an adult.** Name the metric, the data it was measured on and the baseline, and volunteer the failure modes. Alert products, like fraud detection, have two numbers that pull against each other: how many alerts are real, and how many real problems get caught. It's a smoke detector. Make it more sensitive and it shrieks at every slice of burnt toast. Calm it down and it might sleep through a real fire. Buyers who know that trust the vendor who says it first.
- **Speak to each buyer's goals.** Sportsbooks want margin, speed, risk control and personalization within responsible-gaming limits. Leagues want integrity, fan engagement and control of their data and IP. Media partners want engagement, ad yield and lower production cost.
- **Write every claim for the regulator.** Sportsbooks answer to gaming regulators. Any AI claim you make may land in front of one, or a board. Write it to survive that reading.

And never AI-wash. It's now a legal risk. In 2024 the Federal Trade Commission launched "Operation AI Comply" against deceptive AI claims, and the Securities and Exchange Commission settled charges against two investment advisers that marketed AI capabilities they didn't have. For a public company, AI claims to investors get the same scrutiny as any other material statement.

:::myth Myth vs. reality
**Myth:** Buyers want to hear that it's fully automated and never wrong.

**Reality:** Sophisticated buyers have been burned by that pitch. What earns trust is a specific claim, an honest error rate and a plan for when things go wrong. Confidence comes from precision, not superlatives.
:::

## Making it stick: people and governance

### Change management

The technology is the easy part. Most pilots die of human causes.

- **Fear.** People wonder if the tool is there to replace them. Say plainly what it's for, or silence gets filled with the worst interpretation.
- **Training.** Generic webinars don't change behavior. Hands-on, role-specific sessions do: "here's how an account manager preps a partner review in twenty minutes."
- **Incentives.** If using AI means finishing early and getting handed more work with no credit, people will hide it. Celebrate wins publicly and make it safe to say "I used AI for this."
- **Champions.** Adoption spreads person to person. One respected user per team who shares prompts and collects use cases beats any mandate. That person can be you.

### Governance

Governance sounds like a brake. That's the point: brakes are what let you drive fast. Nobody takes a winding mountain road at speed in a car they don't trust to stop. Companies with clear AI rules move faster, because people know what's allowed.

A workable AI policy covers five things:

1. **Approved tools**, on enterprise accounts, not personal ones.
2. **Data classes:** what can go into which tool. Customers' personal data and confidential deal terms get the tightest rules.
3. **Human review:** which outputs a person must check before they go out or drive a decision.
4. **Disclosure:** when you tell customers or partners that something was AI-generated.
5. **An inventory** of every AI use, tiered by risk. Internal drafting is low. Anything customer-facing, or touching people's money, access or jobs, is high. That's the same logic regulators use (Chapter 9).

Compliance teams often anchor on the US government's voluntary NIST AI Risk Management Framework or the ISO/IEC 42001 standard. Know the names; skip the details.

One warning: human review only works if the human actually reviews. People rubber-stamp a system that's usually right, which researchers call [[automation bias]]. Point reviewers at the cases most likely to be wrong, not a blur of every case.

## Becoming the AI-fluent leader

Inside a company, AI fluency isn't knowing the most. It's making it work without getting fooled.

- **Own one visible win.** Pick a workflow on your team, measure the baseline, run it for sixty days and report the business result. One real number beats a year of enthusiasm.
- **Be the translator.** Engineers talk models and evals. Executives talk revenue and risk. Whoever moves between the two ends up running the meeting.
- **Ask the ten questions.** Volunteer for vendor evaluations and governance work. Being the one who asks "measured how?" builds a reputation fast.
- **Keep a use-case log** of what worked and what didn't. It becomes your team's playbook and your promotion case.
- **Stay calm and accurate.** Don't push AI into everything. Know where it works, where it doesn't and why. That's who leadership calls. (Chapter 10 turns this into a lunch-and-learn.)

:::teach Teach it in 60 seconds
Most AI projects don't fail because the AI is bad. They fail because nobody changed the work. The model is increasingly the easy part, since anyone can rent a good one. The edge is picking the right workflow, measuring it honestly, protecting your data in the contract and getting people to use it. Picture a sales team that buys an AI tool to draft RFP responses. In version one, the tool sits beside the old process and usage fades within a quarter. In version two, the team rebuilds the process around AI drafts plus human review, tracks turnaround and win rate, and bids on more deals with the same headcount. Same tool, different result.
:::

## Check yourself

1. A vendor tells you its model is "97% accurate." What do you ask next?

<details><summary>Answer</summary>

Accurate at what task, measured on whose data, and compared with what baseline, such as your current process or a trained person? Then ask what the 3% of errors look like and what happens downstream when one occurs. A number without a definition is marketing.

</details>

2. Your team's pilot "saved 2,000 hours," but the CFO sees no change in costs or revenue. What happened, and how would you run the next one?

<details><summary>Answer</summary>

The time was counted but never redeployed, so it got absorbed. Next time, name up front the business metric the saved time should move (deals worked, turnaround, cost per ticket), measure the baseline, compare users with non-users, and count every cost, including review time.

</details>

3. A partner wants to fine-tune its own AI model on data you license to it. Which contract terms matter most?

<details><summary>Answer</summary>

Whether AI training is allowed at all, and priced as a distinct right. What happens to the trained model and its outputs when the license ends, since a model can't un-learn. Whether the model can be shared with third parties, plus audit rights and tight definitions of "training," "derivative models" and "outputs." Bring legal in early; older license language likely never anticipated this.

</details>

4. Your CEO asks whether to build an in-house AI tool for drafting partner proposals or buy one. What do you recommend?

<details><summary>Answer</summary>

Most likely buy, or configure an enterprise assistant you already have. Proposal drafting is a common capability that vendors improve faster than an internal team could, and it isn't what differentiates you. Save build effort for things that depend on data only you have. Either way, pilot it on your own past proposals with success criteria set in advance.

</details>

:::key Key takeaways
- Most AI pilots stall on ownership, measurement and workflow change, not technology. Pick a painful, measurable workflow and define success first.
- Buy the commodity, build the edge, partner for speed. "Build" usually means building on a foundation model with your data.
- Judge vendors on your data, their evals, and their answers about failure, data use and cost at scale. Vagueness is the red flag.
- Pricing is shifting from seats to usage and outcomes because AI costs money every time it runs. Define outcomes precisely.
- AI training is its own contract right. Protect it when you buy and price it when you license.
- Change management and governance make AI stick. Own a measurable win and be the one who asks "measured how?"
:::
