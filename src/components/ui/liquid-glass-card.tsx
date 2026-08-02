"use client";

import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

type TiltTag = "div" | "button" | "a";

const MotionTag: Record<TiltTag, React.ElementType> = {
  div: motion.div,
  button: motion.button,
  a: motion.a,
};

interface LiquidGlassCardProps {
  as?: TiltTag;
  tilt?: boolean;
  glow?: boolean;
  lift?: boolean;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

type Props = LiquidGlassCardProps & Record<string, unknown>;

/**
 * Premium glass surface with subtle pointer depth:
 * - tilt: max 3° rotate toward the cursor
 * - glow: soft radial highlight that follows the pointer
 * - lift: gentle spring lift on hover
 * All effects are transform/opacity only (GPU friendly) and are
 * disabled for touch devices and reduced-motion users.
 */
export function LiquidGlassCard({
  as = "div",
  tilt = true,
  glow = true,
  lift = true,
  className,
  children,
  style,
  ...props
}: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [3, -3]), {
    stiffness: 300,
    damping: 32,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-3, 3]), {
    stiffness: 300,
    damping: 32,
  });

  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(360px circle at ${glowX} ${glowY}, oklch(0.84 0.05 225 / 0.1), transparent 62%)`;

  const Component = MotionTag[as];
  const enableTilt = tilt && !reduced;
  const enableLift = lift && !reduced;

  const handleMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <Component
      ref={ref as never}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("liquid-glass group", className)}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformPerspective: 900,
        ...style,
      }}
      whileHover={enableLift ? { y: -4 } : undefined}
      {...props}
    >
      {children}
      {glow && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glare }}
        />
      )}
    </Component>
  );
}
