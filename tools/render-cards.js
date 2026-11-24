// Renders the WhatsApp invite image and the link-preview image from tools/card.html.
// Usage (from the repo root):  npx http-server -p 8765 &  node tools/render-cards.js
// or any static server on port 8765. Requires: npm i playwright
const { chromium } = require('playwright');

(async () => {
  const base = process.env.BASE || 'http://localhost:8765';
  const browser = await chromium.launch();
  const jobs = [
    { url: '/tools/card.html?portrait', w: 1080, h: 1350, out: 'assets/whatsapp-invite.jpg' },
    { url: '/tools/card.html', w: 1200, h: 630, out: 'assets/og-preview.jpg' }
  ];
  for (const j of jobs) {
    const page = await browser.newPage({ viewport: { width: j.w, height: j.h }, deviceScaleFactor: 1 });
    await page.goto(base + j.url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: j.out, type: 'jpeg', quality: 88 });
    await page.close();
    console.log('wrote', j.out);
  }
  await browser.close();
})();
