import { useState } from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import Link from "next/link";

const PUBLICATIONS = [
  {
    id: "nrlr",
    category: "Law Reports",
    title: "Nigerian Revenue Law Reports (NRLR)",
    subtitle: "The definitive law report dedicated to tax, excise, and revenue jurisprudence in Nigeria.",
    editor: "Prof. Abiola Sanni (SAN) PhD. — Editor-in-Chief",
    scope: "Covers pivotal decisions from the Tax Appeal Tribunal (all zones), Federal High Court, Court of Appeal, and Supreme Court of Nigeria on corporate tax, petroleum profits tax, VAT, stamp duties, and customs tariffs.",
    volumes: "Annual & Cumulative Bound Volumes",
    year: "Established 2011",
    toc: [
      "Jurisdiction of State Internal Revenue Boards over Federal Agencies",
      "Withholding Tax Treatment of Cross-Border Technical Service Fees",
      "Constitutional Validity of Hotel Occupancy and Consumption Taxes",
      "Transfer Pricing Adjustments and Burden of Proof under FIRS Regulations",
    ],
  },
  {
    id: "atlr",
    category: "Pan-African Law Reports",
    title: "African Tax Law Reports (ATLR)",
    subtitle: "The first law report devoted to comparative tax cases across Africa.",
    editor: "Prof. Abiola Sanni (SAN) PhD. — Editor-in-Chief",
    scope: "Brings together landmark tax controversy judgments from Southern, East, Central, and West African jurisdictions, providing multinational tax directors and counsel with authoritative comparative fiscal jurisprudence.",
    volumes: "Bi-annual Series",
    year: "Continental Edition",
    toc: [
      "Permanent Establishment Thresholds for Digital Economy Actors",
      "Double Taxation Agreement Dispute Resolution across SADC & ECOWAS",
      "Mining & Hydrocarbon Fiscal Stabilisation Clauses",
      "Judicial Treatment of General Anti-Avoidance Rules (GAAR)",
    ],
  },
  {
    id: "nbl",
    category: "Academic Textbook & Treatise",
    title: "Introduction to Nigerian Business Law",
    subtitle: "Standard authority on commercial transactions and corporate practice.",
    editor: "Prof. Abiola Sanni (SAN) PhD.",
    scope: "A comprehensive treatise widely referenced in academic institutions, commercial law firms, and corporate legal departments. Covers company formation, commercial paper, agency, sale of goods, hire purchase, and insolvency.",
    volumes: "Revised Edition · Hardcover & Paperback",
    year: "ASCO Publishers",
    toc: [
      "Corporate Personality and the Limits of Judicial Veil-Piercing",
      "Contractual Allocation of Commercial Risk & Force Majeure",
      "Securities Regulation and Corporate Restructuring under CAMA",
      "Enforcement of Commercial Arbitration Agreements",
    ],
  },
  {
    id: "customary",
    category: "Jurisprudence & Monograph",
    title: "Ethical & Jurisprudential Foundations of Customary Law",
    subtitle: "Philosophical study of customary legal architecture and contemporary litigation.",
    editor: "Prof. Friday Ndubuisi (PhD., LL.M, B.L.)",
    scope: "Examines the ethical justification of customary law within pluralistic legal systems, exploring tenure, chieftaincy succession, and customary dispute resolution under Nigerian constitutional law.",
    volumes: "Research Monograph Series",
    year: "ASCO Publishers Monograph",
    toc: [
      "Legal Pluralism and the Repugnancy Test in Nigerian Superior Courts",
      "Customary Land Tenure Systems and the Land Use Act 1978",
      "Jurisprudential Validity of Unwritten Customary Norms",
    ],
  },
];

