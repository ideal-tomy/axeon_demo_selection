/** 体育館施設管理紹介の原稿。厳選版の薄い紹介ページ用。 */
export const gymFacilityStory = {
  eyebrow: '指定管理・施設',
  title: ['体育館の状態と履歴を、', 'ひとつの視点で。'],
  intro: ['施設の状況からカルテ、画像確認へ。', '指定管理の仕事を画面で追えます。'],
  audience: '指定管理者と施設担当',
  cta: '施設の状況から見る',
  path: '/console?from=axeon-demo-selection',
  meta: [
    ['使う人', '指定管理・施設'],
    ['体験の流れ', '代表3手'],
    ['仕上げ', '画像確認'],
  ],
  steps: [
    {
      title: '状況',
      headline: '今日の利用可否を見渡す。',
      caption: '件数と要対応バナー。',
      point: '施設の状況で INC を確認し、要対応へ進む',
    },
    {
      title: 'カルテ',
      headline: '設備の記録の線を開く。',
      caption: '場所・設備の履歴を一続きで。',
      point: '一覧から発電機など設備の記録を見る',
    },
    {
      title: '判断',
      headline: '画像で対応の要否を残す。',
      caption: '判定待ちを記録・やり直し。',
      point: '画像確認で対応が必要／問題なしを試す（デモ内）',
    },
  ],
  conditionSummary: [
    '架空の指定管理・固定日時のシナリオです。',
    '画像の判定はタブ内のみです。リロードで消え、送信・本番保管は行いません。',
  ],
  related: ['construction-record', 'kaigo-handoff', 'internal-knowledge'],
};
