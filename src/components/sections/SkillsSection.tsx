"use client";

/**
 * SkillsSection — animated skill bars grouped by category.
 * Data-driven from data/skills.json.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Monitor, Server, Wrench, Briefcase } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import skillsData from "../../../data/skills.json";

const categoryIcons: Record<string, React.ReactNode> = {
  code2: <Code2 className="w-4 h-4" />,
  monitor: <Monitor className="w-4 h-4" />,
  server: <Server className="w-4 h-4" />,
  wrench: <Wrench className="w-4 h-4" />,
  briefcase: <Briefcase className="w-4 h-4" />,
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(skillsData.categories[0].id);
  const active = skillsData.categories.find((c) => c.id === activeCategory)!;

  return (
    <section id="skills" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="Full Stack & Beyond"
          subtitle="From frontend pixels to backend pipelines — plus the founder skills that tie it all together."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category tabs — left */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {skillsData.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                  activeCategory === cat.id
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                    : "glass text-gray-400 hover:text-white border border-white/5"
                }`}
              >
                {categoryIcons[cat.icon]}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skills — right */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl p-6 border border-white/5"
            >
              <h3 className="text-base font-semibold text-white mb-6 flex items-center gap-2">
                {categoryIcons[active.icon]}
                {active.label}
              </h3>
              <div className="space-y-5">
                {active.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-200">{skill.name}</span>
                      <span className="text-xs text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-fill"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: skill.level / 100 }}
                        transition={{ delay: i * 0.08 + 0.2, duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tech logos row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-6">Daily Toolkit</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["React", "Next.js", "React Native", "TypeScript", "Python", "Node.js", "Firebase", "Tailwind CSS", "Git", "Figma", "Vercel", "VS Code"].map((tech) => (
              <div key={tech} className="px-4 py-2 glass rounded-xl text-sm text-gray-400 border border-white/5 hover:border-orange-500/20 hover:text-orange-400 transition-all cursor-default">
                {tech}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
