// src/components/HackTheBox.tsx
import React from "react";
import { Flame, ExternalLink } from "lucide-react";

/**
 * Public profile link. HTB public profiles are keyed by numeric user ID
 * (app.hackthebox.com/profile/<id>), not by handle — set this to the real ID
 * before relying on it. Left null so no broken link ever ships.
 */
const PROFILE_URL: string | null = null;
const HANDLE = "MuscularPigeon";

/**
 * HTB progression, synced manually from the profile page.
 *
 * HTB has no public read API for profile stats, so these are hand-updated.
 * Mechanics (see help.hackthebox.com "Hack The Box XP System"):
 *   - Rank advances every 15 levels, through 3 Grades (I -> III) per rank.
 *   - XP to next level scales exponentially; there is no level cap.
 *   - A weekly streak increments on >= 200 XP in a Mon 00:00 - Sun 23:59 UTC week.
 */
const stats = {
  level: 34,
  xpCurrent: 308,
  xpNext: 790,
  rank: "Skilled",
  grade: 1,
  gradesPerRank: 3,
  streakWeeks: 7,
  streakBest: 7,
  weeklyXp: 200,
  weeklyTarget: 200,
};

/** The seven HTB rank tiers, in order. Used to place `stats.rank` in context. */
const RANKS = [
  "Beginner",
  "Apprentice",
  "Skilled",
  "Professional",
  "Master",
  "Prodigy",
  "Grandmaster",
];

const languages = ["Python", "Java", "Bash"];

const rankIndex = RANKS.indexOf(stats.rank);
const xpPercent = Math.round((stats.xpCurrent / stats.xpNext) * 100);

/** Roman numerals for grade display — HTB shows grades as I / II / III. */
const roman = ["I", "II", "III"];

export default function HackTheBox() {
  return (
    <section
      id="htb"
      aria-labelledby="htb-heading"
      className="py-16 px-4 md:px-8 lg:px-16 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="htb-heading"
          className="text-2xl md:text-3xl font-mono text-red-600 mb-2 glitch-text"
        >
          <span className="relative">Hack_The_Box</span>
        </h2>
        <p className="text-sm text-gray-400 mb-8">
          Where the offensive security practice actually happens. Progression is
          earned by rooting machines and finishing Academy modules — not by
          watching tutorials.
        </p>

        <div className="rounded-md border border-[#9FEF00]/25 bg-gradient-to-b from-zinc-900/80 to-zinc-900/40 overflow-hidden">
          {/* Identity bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#9FEF00]/15 px-5 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[#9FEF00]/40 bg-[#9FEF00]/10 font-mono text-sm text-[#9FEF00]"
                aria-hidden
              >
                {"</>"}
              </span>
              <div>
                <p className="font-mono text-sm text-white leading-tight">
                  @{HANDLE}
                </p>
                <p className="font-mono text-xs text-gray-500 leading-tight">
                  Hack The Box · United Kingdom
                </p>
              </div>
            </div>

            {PROFILE_URL && (
              <a
                href={PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded border border-[#9FEF00]/40 px-3 py-1.5 font-mono text-xs text-[#9FEF00] transition hover:bg-[#9FEF00]/10 focus:outline-none focus:ring-2 focus:ring-[#9FEF00]/60"
              >
                View profile
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            )}
          </div>

          <div className="grid gap-6 p-5 md:grid-cols-5 md:p-6">
            {/* Level + XP progress */}
            <div className="md:col-span-3">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-mono text-4xl font-bold text-[#9FEF00] leading-none">
                  Lvl {stats.level}
                </span>
                <span className="font-mono text-sm text-white">
                  {stats.rank}
                  <span className="text-gray-500">
                    {" "}
                    · Grade {roman[stats.grade - 1]}
                  </span>
                </span>
              </div>
              <p className="font-mono text-xs text-gray-500 mb-4">
                {stats.xpCurrent} / {stats.xpNext} XP to level {stats.level + 1}
              </p>

              <div
                className="h-2 w-full overflow-hidden rounded-full bg-zinc-800"
                role="progressbar"
                aria-valuenow={stats.xpCurrent}
                aria-valuemin={0}
                aria-valuemax={stats.xpNext}
                aria-label={`Experience toward level ${stats.level + 1}`}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#9FEF00]/60 to-[#9FEF00]"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>

              {/* Rank ladder — puts "Skilled" in context for non-HTB readers */}
              <div className="mt-6">
                <p className="font-mono text-xs text-gray-500 mb-3">
                  Rank {rankIndex + 1} of {RANKS.length} · advances every 15
                  levels
                </p>
                <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
                  {RANKS.map((r, i) => {
                    const isCurrent = i === rankIndex;
                    const isPassed = i < rankIndex;
                    return (
                      <li key={r} className="flex items-center gap-1.5">
                        <span
                          className={`rounded px-2 py-1 font-mono text-[11px] transition ${
                            isCurrent
                              ? "border border-[#9FEF00]/50 bg-[#9FEF00]/15 text-[#9FEF00]"
                              : isPassed
                                ? "text-gray-400"
                                : "text-gray-700"
                          }`}
                          aria-current={isCurrent ? "step" : undefined}
                        >
                          {r}
                        </span>
                        {i < RANKS.length - 1 && (
                          <span className="text-gray-800" aria-hidden>
                            ›
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            {/* Stat tiles */}
            <div className="grid grid-cols-2 gap-3 md:col-span-2">
              <div className="rounded border border-red-600/20 bg-black/40 p-4">
                <p className="flex items-center gap-1.5 font-mono text-xs text-gray-500 mb-1">
                  <Flame className="h-3 w-3 text-[#9FEF00]" aria-hidden />
                  Streak
                </p>
                <p className="font-mono text-2xl text-white leading-none">
                  {stats.streakWeeks}
                  <span className="text-sm text-gray-500"> wks</span>
                </p>
                <p className="font-mono text-[11px] text-gray-600 mt-1">
                  matches personal best
                </p>
              </div>

              <div className="rounded border border-red-600/20 bg-black/40 p-4">
                <p className="font-mono text-xs text-gray-500 mb-1">
                  This week
                </p>
                <p className="font-mono text-2xl text-white leading-none">
                  {stats.weeklyXp}
                  <span className="text-sm text-gray-500">
                    /{stats.weeklyTarget}
                  </span>
                </p>
                <p className="font-mono text-[11px] text-[#9FEF00] mt-1">
                  target met
                </p>
              </div>

              <div className="col-span-2 rounded border border-red-600/20 bg-black/40 p-4">
                <p className="font-mono text-xs text-gray-500 mb-2">
                  Languages used
                </p>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded border border-gray-700 px-2 py-0.5 font-mono text-[11px] text-gray-300"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
