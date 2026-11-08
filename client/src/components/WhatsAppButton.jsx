import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const phone = '919848193511';
  const message = encodeURIComponent('Hello! I am interested in your rice products. Please share more details.');
  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} className="text-white" />
    </a>
  );
}
