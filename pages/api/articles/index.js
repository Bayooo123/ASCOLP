import { db } from "../../../lib/db";
import { getSessionFromReq } from "../../../lib/auth";
import { sanitizeArticleInput } from "../../../lib/articleFields";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = getSessionFromReq(req);
    if (!session || session.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });
    const { data } = await db("articles").select("*").order("createdAt", { ascending: false });
    return res.status(200).json(data || []);
  }

  if (req.method === "POST") {
    const session = getSessionFromReq(req);
    if (!session || session.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });
    const data = req.body || {};
    if (!data.slug || !data.title) return res.status(400).json({ error: "slug and title are required" });
    const { data: article, error } = await db("articles").insert(sanitizeArticleInput(data)).select().single();
    if (error) {
      if (error.code === "23505") return res.status(409).json({ error: "That slug is already in use" });
      return res.status(500).json({ error: "Failed to create article" });
    }
    return res.status(201).json(article);
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
