/** 受入検査紹介の原稿。厳選版の薄い紹介ページ用。 */
export const approvalInspectionStory = {
  eyebrow: '製造・受入検査',
  title: ['照合の結果を、', '承認につなぐ。'],
  intro: ['図面と証明書の照合・保留・承認。', '実画面をタブで追えます。'],
  audience: '検査と品質の担当',
  cta: '照合画面から見る',
  path: '/screens.html?screen=match&from=axeon-demo-selection',
  meta: [
    ['使う人', '検査・品質'],
    ['体験の流れ', '代表3手'],
    ['形式', '画面紹介'],
  ],
  steps: [
    {
      title: '照合',
      headline: '図面と証明書を並べる。',
      caption: '一致・要確認・記載なしを整理。',
      point: '照合タブで差分の3分類を確認',
    },
    {
      title: '保留理由',
      headline: '人が見る項目だけ残す。',
      caption: '材質記号・ロット番号など。',
      point: '保留一覧で判断待ちの理由を見る',
    },
    {
      title: '承認・基準',
      headline: '根拠を残し、基準へ戻す。',
      caption: '承認記録から基準改定まで。',
      point: '承認タブと基準改定タブを順に見る',
    },
  ],
  conditionSummary: [
    '架空の案件・固定シナリオです。タブ切替で4画面をご覧ください。',
    '画像内の確認記録・割当・履歴出力などは操作対象外です。保存・送信は行いません。',
  ],
  related: ['quality-incident', 'construction-record', 'internal-knowledge'],
};
