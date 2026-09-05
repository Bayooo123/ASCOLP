import { Html, Head, Main, NextScript } from "next/document";
import { VENDOR_CSS } from "../lib/vendorAssets";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon/favicon.ico" />
        <link rel="manifest" href="/assets/images/favicons/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {VENDOR_CSS.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </Head>
      <body>
        <div className="preloader">
          <img className="preloader__image" width="60" src="/assets/images/logo/logo.png" alt="" />
        </div>

        <Main />

        <div className="mobile-nav__wrapper">
          <div className="mobile-nav__overlay mobile-nav__toggler"></div>
          <div className="mobile-nav__content">
            <span className="mobile-nav__close mobile-nav__toggler">
              <i className="fa fa-times"></i>
            </span>
            <div className="logo-box">
              <a href="/" aria-label="logo image">
                <img src="/assets/images/logo/logo.png" width="155" alt="" />
              </a>
            </div>
            <div className="mobile-nav__container"></div>
            <ul className="mobile-nav__contact list-unstyled">
              <li>
                <i className="fa fa-envelope"></i>
                <a href="mailto:info@abiolasanniandco.com">info@abiolasanniandco.com</a>
              </li>
              <li>
                <i className="fa fa-phone-alt"></i>
                <a href="tel:+7033190180">+703319018</a>
              </li>
            </ul>
            <div className="mobile-nav__top">
              <div className="mobile-nav__social">
                <a href="https://twitter.com/ascolp2" className="fab fa-twitter"></a>
                <a href="https://web.facebook.com/abiolasanniandco" className="fab fa-facebook-square"></a>
                <a href="https://www.linkedin.com/company/ascolp/" className="fab fa-linkedin-in"></a>
              </div>
            </div>
          </div>
        </div>

        <div className="search-popup">
          <div className="search-popup__overlay search-toggler"></div>
          <div className="search-popup__content">
            <form action="/search">
              <label htmlFor="search" className="sr-only">
                search here
              </label>
              <input type="text" id="search" name="q" placeholder="Search Here..." />
              <button type="submit" aria-label="search submit" className="thm-btn">
                <i className="icon-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </div>

        <a href="#" data-target="html" className="scroll-to-target scroll-to-top">
          <i className="fa fa-angle-up"></i>
        </a>

        <NextScript />
      </body>
    </Html>
  );
}
