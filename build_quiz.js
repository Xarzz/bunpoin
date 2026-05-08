import fs from 'fs';
import { levels as oldLevels } from './src/data.js';

const exportData = { ...oldLevels };

// === 1. Tambah 10 vocab terakhir ===
const lastVocab = {
  title: "Kata Penting Lainnya (Misc)",
  items: [
    { jp: "しゅうまつ", ro: "shuumatsu", id: "Akhir pekan" },
    { jp: "きせつ", ro: "kisetsu", id: "Musim" },
    { jp: "ばしょ", ro: "basho", id: "Tempat" },
    { jp: "ほう", ro: "hou", id: "Arah / Sisi" },
    { jp: "あいだ", ro: "aida", id: "Antara / Selama" },
    { jp: "はじめ", ro: "hajime", id: "Awal / Permulaan" },
    { jp: "おわり", ro: "owari", id: "Akhir" },
    { jp: "つぎ", ro: "tsugi", id: "Berikutnya" },
    { jp: "さいご", ro: "saigo", id: "Terakhir" },
    { jp: "ほかの", ro: "hoka no", id: "Lainnya" }
  ]
};

if (exportData.n5 && exportData.n5.vocabSessions) {
  exportData.n5.vocabSessions.push({
    id: exportData.n5.vocabSessions.length + 1,
    title: lastVocab.title,
    items: lastVocab.items
  });
}

// === 2. Expand Quiz N5 ke 4 sesi (40 soal total) ===
const quizSesi1 = [
  { type: "kanji", q: "「水」の意味は？", opts: ["Api", "Air", "Tanah", "Angin"], ans: 1 },
  { type: "kanji", q: "「大学」の読み方は？", opts: ["だいがく", "おおがく", "たいがく", "だいかく"], ans: 0 },
  { type: "kanji", q: "「車」の読み方は？", opts: ["くるま", "しゃ", "かるま", "くるめ"], ans: 0 },
  { type: "kanji", q: "「先生」の読み方は？", opts: ["せんせい", "せいせん", "さきせい", "せんしょう"], ans: 0 },
  { type: "kanji", q: "「日本」の読み方は？", opts: ["にほん", "ひもと", "にちほん", "ひほん"], ans: 0 },
  { type: "grammar", q: "「わたし＿学生です。」", opts: ["は", "が", "を", "に"], ans: 0 },
  { type: "grammar", q: "「えんぴつ＿書きます。」", opts: ["で", "に", "を", "が"], ans: 0 },
  { type: "grammar", q: "「ここに車を＿ください。」", opts: ["とめて", "やめて", "おいて", "のせて"], ans: 0 },
  { type: "vocab", q: "「おはようございます」の意味は？", opts: ["Selamat siang", "Selamat pagi", "Selamat malam", "Terima kasih"], ans: 1 },
  { type: "vocab", q: "「ありがとう」の意味は？", opts: ["Maaf", "Tolong", "Terima kasih", "Selamat"], ans: 2 }
];

const quizSesi2 = [
  { type: "kanji", q: "「山」の意味は？", opts: ["Sungai", "Gunung", "Hutan", "Laut"], ans: 1 },
  { type: "kanji", q: "「食べる」の意味は？", opts: ["Minum", "Makan", "Tidur", "Berjalan"], ans: 1 },
  { type: "kanji", q: "「学校」の読み方は？", opts: ["がっこう", "がくこう", "かくこう", "がくきょう"], ans: 0 },
  { type: "kanji", q: "「時間」の読み方は？", opts: ["しかん", "ときま", "じかん", "じま"], ans: 2 },
  { type: "grammar", q: "「スーパー＿りんごを買います。」", opts: ["で", "に", "を", "は"], ans: 0 },
  { type: "grammar", q: "「東京＿行きます。」", opts: ["に", "を", "で", "は"], ans: 0 },
  { type: "grammar", q: "「映画を見＿行きます。」", opts: ["に", "で", "を", "て"], ans: 0 },
  { type: "vocab", q: "「すみません」の意味は？", opts: ["Terima kasih", "Selamat tinggal", "Permisi / Maaf", "Tolong"], ans: 2 },
  { type: "vocab", q: "「でんしゃ」の意味は？", opts: ["Bus", "Taksi", "Pesawat", "Kereta"], ans: 3 },
  { type: "vocab", q: "「びょういん」の意味は？", opts: ["Sekolah", "Rumah sakit", "Kantor pos", "Bank"], ans: 1 }
];

