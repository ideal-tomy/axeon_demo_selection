# 社内ボット（internal-knowledge）実装PLAN

作成日：2026-09-21  
波：1  
対象ID：`internal-knowledge`  
本体パス：`internal_knowledge_demo`  
参照：docs/selection-completion-plan.md

## 今回の範囲（1つに絞る。混ぜすぎない）

- [x] 紹介ページ（厳選版を薄型化）
- [x] デモ本体（IntroPage の重複説明削除。UX 新フェーズは作らない）
- [x] 戻り導線（試作）
- [ ] LP（作らない）
- [ ] カード公開（波0の一覧フィルタ後）

## 3分後に言えること

「規程に聞くと結論と次の手続きが出て、根拠の条文まで辿れる。ないことは担当者確認になる。」

## 代表3手

1. 起動直後の用件チップ「午前半休のあと午後在宅できる？」を1タップ
2. 結論カード（条件付き＋要点＋手続き）を確認
3. 「根拠を見る」で勤怠細則・在宅規程の該当条文を確認

## やること

### Phase A — 厳選版紹介の薄型化

- `docs/impl/internal-knowledge-plan.md` を本ファイルとして作成
- `src/internal-knowledge-story.js` を追加
- `src/demo-story.js` に薄型レイアウト分岐（ヒーロー＋代表3手＋体験条件＋CTA）
- CTA は `https://internal-knowledge-demo.vercel.app/#demo`
- `data.js` の `relatedIds` を確定10件内に更新

### Phase B — デモLPの重複削除

- `IntroPage.tsx` から `ki-features` を削除し、ヒーローを短くする
- `DemoIntro` アニメは維持
- 未使用の `.ki-features` スタイルを整理

### Phase C — 通し確認・戻り導線・公開

- 代表3手のギャップ確認（最小修正のみ）
- `?from=axeon-demo-selection` とヘッダーの戻りリンク
- デプロイと `selection-completion-plan.md` の進捗更新

## 受け入れ（画面で Yes/No）

- [x] 紹介ページに、3手＋CTA＋体験条件以外の長文セクションが無い
- [x] CTA が `/#demo` を開き、IntroPage を経由せずチャットに入る
- [x] 関連デモが確定10件内のみ
- [x] IntroPage に3手のテキスト説明ブロックが無い
- [x] カード → 紹介 → `/#demo` → 代表3手完走 → ROI（後段）が通る
- [x] 別LPは作っていない
- [x] `ideal_pf` は変更していない

## やらないこと

- 他デモの改修
- ideal_pf の変更
- 波0（全カード差し替え）
- IntroPage アニメの7場面削減
- 新規LP、Intent Tree 増殖、Core 再接続

## 完了後

- [x] selection-completion-plan.md の進捗表（個別PLAN・流れ完成・波）を更新する
