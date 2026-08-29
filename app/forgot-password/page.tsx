"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email) {
      setError("Mohon masukkan alamat email akun admin kamu.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal memproses pengiriman email verifikasi.");
      } else {
        setMessage(data.message || "Link verifikasi telah dikirim ke email kamu.");
      }
    } catch {
      setError("Terjadi gangguan koneksi ke server SMTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative flex min-h-screen w-full items-center justify-center bg-[#000000] px-4 py-12 text-white ${inter.className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35" />

      <div className="relative z-10 mx-auto w-full max-w-md">
        <div className="overflow-hidden rounded-3xl border border-white/15 bg-zinc-950/95 p-8 shadow-2xl backdrop-blur-2xl sm:p-10">
          
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>KEMBALI KE LOGIN</span>
          </Link>

          <div className="mb-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Reset Password
            </h1>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-normal">
              Masukkan email terdaftar. Sistem Google SMTP akan mengirimkan link verifikasi untuk membuat kata sandi baru.
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3.5 text-xs text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Email Admin
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  required
                  className="w-full rounded-xl border border-white/15 bg-zinc-900/80 px-4 py-3 pl-11 text-xs text-white placeholder-zinc-500 transition-all focus:border-white focus:bg-black focus:outline-none focus:ring-1 focus:ring-white"
                />
                <Mail className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-zinc-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white bg-white py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg transition-all hover:bg-zinc-200 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>MENGIRIM EMAIL SMTP...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>KIRIM LINK VERIFIKASI</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
