import React from 'react';

const Shimmer = ({ 
  type = 'card', 
  className = '', 
  count = 1,
  height = 'auto',
  width = '100%'
}) => {
  // Clean skeleton loading style - no borders, subtle gradients
  const shimmerClass = "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]";
  const darkShimmerClass = "animate-pulse bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%]";
  
  const renderShimmer = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden ${className}`} style={{ height, width }}>
            <div className="relative h-48 overflow-hidden">
              <div className={`w-full h-full ${darkShimmerClass}`}></div>
            </div>
            <div className="p-6 space-y-4">
              <div className={`h-6 rounded-lg ${darkShimmerClass}`}></div>
              <div className={`h-4 rounded-lg w-3/4 ${darkShimmerClass}`}></div>
              <div className={`h-4 rounded-lg w-1/2 ${darkShimmerClass}`}></div>
            </div>
          </div>
        );

      case 'youtube-card':
        return (
          <div className={`bg-gradient-to-br from-[#1a0b2e]/80 to-[#0b0b0b]/80 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 ${className}`} style={{ height: height || '144px', width: width || '256px' }}>
            <div className="relative h-full overflow-hidden">
              <div className={`w-full h-full ${darkShimmerClass}`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <div className={`h-4 rounded-lg mb-2 ${darkShimmerClass}`}></div>
                <div className={`h-3 rounded-lg w-2/3 ${darkShimmerClass}`}></div>
              </div>
            </div>
          </div>
        );

      case 'testimonial':
        return (
          <div className={`bg-gradient-to-br from-[#1a0b2e]/80 to-[#0b0b0b]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/10 ${className}`} style={{ height: height || '120px', width: width || '100%' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-full ${darkShimmerClass}`}></div>
              <div className="flex-1">
                <div className={`h-4 rounded-lg w-3/4 mb-2 ${darkShimmerClass}`}></div>
                <div className={`h-3 rounded-lg w-1/2 ${darkShimmerClass}`}></div>
              </div>
            </div>
            <div className={`h-3 rounded-lg w-full mb-1 ${darkShimmerClass}`}></div>
            <div className={`h-3 rounded-lg w-4/5 ${darkShimmerClass}`}></div>
          </div>
        );

      case 'table':
        return (
          <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 ${className}`} style={{ height, width }}>
            <div className="flex items-center space-x-4">
              <div className={`h-10 w-10 rounded-full ${darkShimmerClass}`}></div>
              <div className="flex-1 space-y-2">
                <div className={`h-4 rounded-lg w-1/4 ${darkShimmerClass}`}></div>
                <div className={`h-3 rounded-lg w-1/2 ${darkShimmerClass}`}></div>
              </div>
              <div className={`h-8 w-20 rounded-lg ${darkShimmerClass}`}></div>
            </div>
          </div>
        );

      case 'form':
        return (
          <div className={`space-y-6 ${className}`} style={{ height, width }}>
            <div className="space-y-2">
              <div className={`h-4 rounded-lg w-1/4 ${darkShimmerClass}`}></div>
              <div className={`h-10 rounded-lg ${darkShimmerClass}`}></div>
            </div>
            <div className="space-y-2">
              <div className={`h-4 rounded-lg w-1/4 ${darkShimmerClass}`}></div>
              <div className={`h-10 rounded-lg ${darkShimmerClass}`}></div>
            </div>
            <div className={`h-10 rounded-lg w-32 ${darkShimmerClass}`}></div>
          </div>
        );

      case 'stats':
        return (
          <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 ${className}`} style={{ height, width }}>
            <div className={`h-8 rounded-lg w-1/2 mb-4 ${darkShimmerClass}`}></div>
            <div className={`h-12 rounded-lg w-3/4 ${darkShimmerClass}`}></div>
          </div>
        );

      case 'text':
        return (
          <div className={`rounded-lg ${darkShimmerClass} ${className}`} style={{ height, width }}>
          </div>
        );

      default:
        return (
          <div className={`rounded-lg ${darkShimmerClass} ${className}`} style={{ height, width }}>
          </div>
        );
    }
  };

  if (count > 1) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index}>
            {renderShimmer()}
          </div>
        ))}
      </div>
    );
  }

  return renderShimmer();
};

export default Shimmer;
