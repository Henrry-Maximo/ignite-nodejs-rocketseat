import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    rules: {
      "indent": ["error", 2], // two spaces
      "quotes": ["error", "double"], // ""
      "semi": ["error", "always"], // ;
      "max-len": ["error", { "code": 80 }], 
      "eqeqeq": ["error", "always"], // identify type
      "no-unused-vars": ["error", { "vars": "all", "args": "none" }], //not used
      "no-var": "error",
    },
  },
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];