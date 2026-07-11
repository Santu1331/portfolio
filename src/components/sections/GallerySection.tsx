"use client";

/**
 * GallerySection — dynamic photo gallery from data/gallery.json.
 * Add images to /public/images/gallery/ and entries to gallery.json.
 * No React editing needed.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import galleryData from "../../../data/gallery.json";

type GalleryItem = (typeof galleryData)[0];

const categories = ["All", ...Array.from(new Set(galleryData.map((g) => g.category)))];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const real = galleryData.filter((g) => !("placeholder" in g && g.placeholder));
  const filtered =
    activeCategory === "All"
      ? real
      : real.filter((g) => g.category === activeCategory);

  if (real.length === 0) return null; // Hide section until images are added

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };

  return (
    <section id="gallery" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments & Memories"
          subtitle="Startup events, hackathons, college activities, and life behind the builds."
        />

        {/* Category filter */}
        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-orange-500 text-white"
                    : "glass text-gray-400 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="break-inside-avoid"
            >
              <button
                onClick={() => openLightbox(i)}
                className="group relative w-full overflow-hidden rounded-2xl glass border border-white/5 hover:border-orange-500/20 transition-all card-hover block text-left"
              >
                <div className="relative aspect-[4/3] bg-white/[0.02]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <ZoomIn className="absolute top-3 right-3 w-5 h-5 text-white" />
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
                        <span className="tag text-[10px]">{item.category}</span>
                        {item.date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {item.date}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <Lightbox
            item={filtered[lightboxIndex]}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
            current={lightboxIndex + 1}
            total={filtered.length}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
  current,
  total,
}: {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  current: number;
  total: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-xl glass text-gray-300 hover:text-white border border-white/10 z-10"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs text-gray-400">
        {current} / {total}
      </div>

      {/* Prev */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-xl glass text-gray-300 hover:text-white border border-white/10 z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Image */}
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className="relative max-w-3xl w-full max-h-[75vh] aspect-[4/3] rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={item.image} alt={item.title} fill className="object-contain" />
      </motion.div>

      {/* Next */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-xl glass text-gray-300 hover:text-white border border-white/10 z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Caption */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm font-medium text-white mb-1">{item.title}</p>
        <p className="text-xs text-gray-400">{item.description}</p>
      </div>
    </motion.div>
  );
}
