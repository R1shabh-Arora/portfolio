// src/components/ContactSection.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Terminal,
  Send,
  Github,
  Linkedin,
  Instagram,
  Mail,
} from "lucide-react";

interface ContactSectionProps {
  className?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ className = "" }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    submitted: false,
    loading: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ ...formState, loading: true });

    // Simulate form submission
    setTimeout(() => {
      setFormState({
        name: "",
        email: "",
        message: "",
        submitted: true,
        loading: false,
      });
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // Inline fallback SVG in case the imported Instagram icon is not available
  const InstagramFallback: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      className={className ?? "h-5 w-5"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );

  // Use the imported Instagram icon if present; otherwise use fallback
  const InstagramIconElement =
    typeof Instagram !== "undefined" ? (
      <Instagram className="h-5 w-5" />
    ) : (
      <InstagramFallback className="h-5 w-5" />
    );

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      url: "https://github.com/R1shabh-Arora",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/R1shabh-Arora/",
    },
    {
      icon: InstagramIconElement,
      label: "Instagram",
      url: "https://www.instagram.com/r1shabh_arora/",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      url: "mailto:0.rishabh.arora.0@gmail.com",
    },
  ];

  return (
    <motion.section
      className={`bg-black text-white min-h-[600px] p-6 md:p-12 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Terminal className="text-red-500 mr-2" />
          <h2 className="text-2xl md:text-3xl font-mono text-red-500 font-bold tracking-tight">
            <span className="inline-block animate-pulse">_</span> Contact Terminal
          </h2>
        </div>

        <div className="border border-red-500/30 rounded-md bg-black/80 p-4 md:p-8 backdrop-blur-sm">
          <div className="flex items-center border-b border-red-500/20 pb-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50 mr-2"></div>
            <div className="flex-1 text-xs text-gray-400 font-mono ml-2">~/contact_form.sh</div>
          </div>

          {formState.submitted ? (
            <motion.div
              className="text-green-500 font-mono p-4 border border-green-500/20 rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-2">$ Message sent successfully</p>
              <p className="text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
              <Button
                variant="outline"
                className="mt-4 border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                onClick={() => setFormState({ ...formState, submitted: false })}
              >
                $ Send another message
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-red-500 font-mono mr-2">$</span>
                  <label htmlFor="name" className="text-gray-400 font-mono text-sm">NAME:</label>
                </div>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="bg-black/50 border-red-500/30 text-white font-mono focus:border-red-500 focus:ring-red-500/20"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-red-500 font-mono mr-2">$</span>
                  <label htmlFor="email" className="text-gray-400 font-mono text-sm">EMAIL:</label>
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="bg-black/50 border-red-500/30 text-white font-mono focus:border-red-500 focus:ring-red-500/20"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-red-500 font-mono mr-2">$</span>
                  <label htmlFor="message" className="text-gray-400 font-mono text-sm">MESSAGE:</label>
                </div>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  className="bg-black/50 border-red-500/30 text-white font-mono min-h-[120px] focus:border-red-500 focus:ring-red-500/20"
                  placeholder="Type your message here..."
                />
              </div>

              <Button
                type="submit"
                disabled={formState.loading}
                className="bg-red-500 hover:bg-red-600 text-white font-mono w-full md:w-auto flex items-center justify-center group relative overflow-hidden"
              >
                <span className="mr-2">Let's Collaborate</span>
                <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                {formState.loading && (
                  <motion.div
                    className="absolute inset-0 bg-red-600 flex items-center justify-center"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5 }}
                  >
                    <span className="text-white font-mono text-sm">Processing...</span>
                  </motion.div>
                )}
              </Button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-red-500/20">
            <p className="text-gray-400 font-mono text-sm mb-4">$ Connect with me:</p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.label}
                  aria-label={link.label}
                  className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/30 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                  <span className="font-mono text-sm">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scanline effect overlay */}
      <div className="pointer-events-none fixed inset-0 bg-scanline opacity-5 z-10"></div>
    </motion.section>
  );
};

export default ContactSection;
