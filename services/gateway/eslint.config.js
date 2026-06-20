import js from "@eslint/js";

import prettierConfig from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist", "node_modules", "**/*.{cjs,mjs}", "build", "coverage"],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,js}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
      parserOptions: {
        ecmaFeatures: {
          modules: true,
        },
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      "arrow-body-style": ["error", "as-needed"],
      "prettier/prettier": "error",
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-console": ["warn"],
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  {
    name: "prettier-config",
    ...prettierConfig,
  },
);
