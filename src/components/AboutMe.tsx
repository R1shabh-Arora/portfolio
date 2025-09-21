// src/components/AboutMe.tsx
import React from "react";
import RishabhImg from "./Rishabh.jpg";

export default function AboutMe() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-16 bg-black text-white"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-10 items-start">
        {/* Left text content */}
        <div className="md:w-2/3">
          <h2 id="about-heading" className="text-3xl font-bold mb-6">
            Who Am I?
          </h2>

          <div className="space-y-4 leading-relaxed text-gray-300 font-sans">
            <p>
              I’m <span className="text-red-500 font-semibold">Rishabh Arora</span>,
              an MEng Computer Science graduate specialising in Cyber Security
              from the University of Southampton (2:1). I build resilient,
              hacker-aware systems that protect people and data — from tamper-
              resistant CCTV prototypes to SVM-based intrusion detection and
              hardened cloud deployments.
            </p>

            <p>
              I combine deep technical practice with practical delivery: I’ve
              led society workshops, maintained production VMs with 100% uptime,
              and shipped security-focused projects used for research and
              operational testing. I rank in the <strong>Top 8%</strong> (previously Top 3%) on
              TryHackMe with 60+ labs — a concrete signal of sustained,
              offensive-and-defensive skill development.
            </p>
          </div>

          <ul className="list-disc list-inside space-y-2 text-gray-400 mt-6">
            <li>
              <strong>Core stack:</strong> Python, Bash, Java, JavaScript, SQL —
              systems-first engineering.
            </li>
            <li>
              <strong>Security practice:</strong> Penetration testing, digital
              forensics, reverse engineering, threat modelling.
            </li>
            <li>
              <strong>Tools & infra:</strong> Kali, Burp Suite, Nmap, Wireshark,
              Metasploit, Docker, AWS EC2, Linux.
            </li>
            <li>
              <strong>Selected projects:</strong> Tamper-resistant CCTV (RSA +
              TLS + GDPR-safe key handling), SVM IDS for MANETs, secure AWS
              deployments and web app hardening.
            </li>
            <li>
              <strong>Leadership:</strong> Webmaster — Southampton Cyber Security
              Society: redesigned the site, ran workshops, and improved
              engagement & awareness.
            </li>
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 btn btn-primary focus-ring"
              aria-label="Contact Rishabh"
            >
              Let’s collaborate
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            <a
              href="https://tryhackme.com/p/Failed0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded border border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-400 transition"
            >
              TryHackMe Profile
            </a>
            <a
              href="https://app.hackthebox.com/profile/2508399"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded border border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-400 transition"
            >
              HackTheBox Profile
            </a>
          </div>
        </div>

        {/* Right image */}
        <div className="md:w-1/3 w-full flex justify-center">
          <figure className="overflow-hidden rounded-xl shadow-lg border border-gray-700 w-full max-w-sm">
            <img
              src={RishabhImg}
              alt="Rishabh Arora standing outdoors"
              className="w-full h-[500px] object-cover object-center"
              loading="lazy"
            />
            <figcaption className="sr-only">
              Rishabh Arora — Cybersecurity specialist
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
