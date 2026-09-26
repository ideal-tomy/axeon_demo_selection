import { ICON, categoryLabel, getDemoById } from './data.js'
import { constructionStory } from './construction-story.js'
import { internalKnowledgeStory } from './internal-knowledge-story.js'
import { kaigoHandoffStory } from './kaigo-handoff-story.js'
import { qualityIncidentStory } from './quality-incident-story.js'
import { approvalInspectionStory } from './approval-inspection-story.js'
import { gymFacilityStory } from './gym-facility-story.js'
import { ddMaStory } from './dd-ma-story.js'
import { logisticsDispatchStory } from './logistics-dispatch-story.js'
import { wholesaleQuoteStory } from './wholesale-quote-story.js'
import { fieldDandoriStory } from './field-dandori-story.js'
import { storyCopy } from './demo-stories.js'
import { storyImages } from './story-images.js'

export function hasStory(d) {
  return Boolean(d && d.linkState === 'available' && /^https:\/\//i.test(d.url || ''))
}

/** 厳選版からの体験リンクは各デモのトップ（LP）へ。深い path / hash は使わない。 */
export function demoEntryUrl(url) {
  try {
    const u = new URL(url)
    u.searchParams.set('from', 'axeon-demo-selection')
    u.hash = ''
    return u.toString()
  } catch {
    return url
  }
}

const list = (items, esc) => `<ul>${items.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`
const lines = (text, esc) => (Array.isArray(text) ? text : [text]).map(esc).join('<br>')
const number = i => String(i + 1).padStart(2, '0')

function external(d, _path, label, esc, cls = 'story-link') {
  if (!hasStory(d)) return ''
  const url = demoEntryUrl(d.url)
  return `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span><span class="sr-only">（別タブで開きます）</span></a>`
}

function disclosure(title, body, esc, index) {
  return `<details class="story-disclosure"><summary>${index == null ? '' : `<span class="story-number">${number(index)}</span>`}${esc(title)}</summary><div class="story-disclosure-body">${body}</div></details>`
}

function constructionModel(d, esc) {
  const c = constructionStory
  const headlines = ['写真を送る', '整理して下書き', '提出後を確認']
  const subtitles = [
    '現場で撮った写真をまとめて送るだけ。',
    '写真を工種ごとに整理し、必要な項目を自動で下書きにします。',
    '提出した日報の確認や、不足写真の依頼もまとめて行えます。'
  ]
  return {
    title: ['現場写真から、', '報告書まで。'], intro: ['写真を整理し、報告書の下書きを確認。', '提出した日報を、管理側で確認する操作も試せます。'],
    eyebrow: c.eyebrow, meta: [['対象','現場監督・事務担当・工事責任者'],['体験する作業','3ステップ'],['下書きの確認','担当者が確認']],
    cta: '写真整理のデモを開く', path: '/?from=axeon-demo-selection',
    previews: c.steps.map((s, i) => ({ label: s.title, headline: headlines[i], subtitle: subtitles[i], image: s.image, alt: s.cap, compact: true, stepBadge: true })),
    toolIntroLayout: true,
    changeLayout: 'compare',
    changeTitle: 'このツールで変わること',
    compareConstruction: true,
    changes: [
      ['写真を探して名前を付け直す', '工種ごとに整理。名前も自動で付ける'],
      ['一から報告書を書く', '下書きから確認する'],
      ['一人ずつ不足写真を確認', 'まとめて確認する']
    ],
    conditionSummary: ['サンプルの写真と文章ですぐ試せます。', '実際の送信や業務データの保存は行いません。'],
    conditionTitle: '利用条件・写真を使う際の注意',
    conditionBody: list(c.conditions, esc),
    conditionAccordion: true,
    closingStrong: true,
    closingTitle: '実際に試してみる',
    closing: 'サンプルデータですぐ操作できます。',
    related: []
  }
}

function thinStoryModel(d, s) {
  const images = storyImages[d.id] || []
  const shots = (d.shots || []).map(x => (Array.isArray(x) ? { cap: x[1], image: x[2] } : x))
  const labels = s.steps.map((step) => step.title)
  const previews = s.steps.map((step, i) => {
    const fresh = images[i]
    const shot = shots[i]
    // shots[].image が正本（カード／詳細ギャラリー）。story-images は未設置時のフォールバック
    const image = shot?.image || fresh?.image
    return {
      label: step.title,
      headline: step.headline,
      caption: image ? (shot?.cap || fresh?.label || step.caption) : step.caption,
      image,
      alt: shot?.cap || fresh?.label || step.title,
      diagram: labels,
      active: i,
      point: step.point,
    }
  })
  return {
    layout: 'thin',
    title: s.title,
    intro: s.intro,
    eyebrow: s.eyebrow,
    meta: s.meta,
    cta: s.cta,
    path: s.path,
    previews,
    conditionSummary: s.conditionSummary,
    related: s.related,
  }
}

function internalKnowledgeModel(d) {
  return thinStoryModel(d, internalKnowledgeStory)
}

function kaigoHandoffModel(d) {
  return thinStoryModel(d, kaigoHandoffStory)
}

function qualityIncidentModel(d) {
  return thinStoryModel(d, qualityIncidentStory)
}

function approvalInspectionModel(d) {
  return thinStoryModel(d, approvalInspectionStory)
}

function gymFacilityModel(d) {
  return thinStoryModel(d, gymFacilityStory)
}

function ddMaModel(d) {
  return thinStoryModel(d, ddMaStory)
}

function logisticsDispatchModel(d) {
  return thinStoryModel(d, logisticsDispatchStory)
}

function wholesaleQuoteModel(d) {
  return thinStoryModel(d, wholesaleQuoteStory)
}

function fieldDandoriModel(d) {
  return thinStoryModel(d, fieldDandoriStory)
}

function demoModel(d, esc) {
  const copy=storyCopy[d.id]
  const rawShots=(d.shots || []).map(s=>Array.isArray(s)?{cap:s[1]}:s)
  const images=storyImages[d.id] || []
  const labels=rawShots.map(s=>s.cap)
  const previews=rawShots.map((s,i)=>{
    const fresh=images[i]
    const image=s.image || fresh?.image
    const label=fresh?.label || s.cap
    return {label,headline:fresh?.headline || copy?.headlines[i] || label,
      caption:image ? label : '仕組みのイメージ',image,alt:label,
      diagram:labels,active:i,point:(d.can || [])[Math.min(i,(d.can || []).length-1)] || d.one}
  })
  return {
    title:copy?.title || d.plain,intro:copy?.intro || d.one,eyebrow:categoryLabel(d.category)+'の業務改善',
    meta:[['使う人',(d.audience || categoryLabel(d.category)).split('と')[0].split('・').slice(0,2).join('・')],['見られる内容',copy?.mode || '画面紹介'],['公開状態','体験版あり']],
    cta:copy?.mode === '説明デモ' ? '説明の流れを見る' : copy?.mode === '画面紹介' ? '体験版の画面を見る' : '体験版を開く',path:'',previews,
    changeTitle:'この仕事を、見直すきっかけに。',changes:copy?.changes || [],
    background:`<p>${esc(d.audience || '')}</p><p>${esc(d.when || '')}</p><p>${esc(d.lead || d.one)}</p>`,
    detailsLead:'気になる項目を開くと、このデモで見られる内容を確認できます。',
    details:(d.can || []).map((text,i)=>({title:(copy?.detailTitles || copy?.headlines)?.[i] || '見られること '+number(i),body:`<p>${esc(text)}</p><p class="story-look"><strong>見るポイント</strong>${esc(copy?.changes[Math.min(i,copy.changes.length-1)]?.[1] || text)}</p>`})),
    conditionSummary:d.experienceNote || '体験版の入口で利用案内をご確認ください。',
    conditionTitle:'体験の範囲について',conditionBody:copy?.limits?.length ? list(copy.limits,esc) : '',
    closingEyebrow:'自社で使う場合を考える',closingTitle:['自社の仕事なら、','どこが変わるか。'],closing:copy?.question || d.when,related:d.relatedIds || []
  }
}

function preview(p,i,esc) {
  const visual=p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.alt)}" loading="${i===0?'eager':'lazy'}" width="390" height="844">`
    : `<div class="story-diagram"><span class="story-diagram-label">機能のイメージ</span><ol>${p.diagram.map((label,j)=>`<li class="${j===p.active?'is-current':''}"><span>${number(j)}</span><strong>${esc(label)}</strong></li>`).join('')}</ol><p>${esc(p.point)}</p></div>`
  const compact = p.compact ? ' story-preview-compact' : ''
  const sub = p.subtitle ? `<p class="story-preview-sub">${esc(p.subtitle)}</p>` : ''
  const stepBadge = p.compact && p.stepBadge ? `<span class="story-preview-step" aria-hidden="true">${i + 1}</span>` : ''
  const caption = p.compact
    ? `<div class="story-preview-title-row">${stepBadge}<h3>${esc(p.headline)}</h3></div>${sub}`
    : `<span class="story-number">${number(i)} / ${esc(p.label)}</span><h3>${esc(p.headline)}</h3><p>${esc(p.caption)}</p>`
  return `<figure class="story-preview-card story-preview-${i}${compact}"><figcaption>${caption}</figcaption>${visual}</figure>`
}

