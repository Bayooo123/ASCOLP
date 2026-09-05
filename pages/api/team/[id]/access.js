import crypto from "crypto";
import { db } from "../../../../lib/db";
import { getSessionFromReq, hashPassword } from "../../../../lib/auth";

// Admin-only: grant or reset a team member's login. Returns the password
// once (or the one the admin supplied) so it can be relayed to them —
// it is never stored or shown again after this response.
export default async function handler(req, res) {
  const session = getSessionFromReq(req);
  if (!session || session.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  const { data: member } = await db("teamMembers").select("*").eq("id", id).maybeSingle();
  if (!member) return res.status(404).json({ error: "Team member not found" });

  const email = req.body?.email || member.email;
  if (!email) return res.status(400).json({ error: "This team member needs an email on file first" });

  const password = req.body?.password || crypto.randomBytes(6).toString("base64url");
  const passwordHash = await hashPassword(password);

  const { data: existing } = await db("users").select("id").eq("teamMemberId", id).maybeSingle();
  if (existing) {
    await db("users").update({ email, passwordHash }).eq("id", existing.id);
  } else {
    await db("users").insert({ email, passwordHash, role: "TEAM_MEMBER", teamMemberId: id });
  }

  return res.status(200).json({ ok: true, email, password });
}
