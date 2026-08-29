import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import {
  verifyCaptcha,
  signToken,
  setSessionCookie,
  getVaultPasswordHash,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { username, password, captchaAnswer, captchaToken, rememberMe } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username/Email dan Password wajib diisi." }, { status: 400 });
    }

    // 1. Verify Cryptographic Anti-Bot CAPTCHA
    if (!captchaAnswer || !captchaToken || !verifyCaptcha(captchaAnswer, captchaToken)) {
      return NextResponse.json(
        { error: "Verifikasi CAPTCHA salah atau telah kedaluwarsa. Silakan klik tombol 'Acak' dan coba lagi." },
        { status: 400 }
      );
    }

    // 2. Authenticate User
    const cleanIdentifier = username.trim().toLowerCase();
    const data = db.get();

    const allowedUsers = ["zephyrrr13", "zephyr13", "ananizainal13@gmail.com", "zainal"];
    const isValidUser =
      allowedUsers.includes(cleanIdentifier) ||
      data.users.some((u) => u.email.toLowerCase() === cleanIdentifier || u.username.toLowerCase() === cleanIdentifier);

    if (!isValidUser) {
      return NextResponse.json({ error: "Username/Email tidak terdaftar." }, { status: 401 });
    }

    // Check Vault Hash first (from persistent cookie on serverless)
    const vaultHash = getVaultPasswordHash(cleanIdentifier);
    let isMatch = false;

    if (vaultHash) {
      try {
        isMatch = bcrypt.compareSync(password, vaultHash);
      } catch {}
    }

    // Direct password match (including user's preferred password zephyr13)
    if (!isMatch) {
      if (
        password === "zephyr13" ||
        password === "Zainal@Admin2026!" ||
        password === process.env.ADMIN_INITIAL_PASSWORD
      ) {
        isMatch = true;
      }
    }

    // Check DB hash
    if (!isMatch) {
      const adminUser = data.users.find(
        (u) => u.email.toLowerCase() === cleanIdentifier || u.username.toLowerCase() === cleanIdentifier
      );
      if (adminUser) {
        try {
          isMatch = bcrypt.compareSync(password, adminUser.passwordHash);
        } catch {}
      }
    }

    if (!isMatch) {
      return NextResponse.json({ error: "Username/Email atau kata sandi salah." }, { status: 401 });
    }

    const token = signToken(
      {
        userId: "usr_admin_1",
        username: "zephyrrr13",
        email: "ananizainal13@gmail.com",
        role: "superadmin",
      },
      Boolean(rememberMe)
    );

    setSessionCookie(token, Boolean(rememberMe));

    return NextResponse.json({
      success: true,
      message: "Login berhasil. Mengalihkan...",
    });
  } catch (err: any) {
    console.error("Login API Error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan pada server saat autentikasi." }, { status: 500 });
  }
}
