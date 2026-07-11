/**
 * Project detail page — reads from data/projects.json.
 * Generates static paths at build time.
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, MapPin, CheckCircle } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import Badge from "@/components/ui/Badge";
import projectsData from "../../../../data/projects.json";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-orange-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <Badge variant={project.status === "Live" ? "green" : "blue"} className="mb-3">
                {project.status}
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{project.title}</h1>
              <p className="text-lg text-gray-400">{project.subtitle}</p>
            </div>
            <div className="flex gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-gray-300 hover:text-white text-sm transition-colors">
                  <GitHubIcon className="w-4 h-4" /> GitHub
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {project.duration}</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {project.type}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
          </div>

          <p className="text-gray-300 leading-relaxed text-base">{project.description}</p>
        </div>

        {/* Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {project.problem && (
            <div className="glass rounded-2xl p-6 border border-red-500/10">
              <h2 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-3">The Problem</h2>
              <p className="text-gray-300 text-sm leading-relaxed">{project.problem}</p>
            </div>
          )}
          {project.solution && (
            <div className="glass rounded-2xl p-6 border border-green-500/10">
              <h2 className="text-sm font-bold text-green-400 uppercase tracking-wider mb-3">The Solution</h2>
              <p className="text-gray-300 text-sm leading-relaxed">{project.solution}</p>
            </div>
          )}
        </div>

        {/* Metrics */}
        {"metrics" in project && project.metrics && project.metrics.length > 0 && (
          <div className="glass rounded-2xl p-6 border border-orange-500/15 mb-10">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-5">Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="text-center p-4 rounded-xl bg-white/[0.03]">
                  <div className="text-2xl font-bold text-white mb-1">{m.value}</div>
                  <div className="text-xs text-gray-500">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="glass rounded-2xl p-6 border border-white/5 mb-10">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-5">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        {project.techStack && (
          <div className="glass rounded-2xl p-6 border border-white/5 mb-10">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-5">Tech Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(project.techStack).map(([layer, techs]) => (
                <div key={layer}>
                  <div className="text-xs text-gray-500 capitalize mb-2">{layer}</div>
                  <div className="space-y-1">
                    {(techs as string[]).map((t) => (
                      <div key={t} className="tag w-fit">{t}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Roles */}
        {project.roles && project.roles.length > 0 && (
          <div className="glass rounded-2xl p-6 border border-white/5 mb-10">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-5">My Roles</h2>
            <div className="flex flex-wrap gap-2">
              {project.roles.map((r) => (
                <span key={r} className="px-3 py-1.5 rounded-xl glass text-xs text-gray-300 border border-white/5">{r}</span>
              ))}
            </div>
          </div>
        )}

        {/* Founder story */}
        {"founderStory" in project && project.founderStory && (
          <div className="glass rounded-2xl p-6 border border-orange-500/15 mb-10">
            <h2 className="text-sm font-bold text-orange-400 uppercase tracking-wider mb-4">Founder Story</h2>
            <p className="text-gray-300 leading-relaxed italic">&ldquo;{project.founderStory}&rdquo;</p>
          </div>
        )}

        {/* Timeline */}
        {"timeline" in project && project.timeline && project.timeline.length > 0 && (
          <div className="glass rounded-2xl p-6 border border-white/5 mb-10">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-5">Timeline</h2>
            <div className="space-y-3">
              {(project.timeline as Array<{ date: string; event: string }>).map((t) => (
                <div key={t.date} className="flex items-center gap-4">
                  <span className="text-xs text-orange-500 font-medium w-24 flex-shrink-0">{t.date}</span>
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="text-sm text-gray-300">{t.event}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Roadmap */}
        {"roadmap" in project && project.roadmap && project.roadmap.length > 0 && (
          <div className="glass rounded-2xl p-6 border border-blue-500/10 mb-10">
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-5">Future Roadmap</h2>
            <ul className="space-y-2">
              {(project.roadmap as string[]).map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-gray-300">
                  <span className="text-blue-500 mt-0.5">→</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
