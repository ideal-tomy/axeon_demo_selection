/** 体育館施設管理紹介の原稿。厳選版の薄い紹介ページ用。 */
export const gymFacilityStory = {
  eyebrow: '指定管理・施設',
  title: ['体育館の利用状況と、', '設備の記録を確認する。'],
  intro: ['施設の利用可否や、設備ごとの記録を確認できます。', '画像を見て、対応が必要か判断する操作も試せます。'],
  audience: '指定管理者と施設担当',
  cta: '施設管理のデモを開く',
  path: '/?from=axeon-demo-selection',
  meta: [
    ['使う人', '指定管理者・施設担当'],
    ['確認する内容', '施設・設備の状況'],
    ['対応の判断', '画像を見て確認'],
  ],
  steps: [
    {
      title: '状況',
      headline: '施設が利用できるか確認する。',
      caption: '件数と要対応バナー。',
      point: '施設の状況で INC を確認し、要対応へ進む',
    },
    {
      title: '設備の記録',
      headline: '設備ごとの点検・対応記録を確認する。',
      caption: '場所・設備の履歴を一続きで。',
      point: '一覧から発電機など設備の記録を見る',
    },
    {
      title: '画像確認',
      headline: '画像を見て、対応が必要か記録する。',
      caption: '判定待ちを記録・やり直し。',
      point: '画像確認で対応が必要／問題なしを試す（デモ内）',
    },
  ],
  conditionSummary: [
    '架空の施設を使い、日時を固定したデモです。',
    '画像の判定はタブ内のみです。リロードで消え、送信・本番保管は行いません。',
  ],
  related: ['construction-record', 'kaigo-handoff', 'internal-knowledge'],
};
