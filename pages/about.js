import Layout from "../components/Layout";
import Seo from "../components/Seo";

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

        <div className="rd-layout-2col rd-layout-2col--about">
          <div style={{ display: "grid", gap: "56px", minWidth: 0 }}>
            <section className="rd-profile-section">
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
            </section>

            <section className="rd-profile-section" id="our-philosophy">
              <h2 style={{ fontSize: "clamp(28px, 3vw, 36px)", lineHeight: 1.15 }}>Our philosophy</h2>
              <blockquote
                style={{
                  margin: 0,
                  padding: "4px 0 4px 26px",
                  borderLeft: "3px solid var(--rd-maroon)",
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontSize: "clamp(21px, 2.3vw, 27px)",
                  lineHeight: 1.5,
                  color: "var(--rd-ink)",
                  maxWidth: "46ch",
                }}
              >
                We deal with every assignment with the primary purpose of establishing an enduring relationship with our
                clients.
              </blockquote>
              <p className="rd-body-lg">
                Our trademark approach is to give detailed attention to issues, employing extensive experience with the
                necessary skills to deliver cutting edge solutions to legal challenges.
              </p>
            </section>

            <section className="rd-profile-section">
              <h2 style={{ fontSize: "clamp(28px, 3vw, 36px)", lineHeight: 1.15 }}>The Principal Partner</h2>
              <div className="rd-split" style={{ gridTemplateColumns: "minmax(0,200px) minmax(0,1fr)" }}>
                <div
                  className="rd-split__portrait"
                  style={{ backgroundImage: "url(/assets/images/team/prof-abiola-sanni.jpg)", aspectRatio: "4 / 4.6" }}
                ></div>
                <div className="rd-about-bio">
                  <h3 style={{ fontSize: "27px", lineHeight: 1.18 }}>Prof. Abiola Sanni (SAN) PhD.</h3>
                  <p className="rd-role">Managing Partner</p>
                  <p className="rd-lead" style={{ maxWidth: "58ch" }}>
                    Our accomplishments are attributed to the Principal Partner and Senior Advocate of Nigeria, with
                    thirty-three years post-call experience. He has built a team of professionals well versed in
                    handling complex legal issues across every level of the Nigerian judicial system — from the
                    Investment and Securities Tribunal and Tax Appeal Tribunal through to the Supreme Court.
                  </p>
                  <a href="/team/abiola-sanni" className="rd-link" style={{ marginTop: "4px", fontSize: "15px" }}>
                    Read the full profile
                  </a>
                </div>
              </div>
            </section>

            <section className="rd-profile-section" id="csr">
              <h2 style={{ fontSize: "clamp(28px, 3vw, 36px)", lineHeight: 1.15 }}>Corporate social responsibility</h2>
              <p className="rd-body-lg">
                Every now and again we identify a good cause and support it with all our resources. We sometimes take up
                cases ex gratia. It is our way of giving back to the society — we understand that without the society we
                cannot exist.
              </p>
              <p className="rd-body-lg">
                This includes a long-standing commitment to <a href="/practice-areas">pro bono services</a> for clients
                facing financial hardship, spanning litigation and alternative dispute resolution, corporate advisory and
                tax matters.
              </p>
            </section>
          </div>

          <aside className="rd-sticky-rail">
            <div className="rd-enquiry-card">
              <p className="rd-serif">Work with the Firm</p>
              <p className="rd-body-sm">Tell us about the matter and we will route it to the right department within one working day.</p>
              <a href="mailto:info@abiolasanniandco.com?subject=New%20matter%20enquiry" className="rd-btn rd-btn--primary" style={{ marginTop: "4px" }}>
                Describe your matter
              </a>
              <a href="tel:+2347069268744" className="rd-btn rd-btn--secondary" style={{ background: "#ffffff" }}>
                +234 706 926 8744
              </a>
            </div>
            <div className="rd-rail-block">
              <h3>Explore</h3>
              <a href="/practice-areas" className="rd-link">
                Practice areas
              </a>
              <a href="/team" className="rd-link">
                Our team
              </a>
              <a href="/articles" className="rd-link">
                Thought leadership
              </a>
            </div>
          </aside>
        </div>

        <section className="rd-cta-band">
          <div className="rd-cta-band__inner">
            <h2>Cutting edge solutions to legal challenges.</h2>
            <div className="rd-btn-row">
              <a href="mailto:info@abiolasanniandco.com?subject=Consultation%20request" className="rd-btn rd-btn--primary rd-btn--lg rd-btn--on-dark">
                Request a consultation
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
