// src/components/ContactInfo.tsx
import React from "react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

type ContactLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
  aria?: string;
};

const CONTACTS: ContactLink[] = [
  {
    href: "mailto:0.Rishabh.arora.0@gmail.com",
    label: "0.rishabh.arora.0@gmail.com",
    icon: <Mail className="h-4 w-4" aria-hidden />,
    aria: "Email address",
  },
  {
    href: "tel:+447831284705",
    label: "+44 7831 284705",
    icon: <Phone className="h-4 w-4" aria-hidden />,
    aria: "UK phone number",
  },
  {
    href: "tel:+919654488380",
    label: "+91 96544 88380",
    icon: <Phone className="h-4 w-4" aria-hidden />,
    aria: "India phone number",
  },
];

export default function ContactInfo() {
  return (
    <section
      id="contact-info"
      aria-labelledby="contact-info-heading"
      className="py-12"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h3
          id="contact-info-heading"
          className="text-xl font-semibold mb-6 text-white"
        >
          Contact Information
        </h3>

        {/* Single horizontal row for contacts + socials */}
        <div className="flex flex-wrap gap-4">
          {CONTACTS.map((c) => (
            <a
              key={c.href}
              href={c.href}
              className="inline-flex items-center gap-3 bg-white/5 border border-gray-700 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label={c.aria ?? c.label}
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/50 border border-gray-600">
                {c.icon}
              </span>
              <span className="text-sm text-gray-200">{c.label}</span>
            </a>
          ))}

          {/* Socials inline with the same style */}
          <a
            href="https://www.linkedin.com/in/R1shabh-Arora/"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-gray-700 hover:bg-white/10 transition"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-4 w-4" aria-hidden />
            <span className="text-sm text-gray-200 hidden sm:inline">LinkedIn</span>
          </a>

          <a
            href="https://github.com/R1shabh-Arora"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-gray-700 hover:bg-white/10 transition"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" aria-hidden />
            <span className="text-sm text-gray-200 hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