const LINE_ICON = {
  search: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.75"/><path d="m16.2 16.2 4.3 4.3" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>',
  file: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M8 5.5h5.2L16 8.3V18a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 18V7A1.5 1.5 0 0 1 8 5.5Z" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/><path d="M13 5.5V8.3H16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/></svg>',
  users: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><circle cx="9" cy="9.5" r="2.6" fill="none" stroke="currentColor" stroke-width="1.75"/><path d="M4.5 17.5c.8-2.2 2.4-3.4 4.5-3.4s3.7 1.2 4.5 3.4" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/><circle cx="16.2" cy="10.2" r="2.1" fill="none" stroke="currentColor" stroke-width="1.75"/><path d="M14.2 17.5c.5-1.6 1.6-2.5 3.1-2.5" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>',
  folder: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M5 7.2A1.8 1.8 0 0 1 6.8 5.4h4.1l1.6 1.8H17a1.8 1.8 0 0 1 1.8 1.8V17a1.8 1.8 0 0 1-1.8 1.8H6.8A1.8 1.8 0 0 1 5 17V7.2Z" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" stroke-width="1.75"/><path d="m8.2 12.2 2.3 2.3 5.3-5.3" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>'
}

function constructionToolCompare(changes, esc) {
  const beforeIcons = ['search', 'file', 'users']
  const afterIcons = ['folder', 'file', 'check']
  const afterText = after => esc(Array.isArray(after) ? after[0] : after)
  const pcRows = changes.map(([before, after], i) =>
    `<li class="story-construction-row"><div class="story-construction-before"><span class="story-construction-icon story-construction-icon-before">${LINE_ICON[beforeIcons[i]] || LINE_ICON.search}</span><p class="story-construction-before-text">${esc(before)}</p><span class="story-construction-row-arrow" aria-hidden="true">→</span></div><div class="story-construction-after"><span class="story-construction-icon story-construction-icon-after">${LINE_ICON[afterIcons[i]] || LINE_ICON.folder}</span><p class="story-construction-after-text">${afterText(after)}</p></div></li>`
  ).join('')
  const mobileItems = changes.map(([before, after]) =>
    `<li class="story-construction-mobile-item"><p class="story-construction-mobile-before">${esc(before)}</p><p class="story-construction-mobile-step" aria-hidden="true">↓</p><div class="story-construction-mobile-after"><p class="story-construction-after-text">${afterText(after)}</p></div></li>`
  ).join('')
  return `<div class="story-construction-compare"><ul class="story-construction-compare-pc">${pcRows}</ul><ul class="story-construction-compare-mobile">${mobileItems}</ul></div>`
}

