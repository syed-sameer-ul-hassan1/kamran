import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BurgerIcon } from './Icons';
import { useStorefrontData } from '../context/StorefrontDataContext';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Collection', to: '/collection' },
  { label: 'Craftsmanship', to: '/craft' },
  { label: 'Guides', to: '/guides' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const { whatsappLink } = useStorefrontData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className={`site-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <Link className="brand" to="/">
            <img
              src={scrolled ? '/logo-default.svg' : '/logo-dark.svg'}
              alt="Kamran Shawls Logo"
              className="brand-logo"
              width="32"
              height="32"
            />
            Kamran Shawls
          </Link>

          <nav className="links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={location.pathname === link.to ? 'active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            className="btn btn-primary nav-cta"
            target="_blank"
            rel="noopener noreferrer"
            href={WHATSAPP_LINK}
          >
            Enquire on WhatsApp
          </a>

          <button
            className="burger"
            aria-label="Open mobile menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <BurgerIcon />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-nav-fullscreen" role="dialog" aria-modal="true">
          <div className="mobile-nav-header">
            <Link className="brand brand-light" to="/" onClick={() => setMenuOpen(false)}>
              <img
                src="/logo-dark.svg"
                alt="Kamran Shawls Logo"
                className="brand-logo"
                width="32"
                height="32"
              />
              Kamran Shawls
            </Link>

            <button
              type="button"
              className="mobile-nav-close"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="mobile-nav-body">
            <nav className="mobile-nav-links">
              {NAV_LINKS.map((link, idx) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="m-nav-num">0{idx + 1}</span>
                    <span className="m-nav-label">{link.label}</span>
                    <span className="m-nav-arrow">{isActive ? '●' : '→'}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mobile-nav-footer">
              <div className="m-nav-cta-wrap">
                <a
                  className="btn btn-primary btn-large m-nav-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={WHATSAPP_LINK}
                  onClick={() => setMenuOpen(false)}
                >
                  Chat with Curator on WhatsApp →
                </a>
                <a
                  className="btn btn-ghost on-dark btn-large m-nav-btn"
                  href="tel:+923002121224"
                >
                  Call: +92 300 2121224
                </a>
              </div>

              <div className="m-nav-meta">
                <div className="m-nav-loc">
                  <strong>Nathia Gali Boutique</strong>
                  <p>Main Bazaar • Khyber Pakhtunkhwa</p>
                </div>
                <div className="m-nav-socials">
                  <a
                    href="https://instagram.com/kamranshawls"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                  <span>•</span>
                  <a
                    href="https://tiktok.com/@kamranshawls"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
