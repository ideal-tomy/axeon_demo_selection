/**
 * Capture 01–03 for listed demos missing card screenshots (390×844).
 * Skips construction-record / quality-incident / kaigo-handoff (already set).
 * Usage: node scripts/capture-listed-missing.mjs
 * Optional: node scripts/capture-listed-missing.mjs internal-knowledge
 */
import { chromium } from 'playwright'
import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outRoot = path.join(__dirname, '..', 'public', 'images', 'demos')

async function shot(page, dest) {
  await page.screenshot({ path: dest, type: 'jpeg', quality: 84 })
  console.log('wrote', dest)
}

async function softClick(page, locator) {
  try {
    if (await locator.count()) {
      await locator.first().click({ timeout: 4000 })
      await page.waitForTimeout(900)
      return true
    }
  } catch { /* ignore */ }
  return false
}

async function dismissOverlays(page) {
  for (const label of ['閉じる', 'わかった', 'OK', 'スキップ', 'はじめる', '同意する']) {
    await softClick(page, page.getByRole('button', { name: label, exact: false }))
  }
}

function fileHash(file) {
  try {
    return createHash('md5').update(readFileSync(file)).digest('hex')
  } catch {
    return null
  }
}

async function assertDistinct(dir) {
  const a = fileHash(path.join(dir, '01.jpg'))
  const b = fileHash(path.join(dir, '02.jpg'))
  const c = fileHash(path.join(dir, '03.jpg'))
  if (!a || !b || !c) throw new Error('missing shot files in ' + dir)
  if (a === b || b === c || a === c) {
    console.warn('WARN: duplicate screenshots in', dir, { a, b, c })
  } else {
    console.log('ok distinct', path.basename(dir))
  }
}

/* ---------- internal-knowledge ---------- */
async function captureInternalKnowledge(page, dir) {
  await page.goto('https://internal-knowledge-demo.vercel.app/?from=axeon-demo-selection#demo', {
    waitUntil: 'networkidle', timeout: 45000
  })
  await page.waitForTimeout(800)
  await dismissOverlays(page)
  await shot(page, path.join(dir, '01.jpg'))

  await softClick(page, page.getByRole('button', { name: '午前半休のあと午後在宅できる？' }))
  await page.waitForTimeout(2500)
  await shot(page, path.join(dir, '02.jpg'))

  await softClick(page, page.getByRole('button', { name: /根拠を見る|根拠/ }).or(page.getByText('根拠を見る', { exact: false })))
  await page.waitForTimeout(1200)
  await softClick(page, page.getByText(/勤怠|在宅|条文|規程/, { exact: false }).first())
  await page.waitForTimeout(800)
  await shot(page, path.join(dir, '03.jpg'))
}

/* ---------- logistics-dispatch ---------- */
async function captureLogistics(page, dir) {
  await page.goto('https://driver-dash-demo.vercel.app/board?from=axeon-demo-selection', {
    waitUntil: 'networkidle', timeout: 45000
  })
  await page.waitForTimeout(1000)
  await dismissOverlays(page)
  await softClick(page, page.getByRole('button', { name: '今日', exact: true }))
  await page.waitForTimeout(600)
  await shot(page, path.join(dir, '01.jpg'))

  await softClick(page, page.getByRole('button', { name: '空の車を見る' }))
  await page.waitForTimeout(900)
  await softClick(page, page.getByRole('button', { name: '載せる', exact: true }))
  await page.waitForTimeout(900)
  await shot(page, path.join(dir, '02.jpg'))

  await softClick(page, page.getByRole('button', { name: /今日の画面に戻る|戻る/ }))
  await page.waitForTimeout(900)
  await softClick(page, page.getByRole('button', { name: '今日', exact: true }))
  await page.waitForTimeout(600)
  await shot(page, path.join(dir, '03.jpg'))
}

/* ---------- approval-inspection ---------- */
async function captureApproval(page, dir) {
  const base = 'https://approval-diagram.vercel.app/screens.html'
  await page.goto(base + '?screen=match&from=axeon-demo-selection', {
    waitUntil: 'networkidle', timeout: 45000
  })
  await page.waitForTimeout(1000)
  await dismissOverlays(page)
  await softClick(page, page.getByRole('button', { name: '照合', exact: true }).or(page.getByRole('tab', { name: '照合' })))
  await page.waitForTimeout(700)
  await shot(page, path.join(dir, '01.jpg'))

  await softClick(page, page.getByRole('button', { name: '保留一覧', exact: true }).or(page.getByText('保留一覧', { exact: true })))
  await page.waitForTimeout(900)
  await shot(page, path.join(dir, '02.jpg'))

  await softClick(page, page.getByRole('button', { name: '承認', exact: true }).or(page.getByText('承認', { exact: true })))
  await page.waitForTimeout(900)
  await shot(page, path.join(dir, '03.jpg'))
}

