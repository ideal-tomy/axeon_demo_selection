# 詳細ページ完成版・全掲載検証結果

作成日：2026-09-26  
基準：`story-layout-tool-intro`（建設完成版）

## 対象

掲載10件すべて。非掲載は `demoModel()` 回帰（`customer-support` / `shift` で HTML 生成 OK）。

## 検証コマンド

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
node scripts/verify-listed-detail.mjs <demo-id>
```

幅：320 / 390 / 700 / 701 / 768 / 1280

## 結果

| ID | verify | conditions | Hero |
|---|---|---:|---|
| construction-record | PASS | 4 | top.png |
| internal-knowledge | PASS | 4 | top.png |
| approval-inspection | PASS | 4 | top.png（ライブキャプチャ） |
| quality-incident | PASS | 4 | top.png（ライブキャプチャ） |
| logistics-dispatch | PASS | 3 | top.png（ライブキャプチャ） |
| kaigo-handoff | PASS | 4 | top.png（ライブキャプチャ） |
| field-dandori | PASS | 3 | top.png（ライブキャプチャ） |
| gym-facility | PASS | 3 | top.png（ライブキャプチャ） |
| dd-ma | PASS | 3 | top.png（ライブキャプチャ） |
| wholesale-quote | PASS | 3 | top.png（ライブキャプチャ） |

各 ID のスクショ・`verification.json` は `docs/detail-design-rollout/<id>/`。

## 共通確認（全件）

- 6ブロック順：Hero → 3ステップ → 変わること → 体験について → 末尾CTA
- 関連デモ / こんな業務に / 操作手順：なし
- Hero・末尾 CTA の URL は `demoEntryUrl` で一致、`target=_blank` + `noopener`
- 700px以下で Hero 非表示、701px以上で表示
- スマホギャラリーのドット同期
- 利用条件は初期閉じ、クリックで開閉
- `npm run build` 成功
- `favicon.ico` 404 は除外（本番画像の 404 なし）

## 実装メモ

- 共通モデル：`toolIntroStoryModel`（`src/demo-story.js`）
- 建設も同モデルへ統合。`previewTitle` の建設専用 fallback を削除
- 旧 `verify-detail-rollout.mjs` は deprecated（thin 時代の件数前提）
- Hero 取得：`scripts/capture-hero-tops.mjs`

## 残制約

- Hero の top.png は各デモ入口のライブキャプチャ。UI変更時は撮り直し推奨
- 画面紹介（approval-inspection）は画像内ボタン操作不能を conditions で明示
