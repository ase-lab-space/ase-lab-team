# 引き継ぎメモ — 公開に向けた作業計画（作業完了後は削除してOK）

最終更新: 2026-07-20

このファイルは `~/ase-lab-team`（ASE-Lab. Project Team 紹介サイト）を
本公開まで進めるための作業計画です。恒久ドキュメントは `README.md` /
`INTEGRATION.md` を参照してください。このファイルは引き継ぎ用の
一時メモなので、全フェーズ完了後は削除して構いません。

## 現状（2026-07-20 時点）

- コードは完成度高い。素のHTML/CSS/JS、ビルド不要
- **Gitリポジトリ未作成**（このメモを書いた直後に `git init` 予定/実施）
- 実データ未投入：メンバー13名・スタッフ5名は全員ダミー、顔写真17枚もAI生成の非実在人物
- サイト内写真（`hero-launch.jpg` 等）はNASA公開画像のプレースホルダー
- `index.html` / `members.html` に `<meta name="robots" content="noindex">` と
  `SAMPLE` / `MOCK` 表記が残っている（公開ブロッカー）
- `img/logo.png` は実ロゴに差し替え済み
- GitHub Pages・CNAME・DNS設定は未着手

## フェーズ計画

### Phase 0｜Git化・リポジトリ準備（技術側・すぐ着手可能）
- [ ] `git init` / `.gitignore`（`.faces_orig/` など作業用の元画像を除外）
- [ ] 初回コミット
- [ ] GitHub に `ase-lab-space/ase-lab-team`（Public）を新規作成しpush
- [ ] GitHub Pages 有効化（Settings → Pages: `main` / root）
- → `https://ase-lab-space.github.io/ase-lab-team/` で内部確認できる状態にする
  （`noindex` が付いているので検索エンジンには出ない）

### Phase 1｜実データ収集・差し替え（律速。チーム側の作業待ち）
- [ ] メンバー・スタッフの実名簿を `assets/data.js` の `MEMBERS`（13名分）/
      `STAFF`（5名分）に反映（配列の構造はそのまま流用）
- [ ] 顔写真の撮影・収集：**4:5比率・胸から上・背景統一**、
      `img/faces/` に本人写真として配置（命名規則は `README.md` 参照）
- [ ] サイト内写真の差し替え：`img/hero-launch.jpg` 等 → 自チームの活動写真
      （現状ファイルに近いサイズ・比率で用意すると差し替えが楽）
- [ ] TOPICS記事・PARTNER欄のサンプルを実際の内容に差し替え（`index.html` 直書き）

### Phase 2｜公開直前チェック（機械的作業・数分）
- [ ] `index.html` / `members.html` の `<meta name="robots" content="noindex">` を削除
- [ ] `mock-flag`（SAMPLE/MOCK表記）と関連の注記文言を削除
- [ ] 統計値（人数・校数・地方数）が実データと一致しているか確認

### Phase 3｜独立公開
- [ ] `CNAME` ファイルを追加し `team.ase-lab.space` を記載
- [ ] DNS側で `team` CNAME → `ase-lab-space.github.io` を設定
- [ ] 本体サイト（`ase-lab.space`）のグローバルナビに
      「PROJECT TEAM」外部リンクを追加するPRを1本出す

### Phase 4｜本体への正式統合（将来・任意）
実データ・運用が3ヶ月ほど安定してから検討でよい。詳細は `INTEGRATION.md` 参照
（Quasar側に `/team`, `/team/members` ルートを追加する統合案）。

## 引き継ぎ時の注意
- 更新の9割は `assets/data.js` と `img/` の差し替えで完結する設計。
  非エンジニアのメンバーでも名簿更新が可能
- ロールは `mechanical` / `electronics` / `software` の3値固定
- ローカル確認: `cd ~/ase-lab-team && python3 -m http.server 8000`
