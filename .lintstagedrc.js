module.exports = {
  "linters": {
    "*.min.*": [
      "git add",
    ],
    "*.babel.js": [
      "yarn babel",
      "yarn prettier",
      "yarn eslint",
      "git add",
    ],
    "{,!(scripts)/}**/*.js": [
      "yarn prettier",
      "yarn eslint",
      "git add",
    ],
    // for config file
    "*.js": [
      "yarn prettier",
      "yarn eslint",
      "git add",
    ],
    "*.{json,yml}": [
      "git add",
    ],
    "*.{md}": [
      "git add",
    ],
  },
  "ignore": [
    "**/dist/*.js",
  ],
};
