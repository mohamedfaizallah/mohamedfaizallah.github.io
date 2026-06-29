import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface CommonProps {
  className?: string;
  children: ReactNode;
  strength?: number;
  'aria-label'?: string;
}

interface AnchorProps extends CommonProps {
  as?: 'a';
  href: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
}

interface ButtonProps extends CommonProps {
  as: 'button';
  onClick?: () => void;
  type?: 'button' | 'submit';
}

type MagneticButtonProps = AnchorProps | ButtonProps;

export default function MagneticButton(props: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const strength = props.strength ?? 12;
  const className = props.className ?? '';

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const mxv = e.clientX - (r.left + r.width / 2);
    const myv = e.clientY - (r.top + r.height / 2);
    x.set((mxv / (r.width / 2)) * strength);
    y.set((myv / (r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const shine = !reduce && (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover/btn:translate-x-full"
    />
  );

  const sharedClass = `group/btn relative overflow-hidden ${className}`;
  const motionStyle = { x: sx, y: sy };
  const content = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{props.children}</span>
      {shine}
    </>
  );

  if (props.as === 'button') {
    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={props.type ?? 'button'}
        onClick={props.onClick}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={motionStyle}
        whileTap={reduce ? undefined : { scale: 0.97 }}
        className={sharedClass}
        aria-label={props['aria-label']}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={props.href}
      download={props.download}
      target={props.target}
      rel={props.rel}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={motionStyle}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      className={sharedClass}
      aria-label={props['aria-label']}
    >
      {content}
    </motion.a>
  );
}
