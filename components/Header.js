import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "The Firm" },
  { href: "/practice-areas", label: "Expertise" },
  { href: "/team", label: "People" },
  { href: "/articles", label: "Knowledge" },
  { href: "/publishers", label: "ASCO Publishers" },
];

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function isActive(href) {
    if (href === "/team") return router.pathname.startsWith("/team");
    if (href === "/practice-areas") return router.pathname.startsWith("/practice-areas");
    if (href === "/articles") return router.pathname.startsWith("/articles") || router.pathname.startsWith("/knowledge");
    if (href === "/publishers") return router.pathname.startsWith("/publishers");
    if (href === "/about") return router.pathname === "/about";
    return router.pathname === href;
  }

  return (
    <div className="rd">
      <div className="rd-utilitybar">
        <div className="rd-container rd-utilitybar__inner">
          <div className="rd-utilitybar__left">
            <a href="tel:+2347069268744" className="rd-phone">
              +234 706 926 8744
            </a>
            <a href="mailto:info@abiolasanniandco.com">info@abiolasanniandco.com</a>
          </div>
          <div className="rd-utilitybar__right">
            <span>14 Barikisu Street, Yaba, Lagos</span>
            <a href="https://www.linkedin.com/company/ascolp/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <header className="rd-header">
        <div className="rd-container rd-header__inner">
          <Link href="/" className="rd-header__logo">
            <img src="/assets/images/logo/ascolp.png" alt="ASCOLP — Abiola Sanni & Co." />
          </Link>

          <nav className="rd-nav">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rd-nav__link${isActive(link.href) ? " rd-nav__link--active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/discuss-a-matter" className="rd-btn rd-btn--primary rd-header__cta">
            Discuss a Matter
          </Link>

          <button
            type="button"
            className="rd-mobile-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
          </button>
        </div>

        <div className={`rd-mobile-drawer${open ? " is-open" : ""}`}>
          <nav className="rd-nav">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rd-nav__link${isActive(link.href) ? " rd-nav__link--active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/discuss-a-matter"
            className="rd-btn rd-btn--primary rd-header__cta"
            onClick={() => setOpen(false)}
          >
            Discuss a Matter
          </Link>
        </div>
      </header>
    </div>
  );
}
