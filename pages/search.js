import Layout from "../components/Layout";
import Seo from "../components/Seo";
import PageHeader from "../components/PageHeader";
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
      <PageHeader title="Search" crumb="Search" />

      <section className="team-page">
        <div className="container">
          <form action="/search" method="get" style={{ marginBottom: "40px", maxWidth: "500px" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Search team, articles, alumni…"
                style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
              />
              <button type="submit" className="thm-btn">
                Search
              </button>
            </div>
          </form>

          {q && !hasResults ? <p>No results for “{q}”.</p> : null}

          {team.length ? (
            <div style={{ marginBottom: "30px" }}>
              <h3>Team</h3>
              <ul>
                {team.map((m) => (
                  <li key={m.slug}>
                    <a href={`/team/${m.slug}`}>
                      {m.name} {m.title ? `— ${m.title}` : ""}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {articles.length ? (
            <div style={{ marginBottom: "30px" }}>
              <h3>Articles &amp; Newsletters</h3>
              <ul>
                {articles.map((a) => (
                  <li key={a.slug}>
                    <a href={a.externalUrl || `/articles/${a.slug}`}>{a.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {alumni.length ? (
            <div>
              <h3>Alumni</h3>
              <ul>
                {alumni.map((a) => (
                  <li key={a.id}>
                    {a.name} {a.currentOrganization ? `— ${a.currentOrganization}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </Layout>
  );
}
