"use client";

/**
 * LoadingScreen — animated intro that plays once on first page load.
 */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only show once per session
    const shown = sessionStorage.getItem("loading-shown");
    if (shown) {
      setLoading(false);
      return;
    }
    const t = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("loading-shown", "1");
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="loading-screen"
        >
          {/* Orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-blue-500/8 rounded-full blur-3xl animate-pulse delay-500" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center gap-4"
          >
            {/* Logo mark */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/30">
              <span className="text-2xl font-black text-white">S</span>
            </div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-xl font-bold text-white">Santosh Sangnod</p>
              <p className="text-sm text-gray-500 mt-1">Founder · Developer · Builder</p>
            </motion.div>

            {/* Loading bar */}
            <motion.div className="w-40 h-0.5 bg-white/10 rounded-full overflow-hidden mt-4">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1.4, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
