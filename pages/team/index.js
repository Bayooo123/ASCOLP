import Layout from "../../components/Layout";
import Seo from "../../components/Seo";

const LEADERSHIP = [
  {
    slug: "kolawole-abdusalam",
    photo: "/assets/images/team/KOLAWOLE- ABDULSALAM-p.jpg",
    name: "Kolawole G. Abdulsalam",
    credentials: "Esq. LL.B., B.L.",
    role: "Practice Head",
    bio: "LL.B (Hons), University of Ilorin; called to the Nigerian Bar in 2009. Head of Chambers at Alade Agbabiaka (SAN) & Co. and later Oladipo Awe & Co. before joining ASCOLP in 2022, and Practice Head since October 2022. Practises arbitration, corporate, constitutional, aviation, property and tax law, ship and vessel registration and ship mortgages, and general litigation, with a flair for advocacy.",
  },
  {
    slug: "iniobong-umoh",
    photo: "/assets/images/team/iniobong-umoh.jpg",
    name: "Iniobong Inieke Umoh",
    credentials: "LL.B., B.L.",
    role: "Senior Associate · Heads Legal & Property",
    bio: "Fifteen years in practice. LL.B, University of Uyo (2007), called to the Bar in 2008; trained at Falana & Falana and rose to Head of Litigation and Processes at Ayo Olanrewaju & Co., handling matters from the Magistrate Court to the Court of Appeal. Joined ASCOLP in 2022 and now heads Legal and Property: legal drafting and litigation, family and property law, arbitration, commercial, corporate and tax law.",
  },
  {
    slug: "friday-ndubuisi",
    photo: "/assets/images/team/Friday Ndubuisi-p.jpg",
    name: "Prof. Friday Ndubuisi",
    credentials: "B.A., M.Phil., PhD., LL.B., LL.M, B.L.",
    role: "Consultant",
    bio: 'Doctorate in the Philosophy of Science and Jurisprudence; LL.B, University of Lagos (2001), called to the Bar in 2003, LL.M (2006). Credited with over fifty academic publications, including "Ethical Justification of Customary Law" presented to the Nigerian Institute of Advanced Legal Studies. Interests in general litigation, jurisprudence, criminal law, property and corporate law.',
  },
  {
    slug: "omowumi-adeoye",
    photo: "/assets/images/team/Omowumi-p.png",
    name: "Omowumi Gloria Adeoye",
    credentials: "B.Sc., LL.B., B.L.",
    role: "Consultant",
    bio: "B.Sc. Accounting, Obafemi Awolowo University, and LL.B, University of Lagos; called to the Bar in 2018. Interned with the Firm through her undergraduate years, then practised at Kayode & Co., Abuja, gaining experience in litigation, tax and property law, corporate and commercial transactions, mediation and arbitration.",
  },
];

