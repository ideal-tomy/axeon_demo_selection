/** 製造品質インシデント紹介の原稿。厳選版の薄い紹介ページ用。 */
export const qualityIncidentStory = {
  eyebrow: '製造・品質',
  title: ['品質トラブルの対応を、', '画面で追う。'],
  intro: ['発見から原因候補、是正・承認へ。', '架空の事例で対応の流れを試せます。'],
  audience: '品質と製造の担当',
  cta: '対応の流れを体験する',
  path: '/?from=axeon-demo-selection&start=dashboard',
  meta: [
    ['使う人', '品質・製造'],
    ['体験の流れ', '代表3手'],
    ['仕上げ', '是正・承認'],
  ],
  steps: [
    {
      title: '発見',
      headline: '発見した状況を残す。',
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
      headline: '是正と承認へつなぐ。',
      caption: '処置・記録・レポートまで。',
      point: '是正画面で PDF保存・責任者へ提出を試す（デモ内）',
    },
  ],
  conditionSummary: [
    '架空の工場・固定シナリオです。原因は候補の提示であり、自動確定ではありません。',
    'PDF保存は印刷プレビュー、提出はデモ内の通知です。実際の送信・本番保管は行いません。',
  ],
  related: ['approval-inspection', 'internal-knowledge', 'kaigo-handoff'],
}
