import { prisma } from "../../../lib/prisma";
import { getSessionFromReq } from "../../../lib/auth";
import { sanitizeTeamMemberInput } from "../../../lib/teamMemberFields";

// Fields a team member may edit on their own profile. Structural fields
// (slug, title, isPartner, homepage placement, publish state) stay
// admin-only so self-service editing can't change how/where someone is
// presented on the site without admin review.
const SELF_EDIT_FIELDS = ["bio", "photoUrl", "email", "phone", "linkedinUrl", "twitterUrl", "facebookUrl"];

export default async function handler(req, res) {
  const session = getSessionFromReq(req);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.query;
  const isAdmin = session.role === "ADMIN";
  const isSelf = session.teamMemberId === id;
  if (!isAdmin && !isSelf) return res.status(403).json({ error: "Forbidden" });

  if (req.method === "GET") {
    const member = await prisma.teamMember.findUnique({
      where: { id },
      include: { dealHistory: { orderBy: { order: "asc" } } },
    });
    if (!member) return res.status(404).json({ error: "Not found" });
    return res.status(200).json(member);
  }

  if (req.method === "PUT") {
    const data = req.body || {};
    const fields = isAdmin
      ? sanitizeTeamMemberInput(data)
      : Object.fromEntries(SELF_EDIT_FIELDS.filter((f) => data[f] !== undefined).map((f) => [f, data[f]]));

    try {
      const member = await prisma.teamMember.update({ where: { id }, data: fields });
      return res.status(200).json(member);
    } catch (err) {
      if (err.code === "P2002") return res.status(409).json({ error: "That slug is already in use" });
      return res.status(500).json({ error: "Failed to update team member" });
    }
  }

  if (req.method === "DELETE") {
    if (!isAdmin) return res.status(403).json({ error: "Forbidden" });
    await prisma.teamMember.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader("Allow", "GET, PUT, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
