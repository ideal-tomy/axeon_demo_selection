# 波0 — 厳選版サイトの共通土台

状態：完了（2026-09-22）  
正本：[selection-completion-plan.md](../selection-completion-plan.md)

## やったこと

- `src/data.js` に `SELECTED_IDS` / `SELECTED_FEATURED` を置き、カードは確定9件のみ `listed:true`＋`featuredOrder:1..9`
- 卸（`wholesale-quote`）は名簿に残し `listed:false`（公開URLが付くまで）
- 各件の `relatedIds` を確定名簿内だけに限定
- 「そのほかのデモを見る」・業種タイル・`#v-all`（検索・業種チップ・棚）を厳選版から非表示＋導線切断
- 非掲載・不明の `?demo=` はカード一覧（`v-works`）へ戻す
- `?view=all` もカード一覧へ寄せる

## 戻り先URLの決め方

外部デモ側の戻りバー実装は、各デモの撮影フェーズで足りないものだけ足す。サイト側の正は次のとおり。

| 用途 | URL |
|---|---|
| カード一覧 | `https://axeon-demo-selection.vercel.app/` |
| 該当詳細 | `https://axeon-demo-selection.vercel.app/?demo=<id>` |
| 外部デモへ渡す印 | クエリに `from=axeon-demo-selection`（既存の段取り・卸・各デモと同じ） |

戻り先の優先：

1. 該当詳細（`?demo=<id>`）— 紹介から入ったとき
2. カード一覧（`/`）— 詳細が非掲載・不明、または一覧から広く戻すとき

デモ本体は `from=axeon-demo-selection` を見たとき、上のURLへ「← 紹介へ」などを出す。

## 受け入れ（波0）

- [x] トップカードは確定9件。卸・シフト・案内チャット・協力業者などは出ない
- [x] 「そのほかのデモを見る」「業種で探す」から全件に行けない
- [x] 各詳細の関連が確定名簿内だけ
- [x] 非掲載IDの `?demo=` が一覧に戻る
- [x] 390 / 1440 で一覧と1件の詳細が開ける
- [x] 戻り先の決め方を文書化

やらないこと（波0外）：スクショ撮り直し、紹介文の全面改稿、卸の公開、`ideal_pf`、デモ本体の機能追加。
