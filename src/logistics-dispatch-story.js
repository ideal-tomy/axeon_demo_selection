/** 運送配車紹介の原稿。厳選版の薄い紹介ページ用。 */
export const logisticsDispatchStory = {
  eyebrow: '運送・配車',
  title: ['空で戻る車に、', '積める荷物がないか探す。'],
  intro: ['配車状況と帰り荷の候補を確認できます。', '積む荷物は担当者が決めます。'],
  audience: '配車担当と運行管理者',
  cta: '配車のデモを開く',
  path: '/?from=axeon-demo-selection',
  meta: [
    ['使う人', '配車・運行管理'],
    ['体験する作業', '帰り荷の選定'],
    ['荷物の決定', '担当者が判断'],
  ],
  steps: [
    {
      title: '今日の手配',
      headline: '今日の受注と配車状況を確認する。',
      caption: '盤と根拠カードまで。',
      point: '今日タブで件数・受注表・盤を確認',
    },
    {
      title: '帰り荷候補',
      headline: '帰り荷の候補から、積む荷物を選ぶ。',
      caption: '載せる／載せないを選ぶ。',
      point: '配車盤で帰り荷候補を確定する',
    },
    {
      title: '未確認の項目',
      headline: '配車後に必要な確認事項を見る。',
      caption: '休息・FAXは人が見る。',
      point: '今日に戻り、決定と確認の残りを見る',
    },
  ],
  conditionSummary: [
    '架空の依頼と車両を使ったデモです。APIへの接続は不要です。自動配車や運賃の確定は行いません。',
    '実際の送信や業務データの保管は行いません。業務の仕組みを説明する図も、別に用意しています。',
  ],
  related: ['dd-ma', 'construction-record', 'approval-inspection'],
};
