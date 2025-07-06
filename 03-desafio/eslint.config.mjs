import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: { globals: globals.node },
    rules: {
      // Vírgula obrigatória
      "comma-dangle": ["error", "always-multiline"],

      // Ponto e vírgula obrigatório
      "semi": ["error", "always"],

      // Aspas simples
      "quotes": ["error", "double"],

      // Indentação 2 espaços
      "indent": ["error", 2],

      // Sem espaços em branco no final
      "no-trailing-spaces": "error",

      // Linha em branco no final do arquivo
      "eol-last": ["error", "always"],
    },
  },
  tseslint.configs.recommended,
]);
