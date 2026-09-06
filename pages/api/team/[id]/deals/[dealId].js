import { db } from "../../../../../lib/db";
import { getSessionFromReq } from "../../../../../lib/auth";

export default async function handler(req, res) {
  const session = getSessionFromReq(req);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { id, dealId } = req.query;
  const isAdmin = session.role === "ADMIN";
  const isSelf = session.teamMemberId === id;
  if (!isAdmin && !isSelf) return res.status(403).json({ error: "Forbidden" });

  if (req.method === "DELETE") {
    const { data: deal } = await db("dealRecords").select("*").eq("id", dealId).maybeSingle();
    if (!deal || deal.teamMemberId !== id) return res.status(404).json({ error: "Not found" });
    await db("dealRecords").delete().eq("id", dealId);
    return res.status(204).end();
  }

  res.setHeader("Allow", "DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
