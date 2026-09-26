import { chromium } from 'playwright'
import fs from 'node:fs/promises'

const browser = await chromium.launch({ channel: 'msedge', headless: true })
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 680 } })
  await page.goto('https://internal-knowledge-demo.vercel.app/')
  console.log('ENTRY LINKS', await page.locator('a').evaluateAll(es => es.map(e => ({ text: e.innerText, href: e.href }))))
  await page.getByRole('link', { name: 'デモを体験する' }).first().click()
  await page.getByRole('button', { name: '午前半休のあと午後在宅できる？', exact: true }).waitFor()
  console.log('DEMO', page.url(), await page.locator('body').innerText())
  console.log('BUTTONS', await page.locator('button').evaluateAll(es => es.map(e => ({ text: e.innerText, title: e.title, aria: e.getAttribute('aria-label') }))))
  await fs.mkdir('docs/detail-design-rollout/internal-knowledge', { recursive: true })
  await page.screenshot({ path: 'docs/detail-design-rollout/internal-knowledge/demo-entry.png' })
  await page.getByRole('button', { name: '午前半休のあと午後在宅できる？', exact: true }).click()
  await page.getByRole('button', { name: /根拠を見る/ }).waitFor()
  console.log('ANSWER', await page.locator('body').innerText())
  await page.screenshot({ path: 'public/images/demos/internal-knowledge/top.png' })
  await page.getByRole('button', { name: /根拠を見る/ }).click()
  console.log('EVIDENCE', await page.locator('body').innerText())
  await page.getByRole('button', { name: '設定', exact: true }).click()
  console.log('SETTINGS', await page.locator('body').innerText())
} finally {
  await browser.close()
}
