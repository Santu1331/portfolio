"use client";

/**
 * TimelineSection — founder journey timeline with animated entries.
 * Data from data/timeline.json.
 */
import { motion } from "framer-motion";
import {
  GraduationCap, Cpu, Palette, Trophy, Droplets, FileText, Award, Rocket, TrendingUp
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import timelineData from "../../../data/timeline.json";

const iconMap: Record<string, React.ReactNode> = {
  "graduation-cap": <GraduationCap className="w-4 h-4" />,
  cpu: <Cpu className="w-4 h-4" />,
  palette: <Palette className="w-4 h-4" />,
  trophy: <Trophy className="w-4 h-4" />,
  droplets: <Droplets className="w-4 h-4" />,
  "file-text": <FileText className="w-4 h-4" />,
  award: <Award className="w-4 h-4" />,
  rocket: <Rocket className="w-4 h-4" />,
  "trending-up": <TrendingUp className="w-4 h-4" />,
};

const typeColors: Record<string, string> = {
  education: "bg-blue-500",
  leadership: "bg-purple-500",
  achievement: "bg-yellow-500",
  project: "bg-green-500",
  startup: "bg-orange-500",
};

export default function TimelineSection() {
  return (
    <section id="timeline" className="section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Journey"
          title="The Founder Timeline"
          subtitle="From first year student to launching a startup that actually ships."
        />

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-500/30 to-transparent sm:-translate-x-1/2" />

          <div className="space-y-8">
            {timelineData.map((entry, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`relative flex items-start gap-4 sm:gap-0 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Mobile: dot on left side */}
                  <div className="sm:hidden flex-shrink-0 mt-1">
                    <div className={`w-8 h-8 rounded-full ${typeColors[entry.type] ?? "bg-gray-600"} flex items-center justify-center text-white z-10 relative`}>
                      {iconMap[entry.icon]}
                    </div>
                  </div>

                  {/* Desktop: half-width card */}
                  <div className={`flex-1 sm:w-[calc(50%-2rem)] ${isLeft ? "sm:pr-8 sm:text-right" : "sm:pl-8"}`}>
                    <div className={`glass rounded-2xl p-4 border border-white/5 hover:border-orange-500/15 transition-all ${
                      "highlight" in entry && entry.highlight ? "border-orange-500/30 glow-orange" : ""
                    }`}>
                      <div className={`flex items-center gap-2 mb-2 ${isLeft ? "sm:justify-end" : ""}`}>
                        <span className="text-xs font-semibold text-orange-500">{entry.date}</span>
                        {"current" in entry && entry.current && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Now</span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-white mb-1">{entry.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">{entry.description}</p>
                    </div>
                  </div>

                  {/* Desktop dot */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-4 z-10">
                    <div className={`w-9 h-9 rounded-full ${typeColors[entry.type] ?? "bg-gray-600"} flex items-center justify-center text-white shadow-lg`}>
                      {iconMap[entry.icon]}
                    </div>
                  </div>

                  {/* Other side spacer for desktop */}
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
