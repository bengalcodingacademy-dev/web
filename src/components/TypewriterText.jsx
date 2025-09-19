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

  // Split text into lines for better display
  const renderText = () => {
    if (displayText.length <= 19) {
      return (
        <div>
          <div>{displayText}</div>
        </div>
      );
    } else {
      const firstLine = "Become a job-ready";
      const secondLine = displayText.substring(19);
      return (
        <div>
          <div>{firstLine}</div>
          <div>{secondLine}</div>
        </div>
      );
    }
  };

  return <div className={className}>{renderText()}</div>;
};

export default TypewriterText;
