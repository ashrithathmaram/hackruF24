import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./state/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeSafe",
  description: "AI-Initiated Calls to Keep You Safe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>{children}</Providers>
      </body>
    </html>
  );
}
