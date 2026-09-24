/**
 * 全画面の表示テキストとレイアウト指標を MD に出力する。
 * 実行: node scripts/export-page-text-audit.mjs
 */
import { chromium } from 'playwright'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { listedDemos } from '../src/data.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'docs', 'text-audit')
const BASE = process.env.AUDIT_BASE || 'http://localhost:5173'

const VIEWPORTS = {
  mobile: { width: 390, height: 844, label: 'スマホ（390×844）' },
  pc: { width: 1280, height: 900, label: 'PC（1280×900・中央420pxカラム）' },
}

const TAB_VIEWS = [
  { slug: 'works', path: '/', title: 'つくったもの（トップ）' },
  { slug: 'cat', path: '/?view=cat', title: '業種' },
  { slug: 'how', path: '/?view=how', title: '進め方' },
  { slug: 'me', path: '/?view=me', title: 'AXEON' },
]

/** ページ内 evaluate：テキストブロックとレイアウト監査 */
const EXTRACT_FN = (detailOnly) => {
  const root =
    detailOnly && document.getElementById('detail')?.classList.contains('open')
      ? document.getElementById('dIn')
      : document.body
  if (!root) return { header: {}, blocks: [], layoutFlags: [], maxWidthOnText: [], viewport: { w: innerWidth, h: innerHeight } }
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'IFRAME'])
  const TEXT_TAGS = new Set([
    'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'LI', 'DT', 'DD', 'FIGCAPTION',
    'BLOCKQUOTE', 'SUMMARY', 'LABEL', 'BUTTON', 'A', 'SPAN', 'EM', 'STRONG', 'B', 'I',
  ])

  function isVisible(el) {
    if (!el || SKIP.has(el.tagName)) return false
    const st = getComputedStyle(el)
    if (st.display === 'none' || st.visibility === 'hidden' || st.opacity === '0') return false
    const r = el.getBoundingClientRect()
    if (r.width < 1 || r.height < 1) return false
    if (r.bottom < 0 || r.top > innerHeight) {
      // スクロール外も詳細では拾う
    }
    return true
  }

  function textOf(el) {
    return (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim()
  }

  function parentContainerWidth(el) {
    let p = el.parentElement
    while (p && p !== document.body) {
      const r = p.getBoundingClientRect()
      if (r.width > 40) return r.width
      p = p.parentElement
    }
    return innerWidth
  }

  function lineBreakAnalysis(el, text) {
    if (!text || text.length < 4) return { lines: [], orphanWarnings: [] }
    const range = document.createRange()
    range.selectNodeContents(el)
    const rects = range.getClientRects()
    const lines = []
    for (let i = 0; i < rects.length; i++) {
      const rect = rects[i]
      if (rect.width < 2 || rect.height < 2) continue
      // 行矩形ごとにテキストを近似取得（簡易）
      lines.push({ width: Math.round(rect.width), height: Math.round(rect.height) })
    }
    const orphanWarnings = []
    // innerText の行分割で orphan 検出
    const rawLines = (el.innerText || '').split(/\n/).map(s => s.trim()).filter(Boolean)
    for (const line of rawLines) {
      if (line.length <= 2 && rawLines.length > 1) {
        orphanWarnings.push(`短い行（${line.length}文字）: 「${line}」`)
      }
      const m = line.match(/^(.{2,})(.{1,2})$/)
      if (m && m[2].length <= 2 && line.length > 6 && !/[、。！？]$/.test(m[1])) {
        orphanWarnings.push(`行末1〜2文字の可能性: 「${line}」`)
      }
    }
    return { lineCount: rawLines.length, lines: rawLines, orphanWarnings }
  }

  function auditElement(el) {
    const text = textOf(el)
    if (!text || text.length < 1) return null
    const r = el.getBoundingClientRect()
    const st = getComputedStyle(el)
    const parentW = parentContainerWidth(el)
    const selfW = r.width
    const ratio = parentW > 0 ? selfW / parentW : 1
    const maxW = st.maxWidth
    const widthPct = st.width
    const overflowX = el.scrollWidth > el.clientWidth + 1
    const { lineCount, lines, orphanWarnings } = lineBreakAnalysis(el, text)

    const narrowText =
      ['P', 'H1', 'H2', 'H3', 'LI'].includes(el.tagName) &&
      ratio < 0.72 &&
      parentW > 200 &&
      !el.closest('.card') &&
      !el.closest('.mock')

    return {
      tag: el.tagName.toLowerCase(),
      role: el.getAttribute('role') || '',
      className: (el.className && typeof el.className === 'string') ? el.className.split(/\s+/).slice(0, 4).join(' ') : '',
      text,
      box: { w: Math.round(selfW), h: Math.round(r.height) },
      parentW: Math.round(parentW),
      widthRatio: Math.round(ratio * 100),
      cssMaxWidth: maxW,
      cssWidth: widthPct,
      overflowX,
      lineCount,
      lines,
      orphanWarnings,
      narrowText,
    }
  }

  const blocks = []
  const seen = new Set()
  const walk = (root) => {
    const els = root.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,summary,button,a,.lead,.one,.tt,.cc,.block,.story-hero,.story-intro,.chip,.badge,.tab span,.name,.sub,.count,.eyebrow')
    for (const el of els) {
      if (!isVisible(el)) continue
      if (el.closest('#detail') && !document.getElementById('detail')?.classList.contains('open')) continue
      if (el.closest('.view:not(.on)') && !el.closest('#detail')) continue
      const t = textOf(el)
      if (!t) continue
      const key = el.tagName + '|' + t.slice(0, 80)
      if (seen.has(key)) continue
      // 子要素と重複する親はスキップ（見出し・段落のみ）
      if (TEXT_TAGS.has(el.tagName)) {
        const childSame = [...el.querySelectorAll('h1,h2,h3,p,li')].some(c => textOf(c) === t)
        if (childSame && el.tagName !== 'BUTTON') continue
      }
      const item = auditElement(el)
      if (item) {
        seen.add(key)
        blocks.push(item)
      }
    }
  }

  walk(root)

  const header = {
    title: document.title,
    url: location.href,
    detailOpen: document.getElementById('detail')?.classList.contains('open') ?? false,
    activeView: document.querySelector('.view.on')?.id || '',
  }

  const layoutFlags = blocks.filter(b => b.narrowText || b.overflowX || (b.orphanWarnings && b.orphanWarnings.length))
  const maxWidthOnText = blocks.filter(b => {
    const mw = b.cssMaxWidth
    return mw && mw !== 'none' && mw !== '0px' && !b.className.includes('card')
  })

  return { header, blocks, layoutFlags, maxWidthOnText, viewport: { w: innerWidth, h: innerHeight } }
}

