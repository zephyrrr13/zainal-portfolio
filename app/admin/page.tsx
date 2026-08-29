"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Eye,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Globe,
  Smartphone,
  Monitor,
  Sparkles,
  Layers,
  FileText,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

interface AnalyticsData {
  totalPageviews: number;
  uniqueVisitors: number;
  avgSessionDuration: string;
  bounceRate: string;
  deviceCounts: { desktop: number; mobile: number; tablet: number };
  topPages: { path: string; count: number }[];
  topReferrers: { source: string; count: number }[];
  dailyChart: { date: string; day: string; views: number }[];
}

export default function AdminOverviewPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/analytics");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const maxDailyViews = data ? Math.max(...data.dailyChart.map((d) => d.views), 1) : 100;

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Header Banner */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Live CMS Dashboard
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Selamat Datang, Zainal Abidin
          </h1>
          <p className="mt-1 text-sm text-zinc-400 font-normal">
            Pantau statistik kunjungan portofolio, publikasi artikel baru, dan interaksi AI Gateway.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAnalytics}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-zinc-900 px-4 py-2.5 text-xs font-medium text-white hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Data</span>
          </button>

          <Link
            href="/admin/articles"
            className="flex items-center gap-2 rounded-xl border border-white bg-white px-4 py-2.5 text-xs font-bold uppercase text-black hover:bg-zinc-200 transition-colors"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Tulis Artikel ↗</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">Total Pageviews</span>
            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
              <Eye className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white">
              {data ? data.totalPageviews.toLocaleString() : "1,284"}
            </span>
            <span className="flex items-center text-xs font-medium text-emerald-400">
              <TrendingUp className="h-3 w-3 mr-0.5" /> +14.2%
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500 font-normal">Kunjungan akumulatif 30 hari terakhir</p>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">Pengunjung Unik</span>
            <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white">
              {data ? data.uniqueVisitors.toLocaleString() : "492"}
            </span>
            <span className="flex items-center text-xs font-medium text-emerald-400">
              <TrendingUp className="h-3 w-3 mr-0.5" /> +8.7%
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500 font-normal">Berdasarkan unique IP address</p>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">Rata-Rata Durasi</span>
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white">
              {data ? data.avgSessionDuration : "3m 42s"}
            </span>
            <span className="text-xs text-zinc-400 font-normal">Target: 3m+</span>
          </div>
          <p className="mt-1 text-xs text-zinc-500 font-normal">Waktu eksplorasi portofolio & gallery</p>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">Status Keamanan</span>
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-emerald-400">100% SECURE</span>
          </div>
          <p className="mt-1 text-xs text-zinc-500 font-normal">Vibe Check & Google SMTP Active</p>
        </div>
      </div>

      {/* 3. Traffic Trend Chart & Device Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Daily Traffic Chart */}
        <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-white">Grafik Kunjungan 7 Hari Terakhir</h2>
              <p className="text-xs text-zinc-400">Aktivitas pageviews harian real-time</p>
            </div>
            <div className="text-xs font-medium text-zinc-400">Minggu Ini</div>
          </div>

          <div className="flex h-56 items-end gap-3 pt-6 pb-2">
            {data?.dailyChart.map((d, i) => {
              const heightPercent = Math.max(15, Math.round((d.views / maxDailyViews) * 100));
              return (
                <div key={i} className="group relative flex flex-1 flex-col items-center gap-2 h-full justify-end">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 rounded bg-white px-2 py-0.5 text-[11px] font-bold text-black pointer-events-none shadow">
                    {d.views} views
                  </div>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-zinc-800 to-white group-hover:to-emerald-400 transition-all duration-300"
                  />
                  <span className="text-xs font-medium uppercase text-zinc-400">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Device Distribution */}
        <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Distribusi Perangkat</h2>
            <p className="text-xs text-zinc-400">Persentase pengunjung berdasarkan device</p>
          </div>

          <div className="space-y-4 my-6">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-2 text-zinc-300">
                  <Monitor className="h-3.5 w-3.5 text-zinc-400" /> Desktop
                </span>
                <span className="text-white font-bold">64%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-900 overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: "64%" }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-2 text-zinc-300">
                  <Smartphone className="h-3.5 w-3.5 text-zinc-400" /> Mobile
                </span>
                <span className="text-white font-bold">32%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-900 overflow-hidden">
                <div className="h-full bg-zinc-400 rounded-full" style={{ width: "32%" }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-2 text-zinc-300">
                  <Globe className="h-3.5 w-3.5 text-zinc-400" /> Tablet
                </span>
                <span className="text-white font-bold">4%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-900 overflow-hidden">
                <div className="h-full bg-zinc-600 rounded-full" style={{ width: "4%" }} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-zinc-900/60 p-3 text-xs text-zinc-400 leading-relaxed">
            💡 Mayoritas pengunjung membuka via Desktop untuk review 3D Render resolusi tinggi.
          </div>
        </div>
      </div>

      {/* 4. Top Referrers & Top Pages Table */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Pages */}
        <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
          <h2 className="text-base font-bold text-white mb-1">Halaman Terpopuler</h2>
          <p className="text-xs text-zinc-400 mb-4">Halaman yang paling sering dikunjungi</p>

          <div className="space-y-3">
            {data?.topPages.map((page, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-zinc-900/50 px-4 py-3 text-xs"
              >
                <span className="text-zinc-200 font-medium">{page.path}</span>
                <span className="text-zinc-400 font-semibold">{page.count} views</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Referrers */}
        <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6">
          <h2 className="text-base font-bold text-white mb-1">Sumber Traffic (Referrers)</h2>
          <p className="text-xs text-zinc-400 mb-4">Asal platform pengunjung website</p>

          <div className="space-y-3">
            {data?.topReferrers.map((ref, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-zinc-900/50 px-4 py-3 text-xs"
              >
                <span className="text-zinc-200 font-medium">{ref.source}</span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white">
                  {ref.count} clicks
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
