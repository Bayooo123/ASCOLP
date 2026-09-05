export default function PageHeader({ title, crumb, bg = "/assets/images/backgrounds/law_justice_ascolp.jpg" }) {
  return (
    <section className="page-header">
      <div className="page-header-bg" style={{ backgroundImage: `url(${bg})` }}></div>
      <div className="page-header-shape-1 float-bob-x-6"></div>
      <div className="page-header-shape-2 float-bob-x-7"></div>
      <div className="container">
        <div className="page-header__inner">
          <ul className="thm-breadcrumb list-unstyled">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <span>/</span>
            </li>
            <li>{crumb || title}</li>
          </ul>
          <h2>{title}</h2>
        </div>
      </div>
    </section>
  );
}
