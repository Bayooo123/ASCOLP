import { prisma } from "../../../lib/prisma";
import { getSessionFromReq } from "../../../lib/auth";
import { sanitizeArticleInput } from "../../../lib/articleFields";

export default async function handler(req, res) {
  const session = getSessionFromReq(req);
  if (!session || session.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });

  const { id } = req.query;

  if (req.method === "GET") {
    const article = await prisma.article.findUnique({ where: { id } });
    if (!article) return res.status(404).json({ error: "Not found" });
    return res.status(200).json(article);
  }

  if (req.method === "PUT") {
    try {
      const article = await prisma.article.update({ where: { id }, data: sanitizeArticleInput(req.body || {}) });
      return res.status(200).json(article);
    } catch (err) {
      if (err.code === "P2002") return res.status(409).json({ error: "That slug is already in use" });
      return res.status(500).json({ error: "Failed to update article" });
    }
  }

  if (req.method === "DELETE") {
    await prisma.article.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader("Allow", "GET, PUT, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
