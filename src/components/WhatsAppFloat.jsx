import { WHATSAPP_LINK } from '../data';

export default function WhatsAppFloat() {
  return (
    <a
      className="btn btn-primary wa-float"
      aria-label="Chat with us on WhatsApp"
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
    >
      WhatsApp Inquiry
    </a>
  );
}
