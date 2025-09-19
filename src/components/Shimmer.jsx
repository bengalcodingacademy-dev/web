import React from 'react';

const Shimmer = ({ 
  type = 'card', 
  className = '', 
  count = 1,
  height = 'auto',
  width = '100%'
}) => {
  // Simple shimmer animation using CSS
  const shimmerClass = "animate-pulse bg-gradient-to-r from-bca-gray-800 via-bca-gray-700 to-bca-gray-800 bg-[length:200%_100%]";
  const renderShimmer = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`bg-bca-gray-800/60 backdrop-blur-sm rounded-2xl border border-bca-gray-700/50 overflow-hidden ${className}`} style={{ height, width }}>
            <div className="relative h-48 overflow-hidden">
              <div className={`w-full h-full ${shimmerClass}`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-bca-gray-800/80 to-transparent"></div>
            </div>
            <div className="p-6 space-y-4">
              <div className={`h-6 rounded-lg ${shimmerClass}`}></div>
              <div className={`h-4 rounded-lg w-3/4 ${shimmerClass}`}></div>
              <div className={`h-4 rounded-lg w-1/2 ${shimmerClass}`}></div>
            </div>
          </div>
        );

      case 'table':
        return (
          <div className={`bg-bca-gray-800/60 backdrop-blur-sm rounded-xl border border-bca-gray-700/50 p-4 ${className}`} style={{ height, width }}>
            <div className="flex items-center space-x-4">
              <div className={`h-10 w-10 rounded-full ${shimmerClass}`}></div>
              <div className="flex-1 space-y-2">
                <div className={`h-4 rounded-lg w-1/4 ${shimmerClass}`}></div>
                <div className={`h-3 rounded-lg w-1/2 ${shimmerClass}`}></div>
              </div>
              <div className={`h-8 w-20 rounded-lg ${shimmerClass}`}></div>
            </div>
          </div>
        );

      case 'form':
        return (
          <div className={`space-y-6 ${className}`} style={{ height, width }}>
            <div className="space-y-2">
              <div className={`h-4 rounded-lg w-1/4 ${shimmerClass}`}></div>
              <div className={`h-10 rounded-lg ${shimmerClass}`}></div>
            </div>
            <div className="space-y-2">
              <div className={`h-4 rounded-lg w-1/4 ${shimmerClass}`}></div>
              <div className={`h-10 rounded-lg ${shimmerClass}`}></div>
            </div>
            <div className={`h-10 rounded-lg w-32 ${shimmerClass}`}></div>
          </div>
        );

      case 'stats':
        return (
          <div className={`bg-bca-gray-800/60 backdrop-blur-sm rounded-xl border border-bca-gray-700/50 p-6 ${className}`} style={{ height, width }}>
            <div className={`h-8 rounded-lg w-1/2 mb-4 ${shimmerClass}`}></div>
            <div className={`h-12 rounded-lg w-3/4 ${shimmerClass}`}></div>
          </div>
        );

      case 'text':
        return (
          <div className={`rounded-lg ${shimmerClass} ${className}`} style={{ height, width }}>
          </div>
        );

      default:
        return (
          <div className={`rounded-lg ${shimmerClass} ${className}`} style={{ height, width }}>
          </div>
        );
    }
  };

  if (count > 1) {
    return (
      <div className="space-y-4">
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
