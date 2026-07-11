"use client";

/**
 * CommandMenu — Ctrl+K / Cmd+K quick navigation overlay.
 * Inspired by Linear, Vercel, and Raycast.
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  X,
  Home,
  User,
  Rocket,
  Code2,
  Briefcase,
  Award,
  FileText,
  Mail,
  Book,
  ExternalLink,
  Cpu,
  Image as ImageIcon,
} from "lucide-react";

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: string; // href or "#section"
  type: "nav" | "link" | "action";
  keywords?: string[];
}

const commands: Command[] = [
  // Navigation
  { id: "home", label: "Home", description: "Back to top", icon: <Home className="w-4 h-4" />, action: "/", type: "nav", keywords: ["home", "top", "start"] },
  { id: "about", label: "About", description: "Who I am", icon: <User className="w-4 h-4" />, action: "/#about", type: "nav", keywords: ["about", "bio", "me"] },
  { id: "startup", label: "FeedoZone", description: "My startup", icon: <Rocket className="w-4 h-4" />, action: "/#startup", type: "nav", keywords: ["feedozone", "startup", "founder"] },
  { id: "projects", label: "Projects", description: "Real products", icon: <Code2 className="w-4 h-4" />, action: "/#projects", type: "nav", keywords: ["projects", "work", "portfolio"] },
  { id: "skills", label: "Skills", description: "Tech stack", icon: <Cpu className="w-4 h-4" />, action: "/#skills", type: "nav", keywords: ["skills", "tech", "stack"] },
  { id: "experience", label: "Experience", description: "Work & education", icon: <Briefcase className="w-4 h-4" />, action: "/#experience", type: "nav", keywords: ["experience", "work", "education"] },
  { id: "achievements", label: "Achievements", description: "Awards & competitions", icon: <Award className="w-4 h-4" />, action: "/#achievements", type: "nav", keywords: ["achievements", "awards", "hackathon"] },
  { id: "certificates", label: "Certificates", description: "Credentials", icon: <FileText className="w-4 h-4" />, action: "/#certificates", type: "nav", keywords: ["certificates", "credentials"] },
  { id: "gallery", label: "Gallery", description: "Photos & memories", icon: <ImageIcon className="w-4 h-4" />, action: "/#gallery", type: "nav", keywords: ["gallery", "photos", "images"] },
  { id: "blog", label: "Blog", description: "My writing", icon: <Book className="w-4 h-4" />, action: "/blog", type: "nav", keywords: ["blog", "articles", "writing"] },
  { id: "contact", label: "Contact", description: "Get in touch", icon: <Mail className="w-4 h-4" />, action: "/#contact", type: "nav", keywords: ["contact", "email", "hire"] },
  // External links
  { id: "feedozone-live", label: "Visit FeedoZone", description: "feedo-ruddy.vercel.app", icon: <ExternalLink className="w-4 h-4" />, action: "https://feedo-ruddy.vercel.app", type: "link", keywords: ["feedozone", "live", "website"] },
  { id: "github", label: "GitHub Profile", description: "github.com/Santu1331", icon: <ExternalLink className="w-4 h-4" />, action: "https://github.com/Santu1331", type: "link", keywords: ["github", "code", "repos"] },
  { id: "resume", label: "Download Resume", description: "PDF resume", icon: <FileText className="w-4 h-4" />, action: "/resume.pdf", type: "link", keywords: ["resume", "cv", "download"] },
];

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Open/close with Ctrl+K or Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = query.trim()
    ? commands.filter((c) => {
        const q = query.toLowerCase();
        return (
          c.label.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q) ||
          c.keywords?.some((k) => k.includes(q))
        );
      })
    : commands;

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        executeCommand(filtered[selectedIndex]);
      }
    },
    [filtered, selectedIndex]
  );

  const executeCommand = (cmd: Command) => {
    setOpen(false);
    setQuery("");
    if (cmd.type === "link") {
      window.open(cmd.action, "_blank", "noopener");
    } else {
      // For section scrolling
      if (cmd.action.startsWith("/#")) {
        const id = cmd.action.slice(2);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = cmd.action;
      }
    }
  };

  return (
    <>
      {/* Trigger hint in footer / visible on desktop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9000] flex items-start justify-center pt-[15vh] px-4"
            onClick={() => setOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative z-10 w-full max-w-lg bg-[#111118] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5">
                <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search commands..."
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-gray-600 outline-none"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-gray-600">
                    No results for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  filtered.map((cmd, i) => (
                    <button
                      key={cmd.id}
                      onClick={() => executeCommand(cmd)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        i === selectedIndex
                          ? "bg-orange-500/10 text-orange-400"
                          : "text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        i === selectedIndex ? "bg-orange-500/20" : "bg-white/5"
                      }`}>
                        {cmd.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{cmd.label}</div>
                        {cmd.description && (
                          <div className="text-xs text-gray-500 truncate">{cmd.description}</div>
                        )}
                      </div>
                      {cmd.type === "link" && (
                        <ExternalLink className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                      )}
                    </button>
                  ))
                )}
              </div>

              {/* Footer hint */}
              <div className="px-4 py-2.5 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-gray-500 text-[10px]">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-gray-500 text-[10px]">↵</kbd>
                    open
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-gray-500 text-[10px]">esc</kbd>
                    close
                  </span>
                </div>
                <span className="text-[10px] text-gray-700">⌘K</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
