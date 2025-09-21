import React, { useEffect, useState } from "react";

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseAfterTyping?: number;
  loop?: boolean;
  className?: string;
}

/**
 * A simple typewriter effect: types, pauses, deletes, and loops through phrases.
 */
const Typewriter: React.FC<TypewriterProps> = ({
  phrases,
  typingSpeed = 60,
  deletingSpeed = 40,
  pauseAfterTyping = 1200,
  loop = true,
  className = "",
}) => {
  const [index, setIndex] = useState(0); // current phrase
  const [display, setDisplay] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[index % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && display.length < phrase.length) {
      timeout = setTimeout(() => {
        setDisplay(phrase.slice(0, display.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && display.length === phrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseAfterTyping);
    } else if (isDeleting && display.length > 0) {
      timeout = setTimeout(() => {
        setDisplay(phrase.slice(0, display.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && display.length === 0) {
      setIsDeleting(false);
      setIndex((prev) => (loop ? (prev + 1) % phrases.length : prev + 1));
    }

    return () => clearTimeout(timeout);
  }, [display, isDeleting, index, phrases, typingSpeed, deletingSpeed, pauseAfterTyping, loop]);

  return (
    <span aria-live="polite" className={className}>
      {display}
      <span aria-hidden="true" className="ml-1 animate-pulse">|</span>
    </span>
  );
};

export default Typewriter;
