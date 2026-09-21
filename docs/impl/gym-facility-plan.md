# 施設管理（gym-facility）実装PLAN

作成日：2026-09-21  
波：2  
対象ID：`gym-facility`  
本体パス：`disaster_prevention_demo02`  
参照：docs/selection-completion-plan.md

## 今回の範囲（1つに絞る。混ぜすぎない）

- [x] 紹介ページ（厳選版を薄型化）
- [x] デモ本体（通し確認と最小修正。`executive-ux-roadmap.md` なし＝UX-0 相当）
- [x] 戻り導線（試作）
- [ ] LP（作らない。完走後に判断）
- [ ] カード公開（波0の一覧フィルタ後）

## 3分後に言えること

「翠嶺市総合体育館で、今日の利用可否と要対応を見渡し、設備の記録の線（カルテ）を開き、画像確認で対応の要否を残せる。」

## 代表3手

1. **状況** — `/console`：件数と要対応バナー（INC-20260912-007）を見る
2. **カルテ** — `/console/facilities`：場所を開き、設備の記録の線を見る（例：非常用発電機 K-G3）
3. **判断** — `/console/review`：判定待ちの画像で「対応が必要」または「問題なし」を記録する

## やること

### Phase B — デモ本体（先に実施）

- [x] CTA 先を `/console?from=axeon-demo-selection` に統一
- [x] `lib/selectionReturn.ts` と「← 紹介へ」リンク（sessionStorage）
- [x] 画像確認の「判断をやり直す」
- [x] 納品UIの日時表記整理
- [x] 通し確認（390 / 1440）

### Phase A — 厳選版紹介の薄型化

- [x] `src/gym-facility-story.js` 追加
- [x] `demo-story.js` に thin 分岐
- [x] CTA: `/console?from=axeon-demo-selection`
- [x] `relatedIds` を確定10件内に更新

### Phase C — 戻り導線・データ更新・公開

- [x] `data.js` / `demo-stories.js` / `demo-improvements.md` 更新
- [x] `selection-completion-plan.md` 進捗更新
- [ ] Vercel デプロイ（手動または再試行）

## 受け入れ（画面で Yes/No）

- [x] 紹介ページ: 3手 + CTA + 体験条件のみ
- [x] CTA が `/console` 直入
- [x] 関連デモが確定10件内のみ（`disaster-facility` なし）
- [x] 3手が 390 / 1440 で詰まらず完走
- [x] 画像確認の判定とやり直しができる
- [x] `from=axeon-demo-selection` で「← 紹介へ」表示
- [x] 別LPなし / `AXEON_pf` 未変更

## やらないこと

- `disaster-facility` の改修・厳選版掲載
- ナビ7項目の削減、AIアシスタントの主役化
- 判定の永続保存・市版連携
- `executive-ux-roadmap.md` 新設、UX-1 以降
- 段取り（`field-dandori`）の同時着手
- 他デモ・波0（全カード差し替え）

## 完了後

- [x] `selection-completion-plan.md` の進捗表（個別PLAN・流れ完成・波）を更新する
- [x] `demo-improvements.md` を更新する
