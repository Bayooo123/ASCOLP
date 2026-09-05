import { db } from "../../../lib/db";
import { getSessionFromReq } from "../../../lib/auth";
import { sanitizeAlumniAdminInput, sanitizeAlumniSubmission } from "../../../lib/alumniFields";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = getSessionFromReq(req);
    if (!session || session.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });
    const { data } = await db("alumni").select("*").order("createdAt", { ascending: false });
    return res.status(200).json(data || []);
  }

  if (req.method === "POST") {
    const session = getSessionFromReq(req);
    const isAdmin = session && session.role === "ADMIN";
    const data = req.body || {};

    if (!data.name) return res.status(400).json({ error: "Name is required" });

    const record = isAdmin
      ? { ...sanitizeAlumniAdminInput(data), source: "ADMIN", approved: data.approved !== false }
      : { ...sanitizeAlumniSubmission(data), source: "SELF_SUBMITTED", approved: false };

    const { data: alumnus, error } = await db("alumni").insert(record).select().single();
    if (error) return res.status(500).json({ error: "Failed to submit" });
    return res.status(201).json(alumnus);
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
