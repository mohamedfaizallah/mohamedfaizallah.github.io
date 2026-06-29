import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface BootLine {
  prompt?: boolean;
  text: string;
  className: string;
}

const bootLines: BootLine[] = [
  { prompt: true, text: 'npm run build', className: 'text-text' },
  { text: '✓ build passed', className: 'text-terminal-green' },
  { text: '✓ stack detected: React + TypeScript + Rust', className: 'text-terminal-blue' },
  { text: '✓ mode: remote-ready', className: 'text-terminal-yellow' },
];

type Token = { text: string; className?: string };

const codeLines: Token[][] = [
  [
    { text: 'const', className: 'text-terminal-purple' },
    { text: ' developer', className: 'text-terminal-blue' },
    { text: ' = {' },
  ],
  [
    { text: '  role', className: 'text-terminal-red' },
    { text: ': ' },
    { text: '"Full-Stack Developer"', className: 'text-terminal-green' },
    { text: ',' },
  ],
  [
    { text: '  stack', className: 'text-terminal-red' },
    { text: ': [' },
    { text: '"React"', className: 'text-terminal-green' },
    { text: ', ' },
    { text: '"TypeScript"', className: 'text-terminal-green' },
    { text: ', ' },
    { text: '"Rust"', className: 'text-terminal-green' },
    { text: '],' },
  ],
  [
    { text: '  focus', className: 'text-terminal-red' },
    { text: ': [' },
    { text: '"Web Apps"', className: 'text-terminal-green' },
    { text: ', ' },
    { text: '"APIs"', className: 'text-terminal-green' },
    { text: ', ' },
    { text: '"Automation"', className: 'text-terminal-green' },
    { text: '],' },
  ],
  [
    { text: '  workMode', className: 'text-terminal-red' },
    { text: ': ' },
    { text: '"100% Remote"', className: 'text-terminal-green' },
    { text: ',' },
  ],
  [{ text: '}' }],
];

const lineLen = (line: Token[]) => line.reduce((n, t) => n + t.text.length, 0);

export default function TerminalCard() {
  const reduce = useReducedMotion();
  const [bootStep, setBootStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const totalChars = codeLines.reduce((n, l) => n + lineLen(l), 0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (reduce) {
      setBootStep(bootLines.length);
      setRevealed(totalChars);
      setTyping(true);
      return;
    }

    const timers: number[] = [];
    bootLines.forEach((_, i) => {
      timers.push(window.setTimeout(() => setBootStep(i + 1), 350 + i * 420));
    });
    timers.push(window.setTimeout(() => setTyping(true), 350 + bootLines.length * 420 + 250));
    return () => timers.forEach(clearTimeout);
  }, [reduce, totalChars]);

  useEffect(() => {
    if (!typing || reduce) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setRevealed(Math.floor(p * totalChars));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [typing, reduce, totalChars]);

  let budget = revealed;
  const typingDone = revealed >= totalChars;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
      className="card relative overflow-hidden shadow-glow"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="flex items-center gap-2 border-b border-border bg-bg-elevated px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-terminal-red/80" />
        <span className="h-3 w-3 rounded-full bg-terminal-yellow/80" />
        <span className="h-3 w-3 rounded-full bg-terminal-green/80" />
        <span className="ml-3 font-mono text-xs text-muted">~/developer — zsh</span>
      </div>

      <div className="space-y-3 p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        <div className="space-y-1">
          <AnimatePresence initial={false}>
            {bootLines.slice(0, bootStep).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className={line.className}
              >
                {line.prompt && <span className="text-terminal-comment">$ </span>}
                {line.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {typing && (
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="overflow-x-auto border-t border-border/60 pt-3"
          >
            <code>
              {codeLines.map((line, li) => {
                const segments: Token[] = [];
                for (const tok of line) {
                  if (budget <= 0) break;
                  const take = Math.min(budget, tok.text.length);
                  segments.push({ text: tok.text.slice(0, take), className: tok.className });
                  budget -= take;
                }
                return (
                  <div key={li} className="flex">
                    <span className="mr-4 w-5 select-none text-right text-terminal-comment">
                      {li + 1}
                    </span>
                    <span className="text-text">
                      {segments.map((s, si) => (
                        <span key={si} className={s.className}>
                          {s.text}
                        </span>
                      ))}
                    </span>
                  </div>
                );
              })}
            </code>
          </motion.pre>
        )}

        {(!typingDone || !typing) && (
          <span className="inline-block h-4 w-2 animate-blink bg-accent align-middle" />
        )}
      </div>
    </motion.div>
  );
}
