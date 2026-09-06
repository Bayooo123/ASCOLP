import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET = process.env.AUTH_SECRET;
const COOKIE_NAME = "ascolp_session";

if (!SECRET && process.env.NODE_ENV === "production") {
  throw new Error("AUTH_SECRET must be set in production");
}

export function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
}

export function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

export function signSession(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role, teamMemberId: user.teamMemberId || null },
    SECRET || "dev-secret-do-not-use-in-production",
    { expiresIn: "7d" }
  );
}

export function verifySession(token) {
  try {
    return jwt.verify(token, SECRET || "dev-secret-do-not-use-in-production");
  } catch {
    return null;
  }
}

export function sessionCookie(token) {
  const isProd = process.env.NODE_ENV === "production";
  const parts = [
    `${COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${7 * 24 * 60 * 60}`,
  ];
  if (isProd) parts.push("Secure");
  return parts.join("; ");
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function getSessionFromReq(req) {
  const cookieHeader = req.headers.cookie || "";
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  const token = match.slice(COOKIE_NAME.length + 1);
  return verifySession(token);
}

export const COOKIE_KEY = COOKIE_NAME;
