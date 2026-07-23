/* =========================================================
   ASE-Lab. Project Team — ロスター（実データ, 2026シーズン）
   ---------------------------------------------------------
   member: {
     no:      背番号（表示用の通し番号。実データなし・便宜上の付番）
     name:    氏名（日本語）
     kana:    ふりがな
     nameEn:  ローマ字表記
     unit:    ユニット（プロジェクト上の担当領域）… POSITIONS のキー
     univ:    所属（大学・高専など）
     avatar:  顔写真
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

// avatar は本人写真
const MEMBERS = [
  { no: 1, name: "寺本 遥心", kana: "てらもと ようしん", nameEn: "Yoshin Teramoto", unit: "mechanical",  univ: "筑波大学", avatar: "img/faces/teramoto-2026.jpg" },
  { no: 2, name: "仁禮 和希", kana: "にれい かずき",     nameEn: "Kazuki Nirei",     unit: "electronics", univ: "筑波大学", avatar: "img/faces/nirei-2026.jpg" },
  { no: 3, name: "山口 龍一", kana: "やまぐち りゅういち", nameEn: "Ryuichi Yamaguchi", unit: "software",  univ: "筑波大学", avatar: "img/faces/yamaguchi-2026.jpg" },
  { no: 4, name: "岡田 太志", kana: "おかだ たいし",     nameEn: "Taishi Okada",     unit: "software",    univ: "筑波大学", avatar: "img/faces/okada-2026.jpg" },
];

const STAFF = [
  { role: "総指導",   roleEn: "General Supervisor", name: "阿部 舞哉", nameEn: "Maya Abe",     org: "ASE-Lab.",       avatar: "img/faces/abe-2026.jpg" },
  { role: "レビュアー", roleEn: "Reviewer",          name: "藤田 一槻", nameEn: "Kazuki Fujita", org: "東京理科大学大学院", avatar: "img/faces/fujita-2026.jpg" },
  { role: "レビュアー", roleEn: "Reviewer",          name: "佐藤 伸成", nameEn: "Shinsei Sato",  org: "トヨタ自動車株式会社", avatar: "img/faces/sato-2026.jpg" },
];

// 簡易ヘルパ（members.html から利用）
function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
function initials(name) {
  // 日本語氏名は姓の1文字目を使う
  return String(name).trim().slice(0, 1);
}
