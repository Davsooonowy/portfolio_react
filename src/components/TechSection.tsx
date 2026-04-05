import { useRef, useLayoutEffect } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useScroll,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { ScrollReveal } from "./ScrollReveal";

// Base speed (px per frame at 60 fps)
const BASE_SPEED = 0.45;
// Max speed multiplier on fast scroll
const MAX_BOOST = 9;
// How quickly the multiplier chases the target (0–1, lower = smoother)
const LERP = 0.07;

// Each set is repeated 3× so halfWidth always exceeds any screen width
const makeRow = (items: string[]) => [...items, ...items, ...items];

const rows = [
  makeRow(["Python", "Django", "FastAPI", "Flask", "DRF", "Celery", "LangChain"]),
  makeRow(["React", "TypeScript", "JavaScript", "Tailwind CSS", "ShadCN UI", "Vite", "PostgreSQL", "Redis"]),
  makeRow(["GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Linux", "Pytest", "Postman", "Git", "Agile / Scrum"]),
];

interface MarqueeRowProps {
  items: string[];
  direction: -1 | 1;
  scrollVelocity: MotionValue<number>;
}

const MarqueeRow = ({ items, direction, scrollVelocity }: MarqueeRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const halfWidth = useRef(0);
  // Smoothed speed multiplier — this is what makes accel/decel visible
  const multiplier = useRef(1);

  // useLayoutEffect runs before paint → no flash on rightward rows
  useLayoutEffect(() => {
    if (!rowRef.current) return;
    // We render [...items, ...items] so the seam is at the exact midpoint
    halfWidth.current = rowRef.current.scrollWidth / 2;
    // Rightward rows start mid-loop so they always show chips from the first frame
    if (direction === 1) x.set(-halfWidth.current);
  }, []);

  useAnimationFrame((_, delta) => {
    const hw = halfWidth.current;
    if (!hw) return;

    // Lerp the multiplier toward the scroll-velocity target each frame
    const vel = Math.abs(scrollVelocity.get());
    const target = 1 + Math.min(vel * 0.006, MAX_BOOST - 1);
    multiplier.current += (target - multiplier.current) * LERP;

    const step = BASE_SPEED * multiplier.current * (delta / 16);

    // direction -1 → leftward (x decreases), direction 1 → rightward (x increases)
    const move = direction === -1 ? -step : step;
    let next = x.get() + move;

    // Seamless loop
    if (direction === -1 && next <= -hw) next += hw;
    if (direction === 1 && next >= 0) next -= hw;

    x.set(next);
  });

  return (
    <motion.div
      ref={rowRef}
      style={{ x }}
      className="flex gap-3 will-change-transform"
    >
      {/* Duplicate the already-3× set once more for the seamless loop */}
      {[...items, ...items].map((tool, j) => (
        <span
          key={`${tool}-${j}`}
          className="flex-shrink-0 inline-flex items-center px-4 py-2.5 rounded-lg bg-surface border border-border text-sm text-foreground font-mono whitespace-nowrap select-none cursor-default"
        >
          {tool}
        </span>
      ))}
    </motion.div>
  );
};

export const TechSection = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  return (
    <SectionWrapper id="tech" number="03" className="py-40 sm:py-56">
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <ScrollReveal>
          <h2 className="text-section-title text-foreground">The tools I reach for.</h2>
        </ScrollReveal>
      </div>

      <div className="overflow-hidden space-y-3 py-1">
        {rows.map((row, i) => (
          <MarqueeRow
            key={i}
            items={row}
            direction={i % 2 === 0 ? -1 : 1}
            scrollVelocity={scrollVelocity}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};
