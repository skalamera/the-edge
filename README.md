# The Edge

A living AI study guide. It covers artificial intelligence from the ground up and writes a new "This Week" chapter every Monday.

- **The book:** 11 chapters in `content/chapters/`, from "What AI actually is" to agentic AI, the business stack, AI in sports and betting, and the big debates.
- **Reference:** a searchable glossary (`content/glossary.json`) and an ecosystem map of the major players (`content/players.json`).
- **This Week:** a GitHub Action runs every Monday. Claude researches the week's AI news on the web, writes a sourced update in the book's voice, adds new glossary terms, and redeploys the site.
- **Offline:** the site works offline after the first visit (add it to the iPhone home screen), and every deploy renders a PDF edition at `/the-edge.pdf`.

## How it works

| Piece | What it does |
| --- | --- |
| `scripts/build.mjs` | Turns the Markdown and JSON in `content/` into the static site in `dist/` |
| `scripts/weekly-update.mjs` | Two Claude calls: (1) research with web search → a sourced brief, (2) write the update as schema-validated JSON. Drops any item whose sources weren't actually found by the search. |
| `scripts/pdf.mjs` | Prints `book.html` to `the-edge.pdf` with headless Chromium |
| `.github/workflows/deploy.yml` | Builds and publishes to GitHub Pages on every push to `main` |
| `.github/workflows/weekly-update.yml` | Mondays at 11:00 UTC: runs the update, commits it, redeploys |
| `docs/STYLE_GUIDE.md` | The voice and format rules. The weekly writer reads this every run. |

## Setup (one time)

1. **Add the API key as a repository secret.** Settings → Secrets and variables → Actions → New repository secret. Name it `ANTHROPIC_API_KEY`. Or use the CLI:
   ```bash
   gh secret set ANTHROPIC_API_KEY --repo skalamera/the-edge
   ```
2. **Turn on GitHub Pages.** Settings → Pages → Source: **GitHub Actions**.
3. **Run the first update now** instead of waiting for Monday: Actions → Weekly update → Run workflow. Or:
   ```bash
   gh workflow run weekly-update.yml --repo skalamera/the-edge
   ```

The site will be at `https://skalamera.github.io/the-edge/`.

## Local development

```bash
npm install
npm run build          # builds dist/
npm run serve          # preview at http://localhost:4173
ANTHROPIC_API_KEY=... npm run update -- --dry-run   # test the weekly agent without saving
```

## Cost

Each weekly run uses Claude Opus 5 with up to 25 web searches and 15 page fetches. Expect roughly a few dollars per run, depending on how much it reads. Check the exact usage in the Anthropic Console. The model can be changed with the `EDGE_MODEL` environment variable in the workflow.

## Privacy

Pages are marked `noindex` and `robots.txt` blocks crawlers, so the site won't show up in search results. It's still reachable by anyone who has the link, and this repository is public.