function galleryDots(count) {
  return `<div class="story-gallery-dots" aria-hidden="true">${Array.from({ length: count }, (_, i) => `<span class="story-gallery-dot${i === 0 ? ' is-active' : ''}"></span>`).join('')}</div>`
}

const COMPARE_STACK_ICONS = [
  '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false"><rect x="3" y="3" width="8" height="8" rx="2" fill="#9b87f5"/><rect x="13" y="3" width="8" height="8" rx="2" fill="#5ec995"/><rect x="3" y="13" width="8" height="8" rx="2" fill="#f5b75e"/><rect x="13" y="13" width="8" height="8" rx="2" fill="#6ec5cf"/></svg>',
  '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false"><rect x="5" y="3" width="14" height="18" rx="2" fill="#fff" stroke="#c5d0e4" stroke-width="1.2"/><line x1="8" y1="8" x2="16" y2="8" stroke="#26418e" stroke-width="1.2" stroke-linecap="round"/><line x1="8" y1="11" x2="16" y2="11" stroke="#26418e" stroke-width="1.2" stroke-linecap="round"/><rect x="8" y="14" width="8" height="4" rx="1" fill="#9b87f5"/></svg>',
  '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false"><circle cx="6" cy="7" r="2" fill="#5ec995"/><line x1="10" y1="7" x2="18" y2="7" stroke="#c5d0e4" stroke-width="1.5" stroke-linecap="round"/><circle cx="6" cy="12" r="2" fill="#f5b75e"/><line x1="10" y1="12" x2="18" y2="12" stroke="#c5d0e4" stroke-width="1.5" stroke-linecap="round"/><circle cx="6" cy="17" r="2" fill="#5ec995"/><line x1="10" y1="17" x2="18" y2="17" stroke="#c5d0e4" stroke-width="1.5" stroke-linecap="round"/></svg>'
]

