import fs from 'fs';

const n5KanjiStr = `
一:イチ:ひと.つ:Satu
二:ニ:ふた.つ:Dua
三:サン:みっ.つ:Tiga
四:シ:よっ.つ:Empat
五:ゴ:いつ.つ:Lima
六:ロク:むっ.つ:Enam
七:シチ:なな.つ:Tujuh
八:ハチ:やっ.つ:Delapan
九:キュウ:ここの.つ:Sembilan
十:ジュウ:とお:Sepuluh
百:ヒャク:-:Seratus
千:セン:ち:Seribu
万:マン:-:Sepuluh Ribu
円:エン:まる:Yen / Uang
日:ニチ:ひ:Hari / Matahari
月:ゲツ:つき:Bulan
火:カ:ひ:Api
水:スイ:みず:Air
木:モク:き:Pohon / Kayu
金:キン:かね:Emas / Uang
土:ド:つち:Tanah
人:ジン:ひと:Orang
男:ダン:おとこ:Laki-laki
女:ジョ:おんな:Perempuan
子:シ:こ:Anak
母:ボ:はは:Ibu
父:フ:ちち:Ayah
友:ユウ:とも:Teman
年:ネン:とし:Tahun
今:コン:いま:Sekarang
時:ジ:とき:Waktu / Jam
分:ブン:わ.かる:Menit / Mengerti
半:ハン:なか.ば:Setengah
午:ゴ:-:Siang (AM/PM)
前:ゼン:まえ:Depan / Sebelum
後:ゴ:あと:Belakang / Sesudah
間:カン:あいだ:Di antara / Jeda
週:シュウ:-:Minggu (Pekan)
曜:ヨウ:-:Hari (dalam minggu)
毎:マイ:-:Setiap
何:カ:なに:Apa
上:ジョウ:うえ:Atas
下:カ:した:Bawah
左:サ:ひだり:Kiri
右:ウ:みぎ:Kanan
中:チュウ:なか:Tengah / Dalam
外:ガイ:そと:Luar
東:トウ:ひがし:Timur
西:サイ:にし:Barat
南:ナン:みなみ:Selatan
北:ホク:きた:Utara
大:ダイ:おお.きい:Besar
小:ショウ:ちい.さい:Kecil
長:チョウ:なが.い:Panjang
高:コウ:たか.い:Tinggi / Mahal
安:アン:やす.い:Murah / Aman
新:シン:あたら.しい:Baru
古:コ:ふる.い:Lama / Kuno
多:タ:おお.い:Banyak
少:ショウ:すく.ない:Sedikit
白:ハク:しろ:Putih
黒:コク:くろ:Hitam
山:サン:やま:Gunung
川:セン:かわ:Sungai
天:テン:あま:Langit / Surga
気:キ:-:Semangat / Udara
雨:ウ:あめ:Hujan
空:クウ:そら:Langit / Kosong
生:セイ:い.きる:Hidup / Lahir
先:セン:さき:Sebelum / Duluan
学:ガク:まな.ぶ:Belajar
校:コウ:-:Sekolah
名:メイ:な:Nama
本:ホン:もと:Buku / Asal
語:ゴ:かた.る:Bahasa / Kata
道:ドウ:みち:Jalan
車:シャ:くるま:Mobil
電:デン:-:Listrik
駅:エキ:-:Stasiun
国:コク:くに:Negara
読:ドク:よ.む:Membaca
書:ショ:か.く:Menulis
見:ケン:み.る:Melihat
聞:ブン:き.く:Mendengar
話:ワ:はな.す:Berbicara
買:バイ:か.う:Membeli
食:ショク:た.べる:Makan
飲:イン:の.む:Minum
出:シュツ:で.る:Keluar
入:ニュウ:はい.る:Masuk
行:コウ:い.く:Pergi
来:ライ:く.る:Datang
帰:キ:かえ.る:Pulang
休:キュウ:やす.む:Istirahat
立:リツ:た.つ:Berdiri
目:モク:め:Mata
口:コウ:くち:Mulut
耳:ジ:みみ:Telinga
手:シュ:て:Tangan
足:ソク:あし:Kaki
`;

