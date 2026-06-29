import { Fragment } from 'react';
import { motion } from 'framer-motion';
import {
  Lightbulb,
  Database,
  Server,
  LayoutDashboard,
  Workflow as WorkflowIcon,
  Rocket,
  ChevronRight,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { reveal, staggerContainer, fadeUp, scaleIn, item } from '../lib/motion';

const steps = [
  {
    icon: Lightbulb,
    label: 'Business Need',
    code: '// understand the problem',
    desc: 'Start from the real workflow and the outcome that matters — not the tech. Clarify what actually needs to happen before writing a line of code.',
  },
  {
    icon: Database,
    label: 'Data Model',
    code: '// design the foundation',
    desc: 'Design clean entities and relationships so everything built on top stays simple, consistent and easy to extend.',
  },
  {
    icon: Server,
    label: 'API',
    code: '// build the backend',
    desc: 'Build typed REST routes in Rust with authentication, role-based access and validation baked in from the start.',
  },
  {
    icon: LayoutDashboard,
    label: 'Frontend',
    code: '// implement the UI',
    desc: 'Implement React + TypeScript dashboards, forms and UI with real state management and attention to every detail.',
  },
  {
    icon: WorkflowIcon,
    label: 'Automation',
    code: '// remove manual work',
    desc: 'Replace repetitive manual steps with scripts, scheduled jobs and integrations so the product runs itself.',
  },
  {
    icon: Rocket,
    label: 'Deployment',
    code: '// ship & keep improving',
    desc: 'Test, optimize and deploy with Docker/Nginx — then keep profiling and enhancing instead of stopping at “good enough”.',
  },
];

export default function Workflow() {
  return (
    <section id="workflow" className="section">
      <div className="container-page">
        <SectionHeading
          prompt="workflow"
          title="How I build products"
          subtitle="I own the full pipeline — from a business need to a deployed, automated product."
        />

        {/* Pipeline strip */}
        <motion.div
          {...reveal}
          variants={staggerContainer}
          className="mb-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 sm:gap-x-3"
        >
          {steps.map((step, i) => (
            <Fragment key={step.label}>
              <motion.span
                variants={scaleIn}
                className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 font-mono text-xs text-accent sm:text-sm"
              >
                {step.label}
              </motion.span>
              {i < steps.length - 1 && (
                <motion.span variants={item} aria-hidden="true">
                  <ChevronRight className="h-4 w-4 text-accent/50" />
                </motion.span>
              )}
            </Fragment>
          ))}
        </motion.div>

        {/* Detailed step cards */}
        <motion.div
          {...reveal}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {steps.map((step, i) => (
            <motion.article key={step.label} variants={fadeUp} className="group relative h-full">
              {/* animated gradient border on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-br from-accent/50 via-accent-violet/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="card relative flex h-full flex-col p-6 transition-shadow duration-300 group-hover:shadow-glow">
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-inset ring-accent/30 transition-transform duration-300 group-hover:scale-110">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-3xl font-bold text-border-soft transition-colors duration-300 group-hover:text-accent/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white">{step.label}</h3>
                <p className="mt-1 font-mono text-xs text-terminal-comment">{step.code}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.desc}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
