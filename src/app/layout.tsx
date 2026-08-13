/**
 * Program: Tiny Cinema
 * Date: August 12, 2026
 * Description: This file defines the shared root layout and metadata for every page in the application.
 * Input: It receives the React page content for the currently selected route through the children property.
 * Processing and Output: It wraps that content in the required HTML document structure and outputs the complete page shell.
 */
import type { Metadata } from "next";
import "./globals.css";

// Page metadata: provide the browser title and search description.
export const metadata: Metadata = {
  title: "tiny cinema",
  description: "Internet Movies Rental movie database",
};

// Root layout: render every route inside the shared HTML and body elements.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
