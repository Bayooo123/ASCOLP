import { useState } from "react";

const EMPTY = {
  slug: "",
  title: "",
  type: "ARTICLE",
  summary: "",
  body: "",
  fileUrl: "",
  coverImageUrl: "",
  externalUrl: "",
  author: "",
  published: false,
};

const inputStyle = { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" };
const labelStyle = { display: "block", marginBottom: "16px" };
const labelTextStyle = { display: "block", marginBottom: "4px", fontSize: "14px", fontWeight: 600 };

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ArticleForm({ article, isNew }) {
  const [form, setForm] = useState({ ...EMPTY, ...article });
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [error, setError] = useState("");

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleTitleChange(value) {
    set("title", value);
    if (!slugTouched) set("slug", slugify(value));
  }

  async function uploadFile(file, setLoading, field) {
    setLoading(true);
    setError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      set(field, data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = isNew ? "/api/articles" : `/api/articles/${article.id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      window.location.href = "/admin/articles";
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fff", padding: "24px", borderRadius: "8px", maxWidth: "680px" }}>
      {error ? <p style={{ color: "#b91c1c", marginBottom: "16px" }}>{error}</p> : null}

      <label style={labelStyle}>
        <span style={labelTextStyle}>Type</span>
        <select style={inputStyle} value={form.type} onChange={(e) => set("type", e.target.value)}>
          <option value="ARTICLE">Article</option>
          <option value="NEWSLETTER">Newsletter</option>
        </select>
      </label>

      <label style={labelStyle}>
        <span style={labelTextStyle}>Title *</span>
        <input style={inputStyle} required value={form.title} onChange={(e) => handleTitleChange(e.target.value)} />
      </label>

      <label style={labelStyle}>
        <span style={labelTextStyle}>URL Slug *</span>
        <input
          style={inputStyle}
          required
          value={form.slug}
          onChange={(e) => {
            setSlugTouched(true);
            set("slug", e.target.value);
          }}
        />
      </label>

      <label style={labelStyle}>
        <span style={labelTextStyle}>Summary</span>
        <textarea style={{ ...inputStyle, minHeight: "80px" }} value={form.summary || ""} onChange={(e) => set("summary", e.target.value)} />
      </label>

      <label style={labelStyle}>
        <span style={labelTextStyle}>Body (leave blank if this is just a PDF or external link)</span>
        <textarea style={{ ...inputStyle, minHeight: "160px" }} value={form.body || ""} onChange={(e) => set("body", e.target.value)} />
      </label>

      <label style={labelStyle}>
        <span style={labelTextStyle}>Cover Image</span>
        {form.coverImageUrl ? <img src={form.coverImageUrl} alt="" style={{ width: "160px", display: "block", marginBottom: "10px" }} /> : null}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => e.target.files[0] && uploadFile(e.target.files[0], setUploadingCover, "coverImageUrl")}
          disabled={uploadingCover}
        />
        {uploadingCover ? <span style={{ marginLeft: "10px" }}>Uploading…</span> : null}
      </label>

      <label style={labelStyle}>
        <span style={labelTextStyle}>PDF File (for a newsletter or downloadable article)</span>
        {form.fileUrl ? (
          <p style={{ marginBottom: "8px" }}>
            <a href={form.fileUrl} target="_blank" rel="noreferrer">
              Current file
            </a>
          </p>
        ) : null}
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => e.target.files[0] && uploadFile(e.target.files[0], setUploadingFile, "fileUrl")}
          disabled={uploadingFile}
        />
        {uploadingFile ? <span style={{ marginLeft: "10px" }}>Uploading…</span> : null}
      </label>

      <label style={labelStyle}>
        <span style={labelTextStyle}>External URL (if this links out instead, e.g. a press mention)</span>
        <input style={inputStyle} value={form.externalUrl || ""} onChange={(e) => set("externalUrl", e.target.value)} />
      </label>

      <label style={labelStyle}>
        <span style={labelTextStyle}>Author</span>
        <input style={inputStyle} value={form.author || ""} onChange={(e) => set("author", e.target.value)} />
      </label>

      <label style={labelStyle}>
        <input type="checkbox" checked={!!form.published} onChange={(e) => set("published", e.target.checked)} /> Published (visible on the site)
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
