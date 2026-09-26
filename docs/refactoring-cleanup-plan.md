# リファクタリング計画：不要ファイルの整理

確認日：2026-09-26  
対象：画面確認用スクリーンショット、過去の参考Markdown、生成済み監査資料

## この計画の範囲

今回はファイルを削除せず、削除候補と保留理由を整理した。候補の削除前に、現在進行中の建設ページ作業を完了し、参照先と複製記録への影響を再確認する。

## 確認結果

- `docs/` 配下は682件がGit管理下にあり、画像553件、Markdown 52件を含む。
- `docs/detail-rollout/` は約8.4MB。そのうち `screens/` の126枚（約6.0MB）は、画面幅・ページ単位の検証画像で、`scripts/verify-detail-rollout.mjs` から再生成できる。
- `docs/text-audit/verification-2026-09-25/layout-after/` は画像190枚（約7.9MB）と監査JSON等29件。画面確認の繰り返しで生成された画像群で、`layout-after.mjs` から再取得できる。
- 同じ監査フォルダの `mobile/` と `pc/` には合計188枚（約8.8MB）の画像がある。そのうち160枚（約5.1MB）は部分キャプチャで、各ページの `audit.json` と28枚の `viewport.png` が別にある。
- `docs/phase1-copy-manifest.json` は276件の複製記録を持つが、現時点で5件の記録先が存在しない。これ以上の削除前に、元の複製記録として維持するか、後続整理の記録を別途残すか決める必要がある。
- 作業ツリーでは建設ページ関連のスクリプト・ソースが変更中で、`docs/construction-lower-mobile-390.png`、`docs/construction-lower-pc-1280.png`、`scripts/capture-construction-lower.mjs` が未追跡で存在する。これらを含む現在の建設作業ファイルは削除対象から除外する。

## 第一候補：現行画面で置き換わった検証画像

次の画像はサイトに配信される素材ではなく、古い画面状態の検証出力である。監査JSON・生成スクリプトと、必要な代表画像を残してから削除する候補とする。

| 削除候補 | 件数・規模 | 削除条件・残すもの |
|---|---:|---|
| `docs/detail-rollout/screens/*.jpg` | 126枚、約6.0MB | 最新の詳細ページ確認を終えてから削除。`detail-rollout-tracker.md`、`source-audit.json`、`navigation-audit.json`、`verification.json`、再生成スクリプトは残す。 |
| `docs/text-audit/verification-2026-09-25/layout-after/**/*.png` | 190枚、約7.9MB | 後続の画面確認を終えてから削除。`all.json`、各ページの `audit.json`、`layout-after.mjs` は残す。最近の建設プレビュー画像は別途保持する。 |
| `docs/text-audit/verification-2026-09-25/mobile/**/panel-*.png`、`pc/**/panel-*.png` | 160枚、約5.1MB | ページごとの監査JSONと28枚の `viewport.png` を残し、部分キャプチャだけを削除する候補。 |

## 第二候補：移動済みの参考Markdown

| 削除候補 | 現状 | 削除前の作業 |
|---|---|---|
| `docs/lp_/driver_dash_lp_text_revision_knowledge.md` | 内容は「移動しました」という案内で、正本は `docs/lp_/japanese-copy-knowledge.md`。 | `docs/impl/kaigo-handoff-plan.md` と正本内に旧ファイルへの参照がある。参照を書き換え、複製manifestへの影響を記録してから削除する。 |
| `docs/construction-redesign.md` | 2026-09-13の建設ページ再構成記録。 | 現在の建設ページ検証スクリプトが同じ成果物群を扱い、複製manifestにも記載がある。進行中作業が完了するまで保留。削除より、履歴資料として残す案も再検討する。 |

## 保留：削除しないファイル群

- `docs/construction-lower-mobile-390.png`、`docs/construction-lower-pc-1280.png`、`scripts/capture-construction-lower.mjs` と、現在変更中の建設関連ソース・スクリプト。進行中の確認対象。
- `docs/text-audit/verification-2026-09-25/construction-preview-mobile/`。直近の建設デモ3カードの確認画像と計測結果。
- `docs/text-audit/日本語表現の修正案.md`、`日本語修正の反映結果.md`、各ページの監査Markdown。修正内容と根拠を示す資料。
- `docs/phase1-verification/` の画像。`phase1-completion.md` が検証記録として参照している。
- `docs/catalog-review/` の画像とJSON、および `docs/` 直下の複製時スクリーンショット。複製manifestに記録されているため、削除すると複製履歴の整合性が崩れる。
- `docs/impl/` の実装計画・設計メモ、選定・公開の方針資料。完了状況と未確認事項を整理するまでは削除しない。
- `docs/detail-rollout/` の監査JSONとトラッカー、`docs/text-audit/` のMarkdown・監査JSON・生成スクリプト。
- `public/images/demos/` の画像。画面確認用キャプチャではなく、サイトから参照される実素材。

## 複製manifestの不整合

削除計画を実行する前に、manifestが指す5件の欠落を整理する。現在の欠落は次のとおり。

- `docs/all-detail-pages-rollout-plan.md`
- `docs/construction-page-copy.md`
- `docs/construction-page-verification.md`
- `docs/demo-copy-review-2026-09-12.md`
- `docs/テキスト削除リスト.md`

欠落ファイルを復元するのか、複製当時の記録としてmanifestに欠落理由を残すのかを決める。manifestは複製時の基準記録なので、既存行を黙って書き換えない。

## 実行順

1. 現在の建設ページ作業を完了し、変更中のファイルと生成画像の役割を確定する。
2. 複製manifestの5件の欠落を確認し、複製時の記録と後続削除の記録を分けて扱う。
3. `detail-rollout/screens/` と `text-audit/.../layout-after/` の画像を候補に、監査JSON・再生成手順・代表スクリーンショットの保持先を決める。
4. 移動済みMarkdownの参照先を更新し、削除候補を一件ずつGit差分で確認する。
5. 削除後に `npm run build`、検証スクリプト、Git状態、READMEとMarkdownリンクを確認する。

## 削除実施の判断

利用者の依頼に基づき、第一候補の古い部分キャプチャ476枚を削除した。内訳は `docs/detail-rollout/screens/` のJPGが126枚、`layout-after/` のPNGが190枚、`mobile/` と `pc/` の `panel-*.png` が合計160枚。削除後、各監査JSON、検証スクリプト、28枚の `viewport.png`、建設プレビュー画像、現在進行中の建設作業ファイルが残っていることを確認した。

複製manifestは複製時点の履歴として変更していない。第二候補の移動済みMarkdownと `docs/construction-redesign.md` は、参照先の更新や建設作業との関係整理が必要なため今回は削除していない。
