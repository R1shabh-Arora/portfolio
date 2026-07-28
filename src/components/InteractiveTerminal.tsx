// src/components/InteractiveTerminal.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";

type Line = { kind: "input" | "output" | "system"; text: string };

interface InteractiveTerminalProps {
  /** Lines typed out automatically before the prompt becomes interactive. */
  introText: string[];
}

const BLOG_URL = "https://blogs.rishabh.uk/";
const HTB_URL =
  "https://profile.hackthebox.com/profile/019e7e93-f3b7-72d9-a26c-2eff19879e39";

/** Scroll a section into view and return the confirmation line. */
function goTo(id: string, label: string): string {
  const el = document.getElementById(id);
  if (!el) return `${label}: section not found`;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return `Navigating to ${label}...`;
}

const COMMANDS: Record<string, () => string | string[]> = {
  help: () => [
    "Available commands:",
    "  whoami        who you're talking to",
    "  skills        core technical stack",
    "  certs         certifications and progress",
    "  projects      jump to the project gallery",
    "  experience    jump to work history",
    "  blog          open the writeups blog",
    "  htb           open my Hack The Box profile",
    "  contact       jump to the contact form",
    "  cv            download my CV",
    "  clear         wipe the terminal",
  ],
  whoami: () => [
    "rishabh_arora",
    "",
    "MEng Computer Science with Cyber Security, University of Southampton.",
    "Technical Specialist (Tier 2) at O2 Business, Bournemouth.",
    "Top 3% on TryHackMe across 150+ labs. Working the CPTS path on Hack The Box.",
    "Looking for junior pen test, red team, or SOC roles in the UK.",
  ],
  skills: () => [
    "offensive    pen testing, exploit dev, reverse engineering, OWASP Top 10",
    "defensive    detection engineering, SIEM, threat modelling, IDS design",
    "forensics    memory forensics, malware analysis, Volatility, Ghidra",
    "languages    Python, C/C++, Java, Bash, SQL, JavaScript",
    "infra        AWS, Docker, Linux, Raspberry Pi, firewalls",
  ],
  certs: () => [
    "[earned]       ISC2 Certified in Cybersecurity (CC)",
    "[earned]       ISO/IEC 27001:2022 Lead Implementer",
    "[earned]       TryHackMe Jr Penetration Tester",
    "[in progress]  CompTIA Security+",
    "[in progress]  HTB Academy CPTS",
    "[planned]      OSCP",
  ],
  projects: () => goTo("projects", "projects"),
  experience: () => goTo("experience", "work experience"),
  contact: () => goTo("contact", "contact"),
  education: () => goTo("education", "education"),
  blog: () => {
    window.open(BLOG_URL, "_blank", "noopener,noreferrer");
    return "Opening blogs.rishabh.uk...";
  },
  htb: () => {
    window.open(HTB_URL, "_blank", "noopener,noreferrer");
    return "Opening Hack The Box profile...";
  },
  cv: () => {
    const a = document.createElement("a");
    a.href = "./Rishabh_Arora.pdf";
    a.download = "Rishabh_Arora.pdf";
    a.click();
    return "Downloading Rishabh_Arora.pdf...";
  },
  sudo: () => "Nice try. You're not in the sudoers file. This incident will be reported.",
  exit: () => "There is no escape. Try 'help' instead.",
  ls: () => "projects/  skills/  certs/  blog/  contact/",
  pwd: () => "/home/rishabh/portfolio",
  date: () => new Date().toString(),
};

