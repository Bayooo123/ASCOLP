import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import PageHeader from "../../components/PageHeader";
import { prisma } from "../../lib/prisma";

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  let article = null;
  try {
    article = await prisma.article.findUnique({ where: { slug: params.slug } });
  } catch {
    article = null;
  }
  if (!article || !article.published) return { notFound: true, revalidate: 60 };
  return { props: { article: JSON.parse(JSON.stringify(article)) }, revalidate: 60 };
}

export default function ArticleDetail({ article }) {
  return (
    <Layout>
      <Seo title={article.title} path={`/articles/${article.slug}`} description={article.summary || undefined} image={article.coverImageUrl || undefined} />
      <PageHeader title={article.title} crumb="Articles & Newsletters" />

      <section className="blog-details">
        <div className="container" style={{ maxWidth: "800px" }}>
          {article.coverImageUrl ? <img src={article.coverImageUrl} alt={article.title} style={{ width: "100%", marginBottom: "30px" }} /> : null}
          <p style={{ color: "var(--oslim-text)", fontSize: "14px" }}>
            {article.author ? `By ${article.author} · ` : ""}
            {article.publishedAt
              ? new Date(article.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
              : ""}
          </p>
          {article.summary ? <p style={{ fontSize: "18px", fontWeight: 600, marginTop: "10px" }}>{article.summary}</p> : null}

          {article.body ? (
            <div style={{ marginTop: "20px", lineHeight: 1.8 }}>
              {article.body.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ) : null}

          {article.fileUrl ? (
            <p style={{ marginTop: "30px" }}>
              <a href={article.fileUrl} target="_blank" rel="noreferrer" className="thm-btn">
                Download {article.type === "NEWSLETTER" ? "Newsletter" : "Article"} (PDF)
              </a>
            </p>
          ) : null}
        </div>
      </section>
    </Layout>
  );
}
