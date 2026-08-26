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
              href={WHATSAPP_LINK}
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

              <div className="weave-picker-section">
                <label className="picker-label">Select Shawl / Weave Canvas:</label>
                <div className="weave-picker-grid">
                  {PRODUCTS.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      className={`weave-chip ${selectedProduct.id === p.id ? 'active' : ''}`}
                      onClick={() => handleShawlSelect(p)}
                    >
                      <div className="chip-visual-mini">
                        <CardVisual type={p.visual} />
                      </div>
                      <div className="chip-meta">
                        <strong>{p.name}</strong>
                        <span className="chip-price">{p.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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
                  <label htmlFor="client-city">Your City / Delivery Location *</label>
                  <input
                    id="client-city"
                    type="text"
                    required
                    placeholder="e.g. Islamabad, Lahore, Karachi, Peshawar, Overseas"
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

                <button type="submit" className="btn btn-primary btn-large btn-full atelier-submit-btn">
                  Submit & Chat on WhatsApp →
                </button>
              </form>
            </div>

            <div className="atelier-passport-panel">
              <div className="passport-inner">
                <div className="passport-header">
                  <span className="eyebrow on-dark">Boutique Coordinates</span>
                  <h3>Kamran Shawls Nathia Gali</h3>
                  <p className="passport-desc">
                    Historic flagship salon in the pine hills of Khyber Pakhtunkhwa. 
                    Serving patrons and collectors for over three decades.
                  </p>
                </div>

                <div className="passport-items">
                  <div className="pass-item">
                    <div className="pass-icon"><LocationIcon /></div>
                    <div className="pass-text">
                      <span className="pass-lbl">Store Location</span>
                      <span className="pass-val">Main Bazaar, Nathia Gali, District Abbottabad, KPK, Pakistan</span>
                    </div>
                  </div>

                  <div className="pass-item">
                    <div className="pass-icon"><PhoneIcon /></div>
                    <div className="pass-text">
                      <span className="pass-lbl">Direct Curators Helpline</span>
                      <div className="pass-phone-row">
                        <a href="tel:+923002121224">+92 300 2121224</a>
                        <span className="pass-sep">•</span>
                        <a href="tel:+923499134377">+92 349 9134377</a>
                      </div>
                    </div>
                  </div>

                  <div className="pass-item">
                    <div className="pass-icon"><MailIcon /></div>
                    <div className="pass-text">
                      <span className="pass-lbl">Email Inquiries</span>
                      <a href="mailto:hello@kamranshawls.com.pk">hello@kamranshawls.com.pk</a>
                    </div>
                  </div>
                </div>

                <div className="passport-socials">
                  <span className="pass-lbl">Official Live Broadcasts</span>
                  <div className="pass-social-btns">
                    <a
                      href="https://tiktok.com/@kamranshawls"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pass-social-btn"
                    >
                      <TikTokIcon />
                      <span>TikTok @kamranshawls</span>
                    </a>

                    <a
                      href="https://instagram.com/kamranshawls"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pass-social-btn"
                    >
                      <InstagramIcon />
                      <span>Instagram @kamranshawls</span>
                    </a>
                  </div>
                </div>

                <div className="passport-timings">
                  <div className="pt-title">Seasonal Boutique Timings</div>
                  <div className="pt-row">
                    <span>Summer (May – Oct):</span>
                    <strong>10:00 AM – 10:00 PM Daily</strong>
                  </div>
                  <div className="pt-row">
                    <span>Winter (Nov – Apr):</span>
                    <strong>11:00 AM – 8:00 PM Daily</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="atelier-ordering-disclaimer">
            <p className="a-disc-text">
              All remote orders are confirmed directly with our curators via WhatsApp. Inspect photos and live videos before tracked nationwide dispatch with Cash-on-Delivery.
            </p>
          </div>
        </div>
      </section>

      <section className="order-flow-section">
        <div className="wrap">
          <div className="section-head text-center" style={{ margin: '0 auto 36px', textAlign: 'center', maxWidth: '640px' }}>
            <span className="eyebrow">Transparent Ordering</span>
            <h2>How remote curation works</h2>
            <p>A personal, transparent process designed to give you complete confidence before purchasing.</p>
          </div>

          <div className="mobile-scroll-hint" style={{ justifyContent: 'center' }}>
            <span>Swipe to view ordering steps →</span>
          </div>

          <div className="flow-steps-grid">
            <div className="flow-step">
              <span className="flow-num">1</span>
              <h4>Choose Your Weave</h4>
              <p>Browse our collection online and select the shawl style or fabric you desire.</p>
            </div>
            <div className="flow-step">
              <span className="flow-num">2</span>
              <h4>Live Video & Photos</h4>
              <p>We send you high-resolution photos and video previews of the exact piece in store.</p>
            </div>
            <div className="flow-step">
              <span className="flow-num">3</span>
              <h4>Express Tracked Dispatch</h4>
              <p>Your shawl is steam pressed, packed in cedar wrap, and handed to express couriers.</p>
            </div>
            <div className="flow-step">
              <span className="flow-num">4</span>
              <h4>Inspection & Payment</h4>
              <p>Receive your package at your doorstep within 1-3 days and pay safely upon delivery.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
