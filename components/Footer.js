import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  const subscribed = router.query.subscribed;

  return (
    <div className="rd">
      <footer className="rd-footer">
        <div className="rd-footer__top">
          <div className="rd-footer__col rd-footer__col--logo">
            <img src="/assets/images/logo/ascolp.png" alt="ASCOLP" />
            <p>Advocacy, commercial counsel and institutional reform under one roof in Lagos, Nigeria.</p>
          </div>

          <div className="rd-footer__col">
            <h3>Institution</h3>
            <Link href="/about">The Firm</Link>
            <Link href="/team">People</Link>
            <Link href="/practice-areas">Expertise</Link>
            <Link href="/articles">Knowledge</Link>
            <Link href="/publishers">ASCO Publishers</Link>
            <Link href="/alumni">Alumni</Link>
          </div>

          <div className="rd-footer__col">
            <h3>Chambers</h3>
            <p>14 Barikisu Street, Iyede Onike, Off Custom, Yaba, Lagos, Nigeria</p>
            <a href="tel:+2347069268744" className="rd-footer__phone">
              +234 706 926 8744
            </a>
            <a href="mailto:info@abiolasanniandco.com">info@abiolasanniandco.com</a>
            <div style={{ marginTop: "12px" }}>
              <Link href="/discuss-a-matter" className="rd-link" style={{ color: "var(--rd-ivory)", fontWeight: 600 }}>
                Brief Us →
              </Link>
            </div>
          </div>

          <div className="rd-footer__col">
            <h3>Legal Intelligence</h3>
            {subscribed === "1" ? (
              <p style={{ color: "#4ade80" }}>Thanks for subscribing!</p>
            ) : subscribed === "0" ? (
              <p style={{ color: "#f87171" }}>Please enter a valid email address.</p>
            ) : (
              <>
                <p>Receive our legal briefings, case notes, and legislative analysis directly.</p>
                <form action="/api/newsletter-signup" method="post">
                  <label htmlFor="footer-email" className="rd-footer__newsletter-label">
                    Email address
                  </label>
                  <div className="rd-footer__newsletter-row" style={{ marginTop: "6px" }}>
                    <input id="footer-email" type="email" name="email" required placeholder="counsel@corporate.com" />
                    <button type="submit">Join</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="rd-footer__bottom">
          <div className="rd-footer__bottom-inner">
            <span>© Copyright {new Date().getFullYear()}. Abiola Sanni &amp; Co. LP (ASCOLP). All Rights Reserved.</span>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
              Privileged &amp; Confidential Legal Services · Barristers &amp; Solicitors of the Supreme Court of Nigeria
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
