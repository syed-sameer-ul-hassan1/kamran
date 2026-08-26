import { Link } from 'react-router-dom';

export function CardVisual({ type }) {
  switch (type) {
    case 'pashmina':
      return (
        <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="240" fill="#E8DAC2" />
          <g style={{ color: '#B8934A' }}>
            <use href="#boteh" x="20" y="10" width="60" height="90" />
            <use href="#boteh" x="110" y="60" width="60" height="90" />
            <use href="#boteh" x="200" y="10" width="60" height="90" />
          </g>
        </svg>
      );
    case 'swati':
      return (
        <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="240" fill="#7B2426" />
          <g style={{ color: '#D9BC80' }}>
            <use href="#boteh" x="30" y="20" width="60" height="90" />
            <use href="#boteh" x="120" y="70" width="60" height="90" />
            <use href="#boteh" x="210" y="20" width="60" height="90" />
          </g>
        </svg>
      );
    case 'merino':
      return (
        <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="240" fill="#2E2522" />
          <g stroke="#B8934A" strokeWidth="1" opacity="0.5">
            <line x1="0" y1="30" x2="300" y2="30" />
            <line x1="0" y1="70" x2="300" y2="70" />
            <line x1="0" y1="110" x2="300" y2="110" />
            <line x1="0" y1="150" x2="300" y2="150" />
            <line x1="0" y1="190" x2="300" y2="190" />
          </g>
        </svg>
      );
    case 'silk':
      return (
        <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="240" fill="#D9BC80" />
          <g style={{ color: '#7B2426' }} opacity="0.85">
            <use href="#boteh" x="40" y="10" width="55" height="82" />
            <use href="#boteh" x="130" y="55" width="55" height="82" />
            <use href="#boteh" x="220" y="10" width="55" height="82" />
          </g>
        </svg>
      );
    case 'blockprint':
      return (
        <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="240" fill="#3B4A5C" />
          <g fill="none" stroke="#C9622B" strokeWidth="2">
            <rect x="20" y="20" width="60" height="60" />
            <rect x="120" y="20" width="60" height="60" />
            <rect x="220" y="20" width="60" height="60" />
            <rect x="70" y="120" width="60" height="60" />
            <rect x="170" y="120" width="60" height="60" />
          </g>
        </svg>
      );
    case 'shatoosh':
      return (
        <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
          <rect width="300" height="240" fill="#221B1A" />
          <g stroke="#5a4d47" strokeWidth="1" opacity="0.6">
            <line x1="30" y1="0" x2="30" y2="240" />
            <line x1="90" y1="0" x2="90" y2="240" />
            <line x1="150" y1="0" x2="150" y2="240" />
            <line x1="210" y1="0" x2="210" y2="240" />
            <line x1="270" y1="0" x2="270" y2="240" />
          </g>
        </svg>
      );
    default:
      return null;
  }
}

export default function ProductCard({ product }) {
  const enquiryUrl = `https://wa.me/923002121224?text=Hi%2C%20I%27m%20interested%20in%20the%20${product.enquiryText || encodeURIComponent(product.name)}%20(${encodeURIComponent(product.price)}).`;
  const productLink = `/product/${product.id}`;

  const imageList = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : (product.imageUrl ? [product.imageUrl] : []);
  const coverImage = imageList[0];

  return (
    <article className="card card-rich">
      <Link to={productLink} className="card-visual" style={{ display: 'block', textDecoration: 'none' }}>
        {coverImage ? (
          <img
            src={coverImage}
            alt={product.name}
            className="card-photo-img"
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <CardVisual type={product.visual || 'pashmina'} />
        )}
        <span className="card-visual-tag">{product.tag}</span>
        {product.dimensions && (
          <span className="card-visual-dim">{product.dimensions}</span>
        )}
        {imageList.length > 1 && (
          <span style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(31,25,24,0.85)', color: '#fff', fontSize: '0.68rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
            {imageList.length} Photos
          </span>
        )}
      </Link>

      <div className="card-body">
        <div className="card-header-row">
          <h3>
            <Link to={productLink} style={{ color: 'inherit', textDecoration: 'none' }}>
              {product.name}
            </Link>
          </h3>
        </div>

        <p className="card-desc">{product.desc}</p>

        <div className="card-specs-list">
          {product.origin && (
            <div className="spec-badge">
              <span className="spec-lbl">Origin:</span>
              <span className="spec-val">{product.origin}</span>
            </div>
          )}
          {product.weight && (
            <div className="spec-badge">
              <span className="spec-lbl">Weight:</span>
              <span className="spec-val">{product.weight}</span>
            </div>
          )}
          {product.weave && (
            <div className="spec-badge">
              <span className="spec-lbl">Weft:</span>
              <span className="spec-val">{product.weave}</span>
            </div>
          )}
        </div>

        <div className="card-foot">
          <div className="card-price-col">
            <span className="price-label">Starting Price</span>
            <span className="price">{product.price}</span>
          </div>
          <Link
            to={productLink}
            className="btn btn-secondary btn-sm card-enquire-btn"
          >
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
