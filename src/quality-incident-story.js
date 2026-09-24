/** 製造品質インシデント紹介の原稿。厳選版の薄い紹介ページ用。 */
export const qualityIncidentStory = {
  eyebrow: '製造・品質',
  title: ['品質トラブルの原因と、', '是正内容を確認する。'],
  intro: ['不具合の発見から、原因の調査、是正・承認まで。', '架空の事例で、対応の手順を試せます。'],
  audience: '品質と製造の担当',
  cta: '品質管理のデモを開く',
  path: '/?from=axeon-demo-selection',
  meta: [
    ['使う人', '品質・製造'],
    ['体験する作業', '原因調査と是正'],
    ['最後の作業', '是正・承認'],
  ],
  steps: [
    {
      title: '発見',
      headline: '不具合の状況を確認する。',
      caption: '優先案件から不具合詳細へ。',
      point: 'ダッシュボードで A-214 を開き、AI分析を確認',
    },
    {
      title: '原因候補',
      headline: '原因の候補を見比べる。',
      caption: '相関と根拠付きの候補3件。',
      point: '原因調査で候補を比べ、根拠ストリップを見る',
    },
    {
      title: '是正・承認',
      headline: '是正内容と承認の手順を確認する。',
      caption: '処置・記録・レポートまで。',
      point: '是正画面で PDF保存・責任者へ提出を試す（デモ内）',
    },
  ],
  conditionSummary: [
    '架空の工場を使った、用意された事例のデモです。原因候補は表示されますが、原因を自動で確定するものではありません。',
    'PDF保存では印刷プレビューが開きます。提出はデモ内の通知のみで、実際の送信や業務データの保管は行いません。',
  ],
  related: ['approval-inspection', 'internal-knowledge', 'kaigo-handoff'],
}
