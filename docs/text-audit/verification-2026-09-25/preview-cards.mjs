import fs from 'node:fs'
import { chromium } from 'playwright'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:5173/?demo=construction-record', { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const out = 'docs/text-audit/verification-2026-09-25/construction-preview-mobile'
  fs.mkdirSync(out, { recursive: true })
  const gallery = page.locator('.story-gallery')
  await gallery.scrollIntoViewIfNeeded()
  await gallery.screenshot({ path: `${out}/section.png` })
  const cards = page.locator('.story-preview-card')
  const results = []
  for (let i = 0; i < await cards.count(); i++) {
    const card = cards.nth(i)
    const box = await card.boundingBox()
    const title = await card.locator('h3').innerText()
    await card.screenshot({ path: `${out}/card-${i + 1}.png` })
    results.push({ title, width: box.width, height: box.height })
  }
  fs.writeFileSync(`${out}/measurements.json`, JSON.stringify(results, null, 2))
  console.log(JSON.stringify(results))
  await context.close()
} finally {
  await browser.close()
}
