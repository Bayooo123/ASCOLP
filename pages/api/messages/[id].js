import { db } from "../../../lib/db";
import { getSessionFromReq } from "../../../lib/auth";

export default async function handler(req, res) {
  const session = getSessionFromReq(req);
  if (!session || session.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });

  const { id } = req.query;

  if (req.method === "PUT") {
    const { data: message, error } = await db("contactMessages").update({ read: !!req.body?.read }).eq("id", id).select().single();
    if (error) return res.status(500).json({ error: "Failed to update" });
    return res.status(200).json(message);
  }

  if (req.method === "DELETE") {
    await db("contactMessages").delete().eq("id", id);
    return res.status(204).end();
  }

  res.setHeader("Allow", "PUT, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
