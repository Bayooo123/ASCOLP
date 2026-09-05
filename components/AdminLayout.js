import Head from "next/head";

async function handleLogout() {
  await fetch("/api/auth/logout", { method: "POST" });
  window.location.href = "/admin/login";
}

export default function AdminLayout({ title, children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "sans-serif" }}>
      <Head>
        <title>{title ? `${title} | ASCOLP Admin` : "ASCOLP Admin"}</title>
      </Head>
      <header style={{ background: "#1c1c28", color: "#fff", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <strong>ASCOLP Admin</strong>
          <a href="/admin" style={{ color: "#ccc" }}>
            Dashboard
          </a>
          <a href="/admin/team" style={{ color: "#ccc" }}>
            Team
          </a>
          <a href="/admin/alumni" style={{ color: "#ccc" }}>
            Alumni
          </a>
        </div>
        <button
          onClick={handleLogout}
          style={{ background: "transparent", border: "1px solid #555", color: "#fff", padding: "6px 14px", borderRadius: "4px", cursor: "pointer" }}
        >
          Log out
        </button>
      </header>
      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px" }}>
        {title ? <h1 style={{ marginBottom: "24px" }}>{title}</h1> : null}
        {children}
      </main>
    </div>
  );
}
