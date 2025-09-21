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
    role: 'Project Assistant',
    org: 'iSolutions',
    date: 'Aug – Sep 2023',
    type: 'IT Support & Operations',
    bullets: [
      "Migrated office comms to Microsoft Teams and trained staff.",
      "Maintained project database, ensuring data accuracy and accessibility.",
      "Supported ticket resolution and coordinated tasks across IT teams.",
    ],
  },
  {
    id: 'activpoints-2023',
    role: 'Intern',
    org: 'ActivPoints',
    date: 'Apr – Jun 2023',
    type: 'Cloud & DevOps',
    bullets: [
      "Deployed and stabilised React apps across AWS EC2 and Heroku.",
      "Resolved deployment/authentication issues and hardened servers.",
      "Integrated Postgres DB, documented deployment steps, and flagged credential risks.",
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
