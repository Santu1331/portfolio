"use client";

/**
 * AchievementsSection — national competitions, hackathons, awards.
 * Data-driven from data/awards.json and data/leadership.json.
 */
import { motion } from "framer-motion";
import { Trophy, Calendar, Building2, Cpu, Palette, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import awardsData from "../../../data/awards.json";
import leadershipData from "../../../data/leadership.json";

const leadershipIcons: Record<string, React.ReactNode> = {
  cpu: <Cpu className="w-6 h-6" />,
  palette: <Palette className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
};

export default function AchievementsSection() {
  return (
    <section id="achievements" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Achievements"
          title="Competing at Every Level"
          subtitle="From college fests to national competitions — consistent performer."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awardsData.map((award, i) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="gradient-border glass rounded-2xl p-6 border border-white/5 hover:border-orange-500/20 card-hover group"
            >
              {/* Badge / position */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{award.badge}</div>
                <Badge variant={award.level === "National" ? "orange" : "blue"}>
                  {award.level}
                </Badge>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-white mb-2 leading-snug">{award.title}</h3>
              <p className="text-sm text-orange-400 font-medium mb-1">{award.competition}</p>

              <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {award.organizer}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {award.date}</span>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed mb-4">{award.description}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {award.skills.map((s) => (
                  <span key={s} className="tag text-[10px]">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Leadership section — powered by data/leadership.json */}
        <div className="mt-16">
          <SectionHeading
            eyebrow="Leadership"
            title="Leading Teams & Communities"
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadershipData.map((l, i) => (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass rounded-2xl p-6 border border-white/5 hover:border-purple-500/20 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                  {leadershipIcons[l.icon] ?? <Users className="w-6 h-6" />}
                </div>
                <h3 className="text-base font-bold text-white mb-1">{l.role}</h3>
                <p className="text-sm text-purple-400 mb-0.5">{l.organization}</p>
                <p className="text-xs text-gray-600 mb-3">{l.institution} · {l.duration}</p>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{l.description}</p>
                {l.responsibilities && l.responsibilities.length > 0 && (
                  <ul className="space-y-1.5">
                    {l.responsibilities.slice(0, 3).map((r) => (
                      <li key={r} className="flex items-start gap-2 text-xs text-gray-500">
                        <span className="text-purple-500 mt-0.5">→</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
