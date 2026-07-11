import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedCursor from "@/components/ui/AnimatedCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CommandMenu from "@/components/ui/CommandMenu";
import personal from "../../data/personal.json";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://santoshsangnod.dev"),
  title: {
    default: `${personal.name} — Founder & Full Stack Developer`,
    template: `%s | ${personal.name}`,
  },
  description: personal.bio,
  keywords: personal.keywords,
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://santoshsangnod.dev",
    title: `${personal.name} — Founder & Full Stack Developer`,
    description: personal.bio,
    siteName: personal.name,
    images: [{ url: personal.openGraph, width: 1200, height: 630, alt: personal.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — Founder & Full Stack Developer`,
    description: personal.bio,
    images: [personal.openGraph],
    creator: "@santoshsangnod",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <LoadingScreen />
          <AnimatedCursor />
          <ScrollProgress />
          <CommandMenu />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
