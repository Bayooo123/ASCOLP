import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import PageHeader from "../../components/PageHeader";
import { prisma } from "../../lib/prisma";

export async function getStaticProps() {
  let members = [];
  try {
    members = await prisma.teamMember.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
      select: {
        slug: true,
        name: true,
        credentials: true,
        title: true,
        photoUrl: true,
        linkedinUrl: true,
        twitterUrl: true,
        facebookUrl: true,
      },
    });
  } catch {
    members = [];
  }
  return { props: { members }, revalidate: 300 };
}

export default function TeamPage({ members }) {
  return (
    <Layout>
      <Seo title="Our Team" path="/team" description="Meet the partners, associates and staff of Abiola Sanni & Co. (ASCOLP)." />
      <PageHeader title="Our Team" crumb="Our Team" />

      <section className="team-page">
        <div className="container">
          <div className="row">
            {members.map((member, i) => (
              <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay={`${((i % 3) + 1) * 100}ms`} key={member.slug}>
                <div className="team-one__single">
                  <div className="team-one__img">
                    <a href={`/team/${member.slug}`}>
                      <img src={member.photoUrl || "/assets/images/logo/logo.png"} alt={member.name} />
                      <div className="team-one__content">
                        <h3 className="team-one__name">
                          {member.name}
                          {member.credentials ? <br /> : null}
                          {member.credentials}
                        </h3>
                        {member.title ? <p className="team-one__title">{member.title}</p> : null}
                      </div>
                    </a>
                    {member.linkedinUrl || member.twitterUrl || member.facebookUrl ? (
                      <ul className="list-unstyled team-one__social">
                        {member.twitterUrl ? (
                          <li>
                            <a href={member.twitterUrl} target="_blank" rel="noreferrer">
                              <i className="fab fa-twitter"></i>
                            </a>
                          </li>
                        ) : null}
                        {member.facebookUrl ? (
                          <li>
                            <a href={member.facebookUrl} target="_blank" rel="noreferrer">
                              <i className="fab fa-facebook"></i>
                            </a>
                          </li>
                        ) : null}
                        {member.linkedinUrl ? (
                          <li>
                            <a href={member.linkedinUrl} target="_blank" rel="noreferrer">
                              <i className="fab fa-linkedin"></i>
                            </a>
                          </li>
                        ) : null}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!members.length ? <p className="text-center">Team profiles are being updated — check back soon.</p> : null}
        </div>
      </section>

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
