import { prisma } from "../../../lib/prisma";
import { getSessionFromReq } from "../../../lib/auth";
import { sanitizeTeamMemberInput } from "../../../lib/teamMemberFields";

export default async function handler(req, res) {
  const session = getSessionFromReq(req);
  if (!session) return res.status(401).json({ error: "Unauthorized" });
  if (session.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });

  if (req.method === "GET") {
    const members = await prisma.teamMember.findMany({ orderBy: { displayOrder: "asc" } });
    return res.status(200).json(members);
  }

  if (req.method === "POST") {
    const data = req.body || {};
    if (!data.slug || !data.name) {
      return res.status(400).json({ error: "slug and name are required" });
    }
    try {
      const member = await prisma.teamMember.create({ data: sanitizeTeamMemberInput(data) });
      return res.status(201).json(member);
    } catch (err) {
      if (err.code === "P2002") return res.status(409).json({ error: "That slug is already in use" });
      return res.status(500).json({ error: "Failed to create team member" });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
