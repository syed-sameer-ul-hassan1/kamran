import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStorefrontData } from '../context/StorefrontDataContext';
import { CardVisual } from '../components/ProductCard';
import { 
  ShieldCheckIcon, 
  SparklesIcon, 
  CheckIcon, 
  StarIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon, 
  AlertTriangleIcon 
} from '../components/Icons';

export default function SubmitReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, submitReview } = useStorefrontData();

  const product = useMemo(() => {
    if (!products || products.length === 0) return null;
    return products.find((p) => String(p.id) === String(id)) || null;
  }, [products, id]);

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ratingDescriptions = {
    1: 'Disappointed — Below heirloom standards',
    2: 'Fair — Acceptable finish',
    3: 'Good — Standard Himalayan warmth & drape',
    4: 'Very Pleased — Soft texture, rich craft finish',
    5: 'Exceptional — Exquisite artisan masterwork'
  };

  const productImages = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    return product.imageUrl ? [product.imageUrl] : [];
  }, [product]);

  const heroImage = productImages[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      setErrorMessage('Please provide your name and review feedback.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      city: city.trim() || 'Verified Patron',
      shawl: product ? product.name : 'Handcrafted Himalayan Piece',
      comment: comment.trim(),
      rating: rating,
      productId: product ? String(product.id) : (id || null)
    };

    const res = await submitReview(payload);
    setIsSubmitting(false);

    if (res.success) {
      setIsSuccess(true);
    } else {
      setErrorMessage(res.error || 'Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="submit-review-page" style={{ minHeight: '100vh', background: 'var(--cream-pure)', paddingBottom: '80px' }}>
      <button
        type="button"
        className="product-square-back-btn"
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1);
          } else if (product) {
            navigate(`/product/${product.id}`);
          } else {
            navigate('/collection');
          }
        }}
        aria-label="Back"
        title="Back"
      >
        <ArrowLeftIcon size={20} />
      </button>

      <div className="container" style={{ maxWidth: '680px', margin: '0 auto', paddingTop: '16px' }}>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          {product ? (
            <>
              <Link to={`/product/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                {product.name}
              </Link>
              <span>/</span>
            </>
          ) : (
            <>
              <Link to="/collection" style={{ color: 'inherit', textDecoration: 'none' }}>Collection</Link>
              <span>/</span>
            </>
          )}
          <span style={{ color: 'var(--gold)', fontWeight: 500 }}>Write Review</span>
        </div>

        {isSuccess ? (
          <div 
            className="submit-review-card"
            style={{
              padding: '48px 32px',
              textAlign: 'center',
              animation: 'fadeIn 0.4s ease'
            }}
          >
            <div 
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(184, 147, 74, 0.12)',
                border: '1px solid var(--gold)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold)',
                marginBottom: '18px'
              }}
            >
              <CheckIcon size={24} />
            </div>

            <span className="eyebrow" style={{ display: 'block', marginBottom: '6px' }}>
              Gratitude From Nathia Gali
            </span>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--text-dark)', marginBottom: '12px' }}>
              Your Review Has Been Published
            </h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 28px', fontSize: '0.92rem', lineHeight: '1.6' }}>
              Thank you, <strong>{name}</strong>. Your feedback for <em>{product ? product.name : 'our handcrafted shawl'}</em> helps future patrons appreciate the authentic Himalayan craft.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {product && (
                <Link to={`/product/${product.id}`} className="btn btn-primary btn-sm">
                  View Shawl & Reviews
                </Link>
              )}
              <Link to="/collection" className="btn btn-secondary btn-sm">
                Explore Full Collection
              </Link>
            </div>
          </div>
        ) : (
          <div className="submit-review-card">
            <div className="submit-review-hero">
              <div>
                <span className="eyebrow" style={{ display: 'block', marginBottom: '4px' }}>
                  Patron Story
                </span>
                <h1>
                  Review {product ? product.name : 'Handcrafted Shawl'}
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginTop: '4px', margin: 0 }}>
                  Share your impressions on the softness, drape, and warmth.
                </p>
              </div>

              {product && (
                <div className="submit-review-preview">
                  <div style={{ width: '42px', height: '42px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                    {heroImage ? (
                      <img src={heroImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <CardVisual type={product.visual || 'pashmina'} />
                    )}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--text-dark)', lineHeight: '1.2' }}>
                      {product.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--gold)', marginTop: '2px' }}>
                      {product.price || product.tag || 'Heirloom Piece'}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="submit-review-form">
              {errorMessage && (
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 14px',
                    background: 'rgba(123, 36, 38, 0.08)',
                    border: '1px solid rgba(123, 36, 38, 0.25)',
                    borderRadius: 'var(--radius)',
                    color: 'var(--oxblood)',
                    fontSize: '0.86rem',
                    marginBottom: '20px'
                  }}
                >
                  <AlertTriangleIcon size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="form-group" style={{ marginBottom: '22px' }}>
                <label>Overall Rating *</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        className="star-picker-btn"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{
                          color: active ? 'var(--gold)' : 'rgba(36, 29, 27, 0.2)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '4px'
                        }}
                        aria-label={`Rate ${star} stars out of 5`}
                      >
                        <StarIcon size={24} filled={active} />
                      </button>
                    );
                  })}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--gold)', fontStyle: 'italic' }}>
                  {ratingDescriptions[hoverRating || rating]}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '18px' }}>
                <div>
                  <label>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Begum Tariq or Dr. Farooq"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label>City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Islamabad, Lahore, London"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '22px' }}>
                <label>Your Review & Experience *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the texture, weight, border finish, warmth, packaging, or in-store boutique service..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                />
              </div>

              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  background: 'rgba(184, 147, 74, 0.08)',
                  border: '1px solid rgba(184, 147, 74, 0.2)',
                  borderRadius: 'var(--radius)',
                  marginBottom: '24px'
                }}
              >
                <span style={{ color: 'var(--gold)', display: 'inline-flex' }}>
                  <ShieldCheckIcon />
                </span>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  <strong>Verified Patron Community:</strong> Your review will appear on the boutique site and directly below this piece's atelier catalog page.
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                {product ? (
                  <Link to={`/product/${product.id}`} className="btn btn-secondary btn-sm">
                    Back to Shawl
                  </Link>
                ) : (
                  <Link to="/collection" className="btn btn-secondary btn-sm">
                    Back to Collection
                  </Link>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-sm"
                  style={{ minWidth: '150px', justifyContent: 'center' }}
                >
                  {isSubmitting ? 'Publishing…' : 'Publish Review'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
