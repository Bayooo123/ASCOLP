import Header from "./Header";
import Footer from "./Footer";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="page-wrapper">
      <Header />
      {children}
      <Footer />

      {/* Mobile Fixed CTA Bar */}
      <div className="rd-mobile-bottom-bar" aria-label="Quick contact actions">
        <a href="tel:+2347069268744" className="rd-mobile-bottom-bar__call">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>Call Chambers</span>
        </a>
        <Link href="/discuss-a-matter" className="rd-mobile-bottom-bar__matter">
          <span>Discuss a Matter</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </div>
  );
}