function mdEscape(s) {
  return String(s).replace(/\|/g, '\\|')
}

function blockToMd(b, i) {
  const lines = []
  lines.push(`### ${i + 1}. \`${b.tag}\`${b.className ? `（.${b.className}）` : ''}`)
  lines.push('')
  lines.push('**表示テキスト**')
  lines.push('')
  lines.push('```')
  lines.push(b.text)
  lines.push('```')
  if (b.lines && b.lines.length > 1) {
    lines.push('')
    lines.push('**改行（innerText）**')
    lines.push('')
    b.lines.forEach((ln, j) => lines.push(`${j + 1}. ${ln}`))
  }
  lines.push('')
  lines.push(`- ボックス幅: ${b.box.w}px（親の ${b.widthRatio}%）`)
  if (b.cssMaxWidth && b.cssMaxWidth !== 'none') lines.push(`- CSS max-width: ${b.cssMaxWidth}`)
  if (b.overflowX) lines.push('- ⚠ 横方向オーバーフローあり')
  if (b.narrowText) lines.push('- ⚠ 親幅に対して文章領域が狭い（72%未満）')
  if (b.orphanWarnings?.length) {
    lines.push('- ⚠ 行分割の注意:')
    b.orphanWarnings.forEach(w => lines.push(`  - ${w}`))
  }
  return lines.join('\n')
}

