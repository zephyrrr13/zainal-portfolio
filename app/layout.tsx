import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ZAINAL ABIDIN — Senior 3D Artist & Graphic Designer",
  description:
    "Portfolio & kinetic CV of Zainal Abidin. Senior 3D Artist, Graphic Designer & Visual Jockey (VJ) based in Jakarta, Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable}`}>
      <body className={`${inter.className} bg-[#000000] text-[#F5F5F5] antialiased selection:bg-white selection:text-black min-h-screen flex flex-col justify-between font-sans`}>
        <SpotlightCursor />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
