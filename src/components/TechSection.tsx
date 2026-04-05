import { SectionWrapper } from "./SectionWrapper";
import { ScrollReveal } from "./ScrollReveal";

const techs = [
  { category: "Languages", tools: "Python, JavaScript, TypeScript, Java, SQL" },
  { category: "Backend", tools: "Django, FastAPI, Flask, DRF, Celery, LangChain" },
  { category: "Frontend", tools: "React, Tailwind CSS, ShadCN UI, Vite" },
  { category: "Cloud & DevOps", tools: "GCP, Docker, Kubernetes, Terraform, GitHub Actions" },
  { category: "Databases", tools: "PostgreSQL, Redis" },
];

export const TechSection = () => (
  <SectionWrapper id="tech" number="03" className="py-40 sm:py-56">
    <div className="max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <h2 className="text-section-title text-foreground mb-16">The tools I reach for.</h2>
      </ScrollReveal>

      <div>
        {techs.map((row, i) => (
          <ScrollReveal key={row.category} delay={0.06 * i}>
            <div className="flex items-center border-b border-border h-14 px-0 sm:px-6 transition-colors duration-200 hover:bg-surface group">
              <span className="font-mono text-sm text-muted-foreground w-36 sm:w-44 flex-shrink-0">
                {row.category}
              </span>
              <span className="text-base text-foreground">{row.tools}</span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </SectionWrapper>
);
