/** 受入検査紹介の原稿。厳選版の薄い紹介ページ用。 */
export const approvalInspectionStory = {
  eyebrow: '製造・受入検査',
  title: ['図面と材料証明書を照合して、', '確認・承認まで。'],
  intro: ['照合結果と保留理由、承認記録を確認できます。', 'タブを切り替えて、各画面をご覧ください。'],
  audience: '検査と品質の担当',
  cta: '受入検査の画面を見る',
  path: '/?from=axeon-demo-selection',
  meta: [
    ['使う人', '検査・品質'],
    ['見られる内容', '照合から基準改定'],
    ['形式', '画面紹介'],
  ],
  steps: [
    {
      title: '照合',
      headline: '図面と材料証明書を照合する。',
      caption: '一致・要確認・記載なしを整理。',
      point: '照合タブで差分の3分類を確認',
    },
    {
      title: '保留理由',
      headline: '確認が必要な項目と理由を見る。',
      caption: '材質記号・ロット番号など。',
      point: '保留一覧で判断待ちの理由を見る',
    },
    {
      title: '承認・基準',
      headline: '承認記録と基準改定の画面を見る。',
      caption: '承認記録から基準改定まで。',
      point: '承認タブと基準改定タブを順に見る',
    },
  ],
  conditionSummary: [
    '架空の案件を使った画面紹介です。タブを切り替えて、4つの画面をご覧ください。',
    '画像内のボタンは操作できません。保存や送信は行いません。',
  ],
  related: ['quality-incident', 'construction-record', 'internal-knowledge'],
};
