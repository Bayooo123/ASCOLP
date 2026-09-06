import { useState } from "react";

const EMPTY = {
  slug: "",
  name: "",
  credentials: "",
  title: "",
  bio: "",
  photoUrl: "",
  email: "",
  phone: "",
  linkedinUrl: "",
  twitterUrl: "",
  facebookUrl: "",
  isPartner: false,
  featuredHome: false,
  homeOrder: 0,
  displayOrder: 0,
  published: true,
};

const inputStyle = { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" };
const labelStyle = { display: "block", marginBottom: "16px" };
const labelTextStyle = { display: "block", marginBottom: "4px", fontSize: "14px", fontWeight: 600 };

export default function TeamMemberForm({ member, isAdmin, isNew }) {
  const [form, setForm] = useState({ ...EMPTY, ...member });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [deals, setDeals] = useState(member?.dealHistory || []);
  const [newDeal, setNewDeal] = useState({ title: "", practiceArea: "", year: "", description: "" });
  const [accessResult, setAccessResult] = useState(null);
  const [grantingAccess, setGrantingAccess] = useState(false);

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
      const url = isNew ? "/api/team" : `/api/team/${member.id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      window.location.href = isAdmin ? "/admin/team" : "/admin";
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  async function handleAddDeal(e) {
    e.preventDefault();
    if (!newDeal.title) return;
    const res = await fetch(`/api/team/${member.id}/deals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDeal),
    });
    const data = await res.json();
    if (res.ok) {
      setDeals((prev) => [...prev, data]);
      setNewDeal({ title: "", practiceArea: "", year: "", description: "" });
    } else {
      alert(data.error || "Failed to add");
    }
  }

  async function handleDeleteDeal(dealId) {
    const res = await fetch(`/api/team/${member.id}/deals/${dealId}`, { method: "DELETE" });
    if (res.ok) setDeals((prev) => prev.filter((d) => d.id !== dealId));
  }

  async function handleGrantAccess() {
    if (!form.email) {
      alert("Add an email address above and save first, so their login has somewhere to be tied to.");
      return;
    }
    setGrantingAccess(true);
    setAccessResult(null);
    try {
      const res = await fetch(`/api/team/${member.id}/access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to grant access");
      setAccessResult(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setGrantingAccess(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: "24px", borderRadius: "8px", maxWidth: "640px" }}>
        {error ? <p style={{ color: "#b91c1c", marginBottom: "16px" }}>{error}</p> : null}

        <label style={labelStyle}>
          <span style={labelTextStyle}>Photo</span>
          {form.photoUrl ? <img src={form.photoUrl} alt="" style={{ width: "120px", display: "block", marginBottom: "10px", borderRadius: "4px" }} /> : null}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoUpload} disabled={uploading} />
          {uploading ? <span style={{ marginLeft: "10px", fontSize: "13px" }}>Uploading…</span> : null}
        </label>

        {isAdmin ? (
          <>
            <label style={labelStyle}>
              <span style={labelTextStyle}>Full Name *</span>
              <input style={inputStyle} required value={form.name} onChange={(e) => set("name", e.target.value)} />
            </label>
            <label style={labelStyle}>
              <span style={labelTextStyle}>URL Slug *</span>
              <input style={inputStyle} required value={form.slug} onChange={(e) => set("slug", e.target.value)} />
            </label>
            <label style={labelStyle}>
              <span style={labelTextStyle}>Credentials (e.g. LL.B., B.L.)</span>
              <input style={inputStyle} value={form.credentials || ""} onChange={(e) => set("credentials", e.target.value)} />
            </label>
            <label style={labelStyle}>
              <span style={labelTextStyle}>Title / Role</span>
              <input style={inputStyle} value={form.title || ""} onChange={(e) => set("title", e.target.value)} />
            </label>
          </>
        ) : (
          <p style={{ marginBottom: "16px" }}>
            <strong>{form.name}</strong> — {form.title}
          </p>
        )}

        <label style={labelStyle}>
          <span style={labelTextStyle}>Bio</span>
          <textarea style={{ ...inputStyle, minHeight: "160px" }} value={form.bio || ""} onChange={(e) => set("bio", e.target.value)} />
        </label>
        <label style={labelStyle}>
          <span style={labelTextStyle}>Email</span>
          <input style={inputStyle} type="email" value={form.email || ""} onChange={(e) => set("email", e.target.value)} />
        </label>
        <label style={labelStyle}>
          <span style={labelTextStyle}>Phone</span>
          <input style={inputStyle} value={form.phone || ""} onChange={(e) => set("phone", e.target.value)} />
        </label>
        <label style={labelStyle}>
          <span style={labelTextStyle}>LinkedIn URL</span>
          <input style={inputStyle} value={form.linkedinUrl || ""} onChange={(e) => set("linkedinUrl", e.target.value)} />
        </label>
        <label style={labelStyle}>
          <span style={labelTextStyle}>Twitter URL</span>
          <input style={inputStyle} value={form.twitterUrl || ""} onChange={(e) => set("twitterUrl", e.target.value)} />
        </label>
        <label style={labelStyle}>
          <span style={labelTextStyle}>Facebook URL</span>
          <input style={inputStyle} value={form.facebookUrl || ""} onChange={(e) => set("facebookUrl", e.target.value)} />
        </label>

        {isAdmin ? (
          <>
            <label style={labelStyle}>
              <input type="checkbox" checked={!!form.isPartner} onChange={(e) => set("isPartner", e.target.checked)} /> Partner
            </label>
            <label style={labelStyle}>
              <input type="checkbox" checked={!!form.featuredHome} onChange={(e) => set("featuredHome", e.target.checked)} /> Show in homepage
              slideshow
            </label>
            <label style={labelStyle}>
              <span style={labelTextStyle}>Homepage slideshow order</span>
              <input style={inputStyle} type="number" value={form.homeOrder} onChange={(e) => set("homeOrder", e.target.value)} />
            </label>
            <label style={labelStyle}>
              <span style={labelTextStyle}>Team page display order</span>
              <input style={inputStyle} type="number" value={form.displayOrder} onChange={(e) => set("displayOrder", e.target.value)} />
            </label>
            <label style={labelStyle}>
              <input type="checkbox" checked={!!form.published} onChange={(e) => set("published", e.target.checked)} /> Published (visible on the
              site)
            </label>
          </>
        ) : null}

        <button
          type="submit"
          disabled={saving}
          style={{ background: "#7a1f2b", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "4px", cursor: "pointer" }}
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </form>

      {!isNew ? (
        <div style={{ background: "#fff", padding: "24px", borderRadius: "8px", maxWidth: "640px", marginTop: "24px" }}>
          <h3 style={{ marginBottom: "16px" }}>Legal &amp; Transaction Experience</h3>
          {deals.map((deal) => (
            <div key={deal.id} style={{ borderBottom: "1px solid #eee", padding: "10px 0", display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong>{deal.title}</strong>
                <div style={{ fontSize: "13px", color: "#666" }}>{[deal.practiceArea, deal.year].filter(Boolean).join(" · ")}</div>
                {deal.description ? <div style={{ fontSize: "14px", marginTop: "4px" }}>{deal.description}</div> : null}
              </div>
              <button onClick={() => handleDeleteDeal(deal.id)} style={{ color: "#b91c1c", background: "none", border: "none", cursor: "pointer" }}>
                Remove
              </button>
            </div>
          ))}

          <form onSubmit={handleAddDeal} style={{ marginTop: "16px" }}>
            <label style={labelStyle}>
              <span style={labelTextStyle}>Matter / Deal Title</span>
              <input style={inputStyle} value={newDeal.title} onChange={(e) => setNewDeal((p) => ({ ...p, title: e.target.value }))} />
            </label>
            <div style={{ display: "flex", gap: "12px" }}>
              <label style={{ ...labelStyle, flex: 1 }}>
                <span style={labelTextStyle}>Practice Area</span>
                <input style={inputStyle} value={newDeal.practiceArea} onChange={(e) => setNewDeal((p) => ({ ...p, practiceArea: e.target.value }))} />
              </label>
              <label style={{ ...labelStyle, width: "120px" }}>
                <span style={labelTextStyle}>Year</span>
                <input style={inputStyle} value={newDeal.year} onChange={(e) => setNewDeal((p) => ({ ...p, year: e.target.value }))} />
              </label>
            </div>
            <label style={labelStyle}>
              <span style={labelTextStyle}>Description</span>
              <textarea style={inputStyle} value={newDeal.description} onChange={(e) => setNewDeal((p) => ({ ...p, description: e.target.value }))} />
            </label>
            <button type="submit" style={{ background: "#333", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer" }}>
              Add Entry
            </button>
          </form>
        </div>
      ) : null}

      {!isNew && isAdmin ? (
        <div style={{ background: "#fff", padding: "24px", borderRadius: "8px", maxWidth: "640px", marginTop: "24px" }}>
          <h3 style={{ marginBottom: "8px" }}>Login Access</h3>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "16px" }}>
            Grant this person their own login so they can edit their bio, photo, and deal history — save their email above first.
          </p>
          <button
            type="button"
            onClick={handleGrantAccess}
            disabled={grantingAccess}
            style={{ background: "#333", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer" }}
          >
            {grantingAccess ? "Working…" : "Grant / Reset Login"}
          </button>
          {accessResult ? (
            <div style={{ marginTop: "16px", padding: "12px", background: "#fef3c7", borderRadius: "4px", fontSize: "14px" }}>
              <p>
                Share these with {accessResult.email} — this password won't be shown again:
              </p>
              <p style={{ marginTop: "6px" }}>
                <strong>Email:</strong> {accessResult.email}
                <br />
                <strong>Temporary password:</strong> <code>{accessResult.password}</code>
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
