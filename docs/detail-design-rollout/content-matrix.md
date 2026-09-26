# 詳細ページ完成版・原稿対応表

作成日：2026-09-26  
基準：`construction-record` / 先行済 `internal-knowledge`

| ID | 型 | previewTitle | changes×3 | conditions | heroImage | 特記 |
|---|---|---|---:|---:|---|---|
| construction-record | 操作 | 写真整理から提出後の確認まで | 3 | 4 | top.png 済 | 基準 |
| internal-knowledge | 操作 | 質問から、回答と根拠の確認まで | 3 | 4 | top.png 済 | 先行1・検証済 |
| approval-inspection | 画面紹介 | 照合から、保留理由と承認まで | 3 | 4 | top.png 済 | 画像内ボタン操作不能・4画面→3カード |
| quality-incident | 操作 | 発見から、原因候補と是正まで | 3 | 4 | top.png 済 | 原因は自動確定しない・PDFは印刷プレビュー |
| logistics-dispatch | 操作 | 今日の手配から、帰り荷の選定まで | 3 | 3 | top.png 済 | 自動配車・運賃確定なし |
| kaigo-handoff | 操作 | 申し送りから、面談・日報まで | 3 | 4 | top.png 済 | sessionStorage・録音は演出 |
| field-dandori | 操作 | 依頼確認から、申請と人員準備まで | 3 | 3 | top.png 済 | 実申請・実配置なし |
| gym-facility | 操作 | 利用状況から、設備記録と画像確認まで | 3 | 3 | top.png 済 | 判定はタブ内・リロードで消える |
| dd-ma | 操作 | 企業選択から、試算と比較まで | 3 | 3 | top.png 済 | サンプル試算・APIキー不要 |
| wholesale-quote | 操作 | 問い合わせから、在庫と返信下書きまで | 3 | 3 | top.png 済 | 自動返信・引当なし |

## プレビュー画像（正本）

すべて `src/data.js` の `shots[].image`（01–03）。差し替えは不一致時のみ。

## Hero 方針

各デモの実画面を横長キャプチャし `public/images/demos/<id>/top.png` に配置。取得失敗時は既存 `01.jpg` / `entry.jpg` / `catalog.jpg` からデスクトップ相当の代表画像を採用し、後で差し替え可能とする。
