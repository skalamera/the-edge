---
number: 9
title: Risks, Regulation & the Big Debates
subtitle: The questions everyone argues about, and how to sound informed on all sides.
minutes: 17
---

AI conversations jump from the practical to the cosmic in a single sentence. Someone starts with a chatbot that gave a customer a wrong answer and ends with whether machines will outsmart humanity.

Both conversations are legitimate. They're just different. This chapter separates them, from everyday risks and copyright to the rulebooks being written from Brussels to Beijing, the AGI debate and the chip politics underneath. The goal isn't to pick a side. It's to know each side's best argument.

:::why Why this matters to you
Your political science and legal policy background is an advantage here. Most people in business rooms know the headlines. Few can explain how the EU tiers risk, why an executive order can't simply erase state laws, or what courts have actually decided about training on copyrighted work. You work in an industry built on state-by-state regulation, and you'll recognize the pattern. Accuracy on this is rare, and people notice.
:::

## The everyday risks

These risks are already costing companies money.

- **Confidently wrong answers.** You own your [[hallucination|hallucinations]]. In 2024 a Canadian tribunal held Air Canada liable after its chatbot made up a refund policy, and lawyers keep getting sanctioned for citing fake, AI-generated cases. If your AI says it, you said it.
- **[[bias|Bias]].** Models learn patterns from historical data, including unfair ones. Amazon scrapped an experimental recruiting tool that downgraded résumés mentioning "women's." Think of any model that decides who gets a loan, a job interview, a discount or an extra security check.
- **Privacy.** Personal data can leak into training sets, prompts and logs. Regulators are watching: Italy fined OpenAI €15 million in December 2024.
- **Security.** New attack routes like [[prompt injection]] against [[agent|agents]] (Chapter 5), and phishing emails with perfect grammar.
- **Deepfakes and fraud.** In early 2024 an employee of engineering firm Arup in Hong Kong sent about $25 million to fraudsters after a video call in which the "CFO" and colleagues were all [[deepfake|deepfakes]]. For any business that signs up customers online, from banks to apartment rentals, the front line is identity checks: forged IDs and face-swapped selfies.

The law is catching up. The US TAKE IT DOWN Act (2025) made publishing nonconsensual intimate deepfakes a federal crime and requires platforms to remove them within 48 hours of a valid request. The EU and China now require AI-generated content to be labeled.

## Who owns what: the copyright fights

Two separate questions: can you train a model on copyrighted work without permission, and who owns what the AI produces?

### Training

In the US, the fight is over [[fair use]], a four-factor test that asks, roughly, whether a use transforms the original and whether it hurts the market for it. Where things stand as of September 2026:

- **Bartz v. Anthropic (2025).** Judge William Alsup held that training on books was fair use because it was highly transformative, but that downloading pirated copies was not. Anthropic settled for $1.5 billion, about $3,000 per book, the largest copyright settlement in US history. The court gave final approval in July 2026.
- **Kadrey v. Meta (2025).** Meta won, narrowly. The judge said the authors made the wrong arguments and hinted that AI flooding the market with competing works could win next time.
- **Thomson Reuters v. Ross (2025).** This one went the other way: copying Westlaw's case summaries to build a rival legal research tool, which wasn't generative AI, was not fair use. The Third Circuit heard the appeal in June 2026, the first appellate test of AI training. A decision is pending.
- **New York Times v. OpenAI and Microsoft.** Still pretrial. In September 2026 the Justice Department filed a brief arguing that training can be fair use, the first time the federal government has taken a side.

Europe has no fair use, and results differ. In November 2025 a Munich court ruled for GEMA, Germany's music rights society, holding that ChatGPT infringed by [[memorization|memorizing]] and reproducing song lyrics. OpenAI is appealing. The same month, England's High Court largely rejected Getty Images' claims against Stability AI, finding the model doesn't store copies of the images.

The market isn't waiting for judges. Disney sued Midjourney in 2025, then invested $1 billion in OpenAI alongside a deal licensing its characters. Major record labels settled with AI music startups and signed licenses. Lawsuits are increasingly the opening move in a licensing negotiation.

### Outputs

US copyright requires a human author. The courts said so in Thaler v. Perlmutter, and the Supreme Court declined to take the case in March 2026. The Copyright Office's guidance: AI-assisted work can be protected when a person contributes real creative expression, but a prompt alone isn't enough. The commercial point: purely AI-generated ad creative, logos or marketing videos may not be ownable. If exclusivity matters, keep people meaningfully involved in the creative work.

