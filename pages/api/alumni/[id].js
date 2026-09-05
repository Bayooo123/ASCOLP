import { db } from "../../../lib/db";
import { getSessionFromReq } from "../../../lib/auth";
import { sanitizeAlumniAdminInput } from "../../../lib/alumniFields";

export default async function handler(req, res) {
  const session = getSessionFromReq(req);
  if (!session || session.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });

  const { id } = req.query;

  if (req.method === "GET") {
    const { data: alumnus } = await db("alumni").select("*").eq("id", id).maybeSingle();
    if (!alumnus) return res.status(404).json({ error: "Not found" });
    return res.status(200).json(alumnus);
  }

  if (req.method === "PUT") {
    const { data: alumnus, error } = await db("alumni").update(sanitizeAlumniAdminInput(req.body || {})).eq("id", id).select().single();
    if (error) return res.status(500).json({ error: "Failed to update" });
    return res.status(200).json(alumnus);
  }

  if (req.method === "DELETE") {
    await db("alumni").delete().eq("id", id);
    return res.status(204).end();
  }

  res.setHeader("Allow", "GET, PUT, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
