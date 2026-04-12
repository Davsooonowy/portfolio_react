import { SectionWrapper } from "./SectionWrapper";
import { ScrollReveal } from "./ScrollReveal";

const jobs = [
  {
    company: "Upside Lab",
    role: "Software Engineer",
    date: "Nov 2024 – Present",
    location: "Kraków, Poland",
    current: true,
    paragraphs: [
      "Enthusiast (167 ★ on GitHub) — core contributor to an open-source agentic AI framework for e-commerce. Built backend services in Django REST Framework with PostgreSQL, Celery task queues, and LangChain-powered agent orchestration. Implemented streaming LLM responses, a custom tool integration system, and agent configuration UI in React.",
      "HealthDataNexus — cloud health data platform built with the University of Toronto. Flask, Django, GCP, Terraform, Docker, Kubernetes. REST API design, PostgreSQL schema management, microservice deployment.",
      "Admin panels · collaboration environments · E2E testing · CI/CD pipelines",
    ],
    tech: "Django · React · LangChain · GCP · Terraform · Kubernetes",
  },
  {
    company: "Lekta AI",
    role: "Junior Software Developer",
    date: "Mar 2024 – Jun 2024",
    location: "Kraków, Poland",
    current: false,
    paragraphs: [
      "Backend development in Django for a voice analytics platform — transforming phone conversations into structured, searchable data. Feature delivery, production bug fixes, unit test coverage. Agile team of 7–10 developers.",
    ],
    tech: "Django · Python · PostgreSQL",
  },
];

export const ExperienceSection = () => (
  <SectionWrapper id="experience" number="03" className="py-40 sm:py-56">
    <div className="max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <h2 className="text-section-title text-foreground mb-20">Where I've worked.</h2>
      </ScrollReveal>

      {jobs.map((job, i) => (
        <div key={job.company}>
          {i > 0 && <div className="border-t border-border my-20" />}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
              <ScrollReveal>
                <h3 className="text-4xl sm:text-6xl lg:text-[72px] font-extrabold text-foreground tracking-tight leading-none" style={{ letterSpacing: "-0.03em" }}>
                  {job.company}
                </h3>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="text-right flex flex-col items-start sm:items-end gap-1">
                  <span className="text-sm text-muted-foreground">{job.date}</span>
                  <span className="text-sm text-muted-foreground">{job.location}</span>
                  {job.current && (
                    <span className="text-xs font-mono text-accent tracking-wider">Current →</span>
                  )}
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.12}>
              <p className="text-base text-foreground font-medium mb-6">{job.role}</p>
            </ScrollReveal>

            {job.paragraphs.map((p, pi) => (
              <ScrollReveal key={pi} delay={0.18 + pi * 0.06}>
                <p className="text-body mb-4">{p}</p>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={0.35}>
              <p className="font-mono text-sm text-muted-foreground mt-6">{job.tech}</p>
            </ScrollReveal>
          </div>
        </div>
      ))}
    </div>
  </SectionWrapper>
);
