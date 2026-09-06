const ADMIN_FIELDS = [
  "name",
  "photoUrl",
  "roleAtFirm",
  "yearsAtFirm",
  "currentRole",
  "currentOrganization",
  "country",
  "bio",
  "linkedinUrl",
  "approved",
];

const PUBLIC_SUBMISSION_FIELDS = [
  "name",
  "photoUrl",
  "roleAtFirm",
  "yearsAtFirm",
  "currentRole",
  "currentOrganization",
  "country",
  "bio",
  "linkedinUrl",
];

export function sanitizeAlumniAdminInput(data) {
  const out = {};
  for (const key of ADMIN_FIELDS) {
    if (data[key] !== undefined) out[key] = data[key];
  }
  return out;
}

export function sanitizeAlumniSubmission(data) {
  const out = {};
  for (const key of PUBLIC_SUBMISSION_FIELDS) {
    if (data[key] !== undefined) out[key] = data[key];
  }
  return out;
}
