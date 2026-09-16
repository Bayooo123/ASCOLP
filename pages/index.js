import Link from "next/link";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import HeroCarousel from "../components/HeroCarousel";
import { db } from "../lib/db";

const SCENARIOS = [
  {
    tag: "Tax Controversy",
    title: "Facing an unexpected tax audit, penalty or assessment?",
    desc: "From the Tax Appeal Tribunal to appellate courts, we represent multinationals, banks and local enterprises against disputed liabilities.",
    action: "Tax Controversy Counsel",
    href: "/practice-areas/tax-unit",
  },
  {
    tag: "Corporate Advisory",
    title: "Structuring a cross-border merger, acquisition or joint venture?",
    desc: "Comprehensive transaction structuring, statutory due diligence, board advisory and certified company secretarial execution.",
    action: "Corporate & M&A Practice",
    href: "/practice-areas/corporate",
  },
  {
    tag: "Commercial Litigation",
    title: "Involved in high-stakes contract, maritime or banking dispute?",
    desc: "Led by Senior Advocates and seasoned trial counsel across superior courts of record, domestic tribunals and international arbitration.",
    action: "Litigation & ADR Practice",
    href: "/practice-areas/litigation-arbitrations",
  },
  {
    tag: "Public Law & Policy",
    title: "Navigating legislative reform, state tax rules or MDA regulations?",
    desc: "Direct counsel on policy incubation, statutory interpretation and institutional regulatory compliance across federal and state levels.",
    action: "Regulatory Advisory",
    href: "/practice-areas/regulatory-public-policy",
  },
];

const PRACTICE_GROUPS = [
  {
    title: "Tax Practice & Advisory",
    description: "Tax planning, compliance, advisory and controversy for public and private businesses across multiple jurisdictions.",
    href: "/practice-areas/tax-unit",
  },
  {
    title: "Litigation & ADR",
    description: "Representation and strategic guidance for clients in disputes, through the courts or through arbitration and mediation.",
    href: "/practice-areas/litigation-arbitrations",
  },
  {
    title: "Corporate Advisory & Secretarial",
    description: "Corporate and commercial advisory, board governance and certified company secretarial services.",
    href: "/practice-areas/corporate",
  },
  {
    title: "Real Estate & Property Law",
    description: "Property transactions, documentation and disputes across residential, commercial and probate matters.",
    href: "/practice-areas/probate",
  },
  {
    title: "Government & Regulatory Advisory",
    description: "Policy and legislative advisory, tax administration and capacity building for public sector clients.",
    href: "/practice-areas/regulatory-public-policy",
  },
];

export async function getStaticProps() {
  try {
    const { data: articles } = await db("articles")
      .select("slug, title, summary, publishedAt, author, type")
      .eq("published", true)
      .order("publishedAt", { ascending: false })
      .limit(2);

    return {
      props: {
        latestArticles: articles || [],
      },
      revalidate: 60,
    };
  } catch (err) {
    return {
      props: { latestArticles: [] },
      revalidate: 60,
    };
  }
}