const n5GrammarStr = `
〜です:Adalah (Sopan):わたしは学生です。:Saya adalah siswa.
〜だ:Adalah (Kasual):わたしは学生だ。:Saya adalah siswa.
〜ます:Bentuk sopan kata kerja:りんごを食べます。:Makan apel.
〜ません:Bentuk negatif kata kerja:肉を食べません。:Tidak makan daging.
〜ました:Bentuk lampau:昨日勉強しました。:Kemarin saya belajar.
〜ませんでした:Bentuk lampau negatif:テレビを見ませんでした。:Tidak menonton TV.
は:Partikel subjek/topik:今日は暑いです。:Hari ini panas.
が:Partikel subjek spesifik:雨が降っています。:Hujan sedang turun.
を:Partikel objek:水を飲みます。:Minum air.
に:Partikel waktu/tempat/tujuan:７時に起きます。 / 学校に行きます。:Bangun jam 7. / Pergi ke sekolah.
へ:Partikel arah:日本へ行きます。:Pergi ke Jepang.
で:Partikel alat/tempat aktivitas:バスで行きます。 / 部屋で寝ます。:Pergi dengan bus. / Tidur di kamar.
と:Partikel dan / bersama:パンと卵を食べます。:Makan roti dan telur.
や:Partikel dan (di antaranya):ペンやノートを買います。:Membeli pulpen, buku catatan, dll.
も:Partikel juga:わたしも行きます。:Saya juga pergi.
から:Dari (Waktu/Tempat):９時からです。:Mulai dari jam 9.
まで:Sampai (Waktu/Tempat):５時まで働きます。:Bekerja sampai jam 5.
の:Partikel kepemilikan:わたしの本です。:Buku milik saya.
〜ませんか:Maukah ~? (Ajakan):お茶を飲みませんか。:Maukah minum teh?
〜ましょう:Mari ~:一緒に帰りましょう。:Mari pulang bersama.
〜てください:Tolong lakukan ~:ここに書いてください。:Tolong tulis di sini.
〜てもいいですか:Bolehkah saya ~?:写真を撮ってもいいですか。:Bolehkah ambil foto?
〜てはいけません:Tidak boleh ~:タバコを吸ってはいけません。:Tidak boleh merokok.
〜ている:Sedang melakukan ~:本を読んでいます。:Sedang membaca buku.
〜から (Alasan):Karena ~:暑いから、窓を開けます。:Karena panas, buka jendela.
〜ので:Karena ~ (Objektif):雨なので、行きません。:Karena hujan, tidak pergi.
〜けれど/けど:Tetapi ~:高いけど、買います。:Mahal tetapi beli.
〜たいです:Ingin ~:日本に行きたいです。:Ingin pergi ke Jepang.
〜たくないです:Tidak ingin ~:今日は働きたくないです。:Tidak ingin bekerja hari ini.
〜より〜のほうが:Lebih ~ daripada ~:肉より魚のほうが好きです。:Lebih suka ikan daripada daging.
〜の中で〜がいちばん:Di antara ~, ... yang paling:果物の中でりんごがいちばん好きです。:Di antara buah, paling suka apel.
〜たり〜たりする:Melakukan A, melakukan B:読んだり書いたりします。:Membaca, menulis, dsb.
〜なる:Menjadi ~:寒くなります。:Menjadi dingin.
〜つもりです:Berencana untuk ~:明日行くつもりです。:Berencana pergi besok.
〜たことがあります:Pernah ~:寿司を食べたことがあります。:Pernah makan sushi.
〜ないでください:Tolong jangan ~:忘れないでください。:Tolong jangan lupa.
〜のが好きです:Suka melakukan ~:映画を見るのが好きです。:Suka menonton film.
〜のが上手です:Pintar melakukan ~:彼は歌を歌うのが上手です。:Dia pintar menyanyi.
〜に行く:Pergi untuk ~:買い物に行きます。:Pergi untuk berbelanja.
`;

