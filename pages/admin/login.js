import { useState } from "react";
import Head from "next/head";
import { getSessionFromReq } from "../../lib/auth";

export async function getServerSideProps({ req }) {
  const session = getSessionFromReq(req);
  if (session) {
    return { redirect: { destination: "/admin", permanent: false } };
  }
  return { props: {} };
}

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
      window.location.href = "/admin";
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5", fontFamily: "sans-serif" }}>
      <Head>
        <title>Admin Login | ASCOLP</title>
      </Head>
      <form
        onSubmit={handleSubmit}
        style={{ background: "#fff", padding: "40px", borderRadius: "8px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", width: "340px" }}
      >
        <h2 style={{ marginBottom: "24px" }}>ASCOLP Admin</h2>
        {error ? <p style={{ color: "#b91c1c", marginBottom: "16px" }}>{error}</p> : null}
        <label style={{ display: "block", marginBottom: "12px" }}>
          <span style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: "20px" }}>
          <span style={{ display: "block", marginBottom: "4px", fontSize: "14px" }}>Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: "12px", background: "#7a1f2b", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
