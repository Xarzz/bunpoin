import fs from 'fs';
import { levels as oldLevels } from './src/data.js';

const hiragana = [
  // Seion
  {char:'あ',ro:'a'}, {char:'い',ro:'i'}, {char:'う',ro:'u'}, {char:'え',ro:'e'}, {char:'お',ro:'o'},
  {char:'か',ro:'ka'}, {char:'き',ro:'ki'}, {char:'く',ro:'ku'}, {char:'け',ro:'ke'}, {char:'こ',ro:'ko'},
  {char:'さ',ro:'sa'}, {char:'し',ro:'shi'}, {char:'す',ro:'su'}, {char:'せ',ro:'se'}, {char:'そ',ro:'so'},
  {char:'た',ro:'ta'}, {char:'ち',ro:'chi'}, {char:'つ',ro:'tsu'}, {char:'て',ro:'te'}, {char:'と',ro:'to'},
  {char:'な',ro:'na'}, {char:'に',ro:'ni'}, {char:'ぬ',ro:'nu'}, {char:'ね',ro:'ne'}, {char:'の',ro:'no'},
  {char:'は',ro:'ha'}, {char:'ひ',ro:'hi'}, {char:'ふ',ro:'fu'}, {char:'へ',ro:'he'}, {char:'ほ',ro:'ho'},
  {char:'ま',ro:'ma'}, {char:'み',ro:'mi'}, {char:'む',ro:'mu'}, {char:'め',ro:'me'}, {char:'も',ro:'mo'},
  {char:'や',ro:'ya'}, {char:'ゆ',ro:'yu'}, {char:'よ',ro:'yo'},
  {char:'ら',ro:'ra'}, {char:'り',ro:'ri'}, {char:'る',ro:'ru'}, {char:'れ',ro:'re'}, {char:'ろ',ro:'ro'},
  {char:'わ',ro:'wa'}, {char:'を',ro:'wo'}, {char:'ん',ro:'n'},
  // Dakuon
  {char:'が',ro:'ga'}, {char:'ぎ',ro:'gi'}, {char:'ぐ',ro:'gu'}, {char:'げ',ro:'ge'}, {char:'ご',ro:'go'},
  {char:'ざ',ro:'za'}, {char:'じ',ro:'ji'}, {char:'ず',ro:'zu'}, {char:'ぜ',ro:'ze'}, {char:'ぞ',ro:'zo'},
  {char:'だ',ro:'da'}, {char:'ぢ',ro:'ji'}, {char:'づ',ro:'zu'}, {char:'で',ro:'de'}, {char:'ど',ro:'do'},
  {char:'ば',ro:'ba'}, {char:'び',ro:'bi'}, {char:'ぶ',ro:'bu'}, {char:'べ',ro:'be'}, {char:'ぼ',ro:'bo'},
  // Handakuon
  {char:'ぱ',ro:'pa'}, {char:'ぴ',ro:'pi'}, {char:'ぷ',ro:'pu'}, {char:'ぺ',ro:'pe'}, {char:'ぽ',ro:'po'},
  // Yoon
  {char:'きゃ',ro:'kya'}, {char:'きゅ',ro:'kyu'}, {char:'きょ',ro:'kyo'},
  {char:'しゃ',ro:'sha'}, {char:'しゅ',ro:'shu'}, {char:'しょ',ro:'sho'},
  {char:'ちゃ',ro:'cha'}, {char:'ちゅ',ro:'chu'}, {char:'ちょ',ro:'cho'},
  {char:'にゃ',ro:'nya'}, {char:'にゅ',ro:'nyu'}, {char:'にょ',ro:'nyo'},
  {char:'ひゃ',ro:'hya'}, {char:'ひゅ',ro:'hyu'}, {char:'ひょ',ro:'hyo'},
  {char:'みゃ',ro:'mya'}, {char:'みゅ',ro:'myu'}, {char:'みょ',ro:'myo'},
  {char:'りゃ',ro:'rya'}, {char:'りゅ',ro:'ryu'}, {char:'りょ',ro:'ryo'},
  {char:'ぎゃ',ro:'gya'}, {char:'ぎゅ',ro:'gyu'}, {char:'ぎょ',ro:'gyo'},
  {char:'じゃ',ro:'ja'}, {char:'じゅ',ro:'ju'}, {char:'じょ',ro:'jo'},
  {char:'びゃ',ro:'bya'}, {char:'びゅ',ro:'byu'}, {char:'びょ',ro:'byo'},
  {char:'ぴゃ',ro:'pya'}, {char:'ぴゅ',ro:'pyu'}, {char:'ぴょ',ro:'pyo'}
];

