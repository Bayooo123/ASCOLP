import formidable from "formidable";
import fs from "fs/promises";
import { saveUpload } from "../../../lib/storage";

// Public upload endpoint for the alumni self-submission form — no admin
// session exists at that point. Kept separate from /api/upload (which is
// admin/team-member only) and limited the same way (type + size) since it's
// reachable by anyone with the submission link.
export const config = {
  api: { bodyParser: false },
};

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({ maxFileSize: MAX_SIZE });

  let files;
  try {
    [, files] = await form.parse(req);
  } catch (err) {
    return res.status(400).json({ error: "Upload failed: " + err.message });
  }

  const file = files.file && files.file[0];
  if (!file) return res.status(400).json({ error: "No file provided" });
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    return res.status(400).json({ error: "Only JPEG, PNG or WebP images are allowed" });
  }

  try {
    const buffer = await fs.readFile(file.filepath);
    const url = await saveUpload(buffer, file.originalFilename);
    return res.status(200).json({ url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  } finally {
    fs.unlink(file.filepath).catch(() => {});
  }
}
