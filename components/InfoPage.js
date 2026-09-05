import Layout from "./Layout";
import Seo from "./Seo";
import PageHeader from "./PageHeader";

export default function InfoPage({ title, crumb, description, tagline, image, paragraphs, path, children }) {
  return (
    <Layout>
      <Seo title={title} path={path} description={description || paragraphs?.[0]} />
      <PageHeader title={title} crumb={crumb || title} />

      <section className="work-together-two">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="work-together-two__left wow slideInLeft" data-wow-delay="100ms" data-wow-duration="2500ms">
                <div className="work-together-two__img">
                  <img src={image} alt={title} />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="work-together-tow__right">
                <div className="section-title text-left">
                  <span className="section-title__tagline">{tagline || title}</span>
                </div>
                {paragraphs.map((para, i) => (
                  <p className="work-together-tow__text-2" key={i}>
                    {para}
                  </p>
                ))}
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
