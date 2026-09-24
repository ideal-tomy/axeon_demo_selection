/**
 * 厳選版詳細に埋め込む紹介アニメ（外部デモ ?embed=intro&view=stage）。
 * 未登録のデモは intro セクションを出さない。
 */
export const DEMO_INTRO_EMBEDS = {
  'internal-knowledge': {
    src: 'https://internal-knowledge-demo.vercel.app/?embed=intro&view=stage&from=axeon-demo-selection',
    title: '社内ナレッジAIの使い方',
    height: 420,
  },
  'quality-incident': {
    src: 'https://axeonmanufacturing02.vercel.app/?embed=intro&view=stage&from=axeon-demo-selection',
    title: '品質インシデント対応の使い方',
    height: 440,
  },
  'construction-record': {
    src: 'https://construction-demo-six.vercel.app/?embed=intro&view=stage&from=axeon-demo-selection',
    title: '現場写真から報告書までの使い方',
    height: 428,
  },
  'kaigo-handoff': {
    src: 'https://kaigo-handoff-demo.vercel.app/?embed=intro&view=stage&from=axeon-demo-selection',
    title: '申し送り・面談・日報の使い方',
    height: 420,
  },
  'logistics-dispatch': {
    src: 'https://driver-dash-demo.vercel.app/?embed=intro&view=stage&from=axeon-demo-selection',
    title: '配車と帰り荷候補の使い方',
    height: 420,
  },
  'wholesale-quote': {
    src: 'https://wholesale-quote-demo-lovat.vercel.app/?embed=intro&view=stage&from=axeon-demo-selection',
    title: '型番問い合わせから返信下書きまでの使い方',
    height: 420,
  },
  'approval-inspection': {
    src: 'https://approval-diagram.vercel.app/?embed=intro&view=stage&from=axeon-demo-selection',
    title: '受入検査の照合と承認の使い方',
    height: 420,
  },
  'gym-facility': {
    src: 'https://disaster-prevention-demo02.vercel.app/?embed=intro&view=stage&from=axeon-demo-selection',
    title: '総合体育館の施設管理の使い方',
    height: 420,
  },
  'field-dandori': {
    src: 'https://denkigenba-dandori-demo.vercel.app/?embed=intro&view=stage&from=axeon-demo-selection',
    title: '現場の段取り案の使い方',
    height: 420,
  },
  'dd-ma': {
    src: 'https://dd-demo-red.vercel.app/?embed=intro&view=stage&from=axeon-demo-selection',
    title: 'DDからEXIT試算までの使い方',
    height: 420,
  },
}

/**
 * 開発時だけ ?intro=local で、起動中の各デモへ iframe を向ける。
 * 厳選版の 5173 と重ならないポート。未起動のデモは接続できない表示になる。
 */
const LOCAL_INTRO_ORIGIN = {
  'internal-knowledge': 'http://127.0.0.1:5175',
  'quality-incident': 'http://127.0.0.1:5176',
  'construction-record': 'http://127.0.0.1:3010',
  'kaigo-handoff': 'http://127.0.0.1:3011',
  'logistics-dispatch': 'http://127.0.0.1:5177',
  'wholesale-quote': 'http://127.0.0.1:5178',
  'approval-inspection': 'http://127.0.0.1:5179',
  'gym-facility': 'http://127.0.0.1:3012',
  'field-dandori': 'http://127.0.0.1:5180',
  'dd-ma': 'http://127.0.0.1:5181',
}

/** 初回読込時の ?intro=local を保持（syncUrl が他パラメータを差し替えても残す） */
let localIntroLatched = null

function wantsLocalIntro() {
  if (typeof window === 'undefined') return false
  const pageHost = window.location.hostname
  if (pageHost !== 'localhost' && pageHost !== '127.0.0.1') return false
  if (!import.meta.env?.DEV) return false
  if (localIntroLatched === null) {
    localIntroLatched = new URLSearchParams(window.location.search).get('intro') === 'local'
  }
  return localIntroLatched || new URLSearchParams(window.location.search).get('intro') === 'local'
}

function resolveIntroSrc(id, src) {
  if (!wantsLocalIntro()) return src
  const localOrigin = LOCAL_INTRO_ORIGIN[id]
  if (!localOrigin) return src
  try {
    const u = new URL(src)
    const base = new URL(localOrigin)
    u.protocol = base.protocol
    u.host = base.host
    return u.toString()
  } catch {
    return src
  }
}

export function getDemoIntroEmbed(id) {
  const emb = DEMO_INTRO_EMBEDS[id]
  if (!emb) return null
  const src = resolveIntroSrc(id, emb.src)
  return src === emb.src ? emb : { ...emb, src }
}
