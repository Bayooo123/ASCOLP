import Link from "next/link";
import Layout from "./Layout";
import Seo from "./Seo";

export default function PracticeAreaLayout({
  title,
  kicker = "Expertise",
  headline,
  intro,
  path,
  scenarios = [],
  whatWeDo = [],
  expertisePoints = [],
  representativeMatters = [],
  relatedKnowledge = [],
  lawyers = [],
  leadCounsel,
  matterCategory,
}) {
  return (
    <Layout>
      <Seo title={`${title} | ASCOLP`} path={path} description={intro} />

      <div className="rd">
        {/* Breadcrumb */}
        <div className="rd-breadcrumb">
          <div className="rd-breadcrumb__inner">
            <Link href="/" style={{ color: "var(--rd-muted)" }}>
              Home
            </Link>
            <span>/</span>
            <Link href="/practice-areas" style={{ color: "var(--rd-maroon)", fontWeight: 600 }}>
              Expertise
            </Link>
            <span>/</span>
            <span style={{ color: "var(--rd-ink)" }}>{title}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="rd-hero" style={{ paddingBottom: "36px" }}>
          <div className="rd-container rd-hero__inner">
            <p className="rd-kicker">{kicker}</p>
            <h1 style={{ fontSize: "clamp(32px, 4vw, 46px)", lineHeight: 1.15, maxWidth: "30ch" }}>
              {headline || title}
            </h1>
            {intro && (
              <p className="rd-intro" style={{ fontSize: "17.5px", lineHeight: 1.7, maxWidth: "68ch" }}>
                {intro}
              </p>
            )}
          </div>
        </section>

        {/* 2-Column Content Layout */}
        <section className="rd-section" style={{ paddingTop: "0", paddingBottom: "72px" }}>
          <div className="rd-layout-2col">
            <div style={{ display: "grid", gap: "48px", minWidth: 0 }}>
              {/* 1. The Client Scenarios / Problem */}
              {scenarios.length > 0 && (
                <div>
                  <p className="rd-kicker" style={{ marginBottom: "8px" }}>Client Scenarios</p>
                  <h2 style={{ fontSize: "24px", margin: "0 0 16px" }}>When clients instruct our practice</h2>
                  <div style={{ display: "grid", gap: "12px" }}>
                    {scenarios.map((sc, i) => (
                      <div key={i} style={{ padding: "16px 20px", background: "var(--rd-ivory)", borderLeft: "3px solid var(--rd-maroon)" }}>
                        <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.6, color: "var(--rd-ink)" }}>{sc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. What We Do */}
              {whatWeDo.length > 0 && (
                <div>
                  <p className="rd-kicker" style={{ marginBottom: "8px" }}>Scope of Practice</p>
                  <h2 style={{ fontSize: "24px", margin: "0 0 16px" }}>Core advisory and representation</h2>
                  <ul className="rd-bullets">
                    {whatWeDo.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 3. Relevant Expertise */}
              {expertisePoints.length > 0 && (
                <div>
                  <p className="rd-kicker" style={{ marginBottom: "8px" }}>Statutory &amp; Institutional Depth</p>
                  <h2 style={{ fontSize: "24px", margin: "0 0 16px" }}>Areas of specialized competence</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
                    {expertisePoints.map((ep, i) => (
                      <div key={i} style={{ border: "1px solid var(--rd-border)", padding: "18px 20px" }}>
                        <h3 style={{ fontSize: "16.5px", margin: "0 0 6px", color: "var(--rd-ink)" }}>{ep.title}</h3>
                        <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.55, color: "var(--rd-secondary)" }}>{ep.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Representative Matters */}
              {representativeMatters.length > 0 && (
                <div>
                  <p className="rd-kicker" style={{ marginBottom: "8px" }}>Demonstrated Experience</p>
                  <h2 style={{ fontSize: "24px", margin: "0 0 16px" }}>Representative transactions and disputes</h2>
                  <div style={{ display: "grid", gap: "12px" }}>
                    {representativeMatters.map((matter, i) => (
                      <div key={i} style={{ border: "1px solid var(--rd-border)", padding: "16px 20px" }}>
                        <span style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--rd-muted)", display: "block", marginBottom: "4px" }}>
                          {matter.sector || "Commercial Matter"}
                        </span>
                        <p style={{ margin: 0, fontSize: "14.5px", lineHeight: 1.6, color: "var(--rd-ink)" }}>{matter.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Assigned Counsel Bench */}
              {lawyers.length > 0 && (
                <div>
                  <p className="rd-kicker" style={{ marginBottom: "8px" }}>Practice Bench</p>
                  <h2 style={{ fontSize: "24px", margin: "0 0 20px" }}>Counsel handling these matters</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                    {lawyers.map((lawyer) => (
                      <Link href={`/team/${lawyer.slug}`} key={lawyer.slug} style={{ textDecoration: "none", color: "inherit" }}>
                        <div style={{ border: "1px solid var(--rd-border)", padding: "18px 20px", transition: "border-color 0.15s ease" }}>
                          <h3 style={{ fontSize: "16px", margin: "0 0 4px", color: "var(--rd-ink)" }}>{lawyer.name}</h3>
                          <p style={{ margin: "0 0 6px", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--rd-maroon)" }}>
                            {lawyer.role || "Counsel"}
                          </p>
                          <span className="rd-link" style={{ fontSize: "13px" }}>View dossier →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Relevant Knowledge */}
              {relatedKnowledge.length > 0 && (
                <div>
                  <p className="rd-kicker" style={{ marginBottom: "8px" }}>Legal Intelligence</p>
                  <h2 style={{ fontSize: "24px", margin: "0 0 16px" }}>Publications &amp; commentary</h2>
                  <div style={{ display: "grid", gap: "12px" }}>
                    {relatedKnowledge.map((art) => (
                      <Link href={`/articles/${art.slug}`} key={art.slug} style={{ textDecoration: "none", color: "inherit" }}>
                        <div style={{ border: "1px solid var(--rd-border)", padding: "16px 20px" }}>
                          <h3 style={{ fontSize: "16px", margin: "0 0 6px", color: "var(--rd-ink)" }}>{art.title}</h3>
                          {art.author && (
                            <p style={{ margin: 0, fontSize: "13px", color: "var(--rd-muted)" }}>By {art.author}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar / Sticky Rail */}
            <aside className="rd-sticky-rail">
              <div className="rd-enquiry-card">
                <p className="rd-serif">Instruct our counsel</p>
                <p className="rd-body-sm">
                  Facing an active legal issue or scoping an upcoming transaction in this area?
                </p>
                <Link
                  href="/discuss-a-matter"
                  className="rd-btn rd-btn--primary"
                  style={{ marginTop: "8px", width: "100%", textAlign: "center" }}
                >
                  Discuss a Matter
                </Link>
                <a
                  href="tel:+2347069268744"
                  className="rd-btn rd-btn--secondary"
                  style={{ marginTop: "8px", width: "100%", textAlign: "center" }}
                >
                  Call +234 706 926 8744
                </a>
              </div>

              {leadCounsel && (
                <div className="rd-rail-block">
                  <h3>Practice Lead</h3>
                  <Link href={`/team/${leadCounsel.slug}`} className="rd-link" style={{ fontSize: "16px", fontWeight: 600 }}>
                    {leadCounsel.name}
                  </Link>
                  <p style={{ margin: "4px 0 0", fontSize: "13.5px", color: "var(--rd-muted)" }}>
                    {leadCounsel.credentials || leadCounsel.role}
                  </p>
                </div>
              )}

              <div className="rd-rail-block">
                <h3>Other Practice Areas</h3>
                <Link href="/practice-areas/tax-unit" className="rd-link">Tax Practice &amp; Advisory</Link>
                <Link href="/practice-areas/litigation-arbitrations" className="rd-link">Litigation &amp; ADR</Link>
                <Link href="/practice-areas/corporate" className="rd-link">Corporate &amp; Commercial</Link>
                <Link href="/practice-areas/regulatory-public-policy" className="rd-link">Regulatory &amp; Public Policy</Link>
                <Link href="/practice-areas/corporate-secretarial" className="rd-link">Corporate Secretarial</Link>
                <Link href="/practice-areas/probate" className="rd-link">Probate &amp; Estate Administration</Link>
                <Link href="/practice-areas/pro-bono-services" className="rd-link">Pro Bono Services</Link>
              </div>
            </aside>
          </div>
        </section>

        {/* Bottom CTA Band */}
        <section className="rd-cta-band">
          <div className="rd-cta-band__inner">
            <h2>Ready to brief our {title.toLowerCase()} practice?</h2>
            <div className="rd-btn-row">
              <Link href="/discuss-a-matter" className="rd-btn rd-btn--primary rd-btn--lg rd-btn--on-dark">
                Discuss a Matter
              </Link>
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
