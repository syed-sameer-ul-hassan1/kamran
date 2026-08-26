import { useState } from 'react';
import { LocationIcon, PhoneIcon, MailIcon, InstagramIcon, TikTokIcon, ShieldCheckIcon, SparklesIcon } from '../components/Icons';
import { useStorefrontData } from '../context/StorefrontDataContext';
import { CardVisual } from '../components/ProductCard';

export default function ContactPage() {
  const { products, settings, whatsappLink, submitInquiry } = useStorefrontData();
  const [activeTab, setActiveTab] = useState('video-preview');
  const [selectedProduct, setSelectedProduct] = useState(products[0] || {});
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleShawlSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    const modeText =
      activeTab === 'video-preview'
        ? 'Live Video Preview & Fabric Photos'
        : activeTab === 'bridal-bespoke'
        ? 'Bespoke Bridal / Heirloom Gifting Inquiry'
        : 'Boutique Visit & Curator Consultation';

    const message = `*Kamran Shawls Boutique Inquiry*\n\n• *Service Requested:* ${modeText}\n• *Selected Piece:* ${selectedProduct?.name || 'General Inquiry'} (${selectedProduct?.price || ''})\n• *Client Name:* ${formData.name}\n• *Phone:* ${formData.phone}\n• *City / Location:* ${formData.city}\n• *Notes:* ${formData.notes || 'Please share available shades, close-up texture photos, and drape videos.'}`;

    submitInquiry({
      name: formData.name,
      phone: formData.phone,
      city: formData.city,
      shawl_name: selectedProduct?.name || 'General Inquiry',
      message: `${modeText} — ${formData.notes || ''}`
    });

    setSubmitted(true);
    window.open(`https://wa.me/923002121224?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const scrollToSuite = () => {
    const el = document.getElementById('consultation-suite');
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
            Private Boutique & <em>Personal Concierge</em>
          </h1>

          <p className="page-hero-lede">
            Step into our personal consultation salon. Whether requesting real-time video texture audits, 
            custom bridal heirlooms, or planning a visit to our historic Nathia Gali store, 
            our master curators connect with you directly.
          </p>

          <div className="page-hero-cta">
            <button type="button" onClick={scrollToSuite} className="btn btn-gold btn-large">
              Start Curator Consultation ↓
            </button>
            <a
              className="btn btn-primary btn-large"
              target="_blank"
              rel="noopener noreferrer"
              href={whatsappLink}
            >
              Direct WhatsApp Chat →
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToSuite}
          className="hero-scroll-indicator"
          aria-label="Scroll to consultation suite"
        >
          <span>Scroll to explore</span>
          <span className="scroll-arrow">↓</span>
        </button>
      </section>

      <section id="consultation-suite" className="atelier-suite-section">
        <div className="wrap">
          <div className="section-head text-center atelier-head">
            <span className="eyebrow">Direct Atelier Access</span>
            <h2>Personalized Curator Consultation</h2>
            <p>Select your consultation objective and design your direct WhatsApp inquiry below.</p>
          </div>

          <div className="atelier-tabs-nav">
            <button
              type="button"
              className={`atelier-tab-btn ${activeTab === 'video-preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('video-preview')}
            >
              <SparklesIcon />
              <span>01. Live Video & Photos</span>
            </button>

            <button
              type="button"
              className={`atelier-tab-btn ${activeTab === 'bridal-bespoke' ? 'active' : ''}`}
              onClick={() => setActiveTab('bridal-bespoke')}
            >
              <ShieldCheckIcon />
              <span>02. Bespoke Bridal & Gifting</span>
            </button>

            <button
              type="button"
              className={`atelier-tab-btn ${activeTab === 'boutique-visit' ? 'active' : ''}`}
              onClick={() => setActiveTab('boutique-visit')}
            >
              <LocationIcon />
              <span>03. Nathia Gali Store Visit</span>
            </button>
          </div>

          <div className="atelier-grid">
            <div className="atelier-form-panel">
              <div className="atelier-panel-header">
                <h3>
                  {activeTab === 'video-preview' && 'Request Live Video & Fabric Audit'}
                  {activeTab === 'bridal-bespoke' && 'Design Bespoke Wedding & Heirloom Order'}
                  {activeTab === 'boutique-visit' && 'Book an In-Store Curator Consultation'}
                </h3>
                <p>
                  {activeTab === 'video-preview' && 'Choose a weave below. We will record a 4K video preview and close-up texture photos directly from our boutique shelves.'}
                  {activeTab === 'bridal-bespoke' && 'Discuss matching family sets, custom vegetable dyeing, monogramming, and handcrafted velvet-lined gift chests.'}
                  {activeTab === 'boutique-visit' && 'Visiting Nathia Gali? Let our curators prepare your preferred weaves and private reserve pieces prior to arrival.'}
                </p>
              </div>

              {products && products.length > 0 && (
                <div className="weave-picker-section">
                  <label className="picker-label">Select Shawl / Weave Canvas:</label>
                  <div className="weave-picker-grid">
                    {products.slice(0, 4).map((p) => (
                      <div
                        key={p.id}
                        className={`weave-chip ${selectedProduct?.id === p.id ? 'active' : ''}`}
                        onClick={() => handleShawlSelect(p)}
                      >
                        <div className="chip-visual-mini">
                          {p.imageUrl ? (
                            <img
                              src={p.imageUrl}
                              alt={p.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <CardVisual type={p.visual || 'pashmina'} />
                          )}
                        </div>
                        <div className="chip-meta">
                          <strong>{p.name}</strong>
                          <span className="chip-price">{p.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedProduct && selectedProduct.name && (
                <div className="selected-weave-bar">
                  <div className="swb-details">
                    <span className="swb-tag">{selectedProduct.tag}</span>
                    <span className="swb-title">{selectedProduct.name}</span>
                    <span className="swb-specs">
                      {selectedProduct.dimensions} • {selectedProduct.weight} • {selectedProduct.origin}
                    </span>
                  </div>
                  <div className="swb-price-badge">{selectedProduct.price}</div>
                </div>
              )}

              <form onSubmit={handleInquirySubmit} className="atelier-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="client-name">Your Full Name *</label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      placeholder="e.g. Sardar Hamza Khan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="client-phone">Phone / WhatsApp Number *</label>
                    <input
                      id="client-phone"
                      type="tel"
                      required
                      placeholder="e.g. +92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="client-city">Your Location / City *</label>
                  <input
                    id="client-city"
                    type="text"
                    required
                    placeholder="e.g. Nathia Gali, Abbottabad, Murree, Islamabad"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="client-notes">Specific Shade / Drape Requirements (Optional)</label>
                  <textarea
                    id="client-notes"
                    rows={2}
                    placeholder="e.g. Prefer natural ivory shade for an outdoor winter ceremony..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary btn-full atelier-submit-btn"
                >
                  {submitting ? 'Sending Request...' : 'Send WhatsApp Inquiry →'}
                </button>
              </form>
            </div>

            {/* Right Column: Atelier Passport */}
            <div className="atelier-passport-panel">
              <div className="passport-header">
                <span className="pass-eyebrow">Boutique Coordinates</span>
                <h3>Visit Us in Nathia Gali</h3>
                <p>Experience the warmth and tactile feel of genuine Himalayan weaves in person.</p>
              </div>

              <div className="passport-details-list">
                <div className="pass-item">
                  <div className="pass-icon">📍</div>
                  <div className="pass-content">
                    <strong>Boutique Address</strong>
                    <span>{settings.address || 'Main Bazaar, Nathia Gali, District Abbottabad, KPK, Pakistan'}</span>
                  </div>
                </div>

                <div className="pass-item">
                  <div className="pass-icon">📞</div>
                  <div className="pass-content">
                    <strong>Direct Store Lines</strong>
                    <div className="pass-phone-row">
                      <a href={`tel:${(settings.phonePrimary || '+923002121224').replace(/\s/g, '')}`}>{settings.phonePrimary || '+92 300 2121224'}</a>
                      <span className="pass-sep">•</span>
                      <a href={`tel:${(settings.phoneSecondary || '+923499134377').replace(/\s/g, '')}`}>{settings.phoneSecondary || '+92 349 9134377'}</a>
                    </div>
                  </div>
                </div>

                <div className="pass-item">
                  <div className="pass-icon">🕒</div>
                  <div className="pass-content">
                    <strong>Visiting Hours</strong>
                    <span>Summer: {settings.timingsSummer || '9:00 AM – 10:00 PM (Daily)'}</span>
                    <span>Winter: {settings.timingsWinter || '10:00 AM – 8:00 PM (Daily)'}</span>
                  </div>
                </div>
              </div>

              <div className="passport-action">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-full"
                >
                  Message Boutique on WhatsApp →
                </a>
              </div>
            </div>
          </div>

          <div className="atelier-ordering-disclaimer">
            <p className="a-disc-text">
              All inquiries and reservations are confirmed directly with our curators via WhatsApp. Visit our Main Bazaar boutique in Nathia Gali to inspect handspun weaves in person.
            </p>
          </div>
        </div>
      </section>

      <section className="order-flow-section">
        <div className="wrap">
          <div className="section-head text-center" style={{ margin: '0 auto 36px', textAlign: 'center', maxWidth: '640px' }}>
            <span className="eyebrow">Personal Curation</span>
            <h2>How boutique consultation works</h2>
            <p>A personal, transparent process designed to give you complete confidence in our handspun pieces.</p>
          </div>

          <div className="mobile-scroll-hint" style={{ justifyContent: 'center' }}>
            <span>Swipe to view curation steps →</span>
          </div>

          <div className="flow-steps-grid">
            <div className="flow-step">
              <span className="flow-num">1</span>
              <h4>Explore Collection</h4>
              <p>Browse our seasonal catalogue online to explore available weave patterns and fabrics.</p>
            </div>
            <div className="flow-step">
              <span className="flow-num">2</span>
              <h4>Live WhatsApp Consultation</h4>
              <p>Connect with our curator for high-resolution closeups, drape guidance, and shade matching.</p>
            </div>
            <div className="flow-step">
              <span className="flow-num">3</span>
              <h4>Piece Preparation</h4>
              <p>Your chosen piece is steam pressed and preserved in artisanal cedar packaging.</p>
            </div>
            <div className="flow-step">
              <span className="flow-num">4</span>
              <h4>In-Store Boutique Pickup</h4>
              <p>Visit our boutique in Main Bazaar, Nathia Gali to inspect the weave and complete your purchase.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
