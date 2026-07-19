/* =========================================================
   ASE-Lab. Project Team — ロスター（サンプル / ダミーデータ）
   ---------------------------------------------------------
   ここに載せている氏名・所属・経歴はすべて体裁確認用のダミーです。
   本公開時は実メンバーの情報に差し替えてください（構造はそのまま）。

   member: {
     no:      背番号（表示用の通し番号）
     name:    氏名（日本語）
     kana:    ふりがな
     nameEn:  ローマ字表記
     unit:    ユニット（プロジェクト上の担当領域）… POSITIONS のキー
     univ:    所属（大学・高専など）
     region:  地方（フィルタ用）
     grade:   学年
     captain: "captain" | "vice" | null
     bio:     ひとことプロフィール
     joined:  参加シーズン
   }
   ========================================================= */

const SEASON = "2026";

// ロール（担当領域を メカニカル / エレクトロニクス / ソフトウェア の3分類に集約）
// ロール色は 紺→藍→紫（ブランドのグラデーションに沿った並び）
const POSITIONS = {
  mechanical:  { label: "メカニカル",       en: "Mechanical",  color: "#12204b" },
  electronics: { label: "エレクトロニクス", en: "Electronics", color: "#2b3f9e" },
  software:    { label: "ソフトウェア",     en: "Software",    color: "#4e1ebd" },
};

// ロール表示順（フィルタ・並び用）
const ROLE_ORDER = ["mechanical", "electronics", "software"];

// 地方（メタ表示用）
const REGIONS = ["北海道・東北", "関東", "中部", "近畿", "中国・四国", "九州・沖縄"];

// avatar はプレースホルダーのポートレート写真（公開時に本人写真へ差し替え）
// unit = ロール(3分類) / spec = ロール内の専門
const MEMBERS = [
  { no: 1,  name: "空野 遥",   kana: "そらの はるか", nameEn: "Haruka Sorano",  unit: "mechanical",  spec: "構造・機構",   univ: "筑波大学",       region: "関東",         grade: "M1", captain: "captain", avatar: "img/faces/p01.jpg",
    bio: "チーム全体をまとめるキャプテン。機体構造と組立を担当する。" },
  { no: 4,  name: "星 陽向",   kana: "ほし ひなた",   nameEn: "Hinata Hoshi",   unit: "software",    spec: "制御・GNC",    univ: "東京大学",       region: "関東",         grade: "M2", captain: "vice", avatar: "img/faces/p02.jpg",
    bio: "誘導制御アルゴリズムとシミュレーション環境の内製化を進める。" },
  { no: 7,  name: "白鳥 蓮",   kana: "しらとり れん", nameEn: "Ren Shiratori",  unit: "software",    spec: "システム統合", univ: "東京科学大学",   region: "関東",         grade: "B4", captain: null, avatar: "img/faces/p03.jpg",
    bio: "各機能を束ねるソフトのアーキテクチャ設計と統合試験を担当。" },
  { no: 9,  name: "月岡 咲",   kana: "つきおか さき", nameEn: "Saki Tsukioka",  unit: "electronics", spec: "姿勢制御・センサ", univ: "名古屋大学",  region: "中部",         grade: "M1", captain: null, avatar: "img/faces/p04.jpg",
    bio: "姿勢センサと駆動回路を設計。計測と実装の両輪で動く。" },
  { no: 11, name: "火野 大地", kana: "ひの だいち",   nameEn: "Daichi Hino",    unit: "mechanical",  spec: "推進系",       univ: "九州大学",       region: "九州・沖縄",   grade: "M2", captain: null, avatar: "img/faces/p05.jpg",
    bio: "推進系の要素試験を主導。安全設計とスケジュール管理に強い。" },
  { no: 14, name: "岩瀬 巧",   kana: "いわせ たくみ", nameEn: "Takumi Iwase",   unit: "mechanical",  spec: "構造・熱",     univ: "東北大学",       region: "北海道・東北", grade: "B4", captain: null, avatar: "img/faces/p06.jpg",
    bio: "構造・熱設計を担当。CADと解析を往復しながら軽量化を突き詰める。" },
  { no: 16, name: "波多 実咲", kana: "はた みさき",   nameEn: "Misaki Hata",    unit: "electronics", spec: "通信・地上局", univ: "北海道大学",     region: "北海道・東北", grade: "M1", captain: null, avatar: "img/faces/p07.jpg",
    bio: "通信リンク設計と地上局の運用を担当。電波と運用の橋渡し役。" },
  { no: 18, name: "空閑 涼",   kana: "くが りょう",   nameEn: "Ryo Kuga",       unit: "software",    spec: "搭載ソフト",   univ: "京都大学",       region: "近畿",         grade: "M1", captain: null, avatar: "img/faces/p08.jpg",
    bio: "搭載ソフトのフライトコードを設計。テスト自動化に注力する。" },
  { no: 21, name: "森澤 結",   kana: "もりさわ ゆい", nameEn: "Yui Morisawa",   unit: "software",    spec: "データ・AI",   univ: "大阪大学",       region: "近畿",         grade: "M2", captain: null, avatar: "img/faces/p09.jpg",
    bio: "取得データの処理パイプラインとAI解析、可視化を担当する。" },
  { no: 23, name: "海老名 匠", kana: "えびな しょう", nameEn: "Sho Ebina",      unit: "mechanical",  spec: "機構・搭載",   univ: "広島大学",       region: "中国・四国",   grade: "B4", captain: null, avatar: "img/faces/p10.jpg",
    bio: "分離機構と搭載機器のレイアウトを担当。手を動かして検証する。" },
  { no: 25, name: "南風原 澪", kana: "はえばる みお", nameEn: "Mio Haebaru",    unit: "electronics", spec: "電源・ハーネス", univ: "琉球大学",     region: "九州・沖縄",   grade: "M1", captain: null, avatar: "img/faces/p11.jpg",
    bio: "電源系とハーネスの設計を担当。現場での配線・試験にも強い。" },
  { no: 28, name: "衣笠 奏",   kana: "きぬがさ かなで",nameEn: "Kanade Kinugasa",unit: "electronics", spec: "計測・回路",   univ: "慶應義塾大学",   region: "関東",         grade: "M1", captain: null, avatar: "img/faces/p12.jpg",
    bio: "計測回路と基板設計を担当。データで意思決定を後押しする。" },
];

