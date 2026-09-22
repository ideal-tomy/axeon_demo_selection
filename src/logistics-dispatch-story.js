/** 運送配車紹介の原稿。厳選版の薄い紹介ページ用。 */
export const logisticsDispatchStory = {
  eyebrow: '運送・配車',
  title: ['空で戻る車に、', '隣の荷物を候補として。'],
  intro: ['依頼が同じ一覧に並び、', '載せるかは人が決めます。'],
  audience: '配車担当と運行管理者',
  cta: '今日の配車から体験する',
  path: '/?from=axeon-demo-selection',
  meta: [
    ['使う人', '配車・運行'],
    ['体験の流れ', '代表3手'],
    ['仕上げ', '人が確定'],
  ],
  steps: [
    {
      title: '今日の手配',
      headline: '件数と受注を見渡す。',
      caption: '盤と根拠カードまで。',
      point: '今日タブで件数・受注表・盤を確認',
    },
    {
      title: '帰り荷候補',
      headline: '空の車に候補が出る。',
      caption: '載せる／載せないを選ぶ。',
      point: '配車盤で帰り荷候補を確定する',
    },
    {
      title: '人が確定',
      headline: '決めても確認は残る。',
      caption: '休息・FAXは人が見る。',
      point: '今日に戻り、決定と確認の残りを見る',
    },
  ],
  conditionSummary: [
    '架空の fixtures・API 不要です。自動配車・運賃確定はありません。',
    '提出・本番保管は行いません。商談用の図解フローは代表3手の範囲外です。',
  ],
  related: ['dd-ma', 'construction-record', 'approval-inspection'],
};
