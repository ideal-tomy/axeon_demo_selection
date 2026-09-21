# 運送（logistics-dispatch）実装PLAN

作成日：2026-09-21  
波：3  
対象ID：`logistics-dispatch`  
本体パス：`driver_dash_demo`  
参照：docs/selection-completion-plan.md

## 今回の範囲（1つに絞る。混ぜすぎない）

- [x] 紹介ページ（厳選版を薄型化）
- [x] デモ本体（通し確認と最小修正。`executive-ux-roadmap.md` なし＝UX-0 相当）
- [x] 戻り導線（試作）
- [x] LP（`/lp`。体験 `/board` のあとで読む。図はLP内）
- [ ] カード公開（波0の一覧フィルタ後）

## 3分後に言えること

「依頼が同じ一覧に並び、空で戻る車に帰り荷候補が出る。載せるかは人が決め、決めても休息やFAXの確認は残る。」

## 代表3手

1. **今日の手配** — `/board`：件数・受注表・盤・根拠カードを見る
2. **帰り荷候補** — 配車盤で候補に「載せる／載せない」を選ぶ
3. **人が確定** — 今日タブに戻り、決定が反映。休息・FAX確認は残る

## やること

### Phase B — デモ本体（先に実施）

- [x] CTA 先を `/board?from=axeon-demo-selection` に統一
- [x] `/board` を納品入口化（SVG part1 をスキップして盤へ）
- [x] `src/lib/selectionReturn.ts` と「← 紹介へ」リンク（sessionStorage）
- [x] delivery モードで part3/part4 リンクを非表示
- [x] `vercel.json`（SPA rewrite）
- [x] 通し確認（390 / 1440）
- [x] `npm run build` 成功

### Phase A — 厳選版紹介の薄型化

- [x] `src/logistics-dispatch-story.js` 追加
- [x] `demo-story.js` に thin 分岐
- [x] CTA: `/board?from=axeon-demo-selection`
- [x] `relatedIds` を確定10件内に設定

### Phase C — データ更新・公開

- [x] `data.js` / `demo-stories.js` / `demo-improvements.md` 更新
- [x] `selection-completion-plan.md` 進捗更新
- [x] Vercel デプロイ（`https://driver-dash-demo.vercel.app/`）

### Phase D — LP（2026-09-21、文案作り直し）

- [x] `/` は `/board` へ転送。体験を先に出す
- [x] `/lp` はデモ後の説明。いまの現場・さっきの画面・人が増えたとき・FAQ
- [x] 図（part1/3/4）を LP 内に埋め込む。`/story/*` は `/lp` へ転送
- [x] 決定後「今見た画面の意味を読む」。フッターからも `/lp`
- [x] 厳選版 CTA は `/board` 直入のまま維持

## 受け入れ（画面で Yes/No）

- [x] 紹介ページ: 3手 + CTA + 体験条件のみ
- [x] CTA が `/board` 直入（商談 `/` + 8段SVG を経由しない）
- [x] 関連デモが確定10件内のみ
- [x] 3手が 390 / 1440 で詰まらず完走
- [x] 載せても休息・FAX確認は残る
- [x] `from=axeon-demo-selection` で「← 紹介へ」表示
- [x] `/` は体験へ。説明は `/lp`。体験中に図へ突然飛ばない
- [x] `/lp` に図が埋め込まれ、別画面の図解に出ない
- [ ] カード一括公開なし / `AXEON_pf` 未変更

## やらないこと

- part3/part4 を代表3手に含める（LP・図解ルートで案内）
- DB 連携・自動配車・運賃確定
- ai-demo-core / Trial / ROI 接続
- `executive-ux-roadmap.md` 新設、UX-1 以降
- 卸・段取りの同時着手
- 波0（全カード差し替え）

## 完了後

- [x] `selection-completion-plan.md` の進捗表（個別PLAN・流れ完成・波）を更新する
- [x] `demo-improvements.md` を更新する
