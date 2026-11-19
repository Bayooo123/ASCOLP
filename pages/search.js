import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { db } from "../lib/db";

// The Naijabase client has no OR-filter, so "match either column" is done as
// two separate ilike queries merged and de-duplicated by key.
function mergeByKey(key, ...lists) {
  const seen = new Map();
  for (const list of lists) {
    for (const row of list || []) {
      if (!seen.has(row[key])) seen.set(row[key], row);
    }
  }
  return [...seen.values()].slice(0, 10);
}

export async function getServerSideProps({ query }) {
  const q = (query.q || "").trim();
  let team = [];
  let articles = [];
  let alumni = [];

  if (q) {
    const pattern = `%${q}%`;
    const [teamByName, teamByTitle, articlesByTitle, articlesBySummary, alumniByName] = await Promise.all([
      db("teamMembers").select("*").eq("published", true).ilike("name", pattern).limit(10),
      db("teamMembers").select("*").eq("published", true).ilike("title", pattern).limit(10),
      db("articles").select("*").eq("published", true).ilike("title", pattern).limit(10),
      db("articles").select("*").eq("published", true).ilike("summary", pattern).limit(10),
      db("alumni").select("*").eq("approved", true).ilike("name", pattern).limit(10),
    ]);

    team = mergeByKey("slug", teamByName.data, teamByTitle.data);
    articles = mergeByKey("slug", articlesByTitle.data, articlesBySummary.data);
    alumni = mergeByKey("id", alumniByName.data);
  }

  return { props: { q, team, articles, alumni } };
}

export default function Search({ q, team, articles, alumni }) {
  const hasResults = team.length || articles.length || alumni.length;

  return (
    <Layout>
      <Seo title={q ? `Search: ${q}` : "Search"} path="/search" />

      <div className="rd">
        <section className="rd-hero">
          <div className="rd-container rd-hero__inner">
            <p className="rd-kicker">Search</p>
            <h1 style={{ fontSize: "clamp(34px, 4.4vw, 50px)" }}>Search ASCOLP.</h1>
            <form action="/search" method="get" style={{ maxWidth: "480px", marginTop: "8px" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  name="q"
                  defaultValue={q}
                  placeholder="Search team, articles, alumni…"
                  style={{ flex: 1, padding: "12px 14px", border: "1px solid var(--rd-border)", fontFamily: "inherit", fontSize: "15px", background: "#fff", color: "var(--rd-ink)" }}
                />
                <button type="submit" className="rd-btn rd-btn--primary">
                  Search
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="rd-section">
          <div className="rd-container" style={{ maxWidth: "720px" }}>
            {q && !hasResults ? <p style={{ color: "var(--rd-secondary)" }}>No results for &ldquo;{q}&rdquo;.</p> : null}

            {team.length ? (
              <div style={{ marginBottom: "36px" }}>
                <p className="rd-kicker" style={{ marginBottom: "12px" }}>Team</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "10px" }}>
                  {team.map((m) => (
                    <li key={m.slug}>
                      <a href={`/team/${m.slug}`} className="rd-link" style={{ fontSize: "16px" }}>
                        {m.name} {m.title ? `— ${m.title}` : ""}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {articles.length ? (
              <div style={{ marginBottom: "36px" }}>
                <p className="rd-kicker" style={{ marginBottom: "12px" }}>Thought Leadership</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "10px" }}>
                  {articles.map((a) => (
                    <li key={a.slug}>
                      <a href={a.externalUrl || `/articles/${a.slug}`} className="rd-link" style={{ fontSize: "16px" }}>
                        {a.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {alumni.length ? (
              <div>
                <p className="rd-kicker" style={{ marginBottom: "12px" }}>Alumni</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "10px" }}>
                  {alumni.map((a) => (
                    <li key={a.id} style={{ fontSize: "16px" }}>
                      {a.name} {a.currentOrganization ? `— ${a.currentOrganization}` : ""}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </Layout>
  );
}
