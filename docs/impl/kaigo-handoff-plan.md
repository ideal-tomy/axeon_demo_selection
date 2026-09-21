# 介護（kaigo-handoff）実装PLAN

作成日：2026-09-21  
波：2  
対象ID：`kaigo-handoff`  
本体パス：`kaigo_handoff_demo`  
参照：docs/selection-completion-plan.md

## 今回の範囲（1つに絞る。混ぜすぎない）

- [x] 紹介ページ（厳選版を薄型化）
- [x] デモ本体（通し確認と最小修正。`executive-ux-roadmap.md` なし＝UX-0 相当）
- [x] 戻り導線（試作）
- [ ] LP（作らない）
- [ ] カード公開（波0の一覧フィルタ後）

## 3分後に言えること

「隙間メモが報告書の下書きに積もり、面談は会話から経過記録へ、日報は確認でまとまる。要確認の欄は人が直してから提出する。」

## 代表3手

記録の種類として案内する。3手を一続きの処理と表現しない（`featured-demo-design-rollout-plan.md`）。

1. **申し送り** — `/` で 10:00 / 12:30 / 16:45 を録音または入力 → 4名分の下書きが積もる → 田中の投薬欄を修正 → 提出
2. **面談記録** — `/karte` で録音HUDまたは入力 → 経過記録が欄ごとに埋まる → 服薬欄を確認 → 記録
3. **日報** — `/nippo` で確認待ちを開く → 確認 → 日報欄が埋まる（録音で空欄を埋める操作も試せる）

## やること

### Phase A — 厳選版紹介の薄型化（axeon_demo_selection）

- [x] `docs/impl/kaigo-handoff-plan.md` を本ファイルとして作成
- [x] `src/kaigo-handoff-story.js` を追加（社内ボットの `internal-knowledge-story.js` と同型）
- [x] `src/demo-story.js` に `kaigoHandoffModel` と thin 分岐を追加（`thinStoryModel` 共通化）
- [x] CTA は申し送り入口 `/?from=axeon-demo-selection`
- [x] 主CTA は `/` のみ（2・3手はプレビュー画像と説明で案内）
- [x] `data.js` の `relatedIds` を確定10件内に更新
- [x] 体験条件：録音演出・固定入力・架空データ・sessionStorage を短く記載

### Phase B — デモ本体の通し確認と最小修正（kaigo_handoff_demo）

参照：`docs/kaigo_handoff_demo_definition.md` / `docs/kaigo_handoff_requirements.md`

**通し確認（2026-09-21。ローカル dev + 本番 URL 入口）**

- [x] 画面に「サンプル」「デモ」「推奨」がない
- [x] `/` 3枠（入力）→ 田中・投薬欄修正 → 提出
- [x] 提出後 `/nippo` の確認待ちに反映される（`sessionStorage` → `listPending`）
- [x] `/karte` 入力 → 欄の清書 → 確認 → 記録
- [x] `/nippo` 確認 → 日報欄が埋まる（録音は未再確認。入力経路で完走）
- [x] スマートフォン幅（390px）で主要操作が詰まらない
- [x] `npm run build` 成功

**実施した最小修正**

- `hooks/useDemoDate.ts`：日付の空表示フラッシュを解消（`useState(todayLabel)`）
- `MemoApp.tsx` / `KarteApp.tsx`：提出後の「日報」導線を `Link` に変更（クライアント遷移）

**UX 方針**

- `kaigo_handoff_demo` に `docs/executive-ux-roadmap.md` は無い。新規 UX フェーズは作らない
- 機能追加・3ルート拡張・Core/Trial/ROI 接続はしない

### Phase C — 戻り導線・データ更新・公開

- [x] `lib/selectionReturn.ts` / `hooks/useSelectionReturn.ts` で `from=axeon-demo-selection` を sessionStorage に保持
- [x] `AppNav` に「← 紹介へ」（`https://axeon-demo-selection.vercel.app/?demo=kaigo-handoff`）
- [x] 内部リンク（タブ・提出後の日報）でも `from` クエリを維持
- [x] `data.js` の `can` / `planned` と `demo-stories.js` の `limits` を更新
- [ ] デプロイ（Vercel）— 両リポジトリを push 後に反映
- [x] `selection-completion-plan.md` の進捗更新

## 受け入れ（画面で Yes/No）

- [x] 紹介ページに、3手＋CTA＋体験条件以外の長文セクションが無い
- [x] CTA が申し送り（`/`）を別タブで開く
- [x] 関連デモが確定10件内のみ（`voice-karte-simple` / `kaigo-3role` を含まない）
- [x] デモに「サンプル」「デモ」「推奨」表記が無い
- [x] 申し送り：3枠 → 修正 → 提出 → 日報の確認待ちに出る
- [x] 面談：録音または入力 → 記録まで完走できる
- [x] 日報：確認 → 日報欄が埋まる
- [x] カード → 紹介 → デモ → 代表3手完走が通る（相談/ROI は後段でも可）
- [x] 別LPは作っていない
- [x] `ideal_pf` は変更していない

## やらないこと

- 他デモの改修（段取り・施設・製造など）
- `ideal_pf` の変更
- 波0（全カード差し替え）— 介護1本完成後でも可
- 別LP、`voice-karte-simple` / `kaigo-3role` の厳選版掲載
- Core / Trial / ROI 再接続
- 実音声認識・実AI の追加（現行は枠タップ演出＋固定清書が主導線）
- `executive-ux-roadmap.md` の新設と UX-1 以降の大規模ブラッシュアップ

## 完了後

- [x] `selection-completion-plan.md` の進捗表（個別PLAN・流れ完成・波）を更新する
- [x] `demo-improvements.md` の「要確認→提出→一覧」を完了または次アクションに更新する
