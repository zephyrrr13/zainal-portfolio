"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Sliders,
  Menu,
  Blocks,
  Bot,
  ShieldAlert,
  LogOut,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Activity,
} from "lucide-react";
import { FloatingAiCopilot } from "@/components/admin/floating-ai-copilot";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("zainal_sidebar_collapsed");
    if (saved) setCollapsed(saved === "true");
  }, []);

  const toggleSidebar = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("zainal_sidebar_collapsed", String(next));
      return next;
    });
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
    }
  };

  const navItems = [
    {
      title: "Overview & Analitik",
      href: "/admin",
      icon: LayoutDashboard,
      badge: "Live",
    },
    {
      title: "Artikel & Berita CMS",
      href: "/admin/articles",
      icon: FileText,
    },
    {
      title: "Media & Galeri",
      href: "/admin/media",
      icon: ImageIcon,
    },
    {
      title: "Editor Konten Halaman",
      href: "/admin/pages",
      icon: Sliders,
    },
    {
      title: "Menu Navigasi",
      href: "/admin/menus",
      icon: Menu,
    },
    {
      title: "Plugins & SEO",
      href: "/admin/plugins",
      icon: Blocks,
    },
    {
      title: "AI Gateway Copilot",
      href: "/admin/ai",
      icon: Bot,
      accent: true,
    },
    {
      title: "Keamanan & Audit Log",
      href: "/admin/security",
      icon: ShieldAlert,
    },
  ];

  return (
    <div className={`flex min-h-screen w-full bg-[#08080a] text-white ${inter.className} selection:bg-white selection:text-black`}>
      {/* 1. Collapsible Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col justify-between border-r border-white/10 bg-[#0d0d11]/95 backdrop-blur-2xl transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Top Branding */}
        <div>
          <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
            {!collapsed ? (
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_0_10px_#FFFFFF]"></span>
                <span className="truncate text-xs font-bold uppercase tracking-wider text-white">
                  ZAINAL CMS
                </span>
              </div>
            ) : (
              <div className="mx-auto flex h-3 w-3 items-center justify-center rounded-full bg-white shadow-[0_0_10px_#FFFFFF]"></div>
            )}

            <button
              onClick={toggleSidebar}
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-white text-black font-semibold shadow-md"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                  title={collapsed ? item.title : undefined}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      isActive
                        ? "text-black"
                        : item.accent
                        ? "text-purple-400 group-hover:text-purple-300"
                        : "text-zinc-400 group-hover:text-white"
                    }`}
                  />

                  {!collapsed && (
                    <div className="flex flex-1 items-center justify-between truncate">
                      <span className="truncate">{item.title}</span>
                      {item.badge && (
                        <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400">
                          {item.badge}
                        </span>
                      )}
                      {item.accent && (
                        <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Actions */}
        <div className="p-3 border-t border-white/10 space-y-2">
          {/* Quick View Website */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-zinc-300 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all"
            title="Lihat Website Live"
          >
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            {!collapsed && <span className="truncate">Lihat Live Website ↗</span>}
          </Link>

          {/* User Badge */}
          <div className="flex items-center gap-3 rounded-xl bg-zinc-900/70 p-2.5 border border-white/5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 border border-white/10 text-white text-xs font-bold">
              ZA
            </div>

            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="truncate text-xs font-bold text-white">
                  Zainal Abidin
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  SUPERADMIN
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="p-1.5 text-zinc-400 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main
        className={`min-h-screen flex-1 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#08080a]/80 px-6 backdrop-blur-xl">
          <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
            <span>ADMIN PORTAL</span>
            <span className="text-zinc-600">//</span>
            <span className="text-white font-bold uppercase">
              {pathname === "/admin"
                ? "Overview & Analitik"
                : pathname.replace("/admin/", "").replace("-", " ").toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
              <Activity className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
              <span>SERVER: ONLINE</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-white hover:text-black transition-all"
            >
              zephyrrr13.vercel.app ↗
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>

        {/* Floating AI Copilot Trigger & Drawer */}
        <FloatingAiCopilot />
      </main>
    </div>
  );
}
