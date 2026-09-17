import Layout from "../components/Layout";
import Seo from "../components/Seo";

const FIRM_STATS = [
  { figure: "35+", label: "Years advising businesses and public institutions in Nigeria" },
  { figure: "5", label: "Practice groups, each led by senior counsel" },
  { figure: "2021", label: "Principal Partner admitted Senior Advocate of Nigeria" },
  { figure: "2", label: "Law report series founded by the Firm" },
];

const PARTNER_CHIPS = [
  "Senior Advocate of Nigeria, 2021",
  "Professor of Commercial Law, University of Lagos",
  "Fellow, Chartered Institute of Taxation of Nigeria",
  "Founder & Publisher, Nigerian Revenue Law Reports",
];

export default function About() {
  return (
    <Layout>
      <Seo
        title="About ASCOLP"
        path="/about"
        description="Formerly Abiola Sanni and Co. A practice of dedicated transactional lawyers proficient across litigation, arbitration, taxation, property law, corporate and commercial law and technology law practice."
      />

      <div className="rd">
        <section className="rd-hero">
          <div className="rd-container rd-hero__inner">
            <p className="rd-kicker">About ASCOLP</p>
            <h1 style={{ fontSize: "clamp(38px, 5vw, 58px)", lineHeight: 1.07, maxWidth: "28ch" }}>
              A distinguished and leading legal and tax services provider in Nigeria.
            </h1>
            <p className="rd-intro" style={{ fontSize: "18px", lineHeight: 1.7, maxWidth: "66ch" }}>
              Formerly Abiola Sanni and Co. A practice of dedicated transactional lawyers proficient across litigation,
              arbitration, taxation, property law, corporate and commercial law and technology law practice — serving
              local and international clients equally.
            </p>
          </div>
        </section>

        <section className="rd-section" style={{ paddingBottom: "16px" }}>
          <div className="rd-container">
            <div className="rd-profile-section" style={{ marginBottom: "40px" }}>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 36px)", lineHeight: 1.15 }}>The Firm</h2>
              <p className="rd-body-lg">
                The Firm [ASCOLP] is a distinguished and leading legal/tax services provider in Nigeria, comprised of
                dedicated transactional lawyers who are proficient in a wide spectrum of legal services. Our expertise
                spans litigation, arbitration, taxation, property law, corporate and commercial law and technology law
                practice, serving both local and international clients equally.
              </p>
              <p className="rd-body-lg">
                With a history of professional achievement and excellence over the years, and a commitment to delivering
                prompt and effective services to our esteemed clients, the Firm has earned a strong reputation in the
                legal service community.
              </p>
              <p className="rd-body-lg">
                At ASCOLP we pride ourselves on our multidisciplinary approach, with departments staffed by highly
                qualified professionals who combine academic prowess with practical experience — supported by a skilled
                administrative and business services team. This synergy enables us to deliver meticulous and innovative
                services, underpinned by exhaustive research and tailored strategies. Our hallmark is a steadfast
                dedication to the unique aspects of each case, delivering bespoke and effective solutions aligned with
                our clients&rsquo; needs.
              </p>
            </div>

            <section className="rd-stat-strip">
              {FIRM_STATS.map((stat) => (
                <div className="rd-stat-strip__item" key={stat.label}>
                  <p className="rd-stat-figure rd-serif">{stat.figure}</p>
                  <p>{stat.label}</p>
                </div>
              ))}
            </section>
          </div>
        </section>

        <section className="rd-section" id="our-philosophy" style={{ paddingTop: "16px", paddingBottom: "16px" }}>
          <div className="rd-container rd-philosophy-grid">
            <div>
              <p className="rd-kicker">Our Philosophy</p>
              <blockquote
                style={{
                  margin: 0,
                  padding: "4px 0 4px 26px",
                  borderLeft: "3px solid var(--rd-maroon)",
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontSize: "clamp(24px, 2.8vw, 32px)",
                  lineHeight: 1.4,
                  color: "var(--rd-ink)",
                }}
              >
                We deal with every assignment with the primary purpose of establishing an enduring relationship with our
                clients.
              </blockquote>
            </div>
            <div style={{ display: "grid", gap: "16px", alignContent: "center" }}>
              <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.75, color: "var(--rd-body)" }}>
                Our trademark approach is to give detailed attention to issues, employing extensive experience with the
                necessary skills to deliver cutting edge solutions to legal challenges.
              </p>
              <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.75, color: "var(--rd-body)" }}>
                It is a philosophy that runs through every department of the Firm — from the tax attorneys advising
                multinationals on complex cross-border questions, to the litigation team preparing a matter for the
                Supreme Court. Every client relationship is built to outlast any single engagement.
              </p>
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
              <p className="rd-kicker">The Principal Partner</p>
              <h2>Prof. Abiola Sanni (SAN) PhD.</h2>
              <p className="rd-summary">
                Our accomplishments are attributed to the Principal Partner and Senior Advocate of Nigeria, with
                thirty-three years post-call experience. He has built a team of professionals well versed in handling
                complex legal issues across every level of the Nigerian judicial system — from the Investment and
                Securities Tribunal and Tax Appeal Tribunal through to the Supreme Court.
              </p>
              <ul className="rd-chips" style={{ marginBottom: "20px" }}>
                {PARTNER_CHIPS.map((chip) => (
                  <li className="rd-chip rd-chip--sm" key={chip}>
                    {chip}
                  </li>
                ))}
              </ul>
              <div className="rd-btn-row" style={{ alignItems: "center" }}>
                <a href="/team/abiola-sanni" className="rd-btn rd-btn--primary">
                  Read the full profile
                </a>
                <a href="/team" className="rd-link" style={{ fontSize: "15px" }}>
                  Meet the whole team
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="rd-section" id="csr">
          <div className="rd-container">
            <div className="rd-dept-card rd-dept-card--ivory" style={{ padding: "40px 44px" }}>
              <p className="rd-eyebrow">Giving Back</p>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 36px)", lineHeight: 1.15, marginBottom: "4px" }}>
                Corporate social responsibility
              </h2>
              <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.75, color: "var(--rd-body)" }}>
                Every now and again we identify a good cause and support it with all our resources. We sometimes take up
                cases ex gratia. It is our way of giving back to the society — we understand that without the society we
                cannot exist.
              </p>
              <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.75, color: "var(--rd-body)" }}>
                This includes a long-standing commitment to <a href="/practice-areas">pro bono services</a> for clients
                facing financial hardship, spanning litigation and alternative dispute resolution, corporate advisory and
                tax matters.
              </p>
            </div>
          </div>
        </section>

        <section className="rd-cta-band">
          <div className="rd-cta-band__inner">
            <h2>Cutting edge solutions to legal challenges.</h2>
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
