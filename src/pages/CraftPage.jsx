import { useStorefrontData } from '../context/StorefrontDataContext';

export default function CraftPage() {
  const { craftSteps, siteContent, whatsappLink } = useStorefrontData();

  const craftContent = siteContent?.craftPage || {};
  const heroTitle = craftContent.heroTitle || 'The Ancient Art of Mountain Weaving';
  const heroLede = craftContent.heroLede || 'Discover the six-stage artisan journey of every Kamran Shawl — from high-altitude Capra Hircus fleeces to traditional wooden handlooms, natural botanical dyeing, and rigorous 4-point in-store audits in Nathia Gali.';
  const heroBtn1 = craftContent.heroBtn1 || 'Explore 6-Stage Process ↓';
  const heroBtn2 = craftContent.heroBtn2 || 'Inquire on WhatsApp →';
  const journeyEyebrow = craftContent.journeyEyebrow || 'The 6-Stage Journey';
  const journeyTitle = craftContent.journeyTitle || 'How a raw mountain fleece becomes an heirloom';
  const journeyDesc = craftContent.journeyDesc || 'We believe in slow craftsmanship. No synthetic shortcuts, no automated factory speeds.';
  const comparisonEyebrow = craftContent.comparisonEyebrow || 'Authenticity Comparison';
  const comparisonTitle = craftContent.comparisonTitle || 'Why authentic handlooms surpass powerlooms';
  const comparisonDesc = craftContent.comparisonDesc || 'Understand the critical structural differences between master handlooms and industrial mass production.';
  const inspectionEyebrow = craftContent.inspectionEyebrow || 'Quality Assurance';
  const inspectionTitle = craftContent.inspectionTitle || 'The 4-point in-store inspection protocol';
  const inspectionDesc = craftContent.inspectionDesc || 'Before any shawl is placed on our shelves in Nathia Gali or dispatched to a client, our senior curator performs a comprehensive quality audit:';
  const inspectionCta = craftContent.inspectionCta || 'Request Live Weave Video on WhatsApp →';

  const scrollToSteps = () => {
    const el = document.getElementById('craft-journey');
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
            {heroTitle.includes('Mountain Weaving') ? (
              <>
                {heroTitle.split('Mountain Weaving')[0]} <em>Mountain Weaving</em>
              </>
            ) : (
              heroTitle
            )}
          </h1>

          <p className="page-hero-lede">
            {heroLede}
          </p>

          <div className="page-hero-cta">
            <button type="button" onClick={scrollToSteps} className="btn btn-gold btn-large">
              {heroBtn1}
            </button>
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

        <button
          type="button"
          onClick={scrollToSteps}
          className="hero-scroll-indicator"
          aria-label="Scroll to craft process"
        >
          <span>Scroll to explore</span>
          <span className="scroll-arrow">↓</span>
        </button>
      </section>

      <section id="craft-journey" className="craft-process-full">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">{journeyEyebrow}</span>
              <h2>{journeyTitle}</h2>
            </div>
            <p>{journeyDesc}</p>
          </div>

          <div className="mobile-scroll-hint">
            <span>Swipe to view all 6 stages →</span>
          </div>

          <div className="craft-steps-grid">
            {craftSteps.map((step) => (
              <div className="craft-step-card" key={step.number}>
                <div className="c-step-top">
                  <span className="c-step-num">{step.number}</span>
                  <span className="c-step-stage">{step.stage}</span>
                </div>
                <h3>{step.title}</h3>
                <p className="c-step-desc">{step.desc}</p>
                <div className="c-step-details">
                  {step.details.map((d, idx) => (
                    <div className="c-detail-item" key={idx}>
                      <span className="c-check">✓</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="comparison-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">{comparisonEyebrow}</span>
              <h2>{comparisonTitle}</h2>
            </div>
            <p>{comparisonDesc}</p>
          </div>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Craft Quality Feature</th>
                  <th className="highlight-col">Kamran Shawls (Handloom)</th>
                  <th>Commercial Factory (Powerloom)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Fiber Purity</strong></td>
                  <td className="highlight-col">100% Unadulterated Himalayan Fleece</td>
                  <td>Often blended with acrylic or polyester for high-speed spinning</td>
                </tr>
                <tr>
                  <td><strong>Yarn Spinning</strong></td>
                  <td className="highlight-col">Hand-spun on wooden charkhas (natural air pockets retained)</td>
                  <td>High-heat industrial spinning burns delicate fleece natural oils</td>
                </tr>
                <tr>
                  <td><strong>Weave Tension & Breathability</strong></td>
                  <td className="highlight-col">Organic tension allows fabric to breathe & drape fluidly</td>
                  <td>Rigid mechanical tension creates stiff, static-heavy cloth</td>
                </tr>
                <tr>
                  <td><strong>Border & Fringes</strong></td>
                  <td className="highlight-col">Individually hand-rolled and knotted eyelash edges</td>
                  <td>Machine overlocked or glued edge stitching</td>
                </tr>
                <tr>
                  <td><strong>Longevity & Softening</strong></td>
                  <td className="highlight-col">Grows softer, warmer, and more lustrous with every season</td>
                  <td>Pills, loses shape, and frays after minimal wear</td>
                </tr>
                <tr>
                  <td><strong>Artisan Livelihood</strong></td>
                  <td className="highlight-col">Supports multi-generational valley weaver families directly</td>
                  <td>Centralized industrial profit with automated equipment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="inspection-section">
        <div className="wrap">
          <div className="inspection-card">
            <div className="inspection-content">
              <span className="eyebrow on-dark">{inspectionEyebrow}</span>
              <h2>{inspectionTitle}</h2>
              <p>
                {inspectionDesc}
              </p>
              
              <div className="inspection-grid">
                <div className="ins-item">
                  <span className="ins-badge">01</span>
                  <div>
                    <strong>Fiber Micron & Weight Audit</strong>
                    <p>Testing density and weight on precision jeweler scales to verify authentic fleece grade.</p>
                  </div>
                </div>
                <div className="ins-item">
                  <span className="ins-badge">02</span>
                  <div>
                    <strong>Light Transparency & Weft Uniformity</strong>
                    <p>Examining the shawl over diffused backlight to ensure uniform weave interlacing without gaps.</p>
                  </div>
                </div>
                <div className="ins-item">
                  <span className="ins-badge">03</span>
                  <div>
                    <strong>Fringe & Border Alignment</strong>
                    <p>Verifying that every hand-rolled edge and Zari border sits perfectly parallel and secure.</p>
                  </div>
                </div>
                <div className="ins-item">
                  <span className="ins-badge">04</span>
                  <div>
                    <strong>Steam Press & Cedar Packing</strong>
                    <p>Gentle steam pressing and wrapping in breathable cotton cases with organic cedar protection.</p>
                  </div>
                </div>
              </div>

              <div className="ins-cta-row">
                <a
                  className="btn btn-primary btn-large"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={whatsappLink}
                >
                  {inspectionCta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
