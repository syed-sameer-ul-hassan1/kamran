import { useParams, Link, Navigate } from 'react-router-dom';
import { GUIDES } from '../data/guidesData';
import { useStorefrontData } from '../context/StorefrontDataContext';

export default function GuideDetailPage() {
  const { slug } = useParams();
  const { settings } = useStorefrontData();
  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return <Navigate to="/guides" replace />;
  }

  const phoneNum = (settings.phonePrimary || '923002121224').replace(/[^0-9]/g, '');
  const whatsappInquiryUrl = `https://wa.me/${phoneNum}?text=Hello%20Kamran%20Shawls%2C%20I%20read%20your%20guide%20on%20%22${encodeURIComponent(guide.shortTitle)}%22%20and%20would%20like%20to%20consult%20a%20curator.`;

  return (
    <>
      <article className="guide-detail-page" style={{ background: 'var(--cream-pure)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '90px' }}>
        <div className="wrap" style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px' }}>
          
          <nav aria-label="Breadcrumb" style={{ marginBottom: '24px', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <Link to="/guides" style={{ color: 'inherit', textDecoration: 'none' }}>Guides</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: 'var(--text-dark)', fontWeight: 500 }}>{guide.shortTitle}</span>
          </nav>

          <header style={{ marginBottom: '40px', paddingBottom: '28px', borderBottom: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
              <span className="eyebrow" style={{ margin: 0 }}>Heritage Guide</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>• {guide.readTime}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: 'var(--text-dark)', lineHeight: 1.25, margin: '0 0 16px' }}>
              {guide.title}
            </h1>

            <p style={{ fontSize: '1.08rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 20px' }}>
              {guide.summary}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              <span>Published by <strong>{guide.author}</strong></span>
              <time dateTime={guide.datePublished}>{guide.datePublished}</time>
            </div>
          </header>

          <div className="guide-body" style={{ color: 'var(--text-dark)', fontSize: '1.02rem', lineHeight: 1.75 }}>
            {guide.sections.map((sec, idx) => (
              <section key={idx} style={{ marginBottom: '36px' }}>
                <h2 style={{ fontSize: '1.45rem', color: 'var(--text-dark)', marginBottom: '12px', lineHeight: 1.35 }}>
                  {sec.heading}
                </h2>
                <p style={{ margin: 0, color: 'var(--text-dark)', opacity: 0.9 }}>
                  {sec.body}
                </p>
              </section>
            ))}
          </div>

          <div
            className="guide-cta-box"
            style={{
              marginTop: '50px',
              background: 'radial-gradient(circle at 80% 20%, #2E2220 0%, var(--ink) 85%)',
              color: 'var(--text-light)',
              borderRadius: 'var(--radius)',
              padding: '36px 30px',
              textAlign: 'center'
            }}
          >
            <span className="eyebrow on-dark" style={{ justifyContent: 'center' }}>Live Video Verification</span>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-light)', margin: '10px 0 14px' }}>
              Need help verifying an authentic weave?
            </h3>
            <p style={{ color: 'var(--cream-soft)', maxWidth: '540px', margin: '0 auto 24px', fontSize: '0.92rem' }}>
              Our senior curators in Nathia Gali are available to examine weave photos, show real-time video demonstrations, or assist with bridal color matching.
            </p>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-large"
              style={{ display: 'inline-flex' }}
            >
              Consult Curator on WhatsApp →
            </a>
          </div>

          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/guides" style={{ color: 'var(--oxblood)', textDecoration: 'none', fontWeight: 600, fontSize: '0.92rem' }}>
              ← Back to All Guides
            </Link>
            <Link to="/collection" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600, fontSize: '0.92rem' }}>
              Explore Collection Catalogue →
            </Link>
          </div>

        </div>
      </article>
    </>
  );
}
