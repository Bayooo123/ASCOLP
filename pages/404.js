import Link from "next/link";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <Layout>
      <Seo title="Page Not Found" path="/404" />

      <div className="rd">
        <section className="rd-hero" style={{ minHeight: "56vh", display: "flex", alignItems: "center" }}>
          <div className="rd-container rd-hero__inner">
            <p className="rd-kicker">404</p>
            <h1 style={{ fontSize: "clamp(34px, 4.4vw, 50px)" }}>This page doesn&rsquo;t exist.</h1>
            <p className="rd-intro">
              The page you&rsquo;re looking for may have moved or the link may be out of date. Here are a few places
              to pick back up.
            </p>
            <div className="rd-btn-row">
              <Link href="/" className="rd-btn rd-btn--primary">
                Back to Home
              </Link>
              <Link href="/discuss-a-matter" className="rd-btn rd-btn--secondary">
                Brief Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