:::myth Myth vs. reality
**Myth:** Courts have ruled that AI training is fair use.

**Reality:** Two federal trial judges in California leaned that way in 2025, with big caveats. One in Delaware went the other way, no US appeals court has ruled, and a German court ruled against OpenAI. Even where training was fair use, pirated data cost Anthropic $1.5 billion. The accurate answer: unsettled, leaning toward "training is OK" in the US, with data sourcing and outputs as the live risks.
:::

## Jobs and the economy

**[[augmentation-vs-automation|Augmentation]]** means AI makes a person faster or better. **Automation** means AI does the task instead. Most jobs are bundles of tasks, so the useful question isn't "which jobs disappear?" It's "which tasks inside this job change?"

Digital, repetitive, easy-to-check tasks change first: customer support, routine coding, drafting, translation. Work built on relationships, judgment and accountability changes slower. In partnership sales, the prep work is being transformed. The trust isn't.

The evidence so far is mixed, and that's the headline. Stanford economists led by Erik Brynjolfsson, using payroll data, found a double-digit relative drop in employment for 22- to 25-year-olds in the most AI-exposed jobs, like software development and customer service, while older workers in the same jobs held steady. Updates through 2026 show no reversal. Yale's Budget Lab, looking across the whole labor market, has found little sign of broad disruption.

Both can be true: entry-level roles may be the canary. That raises a real question for every company: if AI does the junior work, where do future senior people learn?

History offers comfort and a caveat. Technology usually destroys some tasks and creates others, and the transition hurts specific people even when the totals work out. MIT economist David Autor and colleagues estimate that about 60% of US jobs in 2018 were in occupations that didn't exist in 1940. The caveat: AI is general-purpose and spreading faster than past technologies, so the shift could be quicker and more concentrated. The real debate is about speed.

## The rulebook: regulation around the world

There are three broad models. The EU writes one comprehensive law. The US regulates through a patchwork of states while Washington pushes back. China writes fast, targeted rules tied to state control. The UK sits in between.

### The EU AI Act

The [[eu ai act|EU AI Act]] is the world's first comprehensive AI law. It entered into force in August 2024 and phases in over several years. Like GDPR, it reaches anyone whose AI is used in the EU.

It regulates by use, not technology, in four tiers:

- **Banned** since February 2025: social scoring, manipulative or exploitative AI that causes significant harm, untargeted scraping of faces, emotion recognition at work and school, and most real-time facial recognition by police in public. A 2026 amendment adds AI "nudifier" and child-abuse image generators from December 2026.
- **High risk:** AI used in hiring, credit, education, essential services, critical infrastructure, policing, migration and the courts, plus AI inside regulated products like medical devices. These need risk management, documentation, human oversight, accuracy testing and registration.
- **Transparency:** since August 2, 2026, chatbots must disclose that they're AI, deepfakes must be labeled, and AI-generated content must carry machine-readable marks (existing systems get until December).
- **Minimal risk:** everything else, from spam filters to recommendation engines. Nothing new.

The big foundation models, which the Act calls [[general-purpose ai|general-purpose AI]], have had their own duties since August 2025: documentation, a copyright policy and a summary of training data. The very largest also need safety evaluations, [[red teaming|red-teaming]] and incident reporting. Fines reach €35 million or 7% of global annual turnover for banned practices.

**About the "delay."** A simplification package called the Digital Omnibus took effect on July 27, 2026, days before the original deadline. It moved the high-risk obligations to December 2, 2027, for uses like hiring and credit, and to August 2, 2028, for AI inside regulated products. It did not delay the bans, the model rules or transparency.

:::analogy The AI Act works like food safety rules
Think about how food rules scale with risk. Cook dinner for your family and nobody inspects your kitchen. Sell homemade jam at a farmers' market and you often just need an honest label: what's in it and where it was made. Open a restaurant and you need a permit, trained staff, temperature logs and surprise inspections. And some things can't be served at all, however spotless the kitchen, because the ingredient is banned.

The AI Act works the same way. Minimal risk is the family dinner. Transparency duties are the jam label. High-risk systems are the restaurant: documented, overseen by people and checked before and after opening. Banned uses are the forbidden ingredient. Notice what decides the tier. It isn't the oven. It's who you're feeding and what's at stake. Same technology, different treatment, depending on the use.
:::

