# 電気工事の段取り（field-dandori）実装PLAN

作成日：2026-09-22  
波：2  
対象ID：`field-dandori`  
本体パス：`denkigenba_dandori_demo`（Vite + React：`/desk`。legacy HTML あり）  
公開URL：`https://denkigenba-dandori-demo.vercel.app/`  
参照：docs/selection-completion-plan.md

## 今回の範囲（1つに絞る。混ぜすぎない）

- [x] 紹介ページ（厳選版を薄型化）
- [x] デモ本体（通し確認と最小修正。`executive-ux-roadmap.md` なし＝UX-0 相当）
- [x] 戻り導線（試作）
- [x] Phase 1 — Vite 化＋依頼受付（inbox → ingest → result）
- [x] Phase 2 — 抽出・根拠・要確認・修正・確定
- [x] Phase 3 — 確定後の申請・人員準備（execute）
- [ ] LP（作らない。完走後に要否を判断）
- [ ] カード公開（波0の一覧フィルタ後）

## 3分後に言えること

「メールやFAXの依頼を開くと、現場情報が抽出され、根拠を見ながら確認できる。担当者が軽く直して段取り案を確定すると、申請準備と人員配置のタスクが並び、順に進められる。このデモでは実際の提出・配置依頼は行わない。」

## 代表3手

1. **依頼を開く** — メール（渋谷）または FAX（新宿）の依頼を開く
2. **段取りを確認する** — 取り込んだ項目の根拠確認、要確認解消、軽い修正、段取り案を確定
3. **準備を進める** — 申請・人員のタスクを完了にする（実提出・実配置なし）

奈良比較・申請書ドラフト閲覧は脇機能。本編3手に入れない。

## Phase 2/3 実装メモ（2026-09-22）

- フロー：`inbox → ingest → result → execute`
- 抽出パネル + 根拠モーダル（依頼原文／所轄／指定路線／夜間条件／埋設物）
- 要確認：根拠を開く or 編集で解除。「段取り案を確定する」
- execute：申請準備・人員準備のタスクボード。完了状態を inbox pill に反映
- 文言は `docs/lp_/japanese-copy-knowledge.md` に準拠

## やること

### Phase A〜D — 流れ完成（完了）

- [x] 個別PLAN・デモ最小修正・thin 紹介・390/1440 確認

### Phase E — Vite 化と依頼受付（Phase 1）

- [x] Vite + React 化、inbox / ingest / result
- [x] 紹介の代表3手を「依頼を開く」へ更新

### Phase F — 根拠・確定・準備（Phase 2/3）

- [x] ExtractReview / EvidenceModal / ApproveBar / ExecuteView
- [x] DemoStore に planStatus・seenEvidence・taskStates
- [x] field-dandori-story を確認・準備の3手に更新
- [x] Vercel 反映（`denkigenba-dandori-demo.vercel.app`）

## 受け入れ（画面で Yes/No）

- [x] 紹介ページ: 3手 + CTA + 体験条件のみ
- [x] CTA がデモを別タブで開く（`/desk?from=axeon-demo-selection`）
- [x] 関連デモが確定10件内のみ
- [x] inbox → ingest → result（根拠・確定）→ execute まで完走
- [x] 実申請・自動計画と読める文言が無い
- [x] `from=axeon-demo-selection` で「← 紹介へ」表示
- [x] 別LPなし / `AXEON_pf` 未変更

## やらないこと

- `/lp`・`LP-DEFINITION.md`・`LP-PLAN.md` の作成（完走後に要否を出す）
- 実 AI/API、実申請提出、マスタ連携、現場データの大幅拡充
- `executive-ux-roadmap.md` 新設と UX-1 以降
- 他デモ・波0・カード差し替え
- `AXEON_pf` の変更

## 完了後

- [x] `selection-completion-plan.md` の進捗表を更新する
- [x] `field-dandori-story.js` を Phase 2/3 に合わせて更新する
