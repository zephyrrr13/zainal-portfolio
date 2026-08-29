"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, RefreshCw, KeyRound } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!token) {
      setError("Token verifikasi tidak ditemukan di URL.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal mereset kata sandi.");
      } else {
        setSuccess("Kata sandi berhasil diperbarui! Mengalihkan ke halaman login...");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch {
      setError("Terjadi gangguan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/15 bg-zinc-950/90 p-8 shadow-2xl backdrop-blur-2xl sm:p-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-zinc-300 mb-4">
          <KeyRound className="h-3 w-3 text-emerald-400" />
          VERIFIKASI EMAIL TERKONFIRMASI
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Buat Password Baru
        </h1>
        {email && (
          <p className="mt-1 font-mono text-xs text-zinc-400">
            Akun: <span className="text-white font-bold">{email}</span>
          </p>
        )}
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-950/30 p-3.5 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3.5 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleReset} className="space-y-4">
        <div>
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
            Password Baru
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimal 8 karakter"
              required
              className="w-full rounded-xl border border-white/15 bg-zinc-900/80 px-4 py-3 pl-11 pr-11 font-mono text-xs text-white placeholder-zinc-500 focus:border-white focus:bg-black focus:outline-none focus:ring-1 focus:ring-white"
            />
            <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
            Konfirmasi Password Baru
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi password baru"
              required
              className="w-full rounded-xl border border-white/15 bg-zinc-900/80 px-4 py-3 pl-11 font-mono text-xs text-white placeholder-zinc-500 focus:border-white focus:bg-black focus:outline-none focus:ring-1 focus:ring-white"
            />
            <Lock className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white bg-white py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-lg transition-all hover:bg-zinc-200 disabled:opacity-60"
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>MEMPERBARUI KATA SANDI...</span>
            </>
          ) : (
            <span>SIMPAN PASSWORD BARU ↗</span>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="font-mono text-xs text-zinc-400 hover:text-white underline"
        >
          Kembali ke Halaman Login
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between bg-[#000000] px-4 pt-28 pb-12 sm:px-8 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35" />

      <div className="relative z-10 mx-auto my-auto w-full max-w-md">
        <Suspense
          fallback={
            <div className="flex h-96 items-center justify-center font-mono text-xs text-zinc-400">
              Memuat verifikasi...
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
