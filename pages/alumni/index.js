import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
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

      <div className="rd">
        <section className="rd-hero">
          <div className="rd-container rd-hero__inner">
            <p className="rd-kicker">Alumni</p>
            <h1 style={{ fontSize: "clamp(34px, 4.4vw, 50px)" }}>A legacy beyond the Firm.</h1>
            <p className="rd-intro">
              Over the years, several lawyers and law students have passed through ASCOLP, and we&rsquo;ve since
              developed a robust network of alumni actively practicing law or excelling in their chosen endeavours
              &mdash; within and outside Nigeria. If you&rsquo;re one of them, we&rsquo;d love to hear where you are
              now.
            </p>
            <div className="rd-btn-row">
              <a href="/alumni/submit" className="rd-btn rd-btn--primary">
                Share Your Story
              </a>
            </div>
          </div>
        </section>

        <section className="rd-section">
          <div className="rd-container">
            {alumni.length ? (
              <div className="rd-team-grid rd-team-grid--assoc">
                {alumni.map((person) => (
                  <article className="rd-team-card" key={person.id}>
                    <div
                      className="rd-team-card__media"
                      style={{ backgroundImage: `url("${person.photoUrl || "/assets/images/logo/logo.png"}")` }}
                    ></div>
                    <div className="rd-team-card__body">
                      <h3>{person.name}</h3>
                      {person.roleAtFirm ? (
                        <p className="rd-meta">
                          {person.roleAtFirm}
                          {person.yearsAtFirm ? ` · ${person.yearsAtFirm}` : ""}
                        </p>
                      ) : null}
                      {person.currentPosition || person.currentOrganization ? (
                        <p className="rd-body-sm">
                          Now: {[person.currentPosition, person.currentOrganization, person.country].filter(Boolean).join(", ")}
                        </p>
                      ) : null}
                      {person.linkedinUrl ? (
                        <a href={person.linkedinUrl} target="_blank" rel="noreferrer" className="rd-link">
                          LinkedIn →
                        </a>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: "center", color: "var(--rd-secondary)" }}>
                Alumni profiles are being added — check back soon, or be the first to share your story above.
              </p>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
