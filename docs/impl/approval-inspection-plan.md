# 受け入れ（approval-inspection）実装PLAN

作成日：2026-09-21  
波：2  
対象ID：`approval-inspection`  
本体パス：`Approval_diagram`  
参照：docs/selection-completion-plan.md

## 今回の範囲（1つに絞る。混ぜすぎない）

- [x] 紹介ページ（厳選版を薄型化）
- [x] デモ本体（通し確認と最小修正。`executive-ux-roadmap.md` なし＝UX-0 相当）
- [x] 戻り導線（試作）
- [ ] LP（作らない。完走後に判断）
- [ ] カード公開（波0の一覧フィルタ後）

## 3分後に言えること

「A-214 の入荷ロットで、図面と材料証明書の照合結果を見て、要確認・記載なしだけが保留に残り、確認根拠付きの承認記録と基準改定まで、4つの実画面をタブで追える。」

## 代表3手

紹介の3手。デモ内ではタブ4枚、紹介では3ステップに圧縮する。

1. **照合** — `screens.html?screen=match`：図面指定と材料証明書を並べ、一致 / 要確認 / 記載なしを確認
2. **保留理由** — `screen=hold`：材質記号・ロット番号など、人が見るべき項目だけが残っていることを確認
3. **承認・基準** — `screen=approval` → `screen=standard`：確認根拠の承認記録と、ロット番号必須化など基準改定まで見る

## やること

### Phase B — デモ本体（先に実施）

- [x] CTA 先を `/screens.html?screen=match&from=axeon-demo-selection` に統一
- [x] `selectionReturn.js` と「← 紹介へ」リンク
- [x] タブ切替時に `from` クエリを維持
- [x] 画面紹介デモ帯（画像内ボタンは操作対象外）
- [x] `app.js` を PNG 表示のみに整理
- [x] `index.html`：Hero CTA・4機能カードを `screens.html` へ接続
- [x] 通し確認（390 / 1440）

### Phase A — 厳選版紹介の薄型化

- [x] `src/approval-inspection-story.js` 追加
- [x] `demo-story.js` に thin 分岐
- [x] CTA: `/screens.html?screen=match&from=axeon-demo-selection`
- [x] `relatedIds` を確定10件内に更新

### Phase C — 戻り導線・データ更新・公開

- [x] `data.js` / `demo-stories.js` / `demo-improvements.md` 更新
- [x] `selection-completion-plan.md` 進捗更新
- [ ] Vercel デプロイ（手動または再試行）

## 受け入れ（画面で Yes/No）

- [x] 紹介ページ: 3手 + CTA + 体験条件のみ
- [x] CTA が `screens.html?screen=match` 直入
- [x] 関連デモが確定10件内のみ
- [x] 4タブが 390 / 1440 で詰まらず完走
- [x] 画面紹介であること・画像内ボタン非操作が明示されている
- [x] `from=axeon-demo-selection` で「← 紹介へ」表示
- [x] 別LPなし / `AXEON_pf` 未変更

## やらないこと

- `demo.html` / `flow.js` の新設（インタラクティブ照合フロー）
- story-mode.html の主役化・8段階の大幅改修
- 確認記録・担当割当・履歴出力の本格実装
- `quality-incident` との同時改修
- 新規 LP、Core/Trial/ROI、`executive-ux-roadmap.md` 新設
- 他デモ・波0（全カード差し替え）

## 完了後

- [x] `selection-completion-plan.md` の進捗表（個別PLAN・流れ完成・波）を更新する
- [x] `demo-improvements.md` を更新する
