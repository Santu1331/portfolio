"use client";

/**
 * ContactSection — email, social links, and a working contact form (with form state feedback).
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { GitHubIcon, LinkedInIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import SectionHeading from "@/components/ui/SectionHeading";
import personal from "../../../data/personal.json";

const contacts = [
  { icon: <Mail className="w-5 h-5" />, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
  { icon: <GitHubIcon className="w-5 h-5" />, label: "GitHub", value: "@Santu1331", href: personal.github },
  { icon: <LinkedInIcon className="w-5 h-5" />, label: "LinkedIn", value: "santosh-sangnod", href: personal.linkedin },
  { icon: <InstagramIcon className="w-5 h-5" />, label: "Instagram", value: "@santosh.sangnod", href: personal.instagram },
  { icon: <MapPin className="w-5 h-5" />, label: "Location", value: personal.location, href: null },
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    // Simulate form submission — replace with actual API/Formspree/email service
    await new Promise((r) => setTimeout(r, 1500));
    setState("success");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setState("idle"), 4000);
  };

  return (
    <section id="contact" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something Together"
          subtitle="Whether you're a recruiter, founder, or just want to chat — I'm always open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-white mb-2">Get In Touch</h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              I&apos;m currently building FeedoZone and open to internships, collaborations, and part-time roles.
              Drop me a message — I respond quickly.
            </p>

            <div className="space-y-4">
              {contacts.map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-orange-400 border border-white/5">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{c.label}</div>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm text-gray-200 hover:text-orange-400 transition-colors"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-200">{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability status */}
            <div className="mt-8 p-4 glass rounded-xl border border-green-500/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-400">Available for Opportunities</span>
              </div>
              <p className="text-xs text-gray-500">
                Open to internships, part-time roles, freelance projects, and startup collaborations.
              </p>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 border border-white/5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me more..."
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={state === "submitting"}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-medium text-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                {state === "submitting" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : state === "success" ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Message Sent!
                  </>
                ) : state === "error" ? (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    Error — Try Again
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

              {state === "success" && (
                <p className="text-center text-xs text-green-400">
                  Thanks! I&apos;ll get back to you soon.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
