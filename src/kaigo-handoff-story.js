/** 介護紹介の原稿。厳選版の薄い紹介ページ用。 */
export const kaigoHandoffStory = {
  eyebrow: '介護・記録',
  title: ['申し送りから、', '日々の記録まで。'],
  intro: ['申し送り・面談・日報。', '記録の種類に合わせて、整理と確認の画面を試せます。'],
  audience: '介護職員と施設管理者',
  cta: '申し送りから体験する',
  path: '/?from=axeon-demo-selection',
  meta: [
    ['使う人', '介護職員'],
    ['体験の流れ', '3つの記録'],
    ['仕上げ', '人が確認'],
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
    '架空の利用者データです。録音は枠タップまたは入力の演出で、固定清書が主導線です。',
    '記録はブラウザの sessionStorage に保持されます。再読み込みで消えます。実際の送信は行いません。',
  ],
  related: ['internal-knowledge', 'gym-facility', 'quality-incident'],
}
