// One-off: renders the SVG icon to PNGs for iOS home-screen and the web manifest.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svg = fs.readFileSync(path.join(ROOT, 'site/assets/icon.svg'), 'utf8').replace('rx="14"', 'rx="0"');
const browser = await chromium.launch();
for (const size of [180, 512]) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(`<style>html,body{margin:0}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`);
  await page.screenshot({ path: path.join(ROOT, `site/assets/icon-${size}.png`) });
  await page.close();
}
await browser.close();
console.log('Icons written');