const quizSesi3 = [
  { type: "kanji", q: "「雨」の意味は？", opts: ["Salju", "Awan", "Hujan", "Angin"], ans: 2 },
  { type: "kanji", q: "「書く」の意味は？", opts: ["Membaca", "Menulis", "Mendengar", "Berbicara"], ans: 1 },
  { type: "kanji", q: "「電話」の読み方は？", opts: ["でんわ", "でんは", "でんか", "てんわ"], ans: 0 },
  { type: "grammar", q: "「きのうは とても＿。」", opts: ["さむかったです", "さむいでした", "さむいです", "さむくです"], ans: 0 },
  { type: "grammar", q: "「テレビを見＿ごはんを食べます。」", opts: ["ながら", "ために", "ので", "から"], ans: 0 },
  { type: "grammar", q: "「明日、友達＿会います。」", opts: ["に", "を", "で", "が"], ans: 0 },
  { type: "grammar", q: "「日本語を話す＿ができます。」", opts: ["こと", "もの", "ため", "よう"], ans: 0 },
  { type: "vocab", q: "「たべる」の意味は？", opts: ["Minum", "Tidur", "Makan", "Bermain"], ans: 2 },
  { type: "vocab", q: "「さむい」の意味は？", opts: ["Panas", "Dingin", "Hangat", "Sejuk"], ans: 1 },
  { type: "vocab", q: "「はやい」の意味は？", opts: ["Lambat", "Besar", "Cepat", "Kecil"], ans: 2 }
];

const quizSesi4 = [
  { type: "kanji", q: "「花」の意味は？", opts: ["Pohon", "Daun", "Bunga", "Rumput"], ans: 2 },
  { type: "kanji", q: "「白い」の読み方は？", opts: ["あかい", "しろい", "くろい", "あおい"], ans: 1 },
  { type: "kanji", q: "「友達」の読み方は？", opts: ["ともだち", "ゆうたつ", "ゆうだち", "ともたち"], ans: 0 },
  { type: "grammar", q: "「寝る前＿、歯を磨きます。」", opts: ["に", "で", "を", "が"], ans: 0 },
  { type: "grammar", q: "「薬を飲んだ＿がいい。」", opts: ["ほう", "こと", "もの", "よう"], ans: 0 },
  { type: "grammar", q: "「ここで写真を撮っても＿ですか。」", opts: ["いい", "ある", "する", "なる"], ans: 0 },
  { type: "grammar", q: "「宿題をし＿なりません。」", opts: ["なければ", "ないで", "なくて", "ないと"], ans: 0 },
  { type: "vocab", q: "「くるま」の意味は？", opts: ["Sepeda", "Bus", "Mobil", "Kereta"], ans: 2 },
  { type: "vocab", q: "「おいしい」の意味は？", opts: ["Mahal", "Murah", "Enak", "Buruk"], ans: 2 },
  { type: "vocab", q: "「いそがしい」の意味は？", opts: ["Senang", "Sibuk", "Bosan", "Lelah"], ans: 1 }
];

exportData.n5.quiz = [...quizSesi1, ...quizSesi2, ...quizSesi3, ...quizSesi4];

// Save
const output = "export const levels = " + JSON.stringify(exportData, null, 2) + ";\n";
fs.writeFileSync('./src/data.js', output);

const vocabTotal = exportData.n5.vocabSessions.reduce((a,s) => a + s.items.length, 0);
console.log('N5 Final:');
console.log('  Kanji:', exportData.n5.kanji.length);
console.log('  Grammar:', exportData.n5.grammar.length);
console.log('  Vocab:', vocabTotal);
console.log('  Quiz:', exportData.n5.quiz.length, '(4 sesi x 10 soal)');