/* ---------- field-dandori ---------- */
async function captureFieldDandori(page, dir) {
  // /desk は Vercel 直打ちで 404。ルートから入る
  await page.goto('https://denkigenba-dandori-demo.vercel.app/?from=axeon-demo-selection', {
    waitUntil: 'networkidle', timeout: 60000
  })
  await page.waitForTimeout(1000)
  await dismissOverlays(page)
  await shot(page, path.join(dir, '01.jpg'))

  const card = page.getByRole('button').filter({ hasText: /道玄坂|建柱|北関東|渋谷/ }).first()
  await card.click({ timeout: 8000 })
  await page.waitForTimeout(4500)
  await softClick(page, page.getByRole('button', { name: /スキップ/ }))
  await page.waitForTimeout(800)

  // 要確認解除: 根拠を開く + 作業日を変える
  await softClick(page, page.getByRole('button', { name: '依頼原文を見る' }).nth(2))
  await page.waitForTimeout(500)
  await softClick(page, page.locator('.modal button, [role=dialog] button').filter({ hasText: '閉じる' }))
  await page.keyboard.press('Escape').catch(() => {})
  await page.waitForTimeout(300)
  const date = page.locator('input[type=date]').first()
  if (await date.count()) {
    await date.fill('2026-10-25')
    await date.blur()
    await page.waitForTimeout(400)
  }
  await shot(page, path.join(dir, '02.jpg'))

  const approve = page.getByRole('button', { name: '段取り案を確定する' })
  // まだ disabled なら全根拠を一度開く
  if (await approve.isDisabled()) {
    const evid = page.getByRole('button', { name: '依頼原文を見る' })
    const n = await evid.count()
    for (let i = 0; i < n; i++) {
      await evid.nth(i).click().catch(() => {})
      await page.waitForTimeout(300)
      await page.keyboard.press('Escape').catch(() => {})
      await softClick(page, page.locator('button').filter({ hasText: '閉じる' }).last())
    }
  }
  await approve.click({ timeout: 8000, force: true }).catch(async () => {
    await approve.evaluate((el) => el.removeAttribute('disabled'))
    await approve.click({ force: true })
  })
  await page.waitForTimeout(2000)
  await page.getByText('申請の準備', { exact: false }).waitFor({ timeout: 8000 }).catch(() => {})
  await shot(page, path.join(dir, '03.jpg'))
}

/* ---------- gym-facility ---------- */
async function captureGym(page, dir) {
  await page.goto('https://disaster-prevention-demo02.vercel.app/console?from=axeon-demo-selection', {
    waitUntil: 'networkidle', timeout: 45000
  })
  await page.waitForTimeout(1000)
  await dismissOverlays(page)
  await shot(page, path.join(dir, '01.jpg'))

  await page.goto('https://disaster-prevention-demo02.vercel.app/console/facilities?from=axeon-demo-selection', {
    waitUntil: 'networkidle', timeout: 45000
  })
  await page.waitForTimeout(1000)
  await softClick(page, page.getByText(/発電機|設備|アリーナ/, { exact: false }).first())
  await page.waitForTimeout(900)
  await shot(page, path.join(dir, '02.jpg'))

  await page.goto('https://disaster-prevention-demo02.vercel.app/console/review?from=axeon-demo-selection', {
    waitUntil: 'networkidle', timeout: 45000
  })
  await page.waitForTimeout(1000)
  await shot(page, path.join(dir, '03.jpg'))
}

/* ---------- dd-ma ---------- */
async function captureDdMa(page, dir) {
  await page.goto('https://dd-demo-red.vercel.app/ai?from=axeon-demo-selection', {
    waitUntil: 'networkidle', timeout: 45000
  })
  await page.waitForTimeout(1200)
  await dismissOverlays(page)
  await softClick(page, page.getByRole('button', { name: /サンプル|はじめる|OK/ }))
  await page.waitForTimeout(800)
  await shot(page, path.join(dir, '01.jpg'))

  await softClick(page, page.getByRole('button', { name: /効率化|整理|戦略|主軸/ }).or(page.getByText(/主軸|効率化/, { exact: false })))
  await page.waitForTimeout(1000)
  await shot(page, path.join(dir, '02.jpg'))

  await softClick(page, page.getByRole('button', { name: /問い|時間|あなた/ }).or(page.getByText(/問い|返した時間/, { exact: false })))
  await page.waitForTimeout(1000)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.4)).catch(() => {})
  await page.waitForTimeout(400)
  await shot(page, path.join(dir, '03.jpg'))
}

/* ---------- wholesale-quote ---------- */
async function captureWholesale(page, dir) {
  await page.goto('https://wholesale-quote-demo-lovat.vercel.app/desk?from=axeon-demo-selection', {
    waitUntil: 'networkidle', timeout: 45000
  })
  await page.waitForTimeout(1000)
  await dismissOverlays(page)
  await softClick(page, page.getByRole('button', { name: /北関東電設|AB-1200/ }))
  await page.waitForTimeout(700)
  await shot(page, path.join(dir, '01.jpg'))

  await softClick(page, page.getByRole('button', { name: '在庫表', exact: true }))
  await page.waitForTimeout(1000)
  await shot(page, path.join(dir, '02.jpg'))

  // modal-bg も aria-label=閉じる なので、カード内のボタンを指定
  await page.locator('.modal-card button.btn').filter({ hasText: '閉じる' }).click({ timeout: 5000 }).catch(() => {})
  await page.waitForTimeout(500)
  await page.getByRole('button', { name: '返す', exact: true }).click({ timeout: 5000 })
  await page.waitForTimeout(1000)
  await shot(page, path.join(dir, '03.jpg'))
}

const jobs = [
  ['internal-knowledge', captureInternalKnowledge],
  ['logistics-dispatch', captureLogistics],
  ['approval-inspection', captureApproval],
  ['field-dandori', captureFieldDandori],
  ['gym-facility', captureGym],
  ['dd-ma', captureDdMa],
  ['wholesale-quote', captureWholesale],
]

async function run() {
  const only = process.argv[2]
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    locale: 'ja-JP',
  })
  const page = await context.newPage()

  for (const [id, fn] of jobs) {
    if (only && only !== id) continue
    const dir = path.join(outRoot, id)
    await mkdir(dir, { recursive: true })
    console.log('---', id)
    try {
      await fn(page, dir)
      await assertDistinct(dir)
    } catch (e) {
      console.error('FAIL', id, e.message || e)
    }
  }

  await browser.close()
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
