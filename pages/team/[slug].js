import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { db } from "../../lib/db";

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { data: member } = await db("teamMembers").select("*").eq("slug", params.slug).maybeSingle();

  if (!member || !member.published) {
    return { notFound: true, revalidate: 60 };
  }

  const { data: dealHistory } = await db("dealRecords").select("*").eq("teamMemberId", member.id).order("sortOrder");
  const { data: articles } = await db("articles").select("*").eq("published", true).order("publishedAt", { ascending: false });

  return {
    props: {
      member: { ...member, dealHistory: dealHistory || [] },
      articles: articles || [],
    },
    revalidate: 60,
  };
}

const CREDENTIAL_CHIPS = [
  "Senior Advocate of Nigeria, 2021",
  "Chairman, National Tax Policy Review Committee, 2016",
  "Chairman, National Tax Policy Implementation Committee, 2017",
  "Fulbright Fellow, Temple University, 2003",
  "Fellow, Chartered Institute of Taxation of Nigeria",
  "ICC & UNCITRAL arbitration since 2011",
];

const STATS = [
  { figure: "2021", label: "Admitted to the Inner Bar as SAN" },
  { figure: "33", label: "Years post-call experience" },
  { figure: "2016", label: "Simultaneous professorial chair, UNILAG" },
  { figure: "2", label: "Federal tax policy committees chaired" },
];

const PRINCIPAL_PARTNER_PROFILE = [
  "His distinguished career has shaped the development of Nigerian tax law across academia, corporate advisory and public policy. His contributions to the field extend from scholarship and teaching to advising businesses and institutions on complex tax matters and contributing to tax policy development. He was admitted to the Inner Bar as a Senior Advocate of Nigeria (SAN) in 2021.",
  "He obtained his Bachelor's and Masters of Law degrees from Obafemi Awolowo University, Ile-Ife in 1989 and 1992 respectively. In 1991 he began his teaching career at Obafemi Awolowo University as a Junior Trainee Fellow, rose through the ranks to Lecturer 1 and served as Acting Head, Department of Business Law in 1997. He transferred his service to the University of Lagos in 1999. In 2003 he won the prestigious Fulbright Fellowship for foreign scholars — a ten-month fellowship at the International Tax Programme of Beasley School of Law, Temple University, Philadelphia — and was appointed a Research Fellow of the same University's Institute of International Law and Policy. In 2016 he had the singular honour of being simultaneously appointed Professor of Commercial Law and occupier of a professorial chair endowed by Lagos State for the advancement of taxation and fiscal matters.",
  "He is a Fellow of the Chartered Institute of Taxation of Nigeria, where he has served as Dean of the Faculty of Indirect Tax and a member of the Taxation Standard Board; a Fellow of the Nigerian Institute of Chartered Arbitrators; and a life member of the Nigerian Society of International Law. Since 2011 he has been involved in international arbitration under the ICC and UNCITRAL Rules as well as domestic arbitration. He is the author of Introduction to Nigerian Business Law and the founder and publisher of the Nigerian Revenue Law Reports and African Tax Law Reports — the first law reports devoted to tax cases in Nigeria and Africa respectively.",
  "He is a member of the Tax Advisory Committee “Think-Tank” Group for the Federal Inland Revenue Service, has served on the Federal Government Fiscal Reform Committee responsible for incubating annual Finance Acts since 2019, and has been a member of the Advisory Group of the International Centre for Tax and Development since 2017.",
];

