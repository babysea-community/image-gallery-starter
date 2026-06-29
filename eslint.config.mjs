import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      '.next/**',
      '.pnpm-store/**',
      'node_modules/**',
      'next-env.d.ts',
      'public/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@next/next/no-img-element': 'off',
      'preserve-caught-error': 'off',
      'no-useless-assignment': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
];
