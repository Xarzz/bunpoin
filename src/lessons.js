// ===== GUIDED LESSONS DATA =====
export const LESSONS = [
  {
    title: "Salam & Sapaan", emoji: "👋",
    intro: "Di Indonesia kita bilang 'Selamat pagi', 'Apa kabar?'. Di Jepang, sapaan berbeda tergantung waktu dan situasi. Mari pelajari sapaan dasar!",
    vocab: [
      { jp: "おはようございます", ro: "ohayou gozaimasu", id: "Selamat pagi (formal)" },
      { jp: "こんにちは", ro: "konnichiwa", id: "Selamat siang / Halo" },
      { jp: "こんばんは", ro: "konbanwa", id: "Selamat malam (saat bertemu)" },
      { jp: "おやすみなさい", ro: "oyasuminasai", id: "Selamat tidur" },
      { jp: "さようなら", ro: "sayounara", id: "Selamat tinggal" },
      { jp: "ありがとうございます", ro: "arigatou gozaimasu", id: "Terima kasih (formal)" },
      { jp: "すみません", ro: "sumimasen", id: "Permisi / Maaf" },
      { jp: "お元気ですか", ro: "ogenki desu ka", id: "Apa kabar?" },
    ],
    grammar: [
      { pattern: "〜です (desu)", meaning: "Penanda sopan di akhir kalimat, mirip 'adalah'", example: "元気です。", trans: "Saya baik-baik saja." },
      { pattern: "〜か (ka)", meaning: "Partikel tanya, ditaruh di akhir kalimat untuk bertanya", example: "お元気ですか？", trans: "Apa kabar?" },
    ],
    dialog: [
      { speaker: "A", jp: "おはようございます！お元気ですか？", id: "Selamat pagi! Apa kabar?" },
      { speaker: "B", jp: "はい、元気です。ありがとうございます。", id: "Ya, saya baik. Terima kasih." },
      { speaker: "A", jp: "よかったです！", id: "Syukurlah!" },
    ],
    quiz: [
      { q: "'Selamat pagi' dalam bahasa Jepang formal adalah?", opts: ["こんにちは","おはようございます","こんばんは","さようなら"], ans: 1 },
      { q: "'Apa kabar?' dalam bahasa Jepang adalah?", opts: ["ありがとう","すみません","お元気ですか","おやすみなさい"], ans: 2 },
      { q: "Partikel 'か' digunakan untuk?", opts: ["Menyatakan waktu","Bertanya","Menyambung kalimat","Menunjukkan tempat"], ans: 1 },
      { q: "'Terima kasih' formal dalam bahasa Jepang?", opts: ["すみません","さようなら","ありがとうございます","おはよう"], ans: 2 },
    ]
  },
  {
    title: "Perkenalan Diri", emoji: "🙋",
    intro: "Saat bertemu orang baru di Jepang, kamu perlu memperkenalkan nama dan asal. Polanya sangat terstruktur dan sopan. Yuk pelajari!",
    vocab: [
      { jp: "わたし", ro: "watashi", id: "Saya" },
      { jp: "なまえ", ro: "namae", id: "Nama" },
      { jp: "がくせい", ro: "gakusei", id: "Pelajar/Mahasiswa" },
      { jp: "せんせい", ro: "sensei", id: "Guru/Dosen" },
      { jp: "かいしゃいん", ro: "kaishain", id: "Karyawan" },
      { jp: "にほんじん", ro: "nihonjin", id: "Orang Jepang" },
      { jp: "インドネシアじん", ro: "Indonesia-jin", id: "Orang Indonesia" },
      { jp: "はじめまして", ro: "hajimemashite", id: "Salam kenal" },
      { jp: "よろしくおねがいします", ro: "yoroshiku onegai shimasu", id: "Mohon bantuannya" },
    ],
    grammar: [
      { pattern: "〜は〜です", meaning: "Pola kalimat dasar: [Topik] は [Keterangan] です = '[Topik] adalah [Keterangan]'", example: "わたしは がくせいです。", trans: "Saya adalah pelajar." },
      { pattern: "〜じん (jin)", meaning: "Sufiks untuk menyebut kebangsaan seseorang", example: "インドネシアじんです。", trans: "Saya orang Indonesia." },
    ],
    dialog: [
      { speaker: "A", jp: "はじめまして。わたしは たなかです。にほんじんです。", id: "Salam kenal. Saya Tanaka. Saya orang Jepang." },
      { speaker: "B", jp: "はじめまして。わたしは ブディです。インドネシアじんです。がくせいです。", id: "Salam kenal. Saya Budi. Saya orang Indonesia. Saya pelajar." },
      { speaker: "A", jp: "よろしくおねがいします！", id: "Mohon bantuannya!" },
      { speaker: "B", jp: "こちらこそ、よろしくおねがいします。", id: "Saya juga, mohon bantuannya." },
    ],
    quiz: [
      { q: "'Salam kenal' dalam bahasa Jepang?", opts: ["さようなら","はじめまして","ありがとう","すみません"], ans: 1 },
      { q: "わたしは がくせいです。Artinya?", opts: ["Saya guru","Saya karyawan","Saya pelajar","Saya orang Jepang"], ans: 2 },
      { q: "Sufiks 〜じん digunakan untuk?", opts: ["Menyebut pekerjaan","Menyebut kebangsaan","Menyebut usia","Menyebut hobi"], ans: 1 },
      { q: "Pola 'A は B です' artinya?", opts: ["A punya B","A di B","A adalah B","A mau B"], ans: 2 },
    ]
  },
  {
    title: "Angka & Waktu", emoji: "🔢",
    intro: "Angka di Jepang ada 2 sistem: Sino-Japanese (いち、に、さん) dan Native (ひとつ、ふたつ). Untuk dasar, kita pakai sistem Sino-Japanese dulu!",
    vocab: [
      { jp: "いち", ro: "ichi", id: "Satu (1)" },
      { jp: "に", ro: "ni", id: "Dua (2)" },
      { jp: "さん", ro: "san", id: "Tiga (3)" },
      { jp: "よん/し", ro: "yon/shi", id: "Empat (4)" },
      { jp: "ご", ro: "go", id: "Lima (5)" },
      { jp: "じゅう", ro: "juu", id: "Sepuluh (10)" },
      { jp: "いま", ro: "ima", id: "Sekarang" },
      { jp: "なんじ", ro: "nanji", id: "Jam berapa?" },
    ],
    grammar: [
      { pattern: "〜じ (ji)", meaning: "Sufiks untuk menyebut jam. Contoh: いちじ = jam 1", example: "いま さんじです。", trans: "Sekarang jam 3." },
      { pattern: "なん〜 (nan)", meaning: "Kata tanya 'berapa/apa'. なんじ = jam berapa, なにじん = orang apa", example: "いま なんじですか？", trans: "Sekarang jam berapa?" },
    ],
    dialog: [
      { speaker: "A", jp: "すみません、いま なんじですか？", id: "Permisi, sekarang jam berapa?" },
      { speaker: "B", jp: "いま ごじです。", id: "Sekarang jam 5." },
      { speaker: "A", jp: "ありがとうございます！", id: "Terima kasih!" },
    ],
    quiz: [
      { q: "'さん' artinya angka berapa?", opts: ["1","2","3","5"], ans: 2 },
      { q: "いま なんじですか？ Artinya?", opts: ["Siapa namamu?","Sekarang jam berapa?","Dari mana?","Mau ke mana?"], ans: 1 },
      { q: "Sufiks 〜じ digunakan untuk?", opts: ["Menyebut hari","Menyebut jam","Menyebut bulan","Menyebut tahun"], ans: 1 },
      { q: "'じゅう' artinya?", opts: ["100","5","10","20"], ans: 2 },
    ]
  },
  {
    title: "Keluarga", emoji: "👨‍👩‍👧‍👦",
    intro: "Di Jepang, kata untuk keluarga sendiri berbeda dengan keluarga orang lain. Ini menunjukkan rasa hormat (keigo). Untuk dasar, kita pelajari versi umum dulu!",
    vocab: [
      { jp: "かぞく", ro: "kazoku", id: "Keluarga" },
      { jp: "おとうさん", ro: "otousan", id: "Ayah" },
      { jp: "おかあさん", ro: "okaasan", id: "Ibu" },
      { jp: "おにいさん", ro: "oniisan", id: "Kakak laki-laki" },
      { jp: "おねえさん", ro: "oneesan", id: "Kakak perempuan" },
      { jp: "おとうと", ro: "otouto", id: "Adik laki-laki" },
      { jp: "いもうと", ro: "imouto", id: "Adik perempuan" },
    ],
    grammar: [
      { pattern: "〜がいます (ga imasu)", meaning: "Menyatakan keberadaan makhluk hidup (orang/hewan)", example: "おにいさんが います。", trans: "Ada kakak laki-laki." },
      { pattern: "なんにん (nannin)", meaning: "Berapa orang? Kata tanya untuk menghitung orang", example: "かぞくは なんにんですか？", trans: "Keluargamu berapa orang?" },
    ],
    dialog: [
      { speaker: "A", jp: "かぞくは なんにんですか？", id: "Keluargamu berapa orang?" },
      { speaker: "B", jp: "よにんです。おとうさんと おかあさんと いもうとが います。", id: "4 orang. Ada ayah, ibu, dan adik perempuan." },
    ],
    quiz: [
      { q: "'おかあさん' artinya?", opts: ["Ayah","Ibu","Kakak","Adik"], ans: 1 },
      { q: "〜がいます digunakan untuk?", opts: ["Benda mati","Makhluk hidup","Tempat","Waktu"], ans: 1 },
      { q: "'かぞく' artinya?", opts: ["Teman","Guru","Keluarga","Tetangga"], ans: 2 },
      { q: "Kata tanya 'berapa orang' dalam bahasa Jepang?", opts: ["なんじ","なんにん","なに","だれ"], ans: 1 },
    ]
  },
  {
    title: "Di Restoran", emoji: "🍜",
    intro: "Makan di restoran Jepang punya budaya unik! Kamu akan sering dengar 'いらっしゃいませ' (selamat datang). Yuk pelajari cara memesan makanan!",
    vocab: [
      { jp: "みず", ro: "mizu", id: "Air" },
      { jp: "ごはん", ro: "gohan", id: "Nasi" },
      { jp: "ラーメン", ro: "raamen", id: "Ramen" },
      { jp: "おちゃ", ro: "ocha", id: "Teh" },
      { jp: "メニュー", ro: "menyuu", id: "Menu" },
      { jp: "おねがいします", ro: "onegaishimasu", id: "Tolong / Minta" },
      { jp: "おいしい", ro: "oishii", id: "Enak" },
      { jp: "いくら", ro: "ikura", id: "Berapa (harga)?" },
    ],
    grammar: [
      { pattern: "〜をください (o kudasai)", meaning: "Tolong berikan saya 〜. Pola untuk meminta/memesan sesuatu", example: "みずを ください。", trans: "Tolong air." },
      { pattern: "〜は いくらですか", meaning: "Berapa harga 〜? Pola untuk bertanya harga", example: "ラーメンは いくらですか？", trans: "Berapa harga ramen?" },
    ],
    dialog: [
      { speaker: "Pelayan", jp: "いらっしゃいませ！メニューを どうぞ。", id: "Selamat datang! Silakan menunya." },
      { speaker: "Kamu", jp: "ラーメンを ください。", id: "Tolong ramennya." },
      { speaker: "Pelayan", jp: "はい、かしこまりました。", id: "Baik, segera." },
      { speaker: "Kamu", jp: "おいしいです！", id: "Enak!" },
    ],
    quiz: [
      { q: "Cara memesan air di restoran Jepang?", opts: ["みずが ほしい","みずを ください","みずは いい","みずを たべます"], ans: 1 },
      { q: "'おいしい' artinya?", opts: ["Mahal","Murah","Enak","Banyak"], ans: 2 },
      { q: "'いくら' digunakan untuk bertanya?", opts: ["Waktu","Harga","Nama","Jumlah orang"], ans: 1 },
      { q: "'いらっしゃいませ' biasa diucapkan oleh?", opts: ["Pelanggan","Pelayan/Penjual","Teman","Guru"], ans: 1 },
    ]
  },
  {
    title: "Arah & Transportasi", emoji: "🚃",
    intro: "Jepang terkenal dengan sistem transportasinya yang luar biasa. Mari belajar cara bertanya arah dan naik transportasi umum!",
    vocab: [
      { jp: "えき", ro: "eki", id: "Stasiun" },
      { jp: "みぎ", ro: "migi", id: "Kanan" },
      { jp: "ひだり", ro: "hidari", id: "Kiri" },
      { jp: "まっすぐ", ro: "massugu", id: "Lurus" },
      { jp: "でんしゃ", ro: "densha", id: "Kereta" },
      { jp: "バス", ro: "basu", id: "Bus" },
      { jp: "どこ", ro: "doko", id: "Di mana?" },
    ],
    grammar: [
      { pattern: "〜はどこですか", meaning: "Di mana 〜? Pola bertanya lokasi", example: "えきは どこですか？", trans: "Stasiunnya di mana?" },
      { pattern: "〜にのります (ni norimasu)", meaning: "Naik 〜 (kendaraan)", example: "でんしゃに のります。", trans: "Naik kereta." },
    ],
    dialog: [
      { speaker: "A", jp: "すみません、えきは どこですか？", id: "Permisi, stasiunnya di mana?" },
      { speaker: "B", jp: "まっすぐ いって、みぎに まがってください。", id: "Jalan lurus, lalu belok kanan." },
      { speaker: "A", jp: "ありがとうございます！", id: "Terima kasih!" },
    ],
    quiz: [
      { q: "'えき' artinya?", opts: ["Bandara","Halte","Stasiun","Pelabuhan"], ans: 2 },
      { q: "えきは どこですか？ Artinya?", opts: ["Stasiun kapan buka?","Stasiun di mana?","Stasiun berapa?","Stasiun siapa?"], ans: 1 },
      { q: "'みぎ' artinya?", opts: ["Kiri","Lurus","Belakang","Kanan"], ans: 3 },
      { q: "Pola '〜にのります' artinya?", opts: ["Turun dari","Naik","Berjalan ke","Berhenti di"], ans: 1 },
    ]
  },
  {
    title: "Belanja", emoji: "🛍️",
    intro: "Belanja di Jepang seru banget! Dari konbini (minimarket) sampai department store. Yuk pelajari percakapan saat berbelanja!",
    vocab: [
      { jp: "これ", ro: "kore", id: "Ini" },
      { jp: "それ", ro: "sore", id: "Itu (dekat lawan bicara)" },
      { jp: "あれ", ro: "are", id: "Itu (jauh)" },
      { jp: "たかい", ro: "takai", id: "Mahal" },
      { jp: "やすい", ro: "yasui", id: "Murah" },
      { jp: "おおきい", ro: "ookii", id: "Besar" },
      { jp: "ちいさい", ro: "chiisai", id: "Kecil" },
      { jp: "えん", ro: "en", id: "Yen (mata uang)" },
    ],
    grammar: [
      { pattern: "これ/それ/あれ は〜です", meaning: "Ini/Itu adalah 〜. Kata tunjuk berdasarkan jarak", example: "これは いくらですか？", trans: "Ini berapa?" },
      { pattern: "〜も〜です", meaning: "〜 juga 〜. Partikel 'も' = juga", example: "それも やすいです。", trans: "Itu juga murah." },
    ],
    dialog: [
      { speaker: "Kamu", jp: "すみません、これは いくらですか？", id: "Permisi, ini berapa?" },
      { speaker: "Penjual", jp: "それは にひゃくえんです。", id: "Itu 200 yen." },
      { speaker: "Kamu", jp: "やすいですね！これを ください。", id: "Murah ya! Tolong yang ini." },
    ],
    quiz: [
      { q: "'これ' menunjuk benda yang?", opts: ["Jauh","Dekat pembicara","Dekat lawan bicara","Tidak terlihat"], ans: 1 },
      { q: "'やすい' artinya?", opts: ["Mahal","Murah","Bagus","Jelek"], ans: 1 },
      { q: "Partikel 'も' artinya?", opts: ["Juga","Tetapi","Dan","Atau"], ans: 0 },
      { q: "'えん' adalah?", opts: ["Mata uang Korea","Mata uang Jepang","Satuan berat","Satuan panjang"], ans: 1 },
    ]
  },
  {
    title: "Kehidupan Sehari-hari", emoji: "🌅",
    intro: "Bagaimana menceritakan aktivitas harianmu dalam bahasa Jepang? Dari bangun tidur sampai tidur lagi. Mari pelajari kata kerja dasar!",
    vocab: [
      { jp: "おきます", ro: "okimasu", id: "Bangun tidur" },
      { jp: "ねます", ro: "nemasu", id: "Tidur" },
      { jp: "たべます", ro: "tabemasu", id: "Makan" },
      { jp: "のみます", ro: "nomimasu", id: "Minum" },
      { jp: "いきます", ro: "ikimasu", id: "Pergi" },
      { jp: "かえります", ro: "kaerimasu", id: "Pulang" },
      { jp: "べんきょうします", ro: "benkyou shimasu", id: "Belajar" },
      { jp: "しごとします", ro: "shigoto shimasu", id: "Bekerja" },
    ],
    grammar: [
      { pattern: "〜ます (masu)", meaning: "Bentuk sopan kata kerja. Dipakai dalam percakapan sehari-hari yang sopan", example: "あさ おきます。", trans: "Pagi bangun tidur." },
      { pattern: "〜に いきます", meaning: "Pergi ke 〜. Partikel 'に' menunjukkan tujuan", example: "がっこうに いきます。", trans: "Pergi ke sekolah." },
    ],
    dialog: [
      { speaker: "A", jp: "まいにち なんじに おきますか？", id: "Setiap hari bangun jam berapa?" },
      { speaker: "B", jp: "ろくじに おきます。それから がっこうに いきます。", id: "Bangun jam 6. Lalu pergi ke sekolah." },
      { speaker: "A", jp: "なんじに かえりますか？", id: "Pulang jam berapa?" },
      { speaker: "B", jp: "さんじに かえります。うちで べんきょうします。", id: "Pulang jam 3. Belajar di rumah." },
    ],
    quiz: [
      { q: "'たべます' artinya?", opts: ["Minum","Tidur","Makan","Pergi"], ans: 2 },
      { q: "Bentuk '〜ます' digunakan untuk?", opts: ["Bentuk kasual","Bentuk sopan","Bentuk perintah","Bentuk negatif"], ans: 1 },
      { q: "がっこうに いきます。Artinya?", opts: ["Pulang dari sekolah","Belajar di sekolah","Pergi ke sekolah","Bermain di sekolah"], ans: 2 },
      { q: "'かえります' artinya?", opts: ["Pergi","Datang","Pulang","Berjalan"], ans: 2 },
    ]
  }
];
