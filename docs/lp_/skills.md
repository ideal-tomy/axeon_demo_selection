---
name: demo-lp-workflow
description: Build or revise a landing page for an existing interactive demo by first inspecting the real demo, defining the LP requirements, planning screenshot-based sections, implementing them, and validating the result in a browser.
---

# Demo LP Workflow

既存のツール・業務デモを紹介するLPを制作するときに使用する。

このSkillの目的は、
「文章からLPを作る」のではなく、
「実際のデモを理解し、その体験をLPとして伝える」こと。

---

# 基本原則

LP制作は必ず以下の順序で行う。

1. Demo Inspection
2. LP Definition
3. LP Plan
4. Screenshot Capture
5. Implementation
6. Browser Validation
7. Completion

工程を飛ばしてはならない。

---

# SOURCE OF TRUTH

## LP-DEFINITION.md

「何を作るか」を定義する。

以下についての唯一の基準とする。

- 想定利用者
- 業務上の課題
- デモで体験できること
- 実装済み機能
- 導入メリット
- LPで伝える内容
- LPのゴール
- CTA
- デモへの導線

LP-DEFINITION.md に存在しない機能やメリットを
勝手に追加してはならない。

---

## LP-PLAN.md

「どのようにLPとして表現するか」を定義する。

以下を記録する。

- セクション構成
- 各セクションの目的
- 使用するデモ画面
- スクリーンショット
- スクリーンショット取得条件
- 見出し
- 説明内容
- CTA
- PCレイアウト
- スマホレイアウト
- 実装対象
- 検証条件

---

# PHASE 1 — DEMO INSPECTION

最初に既存デモを調査する。

コードだけで判断してはいけない。

可能な場合は必ずデモを起動し、
ブラウザで実際に操作する。

確認するもの：

- トップ画面
- 主要画面
- 主要操作
- 画面遷移
- 入力
- 出力
- 状態変化
- エラー状態
- 完了状態
- デモ内の導線
- LPへ利用できる画面

この工程では原則として実装変更を行わない。

まず既存デモを理解する。

ブラウザを利用できない場合は、
利用できないことを明示する。

ブラウザを確認していない状態で
「確認済み」としてはいけない。

---

# PHASE 2 — LP DEFINITION

既存の LP-DEFINITION.md がある場合は読み込む。

ない場合はテンプレートから作成する。

デモ調査結果から判断できる内容は埋める。

事業上の判断が必要な内容だけ、
ユーザーに確認する。

特に以下を確定する。

- 誰向けのデモか
- 現在どんな業務をしているか
- 何が問題なのか
- デモによって何を体験できるか
- 何が変わるのか
- LPを読んだ人に何をしてほしいか

Definition確定前にLP実装へ進んではならない。

---

# PHASE 3 — LP PLAN

LP-DEFINITION.md をもとに
LP-PLAN.md を作成する。

各LPセクションには必ず目的を設定する。

各スクリーンショットには以下を記載する。

- Screenshot ID
- 対象URL / Route
- 対象画面
- 必要な状態
- そこへ到達する操作
- PC / Mobile
- 推奨比率
- LP上で伝える意味
- 見出し案
- 説明内容
- 配置場所

例：

Screenshot: SS-03

Route:
/inspection/pending

State:
要確認が2件表示されている状態

Purpose:
AIが自動で最終判断せず、
人が確認すべき項目だけを残すことを伝える。

LP Message:
判断が必要なものだけを、人に残す。

---

# PHASE 4 — SCREENSHOT CAPTURE

LP-PLAN.md で指定された画面を
実際のデモから取得する。

原則として実デモのスクリーンショットを使用する。

実画面が存在する場合、
代わりに架空UIや生成画像を作ってはいけない。

必要に応じて、

public/lp/screenshots/

などへ保存する。

---

# PHASE 5 — IMPLEMENTATION

LP-DEFINITION.md と LP-PLAN.md を基準に実装する。

勝手に以下を変更してはいけない。

- LPの目的
- 対象ユーザー
- デモの機能
- メリット
- ストーリー
- スクリーンショットの意味

レイアウト上の小さな調整は可能。

意味や構成を変える必要が出た場合は、
PLANへ戻る。

---

# PHASE 6 — BROWSER VALIDATION

実装後は必ずブラウザで確認する。

最低限以下を確認する。

Desktop:
- レイアウト
- スクロール
- スクリーンショット
- CTA
- LP → Demo
- Demo → LP

Mobile:
- レイアウト
- 文字サイズ
- 画像
- CTA
- ナビゲーション

Interaction:
- Link
- Button
- Form
- Keyboard
- Focus

Technical:
- Console Error
- Broken Link
- Failed Request
- Layout Shift

問題があれば、

修正
↓
ブラウザ再確認

を行う。

---

# COMPLETION RULE

以下を満たすまで完了としてはいけない。

- LP-DEFINITION.md と一致している
- LP-PLAN.md と一致している
- 指定スクリーンショットを使用している
- PC確認済み
- スマホ確認済み
- LP → Demo が動作する
- Demo → LP の導線がある
- CTAが動作する
- consoleに重大エラーがない

ブラウザ検証を実行していない場合、
完成とは報告しない。