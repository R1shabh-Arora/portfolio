// src/components/FadeIn.tsx
import React from "react";
import { motion, MotionProps } from "framer-motion";

export type FadeInProps = {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  distance?: number; // px
  delay?: number; // seconds
  duration?: number; // seconds
  className?: string;
  /** If true, animate only once. If false, animate every time it enters view. */
  once?: boolean;
} & MotionProps;

const dirToOffset = (direction: string, distance: number) => {
  switch (direction) {
    case "left":
      return { x: -distance, y: 0 };
    case "right":
      return { x: distance, y: 0 };
    case "down":
      return { x: 0, y: distance };
    case "up":
    default:
      return { x: 0, y: -distance };
  }
};

export default function FadeIn({
  children,
  direction = "up",
  distance = 50,
  delay = 2,
  duration = 3,
  className = "",
  once = false, // <<-- default now re-animates on every entry
  ...rest
}: FadeInProps) {
  // Respect user preference for reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = dirToOffset(direction, distance);

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      // NOTE: set once to false to animate each time element enters the viewport
      viewport={{ once, amount: 0.12 }}
      transition={{ delay, duration, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
