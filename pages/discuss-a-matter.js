import { useState } from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const CATEGORIES = [
  { id: "tax", label: "Tax Controversy & Advisory", desc: "Audit disputes, tax appeal tribunal, tax planning, CETA/VAT compliance" },
  { id: "litigation", label: "Commercial Litigation & Arbitration", desc: "Appellate courts, contract disputes, insolvency, maritime, ICC/domestic arbitration" },
  { id: "corporate", label: "Corporate Advisory & Secretarial", desc: "Mergers, joint ventures, board governance, certified company secretarial services" },
  { id: "regulatory", label: "Regulatory, Policy & Public Law", desc: "Legislative drafting, MDA rulemaking, constitutional challenges, gaming/lottery regulation" },
  { id: "property", label: "Real Estate & Estate Administration", desc: "Commercial property transactions, land titles, leases, probate & estate distribution" },
  { id: "other", label: "General Institutional Retainer", desc: "Ongoing advisory, outside general counsel, cross-border institutional instructions" },
];

export default function DiscussAMatterPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    category: "Tax Controversy & Advisory",
    description: "",
    deadline: "",
    opposingParty: "",
    value: "",
    name: "",
    organization: "",
    email: "",
    phone: "",
    preferredContact: "Email",
  });

  function updateField(key, val) {
    setFormData((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/discuss-a-matter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed. Please call chambers directly.");
      }

      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err.message || "An unexpected error occurred. Please contact us by telephone.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <Seo
        title="Discuss a Matter | ASCOLP"
        path="/discuss-a-matter"
        description="Confidential matter intake and instruction scoping with ASCOLP senior counsel."
      />

      <div className="rd">
        <section className="rd-hero">
          <div className="rd-container rd-hero__inner">
            <p className="rd-kicker">Confidential Intake</p>
            <h1 style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.15, maxWidth: "26ch" }}>
              Instruct the Firm or Discuss a Confidential Matter.
            </h1>
            <p className="rd-intro" style={{ fontSize: "17.5px", lineHeight: 1.7, maxWidth: "66ch" }}>
              To ensure immediate routing to the relevant practice head and initiate conflict screening,
              please provide initial parameters regarding your legal matter.
            </p>
          </div>
        </section>

        <section className="rd-section" style={{ paddingTop: "12px", paddingBottom: "80px" }}>
          <div className="rd-container" style={{ maxWidth: "860px", margin: "0 auto" }}>
            {submitted ? (
              <div className="rd-intake-card" style={{ padding: "48px 36px", textAlign: "center" }}>
                <div style={{ width: "56px", height: "56px", margin: "0 auto 20px", borderRadius: "50%", background: "#e6f4ea", display: "grid", placeItems: "center" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#137333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h2 style={{ fontSize: "28px", margin: "0 0 12px", color: "var(--rd-ink)" }}>Matter Details Received</h2>
                <p style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--rd-secondary)", maxWidth: "54ch", margin: "0 auto 24px" }}>
                  Thank you, <strong>{formData.name}</strong>. Your matter has been logged for conflict evaluation and assigned
                  to our Practice Management team. A senior counsel will reach out via {formData.preferredContact.toLowerCase()} within one business day.
                </p>
                <div style={{ background: "var(--rd-ivory)", padding: "16px 20px", border: "1px solid var(--rd-border)", borderRadius: "4px", fontSize: "14px", color: "var(--rd-muted)", maxWidth: "50ch", margin: "0 auto 28px" }}>
                  For urgent court deadlines, pending tribunal hearings, or emergency injunctive relief, please call Chambers directly at <strong>+234 706 926 8744</strong>.
                </div>
                <a href="/" className="rd-btn rd-btn--primary">
                  Return to Homepage
                </a>
              </div>
            ) : (
              <div className="rd-intake-card">
                {/* Step indicator */}
                <div className="rd-intake-steps">
                  <div className={`rd-intake-step${step === 1 ? " is-active" : step > 1 ? " is-done" : ""}`}>
                    <span className="rd-intake-step__num">1</span>
                    <span className="rd-intake-step__title">Practice Area</span>
                  </div>
                  <div className="rd-intake-step__line"></div>
                  <div className={`rd-intake-step${step === 2 ? " is-active" : step > 2 ? " is-done" : ""}`}>
                    <span className="rd-intake-step__num">2</span>
                    <span className="rd-intake-step__title">Matter Scoping</span>
                  </div>
                  <div className="rd-intake-step__line"></div>
                  <div className={`rd-intake-step${step === 3 ? " is-active" : ""}`}>
                    <span className="rd-intake-step__num">3</span>
                    <span className="rd-intake-step__title">Counsel Routing</span>
                  </div>
                </div>

                {errorMsg && (
                  <div style={{ background: "#fdf2f2", border: "1px solid #f87171", padding: "12px 16px", color: "#991b1b", fontSize: "14px", marginBottom: "24px" }}>
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* STEP 1: Category */}
                  {step === 1 && (
                    <div>
                      <h2 style={{ fontSize: "22px", margin: "0 0 8px" }}>Select the area of law relevant to your matter</h2>
                      <p style={{ fontSize: "14.5px", color: "var(--rd-muted)", margin: "0 0 24px" }}>
                        This ensures immediate routing to the specialist partner and practice head.
                      </p>

                      <div className="rd-intake-categories">
                        {CATEGORIES.map((cat) => (
                          <label
                            key={cat.id}
                            className={`rd-category-tile${formData.category === cat.label ? " is-selected" : ""}`}
                          >
                            <input
                              type="radio"
                              name="category"
                              value={cat.label}
                              checked={formData.category === cat.label}
                              onChange={(e) => updateField("category", e.target.value)}
                              style={{ display: "none" }}
                            />
                            <div className="rd-category-tile__radio"></div>
                            <div className="rd-category-tile__content">
                              <strong>{cat.label}</strong>
                              <span>{cat.desc}</span>
                            </div>
                          </label>
                        ))}
                      </div>

                      <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
                        <button
                          type="button"
                          className="rd-btn rd-btn--primary"
                          onClick={() => setStep(2)}
                        >
                          Continue to Scoping →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Matter Scoping */}
                  {step === 2 && (
                    <div>
                      <h2 style={{ fontSize: "22px", margin: "0 0 8px" }}>Describe the matter parameters</h2>
                      <p style={{ fontSize: "14.5px", color: "var(--rd-muted)", margin: "0 0 24px" }}>
                        Provide essential context. Please refrain from sending confidential trial evidence prior to formal engagement.
                      </p>

                      <div className="rd-form-stack">
                        <div className="rd-form-field">
                          <label htmlFor="description">
                            Brief Overview of the Legal Matter / Situation <span style={{ color: "var(--rd-maroon)" }}>*</span>
                          </label>
                          <textarea
                            id="description"
                            rows={4}
                            required
                            placeholder="Describe the nature of the transaction, assessment, dispute or regulatory requirement..."
                            value={formData.description}
                            onChange={(e) => updateField("description", e.target.value)}
                          />
                        </div>

                        <div className="rd-form-row">
                          <div className="rd-form-field">
                            <label htmlFor="opposingParty">Opposing Party / Counterparty (For Conflict Screening)</label>
                            <input
                              id="opposingParty"
                              type="text"
                              placeholder="e.g. FIRS, LIRS, Bank or Counterparty name"
                              value={formData.opposingParty}
                              onChange={(e) => updateField("opposingParty", e.target.value)}
                            />
                          </div>

                          <div className="rd-form-field">
                            <label htmlFor="deadline">Critical Filing, Tribunal or Hearing Deadline (if any)</label>
                            <input
                              id="deadline"
                              type="text"
                              placeholder="e.g. 14-day notice, Hearing on 24th Oct"
                              value={formData.deadline}
                              onChange={(e) => updateField("deadline", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="rd-form-field">
                          <label htmlFor="value">Estimated Claim, Transaction or Matter Value (Optional)</label>
                          <input
                            id="value"
                            type="text"
                            placeholder="e.g. ₦50M, $1.2M, or Non-monetary relief"
                            value={formData.value}
                            onChange={(e) => updateField("value", e.target.value)}
                          />
                        </div>
                      </div>

                      <div style={{ marginTop: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <button
                          type="button"
                          className="rd-btn rd-btn--secondary"
                          onClick={() => setStep(1)}
                        >
                          ← Back
                        </button>
                        <button
                          type="button"
                          className="rd-btn rd-btn--primary"
                          disabled={!formData.description.trim()}
                          onClick={() => setStep(3)}
                        >
                          Continue to Details →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Instructor Information */}
                  {step === 3 && (
                    <div>
                      <h2 style={{ fontSize: "22px", margin: "0 0 8px" }}>Your contact information</h2>
                      <p style={{ fontSize: "14.5px", color: "var(--rd-muted)", margin: "0 0 24px" }}>
                        Where should our practice management team send the matter briefing confirmation?
                      </p>

                      <div className="rd-form-stack">
                        <div className="rd-form-row">
                          <div className="rd-form-field">
                            <label htmlFor="name">
                              Full Name <span style={{ color: "var(--rd-maroon)" }}>*</span>
                            </label>
                            <input
                              id="name"
                              type="text"
                              required
                              placeholder="Counsel / Executive name"
                              value={formData.name}
                              onChange={(e) => updateField("name", e.target.value)}
                            />
                          </div>

                          <div className="rd-form-field">
                            <label htmlFor="organization">Company / Corporate Entity (or Individual)</label>
                            <input
                              id="organization"
                              type="text"
                              placeholder="Organization or Individual client"
                              value={formData.organization}
                              onChange={(e) => updateField("organization", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="rd-form-row">
                          <div className="rd-form-field">
                            <label htmlFor="email">
                              Email Address <span style={{ color: "var(--rd-maroon)" }}>*</span>
                            </label>
                            <input
                              id="email"
                              type="email"
                              required
                              placeholder="counsel@corporation.com"
                              value={formData.email}
                              onChange={(e) => updateField("email", e.target.value)}
                            />
                          </div>

                          <div className="rd-form-field">
                            <label htmlFor="phone">Telephone / Mobile</label>
                            <input
                              id="phone"
                              type="tel"
                              placeholder="+234 ..."
                              value={formData.phone}
                              onChange={(e) => updateField("phone", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="rd-form-field">
                          <label htmlFor="preferredContact">Preferred Method of Communication</label>
                          <select
                            id="preferredContact"
                            value={formData.preferredContact}
                            onChange={(e) => updateField("preferredContact", e.target.value)}
                          >
                            <option value="Email">Email Communication</option>
                            <option value="Phone Call">Direct Telephone Call</option>
                            <option value="Meeting">In-Person Consultation at Chambers (Yaba, Lagos)</option>
                          </select>
                        </div>
                      </div>

                      {/* Legal Privilege & Conflict Screening Disclaimer */}
                      <div className="rd-privilege-notice">
                        <p>
                          <strong>Professional Privilege &amp; Conflict Notice:</strong> Transmission of preliminary matter information
                          does not create an advocate-client relationship. ASCOLP conducts formal conflict checks before issuing an engagement
                          letter. All submitted parameters remain strictly confidential in accordance with the Rules of Professional Conduct for Legal Practitioners.
                        </p>
                      </div>

                      <div style={{ marginTop: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <button
                          type="button"
                          className="rd-btn rd-btn--secondary"
                          onClick={() => setStep(2)}
                        >
                          ← Back
                        </button>
                        <button
                          type="submit"
                          className="rd-btn rd-btn--primary"
                          disabled={loading || !formData.name || !formData.email}
                        >
                          {loading ? "Submitting Matter..." : "Submit Confidential Matter Details"}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
