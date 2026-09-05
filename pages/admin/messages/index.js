import { useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import { getSessionFromReq } from "../../../lib/auth";
import { db } from "../../../lib/db";

export async function getServerSideProps({ req }) {
  const session = getSessionFromReq(req);
  if (!session) return { redirect: { destination: "/admin/login", permanent: false } };
  if (session.role !== "ADMIN") return { redirect: { destination: "/admin", permanent: false } };

  const { data } = await db("contactMessages").select("*").order("createdAt", { ascending: false });
  return { props: { messages: data || [] } };
}

export default function AdminMessages({ messages: initial }) {
  const [messages, setMessages] = useState(initial);

  async function toggleRead(id, read) {
    const res = await fetch(`/api/messages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !read }),
    });
    if (res.ok) setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: !read } : m)));
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this message?")) return;
    const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
    if (res.ok) setMessages((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <AdminLayout title="Contact Messages">
      {messages.map((m) => (
        <div key={m.id} style={{ background: "#fff", padding: "16px 20px", borderRadius: "8px", marginBottom: "12px", opacity: m.read ? 0.6 : 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>
              {m.name} &lt;{m.email}&gt;
            </strong>
            <span style={{ fontSize: "13px", color: "#888" }}>{new Date(m.createdAt).toLocaleString()}</span>
          </div>
          {m.subject ? <p style={{ fontWeight: 600, marginTop: "6px" }}>{m.subject}</p> : null}
          {m.phone ? <p style={{ fontSize: "13px", color: "#666" }}>Phone: {m.phone}</p> : null}
          <p style={{ marginTop: "8px" }}>{m.message}</p>
          <div style={{ marginTop: "10px" }}>
            <button onClick={() => toggleRead(m.id, m.read)} style={{ marginRight: "12px", background: "none", border: "1px solid #ccc", padding: "4px 10px", borderRadius: "4px", cursor: "pointer" }}>
              Mark as {m.read ? "unread" : "read"}
            </button>
            <button onClick={() => handleDelete(m.id)} style={{ color: "#b91c1c", background: "none", border: "none", cursor: "pointer" }}>
              Delete
            </button>
          </div>
        </div>
      ))}
      {!messages.length ? <p style={{ color: "#888" }}>No messages yet.</p> : null}
    </AdminLayout>
  );
}
