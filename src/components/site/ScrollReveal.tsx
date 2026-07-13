
import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";


export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};


export const flipUp = {
  hidden:   { opacity: 0, y: 70, rotateX: -25, scale: 0.88 },
  visible:  {
    opacity: 1, y: 0, rotateX: 0, scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};


export const swipeRight = {
  hidden:  { opacity: 0, x: -80, rotate: -4, scale: 0.9 },
  visible: {
    opacity: 1, x: 0, rotate: 0, scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};


export const swipeLeft = {
  hidden:  { opacity: 0, x: 80, rotate: 4, scale: 0.9 },
  visible: {
    opacity: 1, x: 0, rotate: 0, scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};


export const springPop = {
  hidden:  { opacity: 0, scale: 0.6, y: 20 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 280, damping: 18 },
  },
};


export const tiltIn = {
  hidden:  { opacity: 0, rotateY: 40, x: 40, scale: 0.85 },
  visible: {
    opacity: 1, rotateY: 0, x: 0, scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};


export const blurRise = {
  hidden:  { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};


interface ScrollRevealProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "flipUp" | "swipeRight" | "swipeLeft" | "springPop" | "tiltIn" | "blurRise";
  once?: boolean;
}

const variantMap = { flipUp, swipeRight, swipeLeft, springPop, tiltIn, blurRise };

export function ScrollReveal({
  children,
  className,
  delay = 0,
  variant = "flipUp",
  once = true,
  ...rest
}: ScrollRevealProps) {
  const v = variantMap[variant];
  return (
    <motion.div
      className={className}
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      transition={{ delay, ...((v.visible as any).transition || {}) }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
