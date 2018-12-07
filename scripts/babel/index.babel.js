// NOTE: npm-scripts is used only development
/* eslint-disable import/no-extraneous-dependencies */
import * as fs from 'fs';
import * as glob from 'glob';
import * as babel from '@babel/core';
import cosmiconfig from 'cosmiconfig';
import { listChangedFiles } from '../shared/listChangedFiles';

const mode = process.argv[2] || 'check';
const shouldWrite = mode === 'write' || mode === 'write-changed';
const onlyChanged = mode === 'check-changed' || mode === 'write-changed';

const changedFiles = onlyChanged ? listChangedFiles() : null;
const didWarn = false;
let didError = false;

const files = glob
  .sync('**/*.babel.js', { ignore: ['**/node_modules/**', '**/dist/**'] })
  .filter(f => !onlyChanged || changedFiles.has(f));

if (!files.length) {
  process.exit(0);
}

files.forEach(file => {
  const options = cosmiconfig('babel').searchSync().config;

  try {
    const input = fs.readFileSync(file, 'utf8');
    if (shouldWrite) {
      const { code } = babel.transformSync(input, options);
      const output = code;
      if (output !== input) {
        fs.writeFileSync(file.replace('.babel', ''), output, 'utf8');
      }
    }
  } catch (error) {
    didError = true;
    console.log(`\n\n${error.message}`);
    console.log(file);
  }
});

if (didWarn || didError) {
  process.exit(1);
}
