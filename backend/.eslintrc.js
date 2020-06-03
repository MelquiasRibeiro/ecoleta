module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base','prettier', 'eslint:recommended',
  'plugin:@typescript-eslint/recommended',],
  plugins: ['prettier','@typescript-eslint',],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
   ],
    'prettier/prettier': 'error',
    'class-methods-use-this':'off',
    'no-param-reassign': 'off',
    'camelcase': 'off',
    'no-unused-vars': ['error',{'argsIgnorePattern': 'next'}]
  },
};
