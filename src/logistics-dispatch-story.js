/** 運送配車紹介の原稿。建設と共通のツール紹介レイアウト。 */
export const logisticsDispatchStory = {
  eyebrow: '運送・配車',
  title: ['空で戻る車に、', '積める荷物がないか探す。'],
  intro: ['配車状況と帰り荷の候補を確認できます。', '積む荷物は担当者が決めます。'],
  audience: '配車担当と運行管理者',
  cta: '配車のデモを開く',
  path: '/?from=axeon-demo-selection',
  heroImage: '/images/demos/logistics-dispatch/top.png',
  previewTitle: '今日の手配から、帰り荷の選定まで',
  meta: [
    ['使う人', '配車・運行管理'],
    ['体験する作業', '帰り荷の選定'],
    ['荷物の決定', '担当者が判断'],
  ],
  steps: [
    {
      title: '今日の手配',
      headline: '今日の手配を確認',
      subtitle: '受注と配車盤を開き、今日の件数と状況を確認します。',
      caption: '盤と根拠カードまで。',
      point: '今日タブで件数・受注表・盤を確認',
    },
    {
      title: '帰り荷候補',
      headline: '帰り荷の候補を選ぶ',
      subtitle: '載せる／載せないを担当者が決めます。自動配車はしません。',
      caption: '載せる／載せないを選ぶ。',
      point: '配車盤で帰り荷候補を確定する',
    },
    {
      title: '未確認の項目',
      headline: '確認事項を見直す',
      subtitle: '休息時間やFAXなど、人が見る項目を確認します。',
      caption: '休息・FAXは人が見る。',
      point: '今日に戻り、決定と確認の残りを見る',
    },
  ],
  conditionSummary: [
    '架空の依頼と車両を使ったデモです。APIへの接続は不要です。',
    '自動配車や運賃の確定は行いません。',
  ],
  changes: [
    ['依頼と空車の情報が入口ごとに分かれる', '今日の手配と配車盤を同じ画面で確認する'],
    ['帰り荷の候補を電話や表で探す', '候補を見て載せるかどうかを決める'],
    ['休息やFAXの確認が後回しになる', '未確認の項目をまとめて見直す'],
  ],
  conditionTitle: '利用条件・データを使う際の注意',
  conditions: [
    '架空の依頼・車両データを使います。APIキーは不要です。',
    '自動配車や運賃の確定は行いません。積む荷物は担当者が判断します。',
    '実際の送信や業務データのサーバーへの保存は行いません。',
  ],
  closingTitle: '実際に試してみる',
  closing: '架空の配車データで、帰り荷の選定を試せます。',
  related: ['dd-ma', 'construction-record', 'approval-inspection'],
}
