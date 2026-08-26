import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useStorefrontData } from '../context/StorefrontDataContext';

export default function CollectionPage() {
  const { products, whatsappLink } = useStorefrontData();
  const [selectedCat, setSelectedCat] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  let displayProducts = products.filter((item) => {
    const matchesCat =
      selectedCat === 'all' ||
      item.category === selectedCat ||
      (selectedCat === 'pashmina' && (item.category === 'pashmina' || item.category === 'shatoosh'));

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.origin && item.origin.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  if (sortOrder === 'price-asc') {
    displayProducts.sort((a, b) => {
      const pA = parseInt(a.price.replace(/[^0-9]/g, ''), 10);
      const pB = parseInt(b.price.replace(/[^0-9]/g, ''), 10);
      return pA - pB;
    });
  } else if (sortOrder === 'price-desc') {
    displayProducts.sort((a, b) => {
      const pA = parseInt(a.price.replace(/[^0-9]/g, ''), 10);
      const pB = parseInt(b.price.replace(/[^0-9]/g, ''), 10);
      return pB - pA;
    });
  }

  const scrollToCatalogue = () => {
    const el = document.getElementById('catalogue-controls');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="page-hero page-hero-full">
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
        </svg>

        <div className="hero-gradient-overlay" />

        <div className="wrap page-hero-inner">
          <h1 className="page-hero-title">
            The Complete Shawl <em>Collection</em>
          </h1>

          <p className="page-hero-lede">
            Explore our curated inventory of virgin Pashmina, Royal Shatoosh,
            Swati ceremonial mountain chadars, and fine evening silk stoles. Each weave is individually
            inspected for purity, texture, and authentic warmth in our Nathia Gali boutique.
          </p>

          <div className="page-hero-cta">
            <button type="button" onClick={scrollToCatalogue} className="btn btn-gold btn-large">
              Browse Catalogue ({products.length} Weaves) ↓
            </button>
            <a
              className="btn btn-primary btn-large"
              target="_blank"
              rel="noopener noreferrer"
              href={whatsappLink}
            >
              Inquire on WhatsApp →
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToCatalogue}
          className="hero-scroll-indicator"
          aria-label="Scroll to collection"
        >
          <span>Scroll to explore</span>
          <span className="scroll-arrow">↓</span>
        </button>
      </section>

      <section id="catalogue-controls" className="collection-control-section">
        <div className="wrap">
          <div className="controls-bar">
            <div className="search-wrap">
              <input
                type="text"
                placeholder="Search by weave, fabric, or origin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="filter-pills">
              <button
                type="button"
                className={`filter-btn ${selectedCat === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCat('all')}
              >
                All Shawls ({products.length})
              </button>
              <button
                type="button"
                className={`filter-btn ${selectedCat === 'pashmina' ? 'active' : ''}`}
                onClick={() => setSelectedCat('pashmina')}
              >
                Pashmina & Shatoosh
              </button>
              <button
                type="button"
                className={`filter-btn ${selectedCat === 'wool' ? 'active' : ''}`}
                onClick={() => setSelectedCat('wool')}
              >
                Swati Mountain Wool
              </button>
              <button
                type="button"
                className={`filter-btn ${selectedCat === 'silk' ? 'active' : ''}`}
                onClick={() => setSelectedCat('silk')}
              >
                Silk & Evening Stoles
              </button>
            </div>

            <div className="sort-wrap">
              <label htmlFor="sort-select" className="sort-label">Sort by:</label>
              <select
                id="sort-select"
                className="sort-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Curated Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="collection" style={{ paddingTop: '20px' }}>
        <div className="wrap">
          {displayProducts.length === 0 ? (
            <div className="empty-results-box">
              <h3>
                {products.length === 0 ? 'Curating New Weaves' : 'No shawls found matching your search'}
              </h3>
              <p>
                {products.length === 0
                  ? 'We are finishing authentic handspun pieces in Nathia Gali. Contact our curator directly on WhatsApp for real-time stock.'
                  : 'Try resetting the category filter or searching for another fabric keyword.'}
              </p>
              {products.length === 0 ? (
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-large">
                  Ask Curator on WhatsApp →
                </a>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedCat('all');
                    setSearchQuery('');
                  }}
                >
                  Reset All Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="sizing-guide-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Drape & Sizing</span>
              <h2>Finding your ideal shawl dimensions</h2>
            </div>
            <p>We handcraft different standard dimensions suited for men’s chadars, women’s wraps, and formal stoles.</p>
          </div>

          <div className="mobile-scroll-hint">
            <span>Swipe to compare dimensions →</span>
          </div>

          <div className="sizing-grid">
            <div className="size-card">
              <span className="size-dim">2.5m × 1.35m</span>
              <h3>Men’s Ceremonial Chadar</h3>
              <p>Generously sized for full-body traditional shoulder wrap. Offers complete wind resistance and formal drape over kurtas and sherwanis.</p>
              <span className="size-tag">Swati Wool & Heavy Pashmina</span>
            </div>

            <div className="size-card">
              <span className="size-dim">2.25m × 1.15m</span>
              <h3>Women’s Luxury Full Wrap</h3>
              <p>The timeless standard wrap dimension. Ample length for layered shoulder draping, pleated folds, and evening warmth.</p>
              <span className="size-tag">Pure Pashmina & Shatoosh</span>
            </div>

            <div className="size-card">
              <span className="size-dim">2.0m × 0.85m</span>
              <h3>Formal Evening Stole</h3>
              <p>Compact, tailored silhouette designed to accent blazers, coats, or light festive attire without overwhelming volume.</p>
              <span className="size-tag">Mulberry Silk & Merino</span>
            </div>
          </div>
        </div>
      </section>

      <section className="wedding-gifting-section">
        <div className="wrap">
          <div className="gifting-card">
            <div className="gifting-content">
              <span className="eyebrow on-dark">Custom Services</span>
              <h2>Wedding favors & bespoke heirloom boxes</h2>
              <p>
                Looking for matching bridesmaid shawls, groomsmen Swati chadars, 
                or handcrafted wooden presentation gift boxes with personal calligraphy? 
                We curate custom gift sets for seasonal celebrations across Pakistan and overseas.
              </p>
              <div className="gifting-points">
                <div className="g-point"><span className="g-dot">•</span><span>Custom shade matching & natural dyeing</span></div>
                <div className="g-point"><span className="g-dot">•</span><span>Personalized wooden velvet-lined gift chests</span></div>
                <div className="g-point"><span className="g-dot">•</span><span>Special tiered rates for orders of 5+ pieces</span></div>
              </div>
              <div className="gifting-action-row">
                <a
                  className="btn btn-primary btn-large"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://wa.me/923002121224?text=Hello%20Kamran%20Shawls%2C%20I%27d%20like%20to%20inquire%20about%20a%20Bespoke%20Wedding%20or%20Gift%20Order."
                >
                  Discuss Custom Gifting on WhatsApp →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