const ASSOCIATES = [
  {
    slug: "ogbinaka-josephine",
    photo: "/assets/images/team/josephine.jpg",
    name: "Ogbinaka Josephine Aruoriwoghene",
    meta: "LL.B., B.L. · Called 2018",
    bio: "Began with the Firm on national service and was retained, developing expertise in litigation and corporate practice. Analyses complex legal transactions and prepares legal opinions for clients, with particular interests in entertainment law, intellectual property, taxation, property law and corporate practice.",
  },
  {
    slug: "adeoye-adeola",
    photo: "/assets/images/team/adeoye.jpg",
    name: "Adeoye Adeola Osemudiame",
    meta: "LL.B., B.L. · Called 2022",
    bio: "LL.B, Afe Babalola University; called to the Bar as an Advocate and Solicitor of the Supreme Court of Nigeria in 2022. Specialises in property law, with keen interests in corporate law, arbitration, mediation and general litigation.",
  },
  {
    slug: "maureen-omaegbu",
    photo: "/assets/images/team/maureen.jpg",
    name: "Maureen C. R. Omaegbu",
    meta: "LL.B., B.L., ACArb · Called 2022",
    bio: "LL.B (Hons), Nnamdi Azikiwe University; called to the Bar in 2022. Interned at the Chambers of Festus Keyamo, Lagos, and the office of Hon. Justice E. I. Alakija. Practises arbitration, tax, family and property law, corporate law and general litigation, and is working towards membership of the Chartered Institute of Taxation of Nigeria.",
  },
  {
    slug: "akinola-olabampe",
    photo: "/assets/images/team/akinola-olabampe.jpg",
    name: "Akinola Olabampe",
    meta: "LL.B., B.L. · Called 2026",
    bio: "LL.B, Faculty of Law, University of Ilorin; Nigerian Law School, Abuja, called to the Bar in July 2026. Joined ASCOLP the same month, with a strong interest in litigation, tax disputes and arbitration and a particular focus on criminal litigation and defence.",
  },
  {
    slug: "adebayo-gbadebo",
    photo: "/assets/images/team/adebayo-gbadebo.jpg",
    name: "Adebayo Gbadebo",
    meta: "LL.B., B.L. · Called 2025",
    bio: "LL.B, Faculty of Law, University of Lagos (2024); Nigerian Law School, Port Harcourt, called to the Bar in 2025. Joined ASCOLP in February 2026, with professional interests in tax and corporate advisory and research interests in constitutional, administrative and development law.",
  },
  {
    slug: "benjamin-adeyanju",
    photo: "/assets/images/team/benjamin-adeyanju.jpg",
    name: "Benjamin Adeyanju",
    meta: "LL.B., B.L. · Called 2025",
    bio: "LL.B, University of Lagos (2024); Nigerian Law School, Lagos Campus, called to the Bar in 2025. Practises litigation and alternative dispute resolution, and maintains a keen interest in sports law, where he regularly researches and writes on emerging issues.",
  },
];

const BUSINESS_SERVICES = [
  {
    photo: "/assets/images/team/chinoye.jpg",
    name: "Ofodirinwa Harieta Chinonye",
    role: "Practice Manager",
    bio: "Library, Archival and Information Science, University of Ibadan (2016). Years of experience across diverse sectors in customer care and front-desk management, now running the Firm's day-to-day practice operations and client reception.",
  },
  {
    photo: "/assets/images/team/popoola.jpg",
    name: "Popoola Ayodeji Jeremiah",
    role: "Head of IT",
    bio: "Leads the Firm's technology and digital operations — systems, practice tools and the ASCOLP web presence — alongside the multimedia, marketing and print design work he built his career on at Edikan Publications and with a number of multinational organisations. Mass Communication, Lagos State Polytechnic (2023).",
  },
];

const CREDENTIAL_CHIPS = [
  "Senior Advocate of Nigeria, 2021",
  "Chairman, National Tax Policy Review Committee, 2016",
  "Chairman, National Tax Policy Implementation Committee, 2017",
  "Fulbright Fellow, Temple University, 2003",
  "Fellow, Chartered Institute of Taxation of Nigeria",
  "ICC & UNCITRAL arbitration since 2011",
];

