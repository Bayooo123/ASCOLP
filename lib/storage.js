import fs from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

// Local-disk storage works for `next dev` but Vercel's filesystem is
// read-only at runtime outside /tmp, so this does NOT persist uploads in
// production. Swap this function for Naijabase storage (or S3/Cloudinary)
// before enabling photo uploads on the live site.
export async function saveUpload(buffer, originalFilename) {
  if (process.env.VERCEL) {
    throw new Error(
      "File storage isn't wired up for production yet — local disk storage doesn't persist on Vercel. " +
        "Configure a real object storage backend in lib/storage.js before uploading files here."
    );
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const ext = path.extname(originalFilename || "").slice(0, 10);
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  await fs.writeFile(path.join(UPLOAD_DIR, safeName), buffer);
  return `/uploads/${safeName}`;
}
