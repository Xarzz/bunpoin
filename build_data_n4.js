import fs from 'fs';
import { levels as oldLevels } from './src/data.js';
import { vocabN4 } from './vocab_n4.js';

const n4KanjiStr = `
会:カイ:あ.う:Bertemu
同:ドウ:おな.じ:Sama
事:ジ:こと:Hal / Urusan
自:ジ:みずか.ら:Sendiri
社:シャ:やしろ:Perusahaan / Kuil
者:シャ:もの:Orang
地:チ:-:Tanah / Bumi
業:ギョウ:わざ:Bisnis / Industri
方:ホウ:かた:Arah / Orang
場:ジョウ:ば:Tempat
員:イン:-:Anggota / Pegawai
立:リツ:た.つ:Berdiri
開:カイ:あ.く:Buka
手:シュ:て:Tangan
力:リョク:ちから:Kekuatan
問:モン:と.う:Pertanyaan
代:ダイ:か.わる:Menggantikan / Era
明:メイ:あか.るい:Terang / Jelas
動:ドウ:うご.く:Bergerak
京:キョウ:みやこ:Ibukota
通:ツウ:とお.る:Melewati / Lulus
言:ゲン:い.う:Berbicara
理:リ:-:Alasan / Logika
体:タイ:からだ:Tubuh
田:デン:た:Sawah
主:シュ:おも:Tuan / Utama
題:ダイ:-:Topik / Judul
意:イ:-:Pikiran / Makna
不:フ:-:Tidak (Negatif)
作:サク:つく.る:Membuat
用:ヨウ:もち.いる:Gunakan
度:ド:たび:Derajat / Kali
強:キョウ:つよ.い:Kuat
公:コウ:おおやけ:Publik
持:ジ:も.つ:Membawa / Memiliki
野:ヤ:の:Lapangan
思:シ:おも.う:Berpikir
家:カ:いえ:Rumah / Keluarga
世:セイ:よ:Dunia
正:セイ:ただ.しい:Benar / Tepat
安:アン:やす.い:Murah / Aman
院:イン:-:Institusi
心:シン:こころ:Hati
界:カイ:-:Dunia / Batas
教:キョウ:おし.える:Mengajar
文:ブン:ふみ:Kalimat / Sastra
元:ゲン:もと:Asal / Mantan
重:ジュウ:おも.い:Berat
近:キン:ちか.い:Dekat
考:コウ:かんが.える:Berpikir
画:ガ:えが.く:Gambar / Rencana
海:カイ:うみ:Laut
売:バイ:う.る:Menjual
知:チ:し.る:Mengetahui
道:ドウ:みち:Jalan
集:シュウ:あつ.まる:Berkumpul
別:ベツ:わか.れる:Berpisah / Beda
物:ブツ:もの:Benda
使:シ:つか.う:Menggunakan
品:ヒン:しな:Barang
計:ケイ:はか.る:Mengukur / Rencana
死:シ:し.ぬ:Mati
特:トク:-:Spesial
私:シ:わたし:Saya
始:シ:はじ.まる:Mulai
朝:チョウ:あさ:Pagi
期:キ:-:Periode / Waktu
町:チョウ:まち:Kota
音:オン:おと:Suara
答:トウ:こた.える:Menjawab
建:ケン:た.てる:Membangun
歩:ホ:ある.く:Berjalan
注:チュウ:そそ.ぐ:Menuang / Catatan
果:カ:は.たす:Buah / Hasil
春:シュン:はる:Musim Semi
夏:カ:なつ:Musim Panas
秋:シュウ:あき:Musim Gugur
冬:トウ:ふゆ:Musim Dingin
夕:セキ:ゆう:Sore
広:コウ:ひろ.い:Luas
早:ソウ:はや.い:Cepat / Awal
遅:チ:おそ.い:Lambat / Terlambat
軽:ケイ:かる.い:Ringan
遠:エン:とお.い:Jauh
弱:ジャク:よわ.い:Lemah
太:タイ:ふと.い:Gemuk
細:サイ:ほそ.い:Tipis / Kurus
悪:アク:わる.い:Buruk / Jahat
暗:アン:くら.い:Gelap
洋:ヨウ:-:Samudra / Barat
和:ワ:やわ.らぐ:Harmoni / Jepang
病:ビョウ:やまい:Penyakit
堂:ドウ:-:Aula
室:シツ:むろ:Ruangan
窓:ソウ:まど:Jendela
服:フク:-:Pakaian
紙:シ:かみ:Kertas
銀:ギン:-:Perak
鉄:テツ:-:Besi
菜:サイ:な:Sayuran
茶:チャ:-:Teh
肉:ニク:-:Daging
鳥:チョウ:とり:Burung
牛:ギュウ:うし:Sapi
馬:バ:うま:Kuda
魚:ギョ:さかな:Ikan
色:ショク:いろ:Warna
花:カ:はな:Bunga
写:シャ:うつ.す:Menyalin / Foto
真:シン:ま:Kebenaran
急:キュウ:いそ.ぐ:Terburu-buru
走:ソウ:はし.る:Berlari
乗:ジョウ:の.る:Naik (Kendaraan)
降:コウ:お.りる:Turun (Kendaraan)
起:キ:お.きる:Bangun
寝:シン:ね.る:Tidur
働:ドウ:はたら.く:Bekerja
待:タイ:ま.つ:Menunggu
洗:セン:あら.う:Mencuci
貸:タイ:か.す:Meminjamkan
借:シャク:か.りる:Meminjam
医:イ:-:Dokter
楽:ガク:たの.しい:Menyenangkan / Musik
歌:カ:うた:Lagu / Menyanyi
`;