function parseData(str) {
  return str.trim().split('\n').filter(Boolean).map(line => {
    const parts = line.split(':');
    return parts;
  });
}

const n5Kanji = parseData(n5KanjiStr).map(([char, on, kun, meaning]) => ({ char, on, kun, meaning }));
const n5Grammar = parseData(n5GrammarStr).map(([pattern, meaning, example, trans]) => ({ pattern, meaning, example, trans }));

// Read existing data to preserve other levels if needed, but since we're generating full JSON, we'll just write it outright.
const exportData = {
  n5: {
    id: 'n5', label: 'N5', color: '#2ec4b6', title: 'Pemula (Beginner)',
    desc: 'Spesifikasi Resmi JLPT N5: Memahami bahasa Jepang dasar. Menguasai 100 Kanji N5, ~800 Kosakata, dan ~40 Pola Tata Bahasa fundamental.',
    kanjiCount: n5Kanji.length + ' Kanji', grammarCount: n5Grammar.length + ' Grammar', vocabCount: '~800 Kosakata',
    kanji: n5Kanji,
    grammar: n5Grammar,
    quiz: [
      { type: 'kanji', q: '「水」の意味は？', opts: ['Api', 'Air', 'Tanah', 'Angin'], ans: 1 },
      { type: 'kanji', q: '「大学」の読み方は？', opts: ['たいがく', 'おおがく', 'だいがく', 'おおきがく'], ans: 2 },
      { type: 'grammar', q: '「わたし＿学生です。」', opts: ['が', 'を', 'に', 'は'], ans: 3 },
      { type: 'grammar', q: '「えんぴつ＿書きます。」', opts: ['で', 'に', 'を', 'が'], ans: 0 },
      { type: 'vocab', q: '「おはようございます」の意味は？', opts: ['Selamat malam', 'Selamat siang', 'Selamat pagi', 'Sampai jumpa'], ans: 2 },
      { type: 'grammar', q: '「ここに車を＿ください。」', opts: ['止まって', '止めて', '止む', '止める'], ans: 1 },
      { type: 'vocab', q: '「ありがとう」means?', opts: ['Maaf', 'Terima kasih', 'Halo', 'Tolong'], ans: 1 },
      { type: 'kanji', q: '「車」の読み方は？', opts: ['じてんしゃ', 'くるま', 'でんしゃ', 'ばす'], ans: 1 },
      { type: 'kanji', q: '「先生」の読み方は？', opts: ['せんせい', 'さんせい', 'せんしょう', 'さんしょう'], ans: 0 },
      { type: 'grammar', q: '「きのうは とても＿。」', opts: ['さむいです', 'さむいでした', 'さむかったです', 'さむかったでした'], ans: 2 }
    ],
    reading: {
      passage: 'わたしのなまえは アンディです。インドネシアから きました。いま、とうきょうの だいがくで べんきょうしています。にほんごは むずかしいですが、とても おもしろいです。まいにち ３じかん にほんごを べんきょうします。しゅうまつは ともだちと えいがを みます。',
      questions: [
        { q: 'アンディさんは どこから きましたか？', opts: ['にほん', 'とうきょう', 'インドネシア', 'だいがく'], ans: 2 },
        { q: 'アンディさんは まいにち 何じかん べんきょうしますか？', opts: ['１じかん', '２じかん', '３じかん', '４じかん'], ans: 2 },
        { q: 'しゅうまつは 何を しますか？', opts: ['べんきょうします', 'えいがを みます', 'としょかんへ いきます', 'かいものを します'], ans: 1 }
      ]
    },
    listening: {
      text: '男の人と女の人が話しています。男の人は明日、何時に起きますか？\\n男：明日は出張ですね。何時の飛行機ですか？\\n女：朝8時です。だから、明日は5時に起きます。\\n男：早いですね。私は6時の電車に乗りますから、5時半に起きます。',
      questions: [
        { q: '男の人は明日、何時に起きますか？', opts: ['5時', '5時半', '6時', '8時'], ans: 1 }
      ]
    },
    writing: [
      { prompt: 'Tulis dalam Hiragana: "Saya makan nasi"', hint: 'わたしは ごはんを たべます', answer: 'わたしはごはんをたべます。' },
      { prompt: 'Tulis dalam Hiragana: "Ini adalah buku"', hint: 'これは ほん です', answer: 'これはほんです。' },
      { prompt: 'Tulis dalam Hiragana: "Kemarin saya pergi ke sekolah"', hint: 'きのう がっこうへ いきました', answer: 'きのうがっこうへいきました。' }
    ]
  },
  n4: {
    id: 'n4', label: 'N4', color: '#4895ef', title: 'Dasar (Elementary)',
    desc: 'Spesifikasi JLPT N4: Memahami bahasa Jepang dasar menengah. ~300 Kanji N4, ~1500 Kosakata, dan Tata Bahasa kompleks.',
    kanjiCount: '200 Kanji', grammarCount: '80 Grammar', vocabCount: '~1500 Kosakata',
    kanji: [{char: '会', on: 'カイ', kun: 'あ.う', meaning: 'Bertemu'}],
    grammar: [{pattern: '〜ば', meaning: 'Jika', example: '安ければ買う', trans: 'Beli jika murah'}],
    quiz: [], reading: {passage:'', questions:[]}, listening: {text:'', questions:[]}, writing: []
  },
  n3: {
    id: 'n3', label: 'N3', color: '#f4a261', title: 'Menengah (Intermediate)',
    desc: 'Mampu memahami bacaan sehari-hari yang sedikit panjang.',
    kanjiCount: '650 Kanji', grammarCount: '150 Grammar', vocabCount: '~3700 Kosakata',
    kanji: [], grammar: [], quiz: [], reading: {passage:'', questions:[]}, listening: {text:'', questions:[]}, writing: []
  },
  n2: {
    id: 'n2', label: 'N2', color: '#e63946', title: 'Menengah Atas (Upper Intermediate)',
    desc: 'Mampu memahami bahasa Jepang level profesional.',
    kanjiCount: '1000 Kanji', grammarCount: '200 Grammar', vocabCount: '~6000 Kosakata',
    kanji: [], grammar: [], quiz: [], reading: {passage:'', questions:[]}, listening: {text:'', questions:[]}, writing: []
  },
  n1: {
    id: 'n1', label: 'N1', color: '#7b2ff7', title: 'Mahir (Advanced)',
    desc: 'Level tertinggi JLPT.',
    kanjiCount: '2000 Kanji', grammarCount: '300 Grammar', vocabCount: '~10000 Kosakata',
    kanji: [], grammar: [], quiz: [], reading: {passage:'', questions:[]}, listening: {text:'', questions:[]}, writing: []
  }
};

// Import existing data to copy over n4-n1 so we don't lose them
import { levels as oldLevels } from './src/data.js';
exportData.n4 = oldLevels.n4;
exportData.n3 = oldLevels.n3;
exportData.n2 = oldLevels.n2;
exportData.n1 = oldLevels.n1;

// Override descriptions just in case
exportData.n4.desc = 'Spesifikasi JLPT N4: Memahami bahasa Jepang dasar menengah. ~300 Kanji N4, ~1500 Kosakata, dan Tata Bahasa kompleks.';

const output = "export const levels = " + JSON.stringify(exportData, null, 2) + ";\n";
fs.writeFileSync('d:/DATAATAR/portofolio/jlpt/src/data.js', output);
console.log('Successfully generated N5 exact spec data!');
