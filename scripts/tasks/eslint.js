"use strict";

var _eslint = require("../eslint");

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// NOTE: npm-scripts is used only development

/* eslint-disable import/no-extraneous-dependencies */
console.log('Linting all files...'); // https://circleci.com/docs/2.0/env-vars/#circleci-environment-variable-descriptions

if (!process.env.CI) {
  console.log('Hint: run `yarn .linc` to only lint changed files.');
}

if ((0, _eslint.runESLint)({
  onlyChanged: false
})) {
  console.log('Lint passed.');
} else {
  console.log('Lint failed.');
  process.exit(1);
}