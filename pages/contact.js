import { useState } from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";

const EMPTY = { name: "", email: "", phone: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setDone(true);
      setForm(EMPTY);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout>
      <Seo title="Contact" path="/contact" description="Get in touch with Abiola Sanni & Co. (ASCOLP)." />
      <PageHeader title="Contact Us" crumb="Contact" />

      <section className="contact-page">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <h3>Get in Touch</h3>
              <p style={{ marginTop: "10px" }}>14 Barikisu Street, Iyede Onike, Off Custom, Yaba, Lagos, Nigeria</p>
              <p style={{ marginTop: "10px" }}>
                <a href="tel:+2347069268744">+234 706 926 8744</a>
                <br />
                <a href="mailto:info@abiolasanniandco.com">info@abiolasanniandco.com</a>
              </p>
              <div className="site-footer__social" style={{ marginTop: "20px" }}>
                <a href="https://www.linkedin.com/company/ascolp/" target="_blank" rel="noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://twitter.com/ascolp2" target="_blank" rel="noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://web.facebook.com/abiolasanniandco" target="_blank" rel="noreferrer">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://wa.me/2347033190180" target="_blank" rel="noreferrer">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>

              <div style={{ background: "#fdf6f7", border: "1.5px solid var(--rd-maroon, #7B1B2A)", padding: "18px 20px", marginTop: "28px", borderRadius: "4px" }}>
                <strong style={{ display: "block", color: "var(--rd-maroon, #7B1B2A)", fontSize: "14.5px", marginBottom: "6px" }}>Instructing on an Active Legal Matter?</strong>
                <p style={{ margin: "0 0 12px", fontSize: "13.5px", lineHeight: 1.55, color: "var(--rd-ink, #11161B)" }}>
                  Use our confidential intake portal to initiate preliminary conflict checking and route your brief directly to the responsible practice lead.
                </p>
                <a href="/discuss-a-matter" style={{ display: "inline-block", background: "var(--rd-maroon, #7B1B2A)", color: "#fff", padding: "8px 16px", fontSize: "13px", fontWeight: 700, textDecoration: "none", borderRadius: "3px" }}>
                  Brief Us →
                </a>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              {done ? (
                <p>Thank you — your message has been received. We'll get back to you shortly.</p>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error ? <p style={{ color: "#b91c1c", marginBottom: "16px" }}>{error}</p> : null}
                  <Field label="Name *">
                    <input required style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} />
                  </Field>
                  <Field label="Email *">
                    <input required type="email" style={inputStyle} value={form.email} onChange={(e) => set("email", e.target.value)} />
                  </Field>
                  <Field label="Phone">
                    <input style={inputStyle} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                  </Field>
                  <Field label="Subject">
                    <input style={inputStyle} value={form.subject} onChange={(e) => set("subject", e.target.value)} />
                  </Field>
                  <Field label="Message *">
                    <textarea required style={{ ...inputStyle, minHeight: "140px" }} value={form.message} onChange={(e) => set("message", e.target.value)} />
                  </Field>
                  <button type="submit" disabled={submitting} className="thm-btn">
                    {submitting ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const inputStyle = { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" };

function Field({ label, children }) {
  return (
    <label style={{ display: "block", marginBottom: "16px" }}>
      <span style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>{label}</span>
      {children}
    </label>
  );
}
