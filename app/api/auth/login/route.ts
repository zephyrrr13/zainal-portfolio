import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import {
  checkRateLimit,
  recordFailedLogin,
  resetFailedLogin,
  verifyCaptcha,
  signToken,
  setSessionCookie,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

  // 1. Check Rate Limit (Anti-Brute Force)
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    db.addAuditLog({
      action: "LOGIN_RATE_LIMITED",
      status: "danger",
      ip,
      details: `Rate limit hit. Locked for ${rateLimit.remainingSeconds}s`,
    });
    return NextResponse.json(
      {
        error: `Terlalu banyak percobaan gagal. Akun dikunci sementara selama ${rateLimit.remainingSeconds} detik untuk keamanan.`,
      },
      { status: 429 }
    );
  }

  try {
    const { username, password, captchaAnswer, captchaTimestamp, captchaSignature, rememberMe } =
      await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username/Email dan Password wajib diisi." }, { status: 400 });
    }

    // 2. Verify Cryptographic CAPTCHA (Anti-Bot)
    if (
      !captchaAnswer ||
      !captchaTimestamp ||
      !captchaSignature ||
      !verifyCaptcha(captchaAnswer, Number(captchaTimestamp), captchaSignature)
    ) {
      recordFailedLogin(ip);
      db.addAuditLog({
        action: "CAPTCHA_FAILED",
        status: "warning",
        ip,
        details: `Failed CAPTCHA verification for user attempt: ${username}`,
      });
      return NextResponse.json(
        { error: "Verifikasi CAPTCHA salah atau telah kedaluwarsa. Silakan coba lagi." },
        { status: 400 }
      );
    }

    // 3. Authenticate User
    const user = db.findUserByEmailOrUsername(username);
    if (!user) {
      recordFailedLogin(ip);
      db.addAuditLog({
        action: "LOGIN_FAILED",
        status: "danger",
        ip,
        details: `Invalid user lookup: ${username}`,
      });
      return NextResponse.json({ error: "Username atau kata sandi tidak valid." }, { status: 401 });
    }

    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      recordFailedLogin(ip);
      db.addAuditLog({
        action: "LOGIN_PASSWORD_MISMATCH",
        status: "danger",
        ip,
        details: `Incorrect password attempt for user: ${user.username}`,
      });
      return NextResponse.json({ error: "Username atau kata sandi tidak valid." }, { status: 401 });
    }

    // 4. Success Login
    resetFailedLogin(ip);

    user.lastLogin = new Date().toISOString();
    user.failedLoginAttempts = 0;
    db.updateUser(user);

    db.addAuditLog({
      action: "LOGIN_SUCCESS",
      status: "success",
      ip,
      details: `Admin user ${user.username} logged in successfully`,
    });

    const token = signToken(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      Boolean(rememberMe)
    );

    setSessionCookie(token, Boolean(rememberMe));

    return NextResponse.json({
      success: true,
      message: "Login berhasil. Mengalihkan ke Admin Dashboard...",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    console.error("Login API Error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan pada server saat autentikasi." }, { status: 500 });
  }
}
