"use client";

/**
 * Navbar — sticky, glassmorphic navigation with mobile hamburger menu.
 * All links are data-driven. Smooth scrolls to sections.
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active section based on scroll
  useEffect(() => {
    const sections = navLinks
      .filter((l) => l.href.startsWith("#"))
      .map((l) => l.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-white/5 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm tracking-wide hidden sm:block">
              Santosh<span className="text-orange-500">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-md",
                  activeSection === link.href.slice(1)
                    ? "text-orange-400"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-0 bg-white/5 rounded-md"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Command menu hint */}
            <button
              onClick={() => {
                const ev = new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true });
                window.dispatchEvent(ev);
              }}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-gray-500 glass border border-white/5 hover:border-orange-500/20 hover:text-orange-400 transition-all"
              title="Open command menu"
            >
              <span>⌘K</span>
            </button>
            <ThemeToggle />
            {/* CTA */}
            <Link
              href="#contact"
              className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-200"
            >
              Contact Me
            </Link>
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden glass border-t border-white/5"
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 px-4 py-2.5 rounded-full text-sm font-medium bg-orange-500 text-white text-center"
              >
                Contact Me
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
