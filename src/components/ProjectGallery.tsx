// src/components/ProjectGallery.tsx
import React from "react";
import { motion } from "framer-motion";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";

interface ProjectGalleryProps {
  projects: ProjectCardProps[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {
  return (
    <div className="w-full py-20 px-4 md:px-8 bg-black" id="projects">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-8 md:mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-mono font-bold text-red-500 mb-4 inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            // keep heading accessible; size clamps for small screens via CSS below
          >
            <span className="relative z-10">&gt;_projects</span>

            <motion.span
              aria-hidden
              className="absolute inset-0 bg-red-500 opacity-20 blur-sm pointer-events-none"
              animate={{
                opacity: [0.18, 0.28, 0.18],
                scale: [1, 1.02, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                repeatType: "reverse",
              }}
            />
          </motion.h2>

          <p className="text-sm text-gray-400 max-w-2xl">
            A curated selection of security and software projects — concise,
            relevant, and production-minded.
          </p>
        </div>

        {/* Grid for md+ screens */}
        <motion.div
          className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, staggerChildren: 0.06 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id ?? index}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        {/* Horizontal carousel for small screens */}
        <motion.div
          className="md:hidden mt-2 -mx-4 px-4 overflow-x-auto flex gap-4 snap-x snap-mandatory touch-pan-x"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id ?? index}
              className="snap-start flex-shrink-0 w-[85%] sm:w-[65%] md:w-auto"
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.02 * index }}
              aria-roledescription="slide"
            >
              {/* Wrap card with padding so card has breathing room in the scroll view */}
              <div className="px-1">
                <ProjectCard {...project} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Inline CSS helpers for mobile snapping, scroll behaviour and heading scaling */}
      <style>{`
        /* Heading scales smoothly on very small screens */
        #projects h2 {
          font-size: clamp(1.25rem, 5.5vw, 1.875rem);
        }

        /* Smooth scrolling for the carousel on mobile */
        .snap-x {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }

        /* Hide scrollbar on WebKit while still scrollable (optional cosmetic) */
        .md\\:hidden::-webkit-scrollbar {
          height: 8px;
        }
        .md\\:hidden::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.06);
          border-radius: 999px;
        }

        /* Make sure ProjectCard contents don't cause horizontal overflow */
        #projects .font-mono, #projects img {
          max-width: 100%;
          height: auto;
          display: block;
        }

        /* Reduce gap slightly on very small screens */
        @media (max-width: 420px) {
          .md\\:hidden {
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectGallery;
