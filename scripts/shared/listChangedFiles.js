"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listChangedFiles = exports.exec = void 0;

var _child_process = require("child_process");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var exec = function exec(command, args) {
  console.log("> ".concat([command].concat(args).join(' ')));
  var options = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8'
  };
  return (0, _child_process.execFileSync)(command, args, options);
};

exports.exec = exec;

var execGitCmd = function execGitCmd(args) {
  return exec('git', args).trim().toString().split('\n');
};

var listChangedFiles = function listChangedFiles() {
  var mergeBase = execGitCmd(['merge-base', 'HEAD', 'master']);
  return new Set(_toConsumableArray(execGitCmd(['diff', '--name-only', '--diff-filter=ACMRTUB', mergeBase])).concat(_toConsumableArray(execGitCmd(['ls-files', '--others', '--exclude-standard']))));
}; // eslint-disable-next-line import/prefer-default-export


exports.listChangedFiles = listChangedFiles;