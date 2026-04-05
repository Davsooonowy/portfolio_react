import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { ScrollProgress } from "@/components/ScrollProgress";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { TechSection } from "@/components/TechSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { EducationSection } from "@/components/EducationSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => (
  <ThemeProvider>
    <ScrollProgress />
    <Navigation />
    <main>
      <HeroSection />
      {/* Full-bleed rule — the one grid-breaking element */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 border-t border-border mb-16" />
      <AboutSection />
      <TechSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  </ThemeProvider>
);

export default Index;
