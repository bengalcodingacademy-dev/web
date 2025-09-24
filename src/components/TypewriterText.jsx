import React, { useState, useEffect } from "react";

const TypewriterText = ({
  text,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className = "",
  shouldStart = false,
  loop = false,
  onComplete = () => { },
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!shouldStart || !hasStarted) return;

    const currentFullText = text;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, currentIndex + 1));
          setCurrentIndex((prev) => prev + 1);
        } else {
          if (loop) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          } else {
            setIsComplete(true);
            onComplete();
          }
        }
      } else {
        if (currentIndex > 0) {
          setDisplayText(currentFullText.slice(0, currentIndex - 1));
          setCurrentIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

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

  useEffect(() => {
    if (shouldStart && !hasStarted) {
      setHasStarted(true);
    }
  }, [shouldStart, hasStarted]);

  return (
    <div
      className={`
    min-h-[4rem]   
    sm:min-h-[6rem]   
    md:min-h-[8rem]   
    lg:min-h-[12rem] 
    ${className}
  `}
      style={{
        whiteSpace: "normal",
        wordBreak: "break-word",
      }}
    >
      {displayText}
    </div>
  );
};

export default TypewriterText;