const katakana = [
  // Seion
  {char:'ア',ro:'a'}, {char:'イ',ro:'i'}, {char:'ウ',ro:'u'}, {char:'エ',ro:'e'}, {char:'オ',ro:'o'},
  {char:'カ',ro:'ka'}, {char:'キ',ro:'ki'}, {char:'ク',ro:'ku'}, {char:'ケ',ro:'ke'}, {char:'コ',ro:'ko'},
  {char:'サ',ro:'sa'}, {char:'シ',ro:'shi'}, {char:'ス',ro:'su'}, {char:'セ',ro:'se'}, {char:'ソ',ro:'so'},
  {char:'タ',ro:'ta'}, {char:'チ',ro:'chi'}, {char:'ツ',ro:'tsu'}, {char:'テ',ro:'te'}, {char:'ト',ro:'to'},
  {char:'ナ',ro:'na'}, {char:'ニ',ro:'ni'}, {char:'ヌ',ro:'nu'}, {char:'ネ',ro:'ne'}, {char:'ノ',ro:'no'},
  {char:'ハ',ro:'ha'}, {char:'ヒ',ro:'hi'}, {char:'フ',ro:'fu'}, {char:'ヘ',ro:'he'}, {char:'ホ',ro:'ho'},
  {char:'マ',ro:'ma'}, {char:'ミ',ro:'mi'}, {char:'ム',ro:'mu'}, {char:'メ',ro:'me'}, {char:'モ',ro:'mo'},
  {char:'ヤ',ro:'ya'}, {char:'ユ',ro:'yu'}, {char:'ヨ',ro:'yo'},
  {char:'ラ',ro:'ra'}, {char:'リ',ro:'ri'}, {char:'ル',ro:'ru'}, {char:'レ',ro:'re'}, {char:'ロ',ro:'ro'},
  {char:'ワ',ro:'wa'}, {char:'ヲ',ro:'wo'}, {char:'ン',ro:'n'},
  // Dakuon
  {char:'ガ',ro:'ga'}, {char:'ギ',ro:'gi'}, {char:'グ',ro:'gu'}, {char:'ゲ',ro:'ge'}, {char:'ゴ',ro:'go'},
  {char:'ザ',ro:'za'}, {char:'ジ',ro:'ji'}, {char:'ズ',ro:'zu'}, {char:'ゼ',ro:'ze'}, {char:'ゾ',ro:'zo'},
  {char:'ダ',ro:'da'}, {char:'ヂ',ro:'ji'}, {char:'ヅ',ro:'zu'}, {char:'デ',ro:'de'}, {char:'ド',ro:'do'},
  {char:'バ',ro:'ba'}, {char:'ビ',ro:'bi'}, {char:'ブ',ro:'bu'}, {char:'ベ',ro:'be'}, {char:'ボ',ro:'bo'},
  // Handakuon
  {char:'パ',ro:'pa'}, {char:'ピ',ro:'pi'}, {char:'プ',ro:'pu'}, {char:'ペ',ro:'pe'}, {char:'ポ',ro:'po'},
  // Yoon
  {char:'キャ',ro:'kya'}, {char:'キュ',ro:'kyu'}, {char:'キョ',ro:'kyo'},
  {char:'シャ',ro:'sha'}, {char:'シュ',ro:'shu'}, {char:'ショ',ro:'sho'},
  {char:'チャ',ro:'cha'}, {char:'チュ',ro:'chu'}, {char:'チョ',ro:'cho'},
  {char:'ニャ',ro:'nya'}, {char:'ニュ',ro:'nyu'}, {char:'ニョ',ro:'nyo'},
  {char:'ヒャ',ro:'hya'}, {char:'ヒュ',ro:'hyu'}, {char:'ヒョ',ro:'hyo'},
  {char:'ミャ',ro:'mya'}, {char:'ミュ',ro:'myu'}, {char:'ミョ',ro:'myo'},
  {char:'リャ',ro:'rya'}, {char:'リュ',ro:'ryu'}, {char:'リョ',ro:'ryo'},
  {char:'ギャ',ro:'gya'}, {char:'ギュ',ro:'gyu'}, {char:'ギョ',ro:'gyo'},
  {char:'ジャ',ro:'ja'}, {char:'ジュ',ro:'ju'}, {char:'ジョ',ro:'jo'},
  {char:'ビャ',ro:'bya'}, {char:'ビュ',ro:'byu'}, {char:'ビョ',ro:'byo'},
  {char:'ピャ',ro:'pya'}, {char:'ピュ',ro:'pyu'}, {char:'ピョ',ro:'pyo'}
];

function chunk(arr, size) {
  const res = [];
  for(let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res;
}

const exportData = {
  kana: {
    id: 'kana', label: 'Kana', color: '#ff006e', title: 'Fondasi (Hiragana & Katakana)',
    desc: 'Langkah pertama sebelum memulai JLPT. Pelajari dan ikuti sesi kuis Hiragana & Katakana dari awal hingga mahir.',
    hiraganaSessions: chunk(hiragana, 10).map((items, i) => ({ id: i+1, title: 'Sesi ' + (i+1), items })),
    katakanaSessions: chunk(katakana, 10).map((items, i) => ({ id: i+1, title: 'Sesi ' + (i+1), items })),
    // We mock these so the UI logic doesn't break
    kanji: [], grammar: [], quiz: [], reading: null, listening: null, writing: []
  },
  ...oldLevels
};

const output = "export const levels = " + JSON.stringify(exportData, null, 2) + ";\n";
fs.writeFileSync('d:/DATAATAR/portofolio/jlpt/src/data.js', output);
console.log('Successfully generated Kana level');
