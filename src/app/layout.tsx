import type { Metadata } from "next";
import { Bebas_Neue, Oswald, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "PSB — Polashpur Soccer Boys",
  description:
    "Polashpur Soccer Boys (PSB) — football born from the streets of Polashpur, Bangladesh. Matches, squad, fixtures and the brotherhood behind the badge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${bebasNeue.variable} ${oswald.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground selection:bg-flag-red selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
