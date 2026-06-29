import { motion } from 'framer-motion';
import { Boxes, Cpu, Database, Workflow } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { skillGroups } from '../data/skills';
import { reveal, staggerContainer, fadeUp, staggerFast, item } from '../lib/motion';

const icons: Record<string, typeof Cpu> = {
  frontend: Boxes,
  backend: Cpu,
  infra: Database,
  business: Workflow,
};

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-page">
        <SectionHeading
          prompt="stack"
          title="Technical stack"
          subtitle="A full-stack toolkit for shipping web apps, APIs, dashboards and automation."
        />

        <motion.div
          {...reveal}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {skillGroups.map((group) => {
            const Icon = icons[group.id] ?? Cpu;
            return (
              <motion.div key={group.id} variants={fadeUp}>
                <motion.article whileHover={{ y: -6 }} className="group relative h-full">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-br from-accent/50 via-accent-violet/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="card relative flex h-full flex-col p-6 transition-shadow duration-300 group-hover:shadow-glow">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="rounded-lg bg-accent/10 p-2.5 text-accent ring-1 ring-inset ring-accent/30 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                    </div>

                    <p className="mb-5 text-sm leading-relaxed text-muted">{group.description}</p>

                    <motion.ul variants={staggerFast} className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <motion.li
                          key={skill}
                          variants={item}
                          whileHover={{ y: -3 }}
                          className="badge hover:border-accent/50 hover:text-accent"
                        >
                          {skill}
                        </motion.li>
                      ))}
                    </motion.ul>

                    <div className="mt-5 overflow-hidden">
                      <p className="max-h-0 font-mono text-xs text-terminal-comment opacity-0 transition-all duration-300 group-hover:max-h-10 group-hover:opacity-100">
                        <span className="text-terminal-green">$</span> loaded {group.skills.length}{' '}
                        modules · ~/{group.id}
                      </p>
                    </div>
                  </div>
                </motion.article>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
