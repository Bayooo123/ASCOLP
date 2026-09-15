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
            <p>Cutting edge solutions to legal challenges.</p>
          </div>

          <div className="rd-footer__col">
            <h3>Explore</h3>
            <a href="/about">About</a>
            <a href="/team">Our Team</a>
            <a href="/practice-areas">Practice Areas</a>
            <a href="/articles">Thought Leadership</a>
            <a href="/alumni">Alumni</a>
          </div>

          <div className="rd-footer__col">
            <h3>Contact</h3>
            <p>14 Barikisu Street, Iyede Onike, Off Custom, Yaba, Lagos, Nigeria</p>
            <a href="tel:+2347069268744" className="rd-footer__phone">
              +234 706 926 8744
            </a>
            <a href="mailto:info@abiolasanniandco.com">info@abiolasanniandco.com</a>
          </div>

          <div className="rd-footer__col">
            <h3>Newsletter</h3>
            {subscribed === "1" ? (
              <p style={{ color: "#4ade80" }}>Thanks for subscribing!</p>
            ) : subscribed === "0" ? (
              <p style={{ color: "#f87171" }}>Please enter a valid email address.</p>
            ) : (
              <>
                <p>Subscribe for our latest articles and resources.</p>
                <form action="/api/newsletter-signup" method="post">
                  <label htmlFor="footer-email" className="rd-footer__newsletter-label">
                    Email address
                  </label>
                  <div className="rd-footer__newsletter-row" style={{ marginTop: "6px" }}>
                    <input id="footer-email" type="email" name="email" required placeholder="you@company.com" />
                    <button type="submit">Join</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="rd-footer__bottom">
          <div className="rd-footer__bottom-inner">© Copyright {new Date().getFullYear()}. Abiola Sanni &amp; Co. All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  );
}
