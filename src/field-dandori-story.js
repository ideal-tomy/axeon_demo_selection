/** 電気工事の段取り紹介の原稿。厳選版の薄い紹介ページ用。 */
export const fieldDandoriStory = {
  eyebrow: '電気工事・段取り',
  title: ['届いた依頼から、', '申請・人員・書類が並びます。'],
  intro: ['メールやFAXの依頼を開き、根拠を見て確定する。', '申請と人員の準備まで同じ流れで進めます。'],
  audience: '現場監督と手配担当',
  cta: '届いた依頼から見る',
  path: '/?from=axeon-demo-selection',
  meta: [
    ['使う人', '現場・手配'],
    ['体験の流れ', '代表3手'],
    ['仕上げ', '人が確認'],
  ],
  steps: [
    {
      title: '依頼を開く',
      headline: 'メールかFAXの依頼から始める。',
      caption: '渋谷の建柱、または新宿の掘削。',
      point: '今日届いた依頼を開き、現場内容を確認する',
    },
    {
      title: '段取りを確認する',
      headline: '根拠を見て、段取り案を確定する。',
      caption: '要確認を解消し、軽い修正もできる。',
      point: '取り込んだ項目の根拠を確認し、段取り案を確定する',
    },
    {
      title: '準備を進める',
      headline: '申請と人員の準備を進める。',
      caption: '申請書の確認と配置依頼まで。',
      point: '申請・人員のタスクを進め、完了にする（実提出・実配置はしない）',
    },
  ],
  conditionSummary: [
    'サンプル依頼のデモです。所轄・期限・人員は説明用の値です。',
    '実案件の申請適合や、自動での提出・配置依頼は行いません。最終確認は担当者が行います。',
  ],
  related: ['construction-record', 'approval-inspection', 'gym-facility'],
};
