module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'eslint-config-prettier', "plugin:@typescript-eslint/recommended"],
  plugins: ['@typescript-eslint'],
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  rules: {
  },
};
