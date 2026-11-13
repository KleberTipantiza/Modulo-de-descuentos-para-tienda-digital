import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["src/**/*.js"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
    rules: {
      "no-var": "error",
      eqeqeq: ["error", "always"],
      "no-unused-vars": "error",
      curly: ["error", "all"],
    },
  },
]);