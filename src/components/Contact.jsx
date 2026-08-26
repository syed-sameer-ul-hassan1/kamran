import { LocationIcon, PhoneIcon, MailIcon, InstagramIcon } from './Icons';
import { useStorefrontData } from '../context/StorefrontDataContext';

export default function Contact() {
  const { settings, whatsappLink } = useStorefrontData();

  return (
    <section className="contact" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-copy">
          <span className="eyebrow">Get in Touch</span>
          <h2 style={{ margin: '12px 0 16px' }}>Enquire about a piece</h2>
          <p>
            We take orders directly over WhatsApp, call, or email — no account
            or checkout needed. Tell us the shawl you&apos;re interested in and
            we&apos;ll confirm price, colour and delivery time.
          </p>
          <div className="contact-actions">
            <a
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              href={whatsappLink}
            >
              Message on WhatsApp
            </a>
            <a className="btn btn-ghost" href={`tel:${(settings.phonePrimary || '+923002121224').replace(/\s/g, '')}`}>
              Call Us
            </a>
          </div>
        </div>

        <div className="info-card">
          <div className="info-row">
            <LocationIcon />
            <div>
              <span className="lbl">Location</span>
              <span className="val">{settings.address || 'Nathia Gali, Pakistan'}</span>
            </div>
          </div>
          <div className="info-row">
            <PhoneIcon />
            <div>
              <span className="lbl">Phone</span>
              <a href={`tel:${(settings.phonePrimary || '+923002121224').replace(/\s/g, '')}`}>{settings.phonePrimary || '+92 300 2121224'}</a> ·{' '}
              <a href={`tel:${(settings.phoneSecondary || '+923499134377').replace(/\s/g, '')}`}>{settings.phoneSecondary || '+92 349 9134377'}</a>
            </div>
          </div>
          <div className="info-row">
            <MailIcon />
            <div>
              <span className="lbl">Email</span>
              <a href={`mailto:${settings.email || 'hello@kamranshawls.com.pk'}`}>{settings.email || 'hello@kamranshawls.com.pk'}</a>
            </div>
          </div>
          <div className="info-row">
            <InstagramIcon />
            <div>
              <span className="lbl">Instagram</span>
              <a
                href={settings.instagramUrl || 'https://instagram.com/kamranshawls'}
                target="_blank"
                rel="noopener noreferrer"
              >
                @kamranshawls
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
