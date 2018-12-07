"use strict";

var fs = _interopRequireWildcard(require("fs"));

var glob = _interopRequireWildcard(require("glob"));

var babel = _interopRequireWildcard(require("@babel/core"));

var _cosmiconfig = _interopRequireDefault(require("cosmiconfig"));

var _listChangedFiles = require("../shared/listChangedFiles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// NOTE: npm-scripts is used only development

/* eslint-disable import/no-extraneous-dependencies */
var mode = process.argv[2] || 'check';
var shouldWrite = mode === 'write' || mode === 'write-changed';
var onlyChanged = mode === 'check-changed' || mode === 'write-changed';
var changedFiles = onlyChanged ? (0, _listChangedFiles.listChangedFiles)() : null;
var didWarn = false;
var didError = false;
var files = glob.sync('**/*.babel.js', {
  ignore: ['**/node_modules/**', '**/dist/**']
}).filter(function (f) {
  return !onlyChanged || changedFiles.has(f);
});

if (!files.length) {
  process.exit(0);
}

files.forEach(function (file) {
  var options = (0, _cosmiconfig.default)('babel').searchSync().config;

  try {
    var input = fs.readFileSync(file, 'utf8');

    if (shouldWrite) {
      var _babel$transformSync = babel.transformSync(input, options),
          code = _babel$transformSync.code;

      var output = code;

      if (output !== input) {
        fs.writeFileSync(file.replace('.babel', ''), output, 'utf8');
      }
    }
  } catch (error) {
    didError = true;
    console.log("\n\n".concat(error.message));
    console.log(file);
  }
});

if (didWarn || didError) {
  process.exit(1);
}