export default function InteractiveTerminal({ introText }: InteractiveTerminalProps) {
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Callers commonly pass an inline array literal, which would be a new
  // reference on every parent render and restart the typing effect. Key the
  // effect on the joined content instead so identity churn is harmless.
  const introKey = introText.join("\n");
  const script = useMemo(() => introKey.split("\n"), [introKey]);

  // Lets the intro be skipped from an event handler outside this effect.
  const skipRef = useRef<(() => void) | null>(null);

  /** Jump straight to the prompt, showing the intro in full. */
  function skipIntro() {
    skipRef.current?.();
  }

  // Type out the intro, then hand control to the user. The loop schedules
  // itself and keeps its cursor in local variables rather than state, so
  // unrelated parent re-renders cannot restart or stall it.
  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;
    let line = 0;
    let char = 0;

    setLines([]);
    setReady(false);

    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      if (timer !== undefined) clearTimeout(timer);
      setLines([
        ...script.map((text) => ({ kind: "output" as const, text })),
        { kind: "system" as const, text: "Type 'help' to see what I can do." },
      ]);
      setReady(true);
    };

    skipRef.current = finish;

    const step = () => {
      if (cancelled) return;

      if (line >= script.length) {
        setLines((l) => [
          ...l,
          { kind: "system", text: "Type 'help' to see what I can do." },
        ]);
        setReady(true);
        return;
      }

      const current = script[line];

      if (char < current.length) {
        char += 1;
        const text = current.slice(0, char);
        const idx = line;
        setLines((l) => {
          const next = [...l];
          if (next.length === idx) next.push({ kind: "output", text });
          else next[idx] = { kind: "output", text };
          return next;
        });
        timer = window.setTimeout(step, 22 + Math.random() * 28);
        return;
      }

      line += 1;
      char = 0;
      timer = window.setTimeout(step, 350);
    };

    timer = window.setTimeout(step, 200);

    return () => {
      cancelled = true;
      skipRef.current = null;
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [script]);

  // Keep the newest output in view.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    const next: Line[] = [{ kind: "input", text: raw }];

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    if (cmd === "") {
      setLines((l) => [...l, ...next]);
      return;
    }

    // Accept "cat skills.txt" and "ls projects" as aliases of the bare command.
    const key = cmd.replace(/^cat\s+/, "").replace(/\.txt$/, "").replace(/^ls\s+/, "").replace(/\/$/, "");
    const handler = COMMANDS[cmd] ?? COMMANDS[key];

    if (!handler) {
      next.push({ kind: "output", text: `command not found: ${cmd}. Try 'help'.` });
    } else {
      const out = handler();
      (Array.isArray(out) ? out : [out]).forEach((text) =>
        next.push({ kind: "output", text }),
      );
    }

    setLines((l) => [...l, ...next]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(value);
      if (value.trim()) {
        setHistory((h) => [value, ...h]);
        setHistoryIdx(-1);
      }
      setValue("");
      return;
    }

    // Up/down cycle through previously entered commands.
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(historyIdx + 1, history.length - 1);
      if (i >= 0 && history[i] !== undefined) {
        setHistoryIdx(i);
        setValue(history[i]);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = historyIdx - 1;
      setHistoryIdx(i);
      setValue(i >= 0 ? history[i] ?? "" : "");
    }
  }

  return (
    <div
      className="bg-black/80 border border-red-500/30 p-4 md:p-6 rounded-md w-full max-w-lg mx-auto font-mono text-left text-white/90 mb-12 cursor-text"
      onClick={() => {
        if (!ready) skipIntro();
        inputRef.current?.focus();
      }}
      role="region"
      aria-label="Interactive terminal"
    >
      {/* Window chrome */}
      <div className="flex items-center mb-4 border-b border-red-500/20 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
        <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
        <span className="text-xs text-white/50 ml-2">terminal</span>
      </div>

      <div className="text-green-500 mb-2">
        $ <span className="text-white/80">run intro.sh</span>
      </div>

      <div
        ref={scrollRef}
        className="min-h-[120px] max-h-[240px] overflow-y-auto flex flex-col text-sm scroll-smooth"
      >
        {lines.map((line, i) => (
          <div key={i} className="mb-1 whitespace-pre-wrap break-words">
            {line.kind === "input" ? (
              <span className="text-green-500">
                $ <span className="text-white/90">{line.text}</span>
              </span>
            ) : line.kind === "system" ? (
              <span className="text-yellow-400/80">{line.text}</span>
            ) : (
              <span className="text-green-400">{line.text}</span>
            )}
          </div>
        ))}

        {/* Live prompt, enabled once the intro finishes typing */}
        {ready && (
          <div className="flex items-center mt-1">
            <span className="text-green-500 mr-1">$</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input"
              className="flex-1 bg-transparent border-none outline-none text-white/90 font-mono text-sm caret-green-400 placeholder:text-white/25"
              placeholder="help"
            />
          </div>
        )}

        {!ready && (
          <div className="flex items-center gap-3 mt-1">
            <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" aria-hidden />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                skipIntro();
                inputRef.current?.focus();
              }}
              className="font-mono text-xs text-white/35 hover:text-white/70 underline underline-offset-2 transition focus:outline-none focus:ring-1 focus:ring-red-500 rounded"
            >
              skip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
