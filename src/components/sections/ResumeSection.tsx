"use client";

/**
 * ResumeSection — resume preview with download button and timeline.
 */
import { motion } from "framer-motion";
import { Download, FileText, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import personal from "../../../data/personal.json";

const resumeTimeline = [
  { year: "2024", event: "Started B.Tech CSBS at TKIET Warananagar" },
  { year: "2025", event: "Won 2nd Prize at MBA Fusion Fest 2K25" },
  { year: "2026 Feb", event: "Built JalNetra — IoT Smart Water Monitoring System" },
  { year: "2026 Mar", event: "Won 3rd Prize at National Paper Presentation" },
  { year: "2026", event: "Won 3rd Prize at IIT Patna Chemathon" },
  { year: "2026 Apr", event: "Founded FeedoZone — launched MVP" },
  { year: "Now", event: "Building FeedoZone · Open to Opportunities" },
];

export default function ResumeSection() {
  return (
    <section id="resume" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Resume"
          title="My Journey in One Page"
          subtitle="Download a clean PDF version of my full resume."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Resume timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">Career Timeline</h3>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/50 to-transparent" />
              <div className="space-y-6 pl-6">
                {resumeTimeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="relative"
                  >
                    <div className={`absolute -left-[25px] top-0 w-2.5 h-2.5 rounded-full border-2 ${
                      item.year === "Now"
                        ? "bg-green-500 border-green-500"
                        : "bg-orange-500 border-orange-500"
                    }`} />
                    <span className="text-xs font-bold text-orange-500 block mb-1">{item.year}</span>
                    <p className="text-sm text-gray-300">{item.event}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Download card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass rounded-2xl p-8 border border-white/5 text-center glow-orange">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-5">
                <FileText className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Santosh Sangnod</h3>
              <p className="text-sm text-gray-400 mb-1">Founder & CEO · Full Stack Developer</p>
              <p className="text-xs text-gray-600 mb-6">{personal.college}</p>

              <div className="space-y-3">
                <a
                  href={personal.resume}
                  download
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/20"
                >
                  <Download className="w-4 h-4" />
                  Download PDF Resume
                </a>
                <a
                  href={personal.founderProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl glass border border-white/10 text-gray-300 hover:text-white font-medium text-sm transition-all hover:-translate-y-0.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Founder Profile
                </a>
              </div>

              <p className="text-xs text-gray-600 mt-5">
                Last updated July 2026 · PDF format
              </p>
            </div>

            {/* Quick summary */}
            <div className="mt-4 glass rounded-2xl p-5 border border-white/5">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Quick Facts</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">→</span> Solo founder at 20 years old
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">→</span> Built full-stack startup from zero
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">→</span> 3× national competition winner
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">→</span> Tech & Design leader at college
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