For an ordinary company, the most common high-risk use isn't the product. It's HR: AI that screens CVs or evaluates employees. Customer chatbots in Europe need AI disclosures now. And watch the ban on exploiting vulnerabilities: a lending app that pushes high-interest offers hardest at people showing signs of financial distress is exactly what regulators will test against it. That's a question for counsel before launch, not after. (Chapter 7 covers how this applies to gambling.)

### The United States

There's no comprehensive federal AI law. If your company has ever juggled fifty states' rules on privacy or sales tax, this will feel familiar.

**Washington: light touch, plus preemption.** In January 2025 President Trump revoked the Biden administration's 2023 AI executive order, and an AI Action Plan followed that July. Congress tried to put a 10-year moratorium on state AI laws into the 2025 budget bill; the Senate stripped it out, 99 to 1. In December 2025 the President signed an order targeting "onerous" state AI laws. It created a Justice Department task force to challenge them in court and pushed to tie some federal broadband money to states' AI policies. In March 2026 the White House asked Congress to preempt burdensome state laws, while leaving states room on things like child safety and their own use of AI. As of September 2026, Congress hasn't passed a preemption law.

Here's the legal nuance most people miss. An executive order can't override state law by itself. Preemption comes from Congress legislating within its powers, usually the Commerce Clause, or from agencies using authority Congress gave them. That's why the order relies on lawsuits, funding conditions (which the Spending Clause limits) and agency theories.

You know part of this from Murphy v. NCAA, the 2018 case that opened up sports betting. The Court struck down the federal ban because it simply ordered states not to authorize betting. Preemption, the Court said, has to work by regulating private actors, not by commanding state legislatures. Some legal scholars argue that a bare federal ban on state AI laws, with no federal rules behind it, could hit the same wall.

**The states.** Hundreds of bills. The ones to know:

- **California's SB 53**, in effect since January 2026, is the first state law aimed at [[frontier model|frontier model]] developers. They must report critical safety incidents and protect whistleblowers, and the largest companies must publish safety frameworks, with penalties up to $1 million per violation.
- **New York's RAISE Act**, a similar law, takes effect January 1, 2027.
- **Colorado** is the cautionary tale. Its 2024 law on algorithmic discrimination was delayed twice, challenged in federal court by xAI with the Justice Department joining, put on hold, and replaced in May 2026 by a much narrower notice-and-human-review law that takes effect January 1, 2027.
- **Texas's TRAIGA**, in effect since January 2026, bans a short list of intentionally harmful uses.
- **More than a dozen states** passed rules in 2026 for AI "companion" chatbots.

Bottom-up, uneven and contested by Washington: the same way the US has handled data privacy.

### The United Kingdom

The UK has no AI-specific law. Existing regulators, such as the Information Commissioner's Office (data protection) and the Financial Conduct Authority, apply existing rules to AI, and the government's AI Security Institute tests frontier models. The 2026 King's Speech included no AI bill, and in March 2026 the government shelved its plan for a broad copyright exception for AI training.

### China

China moved first, with narrow and fast rules: recommendation algorithms (2022), deepfakes and generative AI (2023, with content required to reflect "core socialist values"), mandatory labels on AI content (2025) and rules for AI companions (2026). Providers register their algorithms with the state. Safety and state control travel together, backed by heavy industrial policy and a push for widely used [[open-weight model|open-weight]] models.

### What it means for a global company

- Build to the strictest regime you operate in, usually the EU, and keep your AI inventory mapped to its tiers (Chapter 8).
- Watch the US federal-state fight. The rules you follow in 2027 may not be the ones on the books today.
- Don't wait for AI laws. Consumer protection, anti-discrimination and privacy rules, plus your own industry's regulators, already apply to AI.

:::room Say this in the room
- "The EU didn't delay the AI Act. It delayed the high-risk rules. The bans, the model rules and the transparency duties are live."
- "In the US, the real AI rules are being written in state capitals and courtrooms. An executive order can't erase them. Until Congress acts, plan for a patchwork."
- "On copyright, US courts lean toward training being fair use, but pirated data cost Anthropic $1.5 billion. How the data was obtained is the real exposure."
:::

## Safety, alignment and the AGI debate

### What the labs worry about

[[alignment|Alignment]] means getting AI to reliably do what we intend, even in situations nobody anticipated. If you've ever designed a sales comp plan, you know why that's hard: people optimize the metric, not the goal, like reps sandbagging deals into next quarter to hit an accelerator. AI systems do versions of the same thing.

