export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div
          className="site-footer-shape-1"
          style={{ backgroundImage: "url(/assets/images/shapes/site-footer-shape-1.png)" }}
        ></div>
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
              <div className="footer-widget__column footer-widget__about">
                <div className="footer-widget__about-text-box">
                  <p className="footer-widget__about-text">Cutting Edge Solutions to Legal Challenges.</p>
                </div>
                <div className="site-footer__social">
                  <a href="https://www.linkedin.com/company/ascolp/" target="_blank" rel="noreferrer" className="fab fa-linkedin-in"></a>
                  <a href="https://twitter.com/ascolp2" target="_blank" rel="noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://web.facebook.com/abiolasanniandco" target="_blank" rel="noreferrer">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="https://wa.me/2347033190180" target="_blank" rel="noreferrer">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
              <div className="footer-widget__column footer-widget__explore clearfix">
                <h3 className="footer-widget__title">Explore</h3>
                <ul className="footer-widget__explore-list list-unstyled clearfix">
                  <li>
                    <a href="/about">About</a>
                  </li>
                  <li>
                    <a href="/team">Our Team</a>
                  </li>
                  <li>
                    <a href="/alumni">Alumni</a>
                  </li>
                  <li>
                    <a href="/csr">Corporate Social Responsibility</a>
                  </li>
                  <li>
                    <a href="/articles">Articles &amp; Newsletters</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms">
              <div className="footer-widget__column footer-widget__newsletter-box clearfix">
                <h3 className="footer-widget__title">Newsletter</h3>
                <p className="footer-widget__newsletter-text">Subscribe for our upcoming latest articles and resources</p>
                <form className="footer-widget__newsletter-form" action="/api/newsletter-signup" method="post">
                  <div className="footer-widget__newsletter-input-box">
                    <input type="email" placeholder="Email address" name="email" required />
                    <button type="submit" className="footer-widget__newsletter-btn">
                      <i className="far fa-paper-plane"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="400ms">
              <div className="footer-widget__column footer-widget__contact clearfix">
                <h3 className="footer-widget__title">Contact</h3>
                <p className="footer-widget__contact-text">14 Barikisu Street, Iyede Onike, Off Custom, Yaba, Lagos, Nigeria</p>
                <h4 className="footer-widget__contact-info">
                  <a href="tel:+703319018" className="footer-widget__contact-number">
                    +703319018
                  </a>
                  <a href="mailto:info@abiolasanniandco.com" className="footer-widget__contact-email">
                    info@abiolasanniandco.com
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="site-footer__bottom-inner">
                <p className="site-footer__bottom-text">© Copyright {new Date().getFullYear()}. Abiola Sanni &amp; Co. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
