import React from "react";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import ProjectGallery from "./ProjectGallery";
import ContactSection from "./ContactSection";
import WorkExperience from "./Projects";
import Skills from "./Skills";
import Education from "./Education";
import AnimatedSection from "./AnimatedSection";
import AboutMe from "./AboutMe";
import ContactInfo from "./ContactInfo";
import Header from "./header";
import FadeIn from "./FadeIn";

const Home: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen bg-black text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Header />

      {/* Scanline overlay effect */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-scanline opacity-10" />

      {/* Hero Section */}
      <FadeIn direction="up" distance={28} delay={0} once={false}>
        <HeroSection
          title="Rishabh Arora – Cyber Security Enthusiast"
          subtitle="The top one percent of the one percent, the ones in control, the ones who play God without permission, and now I'm gonna take them down."
          introText={[
            " Hello friend,  I live with a hacker’s mindset,  question everything, act when others don’t, and keep pushing limits.",
          ]}
        />
      </FadeIn>

      {/* Experience (timeline) */}
      <AnimatedSection
        id="experience"
        className="my-20 mx-4 md:mx-8 lg:mx-16 bg-black/90"
        heading={
          <FadeIn direction="left" distance={32} delay={0.02} once={false}>
            <h2
              className="text-2xl md:text-3xl font-mono text-red-600 mb-8 glitch-text"
              id="experience-heading"
            >
              <span className="relative">Work Experience</span>
            </h2>
          </FadeIn>
        }
        headingId="experience-heading"
        // replayOnView={true}
        // replayOnHover={true}
        // fadeOutOnScroll={true}
      >
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up" distance={22} delay={0.04} once={false}>
            <WorkExperience />
          </FadeIn>
        </div>
      </AnimatedSection>

      {/* Project Gallery Section */}
      <AnimatedSection
        id="projects"
        className="my-1 mx-4 md:mx-8 lg:mx-16"
        heading={
          <FadeIn direction="left" distance={40} delay={0.04} once={false}>
            <h2
              className="text-2xl md:text-3xl font-mono text-red-600 mb-12 glitch-text"
              id="projects-heading"
            >
              <span className="relative">Projects_</span>
            </h2>
          </FadeIn>
        }
        headingId="Projects"
      >
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up" distance={28} delay={0.06} once={false}>
            <ProjectGallery
              projects={[
                {
                  id: "1",
                  title: "Secure_CCTV_System",
                  description: "Tamper-resistant CCTV prototype for treaty verification.",
                  longDescription:
                    "Developed in collaboration with AWE as part of my final year group project. I conducted the full threat analysis, identifying vulnerabilities such as replay attacks, insider threats, and side-channel risks, and proposed mitigations including timestamped handshakes, secure key storage, and tamper-proof enclosures. I designed and 3D-printed a tamper-proof case in Autodesk Fusion 360, assisted the hardware team with integration, and contributed a personal Raspberry Pi 3 for prototyping. I also authored key sections of the threat analysis and final reports presented to AWE. The deployed prototype featured two live camera nodes and secure data transmission with TLS and digital signatures, resilient against denial-of-service and insider attacks.",
                  image: "./CCTV.jpeg",
                  tags: [
                    "Threat Analysis",
                    "TLS",
                    "RFSA",
                    "3D Printing",
                    "Fusion 360",
                    "Raspberry Pi",
                  ],
                  role: "Threat Analysis & Hardware Design",
                  date: "2024 - 2025",
                  ownership: "Group",
                  links: [
                    {
                      label: "Individual Report (PDF)",
                      url: "/ELEC6200__Individual_Design_Report.pdf",
                    },
                    { label: "Group Report (PDF)", url: "/GDP_Group_Report.pdf" },
                  ],
                },
                {
                  id: "2",
                  title: "MANET_IDS",
                  description: "SVM-based Intrusion Detection System for Mobile Ad-hoc Networks",
                  longDescription:
                    "This project explores machine-learning based intrusion detection for Mobile Ad-hoc Networks (MANETs). I created NS3 simulations modelling dynamic MANET topologies and greyhole (selective packet-drop) attacks, then mapped simulation outputs to a practical IDS workflow using the UNSW-NB15 dataset. I built data preprocessing pipelines (one-hot encoding, min-max scaling), trained/support-vector-machine classifiers (RBF kernel), and automated per-feature impact analysis to quantify the trade-off between model complexity and detection accuracy. Results highlight a compact feature subset that preserves detection performance while reducing computational cost — a key outcome for resource-constrained MANET deployments (e.g., emergency comms, battlefield networks). The work includes full methodology, scripts for feature extraction/automation, hyperparameter tuning, evaluation (precision/recall/F1), and reproducible report artifacts.",
                  image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80",
                  tags: ["NS3", "SVM", "C++", "Network Simulation", "Feature Engineering", "Python"],
                  role: "Network Simulation & Machine Learning",
                  date: "2024 - 2025",
                  ownership: "Individual",
                  links: [
                    {
                      label: "Read full report (PDF)",
                      url: "/Final_Project_Report.pdf",
                    },
                    {
                      label: "GitHub Repository",
                      url: "https://github.com/R1shabh-Arora/ns3-allinone-3.40",
                    },
                  ],
                },
                {
                  id: "3",
                  title: "Runway_Re-declaration_Tool",
                  description: "Java-based aviation safety tool applying Agile workflows.",
                  longDescription:
                    "Built a professional-grade software tool in JavaFX to support airport staff in safely re-declaring runways after obstacles or maintenance events. Our Agile team delivered 23 user stories across multiple sprints, producing a sleek, functional tool praised as 'professional' by supervisors. I contributed to both design and implementation — developing secure XML serialization with AES encryption, debugging complex JavaFX UI components, and ensuring the system packaged as a cross-platform JAR. I also participated in Agile ceremonies (Planning Poker, sprint reviews, burndown tracking) and produced design artifacts (UML, Figma mockups) to support collaboration. The final product can model airports, runways, and obstacles, run recalculations instantly, and provide safety-critical outputs emulating real aviation operations.",
                  image: "./runway.png",
                  tags: ["Java", "JavaFX", "Agile", "JUnit", "CI/CD", "AES Encryption", "Figma", "LucidChart"],
                  role: "Developer & Agile Team Member",
                  date: "2022 – 2023",
                  ownership: "Group",
                  links: [{ label: "Project Report (PDF)", url: "/SEG_Handin_4.pdf" }],
                },
                {
                  id: "4",
                  title: "TetrECS_Game",
                  description: "JavaFX real-time block-placement game.",
                  longDescription:
                    "TetrECS is a performant Java/JavaFX puzzle game I built to demonstrate applied systems and UI engineering: a fast-paced 5×5 block-placement game with score multipliers, level progression, animations, sound, and both local and networked multiplayer support. I implemented core game mechanics (piece generation, rotation, placement validation, horizontal/vertical line-clear detection), a responsive JavaFX UI (custom components, canvas rendering, animated tile clear effects), multimedia (looping background music + sfx), and robust game loop/timers to drive difficulty scaling. For networking, the game integrates a Communicator protocol to request pieces and exchange scores with a multiplayer server and supports an online lobby/leaderboard. The project emphasizes separation of model/view (observable properties/listeners), automated testing-friendly design, and production packaging via Maven/JavaFX. It’s a complete coursework-style product that highlights real-time systems, UI polish, and networked game-state engineering.",
                  image: "./tetrecs.png",
                  tags: ["Java", "JavaFX", "Game Dev", "Networking", "Animation", "Multimedia"],
                  role: "JavaFX Game Development",
                  date: "2021 - 2022",
                  ownership: "Individual",
                  links: [{ label: "Source (GitHub)", url: "https://github.com/R1shabh-Arora/TetrECS" }],
                },
                {
                  id: "5",
                  title: "Network_Traffic_Analyser",
                  description: "Raspberry Pi–based packet capture and real-time traffic visualisation dashboard.",
                  longDescription:
                    "Developed a network traffic analyser deployed on a Raspberry Pi 3 to capture live packets and provide real-time analytics through a web dashboard. Built the capture pipeline using tshark (Wireshark CLI) for packet acquisition, a Python back-end for parsing and statistical analysis, and socket.io with Chart.js for dynamic visualisation. The tool highlights bandwidth usage, protocol distribution, and anomalous flows, making it suitable for security monitoring in constrained environments. I automated deployment with shell scripts, enabling rapid start-up and hands-free operation. This project strengthened my expertise in low-level networking, embedded security appliances, and presenting complex data in accessible visual formats.",
                  image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
                  tags: ["Networking", "Raspberry Pi", "Python", "tshark", "Socket.io", "Chart.js", "Shell Scripting"],
                  role: "Developer — Network Monitoring Tool",
                  date: "2022",
                  ownership: "Individual",
                  links: [{ label: "Source (GitHub)", url: "https://github.com/R1shabh-Arora/network-traffic-analyzer" }],
                },
                {
                  id: "6",
                  title: "PicoBadUSB",
                  description: "Custom Raspberry Pi Pico BadUSB device demonstrating HID attack techniques for security awareness.",
                  longDescription:
                    "Engineered a BadUSB device using the Raspberry Pi Pico and CircuitPython to emulate keyboard input and execute scripted payloads automatically when connected to a host machine. This project replicated 'Rubber Ducky' style USB attacks to highlight the risks of malicious HID devices in penetration testing and red-team scenarios. I created payloads (including a playful 'Windows Chaos' demo) and tested execution of automated keystrokes, application launches, and command sequences. While designed responsibly as a proof-of-concept, the project underscores the importance of endpoint hardening, user awareness, and USB security controls. The implementation deepened my knowledge of hardware exploitation, embedded development, and ethical hacking practices.",
                  image: "./badUSB.jpg",
                  tags: ["Raspberry Pi Pico", "CircuitPython", "USB HID", "Embedded Systems", "Ethical Hacking", "Red Team"],
                  role: "Developer — Hardware Exploitation PoC",
                  date: "2022",
                  ownership: "Individual",
                  links: [{ label: "Source (GitHub)", url: "https://github.com/R1shabh-Arora/PicoBadUSB" }],
                },
                {
                  id: "7",
                  title: "PicoPong",
                  description: "Retro Pong game built in Python for the Raspberry Pi Pico with PicoDisplay.",
                  longDescription:
                    "Developed PicoPong, a nostalgic Pong clone engineered for the Raspberry Pi Pico with PicoDisplay. Using the PicoGraphics library, I implemented real-time rendering, paddle controls, collision detection, and increasing difficulty mechanics. The game features both multiplayer (1v1) and solo modes with a computer-controlled opponent, showcasing AI behaviour and dynamic ball physics. Designed with smooth animations and responsive button input, PicoPong demonstrates how embedded hardware can deliver polished arcade-style gaming experiences. The project sharpened my skills in embedded Python programming, low-level graphics, real-time systems, and playful user interaction design.",
                  image: "./PicoPong.png",
                  tags: ["Raspberry Pi Pico", "PicoDisplay", "Python", "PicoGraphics", "Embedded Systems", "Game Development"],
                  role: "Developer — Embedded Game Designer",
                  date: "2022",
                  ownership: "Individual",
                  links: [{ label: "Source (GitHub)", url: "https://github.com/R1shabh-Arora/PicoPong" }],
                },
                {
                  id: "8",
                  title: "RobTheBank",
                  description: "Coursework penetration test applying OWASP Top 10 methodologies to identify security weaknesses.",
                  longDescription:
                    "Conducted an authorised security assessment of a deliberately vulnerable training application as part of university coursework. The engagement followed OWASP Top 10 techniques to discover and verify a broad range of issues including input validation failures, insecure file handling, improper access controls and information disclosure. For each class of issue I documented the affected area, evidence of impact, and recommended mitigations (eg. input sanitisation and prepared statements, secure file upload handling, robust access control checks, and proper error-handling). The assessment was performed responsibly in the course environment and used to produce targeted remediation advice and testing artefacts for the instructor and team.",
                  image: "./RobTheBank.png",
                  tags: ["Web Security", "OWASP Top 10", "Penetration Testing", "Secure Coding", "Responsible Disclosure"],
                  role: "Security Assessor (Coursework)",
                  date: "2023",
                  ownership: "Individual",
                  links: [{ label: "Walk Through", url: "/RobTheBank.pdf" }],
                },
                {
                  id: "9",
                  title: "Operation_Spoiler",
                  description: "Court-ready forensic documentation and expert witness reporting for evidentially sound investigations.",
                  longDescription:
                    "Executed a full digital-forensics case simulation as part of university coursework, managing end-to-end evidence handling and reporting to legal standards. Responsibilities included secured acquisition and indexing of digital exhibits, meticulous contemporaneous note taking, and drafting an expert witness statement that summarises methods, limitations and reasoned opinions for non-technical stakeholders. The exercise prioritised chain of custody, reproducibility and clear communication — skills directly applicable to incident response, DFIR and legal liaison roles.",
                  image: "./Operation_Spoiler.png",
                  tags: ["Digital Forensics", "Expert Witness", "Chain of Custody", "Evidence Handling", "DFIR", "Report Writing", "HxD", "Gidra"],
                  role: "Forensic Analyst",
                  date: "2025",
                  ownership: "Individual",
                  links: [{ label: "Report", url: "/COMP6254___Digital_Forensics___CW.pdf" }],
                },
                {
                  id: "10",
                  title: "Advanced_Binary_Exploitation",
                  description: "Reverse engineering and secure patching for buffer overflow.",
                  longDescription:
                    "An applied security research project demonstrating reliable exploit chains (stack-smashing, EIP control, ret2libc), shellcode development, memory forensics with GDB, and assembly-level binary patches to disable/modify runtime checks. Deliverables included reproducible exploit scripts, annotated disassembly, defensive remediation notes, and a professional technical report documenting impact and mitigation strategies. Lab work covered setuid binaries, NX bypasses, pattern-based offset discovery, and secure patch recommendations.",
                  image: "./BufferOverflow.jpeg",
                  tags: ["Binary Exploitation", "Reverse Engineering", "GDB", "Shellcoding", "ret2libc", "Assembly Patching", "Exploit Development", "Security Remediation"],
                  role: "Reverse Engineer",
                  date: "2025",
                  ownership: "Individual",
                  links: [{ label: "Report", url: "/COMP6236-2425-Coursework-1.pdf" }],
                },
                {
                  id: "11",
                  title: "Jackal_APT_Sample",
                  description: "Forensic investigation of a live malware infection using Volatility and reverse engineering techniques.",
                  longDescription:
                    "Analysed a malware sample (‘Jackal’) and infected memory dump as part of COMP6236 coursework. Using Volatility, I unpacked the malware in memory, extracted malicious strings and configuration, and identified persistence via Windows registry modifications and mutexes. Recovered and partially decoded 25+ C2 server IPs and paths encoded with Base64/XOR. Detected active network activity on TCP 9090 and NetBIOS/SMB ports, linking to backdoor functionality and potential lateral movement. Documented indicators of compromise (IOC), including User-Agent strings ('The Jackal v4.2001'), registry keys, and suspicious handles. Produced a forensic report covering methodology, evidence, decoded artefacts, and detection recommendations for IDS and SOC teams.",
                  image: "https://media.istockphoto.com/id/1409661663/vector/computer-bug-icon-with-circuit.jpg?s=612x612&w=0&k=20&c=MOCdcUXHEI9jHV5qKWVZNGre97ofZRr5qGLugpcT6yQ=",
                  tags: ["Malware Analysis", "Memory Forensics", "Volatility", "Reverse Engineering", "C2 Analysis", "Registry Forensics", "Incident Response"],
                  role: "Malware Analyst",
                  date: "2025",
                  ownership: "Individual",
                  links: [{ label: "Investigation Report", url: "/COMP6236___CW2.pdf" }],
                },
              ]}
            />
          </FadeIn>
        </div>
      </AnimatedSection>

      {/* Toolbox / Skills Section */}
      <AnimatedSection
        id="skills"
        className="my-20 mx-4 md:mx-8 lg:mx-16 bg-black"
        headingId="skills-heading"
        // replayOnView={true}
        // replayOnHover={true}
        // fadeOutOnScroll={true}
      >
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn direction="up" distance={22} delay={0.04} once={false}>
            <Skills />
          </FadeIn>
        </div>
      </AnimatedSection>

      {/* Education Section */}
      <AnimatedSection
        id="education"
        className="my-20 mx-4 md:mx-8 lg:mx-16 bg-black/90"
        heading={
          <FadeIn direction="left" distance={28} delay={0.04} once={false}>
            <h2 className="text-2xl md:text-3xl font-mono text-red-600 mb-12 glitch-text" id="education-heading">
              <span className="relative">Education_</span>
            </h2>
          </FadeIn>
        }
        headingId="education-heading"
        // replayOnView={true}
        // replayOnHover={true}
        // fadeOutOnScroll={true}
      >
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up" distance={22} delay={0.04} once={false}>
            <Education />
          </FadeIn>
        </div>
      </AnimatedSection>

      {/* Strategy Section */}
      <AnimatedSection
        id="strategy"
        className="my-20 mx-4 md:mx-8 lg:mx-16 bg-black/90"
        heading={
          <FadeIn direction="left" distance={28} delay={0.04} once={false}>
            <h2 className="text-2xl md:text-3xl font-mono text-red-600 mb-6 glitch-text" id="strategy-heading">
              <span className="relative">Security_Philosophy</span>
            </h2>
          </FadeIn>
        }
        headingId="strategy-heading"
        // replayOnView={true}
        // replayOnHover={true}
        // fadeOutOnScroll={true}
      >
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up" distance={22} delay={0.04} once={false}>
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="md:w-1/2">
                <p className="font-mono text-sm md:text-base mb-6 leading-relaxed">
                  Every security implementation begins with threat modeling. Like a chess game, each defensive move is calculated, each vulnerability assessed. I approach cybersecurity as a strategic discipline where prevention and detection must work in perfect harmony.
                </p>
                <p className="font-mono text-sm md:text-base leading-relaxed">
                  The best security systems are those that remain invisible to users while maintaining robust protection against sophisticated threats. Defense in depth, zero trust, and continuous monitoring are my core principles.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="relative overflow-hidden rounded-md border border-red-600/30">
                  <img
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"
                    alt="Cybersecurity Network"
                    className="w-full h-auto filter contrast-125 brightness-75 hover:brightness-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40" />
                  <div className="absolute inset-0 bg-red-600/10" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </AnimatedSection>

      {/* About Me Section */}
      <FadeIn direction="up" distance={24} delay={0.04} once={false}>
        <AboutMe />
      </FadeIn>

      {/* Contact Section */}
      <AnimatedSection
        id="contact"
        className="my-20 mx-4 md:mx-8 lg:mx-16"
        heading={
          <FadeIn direction="left" distance={28} delay={0.04} once={false}>
            <h2 className="text-2xl md:text-3xl font-mono text-red-600 mb-12 glitch-text" id="contact-heading">
              <span className="relative">Contact_</span>
            </h2>
          </FadeIn>
        }
        headingId="contact-heading"
        // replayOnView={true}
        // replayOnHover={true}
        // fadeOutOnScroll={true}
      >
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up" distance={22} delay={0.04} once={false}>
            <ContactSection />
          </FadeIn>
        </div>
      </AnimatedSection>

      {/* ContactInfo (bottom contact details) */}
      <FadeIn direction="up" distance={20} delay={0.04} once={false}>
        <ContactInfo />
      </FadeIn>

      {/* Footer */}
      <FadeIn direction="up" distance={18} delay={0.04} once={false}>
        <footer className="my-10 mx-4 border-t border-red-600/30 relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="font-mono text-red-600 text-sm mb-4 md:mb-0"
              animate={{
                textShadow: [
                  "0 0 5px rgba(239, 68, 68, 0)",
                  "0 0 10px rgba(239, 68, 68, 0.8)",
                  "0 0 5px rgba(239, 68, 68, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              Copyright © 2025 Rishabh Arora. All rights reserved.
            </motion.p>

            <div className="flex gap-6">
              <a href="https://github.com/R1shabh-Arora" className="text-white hover:text-red-600 transition-colors duration-300" aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>

              <a href="https://www.linkedin.com/in/R1shabh-Arora/" className="text-white hover:text-red-600 transition-colors duration-300" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              <a href="https://www.instagram.com/r1shabh_arora/" className="text-white hover:text-red-600 transition-colors duration-300" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>

              <a href="https://tryhackme.com/p/Failed0" className="text-white hover:text-red-600 transition-colors duration-300" aria-label="TryHackMe">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1 4v12l8-6-8-6z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Animated glitch effect in footer */}
          <div className="absolute bottom-0 left-0 w-full h-px">
            <motion.div
              className="h-full bg-red-600"
              animate={{
                width: ["0%", "100%", "0%"],
                left: ["0%", "0%", "100%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </footer>
      </FadeIn>

      {/* Global CSS for glitch effects */}
      <style>{`
        @keyframes scanline {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100vh);
          }
        }

        .bg-scanline {
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.05), transparent);
          background-size: 100% 3px;
          animation: scanline 8s linear infinite;
        }

        .glitch-text {
          position: relative;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-text::before {
          left: 2px;
          text-shadow: -1px 0 red;
          animation: glitch-animation 3s infinite linear alternate-reverse;
        }

        .glitch-text::after {
          left: -2px;
          text-shadow: 1px 0 blue;
          animation: glitch-animation 2s infinite linear alternate-reverse;
        }

        @keyframes glitch-animation {
          0% {
            clip-path: inset(30% 0 70% 0);
          }
          20% {
            clip-path: inset(10% 0 85% 0);
          }
          40% {
            clip-path: inset(62% 0 36% 0);
          }
          60% {
            clip-path: inset(25% 0 58% 0);
          }
          80% {
            clip-path: inset(75% 0 17% 0);
          }
          100% {
            clip-path: inset(43% 0 46% 0);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Home;
