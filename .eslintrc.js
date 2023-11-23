module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-console': 'error',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    'no-debugger': 'warn',
    "indent": ["off", 2],
    "@typescript-eslint/no-explicit-any": ["off"],
    "eol-last": 0,
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
  }
}
