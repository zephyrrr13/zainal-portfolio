import jwt from "jsonwebtoken";
import crypto from "crypto";
import { cookies } from "next/headers";
import { AdminUser, db } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "zainal_super_jwt_secret_key_2026_@99";
const COOKIE_NAME = "zainal_admin_session";

export interface SessionPayload {
  userId: string;
  username: string;
  email: string;
  role: string;
}

export function signToken(payload: SessionPayload, rememberMe: boolean = false): string {
  const expiresIn = rememberMe ? "30d" : "1d";
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function setSessionCookie(token: string, rememberMe: boolean = false) {
  const cookieStore = cookies();
  const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24;
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

// 1. Cryptographic Self-Contained Reset Token (Serverless Safe)
export function signResetToken(email: string): string {
  return jwt.sign({ email, purpose: "reset_password" }, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyResetToken(token: string): { email: string } | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { email: string; purpose: string };
    if (payload.purpose !== "reset_password") return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}

// 2. Cryptographic Anti-Bot CAPTCHA (Serverless Safe & Cache-Busted)
export function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 12) + 2;
  const num2 = Math.floor(Math.random() * 9) + 1;
  const answer = (num1 + num2).toString();

  const token = jwt.sign({ answer, purpose: "captcha" }, JWT_SECRET, { expiresIn: "10m" });

  return {
    question: `Berapa ${num1} + ${num2} ?`,
    token,
  };
}

export function verifyCaptcha(userInput: string, token: string): boolean {
  try {
    if (!userInput || !token) return false;
    const payload = jwt.verify(token, JWT_SECRET) as { answer: string; purpose: string };
    if (payload.purpose !== "captcha") return false;
    return payload.answer.trim() === userInput.trim();
  } catch {
    return false;
  }
}
