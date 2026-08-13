/**
 * Program: Tiny Cinema
 * Date: August 12, 2026
 * Description: This file configures CSS processing for the Tiny Cinema build pipeline.
 * Input: PostCSS receives the application's stylesheet content during development and production builds.
 * Processing and Output: It runs the Tailwind CSS PostCSS plugin and outputs browser-ready processed styles.
 */

// CSS plugins: register Tailwind with the PostCSS processor.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

// Configuration output: expose the plugin settings to PostCSS.
export default config;
