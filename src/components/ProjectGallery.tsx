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
        <div className="mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-mono font-bold text-red-500 mb-4 inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="relative z-10">&gt;_projects</span>
            <motion.span
              className="absolute inset-0 bg-red-500 opacity-20 blur-sm"
              animate={{
                opacity: [0.2, 0.3, 0.2],
                scale: [1, 1.02, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                repeatType: "reverse",
              }}
            />
          </motion.h2>

          <p className="text-sm text-gray-400">
            A curated selection of security and software projects — concise,
            relevant, and production-minded.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, staggerChildren: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectGallery;
