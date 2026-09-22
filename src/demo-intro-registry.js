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
}

export function getDemoIntroEmbed(id) {
  return DEMO_INTRO_EMBEDS[id] || null
}
