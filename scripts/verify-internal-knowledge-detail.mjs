import { chromium } from 'playwright'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { DEMOS, getDemoById } from '../src/data.js'
import { buildDemoStory, hasStory, demoEntryUrl } from '../src/demo-story.js'

const dir = 'docs/detail-design-rollout/internal-knowledge'
const esc = s => String(s ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const baseline = JSON.parse(await fs.readFile(`${dir}/before-html.json`, 'utf8'))
for (const d of DEMOS.filter(hasStory)) {
  if (d.id !== 'internal-knowledge') assert.equal(buildDemoStory(d, esc), baseline[d.id], `${d.id}: unexpected HTML change`)
}
const browser = await chromium.launch({ channel: 'msedge', headless: true })
const results = []
const errors = []
const http404 = new Set()
try {
  const page = await browser.newPage()
  page.on('pageerror', e => errors.push(e.message))
  page.on('response', r => {
    if (r.status() === 404) http404.add(r.url())
  })
  for (const width of [320, 390, 700, 701, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('http://127.0.0.1:4173/?demo=internal-knowledge')
    await page.locator('.story-layout-tool-intro').waitFor()
    await page.evaluate(() => Promise.all([...document.querySelectorAll('#detail img')].map(i => i.decode())))
    assert.equal(await page.locator('.story-preview-card').count(), 3)
    assert.equal(await page.locator('.story-preview-step').count(), 3)
    assert.equal(await page.locator('.story-construction-row').count(), 3)
    assert.equal(await page.locator('.story-related, #story-usecase, #story-experience-detail').count(), 0)
    assert(await page.locator('#detail').evaluate(e => e.scrollWidth <= e.clientWidth))
    const ctas = page.locator('.story-button')
    assert.equal(await ctas.count(), 2)
    for (const a of await ctas.all()) {
      assert.equal(await a.getAttribute('href'), demoEntryUrl(getDemoById('internal-knowledge').url))
      assert.equal(await a.getAttribute('target'), '_blank')
      assert((await a.getAttribute('rel')).includes('noopener'))
    }
    await page.screenshot({ path: `${dir}/detail-${width}-top.png` })
    if (width <= 700) {
      assert(!(await page.locator('.story-hero-stage').isVisible()))
      assert(await page.locator('.story-construction-compare-mobile').isVisible())
      const gallery = page.locator('.story-gallery')
      await gallery.focus()
      await page.keyboard.press('End')
      await gallery.evaluate(e => e.scrollTo({ left: e.scrollWidth, behavior: 'instant' }))
      await page.waitForFunction(() => document.querySelector('.story-gallery-dot:last-child').classList.contains('is-active'))
    } else {
      assert(await page.locator('.story-hero-stage').isVisible())
      assert(await page.locator('.story-construction-compare-pc').isVisible())
    }
    await page.locator('#story-benefits').scrollIntoViewIfNeeded()
    await page.screenshot({ path: `${dir}/detail-${width}-lower.png` })
    const disclosure = page.locator('#story-conditions details')
    assert(!(await disclosure.evaluate(e => e.open)))
    await disclosure.locator('summary').click()
    assert(await disclosure.evaluate(e => e.open))
    assert.equal(await disclosure.locator('li').count(), 4)
    await disclosure.locator('summary').press('Enter')
    assert(!(await disclosure.evaluate(e => e.open)))
    await page.locator('#dBack').focus()
    await page.keyboard.press('Shift+Tab')
    assert(await page.locator('#detail').evaluate(e => e.contains(document.activeElement)))
    await page.locator('#dBack').click()
    assert.equal(new URL(page.url()).searchParams.get('demo'), null)
    assert(!(await page.locator('#detail').evaluate(e => e.classList.contains('open'))))
    results.push({ width, passed: true })
  }
  await page.goto('http://127.0.0.1:4173/')
  const card = page.locator('#cards [data-id="internal-knowledge"]')
  await card.click()
  await page.goBack()
  assert.equal(new URL(page.url()).searchParams.get('demo'), null)
  await page.goForward()
  assert.equal(new URL(page.url()).searchParams.get('demo'), 'internal-knowledge')
  await page.keyboard.press('Escape')
  assert.equal(new URL(page.url()).searchParams.get('demo'), null)
  assert(await card.evaluate(e => e === document.activeElement))
  const bad404 = [...http404].filter(u => !/\/favicon\.ico(\?|$)/i.test(u))
  assert.deepEqual(errors, [])
  assert.deepEqual(bad404, [])
  await fs.writeFile(`${dir}/verification.json`, JSON.stringify({ results, errors, http404: [...http404], unchangedOtherStories: true, navigation: 'passed' }, null, 2))
  console.log('PASS', JSON.stringify(results), 'Other story HTML unchanged; navigation and focus restored; no browser errors.')
} finally {
  await browser.close()
}
