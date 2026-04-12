import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { ScrollReveal } from "./ScrollReveal";

const projects = [
  {
    name: "Enthusiast",
    number: "01",
    desc: "Open-source agentic AI framework for e-commerce — RAG, streaming LLM responses, custom tool integration, and agent orchestration. 167 ★ on GitHub.",
    tech: "Python · Django · React · TypeScript · LangChain",
    url: "https://github.com/upsidelab/enthusiast",
    accentColor: "#8b5cf6",
    gradient: "bg-gradient-to-br from-violet-500/10 to-purple-600/10",
    border: "border-violet-500/20",
  },
  {
    name: "TripWhizz",
    number: "02",
    desc: "Full-stack trip planning PWA with itinerary scheduling, collaborative features, and map integration.",
    tech: "Django · React · PostgreSQL",
    url: "https://github.com/davsooonowy/TripWhizz",
    accentColor: "#0ea5e9",
    gradient: "bg-gradient-to-br from-sky-500/10 to-cyan-500/10",
    border: "border-sky-500/20",
  },
];

export const ProjectsSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <SectionWrapper id="projects" number="04" className="py-40 sm:py-56">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="text-section-title text-foreground mb-16">Things I've built.</h2>
        </ScrollReveal>

        {projects.map((project, i) => (
          <ScrollReveal key={project.name} delay={0.08 * i}>
            <div
              className="border-b border-border"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Main row */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row sm:items-center justify-between py-5 sm:h-20 transition-colors duration-200 hover:bg-surface px-0 sm:px-4"
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

              {/* Expanded preview panel */}
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`rounded-xl mx-0 sm:mx-4 mb-5 p-6 sm:p-8 ${project.gradient} border ${project.border}`}
                    >
                      <div className="flex items-start gap-6 sm:gap-10">
                        {/* Large outlined project number */}
                        <span
                          className="text-[80px] sm:text-[108px] font-extrabold leading-none select-none hidden sm:block flex-shrink-0"
                          style={{
                            WebkitTextStroke: `1.5px ${project.accentColor}`,
                            color: "transparent",
                            opacity: 0.45,
                          }}
                        >
                          {project.number}
                        </span>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                            {project.name}
                          </h3>
                          <p className="text-muted-foreground mt-2 text-sm leading-relaxed max-w-lg">
                            {project.desc}
                          </p>

                          {/* Tech chips */}
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.tech.split(" · ").map((t) => (
                              <span
                                key={t}
                                className="font-mono text-xs px-3 py-1.5 rounded-full border border-border bg-background/60 text-muted-foreground"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold transition-opacity hover:opacity-70"
                            style={{ color: project.accentColor }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            View on GitHub
                            <ArrowRight size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
};
