// src/components/Header.tsx
import React, { useEffect, useRef, useState } from "react";

const NAV = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Work Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "contact-info", label: "Contact Info" }, // optional
];

export default function Header() {
  const [active, setActive] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.hash.replace("#", "") || "home";
    }
    return "home";
  });

  // store last observed time to prefer most-visible section
  const visibilityRef = useRef<Record<string, number>>({});

  useEffect(() => {
    // IntersectionObserver to watch sections
    if (typeof window === "undefined") return;

    // Build list of elements to observe (only those that exist)
    const observedEls: Element[] = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as Element[];

    if (observedEls.length === 0) {
      // fallback: listen to hashchange only
      const onHash = () => setActive(window.location.hash.replace("#", "") || "home");
      window.addEventListener("hashchange", onHash);
      return () => window.removeEventListener("hashchange", onHash);
    }

    const observerOptions: IntersectionObserverInit = {
      root: null,
      // trigger when a chunk of the section is visible — tweak rootMargin to control sensitivity
      rootMargin: "-40% 0px -40% 0px",
      threshold: Array.from({ length: 21 }, (_, i) => i / 20), // many thresholds for accurate ratio
    };

    const observer = new IntersectionObserver((entries) => {
      // update visibilityRef with intersection ratios and timestamps
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          visibilityRef.current[id] = entry.intersectionRatio;
        } else {
          // set to 0 if not intersecting
          visibilityRef.current[id] = 0;
        }
      });

      // choose section with largest ratio
      let bestId = active;
      let bestRatio = 0;
      for (const key of Object.keys(visibilityRef.current)) {
        const r = visibilityRef.current[key] ?? 0;
        if (r > bestRatio) {
          bestRatio = r;
          bestId = key;
        }
      }

      if (bestId && bestId !== active) {
        setActive(bestId);
        // don't push browser history excessively; use replaceState to keep hash in sync optionally
        if (window && window.history && window.location.hash.replace("#", "") !== bestId) {
          // update hash without scrolling
          window.history.replaceState(null, "", `#${bestId}`);
        }
      }
    }, observerOptions);

    // initialize visibilityRef and observe
    observedEls.forEach((el) => {
      visibilityRef.current[el.id] = 0;
      observer.observe(el);
    });

    // also fallback to hashchange for direct links
    const onHash = () => setActive(window.location.hash.replace("#", "") || "home");
    window.addEventListener("hashchange", onHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHash);
    };
  }, [active]);

  return (
    <>
      {/* Skip link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only absolute left-4 top-4 z-50 px-3 py-2 bg-white text-black rounded"
      >
        Skip to content
      </a>

      <header
        className="fixed w-full top-0 z-50 bg-black/90 text-white backdrop-blur border-b border-red-600/30"
        role="banner"
        aria-label="Primary"
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          {/* Branding - clickable to top */}
          <div className="flex flex-col">
            <a
              href="#home"
              className="text-lg font-bold text-white hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
              aria-label="Go to top of page"
            >
              Rishabh Arora
            </a>
            <span className="text-xs text-gray-400">
              MEng Computer Science with Cyber Security
            </span>
          </div>

          {/* Desktop nav */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 text-sm"
          >
            {NAV.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-3 py-1 rounded transition ${
                    isActive
                      ? "bg-red-600/20 text-red-400 border border-red-600/40"
                      : "text-gray-300 hover:text-white hover:underline"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile nav */}
          <div className="md:hidden">
            <details className="relative">
              <summary className="cursor-pointer px-3 py-1 border border-gray-700 rounded text-white bg-black/70">
                Menu
              </summary>
              <div className="absolute right-0 mt-2 bg-black/95 border border-gray-700 rounded shadow p-3 w-48 z-50">
                {NAV.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block px-3 py-2 rounded hover:bg-white/10 text-gray-200"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}
