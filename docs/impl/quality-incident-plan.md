# 製造（quality-incident）実装PLAN

作成日：2026-09-21  
波：2  
対象ID：`quality-incident`  
本体パス：`axeon_manufacturing02`  
参照：docs/selection-completion-plan.md

## 今回の範囲（1つに絞る。混ぜすぎない）

- [x] 紹介ページ（厳選版を薄型化）
- [x] デモ本体（通し確認と最小修正。`executive-ux-roadmap.md` なし＝UX-0 相当）
- [x] 戻り導線（試作）
- [ ] LP（作らない。完走後に判断）
- [ ] カード公開（波0の一覧フィルタ後）

## 3分後に言えること

「A-214 の表面キズを、ダッシュボードで拾い、原因候補を比べ、是正と承認まで一画面の流れで追える。PDF と提出もデモ内で完結する。」

## 代表3手

1. **発見** — ダッシュボードで優先案件（A-214）を開く → 不具合詳細・AI分析を見る
2. **原因候補** — 原因調査で相関グラフと候補3件を比べ、根拠を確認
3. **是正・承認** — 是正処置・実施記録・承認済みレポートを見る → PDF保存 / 責任者へ提出（簡易実装）

## やること

### Phase B — デモ本体（先に実施）

- [x] サイドバーを4項目に揃え、画面と一致させる
- [x] `?from=axeon-demo-selection&start=dashboard` でダッシュボード直入
- [x] PDF保存（印刷）・責任者へ提出（デモ内トースト）の簡易実装
- [x] 納品UIのデモ表記整理（架空データ表記）
- [x] 通し確認（390 / 1440 smoke 通過）

### Phase A — 厳選版紹介の薄型化

- [x] `src/quality-incident-story.js` 追加
- [x] `demo-story.js` に thin 分岐
- [x] CTA: `/?from=axeon-demo-selection&start=dashboard`
- [x] `relatedIds` を確定10件内に更新

### Phase C — 戻り導線・データ更新・公開

- [x] 「← 紹介へ」リンク（`selectionReturn.js`）
- [x] `data.js` / `demo-stories.js` / `demo-improvements.md` 更新
- [x] `selection-completion-plan.md` 進捗更新
- [ ] Vercel デプロイ（手動または再試行）

## 受け入れ（画面で Yes/No）

- [x] 紹介ページ: 3手 + CTA + 体験条件のみ
- [x] CTA がダッシュボード直入（Hero スキップ）
- [x] 関連デモが確定10件内のみ
- [x] サイドバー4項目と画面が一致
- [x] 代表3手が詰まらず完走
- [x] PDF保存・責任者へ提出がクリック可能でフィードバックあり
- [x] `from=axeon-demo-selection` で「← 紹介へ」表示
- [x] 別LPなし / `AXEON_pf` 未変更

## やらないこと

- `manufacturing-compare` / `cause-demo` / `product-flow-mfg` の厳選版掲載
- `approval-inspection` との同時改修
- Hero intro アニメの削除・大幅短縮
- 新規 LP、Core/Trial/ROI、本番連携PDF基盤
- `executive-ux-roadmap.md` 新設と UX-1 以降
- 他デモ・波0（全カード差し替え）

## 完了後

- [x] `selection-completion-plan.md` の進捗表（個別PLAN・流れ完成・波）を更新する
- [x] `demo-improvements.md` を更新する
