import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import PageHeader from "../../components/PageHeader";
import { db } from "../../lib/db";

export async function getStaticProps() {
  const { data } = await db("alumni").select("*").eq("approved", true).order("createdAt", { ascending: false });
  return { props: { alumni: data || [] }, revalidate: 300 };
}

export default function AlumniPage({ alumni }) {
  return (
    <Layout>
      <Seo
        title="Alumni"
        path="/alumni"
        description="Over the years, ASCOLP has built a robust network of alumni practicing law and excelling across other fields within and outside Nigeria."
      />
      <PageHeader title="ASCOLP Alumni" crumb="Alumni" />

      <section className="work-together">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section-title text-center">
                <span className="section-title__tagline">Our Growing Network</span>
                <h2 className="section-title__title">A Legacy Beyond the Firm</h2>
              </div>
              <p style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
                Over the years, several lawyers and law students have passed through ASCOLP, and we've since developed a
                robust network of alumni actively practicing law or excelling in their chosen endeavours — within and
                outside Nigeria. If you're one of them, we'd love to hear where you are now.
              </p>
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <a href="/alumni/submit" className="thm-btn">
                  Share Your Story
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-page">
        <div className="container">
          <div className="row">
            {alumni.map((person, i) => (
              <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay={`${((i % 3) + 1) * 100}ms`} key={person.id}>
                <div className="team-one__single">
                  <div className="team-one__img">
                    <img src={person.photoUrl || "/assets/images/logo/logo.png"} alt={person.name} />
                    <div className="team-one__content">
                      <h3 className="team-one__name">{person.name}</h3>
                      {person.roleAtFirm ? (
                        <p className="team-one__title">
                          {person.roleAtFirm}
                          {person.yearsAtFirm ? ` (${person.yearsAtFirm})` : ""}
                        </p>
                      ) : null}
                    </div>
                    {person.linkedinUrl ? (
                      <ul className="list-unstyled team-one__social">
                        <li>
                          <a href={person.linkedinUrl} target="_blank" rel="noreferrer">
                            <i className="fab fa-linkedin"></i>
                          </a>
                        </li>
                      </ul>
                    ) : null}
                  </div>
                  {person.currentPosition || person.currentOrganization ? (
                    <p style={{ padding: "15px 10px 0", fontSize: "14px", color: "var(--oslim-text)" }}>
                      Now: {[person.currentPosition, person.currentOrganization, person.country].filter(Boolean).join(", ")}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          {!alumni.length ? (
            <p className="text-center">Alumni profiles are being added — check back soon, or be the first to share your story above.</p>
          ) : null}
        </div>
      </section>
    </Layout>
  );
}
