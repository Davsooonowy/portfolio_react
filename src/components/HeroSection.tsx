import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import heroPhoto from "@/assets/hero_page_photo_nobg.png";

const ease = [0.16, 1, 0.3, 1];

export const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.3], [0, -120]);
  const rightX = useTransform(scrollYProgress, [0, 0.3], [0, 120]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={ref}>
      <SectionWrapper id="hero" number="01" fullHeight>
        <div className="max-w-6xl mx-auto px-6 w-full pt-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            {/* Left text */}
            <motion.div
              style={{ x: leftX, opacity: fadeOut }}
              className="flex-1 text-center lg:text-left"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
                className="font-mono text-xs tracking-[0.15em] text-muted-foreground mb-8 uppercase"
              >
                Full-Stack Software Engineer · Kraków, Poland
              </motion.p>

              <h1>
                <motion.span
                  initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 0.4, ease }}
                  className="text-display block text-foreground"
                >
                  Building software
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 0.55, ease }}
                  className="text-display block text-foreground"
                >
                  that scales.
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease }}
                className="text-xl text-muted-foreground mt-8 max-w-[520px] mx-auto lg:mx-0"
              >
                From Django APIs to React frontends, cloud infrastructure to AI agent workflows — end to end.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.9, ease }}
                className="flex gap-4 mt-10 justify-center lg:justify-start"
              >
                <a
                  href="#experience"
                  className="h-12 px-8 rounded-full bg-accent text-accent-foreground text-sm font-medium inline-flex items-center transition-transform duration-150 active:scale-[0.98] hover:shadow-lg"
                >
                  View Work
                </a>
                <a
                  href="#contact"
                  className="h-12 px-8 rounded-full border border-border text-foreground text-sm font-medium inline-flex items-center transition-all duration-150 active:scale-[0.98] hover:bg-surface"
                >
                  Get in Touch
                </a>
              </motion.div>
            </motion.div>

            {/* Right photo placeholder */}
            <motion.div
              style={{ x: rightX, opacity: fadeOut }}
              className="flex-shrink-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1, ease }}
                className="animate-bob"
              >
                <img
                  src={heroPhoto}
                  alt="Dawid Mularczyk"
                  className="w-[260px] sm:w-[300px] object-contain drop-shadow-2xl select-none"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[11px] text-muted-foreground tracking-wider">Scroll</span>
            <ChevronDown size={16} className="text-muted-foreground animate-bounce-chevron" />
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};
