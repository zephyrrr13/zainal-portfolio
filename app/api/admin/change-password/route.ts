import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSession, setPasswordVaultCookie } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Sesi admin tidak valid atau sudah kedaluwarsa." }, { status: 401 });
  }

  try {
    const { newPassword } = await req.json();

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json({ error: "Password baru minimal 8 karakter." }, { status: 400 });
    }

    const salt = bcrypt.genSaltSync(10);
    const newHash = bcrypt.hashSync(newPassword, salt);

    // 1. Update in database
    const data = db.get();
    const user = data.users.find(
      (u) =>
        u.email.toLowerCase() === session.email.toLowerCase() ||
        u.username.toLowerCase() === session.username.toLowerCase()
    );

    if (user) {
      user.passwordHash = newHash;
      db.updateUser(user);
    }

    // 2. Update persistent vault cookie for Vercel serverless persistence
    setPasswordVaultCookie(session.email || "ananizainal13@gmail.com", newHash);

    // 3. Record Audit Log
    db.addAuditLog({
      action: "PASSWORD_CHANGED_IN_DASHBOARD",
      status: "success",
      ip: req.headers.get("x-forwarded-for") || "127.0.0.1",
      details: `Password changed from dashboard by ${session.username}`,
    });

    return NextResponse.json({
      success: true,
      message: "Kata sandi admin berhasil diperbarui dan aktif seketika!",
    });
  } catch (err: any) {
    console.error("Change Password Error:", err);
    return NextResponse.json({ error: "Gagal memperbarui password." }, { status: 500 });
  }
}