function compareAfterBlock(after, esc) {
  const lines = Array.isArray(after) ? after : [after]
  if (lines.length <= 1) {
    return `<div class="story-compare-afters"><p class="story-compare-after">${esc(lines[0])}</p></div>`
  }
  const parts = lines.map(line => `<span class="story-compare-after-part">${esc(line)}</span>`).join('')
  return `<div class="story-compare-afters"><p class="story-compare-after">${parts}</p></div>`
}

function changeCompareStack(changes, esc, { compareLabels = false } = {}) {
  const items = changes.map(([before, after], i) => {
    const afterHtml = compareLabels
      ? `<p class="story-compare-after">${esc(Array.isArray(after) ? after.join('') : after)}</p>`
      : compareAfterBlock(after, esc)
    const copy = compareLabels
      ? `<p class="story-compare-label">いま：</p><p class="story-compare-before">${esc(before)}</p><p class="story-compare-label story-compare-label-tool">このツールでは：</p>${afterHtml}`
      : `<p class="story-compare-before">${esc(before)}</p>${afterHtml}`
    return `<li class="story-compare-stack-item"><div class="story-compare-stack-rail"><span class="story-compare-stack-icon">${COMPARE_STACK_ICONS[i] || COMPARE_STACK_ICONS[0]}</span></div><div class="story-compare-stack-copy">${copy}</div></li>`
  }).join('')
  return `<ul class="story-compare-stack" aria-label="いまの仕事と、このツールを使ったとき">${items}</ul>`
}

function changeWorkCompare(changes, esc) {
  const afterText = after => esc(Array.isArray(after) ? after[0] : after)
  const beforeLines = changes.map(([before]) =>
    `<li class="story-work-compare-line"><p class="story-work-compare-before">${esc(before)}</p></li>`
  ).join('')
  const afterLines = changes.map(([, after]) =>
    `<li class="story-work-compare-line"><p class="story-work-compare-after">${afterText(after)}</p></li>`
  ).join('')
  const arrows = changes.map(() => `<span class="story-work-compare-arrow" aria-hidden="true">→</span>`).join('')
  const mobileItems = changes.map(([before, after]) =>
    `<li class="story-work-compare-mobile-item"><p class="story-work-compare-before">${esc(before)}</p><p class="story-work-compare-step" aria-hidden="true">↓</p><div class="story-work-compare-after-highlight"><p class="story-work-compare-after">${afterText(after)}</p></div></li>`
  ).join('')
  return `<div class="story-work-compare"><div class="story-work-compare-pc"><div class="story-work-compare-head"><span>いまの作業</span><span class="story-work-compare-head-gap" aria-hidden="true"></span><span>このツールでは</span></div><div class="story-work-compare-pc-body"><ul class="story-work-compare-before-col">${beforeLines}</ul><div class="story-work-compare-arrows-col">${arrows}</div><div class="story-work-compare-after-col story-work-compare-highlight"><ul class="story-work-compare-after-list">${afterLines}</ul></div></div></div><ul class="story-work-compare-mobile">${mobileItems}</ul></div>`
}

