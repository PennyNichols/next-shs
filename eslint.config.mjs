import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['**/node_modules/', '**/.next/', '**/dist/', '**/build/']),
  {
    plugins: {
      prettier,
      'unused-imports': unusedImports,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      indent: ['error', 2],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],

      'key-spacing': [
        'error',
        {
          afterColon: true,
        },
      ],

      'no-unused-vars': 'warn',
      'no-console': 'warn',

      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
        },
      ],

      'no-trailing-spaces': 'error',
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'warn',

      'max-len': [
        'error',
        {
          code: 120,
        },
      ],

      'arrow-spacing': 'error',
      'block-spacing': ['error', 'always'],

      'brace-style': [
        'error',
        '1tbs',
        {
          allowSingleLine: true,
        },
      ],

      'unused-imports/no-unused-imports': 'error',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
]);
