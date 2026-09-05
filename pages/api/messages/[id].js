import { prisma } from "../../../lib/prisma";
import { getSessionFromReq } from "../../../lib/auth";

export default async function handler(req, res) {
  const session = getSessionFromReq(req);
  if (!session || session.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });

  const { id } = req.query;

  if (req.method === "PUT") {
    const message = await prisma.contactMessage.update({ where: { id }, data: { read: !!req.body?.read } });
    return res.status(200).json(message);
  }

  if (req.method === "DELETE") {
    await prisma.contactMessage.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader("Allow", "PUT, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
