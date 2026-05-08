import fs from 'fs';
import { levels as oldLevels } from './src/data.js';
import { vocabN5 } from './vocab_n5.js';
import { vocabN4 } from './vocab_n4.js';
import { vocabN3, vocabN2, vocabN1 } from './vocab_n3n2n1.js';

const exportData = { ...oldLevels };

const formatSessions = (data) => data.map((s, i) => ({ id: i + 1, title: s.title, items: s.items }));

if (exportData.n5) exportData.n5.vocabSessions = formatSessions(vocabN5);
if (exportData.n4) exportData.n4.vocabSessions = formatSessions(vocabN4);
if (exportData.n3) exportData.n3.vocabSessions = formatSessions(vocabN3);
if (exportData.n2) exportData.n2.vocabSessions = formatSessions(vocabN2);
if (exportData.n1) exportData.n1.vocabSessions = formatSessions(vocabN1);

const output = "export const levels = " + JSON.stringify(exportData, null, 2) + ";\n";
fs.writeFileSync('./src/data.js', output);

const counts = {
  N5: vocabN5.reduce((a,s) => a + s.items.length, 0),
  N4: vocabN4.reduce((a,s) => a + s.items.length, 0),
  N3: vocabN3.reduce((a,s) => a + s.items.length, 0),
  N2: vocabN2.reduce((a,s) => a + s.items.length, 0),
  N1: vocabN1.reduce((a,s) => a + s.items.length, 0),
};
console.log('Vocab successfully added:');
Object.entries(counts).forEach(([k,v]) => console.log(`  ${k}: ${v} words`));
console.log(`  Total: ${Object.values(counts).reduce((a,b) => a+b, 0)} words`);
