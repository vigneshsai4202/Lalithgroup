import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const phone = '919848193511';
  const message = encodeURIComponent('Hello! I am interested in your rice products. Please share more details.');

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    >
      {/* Tooltip */}
      <span
        className={`bg-white text-green-deep text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-gray-100 whitespace-nowrap transition-all duration-300 ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        Chat with us
      </span>

      {/* Button */}
      <div className="relative w-14 h-14 flex items-center justify-center">
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 wa-pulse" />
        <span className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200">
          <FaWhatsapp size={28} className="text-white" />
        </span>
      </div>
    </a>
  );
}
