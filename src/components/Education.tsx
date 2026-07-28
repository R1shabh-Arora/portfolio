import React from "react";

type CertItem = {
  id: string;
  name: string;
  issuer: string;
  status?: "in-progress" | "planned";
};

const defaultCerts: CertItem[] = [
  { id: "cert-cc", name: "Certified in Cybersecurity (CC)", issuer: "ISC²" },
  { id: "cert-27001", name: "ISO/IEC 27001:2022 Lead Implementer", issuer: "ISO" },
  { id: "cert-jpt", name: "Jr Penetration Tester", issuer: "TryHackMe" },
  { id: "cert-sec+", name: "CompTIA Security+", issuer: "CompTIA", status: "in-progress" },
  { id: "cert-cpts", name: "Certified Penetration Testing Specialist (CPTS)", issuer: "HTB Academy", status: "in-progress" },
  { id: "cert-oscp", name: "OSCP", issuer: "OffSec", status: "planned" },
];

type SimItem = { id: string; name: string; org: string; focus: string };

const jobSimulations: SimItem[] = [
  {
    id: "sim-deloitte",
    name: "Cyber Job Simulation",
    org: "Deloitte Australia",
    focus: "Web server log analysis and breach investigation support",
  },
  {
    id: "sim-aig",
    name: "Shields Up: Cybersecurity",
    org: "AIG",
    focus: "Threat analysis, vulnerability management, Python scripting",
  },
  {
    id: "sim-tata",
    name: "Cybersecurity Analyst Simulation",
    org: "Tata",
    focus: "Identity and access management, technical documentation",
  },
];

export interface EducationItem {
  id: string;
  year?: string;
  title: string;
  institution?: string;
  location?: string;
  note?: string;
}

/**
 * Education timeline component — dark theme, timeline style to match the rest of the site.
 */
const defaultItems: EducationItem[] = [
  {
    id: "edu-meng",
    year: "2021 – 2025",
    title: "MEng Computer Science with Cyber Security",
    institution: "University of Southampton, UK",
    note:
      "Graduated with 2:1 (Upper Second-Class Honours)",
  },
    {
    id: "edu-xii",
    year: "2020 – 2021",
    title: "Class XII",
    institution: "Bhatnagar International School, India",
    note: "Major: Science — Score: 87%",
  },
  {
    id: "edu-x",
    year: "2018 – 2019",
    title: "Class X",
    institution: "Bhatnagar International School, India",
    note: "General Studies — Score: 88%",
  },
];

const Education: React.FC<{ items?: EducationItem[] }> = ({ items = defaultItems }) => {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="py-20 px-4 md:px-8 lg:px-16 bg-black/90"
    >
      <div className="max-w-7xl mx-auto">
        <h2 id="education-heading" className="text-2xl md:text-3xl font-mono text-red-600 mb-6">
          {/* Education_ */}
        </h2>
        <p className="text-sm text-gray-400 mb-8">
          My academic journey and qualifications.
        </p>

        <div className="relative">
          {/* vertical line placed at left:6 (center of 48px column) */}
          <div aria-hidden className="absolute left-6 top-0 bottom-0 w-px bg-red-600/30" />

          <ul className="space-y-12">
            {items.map((it) => (
              <li key={it.id} className="grid grid-cols-[48px_1fr] gap-4 items-start">
                {/* left column — dot */}
                <div className="flex items-start justify-center">
                  <span
                    className="inline-flex items-center justify-center w-3 h-3 rounded-full bg-red-500 ring-2 ring-black/80 mt-1"
                    aria-hidden
                  />
                </div>

                {/* content */}
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-white font-mono">
                        {it.title}
                      </h3>
                      {it.institution && (
                        <div className="text-sm text-gray-400">
                          {it.institution}
                          {it.location && (
                            <>
                              <span aria-hidden className="mx-2">•</span>
                              <span className="text-gray-400">{it.location}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="text-sm text-gray-500">{it.year}</div>
                  </div>

                  {it.note && (
                    <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                      {it.note}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Certifications */}
        <div className="mt-16">
          <h3 className="text-lg font-mono text-red-500 mb-6 tracking-wide">Certifications_</h3>
          <ul className="space-y-3">
            {defaultCerts.map((cert) => (
              <li
                key={cert.id}
                className="flex items-center justify-between gap-4 rounded-md border border-red-600/20 bg-zinc-900/60 px-5 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`inline-block w-2 h-2 rounded-full shrink-0 ${
                      cert.status ? "bg-zinc-600" : "bg-red-500"
                    }`}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <span className="font-mono text-sm text-white">{cert.name}</span>
                    <span className="ml-2 text-xs text-gray-500">{cert.issuer}</span>
                  </div>
                </div>

                {cert.status === "in-progress" && (
                  <span className="shrink-0 text-xs font-mono text-yellow-400 border border-yellow-400/30 rounded px-2 py-0.5">
                    In Progress
                  </span>
                )}
                {cert.status === "planned" && (
                  <span className="shrink-0 text-xs font-mono text-gray-500 border border-gray-600/40 rounded px-2 py-0.5">
                    Planned
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Applied job simulations */}
        <div className="mt-12">
          <h3 className="text-lg font-mono text-red-500 mb-2 tracking-wide">Job_Simulations_</h3>
          <p className="text-sm text-gray-400 mb-6">
            Industry-run programmes completed through Forage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {jobSimulations.map((sim) => (
              <div
                key={sim.id}
                className="rounded-md border border-red-600/20 bg-zinc-900/60 p-4"
              >
                <div className="font-mono text-sm text-white">{sim.org}</div>
                <div className="text-xs text-red-400/80 mt-1">{sim.name}</div>
                <p className="text-xs text-gray-400 mt-3 leading-relaxed">{sim.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
