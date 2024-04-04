// Imports
// ========================================================
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import RootProvider from "../providers";

// Config
const fontFamily = Lexend({ weight: ["100", "200", "300", "400", "500", "600", "700"], subsets: ["latin"] });

// Metadata
// ========================================================
export const metadata: Metadata = {
  title: "Berachain Irys Dynamic NFT",
  description: "A dyanmic Berachain NFT that uses Irys Mutable references.",
};

// Main Root Component
// ========================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={fontFamily.className}>
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
