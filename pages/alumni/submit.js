import { useState } from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import PageHeader from "../../components/PageHeader";

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
};

export default function AlumniSubmit() {
  const [form, setForm] = useState(EMPTY);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
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
      const res = await fetch("/api/alumni/upload", { method: "POST", body });
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
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/alumni", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <Seo title="Share Your Alumni Story" path="/alumni/submit" description="Were you part of ASCOLP as staff, an associate, or an intern? Share your story with our alumni network." />
      <PageHeader title="Share Your Story" crumb="Alumni / Share Your Story" />

      <section className="contact-page">
        <div className="container" style={{ maxWidth: "640px" }}>
          {done ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <h3>Thank you!</h3>
              <p>Your submission has been received and will appear on our Alumni page once reviewed by our team.</p>
              <a href="/alumni" className="thm-btn" style={{ marginTop: "20px", display: "inline-block" }}>
                Back to Alumni
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p style={{ marginBottom: "30px" }}>
                Were you part of ASCOLP as staff, an associate, or an intern? Tell us where you are now — submissions are
                reviewed before appearing on the Alumni page.
              </p>
              {error ? <p style={{ color: "#b91c1c", marginBottom: "16px" }}>{error}</p> : null}

              <Field label="Full Name *">
                <input required style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} />
              </Field>

              <Field label="Photo">
                {form.photoUrl ? <img src={form.photoUrl} alt="" style={{ width: "100px", display: "block", marginBottom: "10px" }} /> : null}
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoUpload} disabled={uploading} />
                {uploading ? <span style={{ marginLeft: "10px" }}>Uploading…</span> : null}
              </Field>

              <Field label="Role while at ASCOLP (e.g. Intern, Associate, NYSC)">
                <input style={inputStyle} value={form.roleAtFirm} onChange={(e) => set("roleAtFirm", e.target.value)} />
              </Field>

              <Field label="Years at ASCOLP (e.g. 2018–2020)">
                <input style={inputStyle} value={form.yearsAtFirm} onChange={(e) => set("yearsAtFirm", e.target.value)} />
              </Field>

              <Field label="Current Role">
                <input style={inputStyle} value={form.currentPosition} onChange={(e) => set("currentPosition", e.target.value)} />
              </Field>

              <Field label="Current Organization">
                <input style={inputStyle} value={form.currentOrganization} onChange={(e) => set("currentOrganization", e.target.value)} />
              </Field>

              <Field label="Country">
                <input style={inputStyle} value={form.country} onChange={(e) => set("country", e.target.value)} />
              </Field>

              <Field label="Your Experience With ASCOLP">
                <textarea style={{ ...inputStyle, minHeight: "120px" }} value={form.bio} onChange={(e) => set("bio", e.target.value)} />
              </Field>

              <Field label="LinkedIn URL">
                <input style={inputStyle} value={form.linkedinUrl} onChange={(e) => set("linkedinUrl", e.target.value)} />
              </Field>

              <button type="submit" disabled={submitting} className="thm-btn">
                {submitting ? "Submitting…" : "Submit"}
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}

const inputStyle = { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" };

function Field({ label, children }) {
  return (
    <label style={{ display: "block", marginBottom: "18px" }}>
      <span style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>{label}</span>
      {children}
    </label>
  );
}
