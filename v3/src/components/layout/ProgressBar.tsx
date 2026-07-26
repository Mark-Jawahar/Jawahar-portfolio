"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 20 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[1.5px] z-[100] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, rgba(236,236,236,0.4), rgba(200,190,230,0.3), rgba(180,220,230,0.3), rgba(176,176,176,0.2))",
        backgroundSize: "200% 100%",
      }}
    />
  );
}
