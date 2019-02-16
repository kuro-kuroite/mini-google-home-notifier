"use strict";

var _listChangedFiles = require("../shared/listChangedFiles");

// NOTE: npm-scripts is used only development

/* eslint-disable import/no-extraneous-dependencies */
var filePath = process.argv[2];
var outPath = process.argv[3] || 'dist';
var splitCommand = "yarn babel ".concat(filePath, " --out-dir ").concat(outPath).split(' ');
(0, _listChangedFiles.exec)(splitCommand[0], splitCommand.slice(1));
