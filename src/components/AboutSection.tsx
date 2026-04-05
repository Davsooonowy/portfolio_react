import { SectionWrapper } from "./SectionWrapper";
import { ScrollReveal } from "./ScrollReveal";

const stats = [
  { value: "2+", label: "Years of experience" },
  { value: "4.45", label: "University GPA" },
  { value: "10+", label: "Technologies in daily use" },
];

export const AboutSection = () => (
  <SectionWrapper id="about" number="02" className="py-40 sm:py-56">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20">
        <div>
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight" style={{ letterSpacing: "-0.03em" }}>
              I'm a software engineer
              <br />
              who cares about craft.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="text-body mt-8">
              Currently studying Computer Science at AGH University of Kraków (GPA 4.45) and working as a Software Engineer at Upside Lab — where I build full-stack web platforms and cloud infrastructure.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <p className="text-body mt-6">
              I work across the entire stack: Python backends, React frontends, PostgreSQL databases, and GCP deployments. I've shipped open-source AI tooling, co-built a cloud health data platform with the University of Toronto, and delivered production features across multiple domains.
            </p>
          </ScrollReveal>
        </div>

        <div className="flex lg:flex-col gap-12 lg:gap-16 lg:pt-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={0.1 * i}>
              <div>
                <span className="text-5xl sm:text-[56px] font-extrabold text-accent tracking-tight">
                  {stat.value}
                </span>
                <p className="text-[13px] text-muted-foreground mt-1">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  </SectionWrapper>
);
