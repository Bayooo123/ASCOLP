import { prisma } from "../../../lib/prisma";
import { getSessionFromReq } from "../../../lib/auth";
import { sanitizeArticleInput } from "../../../lib/articleFields";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = getSessionFromReq(req);
    if (!session || session.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });
    const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json(articles);
  }

  if (req.method === "POST") {
    const session = getSessionFromReq(req);
    if (!session || session.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });
    const data = req.body || {};
    if (!data.slug || !data.title) return res.status(400).json({ error: "slug and title are required" });
    try {
      const article = await prisma.article.create({ data: sanitizeArticleInput(data) });
      return res.status(201).json(article);
    } catch (err) {
      if (err.code === "P2002") return res.status(409).json({ error: "That slug is already in use" });
      return res.status(500).json({ error: "Failed to create article" });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
