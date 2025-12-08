import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Base ESLint recommended rules
  eslint.configs.recommended,
  // TypeScript plugin recommended rules
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
    },
  },
);
