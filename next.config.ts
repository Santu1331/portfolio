import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "feedo-ruddy.vercel.app" },
      { protocol: "https", hostname: "github.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Optimize performance
  compress: true,
  poweredByHeader: false,
  // Allow importing JSON as data
  experimental: {},
};

export default nextConfig;
