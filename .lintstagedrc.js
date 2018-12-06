module.exports = {
  "*.min.*": [
    "git add",
  ],
  "*.babel.js": [
    "yarn babel",
    "yarn prettier",
    "yarn eslint",
    "git add",
  ],
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
};