function heroStage(previews, esc) {
  const shots = (previews || []).filter(p => p.image).slice(0, 3)
  if (!shots.length) return ''
  return `<div class="story-hero-stage" aria-hidden="true">${shots.map((p, i) => `<img class="story-hero-shot story-hero-shot-${i}" src="${esc(p.image)}" alt="" width="390" height="600">`).join('')}</div>`
}

const FIT_ICONS = {
  clock: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" stroke-width="1.75"/><path d="M12 7.8V12l2.7 1.7" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  photo: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><rect x="3.2" y="4.2" width="12.6" height="10.4" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.75"/><circle cx="7.4" cy="8" r="1.15" fill="none" stroke="currentColor" stroke-width="1.75"/><path d="M3.4 12.6 6.8 9.8l2.8 2.2 1.8-1.4 4.2 3.2" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/><circle cx="16.4" cy="16.2" r="2.5" fill="none" stroke="currentColor" stroke-width="1.75"/><path d="m18.2 18 2.2 2.2" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>',
  message: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M5 6.2h12.2A1.6 1.6 0 0 1 18.8 7.8v6.4a1.6 1.6 0 0 1-1.6 1.6H9.4L6.2 18.4v-2.6H5A1.6 1.6 0 0 1 3.4 14.2V7.8A1.6 1.6 0 0 1 5 6.2Z" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/></svg>'
}

function usecaseSection(m, esc) {
  if (!m.background) return ''
  return `<section class="story-section story-usecase" id="story-usecase">${disclosure('こんな業務で使えます', m.background, esc)}</section>`
}

function usecaseGridSection(m, esc) {
  if (!m.usecaseItems?.length) return ''
  const cells = m.usecaseItems.map(item => {
    const body = item.body ? `<p class="story-fit-cell-body">${esc(item.body)}</p>` : ''
    const icon = FIT_ICONS[item.icon] ? `<span class="story-fit-icon">${FIT_ICONS[item.icon]}</span>` : ''
    return `<div class="story-fit-cell">${icon}<h3 class="story-fit-cell-title">${esc(item.title)}</h3>${body}</div>`
  }).join('')
  const foot = m.usecaseAudience
    ? `<p class="story-fit-footnote"><span class="story-fit-footnote-label">${esc(m.usecaseAudience.label)}</span><span class="story-fit-footnote-roles">${esc(m.usecaseAudience.roles)}</span></p>`
    : m.usecaseFootnote ? `<p class="story-fit-footnote">${esc(m.usecaseFootnote)}</p>` : ''
  return `<section class="story-section story-fit" id="story-usecase"><h2>こんな業務に</h2><div class="story-fit-grid">${cells}</div>${foot}</section>`
}

function experienceDetailSection(m, esc) {
  if (!m.conditionBody) return ''
  return `<section class="story-section story-experience-detail" id="story-experience-detail"><h2>${esc(m.conditionTitle)}</h2><div class="story-experience-detail-body">${m.conditionBody}</div></section>`
}

function experienceSection(m, esc, extras = '') {
  const accordion = m.conditionBody && m.conditionAccordion ? disclosure(m.conditionTitle, m.conditionBody, esc) : ''
  const detailSection = !m.conditionAccordion && m.conditionBody ? experienceDetailSection(m, esc) : ''
  const noteClass = m.conditionAccordion ? ' story-conditions-note' : ''
  const compactClass = m.toolIntroLayout ? ' story-conditions-compact' : ''
  const leadHtml = m.toolIntroLayout && Array.isArray(m.conditionSummary)
    ? `<p class="story-section-lead story-section-lead-flow">${m.conditionSummary.map(esc).join('')}</p>`
    : `<p class="story-section-lead">${lines(m.conditionSummary, esc)}</p>`
  return `<section class="story-section story-conditions${noteClass}${compactClass}" id="story-conditions"><h2>体験について</h2>${leadHtml}${accordion}${extras}</section>${detailSection}`
}

