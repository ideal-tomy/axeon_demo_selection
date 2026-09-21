# DD（dd-ma）実装PLAN

作成日：2026-09-21  
波：3  
対象ID：`dd-ma`  
本体パス：`dd_demo`  
参照：docs/selection-completion-plan.md

## 今回の範囲（1つに絞る。混ぜすぎない）

- [x] 紹介ページ（厳選版を薄型化）
- [x] デモ本体（通し確認と最小修正。`executive-ux-roadmap.md` なし＝UX-0 相当）
- [x] 戻り導線（試作）
- [ ] LP（作らない。完走後に要否を判断）
- [ ] カード公開（波0の一覧フィルタ後）

## 3分後に言えること

「サンプル企業で DD 後の EXIT 試算を見て、主軸を変えると簿外処置と株式価値が連動して変わる。AI が代行した時間が積算され、最後に人間への問いが返る。」

## 代表3手

1. **企業選択** — `/ai`：5社から選び、EXIT/KPI・簿外・ギャップを見る
2. **主軸切替** — 3タブ（システム効率化 / 不採算整理 / 戦略見直し）で処置方針と株式価値の連動を確認
3. **問いと時間** — 「あなたへの問い」と返した時間の内訳を見る

## やること

### Phase B — デモ本体（先に実施）

- [x] CTA 先を `/ai?from=axeon-demo-selection` に統一
- [x] `src/lib/selectionReturn.ts` と「← 紹介へ」リンク（sessionStorage）
- [x] selection 入口時の ExperienceModeBar リード文短縮
- [x] 通し確認（390 / 1440）
- [x] `npm run build` 成功

### Phase A — 厳選版紹介の薄型化

- [x] `src/dd-ma-story.js` 追加
- [x] `demo-story.js` に thin 分岐
- [x] CTA: `/ai?from=axeon-demo-selection`
- [x] `relatedIds` を確定10件内に設定

### Phase C — データ更新・公開

- [x] `data.js` / `demo-stories.js` / `demo-improvements.md` 更新
- [x] `selection-completion-plan.md` 進捗更新
- [x] Vercel デプロイ（`https://dd-demo-red.vercel.app/`）

## 受け入れ（画面で Yes/No）

- [x] 紹介ページ: 3手 + CTA + 体験条件のみ
- [x] CTA が `/ai` 直入（Vanilla `/` を経由しない）
- [x] 関連デモが確定10件内のみ
- [x] 3手が 390 / 1440 で詰まらず完走（サンプルモード）
- [x] `from=axeon-demo-selection` で「← 紹介へ」表示
- [x] 別LPなし / `AXEON_pf` 未変更 / カード一括公開なし

## やらないこと

- Vanilla `/` ストーリーデモの改修・主役化
- 自社入力・ライブ層（給与×勤怠）を代表3手に含める
- 全面 UI リデザイン・成果物 DL
- `executive-ux-roadmap.md` 新設、UX-1 以降
- 運送・段取り・卸の同時着手
- 波0（全カード差し替え）
- DD 専用 LP の新設

## 完了後

- [x] `selection-completion-plan.md` の進捗表（個別PLAN・流れ完成・波）を更新する
- [x] `demo-improvements.md` を更新する
