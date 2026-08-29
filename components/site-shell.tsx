"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { KineticNavigation } from "@/components/ui/sterling-gate-kinetic-navigation";
import { SiteFooter } from "@/components/site-footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide header and footer on auth pages and admin dashboard
  const isAuthOrAdmin =
    pathname.startsWith("/login") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/admin");

  return (
    <>
      {!isAuthOrAdmin && <KineticNavigation />}
      <main className="relative w-full flex-grow">{children}</main>
      {!isAuthOrAdmin && <SiteFooter />}
    </>
  );
}
