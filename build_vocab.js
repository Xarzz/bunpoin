import fs from 'fs';
import { levels as oldLevels } from './src/data.js';

const vocabData = [
  {
    title: "Perkenalan (Introduction)",
    items: [
      { jp: "わたし", ro: "watashi", id: "Saya" },
      { jp: "あなた", ro: "anata", id: "Anda / Kamu" },
      { jp: "なまえ", ro: "namae", id: "Nama" },
      { jp: "くに", ro: "kuni", id: "Negara" },
      { jp: "にほん", ro: "nihon", id: "Jepang" },
      { jp: "インドネシア", ro: "indoneshia", id: "Indonesia" },
      { jp: "がくせい", ro: "gakusei", id: "Siswa / Mahasiswa" },
      { jp: "せんせい", ro: "sensei", id: "Guru / Dosen" },
      { jp: "かいしゃいん", ro: "kaishain", id: "Pegawai Perusahaan" },
      { jp: "ともだち", ro: "tomodachi", id: "Teman" }
    ]
  },
  {
    title: "Keluarga (Family)",
    items: [
      { jp: "かぞく", ro: "kazoku", id: "Keluarga" },
      { jp: "りょうしん", ro: "ryoushin", id: "Orang Tua" },
      { jp: "ちち", ro: "chichi", id: "Ayah (Sendiri)" },
      { jp: "はは", ro: "haha", id: "Ibu (Sendiri)" },
      { jp: "おとうさん", ro: "otousan", id: "Ayah (Orang Lain)" },
      { jp: "おかあさん", ro: "okaasan", id: "Ibu (Orang Lain)" },
      { jp: "あに", ro: "ani", id: "Kakak Laki-laki" },
      { jp: "あね", ro: "ane", id: "Kakak Perempuan" },
      { jp: "おとうと", ro: "otouto", id: "Adik Laki-laki" },
      { jp: "いもうと", ro: "imouto", id: "Adik Perempuan" }
    ]
  },
  {
    title: "Kamar Tidur (Bedroom)",
    items: [
      { jp: "ベッド", ro: "beddo", id: "Tempat Tidur / Kasur" },
      { jp: "ふとん", ro: "futon", id: "Kasur Lipat Jepang" },
      { jp: "まくら", ro: "makura", id: "Bantal" },
      { jp: "もうふ", ro: "moufu", id: "Selimut" },
      { jp: "クローゼット", ro: "kuro-zetto", id: "Lemari Pakaian" },
      { jp: "エアコン", ro: "eakon", id: "AC (Pendingin Ruangan)" },
      { jp: "ランプ", ro: "ranpu", id: "Lampu" },
      { jp: "とけい", ro: "tokei", id: "Jam" },
      { jp: "めざましどけい", ro: "mezamashidokei", id: "Jam Beker" },
      { jp: "パジャマ", ro: "pajama", id: "Piyama / Baju Tidur" }
    ]
  },
  {
    title: "Dapur (Kitchen)",
    items: [
      { jp: "だいどころ", ro: "daidokoro", id: "Dapur" },
      { jp: "れいぞうこ", ro: "reizouko", id: "Kulkas" },
      { jp: "でんしレンジ", ro: "denshirenji", id: "Microwave" },
      { jp: "ほうちょう", ro: "houchou", id: "Pisau Dapur" },
      { jp: "おさら", ro: "osara", id: "Piring" },
      { jp: "コップ", ro: "koppu", id: "Gelas" },
      { jp: "はし", ro: "hashi", id: "Sumpit" },
      { jp: "スプーン", ro: "supu-n", id: "Sendok" },
      { jp: "フォーク", ro: "fo-ku", id: "Garpu" },
      { jp: "なべ", ro: "nabe", id: "Panci" }
    ]
  },
  {
    title: "Ruang Tamu (Living Room)",
    items: [
      { jp: "いま", ro: "ima", id: "Ruang Tamu" },
      { jp: "ソファ", ro: "sofa", id: "Sofa" },
      { jp: "いす", ro: "isu", id: "Kursi" },
      { jp: "つくえ", ro: "tsukue", id: "Meja" },
      { jp: "テレビ", ro: "terebi", id: "Televisi" },
      { jp: "まど", ro: "mado", id: "Jendela" },
      { jp: "ドア", ro: "doa", id: "Pintu" },
      { jp: "かべ", ro: "kabe", id: "Dinding" },
      { jp: "ゆか", ro: "yuka", id: "Lantai" },
      { jp: "しゃしん", ro: "shashin", id: "Foto / Gambar" }
    ]
  },
  {
    title: "Luar Rumah (Outside)",
    items: [
      { jp: "にわ", ro: "niwa", id: "Taman (di rumah)" },
      { jp: "こうえん", ro: "kouen", id: "Taman Umum" },
      { jp: "き", ro: "ki", id: "Pohon" },
      { jp: "はな", ro: "hana", id: "Bunga" },
      { jp: "いぬ", ro: "inu", id: "Anjing" },
      { jp: "ねこ", ro: "neko", id: "Kucing" },
      { jp: "とり", ro: "tori", id: "Burung" },
      { jp: "そら", ro: "sora", id: "Langit" },
      { jp: "やま", ro: "yama", id: "Gunung" },
      { jp: "かわ", ro: "kawa", id: "Sungai" }
    ]
  },
  {
    title: "Sekolah (School)",
    items: [
      { jp: "がっこう", ro: "gakkou", id: "Sekolah" },
      { jp: "きょうしつ", ro: "kyoushitsu", id: "Ruang Kelas" },
      { jp: "ほん", ro: "hon", id: "Buku" },
      { jp: "じしょ", ro: "jisho", id: "Kamus" },
      { jp: "ノート", ro: "no-to", id: "Buku Catatan" },
      { jp: "えんぴつ", ro: "enpitsu", id: "Pensil" },
      { jp: "ボールペン", ro: "bo-rupen", id: "Pulpen" },
      { jp: "けしゴム", ro: "keshigomu", id: "Penghapus" },
      { jp: "かばん", ro: "kaban", id: "Tas" },
      { jp: "しゅくだい", ro: "shukudai", id: "PR / Pekerjaan Rumah" }
    ]
  },
  {
    title: "Kamar Mandi / Toilet (Bathroom)",
    items: [
      { jp: "トイレ", ro: "toire", id: "Toilet" },
      { jp: "おてあらい", ro: "otearai", id: "Kamar Kecil (Sopan)" },
      { jp: "おふろ", ro: "ofuro", id: "Kamar Mandi / Bak Mandi" },
      { jp: "シャワー", ro: "shawa-", id: "Shower" },
      { jp: "せっけん", ro: "sekken", id: "Sabun" },
      { jp: "シャンプー", ro: "shanpu-", id: "Sampo" },
      { jp: "タオル", ro: "taoru", id: "Handuk" },
      { jp: "かがみ", ro: "kagami", id: "Cermin" },
      { jp: "はみがき", ro: "hamigaki", id: "Sikat Gigi / Pasta Gigi" },
      { jp: "みず", ro: "mizu", id: "Air" }
    ]
  }
];

const exportData = {
  ...oldLevels
};

// Insert into N5
if (exportData.n5) {
  exportData.n5.vocabSessions = vocabData.map((session, index) => ({
    id: index + 1,
    title: session.title,
    items: session.items
  }));
}

const output = "export const levels = " + JSON.stringify(exportData, null, 2) + ";\n";
fs.writeFileSync('d:/DATAATAR/portofolio/jlpt/src/data.js', output);
console.log('Successfully added Vocabulary Sessions to N5');
