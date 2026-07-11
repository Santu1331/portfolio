"use client";

/**
 * StartupSection — dedicated FeedoZone section with metrics, vision, and story.
 */
import { motion } from "framer-motion";
import { Rocket, Target, Eye, CheckCircle, ExternalLink, TrendingUp } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import startupData from "../../../data/startup.json";

export default function StartupSection() {
  return (
    <section id="startup" className="section relative overflow-hidden">
      {/* Orange glow background for this section */}
      <div className="absolute left-0 right-0 h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="My Startup"
          title="FeedoZone"
          subtitle={startupData.tagline}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Mission & Vision */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-6 border border-orange-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-base font-bold text-white">Mission</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{startupData.mission}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass rounded-2xl p-6 border border-blue-500/15"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-base font-bold text-white">Vision</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{startupData.vision}</p>
            </motion.div>

            {/* Current goals */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-2xl p-6 border border-white/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-base font-bold text-white">Current Goals</h3>
              </div>
              <ul className="space-y-2">
                {startupData.currentGoals.map((goal) => (
                  <li key={goal} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {goal}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Metrics + Toolkit */}
          <div className="space-y-6">
            {/* Live metrics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-6 border border-orange-500/20 glow-orange"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-white">Live Metrics</h3>
                <span className="flex items-center gap-1.5 text-xs text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {startupData.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">{m.value}</div>
                    <div className="text-xs text-gray-500">{m.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tech toolkit */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass rounded-2xl p-6 border border-white/5"
            >
              <h3 className="text-base font-bold text-white mb-4">Tech Stack</h3>
              <div className="grid grid-cols-2 gap-3">
                {startupData.toolkit.map((tool) => (
                  <div key={tool.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-sm font-bold text-orange-400">
                      {tool.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">{tool.name}</div>
                      <div className="text-[10px] text-gray-500">{tool.purpose}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex gap-3"
            >
              <a
                href={startupData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-all hover:-translate-y-0.5"
              >
                <ExternalLink className="w-4 h-4" />
                Visit FeedoZone
              </a>
              <a
                href={startupData.founderProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass border border-white/10 text-gray-300 hover:text-white text-sm font-medium transition-all hover:-translate-y-0.5"
              >
                <Rocket className="w-4 h-4" />
                Founder Profile
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
