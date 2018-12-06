/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var _eslint = require('../eslint');

console.log('Linting changed files...');

if (
  (0, _eslint.runESLint)({
    onlyChanged: true,
  })
) {
  console.log('Lint passed for changed files.');
} else {
  console.log('Lint failed for changed files.');
  process.exit(1);
}
