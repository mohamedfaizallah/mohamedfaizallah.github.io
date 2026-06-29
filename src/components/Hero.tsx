import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, Mail, MapPin, Wifi } from 'lucide-react';
import {
  SiReact,
  SiTypescript,
  SiRust,
  SiDocker,
  SiShopify,
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import TerminalCard from './TerminalCard';
import MagneticButton from './MagneticButton';
import { withBase } from '../lib/asset';
import { site } from '../data/site';
import { staggerContainer, item } from '../lib/motion';

const floatingBadges = [
  { icon: SiReact, label: 'React', className: 'left-[-4%] top-[12%]', color: 'text-[#61dafb]', delay: 0 },
  { icon: SiTypescript, label: 'TypeScript', className: 'right-[-3%] top-[6%]', color: 'text-[#3178c6]', delay: 0.6 },
  { icon: SiRust, label: 'Rust', className: 'right-[2%] bottom-[18%]', color: 'text-[#dea584]', delay: 1.1 },
  { icon: TbApi, label: 'API', className: 'left-[-6%] bottom-[24%]', color: 'text-accent', delay: 0.3 },
  { icon: SiDocker, label: 'Docker', className: 'left-[8%] bottom-[-4%]', color: 'text-[#2496ed]', delay: 1.4 },
  { icon: SiShopify, label: 'Shopify', className: 'right-[10%] top-[-5%]', color: 'text-[#95bf47]', delay: 0.9 },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  return (
    <section id="hero" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="container-page grid grid-cols-1 gap-12 pb-20 lg:grid-cols-2 lg:items-center lg:gap-10">
        {/* Left: copy */}
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-5 flex flex-wrap items-center gap-3">
            <span className="badge gap-2 text-terminal-green">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal-green opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-terminal-green" />
              </span>
              Available for 100% remote opportunities
            </span>
          </motion.div>

          <motion.div variants={item} className="group mb-6 flex items-center gap-5">
            <div className="relative flex-shrink-0">
              {/* soft, subtle glow — no harsh colored ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-1 rounded-full bg-accent/15 blur-lg"
              />
              {!imgError ? (
                <div className="relative h-28 w-28 overflow-hidden rounded-full border border-border-soft ring-1 ring-inset ring-white/5">
                  <img
                    src={withBase(site.profileImage)}
                    alt="Portrait of Mohamed Faizallah, remote full-stack developer"
                    width={112}
                    height={112}
                    loading="eager"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover object-top grayscale-[30%] contrast-[1.03] brightness-[0.92] transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100"
                  />
                  {/* radial vignette: fades the light background into the dark UI */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_38%,transparent_42%,rgba(10,14,20,0.92))]"
                  />
                  {/* faint accent wash so skin tones sit in the theme */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-accent/10 mix-blend-soft-light"
                  />
                </div>
              ) : (
                <div
                  className="relative flex h-28 w-28 items-center justify-center rounded-full border border-border-soft bg-bg-elevated font-mono text-2xl text-accent"
                  aria-label="Profile placeholder"
                >
                  &lt;/&gt;
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {site.name}
              </span>
              <div className="mt-1 flex flex-col gap-1 font-mono text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" /> {site.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Wifi className="h-3.5 w-3.5 text-accent" aria-hidden="true" /> 100% Remote
                </span>
              </div>
            </div>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Remote <span className="glow-text text-accent">Full-Stack</span> Developer
          </motion.h1>

          <motion.p variants={item} className="mt-4 font-mono text-base text-terminal-blue sm:text-lg">
            React, TypeScript &amp; Rust <span className="text-terminal-comment">|</span> Web Apps,
            APIs, Dashboards &amp; Automation
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            I build practical business web applications — from frontend dashboards to backend APIs,
            authentication, automation, file handling, e-commerce workflows and internal tools.
          </motion.p>

          {/* currently building line */}
          <motion.p
            variants={item}
            className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-lg border border-border bg-bg-card/60 px-3 py-2 font-mono text-xs text-muted"
          >
            <span className="text-terminal-comment">$</span>
            <span className="text-accent">focus</span>
            <span>--areas</span>
            <span className="text-terminal-green">web-apps, apis, dashboards, automation</span>
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="#projects" className="btn-primary">
              View Projects <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href={withBase(site.cvFile)} download={site.cvDownloadName} className="btn-ghost">
              <Download className="h-4 w-4" aria-hidden="true" /> Download CV
            </MagneticButton>
            <MagneticButton href="#contact" className="btn-ghost">
              <Mail className="h-4 w-4" aria-hidden="true" /> Contact Me
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Right: terminal + floating badges */}
        <div className="relative lg:pl-6">
          <TerminalCard />

          {/* floating tech badges */}
          {floatingBadges.map((b) => (
            <motion.div
              key={b.label}
              className={`absolute z-10 hidden items-center gap-1.5 rounded-lg border border-border bg-bg-card/80 px-2.5 py-1.5 font-mono text-xs text-text shadow-card backdrop-blur sm:flex ${b.className}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + b.delay * 0.25, type: 'spring', stiffness: 200, damping: 14 }}
            >
              <motion.span
                animate={reduce ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 4 + b.delay, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center gap-1.5"
              >
                <b.icon className={`h-4 w-4 ${b.color}`} aria-hidden="true" />
                {b.label}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
