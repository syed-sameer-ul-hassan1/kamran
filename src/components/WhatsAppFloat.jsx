import { useStorefrontData } from '../context/StorefrontDataContext';

export default function WhatsAppFloat() {
  const { whatsappLink } = useStorefrontData();

  return (
    <a
      className="btn btn-primary wa-float"
      aria-label="Chat with us on WhatsApp"
      href={whatsappLink || 'https://wa.me/923002121224'}
      target="_blank"
      rel="noopener noreferrer"
    >
      WhatsApp Inquiry
    </a>
  );
}
