/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.listChangedFiles = void 0;

var _child_process = require('child_process');

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance');
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === '[object Arguments]'
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

var exec = function exec(command, args) {
  console.log('> ' + [command].concat(args).join(' '));
  var options = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8',
  };
  return (0, _child_process.execFileSync)(command, args, options);
};

var execGitCmd = function execGitCmd(args) {
  return exec('git', args)
    .trim()
    .toString()
    .split('\n');
};

var listChangedFiles = function listChangedFiles() {
  var mergeBase = execGitCmd(['merge-base', 'HEAD', 'master']);
  return new Set(
    _toConsumableArray(
      execGitCmd(['diff', '--name-only', '--diff-filter=ACMRTUB', mergeBase]),
    ).concat(
      _toConsumableArray(
        execGitCmd(['ls-files', '--others', '--exclude-standard']),
      ),
    ),
  );
};

exports.listChangedFiles = listChangedFiles;
