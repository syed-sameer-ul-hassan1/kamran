import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStorefrontData } from '../context/StorefrontDataContext';
import { CardVisual } from '../components/ProductCard';
import { 
  StarIcon, 
  ShieldCheckIcon, 
  SparklesIcon, 
  CheckIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon 
} from '../components/Icons';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products = [], settings = {}, siteContent = {}, testimonials = [], whatsappLink } = useStorefrontData();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const pdContent = siteContent?.productDetailPage || {};
  const orderBtnText = pdContent.orderBtnText || 'Order via WhatsApp';
  const callBtnText = pdContent.callBtnText || 'Call Nathia Gali Boutique';

  const decodedId = id ? decodeURIComponent(String(id)).trim() : '';
  const product = (products || []).find((p) => 
    String(p.id).trim() === String(id).trim() || 
    String(p.id).trim() === decodedId ||
    (p.name && p.name.toLowerCase().trim() === decodedId.toLowerCase())
  );

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
          <Link to="/collection" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeftIcon size={16} />
            <span>Browse Full Collection</span>
          </Link>
        </div>
      </div>
    );
  }

  const imageList = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : (product.imageUrl ? [product.imageUrl] : []);

  const activeImage = imageList[selectedImageIndex] || imageList[0] || '';

  const orderMessage = `Hi, I would like to order / enquire about the "${product.name}" (${product.price || ''}). Is this piece currently available in stock?`;
  const whatsappUrl = `https://wa.me/${(settings.phonePrimary || '923002121224').replace(/\D/g, '')}?text=${encodeURIComponent(orderMessage)}`;
  const phoneCallUrl = `tel:${(settings.phonePrimary || '+923002121224').replace(/\s/g, '')}`;

  const relatedProducts = (products || [])
    .filter((p) => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 3);

  const productReviews = (testimonials || []).filter((t) => {
    if (!t) return false;
    if (t.productId && String(t.productId) === String(product.id)) return true;
    if (!t.productId && t.shawl && product.name && t.shawl.toLowerCase().trim() === product.name.toLowerCase().trim()) {
      return true;
    }
    return false;
  });

  const avgRating = productReviews.length > 0
    ? (productReviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / productReviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="product-detail-page">
      <button
        type="button"
        className="product-square-back-btn"
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
        <ArrowLeftIcon size={20} />
      </button>

      <div className="wrap product-main-container">
        <div className="product-view-grid">
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
              {imageList.length > 1 && (
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(31,25,24,0.85)', color: '#fff', fontSize: '0.74rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 600, backdropFilter: 'blur(4px)', letterSpacing: '0.04em', zIndex: 2 }}>
                  {selectedImageIndex + 1} / {imageList.length}
                </div>
              )}
              {product.inStock === false && (
                <div className="product-badge-stock-out">Out of Stock</div>
              )}
            </div>

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
                <span>{orderBtnText}</span>
              </a>

              <a
                href={phoneCallUrl}
                className="btn btn-secondary btn-product-call"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>{callBtnText}</span>
              </a>
            </div>

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

            <div className="product-guarantees-grid">
              <div className="guarantee-item">
                <div>
                  <strong>Authenticity Verified</strong>
                  <span>Handcrafted by master spinners & weavers</span>
                </div>
              </div>

              <div className="guarantee-item">
                <div>
                  <strong>Boutique Store Coordinates</strong>
                  <span>Main Bazaar, Nathia Gali, KPK</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="pdp-reviews-wrap">
          <div className="pdp-reviews-topbar">
            <div className="pdp-reviews-title-group">
              <span className="eyebrow">Client Feedback</span>
              <h2>Patron Reviews & Experiences</h2>
              <div className="pdp-rating-overview">
                <span className="pdp-rating-num">{avgRating}</span>
                <div>
                  <div className="pdp-stars-row">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} size={15} filled={true} />
                    ))}
                  </div>
                  <div className="pdp-rating-meta">
                    Based on {productReviews.length} {productReviews.length === 1 ? 'verified review' : 'verified reviews'}
                  </div>
                </div>
              </div>
            </div>

            <Link
              to={`/review/${product.id}`}
              className="btn btn-secondary btn-sm"
            >
              Write a Review
            </Link>
          </div>

          {productReviews.length === 0 ? (
            <div className="pdp-review-empty">
              <h3>No reviews yet for this piece</h3>
              <p>
                Have you draped or purchased this handcrafted shawl? Share your thoughts on its warmth, weight, and artisan embroidery.
              </p>
              <Link to={`/review/${product.id}`} className="btn btn-primary btn-sm">
                <span>Write the First Review</span>
              </Link>
            </div>
          ) : (
            <div className="pdp-reviews-grid">
              {productReviews.map((rev) => (
                <div key={rev.id} className="pdp-review-card">
                  <div>
                    <div className="pdp-review-head">
                      <div className="pdp-stars-row" style={{ fontSize: '0.92rem' }}>
                        {[...Array(Number(rev.rating) || 5)].map((_, i) => (
                          <StarIcon key={i} size={13} filled={true} />
                        ))}
                      </div>
                      <span className="pdp-verified-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckIcon size={11} />
                        <span>Verified Patron</span>
                      </span>
                    </div>

                    <p className="pdp-review-body">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pdp-review-foot">
                    <span className="pdp-patron-name">{rev.name}</span>
                    <span className="pdp-patron-loc">{rev.city || 'Verified Patron'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

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
