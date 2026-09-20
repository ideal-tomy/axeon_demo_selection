/** 社内ボット紹介の原稿。厳選版の薄い紹介ページ用。 */
export const internalKnowledgeStory = {
  eyebrow: '業種横断・社内ナレッジ',
  title: ['規程を探す前に、', '聞いてみる。'],
  intro: ['社内の用件から質問。', '結論と手続き、根拠の条文を確認できます。'],
  audience: '総務・人事・DX推進の決裁者と現場社員',
  cta: 'チャットで体験する',
  /** 厳選版CTAは IntroPage を経由せずチャットへ直入。戻り導線用クエリ付き */
  path: '/?from=axeon-demo-selection#demo',
  meta: [
    ['使う人', '総務・人事'],
    ['体験の流れ', '代表3手'],
    ['根拠', '条文まで辿れる'],
  ],
  steps: [
    {
      title: '質問する',
      headline: '社内の用件から始める。',
      caption: '先頭の用件チップを1タップ。',
      point: '「午前半休のあと午後在宅できる？」から始める',
    },
    {
      title: '結論を見る',
      headline: '結論と手続きを確認する。',
      caption: '条件付きの結論カードが出る。',
      point: 'ステータス・要点・次の手続きを上から読む',
    },
    {
      title: '根拠を見る',
      headline: '根拠の条文へ戻れる。',
      caption: '該当規程の抜粋を開く。',
      point: '勤怠細則・在宅規程の条文と理由を確認する',
    },
  ],
  conditionSummary: [
    '架空の会社のサンプル規程で試せます。APIキーなしでも代表3手を完走できます。',
    '自社文書の投入や接続モードの切替は、設定から後段で試せます。',
  ],
  related: ['construction-record', 'quality-incident', 'kaigo-handoff'],
}
