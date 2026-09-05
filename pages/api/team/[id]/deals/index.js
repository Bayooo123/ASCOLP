import { db } from "../../../../../lib/db";
import { getSessionFromReq } from "../../../../../lib/auth";

export default async function handler(req, res) {
  const session = getSessionFromReq(req);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.query;
  const isAdmin = session.role === "ADMIN";
  const isSelf = session.teamMemberId === id;
  if (!isAdmin && !isSelf) return res.status(403).json({ error: "Forbidden" });

  if (req.method === "POST") {
    const { title, description, practiceArea, year } = req.body || {};
    if (!title) return res.status(400).json({ error: "title is required" });

    const { data: existing } = await db("dealRecords").select("id").eq("teamMemberId", id);
    const { data: deal, error } = await db("dealRecords")
      .insert({ teamMemberId: id, title, description, practiceArea, year, sortOrder: (existing || []).length })
      .select()
      .single();
    if (error) return res.status(500).json({ error: "Failed to add entry" });
    return res.status(201).json(deal);
  }

  res.setHeader("Allow", "POST");
  return res.status(405).json({ error: "Method not allowed" });
}
