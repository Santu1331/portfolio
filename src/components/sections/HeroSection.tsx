"use client";

/**
 * HeroSection — split layout with photo on right, text on left.
 * Fully responsive: stacks on mobile (photo on top, centered),
 * side-by-side on desktop.
 */
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Rocket, Download } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import personal from "../../../data/personal.json";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-orange-500/6 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/6 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

          {/* ── LEFT: Text content ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Status badge */}
            <motion.div variants={item} className="flex justify-center lg:justify-start mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-sm text-gray-400">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Founder &amp; CEO · Open to opportunities
              </div>
            </motion.div>

            {/* "Hi, I'm" */}
            <motion.p variants={item} className="text-orange-500 font-semibold text-base tracking-wide mb-2">
              Hi, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight mb-4"
            >
              Santosh
              <br />
              <span className="gradient-text">Sangnod</span>
            </motion.h1>

            {/* Role chips */}
            <motion.div variants={item} className="flex flex-wrap justify-center lg:justify-start gap-2 mb-5">
              {["Founder & CEO", "Full Stack Dev", "B.Tech CSBS"].map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-white/5 border border-white/10 text-gray-300"
                >
                  {role}
                </span>
              ))}
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={item}
              className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-3"
            >
              Solo founder of{" "}
              <a
                href={personal.startup}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
              >
                FeedoZone
              </a>{" "}
              — a hyperlocal food delivery startup solving real problems in rural &amp; semi-urban India.
              I build, ship, and operate.
            </motion.p>

            {/* Location */}
            <motion.div
              variants={item}
              className="flex items-center justify-center lg:justify-start gap-1.5 text-sm text-gray-600 mb-8"
            >
              <MapPin className="w-3.5 h-3.5" />
              {personal.location}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={item}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
            >
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Rocket className="w-4 h-4" />
                See My Work
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/10 text-gray-300 hover:text-white font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>

              <a
                href={personal.resume}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-orange-500/20 text-orange-400 hover:text-orange-300 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            </motion.div>

            {/* Tech pills */}
            <motion.div variants={item} className="flex flex-wrap justify-center lg:justify-start gap-2">
              {["Next.js", "React Native", "TypeScript", "Node.js", "Firebase", "Figma"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium glass rounded-full text-gray-500 border border-white/5 hover:border-orange-500/30 hover:text-orange-400 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* ⌘K hint */}
            <motion.div variants={item} className="mt-5 flex justify-center lg:justify-start">
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })
                  )
                }
                className="inline-flex items-center gap-1.5 text-xs text-gray-700 hover:text-gray-400 transition-colors"
              >
                Press{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-600 font-mono">
                  ⌘K
                </kbd>{" "}
                to navigate quickly
              </button>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2 flex-shrink-0"
          >
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/30 via-orange-500/10 to-transparent blur-2xl scale-110" />

              {/* Rotating dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute inset-[-12px] rounded-full border border-dashed border-orange-500/20"
              />

              {/* Static accent ring */}
              <div className="absolute inset-[-6px] rounded-full border border-orange-500/10" />

              {/* Photo */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-[340px] xl:h-[340px] rounded-full overflow-hidden border-2 border-orange-500/30 shadow-2xl shadow-orange-500/20">
                <Image
                  src={personal.avatar}
                  alt={personal.name}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 340px"
                />
                {/* Inner bottom shadow */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: "inset 0 -40px 60px rgba(0,0,0,0.4)" }}
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-700"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-6 bg-gradient-to-b from-gray-600 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
