"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runESLint = runESLint;

var minimatch = _interopRequireWildcard(require("minimatch"));

var _eslint = require("eslint");

var _listChangedFiles = require("../shared/listChangedFiles");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var allPaths = ['**/*.js'];
var changedFiles = null;

function intersect(files, patterns) {
  var intersection = [];
  patterns.forEach(function (pattern) {
    intersection = _toConsumableArray(intersection).concat(_toConsumableArray(minimatch.match(files, pattern, {
      matchBase: true
    })));
  });
  return _toConsumableArray(new Set(intersection));
}

function runESLintOnFilesWithOptions(filePatterns, onlyChanged, options) {
  var cli = new _eslint.CLIEngine(options);
  var formatter = cli.getFormatter();

  if (onlyChanged && changedFiles === null) {
    // Calculate lazily.
    changedFiles = _toConsumableArray((0, _listChangedFiles.listChangedFiles)());
  }

  var finalFilePatterns = onlyChanged ? intersect(changedFiles, filePatterns) : filePatterns;
  var report = cli.executeOnFiles(finalFilePatterns); // When using `ignorePattern`, eslint will show `File ignored...` warnings for any ignores.
  // We don't care because we *expect* some passed files will be ignores if `ignorePattern` is used.

  var messages = report.results.filter(function (item) {
    if (!onlyChanged) {
      // Don't suppress the message on a full run.
      // We only expect it to happen for "only changed" runs.
      return true;
    }

    var ignoreMessage = 'File ignored because of a matching ignore pattern. Use "--no-ignore" to override.';
    return !(item.messages[0] && item.messages[0].message === ignoreMessage);
  });
  var ignoredMessageCount = report.results.length - messages.length;
  return {
    output: formatter(messages),
    errorCount: report.errorCount,
    warningCount: report.warningCount - ignoredMessageCount
  };
}

function runESLint(_ref) {
  var onlyChanged = _ref.onlyChanged;

  if (typeof onlyChanged !== 'boolean') {
    throw new Error('Pass options.onlyChanged as a boolean.');
  }

  var _runESLintOnFilesWith = runESLintOnFilesWithOptions(allPaths, onlyChanged),
      errorCount = _runESLintOnFilesWith.errorCount,
      warningCount = _runESLintOnFilesWith.warningCount,
      output = _runESLintOnFilesWith.output;

  console.log(output);
  return errorCount === 0 && warningCount === 0;
} // eslint-disable-next-line import/prefer-default-export