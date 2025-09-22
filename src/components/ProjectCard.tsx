// src/components/ProjectCard.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectCardProps {
  id?: string;
  title?: string;
  description?: string;
  longDescription?: string;
  image?: string;
  images?: string[]; // screenshots for modal
  tags?: string[];
  role?: string;
  date?: string;
  links?: ProjectLink[]; // GitHub, demo, report
  onClick?: () => void;
  ownership?: "Individual" | "Group";
}

/**
 * ProjectCard
 * - compact grid card (image, title, short description, tags)
 * - hover reveals role/date
 * - click opens an accessible modal with full details and extra images/links
 */
const ProjectCard: React.FC<ProjectCardProps> = ({
  title = "Terminal Project",
  description = "A hacker-inspired project with secure authentication and data visualization",
  longDescription = "Detailed write-up about the project, technical choices, and outcomes.",
  image = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
  images = [],
  tags = ["React", "TypeScript", "Node.js"],
  role,
  date,
  links = [],
  onClick = () => console.log("Project clicked"),
  ownership = "Individual",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // focus management + scroll lock
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape closes modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const glitchVariants = {
    initial: { opacity: 1, scale: 1 },
    hover: {
      opacity: [1, 0.96, 1],
      scale: [1, 1.01, 1],
      transition: { duration: 0.45, ease: "easeInOut" },
    },
  };

  return (
    <>
      <motion.div
        className="relative w-full h-full mb-5"
        initial="initial"
        whileHover="hover"
        variants={glitchVariants}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card
          className="w-full h-full overflow-hidden border border-red-600/30 bg-black text-white cursor-pointer flex flex-col"
          onClick={() => {
            onClick();
            setIsOpen(true);
          }}
          role="button"
          aria-label={`Open details for ${title}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsOpen(true);
            }
          }}
        >
          {/* Terminal header */}
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-red-600/30">
            <div className="flex space-x-2" aria-hidden>
              <div className="w-3 h-3 rounded-full bg-red-600" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="font-mono text-xs text-red-500 truncate">{title}.exe</div>
            <div className="text-xs text-zinc-500">{ownership === "Individual" ? "Individual@project" : "Group@project"}</div>
          </div>

          {/* Image */}
          <div className="relative w-full h-40 overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-scanline opacity-20 pointer-events-none" />
            <motion.div
              className="absolute inset-0 bg-red-600/10 opacity-0 mix-blend-overlay"
              variants={{ hover: { opacity: 0.28 } }}
            />
          </div>

          {/* Content */}
          <div className="p-4 font-mono flex-1 flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-red-500 text-lg mb-2 font-bold tracking-tight">{title}</h3>
                <p className="text-zinc-400 text-sm mb-2 line-clamp-2">{description}</p>

                {/* hover reveal */}
                <div
                  className={`text-xs text-zinc-500 transition-all overflow-hidden ${
                    isHovered ? "opacity-100 max-h-10" : "opacity-0 max-h-0"
                  }`}
                >
                  {role && <span className="mr-3">Role: <span className="text-zinc-300">{role}</span></span>}
                  {date && <span>Year: <span className="text-zinc-300">{date}</span></span>}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-transparent border-red-500/50 text-red-400 text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Terminal prompt */}
          <div className="px-4 py-2 bg-zinc-900 border-t border-red-600/30 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">$</span>
              <span className="text-zinc-400 text-xs">view --project</span>
              <motion.span
                className="ml-1 text-zinc-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                _
              </motion.span>
            </div>

            <div className="text-xs text-zinc-500 italic">Click to open</div>
          </div>
        </Card>
      </motion.div>

      {/* Modal / details */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
            aria-label={`${title} details`}
          >
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="relative z-10 max-w-3xl w-full bg-black border border-red-600/30 rounded-md overflow-hidden shadow-lg"
              initial={{ y: 20, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              {/* header */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-red-600/30">
                <div>
                  <div className="font-mono text-red-500 text-sm">{title}.exe</div>
                  <div className="text-xs text-zinc-400">
                    {role && <span className="mr-3">{role}</span>}
                    {date && <span>{date}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    ref={closeButtonRef}
                    onClick={() => setIsOpen(false)}
                    className="text-xs px-3 py-1 rounded border border-gray-700 text-gray-300 hover:bg-red-600/10 focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label="Close project details"
                  >
                    Close
                  </button>
                </div>

              </div>

              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="relative rounded-md overflow-hidden border border-red-600/20">
                     {/* new — shows full image, preserves aspect ratio, limits height to viewport  */}
                      <img
                        src={image}
                        alt={`${title} screenshot`}
                        className="w-full h-auto max-h-[60vh] object-contain rounded-md"
                      />

                    <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <h4 className="text-red-500 font-mono text-lg mb-2">{title}</h4>
                  <p className="text-zinc-300 text-sm mb-3 leading-relaxed">{longDescription}</p>

                  <div className="mb-3">
                    <div className="text-xs text-zinc-400 mb-2">Tech stack</div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((t, i) => (
                        <Badge key={i} variant="outline" className="bg-transparent border-red-500/40 text-red-300 text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-xs text-zinc-400 mb-2">Summary</div>
                    <ul className="list-disc ml-5 text-zinc-300 text-sm space-y-2">
                      <li>Role: <span className="text-zinc-200">{role ?? "Contributor"}</span></li>
                      <li>Year: <span className="text-zinc-200">{date ?? "—"}</span></li>
                      {/* <li>Outcome: <span className="text-zinc-200">Deployed prototype / research evaluation / demonstrator</span></li> */}
                    </ul>
                  </div>

                  {links.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {links.map((l, i) => (
                        <a
                          key={i}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded border border-red-600/30 text-red-300 text-sm hover:bg-red-600/10 transition"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
