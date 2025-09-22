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

  // mobile menu open state
  const [open, setOpen] = useState(false);

  // store last observed visibility ratios
  const visibilityRef = useRef<Record<string, number>>({});

  // ref for mobile menu and open button (for outside click & focus)
  const menuRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Build list of elements to observe (only those that exist)
    const observedEls: Element[] = NAV.map((n) =>
      document.getElementById(n.id),
    ).filter(Boolean) as Element[];

    if (observedEls.length === 0) {
      // fallback: listen to hashchange only
      const onHash = () =>
        setActive(window.location.hash.replace("#", "") || "home");
      window.addEventListener("hashchange", onHash);
      return () => window.removeEventListener("hashchange", onHash);
    }

    const observerOptions: IntersectionObserverInit = {
      root: null,
      // trigger when a chunk of the section is visible — tweak rootMargin to control sensitivity
      rootMargin: "-40% 0px -40% 0px",
      threshold: Array.from({ length: 21 }, (_, i) => i / 20), // many thresholds for accurate ratio
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // update visibilityRef with intersection ratios
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            visibilityRef.current[id] = entry.intersectionRatio;
          } else {
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
          // update hash without scrolling
          if (
            window &&
            window.history &&
            window.location.hash.replace("#", "") !== bestId
          ) {
            window.history.replaceState(null, "", `#${bestId}`);
          }
        }
      },
      observerOptions,
    );

    // initialize visibilityRef and observe
    observedEls.forEach((el) => {
      visibilityRef.current[el.id] = 0;
      observer.observe(el);
    });

    // also fallback to hashchange for direct links
    const onHash = () =>
      setActive(window.location.hash.replace("#", "") || "home");
    window.addEventListener("hashchange", onHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHash);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // close menu on Escape and close when clicking outside
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const onClickOutside = (e: MouseEvent) => {
      if (!open) return;
      const target = e.target as Node | null;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        btnRef.current &&
        !btnRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  // ensure menu closes when navigating via hash links (useful for mobile)
  useEffect(() => {
    const onNav = () => setOpen(false);
    window.addEventListener("hashchange", onNav);
    return () => window.removeEventListener("hashchange", onNav);
  }, []);

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
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between h-14">
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
                  className={`px-3 py-1 rounded transition focus:outline-none focus:ring-2 focus:ring-red-500 ${
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

          {/* Mobile nav (hamburger) */}
          <div className="md:hidden">
            <button
              ref={btnRef}
              aria-controls="mobile-menu"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((s) => !s)}
              className="inline-flex items-center justify-center p-2 rounded-md border border-gray-700 bg-black/70 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {/* Icon: simple hamburger / X */}
              {open ? (
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

            {/* Mobile panel */}
            <div
              ref={menuRef}
              id="mobile-menu"
              className={`absolute right-4 top-14 mt-2 w-56 z-50 transform origin-top-right transition-all duration-200 shadow-lg rounded-md overflow-hidden ${
                open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
              }`}
            >
              <div className="bg-black/95 border border-gray-700 rounded-md p-2">
                {NAV.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className={`block px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        isActive ? "bg-red-600/20 text-red-400" : "text-gray-200 hover:bg-white/5"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