export default function Home({ latestArticles = [] }) {
  return (
    <Layout>
      <Seo path="/" />

      <div className="rd">
        {/* 1. Hero Carousel */}
        <HeroCarousel />

        {/* 2. Positioning Strip */}
        <section className="rd-positioning-strip">
          <div className="rd-positioning-strip__inner">
            <a href="tel:+2347069268744" className="rd-phone-link">
              Chambers Direct: +234 706 926 8744
            </a>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13.5px" }}>
              14 Barikisu Street, Yaba, Lagos · Established in Practice Over 35 Years
            </span>
          </div>
        </section>

        {/* 3. Client Intent Scenarios ("How We Assist") */}
        <section className="rd-section" style={{ paddingBottom: "20px" }}>
          <div className="rd-container">
            <p className="rd-kicker">Client Intent</p>
            <h2 style={{ fontSize: "clamp(26px, 3.2vw, 36px)", lineHeight: 1.2, margin: "0 0 10px" }}>
              Immediate pathways to counsel based on your legal situation.
            </h2>
            <p style={{ fontSize: "16.5px", lineHeight: 1.65, color: "var(--rd-secondary)", maxWidth: "66ch", margin: 0 }}>
              Whether responding to a tax assessment notice, preparing for appellate litigation, or negotiating a commercial joint venture, our practice heads provide direct strategic guidance.
            </p>

            <div className="rd-scenarios-grid">
              {SCENARIOS.map((sc) => (
                <Link href={sc.href} key={sc.tag} className="rd-scenario-card">
                  <div>
                    <span className="rd-scenario-card__tag">{sc.tag}</span>
                    <h3>{sc.title}</h3>
                    <p>{sc.desc}</p>
                  </div>
                  <span className="rd-scenario-card__action">
                    {sc.action} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Core Practice Groups */}
        <section className="rd-practice-groups">
          <div className="rd-practice-groups__left">
            <p className="rd-kicker">Core Practice</p>
            <h2>Five groups, one standard of practice.</h2>
            <p className="rd-intro">
              ASCOLP comprises practice area groups covering taxation, litigation, corporate advisory, property law and
              government regulatory work, each led by senior counsel.
            </p>
            <Link href="/practice-areas" className="rd-link">
              Explore all practice areas →
            </Link>
          </div>
          <div className="rd-practice-groups__stack">
            {PRACTICE_GROUPS.map((group) => (
              <div className="rd-practice-groups__row" key={group.title}>
                <Link href={group.href} style={{ textDecoration: "none", color: "inherit" }}>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Institutional Authority: The Principal Partner & Senior Bench */}
        <section className="rd-partner-band">
          <div className="rd-partner-band__inner">
            <div
              className="rd-partner-band__portrait"
              style={{ backgroundImage: 'url("/assets/images/team/prof-abiola-sanni.jpg")' }}
            ></div>
            <div className="rd-partner-band__body">
              <p className="rd-kicker">Principal Partner &amp; Senior Advocate of Nigeria</p>
              <h2>Prof. Abiola Sanni (SAN) PhD.</h2>
              <p className="rd-summary">
                Professor Abiola Sanni is one of Nigeria&rsquo;s foremost authorities on tax law, with thirty-three
                years post-call experience shaping the development of Nigerian fiscal law across academia, corporate
                advisory and public policy. He chaired both the National Tax Policy Review Committee (2016) and the National Tax Policy Implementation Committee (2017).
              </p>
              <div className="rd-btn-row" style={{ alignItems: "center" }}>
                <Link href="/team/abiola-sanni" className="rd-btn rd-btn--primary">
                  Read Full Dossier
                </Link>
                <Link href="/team" className="rd-btn rd-btn--secondary">
                  Meet the Full Bench
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Knowledge & Legal Intelligence */}
        {latestArticles.length > 0 && (
          <section className="rd-section" style={{ paddingBottom: "24px" }}>
            <div className="rd-container">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
                <div>
                  <p className="rd-kicker">ASCOLP Knowledge</p>
                  <h2 style={{ fontSize: "clamp(26px, 3.2vw, 36px)", lineHeight: 1.2, margin: 0 }}>
                    Applied analysis on legislation, tax controversy &amp; judicial precedents.
                  </h2>
                </div>
                <Link href="/articles" className="rd-link" style={{ fontSize: "15.5px", fontWeight: 600 }}>
                  View all publications &amp; treatises →
                </Link>
              </div>

              <div className="rd-cards-grid">
                {latestArticles.map((art) => (
                  <article className="rd-article-card" key={art.slug}>
                    <div className="rd-pdf-tile-wrap">
                      <div className="rd-pdf-tile">
                        <span>PDF</span>
                      </div>
                    </div>
                    <div className="rd-article-card__body">
                      <p className="rd-eyebrow">{art.type === "NEWSLETTER" ? "ASCO Publication" : "Legal Treatise"}</p>
                      <h3>
                        <Link href={`/articles/${art.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                          {art.title}
                        </Link>
                      </h3>
                      {art.summary && <p className="rd-body-sm">{art.summary}</p>}
                      <div className="rd-btn-row" style={{ marginTop: "12px" }}>
                        <Link href={`/articles/${art.slug}`} className="rd-btn rd-btn--primary">
                          Read Analysis
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 7. ASCO Publishers Highlight */}
        <section className="rd-section" style={{ paddingTop: "24px", paddingBottom: "24px" }}>
          <div className="rd-container">
            <div className="rd-split" style={{ border: "1px solid var(--rd-border)", background: "var(--rd-ivory)" }}>
              <div
                className="rd-split__media"
                style={{ backgroundImage: 'url("/assets/images/about/ascolp-tax-p.jpg")', minHeight: "320px" }}
              ></div>
              <div className="rd-split__body" style={{ padding: "36px" }}>
                <p className="rd-kicker" style={{ marginBottom: "10px" }}>Institutional Publishing</p>
                <h2 style={{ fontSize: "28px", lineHeight: 1.25, margin: "0 0 14px" }}>
                  ASCO Publishers — Law Reporting &amp; Academic Treatises
                </h2>
                <p style={{ fontSize: "16px", lineHeight: 1.65, color: "var(--rd-secondary)", margin: "0 0 20px" }}>
                  The firm publishes the <em>Nigerian Revenue Law Reports (NRLR)</em> and <em>African Tax Law Reports (ATLR)</em>, alongside specialist treatises on Nigerian commercial and business law referenced across superior courts and faculties of law.
                </p>
                <div className="rd-btn-row">
                  <Link href="/publishers" className="rd-btn rd-btn--primary">
                    Explore Publishers Catalogue
                  </Link>
                  <Link href="/discuss-a-matter" className="rd-btn rd-btn--secondary">
                    Discuss a Matter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Executive Matter Intake CTA Band */}
        <section className="rd-enquiry-band">
          <div className="rd-enquiry-band__bg" style={{ backgroundImage: 'url("/assets/images/hero/lagos.jpg")' }}></div>
          <div className="rd-enquiry-band__inner">
            <div className="rd-enquiry-band__text">
              <h2>Instruct the Firm on an active matter.</h2>
              <p>
                Confidential matter intake, conflict check initiation and scoping with senior counsel within one business day.
              </p>
            </div>
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
