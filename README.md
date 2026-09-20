# ideal_pf_selected
`ideal_pf` から独立して複製した厳選版の作業用プロジェクトです。フェーズ1のため掲載内容と画面は複製元と同じです。

- 複製元：`../ideal_pf`（一覧版として維持）
- このコピーの公開URL・Gitリモート・Vercel連携：未設定
- 次の作業：別プロジェクトへのデプロイ（フェーズ2）。デモ選定はその後
- 複製記録：`docs/phase1-copy-manifest.json`
- 作業結果：`docs/phase1-completion.md`


ideal合同会社の公開デモ紹介ページ（Vite 静的ホスト）。

- トップ: おすすめ大カード 5件
- 全件一覧: 掲載 28件（通常行）
- 紹介: 全画面オーバーレイ（`?demo=<id>` で共有可）
- 外部デモ URL は `src/data.js` の `url` / `linkState` で管理

複製元の本番（このコピーの公開先ではありません）: https://ideal-pf.vercel.app

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
npm run preview
```

## データの直し方

公開用データは [`src/data.js`](src/data.js) のみ。

| フィールド | 意味 |
|---|---|
| `featuredOrder` | トップ大カードの並び（1–5）。なければ一覧のみ |
| `url` | 本番の https URL。未確認は空文字 |
| `linkState` | `available`（開ける）/ `preparing`（紹介のみ） |
| `experienceNote` | CTA 横の注意（固定サンプル・認証など） |
| `can` / `planned` | 今できること / 今後追加すること |

体験リンクを足す例:

```js
url: 'https://example.vercel.app/',
linkState: 'available',
```

内部の改善優先度は [`docs/demo-improvements.md`](docs/demo-improvements.md)。

## URL パラメータ

| 例 | 意味 |
|---|---|
| `/?demo=construction-record` | その紹介を開く |
| `/?view=all` | 全件一覧 |
| `/?view=all&cat=factory` | 製造・設備で絞り込み |
| `/?view=all&q=シフト` | 検索 |

## デプロイ

Vercel（Vite / `dist`）を使用予定。このコピーは未デプロイです。フェーズ2で独立したプロジェクトに接続します。
