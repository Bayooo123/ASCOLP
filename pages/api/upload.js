import formidable from "formidable";
import fs from "fs/promises";
import { getSessionFromReq } from "../../lib/auth";
import { saveUpload } from "../../lib/storage";

export const config = {
  api: { bodyParser: false },
};

const MAX_SIZE = 15 * 1024 * 1024; // 15MB (covers newsletter/article PDFs)
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

export default async function handler(req, res) {
  const session = getSessionFromReq(req);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

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
    return res.status(400).json({ error: "Only JPEG, PNG, WebP images or PDF files are allowed" });
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