- **[[sycophancy|Sycophancy]]:** telling users what they want to hear. OpenAI rolled back a ChatGPT update in April 2025 for excessive flattery.
- **[[reward hacking|Reward hacking]]:** gaming the test, like coding agents rigging tests to pass instead of fixing the bug.
- **Stress-test surprises:** in deliberately contrived lab scenarios, models have sometimes deceived evaluators or, in one Anthropic study, attempted blackmail to avoid being shut down. These weren't real-world incidents, but they're why researchers take control seriously.

The frontier risks labs cite most: helping someone build biological or chemical weapons, large-scale cyberattacks and, longer term, autonomous systems people can't correct.

The industry's main answer is the [[responsible scaling policy]], a set of if-then commitments: if a model crosses a dangerous capability threshold, stronger safeguards come before release. Think of how labs handle germs: the more dangerous the pathogen, the tighter the containment required before work begins. Anthropic, OpenAI and Google DeepMind all publish versions, and Anthropic's "AI Safety Levels" are loosely modeled on the biosafety levels those labs use. Governments test models too, through the UK's AI Security Institute and the US Center for AI Standards and Innovation.

Know three views. Critics say voluntary policies let companies grade their own homework. Supporters note that California, New York and the EU have effectively made publishing such a framework a legal duty. And a third camp argues that safety talk inflates risk to justify rules that favor incumbents.

### AGI and superintelligence

[[agi|AGI]], artificial general intelligence, has no agreed definition. OpenAI's charter says "highly autonomous systems that outperform humans at most economically valuable work." Others mean human-level ability across nearly all thinking tasks. The definition even has contract value: under Microsoft and OpenAI's 2025 agreement, an independent expert panel must verify any AGI declaration, which changes the partnership's economics. [[superintelligence|Superintelligence]] means AI that vastly exceeds the best humans in virtually every field.

On timing, there are three camps:

- **Soon.** Many lab leaders. Anthropic's Dario Amodei has written that "powerful AI" could arrive as early as 2026 or 2027. Google DeepMind's Demis Hassabis has said five to ten years. Their evidence: steady capability gains, and the length of tasks AI can finish doubling every several months (Chapter 10).
- **Skeptical.** Gary Marcus and Turing Award winner Yann LeCun argue that [[large language model|LLMs]] lack real understanding and that [[scaling laws|scaling]] alone won't close the gap. Princeton's Arvind Narayanan and Sayash Kapoor call AI a "normal technology" that, like electricity, will take decades to reshape the economy. And a 2025 study by the research group METR found experienced developers were about 19% slower with AI tools, though they believed they were faster.
- **Worried.** Geoffrey Hinton and Yoshua Bengio, two of the field's founders, warn about losing control of more capable systems. At the far end, Eliezer Yudkowsky argues superintelligence would likely be catastrophic. You'll hear people trade their "p(doom)," their personal estimate of the chance of catastrophe.

Apply your investor lens: the CEOs forecasting AGI are also raising money, and the skeptics sell books too. To discuss it well, ask "AGI by what definition?" first. Separate capability (what models can do in a lab) from diffusion (how fast they change businesses). And use signposts, not dates: "I'll update when agents reliably complete week-long projects, or when AI shows up in productivity statistics."

## Power and geopolitics

### Energy

AI runs on [[energy-demand|electricity]]. The International Energy Agency estimates that [[data center|data centers]] used about 1.5% of the world's electricity in 2024 and projects roughly 3% by 2030, with AI the main driver. In the US, Lawrence Berkeley National Laboratory put data centers at 4.4% of electricity in 2023, rising to between 6.7% and 12% by 2028.

The sharpest fights are local: waits for grid connections, rising utility bills and dozens of new state data center laws in 2026. Tech companies are signing nuclear deals, including Microsoft's agreement to restart a reactor at Three Mile Island.

Keep it in proportion. Google reported in 2025 that a median Gemini text prompt uses about 0.24 watt-hours, roughly nine seconds of TV. The issue is aggregate scale, and cheaper AI tends to mean more total use, not less.

### Chips and national strategy

Governments now treat compute as a strategic resource. The most advanced AI chips are designed mostly in the US, made mostly in Taiwan by TSMC, on machines only one Dutch company, ASML, can build. That concentration is why AI is a national security issue.

