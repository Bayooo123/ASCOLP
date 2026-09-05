const ALLOWED_FIELDS = [
  "slug",
  "name",
  "credentials",
  "title",
  "bio",
  "photoUrl",
  "email",
  "phone",
  "linkedinUrl",
  "twitterUrl",
  "facebookUrl",
  "isPartner",
  "featuredHome",
  "homeOrder",
  "displayOrder",
  "published",
];

export function sanitizeTeamMemberInput(data) {
  const out = {};
  for (const key of ALLOWED_FIELDS) {
    if (data[key] !== undefined) out[key] = data[key];
  }
  if (out.homeOrder !== undefined) out.homeOrder = Number(out.homeOrder) || 0;
  if (out.displayOrder !== undefined) out.displayOrder = Number(out.displayOrder) || 0;
  return out;
}
