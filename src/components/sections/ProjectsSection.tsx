"use client";

/**
 * ProjectsSection — features project cards driven by data/projects.json.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Rocket, ChevronRight, Star } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import projectsData from "../../../data/projects.json";

type Project = (typeof projectsData)[0];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(projectsData.map((p) => p.category)))];
  const filtered = activeFilter === "All" ? projectsData : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Real Products, Real Impact"
          subtitle="Not side projects — actual products solving real problems."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === cat
                  ? "bg-orange-500 text-white"
                  : "glass text-gray-400 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project as Project} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="gradient-border glass rounded-2xl overflow-hidden card-hover group"
    >
      {/* Card header */}
      <div className="relative p-6 pb-0">
        <div className="flex items-start justify-between mb-4">
          <div>
            {project.featured && (
              <div className="flex items-center gap-1 text-xs text-yellow-500 mb-2">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </div>
            )}
            <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
            <p className="text-sm text-gray-400">{project.subtitle}</p>
          </div>
          {/* Status badge */}
          <Badge variant={project.status === "Live" ? "green" : project.status === "Completed" ? "blue" : "gray"}>
            {project.status}
          </Badge>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="px-6 pb-4">
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Metrics for startup */}
      {"metrics" in project && project.metrics && project.metrics.length > 0 && (
        <div className="px-6 pb-4 grid grid-cols-3 gap-3">
          {project.metrics.slice(0, 3).map((m) => (
            <div key={m.label} className="text-center p-2 rounded-lg bg-white/[0.03]">
              <div className="text-base font-bold text-white">{m.value}</div>
              <div className="text-[10px] text-gray-500">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="px-6 pb-6 flex items-center gap-3">
        <Link
          href={`/projects/${project.id}`}
          className="flex items-center gap-1.5 text-sm text-orange-400 hover:text-orange-300 font-medium transition-colors group/link"
        >
          View Details
          <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-sm text-gray-400 hover:text-white border border-white/5 hover:border-orange-500/30 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-sm text-gray-400 hover:text-white border border-white/5 hover:border-white/20 transition-all"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            Code
          </a>
        )}
      </div>
    </motion.article>
  );
}