Since 2022, US [[export controls]] have limited sales of advanced AI chips and chipmaking tools to China. The Trump administration scrapped a Biden-era global licensing rule in May 2025 and turned transactional. It let Nvidia sell a China-specific chip in exchange for 15% of the revenue, then in January 2026 allowed case-by-case licenses for the more powerful H200, with Washington taking a 25% cut, while keeping top-end Blackwell chips off-limits. Beijing has told its companies to limit US chip purchases and is pouring money into domestic alternatives like Huawei's.

DeepSeek showed the limits of controls. Its R1 model, released in January 2025, was capable, reportedly cheap to train and open-weight, and it knocked nearly $600 billion off Nvidia's market value in a single day.

Hawks say compute is the bottleneck, so deny it to rivals. Dealmakers, including Nvidia's Jensen Huang, say selling keeps China dependent on American technology, while blocking speeds up China's own. Both have evidence. For companies, which models you may use and where your data is processed are now board-level questions.

## Holding a balanced view in the room

Every AI debate has an evidence layer and a speculation layer. Separate them with three questions: What's the evidence today? What's the plausible range? What would change my mind?

Avoid the two easy roles. The dismisser ("it's just autocomplete") sounds naive, because the capabilities are real and compounding. The prophet ("AGI in 18 months, half of all jobs gone") sounds alarmist, or like a salesperson. The durable middle is Amara's law, named for futurist Roy Amara: we tend to overestimate a technology's effect in the short run and underestimate it in the long run.

One habit beats all the others. Before you disagree, state the other side's best argument better than they can. It's the fastest way to become the most credible person in the room.

:::teach Teach it in 60 seconds
Ask five smart people whether AI is dangerous and you'll get five answers, because they're answering five different questions. Sort the debate into two piles. Near-term, proven harms like fraud, bias, privacy and copyright are where the laws and lawsuits are happening now. Long-term, uncertain risks like AGI and loss of control are where experts disagree about timing, not just outcomes. And regulation follows use, not technology: the same model can write marketing copy, which the EU barely regulates, screen job applicants, which it treats as high-risk, or score citizens' social behavior, which it bans outright.
:::

## Check yourself

1. A colleague says, "The EU AI Act got delayed, so we don't need to worry until 2027." What do you tell them?

<details><summary>Answer</summary>

Only the high-risk obligations moved, to December 2027 and August 2028. The bans have applied since February 2025, the model rules since August 2025, and the transparency duties, like disclosing chatbots and labeling deepfakes, since August 2026. Customer-facing AI in Europe needs attention now.

</details>

2. A board member asks, "Is it legal for AI companies to train on copyrighted content?" Give the accurate, current answer.

<details><summary>Answer</summary>

It's unsettled. Two US trial courts found training can be fair use, one found it wasn't in a different setting, and no appeals court has ruled. How the data was obtained matters enormously, as Anthropic's $1.5 billion settlement over pirated books showed. Rules differ abroad, and the market is shifting toward licensing deals either way.

</details>

3. Why can't a presidential executive order simply wipe out state AI laws, and what is the administration doing instead?

<details><summary>Answer</summary>

Preemption requires Congress acting within its constitutional powers, or agencies using authority Congress delegated. So the administration is challenging state laws in court through a Justice Department task force, attaching conditions to federal funding (which the Spending Clause limits), exploring agency action and pressing Congress for a preemption statute, which hadn't passed as of September 2026.

</details>

4. At dinner, one guest says AGI is two years away and another says it's all hype. How do you respond?

<details><summary>Answer</summary>

Ask what each means by AGI, since most of the gap is definitions. Then separate capability from diffusion: models are improving fast on measurable tasks, but economies adopt slowly. Note that both camps have incentives, and name the signposts that would change your mind, like agents reliably handling week-long projects.

</details>

:::key Key takeaways
- Hallucinations, bias, privacy, security and deepfake fraud are current risks with growing legal liability. If your AI says it, you said it.
- Copyright is unsettled. US courts lean toward training being fair use, but data sourcing and outputs carry real exposure, and the market is moving to licensing.
- The EU AI Act regulates by use, in tiers. Bans, model rules and transparency are live; only the high-risk rules moved, to late 2027 and 2028.
- The US is a state-by-state patchwork with Washington pushing to preempt it. An executive order can't do that alone. Congress can, and hasn't yet.
- On safety and AGI, know every camp's best argument, ask "by what definition?" and weigh the evidence over the speaker.
- Energy and chips make AI a geopolitical story. Compute is now national strategy.
:::