const n4GrammarStr = `
〜ば:Jika ~ (Kondisional positif):安ければ買います。:Jika murah, saya beli.
〜たら:Jika / Sesudah ~:雨が降ったら行きません。:Jika hujan, saya tidak pergi.
〜なら:Kalau (Saran):パソコンならあの店がいい。:Kalau PC, toko itu bagus.
〜と:Jika ~ pasti ~ (Fakta):春になると花が咲きます。:Jika musim semi tiba, bunga mekar.
〜ても:Meskipun ~:雨が降っても行きます。:Meskipun hujan, saya tetap pergi.
〜なければならない:Harus ~:宿題をしなければならない。:Harus mengerjakan PR.
〜てはいけない:Tidak boleh ~:ここで写真を撮ってはいけない。:Tidak boleh mengambil foto di sini.
〜ことができる:Bisa / Mampu melakukan ~:私は漢字を読むことができる。:Saya bisa membaca kanji.
〜たことがある:Pernah ~:日本に行ったことがある。:Saya pernah pergi ke Jepang.
〜つもりだ:Berencana untuk ~:来年日本に行くつもりだ。:Berencana pergi ke Jepang tahun depan.
〜はずだ:Pasti / Seharusnya ~:彼はもう着いたはずだ。:Dia seharusnya sudah sampai.
〜そうだ (Visual):Kelihatannya / Sepertinya ~:このケーキはおいしそうだ。:Kue ini kelihatannya enak.
〜そうだ (Hearsay):Katanya / Kabarnya ~:明日は雨が降るそうだ。:Katanya besok akan hujan.
〜らしい:Kelihatannya (Berdasarkan bukti objektif):彼は病気らしい。:Kelihatannya dia sakit.
〜みたいだ:Seperti / Mirip ~:彼は子供みたいだ。:Dia seperti anak kecil.
〜すぎる:Terlalu ~:この靴は大きすぎる。:Sepatu ini terlalu besar.
〜かもしれない:Mungkin ~:明日は雪かもしれない。:Mungkin besok turun salju.
〜やすい:Mudah untuk ~:このペンは書きやすい。:Pulpen ini mudah digunakan menulis.
〜にくい:Sulit untuk ~:この本は読みにくい。:Buku ini sulit dibaca.
〜られる (Pasif):Di- / Ter-:先生に褒められた。:Dipuji oleh guru.
〜させる (Kausatif):Menyuruh / Membiarkan ~:母は妹に部屋を掃除させた。:Ibu menyuruh adik membersihkan kamar.
〜させられる:Terpaksa melakukan ~:毎日野菜を食べさせられる。:Terpaksa makan sayur setiap hari.
〜てしまう:Selesai / Terlanjur (Penyesalan):パスポートを忘れてしまった。:Terlanjur lupa paspor.
〜ておく:Melakukan sesuatu sebagai persiapan:パーティーの前に、飲み物を買っておく。:Beli minuman sbg persiapan sebelum pesta.
〜てある:Sudah di~ (Keadaan dari hasil tindakan):壁にカレンダーが掛けてある。:Kalender sudah digantung di dinding.
〜てみる:Mencoba melakukan ~:この靴を履いてみる。:Mencoba memakai sepatu ini.
〜ていく:Akan terus ~ / Pergi setelah melakukan ~:これからも日本語を勉強していく。:Akan terus belajar bahasa Jepang.
〜てくる:Mulai ~ / Datang setelah melakukan ~:雨が降ってきた。:Hujan mulai turun.
〜ようとする:Mencoba / Berniat untuk ~:電車に乗ろうとしたが、ドアが閉まった。:Mencoba naik kereta, tapi pintu tertutup.
〜ようにする:Berusaha untuk ~:毎日運動するようにしている。:Berusaha berolahraga setiap hari.
〜ようになる:Menjadi bisa ~:日本語が話せるようになった。:Menjadi bisa bicara bahasa Jepang.
〜ところだ:Baru saja / Sedang / Akan melakukan:今、ご飯を食べているところだ。:Sekarang sedang makan nasi.
〜ばかりだ:Baru saja melakukan ~:さっき起きたばかりだ。:Baru saja bangun.
〜のに:Padahal ~:勉強したのに、テストの点が悪かった。:Padahal sudah belajar, nilainya jelek.
〜ために:Untuk / Demi ~:家を買うために貯金している。:Menabung untuk beli rumah.
`;

