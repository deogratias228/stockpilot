import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "StockPilot — Gérez votre commerce sans internet",
  description:
    "Logiciel de caisse et gestion de stock 100% hors ligne pour commerçants africains. POS, stock, rapports, bénéfices — tout dans une seule application Windows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-white text-slate-900 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}