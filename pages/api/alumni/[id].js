import { prisma } from "../../../lib/prisma";
import { getSessionFromReq } from "../../../lib/auth";
import { sanitizeAlumniAdminInput } from "../../../lib/alumniFields";

export default async function handler(req, res) {
  const session = getSessionFromReq(req);
  if (!session || session.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });

  const { id } = req.query;

  if (req.method === "GET") {
    const alumnus = await prisma.alumni.findUnique({ where: { id } });
    if (!alumnus) return res.status(404).json({ error: "Not found" });
    return res.status(200).json(alumnus);
  }

  if (req.method === "PUT") {
    const alumnus = await prisma.alumni.update({ where: { id }, data: sanitizeAlumniAdminInput(req.body || {}) });
    return res.status(200).json(alumnus);
  }

  if (req.method === "DELETE") {
    await prisma.alumni.delete({ where: { id } });
    return res.status(204).end();
  }

  res.setHeader("Allow", "GET, PUT, DELETE");
  return res.status(405).json({ error: "Method not allowed" });
}
