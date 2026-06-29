import { Mail, Linkedin } from 'lucide-react';
import { site } from '../data/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-10">
      <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          <span className="text-accent">~/</span>
          {site.role} · 100% Remote · © {year}
        </p>
        <div className="flex items-center gap-4">
          <a href={`mailto:${site.email}`} aria-label="Email" className="text-muted hover:text-accent">
            <Mail className="h-5 w-5" />
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted hover:text-accent">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
      <p className="container-page mt-4 text-center font-mono text-[11px] text-terminal-comment">
        Built with React · TypeScript · Vite · Tailwind CSS · Framer Motion
      </p>
    </footer>
  );
}
