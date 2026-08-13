/**
 * Program: Tiny Cinema
 * Date: August 12, 2026
 * Description: This file defines the framework configuration used to build and run the Tiny Cinema application.
 * Input: Next.js reads these options during development, compilation, and production startup.
 * Processing and Output: The configuration enables React Compiler processing and outputs the settings consumed by the Next.js toolchain.
 */
import type { NextConfig } from "next";

// Framework options: enable automatic React optimization during compilation.
const nextConfig: NextConfig = {
  reactCompiler: true,
};

// Configuration output: expose the settings to Next.js.
export default nextConfig;