function parseData(str) {
  return str.trim().split('\n').filter(Boolean).map(line => {
    const parts = line.split(':');
    return parts;
  });
}

const n4Kanji = parseData(n4KanjiStr).map(([char, on, kun, meaning]) => ({ char, on, kun, meaning }));
const n4Grammar = parseData(n4GrammarStr).map(([pattern, meaning, example, trans]) => ({ pattern, meaning, example, trans }));

// Clone the old levels
const exportData = { ...oldLevels };

// Update n4 exclusively
exportData.n4 = {
  ...exportData.n4, // Preserve quiz, reading, listening, writing if they exist
  desc: 'Spesifikasi Resmi JLPT N4: Memahami bahasa Jepang dasar menengah. ~160+ Kanji lanjutan, ~1500 Kosakata total, dan Tata Bahasa kompleks.',
  kanjiCount: n4Kanji.length + ' Kanji N4',
  grammarCount: n4Grammar.length + ' Pola Grammar',
  vocabCount: '~1500 Kosakata',
  kanji: n4Kanji,
  grammar: n4Grammar,
  vocabSessions: vocabN4,
  quiz: [
    { type: 'kanji', q: '「会社」の読み方は？', opts: ['かいしゃ', 'がっこう', 'びょういん', 'えき'], ans: 0 },
    { type: 'grammar', q: '「写真を撮って＿＿いいですか。」', opts: ['は', 'が', 'も', 'に'], ans: 2 },
    { type: 'kanji', q: '「教室」の意味は？', opts: ['Rumah Sakit', 'Ruang Kelas', 'Kantor', 'Perpustakaan'], ans: 1 },
    { type: 'vocab', q: '「旅行」の意味は？', opts: ['Bisnis', 'Perjalanan / Liburan', 'Belajar', 'Belanja'], ans: 1 },
    { type: 'grammar', q: '日本に行った＿＿があります。', opts: ['もの', 'ほう', 'こと', 'ところ'], ans: 2 },
    { type: 'kanji', q: '「病院」の読み方は？', opts: ['びょういん', 'がっこう', 'としょかん', 'えき'], ans: 0 },
    { type: 'grammar', q: 'このパソコンは高＿＿買えません。', opts: ['すぎて', 'すぎで', 'すぎます', 'すぎる'], ans: 0 },
    { type: 'grammar', q: '雨が降っ＿＿、試合は中止です。', opts: ['ば', 'と', 'たら', 'なら'], ans: 2 },
    { type: 'kanji', q: '「春」の読み方は？', opts: ['なつ', 'あき', 'ふゆ', 'はる'], ans: 3 },
    { type: 'vocab', q: '「準備」の意味は？', opts: ['Liburan', 'Persiapan', 'Pekerjaan', 'Jadwal'], ans: 1 }
  ]
};

const output = "export const levels = " + JSON.stringify(exportData, null, 2) + ";\n";
fs.writeFileSync('d:/DATAATAR/portofolio/jlpt/src/data.js', output);
console.log('Successfully generated N4 exact spec data!');
