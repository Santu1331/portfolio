"use client";

/**
 * Custom 404 page — styled to match the portfolio.
 */
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <div className="text-8xl sm:text-9xl font-black text-white/5 mb-4 select-none">404</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          This page doesn&apos;t exist. Maybe it was moved, or you typed the wrong URL.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/10 text-gray-300 hover:text-white font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </motion.div>
    </main>
  );
}
