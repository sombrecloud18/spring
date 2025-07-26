import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginImport from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    }
  },
  {
    plugins: {
      react: pluginReact,
      import: pluginImport
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'arrow-body-style': ['error', 'as-needed'],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index']
        }
      ]
    },
    settings: {
      react: {
        version: '19.1.0'
      }
    }
  },
  prettierConfig,
  {
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          tabWidth: 2,
          printWidth: 100,
          trailingComma: 'all',
          singleQuote: true,
          endOfLine: 'auto'
        }
      ]
    }
  },
  {
    ignores: [
      '**/node_modules/'
    ]
  }
];