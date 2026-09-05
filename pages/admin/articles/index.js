import { useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { getSessionFromReq } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export async function getServerSideProps({ req }) {
  const session = getSessionFromReq(req);
  if (!session) return { redirect: { destination: "/admin/login", permanent: false } };
  if (session.role !== "ADMIN") return { redirect: { destination: "/admin", permanent: false } };

  const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" } });
  return { props: { articles: JSON.parse(JSON.stringify(articles)) } };
}

export default function AdminArticlesList({ articles: initial }) {
  const [articles, setArticles] = useState(initial);

  async function handleDelete(id, title) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
    if (res.ok) setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <AdminLayout title="Articles & Newsletters">
      <p style={{ marginBottom: "20px" }}>
        <a href="/admin/articles/new" style={{ background: "#7a1f2b", color: "#fff", padding: "8px 16px", borderRadius: "4px", textDecoration: "none" }}>
          + Add Article / Newsletter
        </a>
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #eee" }}>
            <th style={{ padding: "10px" }}>Title</th>
            <th style={{ padding: "10px" }}>Type</th>
            <th style={{ padding: "10px" }}>Published</th>
            <th style={{ padding: "10px" }}></th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>{a.title}</td>
              <td style={{ padding: "10px" }}>{a.type}</td>
              <td style={{ padding: "10px" }}>{a.published ? "Yes" : "No"}</td>
              <td style={{ padding: "10px", textAlign: "right" }}>
                <a href={`/admin/articles/${a.id}`} style={{ marginRight: "12px" }}>
                  Edit
                </a>
                <button onClick={() => handleDelete(a.id, a.title)} style={{ color: "#b91c1c", background: "none", border: "none", cursor: "pointer" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
