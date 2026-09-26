// Renders dist/book.html to dist/the-edge.pdf for offline reading.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.emulateMedia({ colorScheme: 'light', media: 'print' });
await page.goto(`file://${path.join(ROOT, 'dist', 'book.html')}`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({
  path: path.join(ROOT, 'dist', 'the-edge.pdf'),
  format: 'Letter',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate:
    '<div style="width:100%;font:9px Inter,Helvetica,sans-serif;color:#85878E;text-align:center;">The Edge · <span class="pageNumber"></span></div>',
  margin: { top: '0.75in', bottom: '0.8in', left: '0.85in', right: '0.85in' },
});
await browser.close();
console.log('Wrote dist/the-edge.pdf');
