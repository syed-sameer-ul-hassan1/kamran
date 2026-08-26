import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStorefrontData } from '../context/StorefrontDataContext';
import { CardVisual } from './ProductCard';

export default function Hero() {
  const { hero, products, whatsappLink } = useStorefrontData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const showcaseProducts = (products && products.length > 0 ? products : []).filter((p) => p.featured || p.inStock).slice(0, 4);
  const featured = showcaseProducts[currentIndex] || showcaseProducts[0] || (products && products[0]);

  const handlePrev = () => {
    if (showcaseProducts.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? showcaseProducts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (showcaseProducts.length <= 1) return;
    setCurrentIndex((prev) => (prev === showcaseProducts.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="hero" aria-label="Introduction">
      <svg
        className="hero-pattern"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: 'var(--gold)' }}
      >
        <use href="#boteh" x="10" y="10" width="60" height="90" />
        <use href="#boteh" x="90" y="60" width="60" height="90" />
        <use href="#boteh" x="170" y="0" width="60" height="90" />
        <use href="#boteh" x="250" y="70" width="60" height="90" />
        <use href="#boteh" x="330" y="20" width="60" height="90" />
        <use href="#boteh" x="50" y="150" width="60" height="90" />
        <use href="#boteh" x="130" y="200" width="60" height="90" />
        <use href="#boteh" x="210" y="160" width="60" height="90" />
        <use href="#boteh" x="290" y="220" width="60" height="90" />
        <use href="#boteh" x="10" y="280" width="60" height="90" />
        <use href="#boteh" x="170" y="300" width="60" height="90" />
        <use href="#boteh" x="330" y="290" width="60" height="90" />
      </svg>

      <div className="hero-gradient-overlay" />

      <div className="hero-inner hero-layout">
        <div className="hero-content">
          <h1 className="hero-title">
            Shawls chosen carefully, worn <em>for years</em>
          </h1>

          <p className="lede hero-lede">
            Kamran Shawls curates authentic hand-finished Pashmina, Shatoosh and
            Swati weaves directly from master artisans. Every piece is individually
            inspected in-store for thread density, finish, and authentic warmth.
          </p>

          <div className="hero-cta">
            <Link className="btn btn-gold hero-btn" to="/collection">
              Explore Collection
              <span className="btn-arrow">→</span>
            </Link>
            <a
              className="btn btn-primary hero-btn"
              target="_blank"
              rel="noopener noreferrer"
              href={WHATSAPP_LINK}
            >
              Enquire on WhatsApp
            </a>
          </div>
        </div>

        <div className="hero-showcase">
          <div className="showcase-card">
            <div className="showcase-glow" />

            <div className="showcase-header">
              <div className="showcase-badge-group">
                <span className="showcase-counter">
                  0{currentIndex + 1} / 0{showcaseProducts.length}
                </span>
              </div>

              <div className="showcase-nav-arrows">
                <button
                  type="button"
                  className="nav-arrow-btn"
                  onClick={handlePrev}
                  aria-label="Previous Featured Weave"
                  title="Previous shawl"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="nav-arrow-btn"
                  onClick={handleNext}
                  aria-label="Next Featured Weave"
                  title="Next shawl"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="showcase-image-frame">
              <CardVisual type={featured.visual} />
              
              <div className="showcase-overlay-price">
                {featured.price}
              </div>
            </div>

            <div className="showcase-body">
              <div className="showcase-title-row">
                <h3 className="showcase-name">{featured.name}</h3>
              </div>

              <p className="showcase-desc">{featured.desc}</p>

              <div className="showcase-pagination">
                {showcaseProducts.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`pagination-dot ${currentIndex === idx ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Select weave ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="showcase-action">
                <a
                  className="btn btn-primary btn-full showcase-order-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://wa.me/923002121224?text=Hello%2C%20I%20am%20interested%20in%20the%20${featured.enquiryText}.`}
                >
                  Order This Piece on WhatsApp →
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
