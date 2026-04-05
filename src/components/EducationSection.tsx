import { ScrollReveal } from "./ScrollReveal";
import { SectionWrapper } from "./SectionWrapper";
import graduationPhoto from "@/assets/graduation_photo.jpg";

const degrees = [
  {
    school: "AGH University of Krakow",
    degree: "B.Sc. Computer Science",
    period: "Oct 2022 – Feb 2026",
    gpa: "4.45",
    status: "completed" as const,
  },
  {
    school: "AGH University of Krakow",
    degree: "M.Sc. Computer Science — Data Science",
    period: "Feb 2026 – present",
    gpa: null,
    status: "enrolled" as const,
  },
];

export const EducationSection = () => (
  <SectionWrapper id="education" number="05" className="py-40 sm:py-56">
    <div className="max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <h2 className="text-section-title text-foreground mb-16">Education</h2>
      </ScrollReveal>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Degrees list */}
        <div className="flex-1 min-w-0">
          {degrees.map((d, i) => (
            <ScrollReveal key={d.degree} delay={0.08 * i}>
              <div className="border-t border-border py-10 sm:py-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 last:border-b">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-2xl font-bold text-foreground">{d.school}</h3>
                    {d.status === "enrolled" && (
                      <span className="inline-flex items-center gap-1.5 h-5 px-2 rounded-full bg-accent/10 border border-accent/25 text-accent font-mono text-[10px] tracking-widest uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        Enrolled
                      </span>
                    )}
                  </div>
                  <p className="text-base text-muted-foreground">{d.degree}</p>
                  <p className="font-mono text-xs text-muted-foreground mt-1 tracking-wider">{d.period}</p>
                </div>
                {d.gpa && (
                  <div className="flex items-baseline gap-1 flex-shrink-0">
                    <span className="text-[56px] font-extrabold text-accent leading-none tracking-tight">{d.gpa}</span>
                    <span className="text-2xl text-muted-foreground">/ 5.0</span>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Graduation photo */}
        <ScrollReveal delay={0.2}>
          <div className="flex-shrink-0 lg:pt-4">
            <div className="relative w-[220px] sm:w-[260px]">
              <img
                src={graduationPhoto}
                alt="Dawid Mularczyk at graduation"
                className="w-full rounded-2xl object-cover shadow-xl"
                draggable={false}
              />
              <div className="absolute -bottom-3 -right-3 h-7 px-3 rounded-full bg-surface border border-border flex items-center shadow-sm">
                <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">Feb 2026</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </SectionWrapper>
);
