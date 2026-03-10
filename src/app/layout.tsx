import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "basic_sceleton",
  description: "Minimal starter",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
