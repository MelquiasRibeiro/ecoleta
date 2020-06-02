module.exports = {
  env: {
    commonjs: false,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this':'off',
    'no-param-reassign': 'off',
    'camelcase': 'off',
    'no-unused-vars': ['error',{'argsIgnorePattern': 'next'}]
  },
};
