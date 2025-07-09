/** eslint.config.js – Flat Config com React, TypeScript e A11y */

import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

export default [
  {
    /* ---------- ficheiros TypeScript/TSX ---------- */
    files: ['**/*.{ts,tsx}'],

    plugins: {
      // ordem não importa
      '@typescript-eslint': tsPlugin,
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      'jsx-a11y': jsxA11y,
    },

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },

    rules: {
      /* --- Regras TypeScript recomendadas --- */
      ...tsPlugin.configs.recommended.rules,

      /* --- Regras React --- */
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      /* --- Acessibilidade WCAG nível A --- */
      ...jsxA11y.configs.recommended.rules,
    },
  },
]
