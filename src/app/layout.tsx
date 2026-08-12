import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IMR Movies",
  description: "Internet Movies Rental movie database",
};

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