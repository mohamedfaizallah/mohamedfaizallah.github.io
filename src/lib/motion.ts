import type { Variants, Transition } from 'framer-motion';

// Shared spring used across the site for a smooth, premium feel.
export const spring: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 18,
  mass: 0.8,
};

export const easeOut: Transition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

/** Fade + rise into place. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: easeOut },
};

/** Container that staggers its children's reveal. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/** Tighter stagger for dense lists (badges, bullets). */
export const staggerFast: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: spring },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: easeOut },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: easeOut },
};

/** Item used inside a staggerContainer. */
export const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: easeOut },
};

/** Hover lift for cards. Use as `whileHover="hover"` with this variant set. */
export const cardHover: Variants = {
  rest: { y: 0, transition: spring },
  hover: { y: -6, transition: spring },
};

/** Modal + backdrop transitions. */
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { ...spring, stiffness: 160 } },
  exit: { opacity: 0, y: 18, scale: 0.98, transition: { duration: 0.18 } },
};

/** Standard scroll-reveal props for sections/elements. */
export const reveal = {
  initial: 'hidden' as const,
  whileInView: 'show' as const,
  viewport: { once: true, amount: 0.25 },
};
