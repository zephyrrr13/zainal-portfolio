import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ error: "Token dan password baru wajib diisi." }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "Password minimal 8 karakter dengan kombinasi angka dan simbol." }, { status: 400 });
    }

    const data = db.get();
    const tokenRecord = data.resetTokens.find(
      (t) => t.token === token && !t.used && t.expiresAt > Date.now()
    );

    if (!tokenRecord) {
      db.addAuditLog({
        action: "INVALID_RESET_TOKEN",
        status: "danger",
        ip,
        details: "Attempted password reset with expired or invalid token",
      });
      return NextResponse.json(
        { error: "Token reset tidak valid atau sudah kedaluwarsa. Silakan request reset baru." },
        { status: 400 }
      );
    }

    const user = data.users.find((u) => u.email.toLowerCase() === tokenRecord.email.toLowerCase());
    if (!user) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan." }, { status: 404 });
    }

    // Hash new password with bcrypt
    const salt = bcrypt.genSaltSync(10);
    user.passwordHash = bcrypt.hashSync(newPassword, salt);
    tokenRecord.used = true;

    db.save(data);

    db.addAuditLog({
      action: "PASSWORD_RESET_SUCCESS",
      status: "success",
      ip,
      details: `Password successfully reset for user ${user.username}`,
    });

    return NextResponse.json({
      success: true,
      message: "Kata sandi berhasil diperbarui! Silakan login dengan password baru kamu.",
    });
  } catch (err: any) {
    console.error("Reset Password API Error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan saat memproses reset kata sandi." }, { status: 500 });
  }
}
