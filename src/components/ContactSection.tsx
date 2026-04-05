import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { ScrollReveal } from "./ScrollReveal";
import { ContactForm } from "./ContactForm";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

interface Contact {
  icon: IconComponent;
  label: string;
  value: string;
  href?: string;
  opensForm?: boolean;
}

const contacts: Contact[] = [
  { icon: Mail, label: "Email", value: "Send a message", opensForm: true },
  { icon: LinkedInIcon, label: "LinkedIn", value: "linkedin.com/in/dawidmularczykwork", href: "https://linkedin.com/in/dawidmularczykwork" },
  { icon: GitHubIcon, label: "GitHub", value: "github.com/davsooonowy", href: "https://github.com/davsooonowy" },
];

const rowClass =
  "group flex items-center h-[72px] border-b border-border transition-colors duration-200 hover:bg-surface px-2 w-full text-left";

export const ContactSection = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <SectionWrapper id="contact" number="07" fullHeight className="py-40">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="text-center mb-16">
          <ScrollReveal>
            <h2
              className="text-6xl sm:text-7xl lg:text-[96px] font-extrabold text-foreground tracking-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Let's work
              <br />
              together.
            </h2>
          </ScrollReveal>
        </div>

        <div className="max-w-2xl mx-auto">
          {contacts.map((c, i) => {
            const Icon = c.icon;
            const inner = (
              <>
                <span className="w-10 flex-shrink-0 flex items-center justify-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-md bg-surface border border-border text-muted-foreground group-hover:bg-accent group-hover:border-accent group-hover:text-accent-foreground transition-all duration-200">
                    <Icon size={15} strokeWidth={1.75} />
                  </span>
                </span>
                <span className="font-mono text-sm text-muted-foreground w-20 flex-shrink-0">
                  {c.label}
                </span>
                <span className="text-base text-foreground group-hover:text-accent transition-colors duration-150 flex-1 truncate">
                  {c.value}
                </span>
                <ArrowRight
                  size={16}
                  className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-[5px] flex-shrink-0"
                />
              </>
            );

            return (
              <ScrollReveal key={c.label} delay={0.08 * i}>
                {c.opensForm ? (
                  <button className={rowClass} onClick={() => setFormOpen(true)}>
                    {inner}
                  </button>
                ) : (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={rowClass}
                  >
                    {inner}
                  </a>
                )}
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.3}>
          <p className="text-center text-xs text-muted-foreground mt-24">
            © 2026 Dawid Mularczyk
          </p>
        </ScrollReveal>
      </div>

      <ContactForm open={formOpen} onOpenChange={setFormOpen} />
    </SectionWrapper>
  );
};
