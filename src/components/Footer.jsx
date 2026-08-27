import { Link } from 'react-router-dom';
import { LocationIcon, PhoneIcon, MailIcon, InstagramIcon, TikTokIcon } from './Icons';
import { useStorefrontData } from '../context/StorefrontDataContext';

export default function Footer() {
  const { settings, siteContent, whatsappLink } = useStorefrontData();

  const footerContent = siteContent?.footer || {};
  const brandName = siteContent?.navbar?.brandName || settings.siteName || 'Kamran Shawls';
  const tagline = footerContent.tagline || settings.tagline || 'Authentic Himalayan handloom weaves, pure Pashmina, Royal Shatoosh, and ceremonial Swati chadars curated in the hill station of Nathia Gali.';
  const exploreHeading = footerContent.exploreHeading || 'Explore Pages';
  const boutiqueHeading = footerContent.boutiqueHeading || 'Boutique Location';
  const disclaimer = footerContent.disclaimer || 'All inquiries and reservations are confirmed directly with our curators via WhatsApp. Visit our Main Bazaar boutique in Nathia Gali to inspect handspun Himalayan weaves in person.';
  const copyright = footerContent.copyright || `Kamran Shawls Nathia Gali (kamranshawls.com.pk). All rights reserved.`;
  const bottomNote = footerContent.bottomNote || settings.address || 'Main Bazaar, Nathia Gali, KPK, Pakistan';

  return (
    <footer className="luxury-footer">
      <div className="wrap footer-main-grid">
        <div className="footer-col footer-brand-col">
          <Link className="footer-brand" to="/">
            <img
              src="/logo-dark.svg"
              alt={`${brandName} Logo`}
              className="footer-logo"
              width="36"
              height="36"
            />
            <span>{brandName}</span>
          </Link>

          <p className="footer-tagline">
            {tagline}
          </p>

          <div className="footer-social-pills">
            <a
              href={settings.tiktokUrl || "https://tiktok.com/@kamranshawls"}
              target="_blank"
              rel="noopener noreferrer"
              className="f-social-btn"
              title="TikTok"
            >
              <TikTokIcon />
              <span>TikTok</span>
            </a>

            <a
              href={settings.instagramUrl || "https://instagram.com/kamranshawls"}
              target="_blank"
              rel="noopener noreferrer"
              className="f-social-btn"
              title="Instagram"
            >
              <InstagramIcon />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">{exploreHeading}</h4>
          <ul className="footer-links-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/collection">Collection</Link></li>
            <li><Link to="/craft">Craftsmanship</Link></li>
            <li><Link to="/guides">Weave Guides</Link></li>
            <li><Link to="/contact">Contact & Boutique</Link></li>
          </ul>
        </div>

        <div className="footer-col footer-contact-col">
          <h4 className="footer-heading">{boutiqueHeading}</h4>
          
          <div className="f-contact-item">
            <LocationIcon />
            <div>
              <strong>Nathia Gali Shop</strong>
              <span>{settings.address || 'Main Bazaar, Nathia Gali, KPK, Pakistan'}</span>
            </div>
          </div>

          <div className="f-contact-item">
            <PhoneIcon />
            <div>
              <strong>Phone & WhatsApp</strong>
              <a href={`tel:${(settings.phonePrimary || '+923002121224').replace(/\s/g, '')}`}>{settings.phonePrimary || '+92 300 2121224'}</a>
            </div>
          </div>

          <div className="f-contact-item">
            <MailIcon />
            <div>
              <strong>Email</strong>
              <a href={`mailto:${settings.email || 'hello@kamranshawls.com.pk'}`}>{settings.email || 'hello@kamranshawls.com.pk'}</a>
            </div>
          </div>

          <a
            className="btn btn-primary btn-sm footer-wa-btn"
            target="_blank"
            rel="noopener noreferrer"
            href={whatsappLink}
          >
            WhatsApp Inquiry →
          </a>
        </div>
      </div>

      <div className="wrap footer-disclaimer-wrap">
        <div className="footer-disclaimer-card">
          <p className="f-disc-text">
            {disclaimer}
          </p>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="wrap footer-bottom-inner">
          <p>© {new Date().getFullYear()} {copyright}</p>
          <div className="footer-bottom-note">
            <span>{bottomNote}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
