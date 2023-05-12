/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'react-hooks/exhaustive-deps': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports'
      }
    ],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
  }
}

module.exports = config
