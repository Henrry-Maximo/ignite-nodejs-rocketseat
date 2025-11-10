import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      quotes: ['error', 'single'], // Enforce single quotes
      semi: ['error', 'never'],    // Remove pontos e vírgulasa
      indent: ['error', 2], // Usa 2 espaços para identação
      'object-curly-spacing': ['error', 'always'], // Espaço dentro de objetos { chave: valor }
      'array-bracket-spacing': ['error', 'never'], // Sem espaços dentro de arrays [1, 2, 3]
      'arrow-parens': ['error', 'always'], // Sempre usar parênteses em arrow functions
      'comma-dangle': ['error', 'always-multiline'], // Vírgula no final de listas multi-linhas
      'no-multiple-empty-lines': ['error', { 'max': 1 }], // No máximo 1 linha vazia consecutiva
      'prefer-const': 'error', // Prefere 'const' quando a variável não é reatribuída
      'eqeqeq': ['error', 'always'], // Força uso de '===' e '!==' ao invés de '==' e '!='
      'no-trailing-spaces': 'error', // Remove espaços em branco no final das linhas
      '@typescript-eslint/no-unused-vars': [ // Ignora variaveis não usadas com o prefixo _
        'error',
        {
          'args': 'all',
          'argsIgnorePattern': '^_',
          'caughtErrors': 'all',
          'caughtErrorsIgnorePattern': '^_',
          'destructuredArrayIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'ignoreRestSiblings': true,
        },
      ],
    },
  },
]