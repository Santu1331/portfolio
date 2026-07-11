/**
 * Footer — minimal, elegant with social links and quick nav.
 */
import Link from "next/link";
import { Mail, Zap } from "lucide-react";
import { GitHubIcon, LinkedInIcon, InstagramIcon, TwitterIcon } from "@/components/ui/SocialIcons";
import personal from "../../../data/personal.json";

const socialIcons: Record<string, React.ReactNode> = {
  github: <GitHubIcon className="w-4 h-4" />,
  linkedin: <LinkedInIcon className="w-4 h-4" />,
  instagram: <InstagramIcon className="w-4 h-4" />,
  twitter: <TwitterIcon className="w-4 h-4" />,
  email: <Mail className="w-4 h-4" />,
};

const socials = [
  { label: "GitHub", href: personal.github, icon: "github" },
  { label: "LinkedIn", href: personal.linkedin, icon: "linkedin" },
  { label: "Instagram", href: personal.instagram, icon: "instagram" },
  { label: "Email", href: `mailto:${personal.email}`, icon: "email" },
];

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#070709]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">Santosh Sangnod</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Founder & CEO of FeedoZone. Full Stack Developer. Building the future of rural food delivery.
            </p>
            <p className="text-xs text-gray-600 mt-3">{personal.college}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-gray-500 hover:text-orange-400 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Connect
            </h3>
            <div className="flex gap-3 flex-wrap">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500/30 transition-all"
                >
                  {socialIcons[s.icon]}
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">{personal.email}</p>
            <p className="text-xs text-gray-600 mt-1">{personal.location}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Santosh Sangnod. Crafted with Next.js & Framer Motion.
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Available for opportunities
          </div>
        </div>
      </div>
    </footer>
  );
}
