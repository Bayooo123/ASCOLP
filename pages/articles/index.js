import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { db } from "../../lib/db";

export async function getStaticProps() {
  const { data } = await db("articles").select("*").eq("published", true).order("publishedAt", { ascending: false });
  return { props: { articles: data || [] }, revalidate: 300 };
}

function readTime(body) {
  if (!body) return null;
  const words = body.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function ArticlesPage({ articles }) {
  return (
    <Layout>
      <Seo
        title="Thought Leadership"
        path="/articles"
        description="Through our publications, law reports, presentations and professional trainings, we contribute to the development of legal thought and practice in Nigeria."
      />

      <div className="rd">
        <section className="rd-hero">
          <div className="rd-container rd-hero__inner">
            <p className="rd-kicker">Thought Leadership</p>
            <h1 style={{ fontSize: "clamp(34px, 4.4vw, 52px)", lineHeight: 1.1, maxWidth: "30ch" }}>
              At ASCOLP, we do more than apply the law. We ask the questions, examine the issues and contribute to the
              conversations that shape the direction of the law.
            </h1>
            <p className="rd-intro" style={{ fontSize: "18px", lineHeight: 1.7, maxWidth: "68ch" }}>
              Through our publications, law reports, presentations and professional trainings, we contribute to the
              development of legal thought and practice in Nigeria. Our work is driven by a commitment to rigorous
              analysis, practical insight and the advancement of the law. We seek not only to understand the law as it
              is, but to engage with the law as it ought to be.
            </p>
          </div>
        </section>

        <section className="rd-section" style={{ paddingBottom: "0" }}>
          <h2 style={{ marginBottom: "14px", fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.15 }}>Publications & Articles</h2>
          <p style={{ margin: 0, fontSize: "17.5px", lineHeight: 1.7, color: "var(--rd-secondary)", maxWidth: "68ch" }}>
            Through ASCO Publishers, we maintain a growing catalogue of specialist legal textbooks and publications. Our
            publications document the law as it stands while advancing thoughtful positions on how the law should
            develop.
          </p>
        </section>

        <section className="rd-section" style={{ paddingTop: "32px", paddingBottom: "72px" }}>
          {articles.length ? (
            <div className="rd-cards-grid">
              {articles.map((article) => (
                <article className="rd-article-card" key={article.slug}>
                  <div className="rd-pdf-tile-wrap">
                    <div className="rd-pdf-tile">
                      <span>PDF</span>
                    </div>
                  </div>
                  <div className="rd-article-card__body">
                    <p className="rd-eyebrow">{article.type === "NEWSLETTER" ? "ASCO Publication" : "Article"}</p>
                    <h3>
                      <a href={`/articles/${article.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {article.title}
                      </a>
                    </h3>
                    <p className="rd-meta">
                      {[article.author, formatDate(article.publishedAt), readTime(article.body)].filter(Boolean).join(" · ")}
                    </p>
                    {article.summary ? <p className="rd-body-sm">{article.summary}</p> : null}
                    <div className="rd-btn-row">
                      <a href={`/articles/${article.slug}`} className="rd-btn rd-btn--primary">
                        Read in full
                      </a>
                      {article.fileUrl ? (
                        <a href={article.fileUrl} target="_blank" rel="noreferrer" className="rd-btn rd-btn--secondary">
                          Download PDF
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p>Articles and ASCO publications are on their way — check back soon.</p>
          )}
        </section>

        <section className="rd-cta-band">
          <div className="rd-cta-band__inner">
            <h2>Need counsel or analysis on legal developments?</h2>
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
