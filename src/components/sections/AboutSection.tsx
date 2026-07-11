"use client";

/**
 * AboutSection — professional photo + bio + stats.
 * Photo is prominent on desktop (left), stacked on mobile.
 */
import { motion } from "framer-motion";
import Image from "next/image";
import { Rocket, Code2, GraduationCap, MapPin, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import personal from "../../../data/personal.json";
import statsData from "../../../data/stats.json";

const highlights = [
  {
    icon: <Rocket className="w-4 h-4 text-orange-400" />,
    title: "Startup Founder",
    desc: "Built FeedoZone solo — product to operations.",
    color: "border-orange-500/20 hover:border-orange-500/40",
  },
  {
    icon: <Code2 className="w-4 h-4 text-blue-400" />,
    title: "Full Stack Dev",
    desc: "React, Next.js, React Native, Firebase.",
    color: "border-blue-500/15 hover:border-blue-500/35",
  },
  {
    icon: <GraduationCap className="w-4 h-4 text-purple-400" />,
    title: "B.Tech CSBS",
    desc: "TKIET Warananagar · 2024–2028",
    color: "border-purple-500/15 hover:border-purple-500/35",
  },
  {
    icon: <MapPin className="w-4 h-4 text-green-400" />,
    title: "Kolhapur, MH",
    desc: "Building for rural India.",
    color: "border-green-500/15 hover:border-green-500/35",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About Me"
          title="Founder First, Developer Second"
          subtitle="I don't just write code — I build products, run operations, onboard vendors, and do whatever it takes to make a startup work."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ── LEFT: Photo card ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col items-center"
          >
            {/* Photo frame */}
            <div className="relative w-full max-w-[280px] sm:max-w-[300px] lg:max-w-full mx-auto">
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/20 to-transparent blur-xl" />

              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden border border-orange-500/20 shadow-2xl shadow-orange-500/10 aspect-[3/4]">
                <Image
                  src={personal.avatar}
                  alt={personal.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 300px, 320px"
                />
              </div>
            </div>

            {/* Social quick links */}
            <div className="mt-5 grid grid-cols-3 gap-2 w-full max-w-[280px] sm:max-w-[300px] lg:max-w-full mx-auto">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 text-xs font-semibold text-center glass rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
              >
                GitHub
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 text-xs font-semibold text-center glass rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
              >
                LinkedIn
              </a>
              <a
                href={personal.startup}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 text-xs font-semibold text-center rounded-xl bg-orange-500/10 border border-orange-500/25 text-orange-400 hover:bg-orange-500/20 transition-all"
              >
                FeedoZone
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT: Bio + stats ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Bio */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <p className="text-gray-300 text-base leading-relaxed mb-4">
                {personal.bio}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                At TKIET, I serve as{" "}
                <span className="text-white font-medium">Tech Head of the CSBS Association</span> and{" "}
                <span className="text-white font-medium">Graphic Design Head of the IEDC Committee</span>.
                I&apos;ve competed in national-level hackathons and paper presentations, winning at IIT Patna and other national events.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                My goal: build technology that solves real problems for real people — especially in the parts of India the big companies ignore.
              </p>
              <a
                href={personal.founderProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 mt-4 transition-colors font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View Founder Profile
              </a>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {statsData.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="glass rounded-2xl p-4 border border-white/5 text-center hover:border-orange-500/25 transition-all group"
                >
                  <div className="text-2xl sm:text-3xl font-black text-white mb-1 group-hover:text-orange-400 transition-colors">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 leading-tight">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className={`glass rounded-xl p-4 border transition-all ${h.color}`}
                >
                  <div className="mb-2">{h.icon}</div>
                  <h3 className="text-sm font-bold text-white mb-0.5">{h.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{h.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Current venture */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="glass rounded-2xl p-5 border border-orange-500/20 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-semibold text-orange-500 uppercase tracking-wider mb-0.5">Current Venture</div>
                <h3 className="text-base font-bold text-white">FeedoZone</h3>
                <p className="text-xs text-gray-400 truncate">Hyperlocal food delivery for rural India · Live &amp; growing</p>
              </div>
              <a
                href={personal.startup}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-semibold hover:bg-orange-500/20 transition-colors"
              >
                Visit →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
