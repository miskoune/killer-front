module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'expo',
    'prettier', // -> [eslint-config-prettier]
    'eslint:recommended', // -> [eslint]
    'plugin:react/recommended', // [eslint-plugin-react, eslint-plugin-react-hooks, eslint-config-react-app ...]
    'plugin:@typescript-eslint/recommended', // [typescript eslint rules..]
    'plugin:prettier/recommended', // [typescript eslint rules..]
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    '@typescript-eslint/no-empty-function': 'off', // Disable this rule to make empty function for testing case or default props
    '@typescript-eslint/no-var-requires': 'off', // Disable this rule to enable ES5 imports (const something = require('something');)
    'react/jsx-fragments': ['error', 'syntax'], // Enforce the use of Fragment|React.Fragment instead of <></>
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
    'react/require-default-props': 'off', // Disable default props forcing when props is optional
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }], // Only use react inside .tsx files
    'react/jsx-props-no-spreading': 'off', // Disable this rule to make props spreading inside .spec files
    'react/jsx-uses-react': 'off', // React in v17 can now be use without importing React from 'react'
    'react/react-in-jsx-scope': 'off', // React in v17 can now be use without importing React from 'react'
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ], // Forbid the import of external modules that are not declared in the package.json's dependencies
    'react/function-component-definition': [
      2,
      { namedComponents: 'function-declaration' },
    ],
    /* Use import/extensions workaround to import files with .ts/.tsx extensions
     Issue here: https://github.com/benmosher/eslint-plugin-import/issues/1615 */
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
          order:
            'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
      },
    ],
    /**
     * Use '@typescript-eslint/no-shadow' since TS warn for enums with 'no-shadow'.
     * @link https://github.com/typescript-eslint/typescript-eslint/issues/2483
     */
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-void': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { fixStyle: 'inline-type-imports' },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false, // still error if you use a function before its declaration
        classes: true, // still error if you instantiate a class before it's declared
        variables: false, // ✅ allow variables (styles) to be “hoisted”
      },
    ],
  },
};
