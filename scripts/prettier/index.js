/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict'; // Based on similar script in Jest
// https://github.com/facebook/jest/blob/a7acc5ae519613647ff2c253dd21933d6f94b47f/scripts/prettier.js

var _chalk = _interopRequireDefault(require("chalk"));

var fs = _interopRequireWildcard(require("fs"));

var path = _interopRequireWildcard(require("path"));

var glob = _interopRequireWildcard(require("glob"));

var prettier = _interopRequireWildcard(require("prettier"));

var _listChangedFiles = require("../shared/listChangedFiles");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prettierConfigPath = path.resolve(process.cwd(), './.prettierrc.js');
var mode = process.argv[2] || 'check';
var shouldWrite = mode === 'write' || mode === 'write-changed';
var onlyChanged = mode === 'check-changed' || mode === 'write-changed';
var changedFiles = onlyChanged ? (0, _listChangedFiles.listChangedFiles)() : null;
var didWarn = false;
var didError = false;
var files = glob.sync('**/*.js', {
  ignore: ['**/node_modules/**', '**/dist/**']
}).filter(function (f) {
  return !onlyChanged || changedFiles.has(f);
});

if (!files.length) {
  process.exit(0);
}

files.forEach(function (file) {
  var options = prettier.resolveConfig.sync(file, {
    config: prettierConfigPath
  });

  try {
    var input = fs.readFileSync(file, 'utf8');

    if (shouldWrite) {
      var output = prettier.format(input, options);

      if (output !== input) {
        fs.writeFileSync(file, output, 'utf8');
      }
    } else {
      if (!prettier.check(input, options)) {
        if (!didWarn) {
          console.log('\n' + _chalk.default.red("  This project uses prettier to format all JavaScript code.\n") + _chalk.default.dim("    Please run ") + _chalk.default.reset('yarn prettier:all') + _chalk.default.dim(" and add changes to files listed below to your commit:") + "\n\n");
          didWarn = true;
        }

        console.log(file);
      }
    }
  } catch (error) {
    didError = true;
    console.log('\n\n' + error.message);
    console.log(file);
  }
});

if (didWarn || didError) {
  process.exit(1);
}
