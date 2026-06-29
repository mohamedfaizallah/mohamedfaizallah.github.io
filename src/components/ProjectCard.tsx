import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowUpRight, FileText, PlayCircle, ImageIcon } from 'lucide-react';
import type { Project } from '../data/projects';
import { MediaImage } from './ProjectMedia';
import { reveal, fadeUp } from '../lib/motion';

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenCaseStudy }: ProjectCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div {...reveal} variants={fadeUp} style={{ perspective: 1200 }}>
      <motion.article
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={reduce ? undefined : { y: -6 }}
        className="group relative h-full"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-br from-accent/60 via-accent-violet/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="card relative flex h-full flex-col overflow-hidden transition-shadow duration-300 group-hover:shadow-glow">
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            className="relative aspect-video w-full overflow-hidden bg-bg-elevated"
            aria-label={`Open case study for ${project.title}`}
          >
            <MediaImage
              src={project.screenshots[0].src}
              alt={`${project.title} — ${project.tagline}`}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" aria-hidden="true" />

            <span className="absolute left-3 top-3 flex gap-1.5">
              <span className="badge gap-1 bg-bg/70 text-[10px] backdrop-blur">
                <ImageIcon className="h-3 w-3" aria-hidden="true" /> {project.screenshots.length} screenshots
              </span>
              {project.video && (
                <span className="badge gap-1 bg-bg/70 text-[10px] text-accent backdrop-blur">
                  <PlayCircle className="h-3 w-3" aria-hidden="true" /> Demo
                </span>
              )}
            </span>

            <span className="absolute bottom-3 right-3 flex translate-y-2 items-center gap-1 rounded-md bg-accent/20 px-2.5 py-1 font-mono text-xs text-accent opacity-0 ring-1 ring-inset ring-accent/40 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              open case_study <ArrowUpRight className="h-3 w-3" />
            </span>
          </button>

          <div className="flex flex-1 flex-col p-6">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="font-mono text-xs text-accent">{project.role}</span>
              <span className="font-mono text-xs text-muted">{project.date}</span>
            </div>

            <h3 className="text-lg font-semibold leading-snug text-white">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>

            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted/90">
              {project.problem}
            </p>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.labels.map((l) => (
                <li
                  key={l}
                  className="rounded-md border border-accent/25 bg-accent/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent/90"
                >
                  {l}
                </li>
              ))}
            </ul>

            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 6).map((s) => (
                <li key={s} className="badge">
                  {s}
                </li>
              ))}
              {project.stack.length > 6 && (
                <li className="badge text-accent">+{project.stack.length - 6}</li>
              )}
            </ul>

            <div className="mt-6 pt-2">
              <button
                type="button"
                onClick={() => onOpenCaseStudy(project)}
                className="btn-primary w-full px-4 py-2"
              >
                <FileText className="h-4 w-4" aria-hidden="true" /> Case Study
              </button>
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
