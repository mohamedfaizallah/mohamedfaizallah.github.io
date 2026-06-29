import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { site, languages, education } from '../data/site';
import { skillGroups } from '../data/skills';
import { experience } from '../data/experience';
import { projects } from '../data/projects';
import { withBase } from '../lib/asset';

function ResumeBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-6 first:border-t-0 first:pt-0">
      <h3 className="mb-3 font-mono text-sm uppercase tracking-wider text-accent">{title}</h3>
      {children}
    </section>
  );
}

export default function ResumeSection() {
  return (
    <section id="resume" className="section">
      <div className="container-page">
        <SectionHeading
          prompt="resume"
          title="Resume / CV"
          subtitle="ATS-friendly, readable as plain text. Download the PDF or read it inline below."
        />

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="card mx-auto max-w-3xl p-6 sm:p-10"
        >
          <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white">{site.resumeTitle}</h3>
              <p className="mt-2 font-mono text-xs leading-relaxed text-muted">
                {site.location} | 100% remote | {site.phone} | {site.email}
                <br />
                LinkedIn: {site.linkedin}
              </p>
            </div>
            <a href={withBase(site.cvFile)} download={site.cvDownloadName} className="btn-primary">
              <Download className="h-4 w-4" aria-hidden="true" /> Download PDF
            </a>
          </header>

          <ResumeBlock title="Profile">
            <p className="text-sm leading-relaxed text-text">
              Remote Full-Stack Developer building practical business web applications with React,
              TypeScript and Rust. Comfortable across the whole flow: data modelling, REST API
              development, authentication (JWT/OAuth), dashboards, admin panels, payments, file
              handling and automation. I work with an owner's mindset — clean, intentional commits,
              attention to detail and a focus on performance and optimization, continuously enhancing
              each project rather than stopping at “good enough”.
            </p>
          </ResumeBlock>

          <ResumeBlock title="Technical Stack">
            <dl className="space-y-2 text-sm">
              {skillGroups.map((g) => (
                <div key={g.id} className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
                  <dt className="font-semibold text-white sm:w-44 sm:flex-shrink-0">{g.title}:</dt>
                  <dd className="text-muted">{g.skills.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </ResumeBlock>

          <ResumeBlock title="Experience">
            {experience.map((job) => (
              <div key={job.id} className="mb-5 last:mb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-white">
                    {job.role} | {job.company}
                  </p>
                  <p className="font-mono text-xs text-muted">{job.period}</p>
                </div>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted">
                  {job.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-muted">
                  <span className="text-text">Stack:</span> {job.stack.join(', ')}
                </p>
              </div>
            ))}
          </ResumeBlock>

          <ResumeBlock title="Selected Projects">
            <ul className="space-y-3 text-sm">
              {projects.map((p) => (
                <li key={p.id}>
                  <p className="font-semibold text-white">
                    {p.title} <span className="font-normal text-muted">— {p.date}</span>
                  </p>
                  <p className="text-muted">{p.tagline}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    <span className="text-text">Tech:</span> {p.stack.join(', ')}
                  </p>
                </li>
              ))}
            </ul>
          </ResumeBlock>

          <ResumeBlock title="Education">
            <ul className="space-y-1 text-sm text-muted">
              {education.map((e, i) => (
                <li key={i}>
                  {e.degree} — {e.school} ({e.year})
                </li>
              ))}
            </ul>
          </ResumeBlock>

          <ResumeBlock title="Languages">
            <p className="text-sm text-muted">{languages.join(', ')}</p>
          </ResumeBlock>

          <ResumeBlock title="Remote Work">
            <p className="text-sm leading-relaxed text-muted">
              Comfortable with async communication, written updates, Git-based collaboration and
              timezone-flexible work.
            </p>
          </ResumeBlock>
        </motion.article>
      </div>
    </section>
  );
}
