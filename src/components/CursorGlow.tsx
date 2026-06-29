import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

const SIZE = 600; // diameter of the glow

/**
 * Soft radial glow that follows the cursor on desktop pointers only.
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
export default function CursorGlow() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  // Track the top-left of the glow (cursor minus half its size).
  const x = useMotionValue(-SIZE);
  const y = useMotionValue(-SIZE);
  const sx = useSpring(x, { stiffness: 300, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 300, damping: 40, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - SIZE / 2);
      y.set(e.clientY - SIZE / 2);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[5] rounded-full blur-2xl"
      aria-hidden="true"
      style={{
        x: sx,
        y: sy,
        width: SIZE,
        height: SIZE,
        background: 'radial-gradient(circle, rgba(57,208,216,0.08), transparent 65%)',
      }}
    />
  );
}
