import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import PageHeader from "../../components/PageHeader";
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

  return {
    props: {
      member: { ...member, dealHistory: dealHistory || [] },
    },
    revalidate: 60,
  };
}

export default function TeamMemberPage({ member }) {
  const bioParagraphs = member.bio ? member.bio.split("\n\n") : [];

  return (
    <Layout>
      <Seo
        title={member.name}
        path={`/team/${member.slug}`}
        description={bioParagraphs[0] ? bioParagraphs[0].slice(0, 160) : `${member.name}${member.title ? `, ${member.title}` : ""} at ASCOLP.`}
        image={member.photoUrl || undefined}
      />
      <PageHeader title={member.name} crumb={member.name} />

      <section className="work-together-two">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="work-together-two__left wow slideInLeft" data-wow-delay="100ms" data-wow-duration="2500ms">
                <div className="work-together-two__img">
                  <img src={member.photoUrl || "/assets/images/logo/logo.png"} alt={member.name} />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="work-together-tow__right">
                <div className="section-title text-left">
                  <span className="section-title__tagline">{member.title || member.name}</span>
                  <h2 className="section-title__title">
                    {member.name}
                    {member.credentials ? <span style={{ display: "block", fontSize: "16px", fontWeight: 400 }}>{member.credentials}</span> : null}
                  </h2>
                </div>

                {bioParagraphs.length ? (
                  bioParagraphs.map((para, i) => (
                    <p className="work-together-tow__text-2" key={i}>
                      {para}
                    </p>
                  ))
                ) : (
                  <p className="work-together-tow__text-2">Full profile coming soon.</p>
                )}

                <ul className="list-unstyled" style={{ marginTop: "10px" }}>
                  {member.email ? (
                    <li>
                      <strong>Email:</strong> <a href={`mailto:${member.email}`}>{member.email}</a>
                    </li>
                  ) : null}
                  {member.phone ? (
                    <li>
                      <strong>Phone:</strong> <a href={`tel:${member.phone}`}>{member.phone}</a>
                    </li>
                  ) : null}
                </ul>

                {member.linkedinUrl || member.twitterUrl || member.facebookUrl ? (
                  <div className="site-footer__social" style={{ marginTop: "15px" }}>
                    {member.linkedinUrl ? (
                      <a href={member.linkedinUrl} target="_blank" rel="noreferrer">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    ) : null}
                    {member.twitterUrl ? (
                      <a href={member.twitterUrl} target="_blank" rel="noreferrer">
                        <i className="fab fa-twitter"></i>
                      </a>
                    ) : null}
                    {member.facebookUrl ? (
                      <a href={member.facebookUrl} target="_blank" rel="noreferrer">
                        <i className="fab fa-facebook"></i>
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {member.dealHistory && member.dealHistory.length ? (
        <section className="case-one">
          <div className="container">
            <div className="section-title text-center">
              <span className="section-title__tagline">Track Record</span>
              <h2 className="section-title__title">Selected Legal &amp; Transaction Experience</h2>
            </div>
            <div className="row">
              {member.dealHistory.map((deal, i) => (
                <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay={`${(i + 1) * 100}ms`} key={deal.id}>
                  <div className="case-one__single" style={{ padding: "30px" }}>
                    <h3 className="case-one__title" style={{ fontSize: "20px" }}>
                      {deal.title}
                    </h3>
                    <p style={{ margin: "10px 0 0", fontSize: "14px", color: "var(--oslim-text)" }}>
                      {[deal.practiceArea, deal.year].filter(Boolean).join(" · ")}
                    </p>
                    {deal.description ? <p style={{ marginTop: "10px" }}>{deal.description}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="cta-one">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="cta-one__inner">
                <div className="cta-one__inner-content">
                  <div className="cta-one-shape-1 float-bob-x"></div>
                  <div className="cta-one-shape-2 float-bob-x-2"></div>
                  <h3 className="cta-one__title">Legal Practice | Arbitration | Tax Practice | Company Secretary</h3>
                  <a href="/contact" className="thm-btn cta-one__btn">
                    Discover More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
