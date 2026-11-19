import { useState } from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";

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

      <div className="rd">
        <section className="rd-hero">
          <div className="rd-container rd-hero__inner">
            <p className="rd-kicker">Alumni</p>
            <h1 style={{ fontSize: "clamp(34px, 4.4vw, 50px)" }}>Share Your Story.</h1>
            <p className="rd-intro">
              Were you part of ASCOLP as staff, an associate, or an intern? Tell us where you are now — submissions
              are reviewed before appearing on the Alumni page.
            </p>
          </div>
        </section>

        <section className="rd-section">
          <div className="rd-container" style={{ maxWidth: "720px" }}>
            <div className="rd-intake-card">
              {done ? (
                <div style={{ textAlign: "center" }}>
                  <h3 style={{ marginBottom: "10px" }}>Thank you!</h3>
                  <p style={{ color: "var(--rd-secondary)", marginBottom: "20px" }}>
                    Your submission has been received and will appear on our Alumni page once reviewed by our team.
                  </p>
                  <a href="/alumni" className="rd-btn rd-btn--primary">
                    Back to Alumni
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error ? <p style={{ color: "#b91c1c", marginBottom: "16px" }}>{error}</p> : null}
                  <div className="rd-form-stack">
                    <div className="rd-form-field">
                      <label htmlFor="a-name">Full Name *</label>
                      <input id="a-name" required value={form.name} onChange={(e) => set("name", e.target.value)} />
                    </div>

                    <div className="rd-form-field">
                      <label htmlFor="a-photo">Photo</label>
                      {form.photoUrl ? (
                        <img src={form.photoUrl} alt="" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "50%", marginBottom: "8px" }} />
                      ) : null}
                      <input id="a-photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoUpload} disabled={uploading} style={{ border: "none", padding: "4px 0" }} />
                      {uploading ? <span style={{ fontSize: "13px", color: "var(--rd-secondary)" }}>Uploading…</span> : null}
                    </div>

                    <div className="rd-form-row">
                      <div className="rd-form-field">
                        <label htmlFor="a-role">Role while at ASCOLP</label>
                        <input id="a-role" placeholder="e.g. Intern, Associate, NYSC" value={form.roleAtFirm} onChange={(e) => set("roleAtFirm", e.target.value)} />
                      </div>
                      <div className="rd-form-field">
                        <label htmlFor="a-years">Years at ASCOLP</label>
                        <input id="a-years" placeholder="e.g. 2018–2020" value={form.yearsAtFirm} onChange={(e) => set("yearsAtFirm", e.target.value)} />
                      </div>
                    </div>

                    <div className="rd-form-row">
                      <div className="rd-form-field">
                        <label htmlFor="a-position">Current Role</label>
                        <input id="a-position" value={form.currentPosition} onChange={(e) => set("currentPosition", e.target.value)} />
                      </div>
                      <div className="rd-form-field">
                        <label htmlFor="a-org">Current Organization</label>
                        <input id="a-org" value={form.currentOrganization} onChange={(e) => set("currentOrganization", e.target.value)} />
                      </div>
                    </div>

                    <div className="rd-form-field">
                      <label htmlFor="a-country">Country</label>
                      <input id="a-country" value={form.country} onChange={(e) => set("country", e.target.value)} />
                    </div>

                    <div className="rd-form-field">
                      <label htmlFor="a-bio">Your Experience With ASCOLP</label>
                      <textarea id="a-bio" style={{ minHeight: "120px" }} value={form.bio} onChange={(e) => set("bio", e.target.value)} />
                    </div>

                    <div className="rd-form-field">
                      <label htmlFor="a-linkedin">LinkedIn URL</label>
                      <input id="a-linkedin" value={form.linkedinUrl} onChange={(e) => set("linkedinUrl", e.target.value)} />
                    </div>
                  </div>

                  <button type="submit" disabled={submitting} className="rd-btn rd-btn--primary" style={{ marginTop: "22px" }}>
                    {submitting ? "Submitting…" : "Submit"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
