import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { ScrollReveal } from "./ScrollReveal";

const projects = [
  {
    name: "TripWhizz",
    desc: "Full-stack trip planning app with itinerary scheduling and map integration.",
    tech: "Django · React · PostgreSQL",
    url: "https://github.com/davsooonowy/TripWhizz",
  },
  {
    name: "Darwin Simulation",
    desc: "Natural ecosystem simulation with genetic algorithms and evolutionary behavior.",
    tech: "Java · JavaFX",
    url: "https://github.com/davsooonowy/Darwin_Simulation_Project",
  },
  {
    name: "SpeedTyping App",
    desc: "Real-time typing game with WPM tracking, accuracy stats, and progress history.",
    tech: "React · TypeScript",
    url: "https://github.com/davsooonowy/SpeedTyping-App",
  },
];

export const ProjectsSection = () => (
  <SectionWrapper id="projects" number="06" className="py-40 sm:py-56">
    <div className="max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <h2 className="text-section-title text-foreground mb-16">Things I've built.</h2>
      </ScrollReveal>

      {projects.map((project, i) => (
        <ScrollReveal key={project.name} delay={0.08 * i}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row sm:items-center justify-between border-b border-border py-5 sm:h-20 transition-colors duration-200 hover:bg-surface px-0 sm:px-4"
          >
            <div className="flex-1 min-w-0">
              <span className="text-xl sm:text-[28px] font-bold text-foreground group-hover:text-accent transition-colors duration-150 tracking-tight">
                {project.name}
              </span>
              <p className="text-base text-muted-foreground mt-0.5 sm:mt-0 sm:ml-4 sm:inline hidden">
                {project.desc}
              </p>
              <p className="text-sm text-muted-foreground mt-1 sm:hidden">{project.desc}</p>
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0 flex-shrink-0">
              <span className="font-mono text-xs text-muted-foreground hidden md:inline">{project.tech}</span>
              <span className="text-sm text-accent flex items-center gap-1">
                GitHub{" "}
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-[3px]"
                />
              </span>
            </div>
          </a>
        </ScrollReveal>
      ))}
    </div>
  </SectionWrapper>
);
