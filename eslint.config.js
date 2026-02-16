import js from '@eslint/js'

import prettierConfig from 'eslint-config-prettier'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', '**/*.{cjs,mjs}', '.react-router']
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    plugins: {
      prettier,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'arrow-body-style': ['error', 'as-needed'],
      'prettier/prettier': 'error',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function'
        }
      ],
      'react-refresh/only-export-components': ['off', { allowConstantExport: true }],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type']
    }
  },
  {
    name: 'prettier-config',
    ...prettierConfig
  }
)
