import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { db, upsertOne } from "../../lib/db";
import { hashPassword } from "../../lib/auth";
import { TEAM_MEMBERS, DEAL_HISTORY } from "../../db/seedData";

// One-time bootstrap endpoint: run initial team roster + first admin login
// against the production database without needing a direct DB connection
// from wherever this is deployed from. Gated by SETUP_TOKEN so it isn't a
// public write endpoint. Safe to call more than once (all writes upsert).
export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    res.setHeader("Allow", "POST, GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = req.headers["x-setup-token"] || req.query.token;
  if (!process.env.SETUP_TOKEN || token !== process.env.SETUP_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.query.testStorage) {
    const projectId = process.env.NAIJABASE_URL?.split("/projects/")[1]?.split("/")[0];
    const anonKey = process.env.NAIJABASE_ANON_KEY;
    const serviceKey = process.env.NAIJABASE_SERVICE_KEY;

    const attempt = async (label, endpoint, accessKeyId, secretAccessKey) => {
      try {
        const client = new S3Client({
          endpoint,
          region: "auto",
          forcePathStyle: true,
          credentials: { accessKeyId, secretAccessKey },
        });
        await client.send(
          new PutObjectCommand({
            Bucket: "uploads",
            Key: `diag-${Date.now()}.txt`,
            Body: "ok",
            ContentType: "text/plain",
          })
        );
        return { label, endpoint, ok: true };
      } catch (err) {
        return {
          label,
          endpoint,
          ok: false,
          name: err.name,
          message: err.message,
          httpStatus: err.$metadata?.httpStatusCode,
          rawBody: err.$response?.body ? String(err.$response.body).slice(0, 300) : undefined,
        };
      }
    };

    const base = process.env.NAIJABASE_URL;
    const endpoints = [`${base}/storage/v1`, `${base}/storage/v1/s3`];

    const results = [];
    for (const endpoint of endpoints) {
      results.push(await attempt("projectId+service", endpoint, projectId, serviceKey));
      results.push(await attempt("service+service", endpoint, serviceKey, serviceKey));
    }

    return res.status(200).json({ ok: results.some((r) => r.ok), projectId, results });
  }

  if (req.query.deleteSlugs) {
    const slugs = req.query.deleteSlugs.split(",").map((s) => s.trim()).filter(Boolean);
    const deleted = [];
    const errors = [];
    for (const slug of slugs) {
      const { error } = await db("teamMembers").delete().eq("slug", slug);
      if (error) errors.push(`${slug}: ${error.message}`);
      else deleted.push(slug);
    }
    return res.status(200).json({ ok: true, deleted, errors });
  }

  const results = { teamMembers: 0, admin: null, errors: [] };

  for (const member of TEAM_MEMBERS) {
    const { data: record, error } = await upsertOne("teamMembers", "slug", member.slug, member);
    if (error) {
      results.errors.push(`${member.slug}: ${error.message}`);
      continue;
    }
    results.teamMembers += 1;

    const deals = DEAL_HISTORY[member.slug];
    if (deals && deals.length) {
      const { data: existing } = await db("dealRecords").select("id").eq("teamMemberId", record.id);
      if (!existing || existing.length === 0) {
        await db("dealRecords").insert(deals.map((deal, i) => ({ ...deal, teamMemberId: record.id, sortOrder: i })));
      }
    }
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const passwordHash = await hashPassword(adminPassword);
    const { error } = await upsertOne("users", "email", adminEmail, { passwordHash, role: "ADMIN" });
    if (error) {
      results.errors.push(`admin: ${error.message}`);
    } else {
      results.admin = adminEmail;
    }
  }

  return res.status(200).json({ ok: true, ...results });
}
