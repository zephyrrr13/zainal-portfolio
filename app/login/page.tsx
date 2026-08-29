"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Inter } from "next/font/google";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, RefreshCw, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // CAPTCHA State
  const [captchaData, setCaptchaData] = useState<{ question: string; token: string } | null>(null);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(false);

  // Form State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchCaptcha = async () => {
    setCaptchaLoading(true);
    try {
      const res = await fetch(`/api/auth/captcha?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        setCaptchaData(data);
        setCaptchaAnswer("");
      }
    } catch {
      setError("Gagal memuat verifikasi keamanan. Silakan refresh.");
    } finally {
      setCaptchaLoading(false);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username || !password) {
      setError("Mohon isi username/email dan password.");
      return;
    }

    if (!captchaAnswer || !captchaData) {
      setError("Mohon jawab pertanyaan anti-bot.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          captchaAnswer,
          captchaToken: captchaData.token,
          rememberMe,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login gagal. Periksa kembali username dan password.");
        fetchCaptcha();
      } else {
        setSuccess("Autentikasi berhasil! Mengalihkan...");
        setTimeout(() => {
          router.push(redirectUrl);
          router.refresh();
        }, 500);
      }
    } catch {
      setError("Terjadi gangguan koneksi ke server auth.");
      fetchCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`overflow-hidden rounded-3xl border border-white/15 bg-zinc-950/95 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:p-10 ${inter.className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          PORTAL ADMIN // GATEWAY
        </div>
        <Link
          href="/"
          className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          ← KEMBALI
        </Link>
      </div>

      {/* Title */}
      <div className="mt-6 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Admin Access
        </h1>
        <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-normal">
          Masuk untuk mengelola portfolio, analitik kunjungan, dan artikel CMS.
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3.5 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Username / Email */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Username atau Email
          </label>
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username atau email"
              autoComplete="username"
              required
              className="w-full rounded-xl border border-white/15 bg-zinc-900/80 px-4 py-3 pl-11 text-xs text-white placeholder-zinc-500 transition-all focus:border-white focus:bg-black focus:outline-none focus:ring-1 focus:ring-white"
            />
            <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-zinc-400 hover:text-white underline transition-colors"
            >
              Lupa Password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-white/15 bg-zinc-900/80 px-4 py-3 pl-11 pr-11 text-xs text-white placeholder-zinc-500 transition-all focus:border-white focus:bg-black focus:outline-none focus:ring-1 focus:ring-white"
            />
            <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Anti-Bot CAPTCHA Box */}
        <div className="rounded-xl border border-white/10 bg-black/60 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Verifikasi Anti-Bot</span>
            </div>
            <button
              type="button"
              onClick={fetchCaptcha}
              disabled={captchaLoading}
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`h-3 w-3 ${captchaLoading ? "animate-spin" : ""}`} />
              <span>Acak</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex items-center justify-center rounded-lg border border-white/15 bg-zinc-900 text-xs font-bold text-white tracking-widest py-2 select-none">
              {captchaData ? captchaData.question : "Memuat..."}
            </div>
            <input
              type="number"
              value={captchaAnswer}
              onChange={(e) => setCaptchaAnswer(e.target.value)}
              placeholder="Jawaban angka"
              required
              className="rounded-lg border border-white/15 bg-zinc-900/90 px-3 py-2 text-center text-xs text-white placeholder-zinc-500 focus:border-white focus:bg-black focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center gap-2.5 pt-1">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-zinc-900 text-white accent-white focus:ring-0 cursor-pointer"
          />
          <label
            htmlFor="rememberMe"
            className="select-none text-xs text-zinc-300 cursor-pointer"
          >
            Tetap login di perangkat ini (30 Hari)
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="group mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white bg-white py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg transition-all hover:bg-zinc-200 disabled:opacity-60"
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>MEMVERIFIKASI...</span>
            </>
          ) : (
            <>
              <span>MASUK KE DASHBOARD</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className={`relative flex min-h-screen w-full items-center justify-center bg-[#000000] px-4 py-12 text-white ${inter.className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

      <div className="relative z-10 mx-auto w-full max-w-md">
        <Suspense
          fallback={
            <div className="flex h-96 items-center justify-center text-xs text-zinc-400">
              Memuat form login...
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
