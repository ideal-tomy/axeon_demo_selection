/** 卸紹介の原稿。厳選版の薄い紹介ページ用。カード公開は波0以降。 */
export const wholesaleQuoteStory = {
  eyebrow: '卸・受注',
  title: ['届いた型番から、', '下書きまで。'],
  intro: ['確認結果と返信下書きが並び、', '返す内容は人が決めます。'],
  audience: '卸の営業・受注担当と決裁者',
  cta: '今日の問い合わせから体験する',
  path: '/desk?from=axeon-demo-selection',
  meta: [
    ['使う人', '営業・受注'],
    ['体験の流れ', '代表3手'],
    ['仕上げ', '人が返す'],
  ],
  steps: [
    {
      title: '問い合わせを開く',
      headline: '確認結果と下書きが並ぶ。',
      caption: '在庫確認の1件から。',
      point: '開いた時点で確認結果と返信下書きがある',
    },
    {
      title: '根拠を見る',
      headline: '在庫表の該当行を見る。',
      caption: '数字を突き合わせる。',
      point: '在庫表を開いて数量を確認する',
    },
    {
      title: '人が返す',
      headline: '下書きのまま返すか、直す。',
      caption: '送信はしない。',
      point: '返す内容は担当者が決める',
    },
  ],
  conditionSummary: [
    '架空の電材卸です。APIキーなしで代表3手を完走できます。',
    '自動返信・価格の自動確定・在庫引当はありません。',
  ],
  related: ['logistics-dispatch', 'internal-knowledge', 'approval-inspection'],
};
