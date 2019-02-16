// NOTE: npm-scripts is used only development
/* eslint-disable import/no-extraneous-dependencies */
import { exec } from '../shared/listChangedFiles';

const filePath = process.argv[2];
const outPath = process.argv[3] || 'dist';
const splitCommand = `yarn babel ${filePath} --out-dir ${outPath}`.split(' ');

exec(splitCommand[0], splitCommand.slice(1));
