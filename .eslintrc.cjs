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
    'react/prop-types': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
  settings: {
    next: {
      rootDir: 'apps/next/',
      'import/resolver': {
        node: {
          extensions: [
            '.web.ts',
            '.native.ts',
            '.web.tsx',
            '.native.tsx',
            '.ts',
            '.tsx',
            '.js',
            '.jsx',
          ],
        },
      },
    },
    'import/resolver': {
      node: {
        extensions: ['.web.ts', '.native.ts', '.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
  root: true,
}
