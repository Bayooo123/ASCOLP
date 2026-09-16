import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { db } from "../../lib/db";

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { data: article } = await db("articles").select("*").eq("slug", params.slug).maybeSingle();
  if (!article || !article.published) return { notFound: true, revalidate: 60 };

  const { data: recentArticles } = await db("articles")
    .select("slug, title, publishedAt, author, type")
    .eq("published", true)
    .neq("slug", params.slug)
    .order("publishedAt", { ascending: false })
    .limit(5);

  return {
    props: {
      article,
      recentArticles: recentArticles || [],
    },
    revalidate: 60,
  };
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

export default function ArticleDetailPage({ article, recentArticles = [] }) {
  return (
    <Layout>
      <Seo
        title={`${article.title} | ASCOLP`}
        path={`/articles/${article.slug}`}
        description={article.summary || undefined}
        image={article.coverImageUrl || undefined}
      />

      <div className="rd">
        <div className="rd-breadcrumb">
          <div className="rd-breadcrumb__inner">
            <a href="/" style={{ color: "var(--rd-muted)" }}>Home</a>
            <span>/</span>
            <a href="/articles" style={{ color: "var(--rd-maroon)", fontWeight: 600 }}>Thought Leadership</a>
            <span>/</span>
            <span style={{ color: "var(--rd-ink)" }}>{article.title}</span>
          </div>
        </div>

        <div className="rd-layout-2col rd-layout-2col--articles" style={{ paddingTop: "24px", paddingBottom: "72px" }}>
          <article className="rd-article-full">
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

            {article.coverImageUrl ? (
              <div style={{ margin: "16px 0", border: "1px solid var(--rd-border)" }}>
                <img src={article.coverImageUrl} alt={article.title} style={{ width: "100%", display: "block" }} />
              </div>
            ) : null}

            <div className="rd-article-body">{renderBody(article.body)}</div>

            {article.fileUrl ? (
              <div className="rd-download-strip">
                <p>The full legal analysis, with every relevant provision in full, is available as a PDF.</p>
                <a href={article.fileUrl} target="_blank" rel="noreferrer" className="rd-btn rd-btn--primary">
                  Download {article.type === "NEWSLETTER" ? "publication" : "analysis"} (PDF)
                </a>
              </div>
            ) : null}

            <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid var(--rd-border)" }}>
              <a href="/articles" className="rd-link" style={{ fontSize: "16px", fontWeight: 600 }}>
                ← Back to all articles and publications
              </a>
            </div>
          </article>

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

            {article.author ? (
              <div className="rd-rail-block">
                <h3>Author</h3>
                <a href={article.authorSlug ? `/team/${article.authorSlug}` : "/team"} className="rd-link">
                  {article.author}
                </a>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.55, color: "var(--rd-muted)" }}>
                  Founder and publisher of the Nigerian Revenue Law Reports and African Tax Law Reports.
                </p>
              </div>
            ) : null}

            {recentArticles.length ? (
              <div className="rd-rail-block">
                <h3>Other publications</h3>
                {recentArticles.map((ra) => (
                  <a href={`/articles/${ra.slug}`} className="rd-link" key={ra.slug}>
                    {ra.title}
                  </a>
                ))}
              </div>
            ) : null}
          </aside>
        </div>

        <section className="rd-cta-band">
          <div className="rd-cta-band__inner">
            <h2>Need counsel or analysis on legal developments?</h2>
            <div className="rd-btn-row">
              <a href="/discuss-a-matter" className="rd-btn rd-btn--primary rd-btn--lg rd-btn--on-dark">
                Discuss a Matter
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
