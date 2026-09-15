import { useEffect, useRef, useState } from "react";

const SLIDES = [
  { image: "/assets/images/hero/justice.jpeg", position: "center 30%" },
  { image: "/assets/images/hero/lagos.jpg", position: "center" },
  { image: "/assets/images/hero/scales.jpg", position: "center 55%" },
  { image: "/assets/images/hero/ruleoflaw.jpg", position: "center 45%" },
];

export default function HeroCarousel() {
  const [slide, setSlide] = useState(0);
  const autoplayRef = useRef(true);
  const [, forceRender] = useState(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotionRef.current) return;

    const interval = setInterval(() => {
      if (!autoplayRef.current) return;
      setSlide((i) => (i + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  function stopAutoplay() {
    autoplayRef.current = false;
    forceRender((n) => n + 1);
  }

  function goTo(i) {
    stopAutoplay();
    setSlide(i);
  }

  function goPrev() {
    goTo((slide - 1 + SLIDES.length) % SLIDES.length);
  }

  function goNext() {
    goTo((slide + 1) % SLIDES.length);
  }

  return (
    <section className={`rd-hero-carousel${reducedMotionRef.current ? " rd-hero-carousel--no-motion" : ""}`}>
      <div className="rd-hero-carousel__inner">
        {SLIDES.map((s, i) => (
          <div
            key={s.image}
            className={`rd-hero-carousel__layer${i === slide ? " rd-hero-carousel__layer--active" : ""}`}
            style={{ backgroundImage: `url("${s.image}")`, backgroundPosition: s.position }}
          />
        ))}
        <div className="rd-hero-carousel__scrim" />

        <div className="rd-hero-carousel__content">
          <div className="rd-hero-carousel__content-inner">
            <p className="rd-hero-carousel__kicker">Abiola Sanni &amp; Co. — Legal Practitioners</p>
            <h1 className="rd-hero-carousel__title">Cutting edge solutions to legal challenges.</h1>
            <p className="rd-hero-carousel__sub">
              For over 35 years, we have advised businesses and public institutions on complex questions of law,
              commerce and regulation.
            </p>
            <div className="rd-hero-carousel__btn-row">
              <a href="mailto:info@abiolasanniandco.com?subject=Consultation%20request" className="rd-btn rd-btn--primary">
                Request a consultation
              </a>
              <a href="/practice-areas" className="rd-btn rd-btn--secondary rd-btn--on-dark">
                Explore our practice areas
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="rd-hero-carousel__controls">
        <div className="rd-hero-carousel__arrows">
          <button type="button" className="rd-hero-carousel__arrow" aria-label="Previous slide" onClick={goPrev}>
            ←
          </button>
          <button type="button" className="rd-hero-carousel__arrow" aria-label="Next slide" onClick={goNext}>
            →
          </button>
        </div>
        <div className="rd-hero-carousel__indicators">
          {SLIDES.map((s, i) => (
            <button
              key={s.image}
              type="button"
              className={`rd-hero-carousel__indicator${i === slide ? " rd-hero-carousel__indicator--active" : ""}`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === slide}
              onClick={() => goTo(i)}
            >
              <span></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
