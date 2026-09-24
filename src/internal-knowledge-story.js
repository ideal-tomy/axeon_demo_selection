/** 社内ボット紹介の原稿。厳選版の薄い紹介ページ用。 */
export const internalKnowledgeStory = {
  eyebrow: '社内規程・マニュアル',
  title: ['規程を探す前に、', '聞いてみる。'],
  intro: ['知りたいことを質問すると、', '回答と必要な手続き、根拠となる規程を確認できます。'],
  audience: '総務・人事・DX推進の決裁者と現場社員',
  cta: '規程への質問を試す',
  path: '/?from=axeon-demo-selection',
  meta: [
    ['使う人', '総務・人事'],
    ['体験する作業', '質問と回答の確認'],
    ['回答の根拠', '該当する規程'],
  ],
  steps: [
    {
      title: '質問する',
      headline: '知りたいことを質問する。',
      caption: '先頭の用件チップを1タップ。',
      point: '「午前半休のあと午後在宅できる？」から始める',
    },
    {
      title: '回答を見る',
      headline: '回答と手続きを確認する。',
      caption: '条件付きの結論カードが出る。',
      point: 'ステータス・要点・次の手続きを上から読む',
    },
    {
      title: '根拠を見る',
      headline: '回答の根拠となる規程を確認する。',
      caption: '該当規程の抜粋を開く。',
      point: '勤怠細則・在宅規程の条文と理由を確認する',
    },
  ],
  conditionSummary: [
    '架空の会社の規程を使ったデモです。APIキーを用意せずに、質問・回答・根拠の確認を試せます。',
    '自社文書の追加や接続方法の切り替えは、設定画面で試せます。',
  ],
  related: ['construction-record', 'quality-incident', 'kaigo-handoff'],
}
