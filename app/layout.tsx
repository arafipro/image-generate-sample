import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const noto_sans = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image Genaretion App",
  description: "Generates images from input text app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={noto_sans.className}>{children}</body>
    </html>
  );
}
