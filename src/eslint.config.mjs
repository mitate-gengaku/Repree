import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tailwindcss from 'eslint-plugin-tailwindcss';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import importAlias from 'eslint-plugin-import-alias';
import tseslint from '@typescript-eslint/eslint-plugin';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths'
import tseslintParser from '@typescript-eslint/parser';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'unused-imports': unusedImports,
      'tailwindcss': tailwindcss,
      'import-alias': importAlias,
      'import': importPlugin,
      'no-relative-import-paths': noRelativeImportPaths
    },
    settings: {
      tailwindcss: {
        callees: ['cn'],
      },
    },
    rules: {
      // eslint
      'array-bracket-newline': ['error', { multiline: true }],
      'arrow-spacing': ['error', { before: true, after: true }],
      'block-spacing': ['error', 'always'],
      'sort-vars': ['error', { ignoreCase: true }],
      'sort-imports': 'off',
  
      // tailwindcss
      'tailwindcss/enforces-shorthand': 'off',
      'tailwindcss/no-custom-classname': 'off',
  
      // imports
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: false },
        },
      ],
  
      // @typescript-eslint
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
  
      // unused imports
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
  
      // import-alias
      'import-alias/import-alias': ['error', { relativeDepth: 2 }],
  
      // next
      '@next/next/no-img-element': 'off',

      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        {
          allowedDepth: 0,
          allowSameFolder: true,
          rootDir: 'src',
          prefix: '@'
        }
      ],
      'no-restricted-imports': ['error', {
        patterns: [
          './*',
          '../*'
        ]
      }]
    }
  }
];

export default eslintConfig;
