"use client";

/**
 * SectionHeading — reusable animated section title with optional subtitle.
 */
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({ eyebrow, title, subtitle, align = "center", className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mb-12",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-orange-500 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-white">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-gray-400 leading-relaxed text-base sm:text-lg", align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl")}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
