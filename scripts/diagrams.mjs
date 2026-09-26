// Diagrams referenced from chapters as {{diagram:id}}.
// Built from HTML/CSS (not fixed-size SVG) so labels stay readable on a phone.

const figure = (id, body, caption) =>
  `<figure class="diagram diagram-${id}">${body}<figcaption>${caption}</figcaption></figure>`;

const stack = figure(
  'stack',
  `<div class="stack">
    <div class="stack-flow" aria-hidden="true"><span>Money flows down</span></div>
    <ol class="stack-layers">
      ${[
        ['Applications', 'What people actually use', 'ChatGPT · Copilot · Cursor · a sportsbook app'],
        ['Tools & infrastructure', 'Picks and shovels for builders', 'Databricks · Hugging Face · Scale AI'],
        ['Foundation models', 'The “brains”', 'OpenAI · Anthropic · Google DeepMind · Meta'],
        ['Cloud', 'Rents out the computers', 'AWS · Microsoft Azure · Google Cloud · Oracle · CoreWeave'],
        ['Chips', 'The engines', 'Nvidia · AMD · Broadcom · TSMC'],
        ['Energy & data centers', 'Power, land, cooling', 'Utilities · data-center developers'],
      ]
        .map(
          ([name, role, who], i) => `<li style="--i:${i}">
        <div class="layer-name">${name}</div>
        <div class="layer-role">${role}</div>
        <div class="layer-who">${who}</div>
      </li>`,
        )
        .join('')}
    </ol>
  </div>`,
  'The AI stack. Customers pay the app, the app pays for models, the model labs pay the cloud, and the cloud pays the chipmakers and the power company.',
);

const llmPipeline = figure(
  'llm-pipeline',
  `<div class="pipeline">
    <div class="pipe-phase">
      <div class="pipe-label">Training · once, very expensive</div>
      <ol class="pipe-steps">
        <li><strong>Data</strong><span>Trillions of words, code, images</span></li>
        <li><strong>Training</strong><span>Months on thousands of GPUs</span></li>
        <li><strong>Model</strong><span>Billions of learned weights</span></li>
      </ol>
    </div>
    <div class="pipe-phase">
      <div class="pipe-label">Inference · every request, costs a little each time</div>
      <ol class="pipe-steps">
        <li><strong>Prompt</strong><span>Your question, split into tokens</span></li>
        <li><strong>Inference</strong><span>Predicts the next token, over and over</span></li>
        <li><strong>Output</strong><span>The answer you read</span></li>
      </ol>
    </div>
  </div>`,
  'Two phases. Training builds the model once. Inference runs it every time someone asks a question.',
);

const agentLoop = figure(
  'agent-loop',
  `<svg class="loop-svg" viewBox="0 0 420 420" role="img" aria-label="The agent loop: goal, think, act, observe, repeat until done">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" class="d-accent-fill"/>
      </marker>
    </defs>
    <circle cx="210" cy="210" r="138" class="d-ring"/>
    <path d="M 266 84 A 138 138 0 0 1 336 154" class="d-arc" marker-end="url(#arrow)"/>
    <path d="M 336 266 A 138 138 0 0 1 266 336" class="d-arc" marker-end="url(#arrow)"/>
    <path d="M 154 336 A 138 138 0 0 1 84 266" class="d-arc" marker-end="url(#arrow)"/>
    <path d="M 84 154 A 138 138 0 0 1 154 84" class="d-arc" marker-end="url(#arrow)"/>
    <g class="d-node"><circle cx="210" cy="72" r="46"/><text x="210" y="68">Goal</text><text x="210" y="88" class="d-sub">the task</text></g>
    <g class="d-node"><circle cx="348" cy="210" r="46"/><text x="348" y="206">Think</text><text x="348" y="226" class="d-sub">plan a step</text></g>
    <g class="d-node"><circle cx="210" cy="348" r="46"/><text x="210" y="344">Act</text><text x="210" y="364" class="d-sub">use a tool</text></g>
    <g class="d-node"><circle cx="72" cy="210" r="46"/><text x="72" y="206">Observe</text><text x="72" y="226" class="d-sub">check result</text></g>
    <text x="210" y="204" class="d-center">Repeat</text>
    <text x="210" y="228" class="d-center-sub">until done</text>
  </svg>`,
  'The agent loop. An agent takes a goal, thinks, acts with a tool, looks at what happened, and repeats until the job is done.',
);

const aiNesting = figure(
  'ai-nesting',
  `<div class="nest">
    <div class="nest-ring n1"><span class="nest-label">Artificial intelligence<em>Any machine doing something we'd call smart</em></span>
      <div class="nest-ring n2"><span class="nest-label">Machine learning<em>Learns patterns from examples instead of following rules</em></span>
        <div class="nest-ring n3"><span class="nest-label">Deep learning<em>Machine learning with large neural networks</em></span>
          <div class="nest-ring n4"><span class="nest-label">Generative AI &amp; LLMs<em>Deep learning that creates text, images, audio, video</em></span></div>
        </div>
      </div>
    </div>
  </div>`,
  'The nesting dolls. Every LLM is generative AI, which is deep learning, which is machine learning, which is AI. It doesn’t work the other way around.',
);

const timeline = figure(
  'timeline',
  `<ol class="timeline">
    ${[
      ['1950', 'Alan Turing asks “Can machines think?” and proposes the imitation game'],
      ['1956', 'The Dartmouth workshop coins the term “artificial intelligence”'],
      ['1970s–80s', 'AI winters: big promises, too little computing power, funding dries up'],
      ['1997', 'IBM’s Deep Blue beats world chess champion Garry Kasparov'],
      ['2012', 'AlexNet wins the ImageNet competition and the deep learning era begins'],
      ['2016', 'DeepMind’s AlphaGo beats Lee Sedol at Go'],
      ['2017', 'Google researchers publish the Transformer (“Attention Is All You Need”)'],
      ['2020', 'OpenAI’s GPT-3 shows that scale alone unlocks surprising abilities'],
      ['Nov 2022', 'ChatGPT launches and reaches 100 million users in about two months'],
      ['2023–26', 'The race: reasoning models, multimodal AI, and agents that do real work'],
    ]
      .map(([y, t]) => `<li><span class="tl-year">${y}</span><span class="tl-text">${t}</span></li>`)
      .join('')}
  </ol>`,
  'Seventy years in ten moments. Progress came in bursts, and each burst needed more data and more computing power.',
);

export const diagrams = {
  stack,
  'llm-pipeline': llmPipeline,
  'agent-loop': agentLoop,
  'ai-nesting': aiNesting,
  timeline,
};
