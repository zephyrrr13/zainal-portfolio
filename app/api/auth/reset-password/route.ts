import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { verifyResetToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ error: "Token dan password baru wajib diisi." }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "Password minimal 8 karakter." }, { status: 400 });
    }

    // Verify stateless cryptographic token
    const tokenPayload = verifyResetToken(token);
    if (!tokenPayload || !tokenPayload.email) {
      return NextResponse.json(
        { error: "Token reset tidak valid atau sudah kedaluwarsa. Silakan request reset baru." },
        { status: 400 }
      );
    }

    const data = db.get();
    let user = data.users.find((u) => u.email.toLowerCase() === tokenPayload.email.toLowerCase());

    const salt = bcrypt.genSaltSync(10);
    const newHash = bcrypt.hashSync(newPassword, salt);

    if (user) {
      user.passwordHash = newHash;
      db.updateUser(user);
    } else {
      // If user wasn't initialized in dynamic store, add/update
      data.users.push({
        id: "usr_admin_1",
        username: "zephyrrr13",
        email: tokenPayload.email,
        passwordHash: newHash,
        role: "superadmin",
        createdAt: new Date().toISOString(),
      });
      db.save(data);
    }

    return NextResponse.json({
      success: true,
      message: "Kata sandi berhasil diperbarui! Silakan login dengan password baru.",
    });
  } catch (err: any) {
    console.error("Reset Password API Error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan saat memproses reset kata sandi." }, { status: 500 });
  }
}
