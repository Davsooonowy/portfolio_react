import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { ScrollReveal } from "./ScrollReveal";

const contacts = [
  { emoji: "✉️", label: "Email", value: "dawid.mularczykk@gmail.com", href: "mailto:dawid.mularczykk@gmail.com" },
  { emoji: "💼", label: "LinkedIn", value: "linkedin.com/in/dawidmularczykwork", href: "https://linkedin.com/in/dawidmularczykwork" },
  { emoji: "🐙", label: "GitHub", value: "github.com/davsooonowy", href: "https://github.com/davsooonowy" },
];

export const ContactSection = () => (
  <SectionWrapper id="contact" number="06" fullHeight className="py-40">
    <div className="max-w-6xl mx-auto px-6 w-full">
      <div className="text-center mb-16">
        <ScrollReveal>
          <h2 className="text-6xl sm:text-7xl lg:text-[96px] font-extrabold text-foreground tracking-tight" style={{ letterSpacing: "-0.03em" }}>
            Let's work
            <br />
            together.
          </h2>
        </ScrollReveal>
      </div>

      <div className="max-w-2xl mx-auto">
        {contacts.map((c, i) => (
          <ScrollReveal key={c.label} delay={0.08 * i}>
            <a
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center h-[72px] border-b border-border transition-colors duration-200 hover:bg-surface px-2"
            >
              <span className="text-2xl w-10 flex-shrink-0">{c.emoji}</span>
              <span className="font-mono text-sm text-muted-foreground w-20 flex-shrink-0">{c.label}</span>
              <span className="text-base text-foreground group-hover:text-accent transition-colors duration-150 flex-1 truncate">
                {c.value}
              </span>
              <ArrowRight
                size={16}
                className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-[5px] flex-shrink-0"
              />
            </a>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.3}>
        <p className="text-center text-xs text-muted-foreground mt-24">
          © 2025 Dawid Mularczyk
        </p>
      </ScrollReveal>
    </div>
  </SectionWrapper>
);
