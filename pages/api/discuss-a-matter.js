import { db } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    category,
    description,
    deadline,
    opposingParty,
    value,
    name,
    organization,
    email,
    phone,
    preferredContact,
  } = req.body || {};

  if (!name || !email || !description) {
    return res.status(400).json({ error: "Name, email and brief description are required" });
  }

  const subject = `[Matter Intake] ${category || "General"} - ${organization ? organization + " / " : ""}${name}`;
  const compiledMessage = [
    `Matter Category: ${category || "Not specified"}`,
    `Organization / Entity: ${organization || "Individual"}`,
    `Opposing Party / Counterparty (Conflict Check): ${opposingParty || "None specified"}`,
    `Critical Filing / Hearing Deadline: ${deadline || "None specified"}`,
    `Estimated Value / Quantum: ${value || "Not disclosed"}`,
    `Preferred Contact Method: ${preferredContact || "Email"}`,
    `\nMatter Brief Summary:`,
    description,
  ].join("\n");

  const { error } = await db("contactMessages").insert({
    name,
    email,
    phone: phone || null,
    subject,
    message: compiledMessage,
  });

  if (error) {
    return res.status(500).json({ error: "Failed to submit matter details. Please call chambers directly." });
  }

  return res.status(201).json({ ok: true });
}
