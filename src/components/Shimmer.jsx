import React from "react";

/**
 * Base shimmer block with sliding gradient
 */
const ShimmerBox = ({ className = "" }) => (
  <div className={`relative overflow-hidden bg-gray-300/20 dark:bg-gray-700/20 rounded-md ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
  </div>
);

/**
 * Shimmer (Skeleton Loader)
 * type: card | youtube-card | testimonial | text | default
 */
const Shimmer = ({
  type = "card",
  count = 1,
  className = "",
  height = "auto",
  width = "100%",
}) => {
  const Item = () => {
    switch (type) {
      case "card":
      case "course-card":
        return (
          <div
            className={`rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a0b2e]/80 to-[#0b0b0b]/80 p-4 ${className}`}
            style={{ height, width }}
          >
            <ShimmerBox className="h-40 w-full rounded-xl mb-4" />
            <ShimmerBox className="h-6 w-3/4 mb-2" />
            <ShimmerBox className="h-4 w-full mb-1" />
            <ShimmerBox className="h-4 w-2/3" />
          </div>
        );

      case "youtube-card":
        return (
          <div
            className={`rounded-xl border border-white/10 bg-gradient-to-br from-[#1a0b2e]/80 to-[#0b0b0b]/80 ${className}`}
            style={{ height: height || "144px", width: width || "256px" }}
          >
            <ShimmerBox className="h-full w-full" />
          </div>
        );

      case "testimonial":
        return (
          <div
            className={`rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a0b2e]/80 to-[#0b0b0b]/80 p-4 ${className}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <ShimmerBox className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <ShimmerBox className="h-4 w-3/4" />
                <ShimmerBox className="h-3 w-1/2" />
              </div>
            </div>
            <ShimmerBox className="h-3 w-full mb-1" />
            <ShimmerBox className="h-3 w-4/5" />
          </div>
        );

      case "text":
        return (
          <ShimmerBox
            className={`rounded-lg ${className}`}
            style={{ height, width }}
          />
        );

      default:
        return (
          <ShimmerBox
            className={`rounded-lg ${className}`}
            style={{ height, width }}
          />
        );
    }
  };

  if (count > 1) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <Item key={i} />
        ))}
      </div>
    );
  }

  return <Item />;
};

export default Shimmer;
