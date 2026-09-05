import crypto from "crypto";
import { prisma } from "../../../../lib/prisma";
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
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) return res.status(404).json({ error: "Team member not found" });

  const email = req.body?.email || member.email;
  if (!email) return res.status(400).json({ error: "This team member needs an email on file first" });

  const password = req.body?.password || crypto.randomBytes(6).toString("base64url");
  const passwordHash = await hashPassword(password);

  const existing = await prisma.user.findUnique({ where: { teamMemberId: id } });
  if (existing) {
    await prisma.user.update({ where: { id: existing.id }, data: { email, passwordHash } });
  } else {
    await prisma.user.create({ data: { email, passwordHash, role: "TEAM_MEMBER", teamMemberId: id } });
  }

  return res.status(200).json({ ok: true, email, password });
}
