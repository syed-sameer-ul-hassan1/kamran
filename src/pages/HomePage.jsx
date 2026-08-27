import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { useStorefrontData } from '../context/StorefrontDataContext';
import { PhoneIcon, LocationIcon, InstagramIcon, TikTokIcon, StarIcon } from '../components/Icons';

export default function HomePage() {
  const { products, materials, testimonials, faqs, settings, siteContent, whatsappLink } = useStorefrontData();
  const [filter, setFilter] = useState('all');
  const [openFaq, setOpenFaq] = useState(0);

  const pillars = siteContent?.homePillars || {};
  const collectionSec = siteContent?.homeCollection || {};
  const matSec = siteContent?.homeMaterials || {};
  const craftSec = siteContent?.homeCraftBanner || {};
  const testSec = siteContent?.homeTestimonials || {};
  const faqSec = siteContent?.homeFaqs || {};
  const conciergeSec = siteContent?.homeConcierge || {};

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
            <span className="pillar-num">{pillars.pillar1Num || '01'}</span>
            <div className="pillar-text">
              <h4>{pillars.pillar1Title || '100% Verified Natural Fibres'}</h4>
              <p>{pillars.pillar1Desc || 'Hand-combed Himalayan cashmere, pure Shatoosh, and Swat Valley wool with zero synthetic polyester adulteration.'}</p>
            </div>
          </div>
          <div className="pillar-item">
            <span className="pillar-num">{pillars.pillar2Num || '02'}</span>
            <div className="pillar-text">
              <h4>{pillars.pillar2Title || '4-Point In-Store Quality Check'}</h4>
              <p>{pillars.pillar2Desc || 'Every fringe, warp tension, and border pattern is personally verified in Nathia Gali before leaving our boutique.'}</p>
            </div>
          </div>
          <div className="pillar-item">
            <span className="pillar-num">{pillars.pillar3Num || '03'}</span>
            <div className="pillar-text">
              <h4>{pillars.pillar3Title || 'Direct Artisan Concierge'}</h4>
              <p>{pillars.pillar3Desc || 'Direct WhatsApp consultation for real-time video previews, drape advice, and Nathia Gali boutique coordinates.'}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="collection home-collection">
        <div className="wrap">
          <div className="section-head collection-head">
            <div>
              <span className="eyebrow">{collectionSec.eyebrow || 'The Collection'}</span>
              <h2>{collectionSec.title || 'Signature weaves, crafted to endure for generations'}</h2>
              <p>{collectionSec.desc || 'Explore our curated seasonal selection of authentic mountain shawls, wraps, and ceremonial chadars.'}</p>
            </div>
            
            <div className="filter-pills">
              <button
                type="button"
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                {collectionSec.filterAll || 'All Featured'} ({products.length})
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === 'pashmina' ? 'active' : ''}`}
                onClick={() => setFilter('pashmina')}
              >
                {collectionSec.filterPashmina || 'Pashmina & Shatoosh'}
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === 'wool' ? 'active' : ''}`}
                onClick={() => setFilter('wool')}
              >
                {collectionSec.filterWool || 'Swati & Merino Wool'}
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === 'silk' ? 'active' : ''}`}
                onClick={() => setFilter('silk')}
              >
                {collectionSec.filterSilk || 'Silk & Cotton'}
              </button>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-curation-card">
              <h3>
                {collectionSec.emptyTitle || 'Seasonal Weaves Being Curated'}
              </h3>
              <p>
                {collectionSec.emptyDesc || 'Our master artisans are currently finishing new heirloom weaves in Nathia Gali. Contact our curator directly on WhatsApp for real-time boutique stock.'}
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-large"
              >
                {collectionSec.emptyCta || 'Enquire Available Stock on WhatsApp →'}
              </a>
            </div>
          ) : (
            <>
              <div className="mobile-scroll-hint">
                <span>Swipe to explore weaves →</span>
              </div>

              <div className="grid home-collection-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}

          <div className="collection-cta-wrap">
            <Link to="/collection" className="btn btn-primary btn-large">
              {collectionSec.browseAllCta || 'Browse Complete Catalogue & Custom Pieces →'}
            </Link>
          </div>
        </div>
      </section>

      <section className="materials-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">{matSec.eyebrow || 'Fiber Knowledge'}</span>
              <h2>{matSec.title || 'Understanding mountain wools & weaves'}</h2>
            </div>
            <p>{matSec.desc || 'Every natural fleece offers unique warmth, tactile softness, and draping weight.'}</p>
          </div>

          <div className="mobile-scroll-hint">
            <span>Swipe to compare fibers →</span>
          </div>

          <div className="materials-grid">
            {materials.map((mat) => (
              <div className="material-card" key={mat.id || mat.name}>
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
              <span className="eyebrow on-dark">{craftSec.eyebrow || 'Artisan Heritage'}</span>
              <h2>{craftSec.title || 'A boutique built on knowing true handloom purity'}</h2>
              <p className="craft-lead">
                {craftSec.lead || 'Kamran Shawls was established in the hills of Nathia Gali with an uncompromising standard: travel directly to the master weavers across Kashmir, Swat, and Northern Valleys to select each piece rather than trading in mass machine-made replicas.'}
              </p>

              <div className="craft-timeline-mini">
                <div className="mini-step">
                  <span className="step-badge">1</span>
                  <div>
                    <strong>{craftSec.step1Title || 'Direct Mountain Sourcing'}</strong>
                    <p>{craftSec.step1Desc || 'Visiting remote weavers & family handlooms directly'}</p>
                  </div>
                </div>
                <div className="mini-step">
                  <span className="step-badge">2</span>
                  <div>
                    <strong>{craftSec.step2Title || 'Fiber Grade Selection'}</strong>
                    <p>{craftSec.step2Desc || 'Screening micron count & natural warp elasticity'}</p>
                  </div>
                </div>
                <div className="mini-step">
                  <span className="step-badge">3</span>
                  <div>
                    <strong>{craftSec.step3Title || 'In-Store Thread Audit'}</strong>
                    <p>{craftSec.step3Desc || 'Testing weft density & hand-twisted border fringes'}</p>
                  </div>
                </div>
                <div className="mini-step">
                  <span className="step-badge">4</span>
                  <div>
                    <strong>{craftSec.step4Title || 'Cedar Packaging'}</strong>
                    <p>{craftSec.step4Desc || 'Hand-pressed in protective covers for tracked transit'}</p>
                  </div>
                </div>
              </div>

              <div className="craft-btn-row">
                <Link to="/craft" className="btn btn-gold btn-large">
                  {craftSec.ctaText || 'Explore Full Craftsmanship Journey →'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="testimonials-section">
          <div className="wrap">
            <div className="section-head text-center" style={{ margin: '0 auto 36px', textAlign: 'center', maxWidth: '650px' }}>
              <span className="eyebrow">{testSec.eyebrow || 'Patron Testimonials'}</span>
              <h2>{testSec.title || 'Worn by discerning patrons across Pakistan'}</h2>
              <p>{testSec.desc || 'Read what our clients from Islamabad, Lahore, Karachi, and abroad say about our weaves.'}</p>
            </div>

            <div className="mobile-scroll-hint">
              <span>Swipe to read reviews →</span>
            </div>

            <div className="testimonials-grid">
              {testimonials.map((t, idx) => (
                <div className="testimonial-card" key={t.id || idx}>
                  <div className="t-rating" style={{ display: 'flex', gap: '3px', color: 'var(--gold)' }}>
                    {[...Array(Number(t.rating) || 5)].map((_, i) => (
                      <StarIcon key={i} size={14} filled={true} />
                    ))}
                  </div>
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
      )}

      {faqs.length > 0 && (
        <section className="faqs-section">
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: '32px' }}>
              <div>
                <span className="eyebrow">{faqSec.eyebrow || 'Client Support'}</span>
                <h2>{faqSec.title || 'Frequently asked questions'}</h2>
              </div>
              <p>{faqSec.desc || 'Everything you need to know about our ordering process, purity testing, and care guidelines.'}</p>
            </div>

            <div className="faqs-accordion">
              {faqs.map((faq, idx) => (
                <div
                  className={`faq-item ${openFaq === idx ? 'open' : ''}`}
                  key={faq.id || idx}
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
      )}

      <section className="contact home-contact">
        <div className="wrap">
          <div className="concierge-luxury-frame">
            <div className="concierge-grid">
              <div className="concierge-intro">
                <span className="eyebrow on-dark">{conciergeSec.eyebrow || 'Personal Concierge'}</span>

                <h2 className="concierge-heading">
                  {conciergeSec.title || 'Enquire directly with our Nathia Gali store'}
                </h2>

                <p className="concierge-desc">
                  {conciergeSec.desc || 'Have questions about weave weights, shades, or custom gifting? Message us directly on WhatsApp for real-time video previews, high-resolution fabric texture photos, and boutique reservations in Nathia Gali.'}
                </p>

                <div className="concierge-cta-group">
                  <a
                    className="btn btn-primary btn-large concierge-wa-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={whatsappLink}
                  >
                    {conciergeSec.whatsappCta || 'Chat with Curator on WhatsApp →'}
                  </a>

                  <a className="btn btn-ghost on-dark btn-large concierge-call-btn" href={`tel:${(settings.phonePrimary || '+923002121224').replace(/\s/g, '')}`}>
                    <PhoneIcon />
                    <span>{conciergeSec.callCta || `Call: ${settings.phonePrimary || '+92 300 2121224'}`}</span>
                  </a>
                </div>
              </div>

              <div className="concierge-cards-column">
                <div className="concierge-card">
                  <div className="c-card-icon-wrap">
                    <LocationIcon />
                  </div>
                  <div className="c-card-info">
                    <span className="c-card-label">{conciergeSec.shopLabel || 'Shop Location'}</span>
                    <h4 className="c-card-title">{conciergeSec.shopTitle || 'Nathia Gali, Khyber Pakhtunkhwa'}</h4>
                    <p className="c-card-sub">{conciergeSec.shopSub || (settings.address ? `${settings.address} • Open for in-person consultations` : 'Main Bazaar boutique • Open for in-person consultations')}</p>
                  </div>
                </div>

                <a
                  href={settings.instagramUrl || "https://instagram.com/kamranshawls"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="concierge-card concierge-card-link"
                >
                  <div className="c-card-icon-wrap">
                    <InstagramIcon />
                  </div>
                  <div className="c-card-info">
                    <span className="c-card-label">{conciergeSec.instaLabel || 'Instagram Portfolio'}</span>
                    <h4 className="c-card-title">{conciergeSec.instaTitle || '@kamranshawls'}</h4>
                    <p className="c-card-sub">{conciergeSec.instaSub || 'New weave drops, video showcases & customer stories →'}</p>
                  </div>
                </a>

                <a
                  href={settings.tiktokUrl || "https://tiktok.com/@kamranshawls"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="concierge-card concierge-card-link c-card-highlight"
                >
                  <div className="c-card-icon-wrap">
                    <TikTokIcon />
                  </div>
                  <div className="c-card-info">
                    <span className="c-card-label">{conciergeSec.tiktokLabel || 'TikTok Official'}</span>
                    <h4 className="c-card-title">{conciergeSec.tiktokTitle || '@kamranshawls'}</h4>
                    <p className="c-card-sub">
                      {conciergeSec.tiktokSub || 'Artisan loom weaving videos, drape demonstrations & live broadcasts →'}
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
