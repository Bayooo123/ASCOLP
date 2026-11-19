import { useState } from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

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

      <div className="rd">
        <section className="rd-hero">
          <div className="rd-container rd-hero__inner">
            <p className="rd-kicker">Contact</p>
            <h1 style={{ fontSize: "clamp(34px, 4.4vw, 50px)" }}>Speak with the Firm.</h1>
            <p className="rd-intro">
              Reach us directly for general enquiries, or use our confidential intake portal if you are instructing on
              an active matter.
            </p>
          </div>
        </section>

        <section className="rd-section">
          <div className="rd-container rd-contact-grid">
            <div>
              <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>Get in Touch</h2>
              <p style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--rd-secondary)", marginBottom: "22px" }}>
                14 Barikisu Street, Iyede Onike, Off Custom, Yaba, Lagos, Nigeria
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.9, marginBottom: "26px" }}>
                <a href="tel:+2347069268744" style={{ display: "block", fontWeight: 700, color: "var(--rd-ink)" }}>
                  +234 706 926 8744
                </a>
                <a href="mailto:info@abiolasanniandco.com" className="rd-link">
                  info@abiolasanniandco.com
                </a>
              </p>

              <div className="rd-social-row" style={{ marginBottom: "30px" }}>
                <a href="https://www.linkedin.com/company/ascolp/" target="_blank" rel="noreferrer" className="rd-social-icon" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://twitter.com/ascolp2" target="_blank" rel="noreferrer" className="rd-social-icon" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://web.facebook.com/abiolasanniandco" target="_blank" rel="noreferrer" className="rd-social-icon" aria-label="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://wa.me/2347033190180" target="_blank" rel="noreferrer" className="rd-social-icon" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>

              <div className="rd-callout">
                <strong>Instructing on an Active Legal Matter?</strong>
                <p>
                  Use our confidential intake portal to initiate preliminary conflict checking and route your brief
                  directly to the responsible practice lead.
                </p>
                <a href="/discuss-a-matter" className="rd-btn rd-btn--primary">
                  Brief Us →
                </a>
              </div>
            </div>

            <div className="rd-intake-card">
              {done ? (
                <p style={{ margin: 0 }}>Thank you — your message has been received. We&rsquo;ll get back to you shortly.</p>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error ? <p style={{ color: "#b91c1c", marginBottom: "16px" }}>{error}</p> : null}
                  <div className="rd-form-stack">
                    <div className="rd-form-row">
                      <div className="rd-form-field">
                        <label htmlFor="c-name">Name *</label>
                        <input id="c-name" required value={form.name} onChange={(e) => set("name", e.target.value)} />
                      </div>
                      <div className="rd-form-field">
                        <label htmlFor="c-email">Email *</label>
                        <input id="c-email" required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                      </div>
                    </div>
                    <div className="rd-form-row">
                      <div className="rd-form-field">
                        <label htmlFor="c-phone">Phone</label>
                        <input id="c-phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                      </div>
                      <div className="rd-form-field">
                        <label htmlFor="c-subject">Subject</label>
                        <input id="c-subject" value={form.subject} onChange={(e) => set("subject", e.target.value)} />
                      </div>
                    </div>
                    <div className="rd-form-field">
                      <label htmlFor="c-message">Message *</label>
                      <textarea id="c-message" required style={{ minHeight: "140px" }} value={form.message} onChange={(e) => set("message", e.target.value)} />
                    </div>
                  </div>
                  <button type="submit" disabled={submitting} className="rd-btn rd-btn--primary" style={{ marginTop: "22px" }}>
                    {submitting ? "Sending…" : "Send Message"}
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
