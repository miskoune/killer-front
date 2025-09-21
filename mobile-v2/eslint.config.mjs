import eslint from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['**/node_modules/**', '**/dist/**', '**/build/**']),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { react, prettier },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      globals: globals.node,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'react/jsx-fragments': ['error', 'syntax'],
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'function-declaration',
        },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-void': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-require-imports': 'off',
      'no-console': 'error',
    },
  },
]);
