import fs from 'fs';
import { levels as oldLevels } from './src/data.js';

// Grammar N5 tambahan (sekarang baru 39, target ~80)
const extraGrammar = [
  { pattern: "〜てください", meaning: "Tolong (lakukan)", example: "ここに書いてください。", trans: "Tolong tulis di sini." },
  { pattern: "〜てもいいですか", meaning: "Bolehkah saya...?", example: "写真を撮ってもいいですか。", trans: "Bolehkah saya mengambil foto?" },
  { pattern: "〜てはいけません", meaning: "Tidak boleh...", example: "ここでタバコを吸ってはいけません。", trans: "Tidak boleh merokok di sini." },
  { pattern: "〜ています", meaning: "Sedang (melakukan)", example: "今、本を読んでいます。", trans: "Sekarang sedang membaca buku." },
  { pattern: "〜たことがあります", meaning: "Pernah (melakukan)", example: "日本に行ったことがあります。", trans: "Saya pernah pergi ke Jepang." },
  { pattern: "〜たり〜たりする", meaning: "Melakukan hal seperti... dan...", example: "休みの日は映画を見たり、本を読んだりします。", trans: "Di hari libur, saya menonton film dan membaca buku." },
  { pattern: "〜たほうがいい", meaning: "Sebaiknya...", example: "薬を飲んだほうがいい。", trans: "Sebaiknya minum obat." },
  { pattern: "〜ないほうがいい", meaning: "Sebaiknya tidak...", example: "夜遅く食べないほうがいい。", trans: "Sebaiknya tidak makan larut malam." },
  { pattern: "〜なければなりません", meaning: "Harus...", example: "宿題をしなければなりません。", trans: "Harus mengerjakan PR." },
  { pattern: "〜なくてもいい", meaning: "Tidak harus...", example: "明日来なくてもいいです。", trans: "Besok tidak harus datang." },
  { pattern: "〜つもりです", meaning: "Bermaksud / Berencana...", example: "来年日本に行くつもりです。", trans: "Tahun depan saya berencana pergi ke Jepang." },
  { pattern: "〜ましょう", meaning: "Mari kita...", example: "一緒に行きましょう。", trans: "Mari kita pergi bersama." },
  { pattern: "〜ましょうか", meaning: "Mau saya bantu...?", example: "窓を開けましょうか。", trans: "Mau saya bukakan jendelanya?" },
  { pattern: "〜たいです", meaning: "Ingin (melakukan)", example: "日本語を勉強したいです。", trans: "Saya ingin belajar bahasa Jepang." },
  { pattern: "〜に行きます", meaning: "Pergi untuk...", example: "映画を見に行きます。", trans: "Pergi untuk menonton film." },
  { pattern: "〜すぎます", meaning: "Terlalu...", example: "この料理は辛すぎます。", trans: "Masakan ini terlalu pedas." },
  { pattern: "〜やすい / 〜にくい", meaning: "Mudah / Sulit untuk...", example: "この本は読みやすいです。", trans: "Buku ini mudah dibaca." },
  { pattern: "〜ながら", meaning: "Sambil...", example: "音楽を聞きながら勉強します。", trans: "Belajar sambil mendengarkan musik." },
  { pattern: "〜前に", meaning: "Sebelum...", example: "寝る前に歯を磨きます。", trans: "Sebelum tidur, saya menyikat gigi." },
  { pattern: "〜後で", meaning: "Setelah...", example: "食べた後で散歩します。", trans: "Setelah makan, saya jalan-jalan." },
  { pattern: "〜時", meaning: "Ketika...", example: "日本に行った時、富士山を見ました。", trans: "Ketika pergi ke Jepang, saya melihat Gunung Fuji." },
  { pattern: "〜と思います", meaning: "Saya pikir...", example: "明日は雨が降ると思います。", trans: "Saya pikir besok akan hujan." },
  { pattern: "〜と言いました", meaning: "Dia berkata...", example: "先生は「静かにしてください」と言いました。", trans: "Guru berkata 'tolong tenang'." },
  { pattern: "〜でしょう", meaning: "Mungkin / Sepertinya...", example: "明日はいい天気でしょう。", trans: "Besok mungkin cuaca bagus." },
  { pattern: "〜かもしれません", meaning: "Mungkin...", example: "彼は来ないかもしれません。", trans: "Dia mungkin tidak datang." },
  { pattern: "〜そうです (伝聞)", meaning: "Katanya / Dengar-dengar...", example: "あの映画はおもしろいそうです。", trans: "Katanya film itu menarik." },
  { pattern: "〜そうです (様態)", meaning: "Kelihatannya...", example: "雨が降りそうです。", trans: "Kelihatannya akan hujan." },
  { pattern: "〜てあげます", meaning: "Melakukan untuk orang lain", example: "友達に本を貸してあげました。", trans: "Saya meminjamkan buku untuk teman." },
  { pattern: "〜てもらいます", meaning: "Mendapat bantuan", example: "友達に日本語を教えてもらいました。", trans: "Saya diajarkan bahasa Jepang oleh teman." },
  { pattern: "〜てくれます", meaning: "Seseorang melakukan untuk saya", example: "母が料理を作ってくれました。", trans: "Ibu membuatkan masakan untuk saya." },
  { pattern: "〜ないでください", meaning: "Tolong jangan...", example: "ここで写真を撮らないでください。", trans: "Tolong jangan ambil foto di sini." },
  { pattern: "〜のが好きです", meaning: "Suka (melakukan)...", example: "映画を見るのが好きです。", trans: "Saya suka menonton film." },
  { pattern: "〜のが上手です", meaning: "Pandai (melakukan)...", example: "彼女は歌うのが上手です。", trans: "Dia pandai bernyanyi." },
  { pattern: "〜ことができます", meaning: "Bisa (melakukan)...", example: "日本語を話すことができます。", trans: "Saya bisa berbicara bahasa Jepang." },
  { pattern: "〜ことがあります", meaning: "Kadang-kadang...", example: "朝ごはんを食べないことがあります。", trans: "Kadang-kadang saya tidak sarapan." },
  { pattern: "〜ように", meaning: "Supaya / Agar...", example: "忘れないように、メモします。", trans: "Supaya tidak lupa, saya mencatat." },
  { pattern: "まだ〜ていません", meaning: "Belum...", example: "まだ昼ごはんを食べていません。", trans: "Saya belum makan siang." },
  { pattern: "もう〜ました", meaning: "Sudah...", example: "もう宿題をしました。", trans: "Saya sudah mengerjakan PR." },
  { pattern: "〜てから", meaning: "Setelah (melakukan)...", example: "手を洗ってから食べます。", trans: "Setelah mencuci tangan, baru makan." },
  { pattern: "〜のに", meaning: "Padahal / Meskipun...", example: "勉強したのに、テストができなかった。", trans: "Padahal sudah belajar, ujiannya tidak bisa." },
  { pattern: "〜ために", meaning: "Demi / Untuk...", example: "健康のために運動します。", trans: "Berolahraga demi kesehatan." }
];

const exportData = { ...oldLevels };

// Append grammar
if (exportData.n5) {
  exportData.n5.grammar = [...exportData.n5.grammar, ...extraGrammar];
  exportData.n5.grammarCount = exportData.n5.grammar.length;
}

const output = "export const levels = " + JSON.stringify(exportData, null, 2) + ";\n";
fs.writeFileSync('./src/data.js', output);

console.log('N5 Grammar:', exportData.n5.grammar.length, '(was 39, added', extraGrammar.length, ')');
console.log('N5 Kanji:', exportData.n5.kanji.length);
console.log('N5 Vocab:', exportData.n5.vocabSessions.reduce((a,s) => a + s.items.length, 0));
