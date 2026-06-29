import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function AnimatedBackground() {
  const reduce = useReducedMotion();

  const columns = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: `${(i / 14) * 100 + Math.random() * 3}%`,
        delay: Math.random() * 8,
        duration: 9 + Math.random() * 8,
        chars: Array.from({ length: 14 }).map(() => (Math.random() > 0.5 ? '1' : '0')),
      })),
    [],
  );

  const blobs = useMemo(
    () => [
      { x: '12%', y: '14%', size: 420, color: 'rgba(57,208,216,0.10)', dur: 22 },
      { x: '78%', y: '8%', size: 360, color: 'rgba(139,124,255,0.10)', dur: 26 },
      { x: '60%', y: '70%', size: 480, color: 'rgba(57,208,216,0.07)', dur: 30 },
    ],
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_-10%,rgba(57,208,216,0.08),transparent_60%)]" />

      <div className="absolute inset-0 bg-grid-faint [background-size:46px_46px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]" />

      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            background: b.color,
          }}
          animate={
            reduce
              ? undefined
              : { x: [0, 30, -20, 0], y: [0, -25, 15, 0], opacity: [0.7, 1, 0.8, 0.7] }
          }
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {!reduce && (
        <div className="absolute inset-0 opacity-[0.06]">
          {columns.map((col) => (
            <motion.div
              key={col.id}
              className="absolute top-[-30%] flex flex-col gap-1 font-mono text-[11px] leading-tight text-accent"
              style={{ left: col.left }}
              initial={{ y: '-30%' }}
              animate={{ y: '130%' }}
              transition={{
                duration: col.duration,
                delay: col.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {col.chars.map((c, ci) => (
                <span key={ci}>{c}</span>
              ))}
            </motion.div>
          ))}
        </div>
      )}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,8,12,0.7))]" />
    </div>
  );
}
