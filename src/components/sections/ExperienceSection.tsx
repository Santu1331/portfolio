"use client";

/**
 * ExperienceSection — work experience + education in a timeline layout.
 * Data from data/experience.json and data/education.json.
 */
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import experienceData from "../../../data/experience.json";
import educationData from "../../../data/education.json";

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience & Education"
          title="How I Got Here"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Work Experience</h3>
            </div>
            <div className="space-y-6">
              {experienceData.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative pl-6 border-l border-orange-500/20"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-orange-500" />

                  <div className="glass rounded-2xl p-5 border border-white/5 hover:border-orange-500/20 transition-all">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h4 className="text-base font-bold text-white">{exp.role}</h4>
                        <p className="text-sm font-medium text-orange-400">{exp.company}</p>
                      </div>
                      {exp.current && <Badge variant="green">Current</Badge>}
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {exp.duration}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {exp.location}</span>
                      <Badge variant="orange">{exp.type}</Badge>
                    </div>

                    <p className="text-sm text-gray-400 mb-3">{exp.description}</p>

                    <ul className="space-y-1.5">
                      {exp.responsibilities.map((r) => (
                        <li key={r} className="flex items-start gap-2 text-xs text-gray-400">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {exp.skills.map((s) => (
                        <span key={s} className="tag">{s}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Education</h3>
            </div>
            <div className="space-y-6">
              {educationData.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative pl-6 border-l border-blue-500/20"
                >
                  <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${edu.current ? "bg-blue-500" : "bg-gray-600"}`} />

                  <div className="glass rounded-2xl p-5 border border-white/5 hover:border-blue-500/20 transition-all">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="text-sm font-bold text-white leading-snug">{edu.degree}</h4>
                      {edu.current && <Badge variant="blue">Current</Badge>}
                    </div>
                    <p className="text-sm text-blue-400 font-medium mb-2">{edu.institution}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {edu.duration}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {edu.location}</span>
                    </div>
                    {edu.grade && (
                      <div className="text-xs text-gray-400">Grade: <span className="text-white">{edu.grade}</span></div>
                    )}
                    {"highlights" in edu && edu.highlights && edu.highlights.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {edu.highlights.map((h: string) => (
                          <li key={h} className="flex items-start gap-1.5 text-xs text-gray-400">
                            <CheckCircle className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
