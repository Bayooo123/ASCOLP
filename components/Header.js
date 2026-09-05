export default function Header() {
  return (
    <>
      <header className="main-header clearfix">
        <nav className="main-menu clearfix">
          <div className="main-menu-wrapper clearfix">
            <div className="main-menu-wrapper__left">
              <div className="main-menu-wrapper__logo">
                <a href="/">
                  <img src="/assets/images/logo/logo.png" alt="ASCOLP" />
                </a>
              </div>
              <div className="main-menu-wrapper__main-menu">
                <a href="#" className="mobile-nav__toggler">
                  <i className="fa fa-bars"></i>
                </a>
                <ul className="main-menu__list">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li className="dropdown">
                    <a href="#">About</a>
                    <ul>
                      <li>
                        <a href="/about">About ASCOLP</a>
                      </li>
                      <li>
                        <a href="/philosophy">Our Philosophy</a>
                      </li>
                      <li>
                        <a href="/principal-partner">Principal Partner</a>
                      </li>
                      <li>
                        <a href="/team">Meet Our Team</a>
                      </li>
                      <li>
                        <a href="/csr">Corporate Social Responsibility</a>
                      </li>
                      <li>
                        <a href="/contact">Contact Us</a>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown">
                    <a href="#">Practice Areas</a>
                    <ul>
                      <li>
                        <a href="/practice-areas/tax-unit">Tax Unit</a>
                      </li>
                      <li>
                        <a href="/practice-areas/corporate">Corporate &amp; Commercial Department</a>
                      </li>
                      <li>
                        <a href="/practice-areas/litigation-arbitrations">Litigation &amp; Arbitrations</a>
                      </li>
                      <li>
                        <a href="/practice-areas/probate">Probate Services</a>
                      </li>
                      <li>
                        <a href="/practice-areas/corporate-secretarial">Corporate Secretarial Services</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="/alumni">Alumni</a>
                  </li>
                  <li>
                    <a href="/articles">Articles &amp; Newsletters</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="main-menu-wrapper__right">
              <div className="main-menu-wrapper__call">
                <div className="main-menu-wrapper__call-icon">
                  <span className="icon-phone-call"></span>
                </div>
                <div className="main-menu-wrapper__call-number">
                  <p>Need help? Talk to Us</p>
                  <h5>
                    <a href="tel:+703319018">+703319018</a>
                  </h5>
                </div>
              </div>
              <div className="main-menu-wrapper__search-cat">
                <a href="#" className="main-menu-wrapper__search search-toggler icon-magnifying-glass"></a>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="stricky-header stricked-menu main-menu">
        <div className="sticky-header__content"></div>
      </div>
    </>
  );
}
