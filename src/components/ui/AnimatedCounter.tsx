"use client";

/**
 * AnimatedCounter — counts up to a target number when in viewport.
 */
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  target: number;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({ target, suffix = "", duration = 2000 }: Props) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const start = performance.now();
    const step = (timestamp: number) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
