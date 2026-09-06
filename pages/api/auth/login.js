import { db } from "../../../lib/db";
import { comparePassword, signSession, sessionCookie } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const { data: user } = await db("users").select("*").eq("email", email).maybeSingle();
  if (!user || !(await comparePassword(password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = signSession(user);
  res.setHeader("Set-Cookie", sessionCookie(token));
  return res.status(200).json({ ok: true, role: user.role, teamMemberId: user.teamMemberId });
}
