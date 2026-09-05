import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { prisma } from "../lib/prisma";

const FALLBACK_SLIDES = [
  { slug: "abiola-sanni", name: "Prof. Abiola Sanni (SAN) PhD.", title: "Managing Partner", photoUrl: "/assets/images/team/prof-abiola-sanni.jpg" },
  { slug: "kolawole-abdusalam", name: "Kolawole G. Abdusalam", title: "Practice Head", photoUrl: "/assets/images/team/KOLAWOLE- ABDULSALAM-p.jpg" },
  { slug: "iniobong-umoh", name: "Iniobong Inieke Umoh", title: "Senior Associate", photoUrl: "/assets/images/team/iniobong-umoh.jpg" },
];

export async function getStaticProps() {
  let slides = FALLBACK_SLIDES;
  let articles = [];

  try {
    const members = await prisma.teamMember.findMany({
      where: { featuredHome: true, published: true },
      orderBy: { homeOrder: "asc" },
      take: 7,
      select: { slug: true, name: true, title: true, photoUrl: true },
    });
    if (members.length) slides = members;
  } catch {
    // DB not reachable at build time (e.g. local sandbox) — fall back to seed slides.
  }

  try {
    articles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: { slug: true, title: true, summary: true, coverImageUrl: true, publishedAt: true, type: true, externalUrl: true },
    });
  } catch {
    articles = [];
  }

  return { props: { slides, articles }, revalidate: 300 };
}

