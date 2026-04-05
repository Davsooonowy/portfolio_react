import { ScrollReveal } from "./ScrollReveal";

export const EducationSection = () => (
  <section id="education" className="py-28 sm:py-40">
    <div className="max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <div className="border-t border-b border-border py-12 sm:py-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-foreground">AGH University of Kraków</h3>
            <p className="text-base text-muted-foreground mt-1">
              B.Sc. Computer Science · Oct 2022 – Feb 2026
            </p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[56px] font-extrabold text-accent leading-none tracking-tight">4.45</span>
            <span className="text-2xl text-muted-foreground">/ 5.0</span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
