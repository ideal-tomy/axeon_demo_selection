/** 卸紹介の原稿。厳選版の薄い紹介ページ用。カード公開は波0以降。 */
export const wholesaleQuoteStory = {
  eyebrow: '卸・受注',
  title: ['型番の問い合わせを確認し、', '返信の下書きを見直す。'],
  intro: ['在庫などの確認結果と、返信の下書きを見られます。', '在庫表と照らし合わせ、担当者が返信内容を決めます。'],
  audience: '卸の営業・受注担当と決裁者',
  cta: '問い合わせ対応のデモを開く',
  path: '/?from=axeon-demo-selection',
  meta: [
    ['使う人', '営業・受注担当'],
    ['体験する作業', '在庫確認と返信'],
    ['返信内容', '担当者が確認'],
  ],
  steps: [
    {
      title: '問い合わせを開く',
      headline: '在庫の確認結果と返信下書きを見る。',
      caption: '在庫確認の1件から。',
      point: '開いた時点で確認結果と返信下書きがある',
    },
    {
      title: '在庫表を確認する',
      headline: '在庫表の該当行を見る。',
      caption: '数字を突き合わせる。',
      point: '在庫表を開いて数量を確認する',
    },
    {
      title: '返信内容を決める',
      headline: '下書きのまま返すか、直す。',
      caption: '送信はしない。',
      point: '返す内容は担当者が決める',
    },
  ],
  conditionSummary: [
    '架空の電材卸の問い合わせで、在庫確認と返信下書きの確認を試せます。APIキーは不要です。',
    '実際の返信や価格の自動確定、在庫引当は行いません。',
  ],
  related: ['logistics-dispatch', 'internal-knowledge', 'approval-inspection'],
};