export default function PublishersPage() {
  const [activeToc, setActiveToc] = useState(null);

  return (
    <Layout>
      <Seo
        title="ASCO Publishers | Abiola Sanni & Co. LP"
        path="/publishers"
        description="Pioneering publishers of the Nigerian Revenue Law Reports, African Tax Law Reports, and specialist legal treatises."
      />

      <div className="rd">
        <section className="rd-hero">
          <div className="rd-container rd-hero__inner">
            <p className="rd-kicker">ASCO Publishers</p>
            <h1 style={{ fontSize: "clamp(32px, 4.2vw, 50px)", lineHeight: 1.12, maxWidth: "28ch" }}>
              The Documentation and Transmission of Legal Knowledge.
            </h1>
            <p className="rd-intro" style={{ fontSize: "18px", lineHeight: 1.7, maxWidth: "68ch" }}>
              Through ASCO Publishers, our firm maintains an autonomous legal publishing imprint.
              We originate the definitive law reports and specialist academic treatises relied upon by the Inner Bar,
              superior courts of record, corporate legal departments, and universities across Nigeria and Africa.
            </p>
          </div>
        </section>

        <section className="rd-section" style={{ paddingTop: "24px", paddingBottom: "72px" }}>
          <div className="rd-container">
            <div style={{ display: "grid", gap: "32px" }}>
              {PUBLICATIONS.map((pub) => (
                <article key={pub.id} className="rd-publisher-card">
                  <div className="rd-publisher-card__badge-col">
                    <div className="rd-publisher-badge">
                      <span className="rd-publisher-badge__category">{pub.category}</span>
                      <span className="rd-publisher-badge__mark">ASCO</span>
                    </div>
                  </div>

                  <div className="rd-publisher-card__content">
                    <p className="rd-eyebrow" style={{ marginBottom: "6px" }}>{pub.year} · {pub.volumes}</p>
                    <h2 style={{ fontSize: "24px", margin: "0 0 8px", lineHeight: 1.25 }}>{pub.title}</h2>
                    <p style={{ fontSize: "14.5px", fontWeight: 600, color: "var(--rd-maroon)", margin: "0 0 12px" }}>
                      {pub.editor}
                    </p>
                    <p style={{ fontSize: "15.5px", lineHeight: 1.65, color: "var(--rd-secondary)", margin: "0 0 16px" }}>
                      {pub.scope}
                    </p>

                    {activeToc === pub.id ? (
                      <div style={{ background: "var(--rd-ivory)", padding: "16px 20px", border: "1px solid var(--rd-border)", marginBottom: "16px", borderRadius: "3px" }}>
                        <p style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--rd-maroon)", margin: "0 0 8px" }}>
                          Selected Focus &amp; Leading Precedents
                        </p>
                        <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "14px", lineHeight: 1.65, color: "var(--rd-ink)" }}>
                          {pub.toc.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="rd-btn-row" style={{ alignItems: "center" }}>
                      <a
                        href={`mailto:info@abiolasanniandco.com?subject=ASCO%20Publishers%20Inquiry%20-%20${encodeURIComponent(pub.title)}`}
                        className="rd-btn rd-btn--primary"
                      >
                        Inquire / Order Volumes
                      </a>
                      <button
                        type="button"
                        className="rd-btn rd-btn--secondary"
                        onClick={() => setActiveToc(activeToc === pub.id ? null : pub.id)}
                      >
                        {activeToc === pub.id ? "Hide Contents" : "Table of Contents"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rd-cta-band">
          <div className="rd-cta-band__inner">
            <h2>Acquire law reports or submit academic treatises for review.</h2>
            <div className="rd-btn-row">
              <a
                href="mailto:info@abiolasanniandco.com?subject=ASCO%20Publishers%20Subscription"
                className="rd-btn rd-btn--primary rd-btn--lg rd-btn--on-dark"
              >
                Inquire for Institutional Library
              </a>
              <Link href="/discuss-a-matter" className="rd-btn rd-btn--secondary rd-btn--lg rd-btn--on-dark">
                Discuss a Legal Matter
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
