import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { useStorefrontData } from '../context/StorefrontDataContext';
import { PhoneIcon, LocationIcon, InstagramIcon, TikTokIcon } from '../components/Icons';

export default function HomePage() {
  const { products, materials, testimonials, faqs, whatsappLink } = useStorefrontData();
  const [filter, setFilter] = useState('all');
  const [openFaq, setOpenFaq] = useState(0);

  const filteredProducts = products.filter((item) => {
    if (filter === 'pashmina') return item.category === 'pashmina' || item.category === 'shatoosh';
    if (filter === 'wool') return item.category === 'wool';
    if (filter === 'silk') return item.category === 'silk' || item.category === 'cotton';
    return true;
  }).slice(0, 6);

  return (
    <>
      <Hero />

      <section className="pillars-strip">
        <div className="wrap pillars-grid">
          <div className="pillar-item">
            <span className="pillar-num">01</span>
            <div className="pillar-text">
              <h4>100% Verified Natural Fibres</h4>
              <p>Hand-combed Himalayan cashmere, pure Shatoosh, and Swat Valley wool with zero synthetic polyester adulteration.</p>
            </div>
          </div>
          <div className="pillar-item">
            <span className="pillar-num">02</span>
            <div className="pillar-text">
              <h4>4-Point In-Store Quality Check</h4>
              <p>Every fringe, warp tension, and border pattern is personally verified in Nathia Gali before leaving our boutique.</p>
            </div>
          </div>
          <div className="pillar-item">
            <span className="pillar-num">03</span>
            <div className="pillar-text">
              <h4>Direct Artisan Concierge</h4>
              <p>Direct WhatsApp consultation for real-time video previews, drape advice, and tracked nationwide express delivery.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="collection home-collection">
        <div className="wrap">
          <div className="section-head collection-head">
            <div>
              <span className="eyebrow">The Collection</span>
              <h2>Signature weaves, crafted to endure for generations</h2>
              <p>Explore our curated seasonal selection of authentic mountain shawls, wraps, and ceremonial chadars.</p>
            </div>
            
            <div className="filter-pills">
              <button
                type="button"
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Featured ({PRODUCTS.length})
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === 'pashmina' ? 'active' : ''}`}
                onClick={() => setFilter('pashmina')}
              >
                Pashmina & Shatoosh
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === 'wool' ? 'active' : ''}`}
                onClick={() => setFilter('wool')}
              >
                Swati & Merino Wool
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === 'silk' ? 'active' : ''}`}
                onClick={() => setFilter('silk')}
              >
                Silk & Cotton
              </button>
            </div>
          </div>

          <div className="mobile-scroll-hint">
            <span>Swipe to explore weaves →</span>
          </div>

          <div className="grid home-collection-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="collection-cta-wrap">
            <Link to="/collection" className="btn btn-primary btn-large">
              Browse Complete Catalogue & Custom Pieces →
            </Link>
          </div>
        </div>
      </section>

      <section className="materials-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Fiber Knowledge</span>
              <h2>Understanding mountain wools & weaves</h2>
            </div>
            <p>Every natural fleece offers unique warmth, tactile softness, and draping weight.</p>
          </div>

          <div className="mobile-scroll-hint">
            <span>Swipe to compare fibers →</span>
          </div>

          <div className="materials-grid">
            {MATERIALS_GUIDE.map((mat) => (
              <div className="material-card" key={mat.name}>
                <div className="mat-header">
                  <div>
                    <span className="mat-badge">Mountain Fleece</span>
                    <h3 className="mat-title">{mat.name}</h3>
                  </div>
                  <span className="mat-micron">{mat.micron}</span>
                </div>

                <div className="mat-metrics-panel">
                  <div className="mat-metric-row">
                    <span className="m-lbl">Tactile Feel</span>
                    <span className="m-val">{mat.feel}</span>
                  </div>
                  
                  <div className="mat-metric-row">
                    <div className="m-lbl-with-val">
                      <span className="m-lbl">Warmth Index</span>
                      <span className="m-val-highlight">{mat.warmth}</span>
                    </div>
                    <div className="warmth-bar-track">
                      <div className="warmth-bar-fill" style={{ width: `${mat.warmthPercent}%` }} />
                    </div>
                  </div>
                </div>

                <p className="mat-desc">{mat.description}</p>

                <div className="mat-foot">
                  <span className="mat-ideal-lbl">Best Suited For</span>
                  <span className="mat-ideal-val">{mat.idealFor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="craft home-craft">
        <div className="wrap">
          <div className="craft-banner-card">
            <div className="craft-banner-content">
              <span className="eyebrow on-dark">Artisan Heritage</span>
              <h2>A boutique built on knowing true handloom purity</h2>
              <p className="craft-lead">
                Kamran Shawls was established in the hills of Nathia Gali with an uncompromising standard: 
                travel directly to the master weavers across Kashmir, Swat, and Northern Valleys 
                to select each piece rather than trading in mass machine-made replicas.
              </p>

              <div className="craft-timeline-mini">
                <div className="mini-step">
                  <span className="step-badge">1</span>
                  <div>
                    <strong>Direct Mountain Sourcing</strong>
                    <p>Visiting remote weavers & family handlooms directly</p>
                  </div>
                </div>
                <div className="mini-step">
                  <span className="step-badge">2</span>
                  <div>
                    <strong>Fiber Grade Selection</strong>
                    <p>Screening micron count & natural warp elasticity</p>
                  </div>
                </div>
                <div className="mini-step">
                  <span className="step-badge">3</span>
                  <div>
                    <strong>In-Store Thread Audit</strong>
                    <p>Testing weft density & hand-twisted border fringes</p>
                  </div>
                </div>
                <div className="mini-step">
                  <span className="step-badge">4</span>
                  <div>
                    <strong>Cedar Packaging</strong>
                    <p>Hand-pressed in protective covers for tracked transit</p>
                  </div>
                </div>
              </div>

              <div className="craft-btn-row">
                <Link to="/craft" className="btn btn-gold btn-large">
                  Explore Full Craftsmanship Journey →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="wrap">
          <div className="section-head text-center" style={{ margin: '0 auto 36px', textAlign: 'center', maxWidth: '650px' }}>
            <span className="eyebrow">Patron Testimonials</span>
            <h2>Worn by discerning patrons across Pakistan</h2>
            <p>Read what our clients from Islamabad, Lahore, Karachi, and abroad say about our weaves.</p>
          </div>

          <div className="mobile-scroll-hint">
            <span>Swipe to read reviews →</span>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, idx) => (
              <div className="testimonial-card" key={idx}>
                <div className="t-rating">{'★'.repeat(t.rating)}</div>
                <p className="t-comment">&ldquo;{t.comment}&rdquo;</p>
                <div className="t-author">
                  <strong>{t.name}</strong>
                  <span className="t-city">{t.city} • <span className="t-shawl">{t.shawl}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faqs-section">
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: '32px' }}>
            <div>
              <span className="eyebrow">Client Support</span>
              <h2>Frequently asked questions</h2>
            </div>
            <p>Everything you need to know about our ordering process, purity testing, and care guidelines.</p>
          </div>

          <div className="faqs-accordion">
            {FAQS.map((faq, idx) => (
              <div
                className={`faq-item ${openFaq === idx ? 'open' : ''}`}
                key={idx}
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              >
                <div className="faq-question">
                  <h4>{faq.question}</h4>
                  <span className="faq-toggle-icon">{openFaq === idx ? '−' : '+'}</span>
                </div>
                {openFaq === idx && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact home-contact">
        <div className="wrap">
          <div className="concierge-luxury-frame">
            <div className="concierge-grid">
              <div className="concierge-intro">
                <span className="eyebrow on-dark">Personal Concierge</span>

                <h2 className="concierge-heading">
                  Enquire directly with our Nathia Gali store
                </h2>

                <p className="concierge-desc">
                  Have questions about weave weights, shades, or custom gifting? 
                  Message us directly on WhatsApp for real-time video previews, 
                  high-resolution fabric texture photos, and tracked nationwide delivery.
                </p>

                <div className="concierge-cta-group">
                  <a
                    className="btn btn-primary btn-large concierge-wa-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={WHATSAPP_LINK}
                  >
                    Chat with Curator on WhatsApp →
                  </a>

                  <a className="btn btn-ghost on-dark btn-large concierge-call-btn" href="tel:+923002121224">
                    <PhoneIcon />
                    <span>Call: +92 300 2121224</span>
                  </a>
                </div>
              </div>

              <div className="concierge-cards-column">
                <div className="concierge-card">
                  <div className="c-card-icon-wrap">
                    <LocationIcon />
                  </div>
                  <div className="c-card-info">
                    <span className="c-card-label">Shop Location</span>
                    <h4 className="c-card-title">Nathia Gali, Khyber Pakhtunkhwa</h4>
                    <p className="c-card-sub">Main Bazaar boutique • Open for in-person consultations</p>
                  </div>
                </div>

                <a
                  href="https://instagram.com/kamranshawls"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="concierge-card concierge-card-link"
                >
                  <div className="c-card-icon-wrap">
                    <InstagramIcon />
                  </div>
                  <div className="c-card-info">
                    <span className="c-card-label">Instagram Portfolio</span>
                    <h4 className="c-card-title">@kamranshawls</h4>
                    <p className="c-card-sub">New weave drops, video showcases & customer stories →</p>
                  </div>
                </a>

                <a
                  href="https://tiktok.com/@kamranshawls"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="concierge-card concierge-card-link c-card-highlight"
                >
                  <div className="c-card-icon-wrap">
                    <TikTokIcon />
                  </div>
                  <div className="c-card-info">
                    <span className="c-card-label">TikTok Official</span>
                    <h4 className="c-card-title">@kamranshawls</h4>
                    <p className="c-card-sub">
                      Artisan loom weaving videos, drape demonstrations & live broadcasts →
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
