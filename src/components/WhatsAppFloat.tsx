import WhatsAppIcon from './WhatsAppIcon';

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/919943980796?text=Hi%20Abdullah,%20I'm%20interested%20in%20your%20project%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-secondary-500 hover:bg-secondary-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 animate-bounce-slow"
      aria-label="Contact via WhatsApp"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppFloat;