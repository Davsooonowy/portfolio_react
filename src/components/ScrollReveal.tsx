import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const ScrollReveal = ({ children, delay = 0, className }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { amount: 0.15 });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.75,
          delay,
          ease: [0.16, 1, 0.3, 1],
        },
      });
    } else if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const exitingUp = rect.top < 0;
      controls.start({
        opacity: 0,
        y: exitingUp ? -18 : 28,
        scale: exitingUp ? 1.01 : 0.97,
        filter: "blur(3px)",
        transition: {
          duration: 0.5,
          ease: [0.4, 0, 1, 1],
        },
      });
    }
  }, [isInView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.97, filter: "blur(3px)" }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};
