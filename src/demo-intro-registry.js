/**
 * 厳選版詳細に埋め込む紹介アニメ（外部デモ ?embed=intro）。
 * 未登録のデモは intro セクションを出さない。
 */
export const DEMO_INTRO_EMBEDS = {
  'internal-knowledge': {
    src: 'https://internal-knowledge-demo.vercel.app/?embed=intro&from=axeon-demo-selection',
    title: '社内ナレッジAIの使い方',
    height: 540,
  },
  'quality-incident': {
    src: 'https://axeonmanufacturing02.vercel.app/?embed=intro&from=axeon-demo-selection',
    title: '品質インシデント対応の使い方',
    height: 560,
  },
  'construction-record': {
    src: 'https://construction-demo-six.vercel.app/?embed=intro&from=axeon-demo-selection',
    title: '現場写真から報告書までの使い方',
    height: 440,
  },
  'kaigo-handoff': {
    src: 'https://kaigo-handoff-demo.vercel.app/?embed=intro&from=axeon-demo-selection',
    title: '申し送り・面談・日報の使い方',
    height: 540,
  },
  'logistics-dispatch': {
    src: 'https://driver-dash-demo.vercel.app/?embed=intro&from=axeon-demo-selection',
    title: '配車と帰り荷候補の使い方',
    height: 540,
  },
  'wholesale-quote': {
    src: 'https://wholesale-quote-demo-lovat.vercel.app/?embed=intro&from=axeon-demo-selection',
    title: '型番問い合わせから返信下書きまでの使い方',
    height: 540,
  },
  'approval-inspection': {
    src: 'https://approval-diagram.vercel.app/?embed=intro&from=axeon-demo-selection',
    title: '受入検査の照合と承認の使い方',
    height: 540,
  },
  'gym-facility': {
    src: 'https://disaster-prevention-demo02.vercel.app/?embed=intro&from=axeon-demo-selection',
    title: '総合体育館の施設管理の使い方',
    height: 540,
  },
  'field-dandori': {
    src: 'https://denkigenba-dandori-demo.vercel.app/?embed=intro&from=axeon-demo-selection',
    title: '現場の段取り案の使い方',
    height: 540,
  },
  'dd-ma': {
    src: 'https://dd-demo-red.vercel.app/?embed=intro&from=axeon-demo-selection',
    title: 'DDからEXIT試算までの使い方',
    height: 540,
  },
}

export function getDemoIntroEmbed(id) {
  return DEMO_INTRO_EMBEDS[id] || null
}
