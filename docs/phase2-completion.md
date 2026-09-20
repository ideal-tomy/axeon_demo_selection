# フェーズ2 完了記録

実施日：2026-09-20

## 結果

新規 Vercel プロジェクト `axeon-demo-selection` を作成し、`axeon_demo_selection` だけを本番デプロイした。既存の `ideal-pf` プロジェクト・公開URLは変更していない。

| 項目 | 値 |
|---|---|
| ローカル | `C:/Users/ryoji/00myapp/ai_demo_workspace/axeon_demo_selection` |
| Vercel プロジェクト | `axeon-demo-selection` |
| 新規公開URL | https://axeon-demo-selection.vercel.app |
| 既存公開URL（維持） | https://ideal-pf.vercel.app |
| GitHub | https://github.com/ideal-tomy/axeon_demo_selection （origin 設定済み。初回 push は CLI 認証待ち） |

## 実施内容

- Vite / `dist` / `vercel.json` の SPA rewrite を確認したうえで本番デプロイ
- Vercel CLI を 59.x へ更新してからデプロイ（旧 41.x ではアップロード不可）
- 既存版・新規版の両方をブラウザ自動確認

## 公開後の確認

| 確認 | 新規版 | 既存版 |
|---|---|---|
| トップカード 5件・掲載 28件 | OK | OK |
| 全件一覧・検索（「シフト」→1件） | OK | OK |
| 詳細（construction-record）・再読み込み | OK | OK |
| 全28件の詳細本文表示 | OK | OK |
| JavaScript 実行エラー | 0件 | 0件 |
| HTTP 200 | OK | OK |

リンク先デモ本体の操作審査は対象外（フェーズ3以降）。

## 残作業

- GitHub への初回 push（`gh auth login` 後に `git push -u origin main`）
- 必要なら `vercel git connect` で Git 連携（任意）
- フェーズ3：厳選する 5〜10件の検討
