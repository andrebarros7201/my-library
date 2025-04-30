import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Library",
  description: "My Library app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-screen box-border flex flex-col justify-start items-center gap-4`}
      >
        <Header />
        <div
          className={
            "flex flex-1 flex-col justify-start items-center gap-4 w-full max-w-6xl p-4"
          }
        >
          {children}
        </div>
      </body>
    </html>
  );
}