import { LocationIcon, PhoneIcon, MailIcon, InstagramIcon } from './Icons';
import { WHATSAPP_LINK } from '../data';

export default function Contact() {
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
              rel="noopener"
              href={WHATSAPP_LINK}
            >
              Message on WhatsApp
            </a>
            <a className="btn btn-ghost" href="tel:+923002121224">
              Call Us
            </a>
          </div>
        </div>

        <div className="info-card">
          <div className="info-row">
            <LocationIcon />
            <div>
              <span className="lbl">Location</span>
              <span className="val">Nathia Gali, Pakistan</span>
            </div>
          </div>
          <div className="info-row">
            <PhoneIcon />
            <div>
              <span className="lbl">Phone</span>
              <a href="tel:+923002121224">+92 300 2121224</a> ·{' '}
              <a href="tel:+923499134377">+92 349 9134377</a>
            </div>
          </div>
          <div className="info-row">
            <MailIcon />
            <div>
              <span className="lbl">Email</span>
              <a href="mailto:hello@kamranshawls.pk">hello@kamranshawls.pk</a>
            </div>
          </div>
          <div className="info-row">
            <InstagramIcon />
            <div>
              <span className="lbl">Instagram</span>
              <a
                href="https://instagram.com/kamranshawls"
                target="_blank"
                rel="noopener"
              >
                @kamranshawls
              </a>
            </div>
          </div>
          <div className="note-box">
            This site is a catalogue only — orders are confirmed manually over
            WhatsApp, call or email. No payment is collected on this website.
          </div>
        </div>
      </div>
    </section>
  );
}
