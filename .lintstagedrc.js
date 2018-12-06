module.exports = {
  "*.min.*": [
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
