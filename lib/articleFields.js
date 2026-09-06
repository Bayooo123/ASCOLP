const ALLOWED_FIELDS = [
  "slug",
  "title",
  "type",
  "summary",
  "body",
  "fileUrl",
  "coverImageUrl",
  "externalUrl",
  "author",
  "published",
  "publishedAt",
];

export function sanitizeArticleInput(data) {
  const out = {};
  for (const key of ALLOWED_FIELDS) {
    if (data[key] !== undefined) out[key] = data[key];
  }
  if (out.publishedAt) out.publishedAt = new Date(out.publishedAt);
  if (out.published && !out.publishedAt) out.publishedAt = new Date();
  return out;
}
