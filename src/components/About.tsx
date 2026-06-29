import { motion } from 'framer-motion';
import { Code2, Layers, Server, Workflow } from 'lucide-react';
import SectionHeading from './SectionHeading';

const highlights = [
  { icon: Layers, label: 'Whole product flows', desc: 'Data model → backend → frontend state → UI.' },
  { icon: Server, label: 'APIs & auth', desc: 'REST APIs, JWT/OAuth, role-based access.' },
  { icon: Code2, label: 'Frontend craft', desc: 'React + TypeScript dashboards and admin panels.' },
  { icon: Workflow, label: 'Business automation', desc: 'ERP, e-commerce and marketplace workflows.' },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-page">
        <SectionHeading prompt="about" title="About me" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <p className="text-lg leading-relaxed text-text">
              I'm a <span className="text-accent">product-oriented Full-Stack Developer</span>{' '}
              building complete web applications with React, TypeScript and Rust: dashboards, APIs,
              admin panels, authentication, file handling, payments, automation and modern user
              interfaces.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              What I enjoy most is building the full flow of a product — understanding the need,
              structuring the data, developing the backend, creating a clear interface and refining
              the user experience until the product feels smooth and genuinely useful.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              I've shipped several full-stack projects, including a freelance platform with payments
              and training features, an event ticketing app with QR-code validation and gate
              scanning, and a recruitment CRM with candidate management, file handling, roles and
              notifications.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              On the frontend, I pay close attention to <span className="text-accent">UI/UX</span>. I
              like crafting clean, modern and easy-to-use interfaces — because a good application
              shouldn't just work well, it should also feel simple, professional and pleasant to use.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card flex items-start gap-3 p-4"
              >
                <span className="mt-0.5 rounded-md bg-accent/10 p-2 text-accent ring-1 ring-inset ring-accent/30">
                  <h.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{h.label}</span>
                  <span className="block text-sm text-muted">{h.desc}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
