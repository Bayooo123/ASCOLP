import Layout from "../components/Layout";
import Seo from "../components/Seo";
import HeroCarousel from "../components/HeroCarousel";

const PRACTICE_GROUPS = [
  {
    title: "Litigation & ADR",
    description: "Representation and strategic guidance for clients in disputes, through the courts or through arbitration and mediation.",
  },
  {
    title: "Corporate Advisory & Secretarial",
    description: "Corporate and commercial advisory, board governance and certified company secretarial services.",
  },
  {
    title: "Real Estate & Property Law",
    description: "Property transactions, documentation and disputes across residential, commercial and probate matters.",
  },
  {
    title: "Government & Regulatory Advisory",
    description: "Policy and legislative advisory, tax administration and capacity building for public sector clients.",
  },
];

export default function Home() {
  return (
    <Layout>
      <Seo path="/" />

      <div className="rd">
        <HeroCarousel />

        <section className="rd-positioning-strip">
          <div className="rd-positioning-strip__inner">
            <p className="rd-serif">Tax, corporate, property and regulatory counsel — under one roof in Yaba, Lagos.</p>
            <a href="tel:+2347069268744" className="rd-phone-link">
              Call +234 706 926 8744
            </a>
          </div>
        </section>

        <section className="rd-practice-groups">
          <div className="rd-practice-groups__left">
            <p className="rd-kicker">Practice groups</p>
            <h2>Four groups, one standard of practice.</h2>
            <p className="rd-intro">
              ASCOLP comprises practice area groups covering litigation, corporate advisory, property law and
              government regulatory work, each led by senior counsel.
            </p>
            <a href="/practice-areas" className="rd-link">
              See all practice areas
            </a>
          </div>
          <div className="rd-practice-groups__stack">
            {PRACTICE_GROUPS.map((group) => (
              <div className="rd-practice-groups__row" key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rd-section" style={{ paddingBottom: "24px" }}>
          <div className="rd-split">
            <div className="rd-split__media" style={{ backgroundImage: 'url("/assets/images/hero/scales.jpg")', minHeight: "360px" }}></div>
            <div className="rd-split__body">
              <p className="rd-kicker" style={{ marginBottom: "12px" }}>
                Flagship practice
              </p>
              <h2>The Tax Unit</h2>
              <p className="rd-lead">
                Headed by Prof. Abiola Sanni (SAN), internationally and locally recognised as a tax expert, advising
                public and private businesses on all tax aspects of their operations in multiple jurisdictions.
              </p>
              <div className="rd-btn-row" style={{ alignItems: "center" }}>
                <a href="mailto:info@abiolasanniandco.com?subject=Tax%20Unit%20enquiry" className="rd-btn rd-btn--primary">
                  Speak to the Tax Unit
                </a>
                <a href="/articles" className="rd-link rd-link--underline">
                  Read our tax analyses
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="rd-partner-band">
          <div className="rd-partner-band__inner">
            <div
              className="rd-partner-band__portrait"
              style={{ backgroundImage: 'url("/assets/images/team/prof-abiola-sanni.jpg")' }}
            ></div>
            <div className="rd-partner-band__body">
              <p className="rd-kicker">Principal Partner</p>
              <h2>Prof. Abiola Sanni (SAN) PhD.</h2>
              <p className="rd-summary">
                Professor Abiola Sanni is one of Nigeria&rsquo;s leading authorities on tax law, with thirty-three
                years post-call experience shaping the development of Nigerian tax law across academia, corporate
                advisory and public policy.
              </p>
              <div className="rd-btn-row" style={{ alignItems: "center" }}>
                <a href="/team/abiola-sanni" className="rd-btn rd-btn--primary">
                  Read the full profile
                </a>
                <a href="/team" className="rd-btn rd-btn--secondary">
                  Meet the whole team
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="rd-enquiry-band">
          <div className="rd-enquiry-band__bg" style={{ backgroundImage: 'url("/assets/images/hero/lagos.jpg")' }}></div>
          <div className="rd-enquiry-band__inner">
            <div className="rd-enquiry-band__text">
              <h2>Tell us about your matter.</h2>
              <p>We will route your enquiry to the right department within one working day.</p>
            </div>
            <div className="rd-btn-row">
              <a href="mailto:info@abiolasanniandco.com?subject=New%20matter%20enquiry" className="rd-btn rd-btn--primary rd-btn--lg rd-btn--on-dark">
                Describe your matter
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
