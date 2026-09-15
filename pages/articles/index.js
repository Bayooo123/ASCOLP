import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { db } from "../../lib/db";

export async function getStaticProps() {
  const { data } = await db("articles").select("*").eq("published", true).order("publishedAt", { ascending: false });
  return { props: { articles: data || [] }, revalidate: 300 };
}

function scrollToId(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 84);
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

function renderBody(body) {
  if (!body) return null;
  const paragraphs = body
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean)
    .filter((p) => !/available to download below/i.test(p));

  return paragraphs.map((para, i) => {
    const isHeading = para.length < 90 && !para.endsWith(".");
    return isHeading ? <h3 key={i}>{para}</h3> : <p key={i}>{para}</p>;
  });
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
          <h2 style={{ marginBottom: "14px", fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.15 }}>Publications</h2>
          <p style={{ margin: 0, fontSize: "17.5px", lineHeight: 1.7, color: "var(--rd-secondary)", maxWidth: "68ch" }}>
            Through ASCO Publishers, we maintain a growing catalogue of specialist legal textbooks and publications. Our
            publications document the law as it stands while advancing thoughtful positions on how the law should
            develop.
          </p>
        </section>

        <section className="rd-section" style={{ paddingTop: "32px", paddingBottom: "8px" }}>
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
                    <h3>{article.title}</h3>
                    <p className="rd-meta">
                      {[article.author, formatDate(article.publishedAt), readTime(article.body)].filter(Boolean).join(" · ")}
                    </p>
                    {article.summary ? <p className="rd-body-sm">{article.summary}</p> : null}
                    <div className="rd-btn-row">
                      <a href={`#article-${article.slug}`} onClick={(e) => scrollToId(e, `article-${article.slug}`)} className="rd-btn rd-btn--primary">
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

        {articles.length ? (
          <div className="rd-layout-2col rd-layout-2col--articles">
            <div style={{ display: "grid", gap: "64px", minWidth: 0 }}>
              {articles.map((article, i) => (
                <div key={article.slug}>
                  <article id={`article-${article.slug}`} className="rd-article-full">
                    <header>
                      <p className="rd-eyebrow" style={{ fontSize: "12.5px" }}>
                        {article.type === "NEWSLETTER" ? "ASCO Publication" : "Article"}
                      </p>
                      <h2>{article.title}</h2>
                      <p className="rd-meta">
                        {[article.author, formatDate(article.publishedAt), readTime(article.body)].filter(Boolean).join(" · ")}
                      </p>
                      {article.summary ? <p className="rd-lede">{article.summary}</p> : null}
                    </header>

                    <div className="rd-article-body">{renderBody(article.body)}</div>

                    {article.fileUrl ? (
                      <div className="rd-download-strip">
                        <p>The full legal analysis, with every relevant provision in full, is available as a PDF.</p>
                        <a href={article.fileUrl} target="_blank" rel="noreferrer" className="rd-btn rd-btn--primary">
                          Download the analysis (PDF)
                        </a>
                      </div>
                    ) : null}
                  </article>
                  {i < articles.length - 1 ? <hr className="rd-hr" style={{ marginTop: "64px" }} /> : null}
                </div>
              ))}
            </div>

            <aside className="rd-sticky-rail">
              <div className="rd-enquiry-card">
                <p className="rd-serif">Affected by these reforms?</p>
                <p className="rd-body-sm">
                  The Tax Unit advises manufacturers, multinationals and public sector clients on excise, tax controversy
                  and administration.
                </p>
                <a href="mailto:info@abiolasanniandco.com?subject=Tax%20Unit%20enquiry" className="rd-btn rd-btn--primary" style={{ marginTop: "4px" }}>
                  Speak to the Tax Unit
                </a>
              </div>

              <div className="rd-rail-block">
                <h3>On this page</h3>
                {articles.map((article) => (
                  <a
                    href={`#article-${article.slug}`}
                    onClick={(e) => scrollToId(e, `article-${article.slug}`)}
                    className="rd-link"
                    key={article.slug}
                  >
                    {article.title}
                  </a>
                ))}
              </div>

              {articles[0]?.author ? (
                <div className="rd-rail-block">
                  <h3>Author</h3>
                  <a href={articles[0].authorSlug ? `/team/${articles[0].authorSlug}` : "/team"} className="rd-link">
                    {articles[0].author}
                  </a>
                  <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.55, color: "var(--rd-muted)" }}>
                    Founder and publisher of the Nigerian Revenue Law Reports and African Tax Law Reports.
                  </p>
                </div>
              ) : null}
            </aside>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
