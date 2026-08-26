import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStorefrontData } from '../context/StorefrontDataContext';
import { CardVisual } from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, settings, whatsappLink } = useStorefrontData();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = products.find((p) => p.id === id || p.id === decodeURIComponent(id));

  // If products are loaded and product not found, or redirect fallback
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="page-wrap" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 20px 60px' }}>
        <div style={{ maxWidth: '500px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '12px' }}>
            Shawl Not Found
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.94rem' }}>
            The requested piece may have been updated or archived in our Nathia Gali boutique.
          </p>
          <Link to="/collection" className="btn btn-primary">
            ← Browse Full Collection
          </Link>
        </div>
      </div>
    );
  }

  const imageList = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : (product.imageUrl ? [product.imageUrl] : []);

  const activeImage = imageList[selectedImageIndex] || imageList[0] || '';

  const orderMessage = `Hi, I would like to order / enquire about the "${product.name}" (${product.price}). Is this piece currently available in stock?`;
  const whatsappUrl = `https://wa.me/${(settings.phonePrimary || '923002121224').replace(/\D/g, '')}?text=${encodeURIComponent(orderMessage)}`;
  const phoneCallUrl = `tel:${(settings.phonePrimary || '+923002121224').replace(/\s/g, '')}`;

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 3);

  return (
    <div className="product-detail-page">
      {/* Floating Back SVG Button Only (No header, no text) */}
      <button
        type="button"
        className="product-floating-back-btn"
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate('/collection');
          }
        }}
        aria-label="Back"
        title="Back"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>

      <div className="wrap product-main-container">
        <div className="product-view-grid">
          {/* Left Column: Product Gallery */}
          <div className="product-gallery-col">
            <div className="product-main-viewport">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt={`${product.name} - View ${selectedImageIndex + 1}`}
                  className="product-hero-photo"
                />
              ) : (
                <div className="product-hero-fallback">
                  <CardVisual type={product.visual || 'pashmina'} />
                </div>
              )}
              {product.inStock === false && (
                <div className="product-badge-stock-out">Out of Stock</div>
              )}
            </div>

            {/* Thumbnail Strip for up to 5 pictures */}
            {imageList.length > 1 && (
              <div className="product-thumbs-strip">
                {imageList.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`product-thumb-btn ${selectedImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImageIndex(idx)}
                    title={`View photo ${idx + 1}`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Information & Specifications */}
          <div className="product-info-col">
            <div className="product-header-block">
              {product.tag && <div className="product-eyebrow-tag">{product.tag}</div>}
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-price-row">
                <div className="product-price-val">{product.price}</div>
                <div className={`product-stock-tag ${product.inStock !== false ? 'in-stock' : 'out-of-stock'}`}>
                  {product.inStock !== false ? 'In Stock (Ready to Ship)' : 'Made to Order'}
                </div>
              </div>
            </div>

            {product.desc && (
              <p className="product-summary-text">{product.desc}</p>
            )}

            {/* CTAs: WhatsApp Order & Direct Phone Inquiry */}
            <div className="product-actions-block">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-product-order"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>Order via WhatsApp</span>
              </a>

              <a
                href={phoneCallUrl}
                className="btn btn-secondary btn-product-call"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call Nathia Gali Boutique</span>
              </a>
            </div>

            {/* Product Specifications Table (Alibaba / Clean E-commerce style) */}
            <div className="product-specs-section">
              <h3 className="specs-section-title">Product Specifications</h3>
              <table className="product-specs-table">
                <tbody>
                  {product.origin && (
                    <tr>
                      <th>Origin</th>
                      <td>{product.origin}</td>
                    </tr>
                  )}
                  {product.category && (
                    <tr>
                      <th>Category</th>
                      <td style={{ textTransform: 'capitalize' }}>{product.category}</td>
                    </tr>
                  )}
                  {product.dimensions && (
                    <tr>
                      <th>Dimensions</th>
                      <td>{product.dimensions}</td>
                    </tr>
                  )}
                  {product.weight && (
                    <tr>
                      <th>Weight & Feel</th>
                      <td>{product.weight}</td>
                    </tr>
                  )}
                  {product.weave && (
                    <tr>
                      <th>Weave Pattern</th>
                      <td>{product.weave}</td>
                    </tr>
                  )}
                  {product.warmth && (
                    <tr>
                      <th>Warmth Index</th>
                      <td>{product.warmth}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Quality Guarantees */}
            <div className="product-guarantees-grid">
              <div className="guarantee-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                <div>
                  <strong>Authenticity Verified</strong>
                  <span>Handcrafted by master spinners & weavers</span>
                </div>
              </div>

              <div className="guarantee-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <strong>Boutique Store Coordinates</strong>
                  <span>Main Bazaar, Nathia Gali, KPK</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Pieces from Boutique */}
        {relatedProducts.length > 0 && (
          <div className="product-related-section">
            <div className="section-head">
              <span className="eyebrow">Complementary Weaves</span>
              <h2>Other Pieces in the Atelier</h2>
            </div>

            <div className="grid">
              {relatedProducts.map((p) => {
                const pImgs = Array.isArray(p.images) && p.images.length > 0 ? p.images : (p.imageUrl ? [p.imageUrl] : []);
                const cover = pImgs[0];
                return (
                  <article key={p.id} className="card card-rich">
                    <Link to={`/product/${p.id}`} className="card-visual" style={{ display: 'block' }}>
                      {cover ? (
                        <img
                          src={cover}
                          alt={p.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <CardVisual type={p.visual || 'pashmina'} />
                      )}
                      <span className="card-visual-tag">{p.tag}</span>
                    </Link>
                    <div className="card-body">
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
                        <Link to={`/product/${p.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {p.name}
                        </Link>
                      </h3>
                      <div className="card-foot">
                        <span className="price">{p.price}</span>
                        <Link to={`/product/${p.id}`} className="btn btn-secondary btn-sm">
                          View Shawl →
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
