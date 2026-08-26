import type { Metadata } from "next";
import { KineticNavigation } from "@/components/ui/sterling-gate-kinetic-navigation";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

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
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#000000] text-[#F5F5F5] antialiased selection:bg-white selection:text-black min-h-screen flex flex-col justify-between">
        <SpotlightCursor />
        <KineticNavigation />
        <main className="relative w-full flex-grow">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