const STAFF = [
  { role: "監督 / ディレクター", roleEn: "Director",             name: "宇佐美 誠", nameEn: "Makoto Usami",    org: "ASE-Lab. 運営",       avatar: "img/faces/p13.jpg",
    bio: "チームの方針とシーズン設計を統括。産学の橋渡しと外部連携を担う。" },
  { role: "テクニカルディレクター", roleEn: "Technical Director", name: "北条 玲子", nameEn: "Reiko Hojo",     org: "宇宙工学・研究者",     avatar: "img/faces/p14.jpg",
    bio: "技術面の総責任者。設計レビューを主導し、各ユニットの品質を担保する。" },
  { role: "コーチ / メンター",   roleEn: "Coach & Mentor",       name: "多岐川 修", nameEn: "Osamu Takigawa",  org: "衛星開発エンジニア",   avatar: "img/faces/p15.jpg",
    bio: "システムズと運用のメンタリングを担当。現場の実践知を丁寧に伝える。" },
  { role: "コーチ / メンター",   roleEn: "Coach & Mentor",       name: "早乙女 遥", nameEn: "Haruka Saotome",  org: "データサイエンティスト", avatar: "img/faces/p16.jpg",
    bio: "データ・AI領域のメンター。解析設計とキャリア相談の両面で伴走する。" },
  { role: "チームマネージャー",  roleEn: "Team Manager",         name: "神谷 一花", nameEn: "Ichika Kamiya",   org: "ASE-Lab. 運営",       avatar: "img/faces/p17.jpg",
    bio: "合宿・遠征・広報など活動運営の要。メンバーが挑戦に集中できる環境を作る。" },
];

// 簡易ヘルパ（members.html から利用）
function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
function initials(name) {
  // 日本語氏名は姓の1文字目を使う
  return String(name).trim().slice(0, 1);
}
