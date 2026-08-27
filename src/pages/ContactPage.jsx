import { useState } from 'react';
import { LocationIcon, PhoneIcon, MailIcon, InstagramIcon, TikTokIcon, ShieldCheckIcon, SparklesIcon } from '../components/Icons';
import { useStorefrontData } from '../context/StorefrontDataContext';
import { CardVisual } from '../components/ProductCard';

export default function ContactPage() {
  const { products, settings, siteContent, whatsappLink, submitInquiry } = useStorefrontData();
  const [activeTab, setActiveTab] = useState('video-preview');

  const contactContent = siteContent?.contactPage || {};
  const heroTitle = contactContent.heroTitle || 'Private Boutique & Personal Concierge';
  const heroLede = contactContent.heroLede || 'Step into our personal consultation salon. Whether requesting real-time video texture audits, custom bridal heirlooms, or planning a visit to our historic Nathia Gali store, our master curators connect with you directly.';
  const heroBtn1 = contactContent.heroBtn1 || 'Start Curator Consultation ↓';
  const suiteEyebrow = contactContent.suiteEyebrow || 'Direct Atelier Access';
  const suiteTitle = contactContent.suiteTitle || 'Personalized Curator Consultation';
  const tab1Title = contactContent.tab1Title || 'Live Video & Fabric Photos';
  const tab1Subtitle = contactContent.tab1Subtitle || 'Choose a weave below. We will record a 4K video preview and close-up texture photos directly from our boutique shelves.';
  const tab2Title = contactContent.tab2Title || 'Bespoke Bridal & Gifting';
  const tab2Subtitle = contactContent.tab2Subtitle || 'Discuss matching family sets, custom vegetable dyeing, monogramming, and handcrafted velvet-lined gift chests.';
  const tab3Title = contactContent.tab3Title || 'Nathia Gali Store Visit';
  const tab3Subtitle = contactContent.tab3Subtitle || 'Visiting Nathia Gali? Let our curators prepare your preferred weaves and private reserve pieces prior to arrival.';
  const formSubmitBtn = contactContent.formSubmitBtn || 'Send WhatsApp Inquiry →';

  const featuredProducts = (products && products.length > 0 ? products : []).filter((p) => Boolean(p.featured));
  const [selectedProduct, setSelectedProduct] = useState(
    featuredProducts[0] || (products && products[0]) || {}
  );
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleShawlSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const modeText =
      activeTab === 'video-preview'
        ? 'Live Video Preview & Fabric Photos'
        : activeTab === 'bridal-bespoke'
        ? 'Bespoke Bridal / Heirloom Gifting Inquiry'
        : 'Boutique Visit & Curator Consultation';

    const message = `*Kamran Shawls Boutique Inquiry*\n\n• *Service Requested:* ${modeText}\n• *Selected Piece:* ${selectedProduct?.name || 'General Inquiry'} (${selectedProduct?.price || ''})\n• *Client Name:* ${formData.name}\n• *Phone:* ${formData.phone}\n• *City / Location:* ${formData.city}\n• *Notes:* ${formData.notes || 'Please share available shades, close-up texture photos, and drape videos.'}`;

    try {
      if (submitInquiry) {
        await submitInquiry({
          name: formData.name,
          phone: formData.phone,
          city: formData.city,
          shawl_name: selectedProduct?.name || 'General Inquiry',
          message: `${modeText} — ${formData.notes || ''}`
        });
      }
    } catch (err) {
      console.error('Inquiry error:', err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      window.open(`https://wa.me/923002121224?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    }
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
            {heroTitle.includes('Personal Concierge') ? (
              <>
                {heroTitle.split('Personal Concierge')[0]} <em>Personal Concierge</em>
              </>
            ) : (
              heroTitle
            )}
          </h1>

          <p className="page-hero-lede">
            {heroLede}
          </p>

          <div className="page-hero-cta">
            <button type="button" onClick={scrollToSuite} className="btn btn-gold btn-large">
              {heroBtn1}
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
            <span className="eyebrow">{suiteEyebrow}</span>
            <h2>{suiteTitle}</h2>
            <p>Select your consultation objective and design your direct WhatsApp inquiry below.</p>
          </div>

          <div className="atelier-tabs-nav">
            <button
              type="button"
              className={`atelier-tab-btn ${activeTab === 'video-preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('video-preview')}
            >
              <span>01. {tab1Title}</span>
            </button>

            <button
              type="button"
              className={`atelier-tab-btn ${activeTab === 'bridal-bespoke' ? 'active' : ''}`}
              onClick={() => setActiveTab('bridal-bespoke')}
            >
              <span>02. {tab2Title}</span>
            </button>

            <button
              type="button"
              className={`atelier-tab-btn ${activeTab === 'boutique-visit' ? 'active' : ''}`}
              onClick={() => setActiveTab('boutique-visit')}
            >
              <span>03. {tab3Title}</span>
            </button>
          </div>

          <div className="atelier-grid">
            <div className="atelier-form-panel">
              <div className="atelier-panel-header">
                <h3>
                  {activeTab === 'video-preview' && tab1Title}
                  {activeTab === 'bridal-bespoke' && tab2Title}
                  {activeTab === 'boutique-visit' && tab3Title}
                </h3>
                <p>
                  {activeTab === 'video-preview' && tab1Subtitle}
                  {activeTab === 'bridal-bespoke' && tab2Subtitle}
                  {activeTab === 'boutique-visit' && tab3Subtitle}
                </p>
              </div>

              {featuredProducts && featuredProducts.length > 0 && (
                <div className="weave-picker-section">
                  <label className="picker-label">Select Featured Shawl / Canvas:</label>
                  <div className="weave-picker-grid">
                    {featuredProducts.map((p) => (
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
                  {submitting ? 'Sending Request...' : formSubmitBtn}
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
                      <span className="pass-lbl">Boutique Address</span>
                      <span className="pass-val">{settings.address || 'Main Bazaar, Nathia Gali, District Abbottabad, KPK, Pakistan'}</span>
                    </div>
                  </div>

                  <div className="pass-item">
                    <div className="pass-icon"><PhoneIcon /></div>
                    <div className="pass-text">
                      <span className="pass-lbl">Direct Store Lines</span>
                      <div className="pass-phone-row">
                        <a href={`tel:${(settings.phonePrimary || '+923002121224').replace(/\s/g, '')}`}>{settings.phonePrimary || '+92 300 2121224'}</a>
                        <span className="pass-sep">•</span>
                        <a href={`tel:${(settings.phoneSecondary || '+923499134377').replace(/\s/g, '')}`}>{settings.phoneSecondary || '+92 349 9134377'}</a>
                      </div>
                    </div>
                  </div>

                  <div className="pass-item">
                    <div className="pass-icon"><MailIcon /></div>
                    <div className="pass-text">
                      <span className="pass-lbl">Email Inquiries</span>
                      <a href={`mailto:${settings.email || 'hello@kamranshawls.com.pk'}`}>{settings.email || 'hello@kamranshawls.com.pk'}</a>
                    </div>
                  </div>
                </div>

                <div className="passport-socials">
                  <span className="pass-lbl">Official Live Broadcasts</span>
                  <div className="pass-social-btns">
                    <a
                      href={settings.tiktokUrl || "https://tiktok.com/@kamranshawls"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pass-social-btn"
                    >
                      <TikTokIcon />
                      <span>TikTok @kamranshawls</span>
                    </a>

                    <a
                      href={settings.instagramUrl || "https://instagram.com/kamranshawls"}
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
                  <div className="pt-title">Visiting Hours</div>
                  <div className="pt-row">
                    <span>Summer:</span>
                    <strong>{settings.timingsSummer || '9:00 AM – 10:00 PM (Daily)'}</strong>
                  </div>
                  <div className="pt-row">
                    <span>Winter:</span>
                    <strong>{settings.timingsWinter || '10:00 AM – 8:00 PM (Daily)'}</strong>
                  </div>
                </div>

                <div className="passport-action" style={{ marginTop: '24px' }}>
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
