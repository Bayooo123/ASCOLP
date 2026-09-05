import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import PageHeader from "../../components/PageHeader";
import { prisma } from "../../lib/prisma";

export async function getStaticProps() {
  let articles = [];
  try {
    articles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch {
    articles = [];
  }
  return { props: { articles: JSON.parse(JSON.stringify(articles)) }, revalidate: 300 };
}

export default function ArticlesPage({ articles }) {
  return (
    <Layout>
      <Seo title="Articles & Newsletters" path="/articles" description="Articles, publications and newsletters from ASCOLP." />
      <PageHeader title="Articles & Newsletters" crumb="Articles & Newsletters" />

      <section className="news-one">
        <div className="container">
          {articles.length ? (
            <div className="row">
              {articles.map((article, i) => {
                const href = article.externalUrl || `/articles/${article.slug}`;
                return (
                  <div className="col-xl-4 col-lg-4 wow fadeInUp" data-wow-delay={`${((i % 3) + 1) * 100}ms`} key={article.id}>
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
            <p className="text-center">Articles and newsletters are on their way — check back soon.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}
