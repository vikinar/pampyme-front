module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import', 'react', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-require-imports': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
  settings: {
    next: {
      rootDir: 'apps/next/',
    },
  },
  root: true,
}
