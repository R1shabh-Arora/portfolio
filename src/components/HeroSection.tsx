import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDownIcon } from "lucide-react";
import Typewriter from "./Typewriter";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  introText?: string[];
}

const HeroSection = ({
  title = "Rishabh Arora – Graphic Designer",
  subtitle = "Visual storytelling through design, inspired by the digital underground.",
  introText = [
    "Hello, friend.",
    "I create visual identities, motion graphics, and digital experiences.",
    "This is my portfolio.",
  ],
}: HeroSectionProps) => {
  const [typedText, setTypedText] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  // Typewriter effect
  useEffect(() => {
    if (currentLineIndex >= introText.length) return;

    const currentLine = introText[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setTypedText((prev) => {
          const newTypedText = [...prev];
          if (!newTypedText[currentLineIndex]) {
            newTypedText[currentLineIndex] = "";
          }
          newTypedText[currentLineIndex] = currentLine.substring(
            0,
            currentCharIndex + 1,
          );
          return newTypedText;
        });
        setCurrentCharIndex(currentCharIndex + 1);
      }, 50 + Math.random() * 50);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLineIndex(currentLineIndex + 1);
        setCurrentCharIndex(0);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, currentCharIndex, introText]);

  // Glitch animation variants
  const glitchVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
        yoyo: Infinity,
        repeatDelay: 5 + Math.random() * 10,
      },
    },
  };

  return (
    <div
      id="home"
      className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center px-4"
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-scanline opacity-10"></div>

      {/* Background portrait image */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-15 z-0"
        style={{
          backgroundImage:
            "url('/ai-portrait.png')",
          filter: "grayscale(100%) contrast(120%) brightness(70%)",
        }}
      ></div>

      {/* Falling code animation */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500/20 font-mono text-sm"
            style={{
              top: -100 + Math.random() * 100,
              left: `${Math.random() * 100}%`,
              animation: `fallDown ${5 + Math.random() * 15}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {Array.from({ length: 15 }).map((_, j) => (
              <div key={j}>
                {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="z-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Glitching title */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold mb-6 text-red-500 glow-red"
          initial="hidden"
          animate="visible"
          variants={glitchVariants}
        >
          <span className="relative inline-block">
            <span className="relative z-10 flex items-center">
              <span className="mr-4 whitespace-nowrap">Rishabh Arora –</span>
              <Typewriter
                phrases={[
                  "Cyber Security Enthusiast",
                  "Network Nerd",
                  "Workout Warrior",
                  "Big Thinker",
                  "Curious Rambler",
                  "Petrol Head",
                ]}
                typingSpeed={60}
                deletingSpeed={40}
                pauseAfterTyping={1200}
                className="inline-block"
              />
            </span>

            {/* Glitch shadow layers */}
            <motion.span
              className="absolute top-0 left-0 text-cyan-500 z-0"
              animate={{
                x: [0, -3, 0, 2, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 7 }}
            >
              Rishabh Arora – Cyber Security Enthusiast
            </motion.span>
            <motion.span
              className="absolute top-0 left-0 text-red-700 z-0"
              animate={{
                x: [0, 3, 0, -2, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 7.2 }}
            >
              Rishabh Arora – Cyber Security Enthusiast
            </motion.span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-[#ffffff]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {subtitle}
        </motion.p>

        {/* Terminal section */}
        <motion.div
          className="bg-black/80 border border-red-500/30 p-6 rounded-md w-full max-w-lg mx-auto font-mono text-left text-white/90 mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex items-center mb-4 border-b border-red-500/20 pb-2">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs text-white/50 ml-2">terminal</span>
          </div>
          <div className="text-green-500 mb-2">
            $ <span className="text-white/80">run intro.sh</span>
          </div>
          <div className="min-h-[100px] flex">
            {typedText.map((line, index) => (
              <div key={index} className="mb-2">
                {line}
                {index === currentLineIndex &&
                  currentCharIndex < introText[currentLineIndex]?.length && (
                    <span className="inline-block w-2 h-4 bg-white/80 ml-0.5 animate-pulse"></span>
                  )}
              </div>
            ))}
            {currentLineIndex >= introText.length && (
              <div className="text-green-500 mt-2">
                <span className="inline-block w-2 h-4 bg-white/80 ml-0.5 animate-pulse"></span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* CSS for animations */}
      <style>{`
        @keyframes fallDown {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        .glow-red {
          text-shadow: 0 0 5px rgba(239, 68, 68, 0.5),
            0 0 20px rgba(239, 68, 68, 0.3);
        }

        .bg-scanline {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.5) 50%
          );
          background-size: 100% 4px;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
