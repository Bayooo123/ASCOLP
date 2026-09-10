import fs from "fs/promises";
import path from "path";
import { createClient } from "@naijabase/js";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const BUCKET = "uploads";

// The anon key (used for all normal db() reads/writes) isn't accepted by
// Naijabase's storage API -- it rejects it as an "invalid token" instead of
// treating it like the apikey header the database REST endpoints accept.
// Storage needs the elevated service-role key instead.
const storageClient =
  process.env.NAIJABASE_URL && process.env.NAIJABASE_SERVICE_KEY
    ? createClient(process.env.NAIJABASE_URL, process.env.NAIJABASE_SERVICE_KEY)
    : null;

// Local-disk storage works for `next dev`, but Vercel's filesystem is
// read-only at runtime outside /tmp, so production uploads go to Naijabase's
// storage service instead (a public bucket named "uploads").
export async function saveUpload(buffer, originalFilename, contentType) {
  const ext = path.extname(originalFilename || "").slice(0, 10);
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;

  if (process.env.VERCEL) {
    if (!storageClient) {
      throw new Error("NAIJABASE_SERVICE_KEY isn't configured -- file uploads can't work without it.");
    }
    const { error } = await storageClient.storage.from(BUCKET).upload(safeName, buffer, {
      contentType,
      upsert: true,
    });
    if (error) throw new Error(`Storage upload failed: ${error.message}`);
    return storageClient.storage.from(BUCKET).getPublicUrl(safeName).publicUrl;
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, safeName), buffer);
  return `/uploads/${safeName}`;
}
