# ASE-Lab. Project Team（プレビュー）

全国各地の学生が集い、シーズンを決めて宇宙・航空分野の**実践知**に挑む“日本代表”のような
プロジェクトチームの紹介サイトです。ビルド不要の静的サイト（HTML/CSS/JS のみ）。

- `index.html` … ランディングページ（メインビジュアル / クイックリンク / CONCEPT / TOPICS / 特集 / SEASON / INFORMATION / PARTNERS）
- `members.html` … メンバー・スタッフ紹介。メンバーカードは **JVA の `m-playerList` に準拠**（暗色地の横型カード＝写真左＋データ右、赤い背番号＋ロール／氏名／ローマ字＋所属）。**ロール別フィルタ**付き
- `assets/style.css` … 共通スタイル。**フラット設計**（並ぶカード等は角丸・影・浮きを付けない）
  - **グラデーション**: `#052C73` → `#301274` の青・紫2色（赤 `#e60027` はアクセント限定）
  - **ワードマーク**: 「ASE-Lab.」は Teko Medium（本体サイトのロゴ書体を踏襲）
  - **フォントルール**: 基本=Noto Sans JP(400) ／ 強調=Semibold(600) ／ 見出し相当のみ Bold(700)
- `assets/data.js` … **ロスターのサンプルデータ**（氏名等はすべてダミー。ここを差し替えるだけで実データ化できます）
  - メンバーの **ロールは メカニカル / エレクトロニクス / ソフトウェア の3分類**（`unit`）。`spec` にロール内の専門を記載
- `img/logo.png` … チームロゴ（CANSAT ITOYOSHI エンブレム）
- `img/*.jpg` … 航空宇宙のプレースホルダー写真（**NASA 公開画像**。ヒーロー／特集／TOPICS サムネ用）
- `img/faces/p01〜p17.jpg` … 顔写真プレースホルダー（**AI生成の実在しない人物**・アジア系。メンバー=学生／スタッフ=社会人。透かしなし）

> デザインは日本バレーボール協会サイトのレイアウト（巨大な英字メインビジュアル、mv 下に重なる
> クイックリンク、TOPICS 横スライダー、英大見出し＋日本語サブの titleSet、交互カラーバンド）を
> 忠実に参考にしつつ、配色は中心を紺／青→紫、赤は日の丸アクセントに限定して独自化しています。

> **プレースホルダー画像について**: ヒーロー等の写真は NASA 公開画像、顔写真はポートレートの
> ダミーです（体裁確認用）。公開時にはすべて自チームの画像へ差し替える前提です。

## ローカルでプレビュー

```bash
cd ~/ase-lab-team
python3 -m http.server 8000
# → http://localhost:8000/           （ランディング）
# → http://localhost:8000/members.html（メンバー・スタッフ）
```

## 実データへの差し替え

- **メンバー／スタッフ**: `assets/data.js` の `MEMBERS` / `STAFF` 配列を編集（構造は据え置き）。
  顔写真は各要素の `avatar: "img/faces/xxx.jpg"` を自チームの画像パスに差し替えるだけです。
- **サイト内の写真**: `img/` 配下（`hero-launch.jpg` 等）を同名で置き換えれば全ページに反映されます。
  ヒーロー等は `index.html` / `members.html` の `.mv-media > img` と各所の `<img src>` を編集。
- 公開時は各 HTML の `<meta name="robots" content="noindex">` と、画面内の `SAMPLE`/`MOCK` 表記を外してください。

## ASE-Lab. 本体サイトへの統合案

現状は独立プレビュー。OK が出たら本体（[ase-lab.space](https://ase-lab.space) / Quasar 製）へ統合します。
段階案：

1. **まず独立公開（すぐ共有したい場合）**
   `ase-lab-campus` と同様に GitHub Pages で公開。
   - 新規リポジトリ `ase-lab-space/ase-lab-team`（Public）を作成し push → Settings → Pages（main / root）
   - 公開URL: `https://ase-lab-space.github.io/ase-lab-team/`
   - 独自ドメイン案: **`team.ase-lab.space`**（`CNAME` に記載 → DNS で `team` を `ase-lab-space.github.io` へ）

2. **本体へ正式統合（推奨の最終形）**
   本体サイトのグローバルナビに「PROJECT TEAM」を追加し、配下に置く。
   - URL 案: **`https://ase-lab.space/team`**（トップ）/ **`/team/members`**（メンバー・スタッフ）
   - Quasar(Vue) 側へ移植する場合は、本 HTML を `TeamPage.vue` / `TeamMembersPage.vue` に分解し、
     `MEMBERS`/`STAFF` は `data.js` の内容をそのまま JSON/TS 定数として移せます。
   - デザイントークン（紺→紫＋赤アクセント）は本体の紫→緑と親和。ヘッダー/フッターは本体共通部品に置換。

> 統合タイミングは「メンバー・スタッフの実データが揃い、URL/ドメインの合意が取れた段階」を推奨。
> それまでは本プレビュー（または上記1の限定共有）で体裁を固めるのが安全です。

## 注意
- `<meta name="robots" content="noindex">` を入れています（プレビュー段階のため）。本公開時に外してください。
- 掲載情報はすべてサンプル（ダミー）です。
