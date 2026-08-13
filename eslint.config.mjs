/**
 * Program: Tiny Cinema
 * Date: August 12, 2026
 * Description: This file defines the static-analysis rules used to check Tiny Cinema source code.
 * Input: ESLint reads JavaScript and TypeScript project files together with the imported Next.js rule sets.
 * Processing and Output: It applies framework and TypeScript checks, ignores generated files, and outputs lint diagnostics for developers.
 */
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Lint rules: combine Next.js, TypeScript, and project ignore settings.
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

// Configuration output: expose the completed rule set to ESLint.
export default eslintConfig;
