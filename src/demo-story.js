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
  const headlines = ['工種ごとに写真を整理する。', '報告書の下書きを確認する。', '提出された日報を確認する。']
  const captions = ['現場名・工種・日付でファイル名を付ける。', '日報サンプルを選んで試せます。', '日報の内容と確認状況を、管理画面で確認。']
  return {
    title: ['現場写真から、', '報告書まで。'], intro: ['写真を整理し、報告書の下書きを確認。', '提出した日報を、管理側で確認する操作も試せます。'],
    eyebrow: c.eyebrow, meta: [['使う人','現場・事務'],['体験する作業','3ステップ'],['下書きの確認','担当者が確認']],
    cta: '写真整理のデモを開く', path: '/?from=axeon-demo-selection',
    previews: c.steps.map((s,i) => ({label:s.title,headline:headlines[i],caption:captions[i],image:s.image,alt:s.cap})),
    changeTitle:['写真整理と報告書作成を、','サンプルで試せます。'], changes:c.before.map((b,i)=>[b,c.after[i]]),
    background:`<p>${esc(c.audience)}</p>${list(c.problems,esc)}<p>${esc(c.approach)}</p>`,
    note:'削減できる時間は業務や使い方によって異なります。このデモでは、写真整理と報告書作成の手順を試せます。',
    detailsLead:'写真整理から、日報の提出後の確認まで順番に試せます。',
    details:c.steps.map((s,i)=>({title:s.title,body:(i===0?[c.benefits[0]]:i===1?[c.benefits[1],c.benefits[2]]:[c.benefits[3]]).map(b=>`<h3>${esc(b.title)}</h3><p>${esc(b.body)}</p><p class="story-look"><strong>見るポイント</strong>${esc(b.point)}</p>`).join('')+`<h3>操作の流れ</h3><p>${esc(s.body)}</p>`+(i===1?'<p>下書きから試す場合は「サンプルで試す」から日報サンプルを選びます。スマートフォンでは「体験をはじめる」から進みます。</p>':'')+external(d,s.path,i===0?'写真整理のデモを開く':i===1?'報告書のデモを開く':'管理側のデモを開く',esc)})),
    conditionSummary:['用意された写真と文章で試すデモです。','提出・通知・催促はデモ内の操作です。実際の送信やサーバーへの保存は行いません。'],
    conditionTitle:'体験の範囲と、写真を使う際の注意',conditionBody:list(c.conditions,esc),
    closingTitle:['写真整理と報告書づくりを、','試してみてください。'],closing:['毎回書く項目や、現場に聞き直すことが多い項目。','今の仕事と比べながら、操作してみてください。'],
    closingDetail:`<p>${esc(c.closing)}</p>${external(d,'','建設デモを開く',esc)}`,
    related:['field-dandori','contractor-matching']
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
    closingTitle:['自社の仕事なら、','どこが変わるか。'],closing:copy?.question || d.when,related:d.relatedIds || []
  }
}

function preview(p,i,esc) {
  const visual=p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.alt)}" loading="${i===0?'eager':'lazy'}" width="390" height="844">`
    : `<div class="story-diagram"><span class="story-diagram-label">機能のイメージ</span><ol>${p.diagram.map((label,j)=>`<li class="${j===p.active?'is-current':''}"><span>${number(j)}</span><strong>${esc(label)}</strong></li>`).join('')}</ol><p>${esc(p.point)}</p></div>`
  return `<figure class="story-preview-card story-preview-${i}"><figcaption><span class="story-number">${number(i)} / ${esc(p.label)}</span><h3>${esc(p.headline)}</h3><p>${esc(p.caption)}</p></figcaption>${visual}</figure>`
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
  return `<article class="demo-story story-theme-${esc(d.category)}">
    <header class="story-top"><button type="button" id="dBack" class="story-back" aria-label="紹介を閉じる">← 一覧へ</button><span>AXEON / ${esc(category)}</span></header>
    <section class="story-hero" aria-labelledby="detailTitle"><div class="story-app-heading"><div class="story-app-icon" aria-hidden="true">${ICON[d.icon] || ICON.doc}</div><div><p class="story-eyebrow">${esc(m.eyebrow)}</p><h1 id="detailTitle">${lines(m.title,esc)}</h1></div></div><p class="story-intro">${lines(m.intro,esc)}</p><div class="story-actions">${external(d,m.path,m.cta,esc,'story-button')}</div>    <div class="story-meta">${m.meta.map(([k,v])=>`<div><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join('')}</div></section>
    <section class="story-preview" aria-labelledby="previewTitle"><div class="story-section-heading"><h2 id="previewTitle">写真整理から提出後の確認まで</h2></div><div class="story-gallery" tabindex="0" role="region" aria-label="${m.previews.length}つのプレビュー。横にスクロールできます">${m.previews.map((p,i)=>preview(p,i,esc)).join('')}</div></section>
    <section class="story-section" id="story-benefits"><p class="story-eyebrow">このデモでできること</p><h2>${lines(m.changeTitle,esc)}</h2><div class="story-changes">${m.changes.map(([before,after],i)=>`<div><span class="story-number">${number(i)}</span><div><p>${esc(before)}</p><h3>${esc(after)}</h3></div><span aria-hidden="true">↗</span></div>`).join('')}</div>${disclosure('こんな業務で使えます',m.background,esc)}${m.note?`<p class="story-note">${esc(m.note)}</p>`:''}</section>
    <section class="story-section"><p class="story-eyebrow">詳しい操作方法</p><h2>デモの操作手順</h2><p class="story-section-lead">${esc(m.detailsLead)}</p>${m.details.map((s,i)=>disclosure(s.title,s.body,esc,i)).join('')}</section>
    <section class="story-section story-conditions"><h2>体験について</h2><p class="story-section-lead">${lines(m.conditionSummary,esc)}</p>${m.conditionBody?disclosure(m.conditionTitle,m.conditionBody,esc):''}</section>
    <section class="story-closing"><p class="story-eyebrow">自社で使う場合を考える</p><h2>${lines(m.closingTitle,esc)}</h2><p>${lines(m.closing,esc)}</p>${external(d,m.path,m.cta,esc,'story-button')}${m.closingDetail?disclosure('自社で使うときに考えたいこと',m.closingDetail,esc):''}</section>
    ${relatedNav}
  </article>`
}
