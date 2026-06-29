import { motion } from 'framer-motion';
import { reveal, fadeUp } from '../lib/motion';

interface SectionHeadingProps {
  prompt: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ prompt, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div {...reveal} variants={fadeUp} className="mb-12">
      <p className="mb-2 font-mono text-sm text-accent">
        <span className="text-terminal-comment">$</span> cd ~/{prompt}
        <span className="ml-0.5 inline-block h-4 w-2 animate-blink bg-accent align-middle" aria-hidden="true" />
      </p>
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
        <motion.span
          aria-hidden="true"
          className="hidden h-px flex-1 origin-left bg-gradient-to-r from-accent/60 to-transparent sm:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </div>
      {subtitle && <p className="mt-3 max-w-2xl text-muted">{subtitle}</p>}
    </motion.div>
  );
}