export default function TeamPage() {
  return (
    <Layout>
      <Seo
        title="Our Team"
        path="/team"
        description="ASCOLP brings together a distinguished team of lawyers and business support professionals with the expertise, experience and commercial awareness to meet the demands of a diverse range of clients."
      />

      <div className="rd">
        <section className="rd-hero">
          <div className="rd-container rd-hero__inner">
            <p className="rd-kicker">Our Team</p>
            <h1 style={{ maxWidth: "26ch" }}>A distinguished team of lawyers and business support professionals.</h1>
            <p className="rd-intro" style={{ maxWidth: "64ch" }}>
              ASCOLP brings together a distinguished team of lawyers and business support professionals with the expertise,
              experience and commercial awareness to meet the demands of a diverse range of clients. Whatever your legal or
              business needs, our team is equipped to provide thoughtful, practical and effective solutions.
            </p>
          </div>
        </section>

        <section className="rd-section" style={{ paddingBottom: "16px" }}>
          <div className="rd-split rd-split--portrait-left">
            <div
              className="rd-split__portrait"
              style={{ backgroundImage: "url(/assets/images/team/prof-abiola-sanni.jpg)" }}
            ></div>
            <div className="rd-split__body">
              <p className="rd-kicker" style={{ marginBottom: "12px" }}>
                Principal Partner
              </p>
              <h2 style={{ marginBottom: "6px" }}>Prof. Abiola Sanni (SAN) PhD.</h2>
              <p style={{ margin: "0 0 22px", fontSize: "15.5px", color: "var(--rd-muted)" }}>
                Managing Partner · Thirty-three years post-call
              </p>
              <p className="rd-lead" style={{ marginBottom: "22px" }}>
                Professor Abiola Sanni is one of Nigeria&rsquo;s leading authorities on tax law. His distinguished career has
                shaped the development of Nigerian tax law across academia, corporate advisory and public policy. His
                contributions to the field extend from scholarship and teaching to advising businesses and institutions on
                complex tax matters and contributing to tax policy development. He was admitted to the Inner Bar as a
                Senior Advocate of Nigeria (SAN) in 2021.
              </p>
              <ul className="rd-chips" style={{ marginBottom: "28px" }}>
                {CREDENTIAL_CHIPS.map((chip) => (
                  <li className="rd-chip rd-chip--sm" key={chip}>
                    {chip}
                  </li>
                ))}
              </ul>
              <div className="rd-btn-row" style={{ alignItems: "center" }}>
                <a href="/team/abiola-sanni" className="rd-btn rd-btn--primary">
                  View full profile
                </a>
                <a
                  href="mailto:info@abiolasanniandco.com?subject=Instruction%20for%20the%20Principal%20Partner"
                  className="rd-link--muted"
                >
                  Enquire about an instruction
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="rd-section" style={{ paddingBottom: "16px" }}>
          <div className="rd-section-head">
            <h2>Practice leadership</h2>
            <p>Heads of department and senior counsel</p>
          </div>
          <div className="rd-team-grid">
            {LEADERSHIP.map((member) => (
              <article className="rd-team-card" key={member.slug}>
                <div className="rd-team-card__media" style={{ backgroundImage: `url("${member.photo}")` }}></div>
                <div className="rd-team-card__body">
                  <h3>{member.name}</h3>
                  <p className="rd-meta">{member.credentials}</p>
                  <p className="rd-role">{member.role}</p>
                  <p className="rd-body-sm">{member.bio}</p>
                  <a href={`/team/${member.slug}`} className="rd-link">
                    View profile
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rd-section" style={{ paddingBottom: "16px" }}>
          <div className="rd-section-head">
            <h2>Associates</h2>
            <p>Counsel across litigation, tax and corporate advisory</p>
          </div>
          <div className="rd-team-grid rd-team-grid--assoc">
            {ASSOCIATES.map((member) => (
              <article className="rd-team-card" key={member.slug}>
                <div className="rd-team-card__media rd-team-card__media--assoc" style={{ backgroundImage: `url("${member.photo}")` }}></div>
                <div className="rd-team-card__body rd-team-card__body--assoc">
                  <h3>{member.name}</h3>
                  <p className="rd-meta">{member.meta}</p>
                  <p className="rd-body-sm">{member.bio}</p>
                  <a href={`/team/${member.slug}`} className="rd-link">
                    View profile
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rd-section" style={{ paddingBottom: "72px" }}>
          <div className="rd-section-head">
            <h2>Business services</h2>
            <p>Administrative and support staff</p>
          </div>
          <div className="rd-bizsvc-grid">
            {BUSINESS_SERVICES.map((member) => (
              <article className="rd-bizsvc-card" key={member.name}>
                <div className="rd-bizsvc-card__media" style={{ backgroundImage: `url("${member.photo}")` }}></div>
                <div className="rd-bizsvc-card__body">
                  <h3>{member.name}</h3>
                  <p className="rd-role">{member.role}</p>
                  <p className="rd-body-sm">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rd-cta-band">
          <div className="rd-cta-band__inner">
            <h2>Speak to the counsel handling your matter.</h2>
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
