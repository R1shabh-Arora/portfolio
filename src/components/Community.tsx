// src/components/Community.tsx
import React from "react";
import { MapPin } from "lucide-react";

type Event = {
  id: string;
  name: string;
  location: string;
  date: string;
  note: string;
};

/**
 * UK infosec conference circuit. Ordered most recent first to match the
 * Work Experience and Education timelines elsewhere on the page.
 */
const events: Event[] = [
  {
    id: "bsides-basingstoke",
    name: "BSides Basingstoke",
    location: "Basingstoke",
    date: "Jul 2026",
    note: "Community-run security conference on the UK BSides circuit.",
  },
  {
    id: "steelcon-2026",
    name: "SteelCon 2026",
    location: "Sheffield",
    date: "Jul 2026",
    note: "Talks on adversary tradecraft and hacker history, plus a hands-on red team simulation workshop.",
  },
  {
    id: "infosec-europe",
    name: "Infosecurity Europe",
    location: "London",
    date: "Jun 2026",
    note: "Conversations across SOC operations, threat hunting, GRC, and incident response.",
  },
  {
    id: "bsides-leeds",
    name: "BSides Leeds",
    location: "Leeds",
    date: "Jun 2026",
    note: "Hands-on villages and talks on blending in with defensive tooling.",
  },
  {
    id: "blackhat-eu-2025",
    name: "Black Hat Europe",
    location: "ExCeL London",
    date: "Dec 2025",
    note: "Arsenal Labs demos from security researchers across the world.",
  },
  {
    id: "ice-2025",
    name: "International Cyber Expo",
    location: "Olympia London",
    date: "Oct 2025",
    note: "Industry showcase of emerging security tooling and research.",
  },
];

export default function Community() {
  return (
    <section
      id="community"
      aria-labelledby="community-heading"
      className="py-16 px-4 md:px-8 lg:px-16 bg-black/90"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="community-heading"
          className="text-2xl md:text-3xl font-mono text-red-600 mb-2 glitch-text"
          data-text="Community_"
        >
          <span className="relative">Community_</span>
        </h2>
        <p className="text-sm text-gray-400 mb-10">
          Active on the UK infosec conference circuit. The hallway track is where
          most of the learning happens.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((ev) => (
            <article
              key={ev.id}
              className="rounded-md border border-red-600/20 bg-gradient-to-b from-zinc-900/80 to-zinc-900/50 p-5 transition hover:border-red-500/50"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-mono text-sm text-white leading-snug">{ev.name}</h3>
                <span className="shrink-0 font-mono text-xs text-gray-500">{ev.date}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-red-400/80 mb-3">
                <MapPin className="h-3 w-3" aria-hidden />
                <span>{ev.location}</span>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">{ev.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
