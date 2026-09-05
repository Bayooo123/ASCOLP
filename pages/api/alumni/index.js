import { prisma } from "../../../lib/prisma";
import { getSessionFromReq } from "../../../lib/auth";
import { sanitizeAlumniAdminInput, sanitizeAlumniSubmission } from "../../../lib/alumniFields";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = getSessionFromReq(req);
    if (!session || session.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });
    const alumni = await prisma.alumni.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json(alumni);
  }

  if (req.method === "POST") {
    const session = getSessionFromReq(req);
    const isAdmin = session && session.role === "ADMIN";
    const data = req.body || {};

    if (!data.name) return res.status(400).json({ error: "Name is required" });

    const record = isAdmin
      ? { ...sanitizeAlumniAdminInput(data), source: "ADMIN", approved: data.approved !== false }
      : { ...sanitizeAlumniSubmission(data), source: "SELF_SUBMITTED", approved: false };

    const alumnus = await prisma.alumni.create({ data: record });
    return res.status(201).json(alumnus);
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
