import { NextRequest, NextResponse } from "next/server";
import { sendPasswordResetEmail } from "@/lib/email";
import { signResetToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email wajib diisi." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Generate cryptographic self-contained reset token (1 hour expiry)
    const token = signResetToken(cleanEmail);

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      req.nextUrl.origin ||
      "https://zephyrrr13.vercel.app";
    const resetUrl = `${appUrl}/reset-password?token=${token}`;

    // Send Google SMTP Email
    await sendPasswordResetEmail(cleanEmail, resetUrl, token);

    return NextResponse.json({
      success: true,
      message: `Link verifikasi reset password berhasil dikirim ke ${cleanEmail}. Silakan cek kotak masuk/spam email kamu.`,
    });
  } catch (err: any) {
    console.error("Forgot Password Error:", err);
    return NextResponse.json(
      { error: "Gagal mengirim email verifikasi. Pastikan SMTP Google aktif." },
      { status: 500 }
    );
  }
}
