/** 介護紹介の原稿。厳選版の薄い紹介ページ用。 */
export const kaigoHandoffStory = {
  eyebrow: '介護・記録',
  title: ['申し送りから、', '日々の記録まで。'],
  intro: ['申し送り・面談・日報。', 'それぞれの記録をまとめ、内容を確認する操作を試せます。'],
  audience: '介護職員と施設管理者',
  cta: '介護記録のデモを開く',
  path: '/?from=axeon-demo-selection',
  meta: [
    ['使う人', '介護職員'],
    ['記録の種類', '3種類'],
    ['内容の確認', '担当者が確認'],
  ],
  steps: [
    {
      title: '申し送り',
      headline: '申し送りを、記録に。',
      caption: '時刻枠を録音または入力。',
      point: '10:00 / 12:30 / 16:45 を積み上げ、投薬欄を確認して提出',
    },
    {
      title: '面談記録',
      headline: '面談の内容を見直す。',
      caption: '録音または入力から経過記録へ。',
      point: '/karte で会話を清書し、要確認欄を直して記録',
    },
    {
      title: '日報',
      headline: '日報にまとめて確認する。',
      caption: '提出物を確認して日報欄へ。',
      point: '/nippo で確認待ちを開き、確認後に日報を見る',
    },
  ],
  conditionSummary: [
    '架空の利用者データで試せます。録音画面では、用意された会話や入力した内容を使い、記録を作る手順を体験できます。',
    '記録はブラウザの sessionStorage に保持されます。再読み込みで消えます。実際の送信は行いません。',
  ],
  related: ['internal-knowledge', 'gym-facility', 'quality-incident'],
}
