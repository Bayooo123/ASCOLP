import { db, upsertOne } from "../../lib/db";
import { hashPassword } from "../../lib/auth";
import { TEAM_MEMBERS, DEAL_HISTORY } from "../../db/seedData";

// One-time bootstrap endpoint: run initial team roster + first admin login
// against the production database without needing a direct DB connection
// from wherever this is deployed from. Gated by SETUP_TOKEN so it isn't a
// public write endpoint. Safe to call more than once (all writes upsert).
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = req.headers["x-setup-token"];
  if (!process.env.SETUP_TOKEN || token !== process.env.SETUP_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
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
