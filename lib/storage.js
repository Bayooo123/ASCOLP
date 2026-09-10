import fs from "fs/promises";
import path from "path";
import { naijabase } from "./db";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const BUCKET = "uploads";

// Local-disk storage works for `next dev`, but Vercel's filesystem is
// read-only at runtime outside /tmp, so production uploads go to Naijabase's
// storage service instead (a public bucket named "uploads").
export async function saveUpload(buffer, originalFilename, contentType) {
  const ext = path.extname(originalFilename || "").slice(0, 10);
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;

  if (process.env.VERCEL) {
    const { error } = await naijabase.storage.from(BUCKET).upload(safeName, buffer, {
      contentType,
      upsert: true,
    });
    if (error) throw new Error(`Storage upload failed: ${error.message}`);
    return naijabase.storage.from(BUCKET).getPublicUrl(safeName).publicUrl;
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, safeName), buffer);
  return `/uploads/${safeName}`;
}
