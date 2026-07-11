"use client";

/**
 * ScrollProgress — thin orange-to-blue gradient bar at the top that
 * tracks scroll depth.
 */
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, width: "100%" }}
    />
  );
}
