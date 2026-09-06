import { db } from "../../../lib/db";
import { getSessionFromReq } from "../../../lib/auth";
import { sanitizeArticleInput } from "../../../lib/articleFields";

export default async function handler(req, res) {
  const session = getSessionFromReq(req);
  if (!session || session.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });

  const { id } = req.query;

  if (req.method === "GET") {
    const { data: article } = await db("articles").select("*").eq("id", id).maybeSingle();
    if (!article) return res.status(404).json({ error: "Not found" });
    return res.status(200).json(article);
  }

  if (req.method === "PUT") {
    const { data: article, error } = await db("articles").update(sanitizeArticleInput(req.body || {})).eq("id", id).select().single();
    if (error) {
      if (error.code === "23505") return res.status(409).json({ error: "That slug is already in use" });
      return res.status(500).json({ error: "Failed to update article" });
    }
    return res.status(200).json(article);
  }

  if (req.method === "DELETE") {
    await db("articles").delete().eq("id", id);
    return res.status(204).end();
  }

  res.setHeader("Allow", "GET, PUT, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
