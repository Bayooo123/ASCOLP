import { db } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, subject, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required" });
  }

  const { error } = await db("contactMessages").insert({ name, email, phone, subject, message });
  if (error) return res.status(500).json({ error: "Failed to send message" });
  return res.status(201).json({ ok: true });
}
