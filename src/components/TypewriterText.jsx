import React, { useState, useEffect } from "react";

const TypewriterText = ({
  texts = [], // array of strings
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className = "",
  shouldStart = false,
  loop = false,
  onComplete = () => {},
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0); // character index
  const [textIndex, setTextIndex] = useState(0); // which text in texts[]
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!shouldStart || !hasStarted || texts.length === 0) return;

    const currentFullText = texts[textIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, currentIndex + 1));
          setCurrentIndex((prev) => prev + 1);
        } else {
          if (textIndex < texts.length - 1) {
            // if more texts are left
            setTimeout(() => setIsDeleting(true), pauseTime);
          } else if (loop) {
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
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    textIndex,
    texts,
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
