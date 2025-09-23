import React from "react";

type SkillsSection = {
  id: string;
  title: string;
  emoji?: string;
  items: string[];
};

export const sections: SkillsSection[] = [
  {
    id: "sec-cyber",
    emoji: "🛡️",
    title: "Offensive & Defensive",
    items: [
      "Pen Testing",
      "Exploit Dev",
      "Reverse Eng",
      "Malware Analysis",
      "Forensics",
      "DFIR",
      "IDS Design",
      "Threat Modelling",
    ],
  },
  {
    id: "sec-programming",
    emoji: "💻",
    title: "Programming",
    items: ["Python", "C / C++", "Java", "Bash", "SQL", "JavaScript", "Haskell", "DSA"],
  },
  {
    id: "sec-infra",
    emoji: "☁️",
    title: "Cloud & Embedded",
    items: [
      "AWS",
      "Docker",
      "VMs",
      "Linux",
      "Raspberry Pi",
      "Pico",
      "SDR",
      "Firewalls",
    ],
  },
  {
    id: "sec-web",
    emoji: "🌐",
    title: "Web & App",
    items: ["React", "Node.js", "PHP", "Burp", "TLS", "Auth", "Frontend"],
  },
  {
    id: "sec-tools",
    emoji: "🧰",
    title: "Tooling",
    items: [
      "Wireshark",
      "Nmap",
      "Metasploit",
      "John",
      "OSINT",
      "Dashboards",
      "Volatility",
      "Ghidra",
    ],
  },
];


/**
 * Toolbox / Skills section.
 *
 * - Uses a responsive grid of cards that match the project's dark theme.
 * - Each card contains a heading and a list of small "chips" (badges).
 */
export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-20 px-4 md:px-8 lg:px-16 bg-black"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 id="skills-heading" className="text-3xl md:text-4xl font-bold text-white mb-2">
          My Toolbox
        </h2>
        <p className="text-sm text-gray-400 max-w-2xl mx-auto mb-10">
          Technologies and tools I work with to build secure and efficient solutions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border border-red-600/20 bg-gradient-to-b from-zinc-900/80 to-zinc-900/60 p-6 shadow-sm"
              role="region"
              aria-labelledby={`${s.id}-title`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl" aria-hidden>
                  {s.emoji}
                </span>
                <h3 id={`${s.id}-title`} className="text-lg font-semibold text-white">
                  {s.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-gray-200 bg-zinc-800/60 border border-zinc-700"
                    role="listitem"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