export default function Home({ slides, articles }) {
  return (
    <Layout>
      <Seo path="/" />

      <section className="main-slider">
        <div
          className="swiper-container thm-swiper__slider"
          data-swiper-options={JSON.stringify({
            slidesPerView: 1,
            loop: true,
            effect: "fade",
            pagination: { el: "#main-slider-pagination", type: "bullets", clickable: true },
            navigation: { nextEl: "#main-slider__swiper-button-next", prevEl: "#main-slider__swiper-button-prev" },
            autoplay: { delay: 5000 },
          })}
        >
          <div className="swiper-wrapper">
            {slides.map((member) => (
              <div className="swiper-slide" key={member.slug}>
                <div className="image-layer" style={{ backgroundImage: `url(${member.photoUrl})` }}></div>
                <div className="main-slider-shape-1"></div>
                <div className="main-slider-shape-2"></div>
                <div className="main-slider-shape-3"></div>
                <div className="container">
                  <div className="row">
                    <div className="col-xl-7">
                      <div className="main-slider__content">
                        <h2>{member.name}</h2>
                        {member.title ? <p className="main-slider__subtitle">{member.title}</p> : null}
                        <a href={`/team/${member.slug}`} className="thm-btn">
                          Meet the Team
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination" id="main-slider-pagination"></div>
          <div className="main-slider__nav">
            <div className="swiper-button-prev" id="main-slider__swiper-button-next">
              <i className="icon-right-arrow icon-left-arrow"></i>
            </div>
            <div className="swiper-button-next" id="main-slider__swiper-button-prev">
              <i className="icon-right-arrow"></i>
            </div>
          </div>
        </div>
      </section>

      <section className="work-together">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="work-together__left wow slideInLeft" data-wow-delay="100ms" data-wow-duration="2500ms">
                <div className="work-together__img-box">
                  <div className="work-together-shape-1">
                    <img src="/assets/images/shapes/work-together-shape-1.png" alt="" />
                  </div>
                  <div className="work-together__img-1">
                    <img src="/assets/images/resources/legal-abiola-sanni.png" alt="ascolp" />
                    <div className="work-together__img-2">
                      <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="work-together__right">
                <div className="section-title text-left">
                  <span className="section-title__tagline">From Negotiations to Resolutions, We Lead.</span>
                  <h2 className="section-title__title">
                    We are a global force in Taxation, Commercial Law, and Legal Defense.
                  </h2>
                </div>
                <p className="work-together__right-text" style={{ textAlign: "justify" }}>
                  The Firm [ASCOLP] is a distinguished and leading legal/tax services provider in Nigeria, comprised of
                  dedicated transactional lawyers who are proficient in a wide spectrum of legal services.
                </p>
                <p className="work-together__right-text" style={{ textAlign: "justify" }}>
                  Our expertise spans through litigation, arbitration, taxation, Property law, Corporate and Commercial
                  Law, Technology Law Practice, serving both local and international clients equally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-one">
        <div className="container">
          <div className="section-title text-center">
            <span className="section-title__tagline">Our core practice areas</span>
            <h2 className="section-title__title">Practice Areas</h2>
          </div>
          <div className="row">
            {[
              { title: "Tax Unit", href: "/practice-areas/tax-unit", img: "/assets/images/case/tax-law-lagos.jpg" },
              { title: "Corporate & Commercial Department", href: "/practice-areas/corporate", img: "/assets/images/case/corporate.jpg" },
              { title: "Litigation & Arbitrations", href: "/practice-areas/litigation-arbitrations", img: "/assets/images/case/litigation-arbitrations.jpg" },
            ].map((area, i) => (
              <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay={`${(i + 1) * 100}ms`} key={area.href}>
                <div className="case-one__single">
                  <div className="case-one__img">
                    <img src={area.img} alt={area.title} />
                  </div>
                  <div className="case-one__content">
                    <h3 className="case-one__title">
                      <a href={area.href}>{area.title}</a>
                    </h3>
                  </div>
                  <div className="case-one__arrow">
                    <a href={area.href}>
                      <span className="icon-right-arrow"></span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="free-consultation">
        <div className="container">
          <div className="free-consultation__inner wow fadeInUp" data-wow-delay="300ms">
            <div className="free-consultation__left">
              <h3 className="free-consultation__content">
                Legal <span>Excellence</span> <br />
                Client-Centric Approach
              </h3>
              <div className="free-consultation__icon">
                <span className="icon-phone-call"></span>
              </div>
            </div>
            <div className="free-consultation__right">
              <h4 className="free-consultation__contact-info">
                <a href="tel:+703319018" className="free-consultation__contact-number">
                  +703319018
                </a>
                <a href="mailto:info@abiolasanniandco.com" className="free-consultation__contact-email">
                  info@abiolasanniandco.com
                </a>
              </h4>
            </div>
          </div>
        </div>
      </section>

      <section className="our-mission">
        <div className="our-mission-bg-box">
          <div
            className="our-mission-bg jarallax"
            data-jarallax
            data-speed="0.2"
            data-imgposition="50% 0%"
            style={{ backgroundImage: "url(/assets/images/backgrounds/asco-lp.jpg)" }}
          ></div>
        </div>
        <div className="our-mission-shape-1 shapemover2"></div>
        <div className="our-mission-shape-2 shapemover2"></div>
        <div className="our-mission-shape-3 shapemover2"></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="our-mission__inner">
                <h2 className="our-mission__title">
                  Cutting Edge
                  <br />
                  Solutions to Legal Challenges.
                </h2>
                <a href="/philosophy" className="thm-btn our-mission__btn">
                  Discover More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trusted-one">
        <div className="container">
          <div className="trusted-one__inner">
            <div className="trusted-one__left">
              <h3 className="trusted-one__content">Distinguished and leading legal/tax services provider in Nigeria.</h3>
            </div>
            <div className="trusted-one__right">
              <ul className="list-unstyled trusted-one__content-box">
                {[
                  { icon: "icon-briefcase", label: "Experience" },
                  { icon: "icon-bar-chart", label: "Excellence" },
                  { icon: "icon-team-leader", label: "Professionalism" },
                ].map((item, i) => (
                  <li className="trusted one__single wow fadeInLeft" data-wow-delay={`${(i + 1) * 100}ms`} key={item.label}>
                    <div className="trusted-one__icon">
                      <span className={item.icon}></span>
                    </div>
                    <h3 className="trusted-one__title">
                      <a href="/team">{item.label}</a>
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="news-one">
        <div className="news-one-shape-1 shapemover2"></div>
        <div className="news-one-shape-2 float-bob-x-2"></div>
        <div className="container">
          <div className="section-title text-center">
            <span className="section-title__tagline">What&rsquo;s Happening</span>
            <h2 className="section-title__title">News &amp; Publications</h2>
          </div>
          {articles.length ? (
            <div className="row">
              {articles.map((article, i) => {
                const href = article.externalUrl || `/articles/${article.slug}`;
                return (
                  <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay={`${(i + 1) * 100}ms`} key={article.slug}>
                    <div className="news-one__single">
                      <div className="news-one__img">
                        <img src={article.coverImageUrl || "/assets/images/blog/Prof-Abiola-Sanni-Olaitan.jpg"} alt={article.title} />
                        <a href={href} target={article.externalUrl ? "_blank" : undefined} rel="noreferrer">
                          <span className="news-one__plus"></span>
                        </a>
                      </div>
                      <div className="news-one__content">
                        <p className="news-one__sub-title">{article.type === "NEWSLETTER" ? "newsletter" : "article"}</p>
                        <h3 className="news-one__title">
                          <a href={href} target={article.externalUrl ? "_blank" : undefined} rel="noreferrer">
                            {article.title}
                          </a>
                        </h3>
                        {article.publishedAt ? (
                          <ul className="list-unstyled news-one__meta">
                            <li>
                              <i className="far fa-clock"></i> Published on{" "}
                              {new Date(article.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                            </li>
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center">More articles and newsletters coming soon.</p>
          )}
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
