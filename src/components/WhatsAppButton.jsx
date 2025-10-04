import React from 'react';

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    // Open WhatsApp chat with the specified number
    window.open('https://wa.me/7001798010', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="group relative w-14 h-14 bg-gradient-to-br from-bca-gray-800/70 to-bca-gray-900/70 rounded-full border border-bca-cyan/20 hover:border-bca-cyan/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
        style={{
          boxShadow: '0 0 10px rgba(0, 189, 255, 0.2), 0 0 20px rgba(0, 189, 255, 0.1), 0 0 30px rgba(0, 189, 255, 0.05)'
        }}
        title="Chat with us on WhatsApp"
      >
        {/* Subtle neon glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-bca-cyan/10 to-bca-gold/10 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
        
        {/* WhatsApp Icon with BCA theme */}
        <svg 
          className="relative z-10 w-7 h-7 text-bca-cyan drop-shadow-lg group-hover:text-bca-gold transition-colors duration-300" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>

        {/* Subtle pulse effect */}
        <div className="absolute inset-0 rounded-full border border-bca-cyan/20 opacity-0 group-hover:opacity-60 group-hover:animate-ping"></div>
      </button>

      {/* Tooltip with BCA theme */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-bca-gray-900/80 backdrop-blur-sm border border-bca-cyan/20 text-bca-cyan text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat with us on WhatsApp
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-bca-gray-900/80"></div>
      </div>
    </div>
  );
}
