import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format date string nicely */
export function formatDate(dateStr: string) {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/** Truncate text to n chars */
export function truncate(text: string, n: number) {
  return text.length > n ? text.slice(0, n) + "…" : text;
}

/** Stagger delay helper for animations */
export function staggerDelay(index: number, base = 0.1) {
  return index * base;
}
