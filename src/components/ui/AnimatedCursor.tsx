"use client";

/**
 * AnimatedCursor — custom cursor that follows mouse with a trailing ring.
 * Only visible on non-touch devices.
 */
import { useEffect, useRef } from "react";

export default function AnimatedCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on mobile / touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      animId = requestAnimationFrame(animate);
    };

    const onMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    const onMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    // Scale up on links/buttons
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [data-cursor]");
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(-50%, -50%) scale(${isInteractive ? 2 : 1})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(-50%, -50%) scale(${isInteractive ? 1.5 : 1})`;
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor" style={{ opacity: 0, transition: "opacity 0.3s, transform 0.2s" }} />
      <div ref={ringRef} className="cursor-follower" style={{ opacity: 0, transition: "opacity 0.3s, transform 0.15s" }} />
    </>
  );
}
