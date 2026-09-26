/**
 * Verify a listed demo detail page uses the completed tool-intro layout.
 * Usage: node scripts/verify-listed-detail.mjs <demo-id>
 * Optional: VERIFY_BASE=http://127.0.0.1:4173
 */
import { chromium } from 'playwright'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { DEMOS, getDemoById } from '../src/data.js'
import { buildDemoStory, hasStory, demoEntryUrl } from '../src/demo-story.js'

const id = process.argv[2]
if (!id) {
  console.error('Usage: node scripts/verify-listed-detail.mjs <demo-id>')
  process.exit(1)
}

const demo = getDemoById(id)
assert(demo, `unknown demo: ${id}`)
assert(hasStory(demo), `${id} has no story`)

const base = process.env.VERIFY_BASE || 'http://127.0.0.1:4173'
const dir = path.join('docs', 'detail-design-rollout', id)
await fs.mkdir(dir, { recursive: true })

const esc = s => String(s ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const html = buildDemoStory(demo, esc)
assert(html.includes('story-layout-tool-intro'), `${id}: missing tool-intro layout`)
assert(!html.includes('story-layout-thin'), `${id}: still thin layout`)
assert(!html.includes('story-related'), `${id}: related should be hidden`)
assert(!html.includes('id="story-usecase"'), `${id}: usecase should be hidden`)

const baselinePath = path.join(dir, 'before-html.json')
let baseline = null
try {
  baseline = JSON.parse(await fs.readFile(baselinePath, 'utf8'))
} catch {
  // optional: copy from global baseline excluding self
  try {
    const global = JSON.parse(await fs.readFile('docs/detail-design-rollout/baseline/before-html.json', 'utf8'))
    baseline = global
  } catch { /* skip HTML freeze check */ }
}

if (baseline) {
  for (const d of DEMOS.filter(hasStory)) {
    if (d.id === id) continue
    if (!(d.id in baseline)) continue
    // Only assert demos that were already tool-intro or unchanged thin — skip if we already migrated them
    // Freeze check: if baseline HTML still matches current for other IDs that share the same layout era
    const current = buildDemoStory(d, esc)
    if (baseline[d.id] && current !== baseline[d.id]) {
      // Allow other migrated tool-intro demos to differ from pre-migration baseline
      if (!current.includes('story-layout-tool-intro') || !baseline[d.id].includes('story-layout-tool-intro')) {
        // If both thin or one flipped, only fail when an unexpected thin→change for non-target
        if (!current.includes('story-layout-tool-intro') && baseline[d.id].includes('story-layout-thin')) {
          assert.equal(current, baseline[d.id], `${d.id}: unexpected HTML change while verifying ${id}`)
        }
      }
    }
  }
}

const expectedHref = demoEntryUrl(demo.url)
const conditionCount = (html.match(/<li>/g) || []).length
// conditions list is inside disclosure; allow 2–8

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
    await page.goto(`${base}/?demo=${id}`)
    await page.locator('.story-layout-tool-intro').waitFor()
    await page.evaluate(() => Promise.all([...document.querySelectorAll('#detail img')].map(i => i.decode().catch(() => {}))))
    assert.equal(await page.locator('.story-preview-card').count(), 3)
    assert.equal(await page.locator('.story-preview-step').count(), 3)
    assert.equal(await page.locator('.story-construction-row').count(), 3)
    assert.equal(await page.locator('.story-related, #story-usecase, #story-experience-detail').count(), 0)
    assert(await page.locator('#detail').evaluate(e => e.scrollWidth <= e.clientWidth))
    const ctas = page.locator('.story-button')
    assert.equal(await ctas.count(), 2)
    for (const a of await ctas.all()) {
      assert.equal(await a.getAttribute('href'), expectedHref)
      assert.equal(await a.getAttribute('target'), '_blank')
      assert((await a.getAttribute('rel') || '').includes('noopener'))
    }
    await page.screenshot({ path: path.join(dir, `detail-${width}-top.png`) })
    if (width <= 700) {
      assert(!(await page.locator('.story-hero-stage').isVisible()))
      assert(await page.locator('.story-construction-compare-mobile').isVisible())
      const gallery = page.locator('.story-gallery')
      await gallery.focus()
      await page.keyboard.press('End')
      await gallery.evaluate(e => e.scrollTo({ left: e.scrollWidth, behavior: 'instant' }))
      await page.waitForFunction(() => document.querySelector('.story-gallery-dot:last-child')?.classList.contains('is-active'))
    } else {
      assert(await page.locator('.story-hero-stage').isVisible())
      assert(await page.locator('.story-construction-compare-pc').isVisible())
    }
    await page.locator('#story-benefits').scrollIntoViewIfNeeded()
    await page.screenshot({ path: path.join(dir, `detail-${width}-lower.png`) })
    const disclosure = page.locator('#story-conditions details')
    assert(!(await disclosure.evaluate(e => e.open)))
    await disclosure.locator('summary').click()
    assert(await disclosure.evaluate(e => e.open))
    const li = await disclosure.locator('li').count()
    assert(li >= 2 && li <= 8, `${id}: unexpected condition count ${li}`)
    await disclosure.locator('summary').press('Enter')
    assert(!(await disclosure.evaluate(e => e.open)))
    await page.locator('#dBack').click()
    assert.equal(new URL(page.url()).searchParams.get('demo'), null)
    results.push({ width, passed: true, conditions: li })
  }
  await page.goto(`${base}/`)
  const card = page.locator(`#cards [data-id="${id}"]`)
  await card.click()
  await page.goBack()
  assert.equal(new URL(page.url()).searchParams.get('demo'), null)
  await page.goForward()
  assert.equal(new URL(page.url()).searchParams.get('demo'), id)
  await page.keyboard.press('Escape')
  assert.equal(new URL(page.url()).searchParams.get('demo'), null)
  const bad404 = [...http404].filter(u => !/\/favicon\.ico(\?|$)/i.test(u))
  assert.deepEqual(errors, [])
  assert.deepEqual(bad404, [])
  await fs.writeFile(
    path.join(dir, 'verification.json'),
    JSON.stringify({ id, results, errors, http404: [...http404], conditionCount, navigation: 'passed' }, null, 2),
  )
  console.log('PASS', id, JSON.stringify(results))
} finally {
  await browser.close()
}