function pageMd(pageMeta, viewportKey, data) {
  const vp = VIEWPORTS[viewportKey]
  const lines = []
  lines.push(`# ${pageMeta.title}`)
  lines.push('')
  lines.push(`- **URL**: \`${pageMeta.path.startsWith('http') ? pageMeta.path : BASE + pageMeta.path}\``)
  lines.push(`- **ビューポート**: ${vp.label}`)
  lines.push(`- **document.title**: ${data.header.title}`)
  lines.push(`- **アクティブ view**: \`${data.header.activeView || '—'}\``)
  lines.push(`- **詳細オーバーレイ**: ${data.header.detailOpen ? '開' : '閉'}`)
  lines.push(`- **監査日時**: ${new Date().toISOString()}`)
  lines.push('')
  lines.push('## レイアウト所見（WEB-LAYOUT-RULES 観点）')
  lines.push('')
  if (!data.layoutFlags.length && !data.maxWidthOnText.length) {
    lines.push('特記事項なし（狭い max-width や orphan 警告は検出されませんでした）。')
  } else {
    if (data.maxWidthOnText.length) {
      lines.push('### max-width が効いているテキスト要素')
      data.maxWidthOnText.slice(0, 15).forEach(b => {
        lines.push(`- \`${b.tag}\` max-width=${b.cssMaxWidth} — 「${mdEscape(b.text.slice(0, 40))}…」`)
      })
    }
    if (data.layoutFlags.length) {
      lines.push('')
      lines.push('### 要確認')
      data.layoutFlags.slice(0, 20).forEach(b => {
        const bits = []
        if (b.narrowText) bits.push('狭い横幅')
        if (b.overflowX) bits.push('overflow')
        if (b.orphanWarnings?.length) bits.push('行分割')
        lines.push(`- [${bits.join(', ')}] \`${b.tag}\`: ${mdEscape(b.text.slice(0, 60))}${b.text.length > 60 ? '…' : ''}`)
      })
    }
  }
  lines.push('')
  lines.push('## テキスト一覧（表示順近似）')
  lines.push('')
  data.blocks.forEach((b, i) => {
    lines.push(blockToMd(b, i))
    lines.push('')
  })
  return lines.join('\n')
}

async function capturePage(page, pageMeta, viewportKey) {
  const vp = VIEWPORTS[viewportKey]
  await page.setViewportSize({ width: vp.width, height: vp.height })
  const url = pageMeta.path.startsWith('http') ? pageMeta.path : BASE + pageMeta.path
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(400)
  if (pageMeta.path.includes('demo=')) {
    await page.waitForSelector('#detail.open', { timeout: 15000 }).catch(() => {})
    await page.evaluate(() => {
      const d = document.getElementById('detail')
      if (d) d.scrollTop = 0
    })
    // 詳細は長いので段階スクロール
    for (let y = 0; y <= 12000; y += 800) {
      await page.evaluate(y => {
        const el = document.getElementById('detail')
        if (el) el.scrollTop = y
      }, y)
      await page.waitForTimeout(80)
    }
    await page.evaluate(() => {
      const el = document.getElementById('detail')
      if (el) el.scrollTop = 0
    })
  }
  const detailOnly = pageMeta.path.includes('demo=')
  return page.evaluate(EXTRACT_FN, detailOnly)
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  const demos = listedDemos()
  const pages = [
    ...TAB_VIEWS,
    ...demos.map(d => ({
      slug: `demo-${d.id}`,
      path: `/?demo=${d.id}`,
      title: `デモ詳細: ${d.plain || d.id}`,
    })),
  ]

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ locale: 'ja-JP' })
  const page = await context.newPage()

  const indexLines = [
    '# 全ページ テキスト監査インデックス',
    '',
    `生成: ${new Date().toISOString()}`,
    '',
    '参照: `.agents/skills/WEB-LAYOUT-RULES.md`',
    '',
    '再生成: `node scripts/export-page-text-audit.mjs`（要 `npm run dev`）',
    '',
    '## タブ画面',
    '',
  ]
  for (const v of TAB_VIEWS) {
    indexLines.push(`- [${v.title}](./${v.slug}.md)`)
  }
  indexLines.push('', '## デモ紹介（ストーリー）', '')
  for (const d of demos) {
    indexLines.push(`- [${d.plain || d.id}](./demo-${d.id}.md)`)
  }
  indexLines.push('', '## ビューポート別ファイル', '')
  indexLines.push('各ページ MD 内に **スマホ** / **PC** 両方のセクションを含めます。', '')

  for (const pageMeta of pages) {
    const combined = []
    combined.push(`# ${pageMeta.title} — テキスト監査`)
    combined.push('')
    combined.push(`| 項目 | 値 |`)
    combined.push(`| --- | --- |`)
    combined.push(`| パス | \`${pageMeta.path}\` |`)
    combined.push(`| slug | \`${pageMeta.slug}\` |`)
    combined.push('')

    for (const vk of Object.keys(VIEWPORTS)) {
      const data = await capturePage(page, pageMeta, vk)
      combined.push('---')
      combined.push('')
      combined.push(pageMd(pageMeta, vk, data))
      combined.push('')
    }

    const outPath = path.join(OUT_DIR, `${pageMeta.slug}.md`)
    await fs.writeFile(outPath, combined.join('\n'), 'utf8')
    console.log('wrote', outPath)
  }

  await fs.writeFile(path.join(OUT_DIR, 'README.md'), indexLines.join('\n'), 'utf8')
  console.log('wrote', path.join(OUT_DIR, 'README.md'))

  await browser.close()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
