import { Link } from 'react-router-dom';
import { GUIDES } from '../data/guidesData';
import { useStorefrontData } from '../context/StorefrontDataContext';

export default function GuidesPage() {
  const { siteContent, whatsappLink } = useStorefrontData();

  const gContent = siteContent?.guidesPage || {};
  const heroTitle = gContent.heroTitle || 'The Weave Knowledge & Heritage Guides';
  const heroLede = gContent.heroLede || 'Expert educational guides by Kamran Shawls curators in Nathia Gali. Learn how to identify authentic Himalayan Pashmina, understand micron counts, and style traditional Swati chadars.';
  const heroBtn1 = gContent.heroBtn1 || 'Explore Our Collection →';
  const heroBtn2 = gContent.heroBtn2 || 'Ask Curator on WhatsApp →';
  const hubEyebrow = gContent.hubEyebrow || 'Curator Knowledge Hub';
  const hubTitle = gContent.hubTitle || 'Educational Articles & Verification Guides';
  const hubDesc = gContent.hubDesc || 'Essential reading for collectors, patrons, and connoisseurs of genuine mountain handlooms.';

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
            {heroTitle.includes('& Heritage Guides') ? (
              <>
                {heroTitle.split('& Heritage Guides')[0]} <em>& Heritage Guides</em>
              </>
            ) : (
              heroTitle
            )}
          </h1>

          <p className="page-hero-lede">
            {heroLede}
          </p>

          <div className="page-hero-cta">
            <Link to="/collection" className="btn btn-gold btn-large">
              {heroBtn1}
            </Link>
            <a
              className="btn btn-primary btn-large"
              target="_blank"
              rel="noopener noreferrer"
              href={whatsappLink}
            >
              {heroBtn2}
            </a>
          </div>
        </div>
      </section>

      <section className="guides-hub-section" style={{ padding: '80px 0', background: 'var(--cream-pure)' }}>
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: '40px' }}>
            <div>
              <span className="eyebrow">{hubEyebrow}</span>
              <h2>{hubTitle}</h2>
            </div>
            <p>{hubDesc}</p>
          </div>

          <div className="guides-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
            {GUIDES.map((guide) => (
              <article
                key={guide.slug}
                className="guide-card"
                style={{
                  background: 'var(--cream)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius)',
                  padding: '30px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--oxblood)', textTransform: 'uppercase', fontWeight: 600 }}>
                    {guide.readTime}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{guide.datePublished}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', margin: 0, lineHeight: 1.35, color: 'var(--text-dark)' }}>
                  <Link to={`/guides/${guide.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {guide.title}
                  </Link>
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0, flex: 1 }}>
                  {guide.summary}
                </p>

                <div style={{ paddingTop: '16px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--gold)' }}>By {guide.author}</span>
                  <Link to={`/guides/${guide.slug}`} className="btn btn-primary btn-sm" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                    Read Guide →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