export default function TeamMemberPage({ member, articles }) {
  const isPrincipalPartner = member.slug === "abiola-sanni";
  const bioParagraphs = isPrincipalPartner ? PRINCIPAL_PARTNER_PROFILE : member.bio ? member.bio.split("\n\n") : [];
  const authoredArticles = isPrincipalPartner ? articles : [];

  return (
    <Layout>
      <Seo
        title={member.name}
        path={`/team/${member.slug}`}
        description={bioParagraphs[0] ? bioParagraphs[0].slice(0, 160) : `${member.name}${member.title ? `, ${member.title}` : ""} at ASCOLP.`}
        image={member.photoUrl || undefined}
      />

      <div className="rd">
        <div className="rd-breadcrumb">
          <div className="rd-breadcrumb__inner">
            <a href="/team" style={{ color: "var(--rd-maroon)", fontWeight: 600 }}>
              Our Team
            </a>
            <span>/</span>
            <span>{member.name}</span>
          </div>
        </div>

        <div className="rd-layout-2col">
          <aside className="rd-sticky-rail">
            <div
              className="rd-split__portrait"
              style={{ backgroundImage: `url("${member.photoUrl || "/assets/images/logo/logo.png"}")`, aspectRatio: "4 / 4.6", border: "1px solid var(--rd-border)" }}
            ></div>
            <div className="rd-enquiry-card">
              <p className="rd-serif">{isPrincipalPartner ? "Instruct the Principal Partner" : `Instruct ${member.name.split(" ")[0]}`}</p>
              <p className="rd-body-sm">
                {isPrincipalPartner ? "Tax controversy, arbitration and regulatory matters." : member.title || "Get in touch about a matter."}
              </p>
              <a
                href="/discuss-a-matter"
                className="rd-btn rd-btn--primary"
                style={{ marginTop: "8px", textAlign: "center" }}
              >
                Brief Us
              </a>
              <a href="tel:+2347069268744" className="rd-btn rd-btn--secondary" style={{ background: "#ffffff", textAlign: "center" }}>
                +234 706 926 8744
              </a>
            </div>
            {isPrincipalPartner ? (
              <div className="rd-rail-block">
                <h3>Practice areas</h3>
                <a href="/practice-areas/tax-unit" className="rd-link">
                  Tax Practice &amp; Advisory
                </a>
                <a href="/practice-areas/regulatory-public-policy" className="rd-link">
                  Regulatory &amp; Public Policy
                </a>
                <a href="/practice-areas/litigation-arbitrations" className="rd-link">
                  Litigation &amp; ADR
                </a>
              </div>
            ) : null}
          </aside>

          <div className="rd-profile-main">
            <header className="rd-profile-header">
              <p className="rd-kicker">{member.title || "Team"}</p>
              <h1>{member.name}</h1>
              {member.credentials ? <p className="rd-meta-line">{member.credentials}</p> : null}
              {isPrincipalPartner ? (
                <p className="rd-lede">Professor Abiola Sanni is one of Nigeria&rsquo;s leading authorities on tax law.</p>
              ) : null}
            </header>

            {isPrincipalPartner ? (
              <section className="rd-stat-strip">
                {STATS.map((stat) => (
                  <div className="rd-stat-strip__item" key={stat.label}>
                    <p className="rd-stat-figure rd-serif">{stat.figure}</p>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </section>
            ) : null}

            <section className="rd-profile-section">
              <h2>Profile</h2>
              {bioParagraphs.length ? (
                bioParagraphs.map((para, i) => (
                  <p className="rd-body-lg" key={i}>
                    {para}
                  </p>
                ))
              ) : (
                <p className="rd-body-lg">Full profile coming soon.</p>
              )}
            </section>

            {member.dealHistory && member.dealHistory.length ? (
              <section className="rd-profile-section">
                <h2>Selected experience</h2>
                <div className="rd-exp-list">
                  {member.dealHistory.map((deal) => (
                    <article className="rd-exp-item" key={deal.id}>
                      <div className="rd-exp-item__head">
                        <h3>{deal.title}</h3>
                        <span>{[deal.practiceArea, deal.year].filter(Boolean).join(" · ")}</span>
                      </div>
                      {deal.description ? <p>{deal.description}</p> : null}
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {authoredArticles.length ? (
              <section className="rd-profile-section">
                <h2>Publications &amp; Insights</h2>
                <div className="rd-pub-list">
                  {authoredArticles.map((article) => (
                    <a href={`/articles/${article.slug}`} className="rd-pub-card" key={article.slug}>
                      <span className="rd-eyebrow">{article.type === "NEWSLETTER" ? "ASCO Publication" : "Legal Treatise"}</span>
                      <span className="rd-pub-title">{article.title}</span>
                      {article.summary ? <span className="rd-pub-summary">{article.summary}</span> : null}
                      <span className="rd-pub-cta">Read the analysis · PDF available →</span>
                    </a>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>

        <section className="rd-cta-band">
          <div className="rd-cta-band__inner">
            <h2>Instruct senior counsel on your legal matter.</h2>
            <div className="rd-btn-row">
              <a href="/discuss-a-matter" className="rd-btn rd-btn--primary rd-btn--lg rd-btn--on-dark">
                Brief Us
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
