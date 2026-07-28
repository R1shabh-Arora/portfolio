// src/components/BlogFeed.tsx
import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { BLOG_URL, BLOG_FEED_URL as FEED_URL } from "@/lib/profiles";

const MAX_POSTS = 3;

type Post = {
  title: string;
  link: string;
  date: string;
  summary: string;
};

/** Strip HTML tags and collapse whitespace into a short plain-text excerpt. */
function excerpt(html: string, max = 180): string {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "...";
}

function formatDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Latest writeups pulled live from the Jekyll Atom feed at blogs.rishabh.uk.
 * The feed serves `access-control-allow-origin: *`, so it is fetched directly
 * in the browser with no proxy. Renders nothing if the feed is unreachable.
 */
export default function BlogFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(FEED_URL, { headers: { Accept: "application/xml" } });
        if (!res.ok) throw new Error(`Feed responded ${res.status}`);

        const xml = new DOMParser().parseFromString(await res.text(), "application/xml");
        if (xml.querySelector("parsererror")) throw new Error("Malformed feed");

        // Atom uses <entry>; RSS uses <item>. Support both.
        const nodes = Array.from(xml.querySelectorAll("entry, item")).slice(0, MAX_POSTS);

        const parsed: Post[] = nodes.map((n) => {
          const link =
            n.querySelector("link")?.getAttribute("href") ??
            n.querySelector("link")?.textContent ??
            BLOG_URL;
          return {
            title: n.querySelector("title")?.textContent?.trim() ?? "Untitled",
            link,
            date:
              n.querySelector("published")?.textContent ??
              n.querySelector("updated")?.textContent ??
              n.querySelector("pubDate")?.textContent ??
              "",
            summary: excerpt(
              n.querySelector("summary")?.textContent ??
                n.querySelector("content")?.textContent ??
                n.querySelector("description")?.textContent ??
                "",
            ),
          };
        });

        if (!cancelled) {
          setPosts(parsed);
          setState("ready");
        }
      } catch {
        if (!cancelled) setState("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Fail quietly rather than showing a broken section to visitors.
  if (state === "error") return null;

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="py-16 px-4 md:px-8 lg:px-16 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="blog-heading"
          className="text-2xl md:text-3xl font-mono text-red-600 mb-2 glitch-text"
          data-text="Latest_Writeups"
        >
          <span className="relative">Latest_Writeups</span>
        </h2>
        <p className="text-sm text-gray-400 mb-8">
          Machine writeups and research notes, pulled live from my blog.
        </p>

        {state === "loading" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-hidden>
            {Array.from({ length: MAX_POSTS }).map((_, i) => (
              <div
                key={i}
                className="rounded-md border border-red-600/20 bg-zinc-900/40 p-5 animate-pulse"
              >
                <div className="h-3 w-20 bg-zinc-800 rounded mb-4" />
                <div className="h-4 w-3/4 bg-zinc-800 rounded mb-3" />
                <div className="h-3 w-full bg-zinc-800/70 rounded mb-2" />
                <div className="h-3 w-5/6 bg-zinc-800/70 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <a
                key={post.link}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-md border border-red-600/20 bg-gradient-to-b from-zinc-900/80 to-zinc-900/50 p-5 transition hover:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <span className="font-mono text-xs text-gray-500 mb-3">
                  {formatDate(post.date)}
                </span>
                <h3 className="font-mono text-sm text-white mb-3 leading-snug group-hover:text-red-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed flex-1">
                  {post.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-red-500">
                  read
                  <ArrowUpRight
                    className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </a>
            ))}
          </div>
        )}

        <a
          href={BLOG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-gray-300 border border-gray-700 rounded px-4 py-2 hover:border-red-500 hover:text-red-400 transition focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          $ ls ~/blog
        </a>
      </div>
    </section>
  );
}
