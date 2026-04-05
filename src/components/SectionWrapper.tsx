import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionWrapperProps {
  children: ReactNode;
  number?: string;
  id: string;
  className?: string;
  fullHeight?: boolean;
}

export const SectionWrapper = ({ children, number, id, className = "", fullHeight }: SectionWrapperProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden ${fullHeight ? "min-h-screen flex items-center" : ""} ${className}`}
    >
      {number && (
        <motion.span
          style={{ y: watermarkY }}
          className="watermark-number"
          aria-hidden="true"
        >
          {number}
        </motion.span>
      )}
      <div className="section-content w-full">{children}</div>
    </section>
  );
};
