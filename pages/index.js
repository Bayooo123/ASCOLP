import Link from "next/link";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import HeroCarousel from "../components/HeroCarousel";
import { db } from "../lib/db";

const CREDENTIALS = [
  { figure: "35+", label: "Operational History" },
  { figure: "4", label: "Practice Groups" },
  { figure: "SAN", label: "Senior Advocate-led tax unit" },
];

const PRACTICE_CARDS = [
  {
    title: "Litigation & ADR",
    tagline: "Trial advocacy, arbitration and mediation.",
    image: "/assets/images/case/litigation-arbitrations.jpg",
    href: "/practice-areas/litigation-arbitrations",
  },
  {
    title: "Corporate Advisory",
    tagline: "Transactions, governance, company secretarial.",
    image: "/assets/images/case/corporate.jpg",
    href: "/practice-areas/corporate",
  },
  {
    title: "Real Estate & Property",
    tagline: "Title, development and tenancy matters.",
    image: "/assets/images/about/corporate.jpg",
    href: "/practice-areas/probate",
  },
  {
    title: "Government & Regulatory",
    tagline: "Tax law, administration, regulatory exposure.",
    image: "/assets/images/backgrounds/asco-lp.jpg",
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
        {/* A. Hero Carousel */}
        <HeroCarousel />

        {/* B. Credentials card, overhangs the hero */}
        <section className="rd-credentials-wrap">
          <div className="rd-credentials-wrap__inner">
            <div className="rd-credentials-card">
              {CREDENTIALS.map((c) => (
                <div className="rd-credentials-card__cell" key={c.label}>
                  <p className="rd-credentials-card__figure">{c.figure}</p>
                  <p className="rd-credentials-card__label">{c.label}</p>
                </div>
              ))}
              <div className="rd-credentials-card__cell rd-credentials-card__cell--cta">
                <p className="rd-credentials-card__cta-label">Speak to us</p>
                <a href="tel:+2347069268744" className="rd-credentials-card__cta-phone">
                  +234 706 926 8744
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* C. Practice groups — photographic cards */}
        <section className="rd-section" style={{ paddingTop: "64px", paddingBottom: "16px" }}>
          <div className="rd-container">
            <div className="rd-practice-photo-head">
              <div>
                <p className="rd-kicker">Practice groups</p>
                <h2>Four groups, one standard of practice.</h2>
              </div>
              <Link href="/practice-areas" className="rd-link">
                See all practice areas →
              </Link>
            </div>
            <div className="rd-practice-photo-grid">
              {PRACTICE_CARDS.map((card) => (
                <Link href={card.href} key={card.title} className="rd-practice-photo-card" style={{ backgroundImage: `url("${card.image}")` }}>
                  <div className="rd-practice-photo-card__scrim" />
                  <div className="rd-practice-photo-card__content">
                    <h3>{card.title}</h3>
                    <p>{card.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* E. Principal Partner highlight, offset maroon plate */}
        <section className="rd-partner-band">
          <div className="rd-partner-band__inner">
            <div className="rd-partner-band__portrait-wrap">
              <div className="rd-partner-band__plate"></div>
              <div
                className="rd-partner-band__portrait"
                style={{ backgroundImage: 'url("/assets/images/team/prof-abiola-sanni.jpg")' }}
              ></div>
            </div>
            <div className="rd-partner-band__body">
              <p className="rd-kicker">Principal Partner</p>
              <h2>Prof. Abiola Sanni (SAN) PhD.</h2>
              <p className="rd-summary">
                Professor of Commercial and Industrial Law, University of Lagos. Senior Advocate of Nigeria. Three
                decades of practice at every level of the courts.
              </p>
              <div className="rd-btn-row" style={{ alignItems: "center" }}>
                <Link href="/team/abiola-sanni" className="rd-btn rd-btn--primary">
                  Read the full profile
                </Link>
                <Link href="/team" className="rd-btn rd-btn--secondary">
                  Meet the whole team
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Knowledge & Legal Intelligence */}
        {latestArticles.length > 0 && (
          <section className="rd-section" style={{ paddingTop: "56px", paddingBottom: "24px" }}>
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

        {/* ASCO Publishers Highlight */}
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
                    Brief Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* F. Enquiry CTA — the only conversion band, kept last */}
        <section className="rd-enquiry-band">
          <div className="rd-enquiry-band__bg" style={{ backgroundImage: 'url("/assets/images/hero/lagos.jpg")' }}></div>
          <div className="rd-enquiry-band__vignette"></div>
          <div className="rd-enquiry-band__inner">
            <div className="rd-enquiry-band__text">
              <h2>Brief us.</h2>
              <p>We will route your enquiry to the right department within one working day.</p>
            </div>
            <div className="rd-btn-row">
              <Link href="/discuss-a-matter" className="rd-btn rd-btn--primary rd-btn--lg rd-btn--on-dark">
                Describe your matter
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
