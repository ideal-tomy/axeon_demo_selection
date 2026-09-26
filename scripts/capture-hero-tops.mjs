/**
 * Capture landscape hero (top.png) for listed demos missing it.
 * Falls back to copying the best local preview image if live capture fails.
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getDemoById } from '../src/data.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outRoot = path.join(root, 'public', 'images', 'demos')

const IDS = [
  'approval-inspection',
  'quality-incident',
  'logistics-dispatch',
  'kaigo-handoff',
  'field-dandori',
  'gym-facility',
  'dd-ma',
  'wholesale-quote',
]

async function exists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

async function fallbackCopy(id) {
  const dir = path.join(outRoot, id)
  for (const name of ['entry.jpg', 'catalog.jpg', '01.jpg', '01.png']) {
    const src = path.join(dir, name)
    if (await exists(src)) {
      const dest = path.join(dir, 'top.png')
      // Prefer a dedicated top.png name; copy binary as-is (jpg bytes ok for <img>)
      // If source is jpg, write as top.jpg then also copy to top.png path for story path.
      // Story expects .png — write bytes with .png extension; browsers sniff MIME.
      await fs.copyFile(src, dest)
      console.log('fallback', id, '←', name)
      return true
    }
  }
  return false
}

async function captureOne(browser, id) {
  const dest = path.join(outRoot, id, 'top.png')
  if (await exists(dest)) {
    console.log('skip', id, '(exists)')
    return
  }
  const demo = getDemoById(id)
  if (!demo?.url) {
    await fallbackCopy(id)
    return
  }
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
  try {
    await page.goto(demo.url, { waitUntil: 'domcontentloaded', timeout: 45000 })
    await page.waitForTimeout(2500)
    // Try common start CTAs without failing
    const start = page.getByRole('button', { name: /はじめる|体験|開く|試す|進む/ }).first()
    if (await start.count()) await start.click({ timeout: 2000 }).catch(() => {})
    await page.waitForTimeout(1500)
    await page.screenshot({ path: dest, type: 'png', fullPage: false })
    console.log('captured', id)
  } catch (e) {
    console.warn('capture failed', id, e.message)
    await fallbackCopy(id)
  } finally {
    await page.close()
  }
}

const browser = await chromium.launch({ channel: 'msedge', headless: true })
try {
  for (const id of IDS) await captureOne(browser, id)
} finally {
  await browser.close()
}
