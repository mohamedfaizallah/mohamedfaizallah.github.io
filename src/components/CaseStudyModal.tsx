import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Project } from '../data/projects';
import { ScreenshotCarousel, MediaVideo } from './ProjectMedia';
import { backdropVariants, modalVariants } from '../lib/motion';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

type TabId = 'overview' | 'features' | 'technical' | 'result';
const tabs: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'technical', label: 'Technical decisions' },
  { id: 'result', label: 'Result / value' },
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">{label}</h4>
      {children}
    </div>
  );
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [tab, setTab] = useState<TabId>('overview');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (project) setTab('overview');
  }, [project]);

  useEffect(() => {
    if (!project) return;
    restoreFocusRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => closeRef.current?.focus(), 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), video',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      window.clearTimeout(t);
      restoreFocusRef.current?.focus?.();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-study-backdrop"
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-md sm:p-8"
          variants={backdropVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            className="card my-4 w-full max-w-3xl"
          >
            <div className="sticky top-0 z-10 rounded-t-xl border-b border-border bg-bg-card/95 backdrop-blur">
              <div className="flex items-start justify-between gap-4 p-6 pb-4">
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                    <span className="text-accent">{project.role}</span>
                    <span>•</span>
                    <span>{project.date}</span>
                  </div>
                  <h3 id="case-study-title" className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {project.labels.map((l) => (
                      <li
                        key={l}
                        className="rounded-md border border-accent/25 bg-accent/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent/90"
                      >
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close case study"
                  className="rounded-md p-2 text-muted hover:bg-bg-elevated hover:text-accent"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div role="tablist" aria-label="Case study sections" className="flex gap-1 overflow-x-auto px-4">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={tab === t.id}
                    type="button"
                    onClick={() => setTab(t.id)}
                    className={`relative whitespace-nowrap px-3 py-2.5 text-sm transition-colors ${
                      tab === t.id ? 'text-accent' : 'text-muted hover:text-text'
                    }`}
                  >
                    {t.label}
                    {tab === t.id && (
                      <motion.span
                        layoutId="modal-tab"
                        className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-accent"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-7 p-6">
              <ScreenshotCarousel images={project.screenshots} title={project.title} />
              {project.video && (
                <MediaVideo
                  src={project.video}
                  title={project.title}
                  poster={project.screenshots[0].src}
                />
              )}

              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="badge">
                    {s}
                  </li>
                ))}
              </ul>

              <div className="min-h-[8rem]">
                <motion.div
                  key={tab}
                  role="tabpanel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {tab === 'overview' && (
                    <>
                      <Field label="Context">
                        <p className="text-sm leading-relaxed text-text">{project.caseStudy.context}</p>
                      </Field>
                      <Field label="Problem solved">
                        <p className="text-sm leading-relaxed text-text">{project.problem}</p>
                      </Field>
                      <Field label="What I built">
                        <p className="text-sm leading-relaxed text-text">{project.caseStudy.whatIBuilt}</p>
                      </Field>
                    </>
                  )}

                  {tab === 'features' && (
                    <Field label="Key features">
                      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {project.features.map((f) => (
                          <li key={f} className="flex gap-2 text-sm text-muted">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </Field>
                  )}

                  {tab === 'technical' && (
                    <>
                      <Field label="Technical highlights">
                        <ul className="space-y-2">
                          {project.technicalHighlights.map((t) => (
                            <li key={t} className="flex gap-2 text-sm text-text">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-violet" aria-hidden="true" />
                              {t}
                            </li>
                          ))}
                        </ul>
                      </Field>
                      <Field label="Technical decisions">
                        <ul className="space-y-2">
                          {project.caseStudy.technicalDecisions.map((t) => (
                            <li key={t} className="flex gap-2 text-sm text-text">
                              <span className="select-none font-mono text-accent">→</span>
                              {t}
                            </li>
                          ))}
                        </ul>
                      </Field>
                    </>
                  )}

                  {tab === 'result' && (
                    <Field label="Result / value">
                      <p className="text-sm leading-relaxed text-text">{project.caseStudy.result}</p>
                    </Field>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
