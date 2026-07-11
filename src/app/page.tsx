/**
 * Home page — assembles all sections.
 * All data is sourced from /data/*.json — no hard-coded content.
 */
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import StartupSection from "@/components/sections/StartupSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import TimelineSection from "@/components/sections/TimelineSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import GallerySection from "@/components/sections/GallerySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ResumeSection from "@/components/sections/ResumeSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StartupSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <TimelineSection />
      <AchievementsSection />
      <GallerySection />
      <TestimonialsSection />
      <ResumeSection />
      <ContactSection />
    </>
  );
}
