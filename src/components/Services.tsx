import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Code2,
  Server,
  ShieldCheck,
  CreditCard,
  Workflow,
  Palette,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { reveal, staggerContainer, fadeUp } from '../lib/motion';

const services = [
  {
    icon: LayoutDashboard,
    title: 'SaaS Dashboards & Admin Panels',
    desc: 'Data-dense dashboards and admin panels for business web applications — tables, filters, charts and clear workflows that teams actually use.',
  },
  {
    icon: Code2,
    title: 'React / TypeScript Frontends',
    desc: 'Modern frontends built with React, TypeScript, Redux Toolkit and RTK Query — fast, typed, responsive and maintainable.',
  },
  {
    icon: Server,
    title: 'Rust Backend APIs',
    desc: 'REST APIs in Rust with solid data models, validation and real-time updates (SSE) — the backend that powers the product.',
  },
  {
    icon: ShieldCheck,
    title: 'Authentication & Role-Based Access',
    desc: 'Secure authentication with JWT/OAuth flows and role-based access so the right users see the right screens and data.',
  },
  {
    icon: CreditCard,
    title: 'Payment & File Upload Flows',
    desc: 'Payment flows, wallets, invoices, file upload and PDF generation — the practical money-and-documents parts of a product.',
  },
  {
    icon: Workflow,
    title: 'Automation & Internal Tools',
    desc: 'Workflow automation, integrations and internal tools that remove repetitive manual work and connect business systems.',
  },
  {
    icon: Palette,
    title: 'UI/UX-Focused Web Interfaces',
    desc: 'Clean, modern interfaces with a real eye for UI/UX — products that are functional and pleasant to use, not just wired up.',
  },
];

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container-page">
        <SectionHeading
          prompt="services"
          title="What I Can Build"
          subtitle="Full-stack web development for startups, businesses and SaaS products — frontend, backend, APIs and automation."
        />

        <motion.div
          {...reveal}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <motion.article
              key={s.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="card flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-glow"
            >
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent ring-1 ring-inset ring-accent/30">
                <s.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-base font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
