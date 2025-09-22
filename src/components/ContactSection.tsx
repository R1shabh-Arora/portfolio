// src/components/ContactSection.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Terminal, Send } from "lucide-react";

interface ContactSectionProps {
  className?: string;
}

type FormState = {
  name: string;
  email: string;
  message: string;
  submitted: boolean;
  loading: boolean;
  error?: string | null;
};

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i;

/**
 * ContactSection
 * - Posts form data to Formspree endpoint (VITE_FORMSPREE_ENDPOINT) or fallback.
 * - Accessible: aria-live for errors/status, focus moved to success message after submit.
 */
const ContactSection: React.FC<ContactSectionProps> = ({ className = "" }) => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    submitted: false,
    loading: false,
    error: null,
  });

  // prefer env var, fall back to your provided Formspree form
  const FORMSPREE_ENDPOINT =
    (import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined) ??
    "https://formspree.io/f/mgvnwllb";

  const successRef = useRef<HTMLDivElement | null>(null);
  const errorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (formState.submitted && successRef.current) {
      // Move focus to success message for screen reader users
      successRef.current.focus();
    }
  }, [formState.submitted]);

  function validate(): string | null {
    if (!formState.name.trim()) return "Please enter your name.";
    if (!formState.email.trim()) return "Please enter your email.";
    if (!EMAIL_REGEX.test(formState.email)) return "Please enter a valid email address.";
    if (!formState.message.trim() || formState.message.trim().length < 5)
      return "Please write a short message (at least 5 characters).";
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // clear previous error
    setFormState((s) => ({ ...s, error: null }));

    const v = validate();
    if (v) {
      setFormState((s) => ({ ...s, error: v }));
      if (errorRef.current) errorRef.current.focus();
      return;
    }

    setFormState((s) => ({ ...s, loading: true }));

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      if (!res.ok) {
        // try to parse response body for helpful message
        let detail = "";
        try {
          const json = await res.json().catch(() => null);
          if (json && json.error) detail = ` — ${json.error}`;
        } catch {
          // ignore
        }
        throw new Error(`Form submission failed (${res.status})${detail}`);
      }

      // success
      setFormState({
        name: "",
        email: "",
        message: "",
        submitted: true,
        loading: false,
        error: null,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Contact submit error:", err);
      setFormState((s) => ({
        ...s,
        loading: false,
        error: "Sending failed — please try again or email me directly.",
      }));
      if (errorRef.current) errorRef.current.focus();
    }
  };

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
          <Terminal className="text-red-500 mr-2" aria-hidden />
          <h2 className="text-2xl md:text-3xl font-mono text-red-500 font-bold tracking-tight">
            <span className="inline-block animate-pulse" aria-hidden>
              _
            </span>{" "}
            Contact Terminal
          </h2>
        </div>

        <div className="border border-red-500/30 rounded-md bg-black/80 p-4 md:p-8 backdrop-blur-sm">
          <div className="flex items-center border-b border-red-500/20 pb-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50 mr-2" />
            <div className="w-3 h-3 rounded-full bg-green-500/50 mr-2" />
            <div className="flex-1 text-xs text-gray-400 font-mono ml-2">~/contact_form.sh</div>
          </div>

          {formState.submitted ? (
            <motion.div
              ref={successRef}
              tabIndex={-1}
              className="text-green-500 font-mono p-4 border border-green-500/20 rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              role="status"
              aria-live="polite"
            >
              <p className="mb-2">$ Message sent successfully</p>
              <p className="text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
              <Button
                variant="outline"
                className="mt-4 border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                onClick={() =>
                  setFormState({
                    name: "",
                    email: "",
                    message: "",
                    submitted: false,
                    loading: false,
                    error: null,
                  })
                }
              >
                $ Send another message
              </Button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-red-500 font-mono mr-2" aria-hidden>
                    $
                  </span>
                  <label htmlFor="name" className="text-gray-400 font-mono text-sm">
                    NAME:
                  </label>
                </div>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  aria-required
                  aria-label="Your name"
                  aria-invalid={!!formState.error && !formState.name.trim()}
                  className="bg-black/50 border-red-500/30 text-white font-mono focus:border-red-500 focus:ring-red-500/20"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-red-500 font-mono mr-2" aria-hidden>
                    $
                  </span>
                  <label htmlFor="email" className="text-gray-400 font-mono text-sm">
                    EMAIL:
                  </label>
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  aria-required
                  aria-label="Your email"
                  aria-invalid={!!formState.error && !EMAIL_REGEX.test(formState.email)}
                  className="bg-black/50 border-red-500/30 text-white font-mono focus:border-red-500 focus:ring-red-500/20"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-red-500 font-mono mr-2" aria-hidden>
                    $
                  </span>
                  <label htmlFor="message" className="text-gray-400 font-mono text-sm">
                    MESSAGE:
                  </label>
                </div>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  aria-required
                  aria-label="Your message"
                  aria-invalid={!!formState.error && formState.message.trim().length < 5}
                  className="bg-black/50 border-red-500/30 text-white font-mono min-h-[120px] focus:border-red-500 focus:ring-red-500/20"
                  placeholder="Type your message here..."
                />
              </div>

              {/* error */}
              {formState.error && (
                <div
                  ref={errorRef}
                  tabIndex={-1}
                  role="alert"
                  aria-live="assertive"
                  className="text-yellow-400 font-mono"
                >
                  {formState.error}
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                <Button
                  type="submit"
                  disabled={formState.loading}
                  className="bg-red-500 hover:bg-red-600 text-white font-mono w-full md:w-auto flex items-center justify-center group relative overflow-hidden"
                  aria-disabled={formState.loading}
                >
                  <span className="mr-2">Let's Collaborate</span>
                  <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  {formState.loading && (
                    <motion.div
                      className="absolute inset-0 bg-red-600 flex items-center justify-center"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5 }}
                      aria-hidden
                    >
                      <span className="text-white font-mono text-sm">Processing...</span>
                    </motion.div>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Scanline effect overlay (page-level scanline exists in home; this is minimal fallback) */}
      <div className="pointer-events-none fixed inset-0 bg-scanline opacity-5 z-10" aria-hidden />
    </motion.section>
  );
};

export default ContactSection;
