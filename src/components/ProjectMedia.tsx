import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ImageOff, Play } from 'lucide-react';
import { withBase } from '../lib/asset';
import type { ProjectImage } from '../data/projects';

/** A pretty browser-window mockup used when an image is missing. */
function MockupPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-br from-bg-elevated to-bg-soft">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-terminal-red/70" />
        <span className="h-2 w-2 rounded-full bg-terminal-yellow/70" />
        <span className="h-2 w-2 rounded-full bg-terminal-green/70" />
        <span className="ml-2 truncate font-mono text-[10px] text-terminal-comment">{label}</span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4">
        <div className="grid w-full max-w-[80%] grid-cols-3 gap-2 opacity-40">
          <div className="col-span-1 h-12 rounded bg-border-soft" />
          <div className="col-span-2 h-12 rounded bg-border" />
          <div className="col-span-2 h-8 rounded bg-border" />
          <div className="col-span-1 h-8 rounded bg-accent/20" />
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-terminal-comment">
          <ImageOff className="h-3.5 w-3.5" aria-hidden="true" /> add screenshot
        </span>
      </div>
    </div>
  );
}

/** Image with a graceful mockup fallback when the file is missing. */
export function MediaImage({
  src,
  alt,
  className,
  eager,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={className} role="img" aria-label={`${alt} (image not available)`}>
        <MockupPlaceholder label={src} />
      </div>
    );
  }
  return (
    <img
      src={withBase(src)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setError(true)}
      className={className}
    />
  );
}

/** Video inside a browser/device frame, with a fallback when missing. */
export function MediaVideo({
  src,
  title,
  poster,
}: {
  src: string;
  title: string;
  poster?: string;
}) {
  const [error, setError] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-card">
      {/* device/browser top bar */}
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-terminal-red/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-terminal-yellow/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-terminal-green/70" />
        <span className="ml-3 flex-1 truncate rounded bg-bg px-2 py-0.5 text-center font-mono text-[10px] text-terminal-comment">
          {title} — demo
        </span>
      </div>
      {error ? (
        <div
          className="flex aspect-video w-full flex-col items-center justify-center gap-2 text-terminal-comment"
          role="img"
          aria-label={`${title} demo video not available`}
        >
          <Play className="h-7 w-7" aria-hidden="true" />
          <span className="px-3 text-center font-mono text-xs">Add demo video: {src}</span>
        </div>
      ) : (
        <video
          controls
          preload="metadata"
          playsInline
          poster={poster ? withBase(poster) : undefined}
          onError={() => setError(true)}
          className="aspect-video w-full bg-black"
          aria-label={`${title} demo video`}
        >
          <source src={withBase(src)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

/** Gallery of captioned screenshots used inside the case study modal. */
export function ScreenshotCarousel({ images, title }: { images: ProjectImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);
  const count = images.length;

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(((next % count) + count) % count);
  };

  // Keyboard arrows navigate the gallery while the modal is open.
  useEffect(() => {
    if (count <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setDir(-1);
        setIndex((i) => (i - 1 + count) % count);
      } else if (e.key === 'ArrowRight') {
        setDir(1);
        setIndex((i) => (i + 1) % count);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [count]);

  if (count === 0) return null;
  const active = images[index];

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-card">
        {/* browser frame top bar */}
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-terminal-red/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-terminal-yellow/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-terminal-green/70" />
          <span className="ml-3 flex-1 truncate rounded bg-bg px-2 py-0.5 text-center font-mono text-[10px] text-terminal-comment">
            {title}
          </span>
          <span className="rounded bg-bg px-2 py-0.5 font-mono text-[10px] text-muted">
            {index + 1} / {count}
          </span>
        </div>

        {/*
          Slides use a keyed motion.div (no AnimatePresence). A nested
          AnimatePresence here would sit inside the case-study modal's
          AnimatePresence and can stall the modal's exit. Re-mounting on index
          change replays `initial -> animate` for the slide-in, no exit needed.
        */}
        <div className="relative aspect-video w-full bg-[#0b0f16]">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="absolute inset-0"
          >
            <MediaImage src={active.src} alt={active.alt} className="h-full w-full object-contain" />
          </motion.div>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous screenshot"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-bg/80 p-2 text-text backdrop-blur transition-colors hover:text-accent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next screenshot"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-bg/80 p-2 text-text backdrop-blur transition-colors hover:text-accent"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* caption */}
        <p className="border-t border-border px-3 py-2 text-center text-xs text-muted">{active.alt}</p>
      </div>

      {/* thumbnail strip */}
      {count > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show screenshot ${i + 1}: ${img.alt}`}
              aria-current={i === index}
              className={`relative h-12 w-20 flex-shrink-0 overflow-hidden rounded-md border transition-all ${
                i === index
                  ? 'border-accent ring-1 ring-accent'
                  : 'border-border opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={withBase(img.src)}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
