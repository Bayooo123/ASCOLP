import { useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { getSessionFromReq } from "../../../lib/auth";
import { db } from "../../../lib/db";

export async function getServerSideProps({ req }) {
  const session = getSessionFromReq(req);
  if (!session) return { redirect: { destination: "/admin/login", permanent: false } };
  if (session.role !== "ADMIN") return { redirect: { destination: "/admin", permanent: false } };

  const { data } = await db("alumni").select("*").order("approved").order("createdAt", { ascending: false });
  return { props: { alumni: data || [] } };
}

export default function AdminAlumniList({ alumni: initial }) {
  const [alumni, setAlumni] = useState(initial);

  async function handleApprove(id) {
    const res = await fetch(`/api/alumni/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved: true }),
    });
    if (res.ok) setAlumni((prev) => prev.map((a) => (a.id === id ? { ...a, approved: true } : a)));
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    const res = await fetch(`/api/alumni/${id}`, { method: "DELETE" });
    if (res.ok) setAlumni((prev) => prev.filter((a) => a.id !== id));
  }

  const pending = alumni.filter((a) => !a.approved);
  const approved = alumni.filter((a) => a.approved);

  return (
    <AdminLayout title="Alumni">
      <p style={{ marginBottom: "20px" }}>
        <a href="/admin/alumni/new" style={{ background: "#7a1f2b", color: "#fff", padding: "8px 16px", borderRadius: "4px", textDecoration: "none" }}>
          + Add Alumnus
        </a>
      </p>

      {pending.length ? (
        <>
          <h3 style={{ margin: "24px 0 12px" }}>Pending Review ({pending.length})</h3>
          <AlumniTable rows={pending} onApprove={handleApprove} onDelete={handleDelete} />
        </>
      ) : null}

      <h3 style={{ margin: "24px 0 12px" }}>Published ({approved.length})</h3>
      <AlumniTable rows={approved} onDelete={handleDelete} />
    </AdminLayout>
  );
}

function AlumniTable({ rows, onApprove, onDelete }) {
  if (!rows.length) return <p style={{ color: "#888" }}>None yet.</p>;
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", marginBottom: "20px" }}>
      <thead>
        <tr style={{ textAlign: "left", borderBottom: "2px solid #eee" }}>
          <th style={{ padding: "10px" }}>Name</th>
          <th style={{ padding: "10px" }}>Role at Firm</th>
          <th style={{ padding: "10px" }}>Now</th>
          <th style={{ padding: "10px" }}>Source</th>
          <th style={{ padding: "10px" }}></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((a) => (
          <tr key={a.id} style={{ borderBottom: "1px solid #eee" }}>
            <td style={{ padding: "10px" }}>{a.name}</td>
            <td style={{ padding: "10px" }}>{a.roleAtFirm}</td>
            <td style={{ padding: "10px" }}>{[a.currentPosition, a.currentOrganization].filter(Boolean).join(", ")}</td>
            <td style={{ padding: "10px" }}>{a.source === "SELF_SUBMITTED" ? "Self-submitted" : "Admin"}</td>
            <td style={{ padding: "10px", textAlign: "right", whiteSpace: "nowrap" }}>
              {!a.approved && onApprove ? (
                <button onClick={() => onApprove(a.id)} style={{ marginRight: "12px", background: "#166534", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "4px", cursor: "pointer" }}>
                  Approve
                </button>
              ) : null}
              <a href={`/admin/alumni/${a.id}`} style={{ marginRight: "12px" }}>
                Edit
              </a>
              <button onClick={() => onDelete(a.id, a.name)} style={{ color: "#b91c1c", background: "none", border: "none", cursor: "pointer" }}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
