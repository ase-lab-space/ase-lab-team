# ASE-Lab. Project Team — 本体サイト合流計画（骨子）

本プレビュー（静的HTML/CSS/JS）を ASE-Lab. 本体（[ase-lab.space](https://ase-lab.space)）へ
合流させるための、URL・保守運用・更新対象の規則をまとめた提案です。

---

## 1. 前提（現状の構成）

| | 本体サイト | 本サイト（Project Team） |
|---|---|---|
| リポジトリ | `ase-lab-space/ase-lab` | ローカル `~/ase-lab-team`（未リポジトリ化） |
| 技術 | Quasar (Vue)・要ビルド | 素の HTML/CSS/JS・ビルド不要 |
| デプロイ | PR → main マージ → 自動デプロイ | ローカルプレビューのみ |
| 更新フロー | ブランチ→PR→レビュー→マージ | — |

---

## 2. 合流ロードマップ（2段階を提案）

### Phase 1 — 独立公開（すぐ実施可・本体への変更は最小）
1. GitHub に `ase-lab-space/ase-lab-team`（Public）を新規作成し、本ディレクトリを push
2. GitHub Pages（main / root）で公開
3. DNS に `team` サブドメインを追加 → **`https://team.ase-lab.space/`**
   - `CNAME` ファイルに `team.ase-lab.space`、DNSで `team` CNAME → `ase-lab-space.github.io`
4. 本体サイトのグローバルナビに「PROJECT TEAM」外部リンクを1つ追加（本体への変更はこのPRのみ）

- 長所: 公開が速い。ビルド不要のまま運用でき、本体のリリースと独立に更新できる
- 短所: リポジトリが分かれる。デザインの共通部品（ヘッダー等）は本体と二重管理

### Phase 2 — 本体へ正式統合（実データ・運用が安定した後）
1. Quasar 側にルート **`/team`**（LP）と **`/team/members`** を追加
   - 本 HTML を `TeamPage.vue` / `TeamMembersPage.vue` に移植
   - `assets/data.js` の `MEMBERS` / `STAFF` / `POSITIONS` は `src/data/team.ts` にそのまま移せる構造
2. ヘッダー／フッターは本体の共通コンポーネントに置換（本サイト独自ヘッダーは廃止）
3. `team.ase-lab.space` → `ase-lab.space/team` へ301リダイレクト（Pages側にリダイレクトページを残す）

- 統合の判断基準（目安）: 実メンバーデータが揃った ／ 更新フローが3ヶ月安定 ／ 本体側の改修リソースが確保できた

### URL 設計（最終形）
```
ase-lab.space/team            … LP（CONCEPT / SEASON / TOPICS / INFORMATION）
ase-lab.space/team/members    … メンバー・スタッフ
（将来）/team/topics           … トピックス一覧
（将来）/team/archive/2026     … 過去シーズンのロスター
```

---

## 3. 保守・更新対象オブジェクト一覧と規則

### 3.1 データ（テキスト）

| 対象 | 置き場所 | 更新頻度 | 規則 |
|---|---|---|---|
| メンバー名簿 `MEMBERS` | `assets/data.js` | シーズン開始時＋随時 | スキーマ固定: `no / name / kana / nameEn / unit / spec / univ / region / grade / captain / avatar`。`unit` は `mechanical / electronics / software` の3値のみ |
| スタッフ `STAFF` | `assets/data.js` | シーズン開始時 | `role / roleEn / name / nameEn / org / avatar` |
| ロール定義 `POSITIONS` | `assets/data.js` | 原則変更しない | 3分類・色は紺→藍→紫の並びを維持 |
| TOPICS記事 | 現状 `index.html` 直書き | 月1〜随時 | `日付(YYYY.MM.DD) / カテゴリ(NEWS・PROJECT・RECRUIT・FIELD) / タイトル(全角40字目安)`。件数が増えたら `data.js` へ移す |
| 統計（人数・校数・地方数） | `index.html` の `.stats` | シーズン開始時 | `MEMBERS` と必ず整合させる |
| シーズン年（2026等） | ヘッダーpill・mv・stats・TOPICS | 年1回 | 下記「シーズン切替チェックリスト」で一括更新 |

### 3.2 画像

| 対象 | ファイル | 縦横比 | 推奨サイズ | 容量目安 | 備考 |
|---|---|---|---|---|---|
| メンバー/スタッフ顔写真 | `img/faces/*.jpg` | **4:5** | 1200×1500px（最低480×600） | ≤300KB | 胸から上の「引き」構図・背景はなるべく統一。命名 `姓ローマ字-西暦.jpg`（例 `sorano-2026.jpg`） |
| LPヒーロー | `img/hero-launch.jpg` | 3:2〜16:9 横 | 幅1600px以上 | ≤400KB | 上に白文字が乗るため、左側が暗め・絵柄が単純な写真 |
| members ページMV | `img/earth-space.jpg` | 同上 | 同上 | ≤400KB | 同上 |
| TOPICSサムネ | `img/*.jpg` | **16:10** | 800×500px以上 | ≤200KB | 記事1件につき1枚 |
| 特集（MEMBERS/STAFF帯） | `img/engineers.jpg` 等 | 4:3〜16:10 | 幅1200px以上 | ≤300KB | |
| チームロゴ | `img/logo.png` | 正方形 | 400px角以上（SVG推奨） | — | ヘッダー・ファビコン共用 |
| パートナーロゴ（将来） | `img/partners/` | 横長 | 高さ120px以上・透過 | ≤50KB | SVG推奨 |

**画像追加時の圧縮**（コマンド例）:
```bash
# 幅1600pxに縮小して最適化（ImageMagick）
magick input.jpg -resize 1600x -quality 82 -strip img/xxx.jpg
```

### 3.3 現在プレースホルダーのもの（公開前に必ず差し替え）

- [ ] 顔写真17枚（現在: AI生成の実在しない人物）→ 本人写真
- [ ] ヒーロー/サムネ等の写真（現在: NASA公開画像）→ 自チームの活動写真
- [ ] メンバー・スタッフの氏名・所属（現在: ダミー）
- [ ] TOPICS記事・PARTNER欄（現在: サンプル）
- [ ] `<meta name="robots" content="noindex">` の削除（両HTML）
- [ ] 画面内の `SAMPLE` / `MOCK` バッジ・注記の削除

---

## 4. 運用体制・フロー（提案）

- **役割**: コンテンツ責任（PT運営1名）＋レビュー（広報 or 運営もう1名）の2名体制
- **更新手順**: ブランチ作成 → `data.js`・画像を編集 → PR → レビュー → マージ
  → 自動デプロイ（Pages: 数分 / 本体統合後: 本体のデプロイに同乗）
- **更新の9割は `data.js` と `img/` の差し替えで完結**する設計のため、HTML/CSSに触るのは
  レイアウト変更時のみ。非エンジニアのメンバーでも名簿更新が可能

### シーズン切替チェックリスト（年1回・キックオフ前）
1. `data.js`: `SEASON` 年、`MEMBERS`／`STAFF` を新シーズンに更新
2. 顔写真を `img/faces/` に追加（旧シーズン分は `archive/` へ退避）
3. `index.html`: ヘッダーpill「YYYY SEASON」・mvの「YYYY SEASON ROSTER」・統計4項目
4. TOPICSに募集開始記事を追加
5. （将来）旧ロスターを `/team/archive/<year>` として保存

---

## 5. 直近のアクション（提案）

1. この骨子の方針確認（Phase 1の可否、`team.ase-lab.space` の使用可否）
2. OKなら: リポジトリ作成 → push → Pages公開 → DNS設定（作業30分程度）
3. 実データ（名簿・写真）の収集開始 — 写真は **4:5・胸上・背景統一** で撮影依頼
4. 本体ナビへのリンク追加PR
