module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["jest", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "no-promise-executor-return": "off",
    "no-plusplus": "off",
  },
};
