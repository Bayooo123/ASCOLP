import fs from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Local-disk storage works for `next dev`, but Vercel's filesystem is
// read-only at runtime outside /tmp. Naijabase's storage service turned out
// not to accept the project's API keys (its S3-compatible mode isn't fully
// available yet), so production uploads go to Vercel Blob instead.
export async function saveUpload(buffer, originalFilename, contentType) {
  const ext = path.extname(originalFilename || "").slice(0, 10);
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;

  if (process.env.VERCEL) {
    const blob = await put(safeName, buffer, {
      access: "public",
      contentType,
    });
    return blob.url;
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, safeName), buffer);
  return `/uploads/${safeName}`;
}
