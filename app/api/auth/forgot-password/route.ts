import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email wajib diisi." }, { status: 400 });
    }

    const data = db.get();
    const user = data.users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!user) {
      // Security practice: Don't reveal user existence, but record audit
      db.addAuditLog({
        action: "FORGOT_PASSWORD_ATTEMPT",
        status: "warning",
        ip,
        details: `Reset attempt for non-existing email: ${email}`,
      });
      return NextResponse.json({
        success: true,
        message: "Jika email terdaftar, link verifikasi telah dikirim ke inbox kamu.",
      });
    }

    // Generate high-entropy 32-byte cryptographic token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    data.resetTokens.push({
      id: "tok_" + Math.random().toString(36).substring(2, 9),
      email: user.email,
      token,
      expiresAt,
      used: false,
      createdAt: new Date().toISOString(),
    });
    db.save(data);

    // Build reset URL
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      req.nextUrl.origin ||
      "https://zephyrrr13.vercel.app";
    const resetUrl = `${appUrl}/reset-password?token=${token}&email=${encodeURIComponent(user.email)}`;

    // Send Google SMTP Email
    await sendPasswordResetEmail(user.email, resetUrl, token);

    db.addAuditLog({
      action: "RESET_EMAIL_SENT",
      status: "success",
      ip,
      details: `Google SMTP reset verification email sent to ${user.email}`,
    });

    return NextResponse.json({
      success: true,
      message: `Link verifikasi reset password berhasil dikirim ke ${user.email}. Silakan cek inbox/spam kamu.`,
    });
  } catch (err: any) {
    console.error("Forgot Password Error:", err);
    return NextResponse.json(
      { error: "Gagal mengirim email verifikasi melalui SMTP Google. Pastikan kredensial SMTP aktif." },
      { status: 500 }
    );
  }
}
