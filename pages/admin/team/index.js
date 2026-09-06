import { useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { getSessionFromReq } from "../../../lib/auth";
import { db } from "../../../lib/db";

export async function getServerSideProps({ req }) {
  const session = getSessionFromReq(req);
  if (!session) return { redirect: { destination: "/admin/login", permanent: false } };
  if (session.role !== "ADMIN") {
    if (session.teamMemberId) return { redirect: { destination: `/admin/team/${session.teamMemberId}`, permanent: false } };
    return { redirect: { destination: "/admin", permanent: false } };
  }

  const { data } = await db("teamMembers").select("*").order("displayOrder");
  return { props: { members: data || [] } };
}

export default function AdminTeamList({ members: initial }) {
  const [members, setMembers] = useState(initial);

  async function handleDelete(id, name) {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
    if (res.ok) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } else {
      alert("Failed to delete");
    }
  }

  return (
    <AdminLayout title="Team">
      <p style={{ marginBottom: "20px" }}>
        <a href="/admin/team/new" style={{ background: "#7a1f2b", color: "#fff", padding: "8px 16px", borderRadius: "4px", textDecoration: "none" }}>
          + Add Team Member
        </a>
      </p>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #eee" }}>
            <th style={{ padding: "10px" }}>Name</th>
            <th style={{ padding: "10px" }}>Title</th>
            <th style={{ padding: "10px" }}>Home Slideshow</th>
            <th style={{ padding: "10px" }}>Published</th>
            <th style={{ padding: "10px" }}></th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>{m.name}</td>
              <td style={{ padding: "10px" }}>{m.title}</td>
              <td style={{ padding: "10px" }}>{m.featuredHome ? "Yes" : "—"}</td>
              <td style={{ padding: "10px" }}>{m.published ? "Yes" : "No"}</td>
              <td style={{ padding: "10px", textAlign: "right" }}>
                <a href={`/admin/team/${m.id}`} style={{ marginRight: "12px" }}>
                  Edit
                </a>
                <button onClick={() => handleDelete(m.id, m.name)} style={{ color: "#b91c1c", background: "none", border: "none", cursor: "pointer" }}>
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
