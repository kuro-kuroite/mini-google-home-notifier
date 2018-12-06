module.exports = {
  "*.min.*": [
    "git add",
  ],
  "*.babel.js": [
    "yarn babel",
    "yarn prettier",
    "git add",
  ],
  "*.js": [
    "yarn prettier",
    "git add",
  ],
  "*.{json,yml}": [
    "git add",
  ],
  "*.{md}": [
    "git add",
  ],
};
