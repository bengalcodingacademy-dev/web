import React, { useState, useEffect } from "react";

const TypewriterText = ({
  text,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className = "",
  shouldStart = false,
  loop = false,
  onComplete = () => {},
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!shouldStart || !hasStarted) return;

    const currentFullText = text;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentIndex < currentFullText.length) {
            setDisplayText(currentFullText.slice(0, currentIndex + 1));
            setCurrentIndex((prev) => prev + 1);
          } else {
            // Finished typing
            if (loop) {
              setTimeout(() => {
                setIsDeleting(true);
              }, pauseTime);
            } else {
              setIsComplete(true);
              onComplete();
            }
          }
        } else {
          // Deleting
          if (currentIndex > 0) {
            setDisplayText(currentFullText.slice(0, currentIndex - 1));
            setCurrentIndex((prev) => prev - 1);
          } else {
            // Finished deleting, start typing again
            setIsDeleting(false);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    text,
    speed,
    deleteSpeed,
    pauseTime,
    loop,
    shouldStart,
    hasStarted,
    onComplete,
  ]);

  // Start the animation when shouldStart becomes true
  useEffect(() => {
    if (shouldStart && !hasStarted) {
      setHasStarted(true);
    }
  }, [shouldStart, hasStarted]);

  // Split text into lines for better display - responsive approach
  const renderText = () => {
    // Smart break points that work across all screen sizes
    const breakPoints = {
      mobile: 12,    // "Become a job" (12 chars) - fits mobile
      tablet: 19,    // "Become a job-ready" (19 chars) - fits tablet
      desktop: 25    // "Become a job-ready developer" (25 chars) - fits desktop
    };

    // Use a more conservative approach for mobile-first design
    let breakPoint = breakPoints.mobile;
    
    // Progressive enhancement based on text length
    if (displayText.length > breakPoints.mobile && displayText.length <= breakPoints.tablet) {
      breakPoint = breakPoints.mobile; // Keep mobile break for better mobile experience
    } else if (displayText.length > breakPoints.tablet) {
      breakPoint = breakPoints.tablet; // Use tablet break for longer text
    }

    if (displayText.length <= breakPoint) {
      // First line only - with proper spacing
      return (
        <div className="min-h-[3rem] flex flex-col justify-center">
          <div className="whitespace-nowrap overflow-hidden">
            {displayText}
            <span className="animate-pulse">|</span>
          </div>
          <div className="h-6"></div> {/* Reserve space for second line */}
        </div>
      );
    } else {
      // Split into two lines with proper mobile handling
      const firstLine = displayText.substring(0, breakPoint);
      const secondLine = displayText.substring(breakPoint);
      return (
        <div className="min-h-[3rem] flex flex-col justify-center">
          <div className="whitespace-nowrap overflow-hidden">{firstLine}</div>
          <div className="whitespace-nowrap overflow-hidden">
            {secondLine}
            <span className="animate-pulse">|</span>
          </div>
        </div>
      );
    }
  };

  return <div className={className}>{renderText()}</div>;
};

export default TypewriterText;
