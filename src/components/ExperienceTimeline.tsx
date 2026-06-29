import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { experience } from '../data/experience';
import { reveal, slideInLeft, staggerContainer, staggerFast, item } from '../lib/motion';

export default function ExperienceTimeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 70%', 'end 60%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="section">
      <div className="container-page">
        <SectionHeading prompt="experience" title="Experience" />

        <div ref={lineRef} className="relative">
          <div className="absolute left-4 top-2 h-full w-px bg-border sm:left-5" aria-hidden="true" />
          <motion.div
            className="absolute left-4 top-2 h-full w-px origin-top bg-gradient-to-b from-accent via-accent-violet to-accent shadow-[0_0_10px_rgba(57,208,216,0.6)] sm:left-5"
            style={{ scaleY }}
            aria-hidden="true"
          />

          <div className="space-y-10">
            {experience.map((job) => (
              <motion.article
                key={job.id}
                {...reveal}
                variants={slideInLeft}
                className="relative pl-14 sm:pl-16"
              >
                <span className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-bg-elevated text-accent shadow-glow sm:h-10 sm:w-10">
                  <Briefcase className="h-4 w-4" aria-hidden="true" />
                  {job.current && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal-green opacity-70" />
                      <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-bg bg-terminal-green" />
                    </span>
                  )}
                </span>

                <div className="card p-6 transition-shadow duration-300 hover:shadow-glow">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-xl font-semibold text-white">
                      {job.role} <span className="text-accent">@ {job.company}</span>
                    </h3>
                    <span className="font-mono text-xs text-muted">{job.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{job.summary}</p>

                  <motion.ul
                    {...reveal}
                    variants={staggerContainer}
                    className="mt-5 space-y-2.5"
                  >
                    {job.bullets.map((b, bi) => (
                      <motion.li
                        key={bi}
                        variants={item}
                        className="flex gap-3 text-sm leading-relaxed text-text"
                      >
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {b}
                      </motion.li>
                    ))}
                  </motion.ul>

                  <motion.ul {...reveal} variants={staggerFast} className="mt-5 flex flex-wrap gap-2">
                    {job.stack.map((s) => (
                      <motion.li key={s} variants={item} className="badge">
                        {s}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
