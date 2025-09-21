import React from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedSectionProps {
  id?: string;
  className?: string;
  heading?: React.ReactNode;
  headingId?: string;
  children?: React.ReactNode;
  /** Amount of the element that must be visible to trigger animation (0-1) */
  viewportAmount?: number;
  /** Whether to animate child items with a stagger */
  staggerChildren?: boolean;
}

/**
 * AnimatedSection
 * Reusable wrapper that animates its children when scrolled into view.
 * - Slide up + fade for items by default.
 * - Headings animate independently for a nicer effect.
 */
const containerVariants: Variants = {
  hidden: {},
  visible: (stagger = 0) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export default function AnimatedSection({
  id,
  className = "",
  heading,
  headingId,
  children,
  viewportAmount = 0.18,
  staggerChildren = true,
}: AnimatedSectionProps) {
  const stagger = staggerChildren ? 0.08 : 0;

  return (
    <section id={id} className={className} aria-labelledby={headingId}>
      {heading && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: viewportAmount }}
          transition={{ duration: 0.45 }}
        >
          {/* render heading as provided (usually an <h2>) */}
          {heading}
        </motion.div>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: viewportAmount }}
        variants={containerVariants}
        // pass stagger value to variants via "custom"
        custom={stagger}
      >
        {/* wrap children with a motion.div so itemVariants affect direct children */}
        <motion.div variants={itemVariants}>{children}</motion.div>
      </motion.div>
    </section>
  );
}
