import { db } from "../../../lib/db";
import { getSessionFromReq } from "../../../lib/auth";
import { sanitizeTeamMemberInput } from "../../../lib/teamMemberFields";

export default async function handler(req, res) {
  const session = getSessionFromReq(req);
  if (!session) return res.status(401).json({ error: "Unauthorized" });
  if (session.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });

  if (req.method === "GET") {
    const { data } = await db("teamMembers").select("*").order("displayOrder");
    return res.status(200).json(data || []);
  }

  if (req.method === "POST") {
    const data = req.body || {};
    if (!data.slug || !data.name) {
      return res.status(400).json({ error: "slug and name are required" });
    }
    const { data: member, error } = await db("teamMembers").insert(sanitizeTeamMemberInput(data)).select().single();
    if (error) {
      if (error.code === "23505") return res.status(409).json({ error: "That slug is already in use" });
      return res.status(500).json({ error: "Failed to create team member" });
    }
    return res.status(201).json(member);
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