function benefitsSection(m, esc) {
  const eyebrow = m.changeLayout === 'compare' ? '' : `<p class="story-eyebrow">${esc(m.changeEyebrow || 'このデモでできること')}</p>`
  const titleBlock = m.changeTitle
    ? `<h2>${Array.isArray(m.changeTitle) ? lines(m.changeTitle, esc) : esc(m.changeTitle)}</h2>`
    : ''
  const body = m.compareConstruction
    ? constructionToolCompare(m.changes, esc)
    : m.compareTable
    ? changeWorkCompare(m.changes, esc)
    : m.changeLayout === 'compare'
      ? changeCompareStack(m.changes, esc, { compareLabels: m.compareLabels })
      : `<div class="story-changes">${m.changes.map(([before, after], i) => `<div><span class="story-number">${number(i)}</span><div><p>${esc(before)}</p><h3>${esc(after)}</h3></div><span aria-hidden="true">↗</span></div>`).join('')}</div>`
  const note = m.note ? `<p class="story-note">${esc(m.note)}</p>` : ''
  const usecaseInline = m.changeLayout === 'compare' ? '' : (m.background ? disclosure('こんな業務で使えます', m.background, esc) : '')
  const usecaseBlock = m.toolIntroLayout ? '' : (m.usecaseItems?.length ? usecaseGridSection(m, esc) : usecaseSection(m, esc))
  const compareBlock = m.changeLayout === 'compare'
    ? `<section class="story-section story-compare" id="story-benefits">${eyebrow}${titleBlock}${body}${note}</section>${usecaseBlock}`
    : `<section class="story-section" id="story-benefits">${eyebrow}${titleBlock}${body}${usecaseInline}${note}</section>`
  return compareBlock
}

function closingSection(m, d, esc) {
  const eyebrow = m.closingEyebrow ? `<p class="story-eyebrow">${esc(m.closingEyebrow)}</p>` : ''
  const extra =
    m.closingDetail && m.closingExtraTitle
      ? disclosure(m.closingExtraTitle, m.closingDetail, esc)
      : ''
  const strongClass = m.closingStrong ? ' story-closing--cta-strong' : ''
  const title = Array.isArray(m.closingTitle) ? lines(m.closingTitle, esc) : esc(m.closingTitle)
  const lead = Array.isArray(m.closing) ? lines(m.closing, esc) : esc(m.closing)
  return `<section class="story-closing${strongClass}">${eyebrow}<h2>${title}</h2><p class="story-closing-lead">${lead}</p>${external(d, m.path, m.cta, esc, 'story-button')}${extra}</section>`
}

function operationDetailsSection(m, esc) {
  if (!m.details?.length) return ''
  const lead = m.detailsLead ? `<p class="story-section-lead">${esc(m.detailsLead)}</p>` : ''
  return `<section class="story-section"><p class="story-eyebrow">詳しい操作方法</p><h2>デモの操作手順</h2>${lead}${m.details.map((s, i) => disclosure(s.title, s.body, esc, i)).join('')}</section>`
}

function pickModel(d, esc) {
  if (d.id === 'construction-record') return constructionModel(d, esc)
  if (d.id === 'internal-knowledge') return internalKnowledgeModel(d)
  if (d.id === 'kaigo-handoff') return kaigoHandoffModel(d)
  if (d.id === 'quality-incident') return qualityIncidentModel(d)
  if (d.id === 'approval-inspection') return approvalInspectionModel(d)
  if (d.id === 'gym-facility') return gymFacilityModel(d)
  if (d.id === 'dd-ma') return ddMaModel(d)
  if (d.id === 'logistics-dispatch') return logisticsDispatchModel(d)
  if (d.id === 'wholesale-quote') return wholesaleQuoteModel(d)
  if (d.id === 'field-dandori') return fieldDandoriModel(d)
  return demoModel(d, esc)
}

