import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || "ananizainal13@gmail.com",
    pass: process.env.SMTP_PASS || "upscpigjcvzeaooc",
  },
});

export async function sendPasswordResetEmail(toEmail: string, resetUrl: string, token: string) {
  const mailOptions = {
    from: process.env.SMTP_FROM || `"Zainal Abidin Portfolio" <${process.env.SMTP_USER || "ananizainal13@gmail.com"}>`,
    to: toEmail,
    subject: "🔒 Reset Password Verification // Zainal Abidin Admin Portal",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #ffffff; margin: 0; padding: 40px 20px; }
          .container { max-width: 560px; margin: 0 auto; background: #0c0c0e; border: 1px solid #27272a; border-radius: 16px; padding: 36px; }
          .logo-pill { display: inline-flex; align-items: center; gap: 8px; font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #a1a1aa; border: 1px solid #3f3f46; padding: 6px 14px; border-radius: 9999px; }
          .title { font-size: 24px; font-weight: 800; letter-spacing: -0.03em; margin: 24px 0 12px 0; color: #ffffff; }
          .text { font-size: 14px; line-height: 1.6; color: #a1a1aa; margin-bottom: 24px; }
          .btn { display: inline-block; background: #ffffff; color: #000000; font-family: monospace; font-size: 13px; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.1em; }
          .token-box { margin-top: 24px; background: #18181b; border: 1px dashed #3f3f46; border-radius: 8px; padding: 14px; font-family: monospace; font-size: 12px; color: #e4e4e7; word-break: break-all; }
          .footer { margin-top: 32px; font-size: 12px; color: #71717a; border-top: 1px solid #27272a; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo-pill">
            <span style="display:inline-block; width:6px; height:6px; background:#fff; border-radius:50%;"></span>
            ZAINAL ABIDIN // SECURITY GATE
          </div>
          
          <h1 class="title">Verifikasi Reset Password Admin</h1>
          
          <p class="text">
            Kami menerima permintaan untuk mereset kata sandi akun Admin Portfolio kamu. Klik tombol di bawah ini untuk memverifikasi email dan memasukkan password baru kamu:
          </p>
          
          <div style="margin: 28px 0;">
            <a href="${resetUrl}" class="btn" target="_blank">Reset Password Sekarang ↗</a>
          </div>

          <p class="text" style="font-size: 12px;">
            Link verifikasi ini hanya berlaku selama <strong>15 menit</strong> untuk alasan keamanan. Jika kamu tidak meminta reset password ini, kamu dapat mengabaikan email ini dengan aman.
          </p>

          <div class="token-box">
            <strong>Security Token:</strong><br/>
            ${token}
          </div>

          <div class="footer">
            Dikirim secara aman dari sistem Google SMTP Zainal Portfolio.<br/>
            © 2026 Zainal Abidin. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return transporter.sendMail(mailOptions);
}
