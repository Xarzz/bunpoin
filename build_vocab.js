import fs from 'fs';
import { levels as oldLevels } from './src/data.js';
import { vocabN5 } from './vocab_n5.js';
import { vocabN5extra1 } from './vocab_n5_extra.js';
import { vocabN5extra2 } from './vocab_n5_extra2.js';
import { vocabN5extra3 } from './vocab_n5_extra3.js';
import { vocabN5extra4 } from './vocab_n5_extra4.js';
import { vocabN4 } from './vocab_n4.js';
import { vocabN3, vocabN2, vocabN1 } from './vocab_n3n2n1.js';

const exportData = { ...oldLevels };
const fmt = (data) => data.map((s, i) => ({ id: i + 1, title: s.title, items: s.items }));

const allN5 = [...vocabN5, ...vocabN5extra1, ...vocabN5extra2, ...vocabN5extra3, ...vocabN5extra4];

if (exportData.n5) exportData.n5.vocabSessions = fmt(allN5);
if (exportData.n4) exportData.n4.vocabSessions = fmt(vocabN4);
if (exportData.n3) exportData.n3.vocabSessions = fmt(vocabN3);
if (exportData.n2) exportData.n2.vocabSessions = fmt(vocabN2);
if (exportData.n1) exportData.n1.vocabSessions = fmt(vocabN1);

const output = "export const levels = " + JSON.stringify(exportData, null, 2) + ";\n";
fs.writeFileSync('./src/data.js', output);

const allCounts = { N5: allN5, N4: vocabN4, N3: vocabN3, N2: vocabN2, N1: vocabN1 };
console.log('Vocab berhasil ditambahkan:');
Object.entries(allCounts).forEach(([k,v]) => {
  const words = v.reduce((a,s) => a + s.items.length, 0);
  console.log(`  ${k}: ${words} kata (${v.length} topik)`);
});
const total = Object.values(allCounts).reduce((a,v) => a + v.reduce((b,s) => b + s.items.length, 0), 0);
console.log(`  Total: ${total} kata`);