export function buildDemoStory(d,esc) {
  const m=pickModel(d,esc)
  const category=categoryLabel(d.category)
  const related=[...new Set(m.related)].map(getDemoById).filter(x=>x && x.id!==d.id && x.listed!==false).slice(0,4)
  const relatedNav=related.length?`<nav class="story-section story-related" aria-label="関連するデモ"><h2>関連するデモも見る</h2>${related.map(x=>`<button type="button" data-goto="${esc(x.id)}"><span>${esc(x.plain)}<small>${esc(categoryLabel(x.category))}</small></span><span aria-hidden="true">→</span></button>`).join('')}</nav>`:''
  if (m.layout === 'thin') {
    return `<article class="demo-story story-theme-${esc(d.category)} story-layout-thin">
    <header class="story-top"><button type="button" id="dBack" class="story-back" aria-label="紹介を閉じる">← 一覧へ</button><span>AXEON / ${esc(category)}</span></header>
    <section class="story-hero" aria-labelledby="detailTitle"><div class="story-app-heading"><div class="story-app-icon" aria-hidden="true">${ICON[d.icon] || ICON.doc}</div><div><p class="story-eyebrow">${esc(m.eyebrow)}</p><h1 id="detailTitle">${lines(m.title,esc)}</h1></div></div><p class="story-intro">${lines(m.intro,esc)}</p><div class="story-actions">${external(d,m.path,m.cta,esc,'story-button')}</div>    <div class="story-meta">${m.meta.map(([k,v])=>`<div><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join('')}</div></section>
    <section class="story-preview" aria-labelledby="previewTitle"><div class="story-section-heading"><h2 id="previewTitle">このデモで見られること</h2></div><div class="story-gallery" tabindex="0" role="region" aria-label="${m.previews.length}つのプレビュー。横にスクロールできます">${m.previews.map((p,i)=>preview(p,i,esc)).join('')}</div></section>
    <section class="story-section story-conditions"><h2>体験について</h2><p class="story-section-lead">${lines(m.conditionSummary,esc)}</p><div class="story-actions">${external(d,m.path,m.cta,esc,'story-button')}</div></section>
    ${relatedNav}
  </article>`
  }
  const layoutClass = m.toolIntroLayout ? ' story-layout-tool-intro' : ''
  const previewTitle = m.toolIntroLayout ? '写真整理から提出後の確認まで' : 'このデモで見られること'
  const stage = m.toolIntroLayout ? heroStage(m.previews, esc) : ''
  const heroBlock = m.toolIntroLayout
    ? `<div class="story-hero-panel"><section class="story-hero" aria-labelledby="detailTitle"><div class="story-hero-copy"><p class="story-eyebrow">${esc(m.eyebrow)}</p><div class="story-app-heading"><div class="story-app-icon" aria-hidden="true">${ICON[d.icon] || ICON.doc}</div><h1 id="detailTitle">${lines(m.title, esc)}</h1></div><p class="story-intro">${lines(m.intro, esc)}</p><div class="story-actions">${external(d, m.path, m.cta, esc, 'story-button')}</div><div class="story-meta">${m.meta.map(([k, v]) => `<div><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join('')}</div></div>${stage}</section></div>`
    : `<section class="story-hero" aria-labelledby="detailTitle"><div class="story-hero-copy"><div class="story-app-heading"><div class="story-app-icon" aria-hidden="true">${ICON[d.icon] || ICON.doc}</div><div><p class="story-eyebrow">${esc(m.eyebrow)}</p><h1 id="detailTitle">${lines(m.title, esc)}</h1></div></div><p class="story-intro">${lines(m.intro, esc)}</p><div class="story-actions">${external(d, m.path, m.cta, esc, 'story-button')}</div><div class="story-meta">${m.meta.map(([k, v]) => `<div><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join('')}</div></div>${stage}</section>`
  const previewBlock = m.toolIntroLayout
    ? `<section class="story-preview" aria-labelledby="previewTitle"><div class="story-section-heading"><h2 id="previewTitle">${previewTitle}</h2></div><div class="story-gallery-track"><div class="story-gallery" tabindex="0" role="region" aria-label="${m.previews.length}つのプレビュー。横にスクロールできます">${m.previews.map((p, i) => preview(p, i, esc)).join('')}</div>${galleryDots(m.previews.length)}</div></section>`
    : `<section class="story-preview" aria-labelledby="previewTitle"><div class="story-section-heading"><h2 id="previewTitle">${previewTitle}</h2></div><div class="story-gallery" tabindex="0" role="region" aria-label="${m.previews.length}つのプレビュー。横にスクロールできます">${m.previews.map((p, i) => preview(p, i, esc)).join('')}</div></section>`
  return `<article class="demo-story story-theme-${esc(d.category)}${layoutClass}">
    <header class="story-top"><button type="button" id="dBack" class="story-back" aria-label="紹介を閉じる">← 一覧へ</button><span>AXEON / ${esc(category)}</span></header>
    ${heroBlock}
    ${previewBlock}
    ${benefitsSection(m, esc)}
    ${operationDetailsSection(m, esc)}
    ${experienceSection(m, esc)}
    ${closingSection(m, d, esc)}
    ${relatedNav}
  </article>`
}
