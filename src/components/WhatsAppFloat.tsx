import { useState } from 'react';
import { Phone } from 'lucide-react';

const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappLink = 'https://wa.me/919943980796';
  const message = encodeURIComponent('Hi Abdullah, I found your portfolio interesting and would like to discuss a potential collaboration.');

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 shadow-lg transition-colors duration-200"
        aria-label="Open WhatsApp"
      >
        <Phone className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-8 bg-white rounded-lg shadow-lg p-4 w-64 text-center">
          <p className="text-gray-700 mb-2">Connect via WhatsApp</p>
          <a
            href={`${whatsappLink}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg inline-flex items-center justify-center space-x-2 transition-colors duration-200"
          >
            <Phone className="h-5 w-5" />
            <span>Message Me</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default WhatsAppFloat;