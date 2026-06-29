import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Download, Copy, Check } from 'lucide-react';
import SectionHeading from './SectionHeading';
import MagneticButton from './MagneticButton';
import { site } from '../data/site';
import { withBase } from '../lib/asset';
import { reveal, scaleIn } from '../lib/motion';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-page">
        <SectionHeading prompt="contact" title="Get in touch" />

        <motion.div
          {...reveal}
          variants={scaleIn}
          className="card relative overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-glow" aria-hidden="true" />

          <div className="flex items-center gap-2 border-b border-border bg-bg-elevated px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-terminal-red/80" />
            <span className="h-3 w-3 rounded-full bg-terminal-yellow/80" />
            <span className="h-3 w-3 rounded-full bg-terminal-green/80" />
            <span className="ml-3 font-mono text-xs text-muted">contact — bash</span>
          </div>

          <div className="p-6 sm:p-8">
            <div className="mb-6 font-mono text-sm leading-relaxed">
              <p className="text-text">
                <span className="text-terminal-comment">$</span> contact{' '}
                <span className="text-accent">--mode</span> remote
              </p>
              <p className="mt-2 text-muted">
                <span className="text-terminal-blue">email</span>:{' '}
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 text-terminal-green hover:underline"
                  aria-label="Copy email address"
                >
                  {site.email}
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-terminal-green" aria-hidden="true" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                  )}
                </button>
                {copied && <span className="ml-2 text-xs text-terminal-green">copied!</span>}
              </p>
              <p className="text-muted">
                <span className="text-terminal-blue">status</span>:{' '}
                <span className="text-terminal-yellow">open_to_remote_roles</span>
              </p>
              <p className="text-muted">
                <span className="text-terminal-blue">availability</span>:{' '}
                <span className="text-terminal-green">freelance · full-time · international teams</span>
              </p>
            </div>

            <p className="mb-7 max-w-2xl leading-relaxed text-text">
              Open to <span className="text-accent">100% remote Full-Stack Developer roles</span>,
              freelance opportunities and international teams.
            </p>

            <div className="flex flex-wrap gap-3">
              <MagneticButton href={`mailto:${site.email}`} className="btn-primary">
                <Mail className="h-4 w-4" aria-hidden="true" /> Email
              </MagneticButton>
              <MagneticButton href={site.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
                <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
              </MagneticButton>
              <MagneticButton href={withBase(site.cvFile)} download={site.cvDownloadName} className="btn-ghost">
                <Download className="h-4 w-4" aria-hidden="true" /> Download CV
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
