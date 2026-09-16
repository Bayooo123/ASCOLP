import Layout from "../../components/Layout";
import Seo from "../../components/Seo";

const DEPARTMENTS = [
  {
    eyebrow: "Department",
    title: "Tax Practice & Advisory",
    summary:
      "Primary tax advisors and counsel to corporations, public institutions and individuals — covering tax planning, compliance, advisory and tax controversy including arbitration and litigation.",
    lead: "Led by Prof. Abiola Sanni (SAN) & Tax Attorneys",
    enquireSubject: "Tax%20Unit%20enquiry",
    href: "/practice-areas/tax-unit",
  },
  {
    eyebrow: "Department",
    title: "Corporate & Commercial Practice",
    summary:
      "A cohesive team combining extensive experience with the skill to deal with any legal challenge — dealing with every assignment with the primary purpose of establishing an enduring client relationship.",
    lead: "Practice Head — Kolawole G. Abdulsalam, Esq.",
    enquireSubject: "Corporate%20%26%20Commercial%20enquiry",
    href: "/practice-areas/corporate",
  },
  {
    eyebrow: "Department",
    title: "Litigation & Alternative Dispute Resolution",
    summary:
      "Comprehensive representation and strategic guidance for clients in disputes — through litigation in the courts or through arbitration and mediation, with a pragmatic approach to outcomes.",
    lead: "Legal & Property — Iniobong Inieke Umoh, Senior Associate",
    enquireSubject: "Litigation%20%26%20ADR%20enquiry",
    href: "/practice-areas/litigation-arbitrations",
  },
  {
    eyebrow: "Regulatory",
    title: "Regulatory & Public Policy",
    summary:
      "Review and improvement of policy and legislative documents across taxation, lottery and gaming regulation and tax administration, plus capacity building for MDAs including the Federal Ministry of Finance, the Nigeria Revenue Service and the Kano State Revenue Service.",
    lead: "Led by the Principal Partner",
    enquireSubject: "Regulatory%20%26%20Public%20Policy%20enquiry",
    href: "/practice-areas/regulatory-public-policy",
  },
  {
    eyebrow: "Company secretary",
    title: "Corporate Secretarial Services",
    summary:
      "As certified company secretaries: board meeting materials and minutes, statutory registers and records, annual filings with government agencies, and identification and mitigation of legal and regulatory risk.",
    lead: "Certified company secretaries",
    enquireSubject: "Corporate%20Secretarial%20enquiry",
    href: "/practice-areas/corporate-secretarial",
  },
  {
    eyebrow: "Private client",
    title: "Probate Services",
    summary:
      "Documentation and filing of the probate process for testate and intestate clients — reading and marking of the will, court processes, asset identification, estate distribution, conflict resolution and estate management.",
    lead: "Acting as probate officer",
    enquireSubject: "Probate%20enquiry",
    href: "/practice-areas/probate",
  },
  {
    eyebrow: "Access to justice",
    title: "Pro Bono Services",
    summary:
      "For over 35 years the Firm has taken on pro bono and subsidized-fee engagements for individuals and organisations facing financial hardship — spanning litigation and ADR, corporate advisory and tax matters.",
    lead: "Across all departments",
    enquireSubject: "Pro%20bono%20enquiry",
    enquireLabel: "Apply",
    href: "/practice-areas/pro-bono-services",
    ivory: true,
  },
];

export default function PracticeAreasPage() {
  return (
    <Layout>
      <Seo
        title="Practice Areas"
        path="/practice-areas"
        description="ASCOLP's practice area groups: Tax Practice, Litigation and ADR, Corporate Advisory and Secretarial Services, Real Estate and Property Law, and Government and Regulatory Advisory."
      />

      <div className="rd">
        <section className="rd-hero">
          <div className="rd-container rd-hero__inner rd-hero__inner--split">
            <div>
              <p className="rd-kicker">Practice Areas</p>
              <h1>ASCOLP prides itself in offering the highest standards in legal practice.</h1>
              <p className="rd-intro">
                Formerly Abiola Sanni and Co., the Firm comprises practice area groups covering Tax Practice &amp; Advisory; Litigation and ADR; Corporate
                Advisory and Secretarial Services; Real Estate and Property Law; and Government and Regulatory Advisory.
              </p>
              <ul className="rd-chips">
                <li className="rd-chip">Tax Practice &amp; Advisory</li>
                <li className="rd-chip">Litigation &amp; ADR</li>
                <li className="rd-chip">Corporate Advisory &amp; Secretarial Services</li>
                <li className="rd-chip">Real Estate &amp; Property Law</li>
                <li className="rd-chip">Government &amp; Regulatory Advisory</li>
              </ul>
            </div>
            <div className="rd-enquiry-card">
              <p className="rd-serif">Not sure which team you need?</p>
              <p className="rd-body-sm">Tell us about the matter and we will route it to the right department within one working day.</p>
              <div className="rd-btn-row">
                <a href="mailto:info@abiolasanniandco.com?subject=New%20matter%20enquiry" className="rd-btn rd-btn--primary">
                  Describe your matter
                </a>
                <a href="tel:+2347069268744" className="rd-btn rd-btn--secondary">
                  Call +234 706 926 8744
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="rd-section" style={{ paddingTop: "32px", paddingBottom: "72px" }}>
          <div className="rd-cards-grid">
            {DEPARTMENTS.map((dept) => (
              <article className={`rd-dept-card${dept.ivory ? " rd-dept-card--ivory" : ""}`} key={dept.title}>
                <p className="rd-eyebrow">{dept.eyebrow}</p>
                <h3>{dept.title}</h3>
                <p className="rd-body-sm">{dept.summary}</p>
                <p className="rd-lead-line">{dept.lead}</p>
                <div className="rd-card-links">
                  {dept.href ? (
                    <a href={dept.href} className="rd-link">
                      Practice note
                    </a>
                  ) : (
                    <a href="/contact" className="rd-link">
                      Contact team
                    </a>
                  )}
                  <a href={`mailto:info@abiolasanniandco.com?subject=${dept.enquireSubject}`} className="rd-link--muted">
                    {dept.enquireLabel || "Enquire"}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rd-cta-band">
          <div className="rd-cta-band__inner">
            <h2>Legal practice, arbitration, tax practice, company secretary.</h2>
            <div className="rd-btn-row">
              <a href="/discuss-a-matter" className="rd-btn rd-btn--primary rd-btn--lg rd-btn--on-dark">
                Discuss a Matter
              </a>
              <a href="tel:+2347069268744" className="rd-btn rd-btn--secondary rd-btn--lg rd-btn--on-dark">
                +234 706 926 8744
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
