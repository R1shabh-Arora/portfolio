import React from "react";

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
      </div>
    </section>
  );
};

export default Education;
