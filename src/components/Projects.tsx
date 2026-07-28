// src/components/Projects.tsx
import React from 'react';

interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  date: string;
  type?: string; // e.g. 'Contract', 'Volunteer', 'Intern'
  bullets: string[];
}

/**
 * Work Experience section
 * - Uses semantic elements and a simple visual timeline.
 * - Keep this file data-driven so content can come from `data.ts` later.
 */
const experiences: ExperienceItem[] = [
  {
    id: 'o2-2025',
    role: 'Technical Specialist (Tier 2)',
    org: 'O2 Business',
    date: 'Oct 2025 – Present',
    type: 'Bournemouth',
    bullets: [
      "Triage and resolve escalated incidents across voice, data, and network layers, performing root-cause analysis on connectivity, authentication, and configuration faults.",
      "Investigate network anomalies using packet captures, log analysis, and diagnostic tools, skills that translate directly to SOC and incident response workflows.",
      "Configure and harden client network systems including firewall rules, VPN tunnels, and VoIP security settings, applying defence-in-depth principles.",
      "Document technical findings and remediation steps to support knowledge sharing and repeatable incident response.",
    ],
  },
  {
    id: 'soton-supervisor-2025',
    role: 'Project Supervisor',
    org: 'University of Southampton',
    date: 'Jan – May 2025',
    type: 'Leadership & Mentoring',
    bullets: [
      "Supervised second-year student teams through an Agile software engineering project, guiding them across full development cycles.",
      "Provided weekly feedback and assessed deliverables to maintain consistent progress and quality.",
      "Represented the customer in stand-ups and sprint planning, helping teams align with user needs and project goals.",
    ],
  },
  {
    id: 'sucss-2023',
    role: 'Webmaster',
    org: 'Southampton University Cyber Security Society (SUCSS)',
    date: '2023 – 2024',
    type: 'Volunteer',
    bullets: [
      "Maintained and improved the society website and flag-tracking services.",
      "Implemented regular backups and ensured 100% term-time uptime.",
      "Optimised site reliability and usability to support events and competitions.",
    ],
  },
  {
    id: 'isolutions-2023',
    role: 'Analyst',
    org: 'iSolutions, University of Southampton',
    date: 'Aug – Sep 2023',
    type: 'IT Support & Operations',
    bullets: [
      "Migrated office comms to Microsoft Teams and trained staff through the transition.",
      "Maintained the project database, ensuring data accuracy and accessibility.",
      "Supported ticket resolution and coordinated tasks across IT teams.",
    ],
  },
  {
    id: 'soton-ambassador-2023',
    role: 'Student Ambassador',
    org: 'University of Southampton',
    date: 'Jun 2023 – Oct 2025',
    type: 'Outreach & Public Speaking',
    bullets: [
      "Delivered talks and answered live questions, explaining cybersecurity concepts to non-technical audiences.",
      "Engaged prospective students and shared experience to support informed decisions about their studies.",
    ],
  },
  {
    id: 'activpoints-2023',
    role: 'Developer',
    org: 'ActivPoints UK Limited',
    date: 'Apr – Jun 2023',
    type: 'Cloud & Web Development',
    bullets: [
      "Deployed and stabilised React applications across AWS EC2 and cPanel-managed infrastructure.",
      "Resolved deployment and authentication issues, and hardened server configurations.",
      "Built frontend features in React and JavaScript, and documented deployment steps for the team.",
    ],
  },
];


export default function WorkExperience(): JSX.Element {
  return (
    <section
      id="experience"
      aria-label="Work experience"
      className="py-12"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading is provided by the AnimatedSection in home.tsx.
            Keep a hidden heading for accessibility. */}
        <h2 className="sr-only">Work Experience</h2>


        <div className="relative">
          {/* vertical line for timeline (visible on md+) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-6 top-6 bottom-6 w-px bg-red-600/30"
            style={{ transform: 'translateX(-50%)' }}
          />
          <div className="space-y-8">
            {experiences.map((exp) => (
              <article
                key={exp.id}
                className="pl-10 md:pl-16 relative"
                tabIndex={0}
                aria-labelledby={`${exp.id}-role`}
                role="article"
              >
                {/* timeline dot */}
                <div
                  className="absolute left-6 md:left-6 top-2 md:top-4 w-3 h-3 rounded-full bg-red-500"
                  style={{ transform: "translateX(-50%)" }}
                  aria-hidden="true"
                />


                <div className="flex justify-between items-start">
                  <div>
                    <h3 id={`${exp.id}-role`} className="font-semibold text-lg text-gray-50">
                      {exp.role}
                      {exp.type ? <span className="ml-2 text-sm text-gray-500"> — {exp.type}</span> : null}
                    </h3>
                    <div className="text-sm text-gray-300">{exp.org}</div>
                  </div>

                  <div className="text-sm text-gray-500 ml-4">{exp.date}</div>
                </div>

                <ul className="mt-3 list-disc list-inside text-gray-300 space-y-1">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="text-sm">
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
