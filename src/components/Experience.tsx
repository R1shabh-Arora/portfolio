import React from "react";

export interface ExperienceItem {
  id: string;
  year?: string;
  title: string;
  company?: string;
  location?: string;
  bullets?: string[];
  role?: string;
}

/**
 * Timeline-style Work Experience component.
 *
 * Layout approach:
 * - Use a fixed left column (48px) for the vertical line and the dot.
 * - The vertical line is absolutely positioned at left: 24px (left-6) so it sits
 *   exactly in the middle of the 48px column.
 * - Each list item is a two-column grid: first column centers the dot, second column is content.
 */
const Experience: React.FC<{ items?: ExperienceItem[] }> = ({
  items = [
    {
      id: "exp-2025",
      year: "2025",
      title: "Cybersecurity & System Developer (Contract)",
      company: "RBMS & Group",
      location: "Netaji Subhash Place, Delhi, India",
      role: "Contract",
      bullets: [
        "Built a secure intranet with hardened security measures.",
        "Developed an automatic attendance monitoring system with real-time camera capture at login.",
        "Implemented online submission of attendance with timestamps for accurate HR verification.",
        "Reduced HR overhead by automating attendance tracking and verification.",
      ],
    },
    {
      id: "exp-2024",
      year: "2024",
      title: "Webmaster — SUCSS",
      company: "Southampton University Cyber Security Society",
      location: "Southampton, UK",
      role: "Volunteer",
      bullets: [
        "Redesigned and maintained the society website — improved engagement by ~30%.",
        "Managed server administration and VM backups for term-time reliability.",
      ],
    },
  ],
}) => {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-20 px-4 md:px-8 lg:px-16 bg-black/90"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="experience-heading"
          className="text-2xl md:text-3xl font-mono text-red-600 mb-6"
        >
          <span className="relative">Work Experience</span>
        </h2>

        <p className="text-sm text-gray-400 mb-8">
          Professional projects and roles that shaped my hands-on expertise.
        </p>

        <div className="relative">
          {/* vertical line: positioned at 24px (left-6) which is the center of the 48px left column */}
          <div
            aria-hidden
            className="absolute left-6 top-0 bottom-0 w-px bg-red-600/30"
          />

          <ul className="space-y-12">
            {items.map((it) => (
              <li
                key={it.id}
                className="grid grid-cols-[48px_1fr] gap-4 items-start"
              >
                {/* left column: centers the dot */}
                <div className="flex items-start justify-center">
                  <span className="inline-flex items-center justify-center w-3 h-3 rounded-full bg-red-500 ring-2 ring-black/80 mt-1" />
                </div>

                {/* main content */}
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-white font-mono">
                        {it.title}
                      </h3>
                      {it.company && (
                        <div className="text-sm text-gray-400">
                          {it.company}
                          {it.location && (
                            <>
                              <span aria-hidden className="mx-2">
                                •
                              </span>
                              <span className="text-gray-400">{it.location}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-gray-500">{it.year}</div>
                  </div>

                  <div className="mt-3 text-sm text-zinc-300">
                    {it.role && (
                      <div className="mb-2 text-xs text-red-500 font-mono">
                        {it.role}
                      </div>
                    )}

                    {it.bullets && it.bullets.length > 0 ? (
                      <ul className="list-disc list-inside space-y-1">
                        {it.bullets.map((b, i) => (
                          <li key={i} className="text-gray-300 leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
