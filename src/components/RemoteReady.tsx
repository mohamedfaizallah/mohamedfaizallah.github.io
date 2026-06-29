import { motion } from 'framer-motion';
import { MessageSquare, FileText, GitBranch, Clock, Target, Globe2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { reveal, staggerContainer, fadeUp } from '../lib/motion';

const items = [
  { icon: MessageSquare, title: 'Async communication', desc: 'Clear, low-friction collaboration across time zones.' },
  { icon: FileText, title: 'Written updates', desc: 'Documented progress, decisions and trade-offs.' },
  { icon: GitBranch, title: 'Git-based collaboration', desc: 'Branches, reviews and clean commit history.' },
  { icon: Clock, title: 'Timezone-flexible', desc: 'Comfortable overlapping hours when it matters.' },
  { icon: Target, title: 'Business-oriented execution', desc: 'Ship what moves the product, not just tickets.' },
  { icon: Globe2, title: 'International teams', desc: 'Used to working with distributed, multicultural teams.' },
];

export default function RemoteReady() {
  return (
    <section id="remote" className="section">
      <div className="container-page">
        <SectionHeading
          prompt="remote"
          title="Remote-ready"
          subtitle="Set up to contribute effectively from day one in a distributed team."
        />

        <motion.div
          {...reveal}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((it) => (
            <motion.article
              key={it.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="card flex items-start gap-3 p-5 transition-shadow duration-300 hover:shadow-glow"
            >
              <span className="mt-0.5 rounded-lg bg-accent/10 p-2 text-accent ring-1 ring-inset ring-accent/30">
                <it.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">{it.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{it.desc}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
