import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Onboarding } from "./components/Onboarding";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EW-R Hair Science Academy | ヘアサイエンス学習プラットフォーム",
  description:
    "美容師とディーラーのための、髪・頭皮・薬剤・製品理解の学習プラットフォーム。40問以上の教材、理解度テスト、製品理解、AI先生を搭載。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1b7a5a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSans.variable}>
      <body className="antialiased">
        {children}
        <Onboarding />
      </body>
    </html>
  );
}