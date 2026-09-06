import { useState } from "react";

const EMPTY = {
  name: "",
  photoUrl: "",
  roleAtFirm: "",
  yearsAtFirm: "",
  currentPosition: "",
  currentOrganization: "",
  country: "",
  bio: "",
  linkedinUrl: "",
  approved: true,
};

const inputStyle = { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" };
const labelStyle = { display: "block", marginBottom: "16px" };
const labelTextStyle = { display: "block", marginBottom: "4px", fontSize: "14px", fontWeight: 600 };

export default function AlumniForm({ alumnus, isNew }) {
  const [form, setForm] = useState({ ...EMPTY, ...alumnus });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      set("photoUrl", data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = isNew ? "/api/alumni" : `/api/alumni/${alumnus.id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      window.location.href = "/admin/alumni";
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fff", padding: "24px", borderRadius: "8px", maxWidth: "640px" }}>
      {error ? <p style={{ color: "#b91c1c", marginBottom: "16px" }}>{error}</p> : null}

      <label style={labelStyle}>
        <span style={labelTextStyle}>Photo</span>
        {form.photoUrl ? <img src={form.photoUrl} alt="" style={{ width: "120px", display: "block", marginBottom: "10px", borderRadius: "4px" }} /> : null}
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoUpload} disabled={uploading} />
        {uploading ? <span style={{ marginLeft: "10px", fontSize: "13px" }}>Uploading…</span> : null}
      </label>

      <label style={labelStyle}>
        <span style={labelTextStyle}>Full Name *</span>
        <input style={inputStyle} required value={form.name} onChange={(e) => set("name", e.target.value)} />
      </label>
      <label style={labelStyle}>
        <span style={labelTextStyle}>Role while at ASCOLP</span>
        <input style={inputStyle} value={form.roleAtFirm || ""} onChange={(e) => set("roleAtFirm", e.target.value)} />
      </label>
      <label style={labelStyle}>
        <span style={labelTextStyle}>Years at ASCOLP</span>
        <input style={inputStyle} value={form.yearsAtFirm || ""} onChange={(e) => set("yearsAtFirm", e.target.value)} />
      </label>
      <label style={labelStyle}>
        <span style={labelTextStyle}>Current Role</span>
        <input style={inputStyle} value={form.currentPosition || ""} onChange={(e) => set("currentPosition", e.target.value)} />
      </label>
      <label style={labelStyle}>
        <span style={labelTextStyle}>Current Organization</span>
        <input style={inputStyle} value={form.currentOrganization || ""} onChange={(e) => set("currentOrganization", e.target.value)} />
      </label>
      <label style={labelStyle}>
        <span style={labelTextStyle}>Country</span>
        <input style={inputStyle} value={form.country || ""} onChange={(e) => set("country", e.target.value)} />
      </label>
      <label style={labelStyle}>
        <span style={labelTextStyle}>Bio / Experience</span>
        <textarea style={{ ...inputStyle, minHeight: "120px" }} value={form.bio || ""} onChange={(e) => set("bio", e.target.value)} />
      </label>
      <label style={labelStyle}>
        <span style={labelTextStyle}>LinkedIn URL</span>
        <input style={inputStyle} value={form.linkedinUrl || ""} onChange={(e) => set("linkedinUrl", e.target.value)} />
      </label>
      <label style={labelStyle}>
        <input type="checkbox" checked={!!form.approved} onChange={(e) => set("approved", e.target.checked)} /> Published (visible on the Alumni
        page)
      </label>

      <button
        type="submit"
        disabled={saving}
        style={{ background: "#7a1f2b", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "4px", cursor: "pointer" }}
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
