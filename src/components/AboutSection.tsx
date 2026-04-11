import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { ScrollReveal } from "./ScrollReveal";
import portraitSrc from "@/assets/about/portrait.jpeg";
import guitarSrc from "@/assets/about/guitar.jpg";
import handballSrc from "@/assets/about/handball.jpg";

const photos = [
  {
    src: portraitSrc,
    caption: "Kraków, winter evening",
    tag: "That's me",
    objectPosition: "center",
  },
  {
    src: guitarSrc,
    caption: "Late-night guitar session",
    tag: "Music",
    objectPosition: "center",
  },
  {
    src: handballSrc,
    caption: "AGH Handball — Liga Akademicka AZS",
    tag: "Sport",
    objectPosition: "top",
  },
];

const interests = [
  { emoji: "🎸", label: "Guitar" },
  { emoji: "🤾", label: "Handball" },
  { emoji: "🏋️", label: "Gym" },
  { emoji: "🚗", label: "Opel Astra J" },
  { emoji: "🎵", label: "Music" },
  { emoji: "📈", label: "Investing" },
  { emoji: "🚴", label: "Cycling" },
  { emoji: "🏀", label: "Basketball" },
  { emoji: "📚", label: "Reading" },
  { emoji: "🌍", label: "GeoGuessr" },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48,
    opacity: 0,
  }),
};

export const AboutSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + photos.length) % photos.length);
  };

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  return (
    <SectionWrapper id="about" number="02" className="py-40 sm:py-56">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.85fr] gap-20 items-start">

          {/* ── Left column: text ── */}
          <div>
            <ScrollReveal>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight"
                style={{ letterSpacing: "-0.03em" }}
              >
                I'm a software engineer
                <br />
                who cares about craft.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-body mt-8">
                I'm Dawid — 23 years old, CS Master's student in{" "}
                <span className="text-foreground font-medium">Computer Science — Data Science at AGH University of Kraków</span>{" "}
                and Software Engineer at{" "}
                <span className="text-foreground font-medium">Upside Lab</span>, where I build
                full-stack web platforms and cloud infrastructure across Python, React, PostgreSQL, and GCP.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-body mt-5">
                Outside of work I play guitar, train at the gym most days, and compete in handball in the{" "}
                <span className="text-foreground font-medium">AZS AGH Handball club</span>. I enjoy all kinds of
                music — from party anthems to classical pieces — love a good drive in my{" "}
                <span className="text-foreground font-medium">Opel Astra J</span>, and lately I've been getting
                into investing, TV series, and slowly warming up to books. Give me a basketball court, a
                volleyball net, or a bike route with friends and I'm happy. Oh — and I'm a{" "}
                <span className="text-foreground font-medium">GeoGuessr</span> nerd: I can sometimes
                nail a country from a single streetview glimpse, and I know which region of Poland
                you're from just by your postal code.
              </p>
            </ScrollReveal>

            {/* Interest tags */}
            <ScrollReveal delay={0.35}>
              <div className="flex flex-wrap gap-2 mt-8">
                {interests.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium bg-surface text-foreground border border-border hover:border-accent/50 transition-colors duration-200 cursor-default"
                  >
                    <span>{item.emoji}</span>
                    {item.label}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* ── Right column: photo carousel ── */}
          <ScrollReveal delay={0.1}>
            <div>
              {/* Photo frame */}
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-surface">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.img
                    key={current}
                    src={photos[current].src}
                    alt={photos[current].caption}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute inset-0 w-full h-full object-cover select-none"
                    style={{ objectPosition: photos[current].objectPosition }}
                    draggable={false}
                  />
                </AnimatePresence>

                {/* Prev / Next buttons */}
                <button
                  onClick={() => navigate(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center hover:bg-background/90 transition-colors duration-150 z-10"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground" />
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center hover:bg-background/90 transition-colors duration-150 z-10"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-4 h-4 text-foreground" />
                </button>

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />
              </div>

              {/* Caption */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 flex items-start justify-between"
                >
                  <div>
                    <p className="text-[13px] font-medium text-foreground leading-snug">
                      {photos[current].caption}
                    </p>
                    <p className="text-[12px] text-muted-foreground mt-0.5">
                      {photos[current].tag}
                    </p>
                  </div>
                  <span className="text-[12px] text-muted-foreground tabular-nums shrink-0 ml-4 pt-0.5">
                    {current + 1} / {photos.length}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Indicator dots */}
              <div className="flex items-center gap-1.5 mt-3">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to photo ${i + 1}`}
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-6 bg-accent"
                        : "w-2 bg-border hover:bg-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </SectionWrapper>
  );
};
