"use client";

/**
 * CertificatesSection — fully dynamic certificate system.
 * Drop image/pdf in /public/certificates/ and add to data/certificates.json.
 * No React code editing needed.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Award, Download, Eye, X, FileText, Calendar } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import certificatesData from "../../../data/certificates.json";

type Certificate = (typeof certificatesData)[0];

export default function CertificatesSection() {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const real = certificatesData.filter((c) => !("placeholder" in c && c.placeholder));
  const showPlaceholder = real.length === 0;

  return (
    <section id="certificates" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Certificates"
          title="Credentials & Learning"
          subtitle="Drop a certificate image or PDF in /public/certificates/ and add one JSON entry — cards auto-generate."
        />

        {showPlaceholder ? (
          <div className="flex justify-center">
            <div className="glass rounded-2xl p-10 border border-dashed border-white/15 text-center max-w-md">
              <Award className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-base font-semibold text-gray-400 mb-2">No Certificates Yet</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Add certificate images to <code className="text-orange-400">/public/certificates/</code> and entries to{" "}
                <code className="text-orange-400">data/certificates.json</code>.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {real.map((cert, i) => (
              <CertificateCard key={cert.id} cert={cert as Certificate} index={i} onView={() => setSelected(cert as Certificate)} />
            ))}
          </div>
        )}
      </div>

      {/* Modal viewer */}
      <AnimatePresence>
        {selected && <CertificateModal cert={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

function CertificateCard({ cert, index, onView }: { cert: Certificate; index: number; onView: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/20 card-hover group"
    >
      {/* Image preview */}
      <div className="relative h-44 bg-white/[0.02] flex items-center justify-center overflow-hidden">
        {cert.image ? (
          <Image src={cert.image} alt={cert.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-600">
            <FileText className="w-12 h-12" />
            <span className="text-xs">Certificate</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 gap-3">
          <button
            onClick={onView}
            className="px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-medium flex items-center gap-1.5 hover:bg-orange-600 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> View
          </button>
          {cert.pdf && (
            <a
              href={cert.pdf}
              download
              className="px-3 py-1.5 rounded-lg glass text-white text-xs font-medium flex items-center gap-1.5 border border-white/20 hover:bg-white/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </a>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-sm font-bold text-white mb-1 line-clamp-2">{cert.title}</h3>
        <p className="text-xs text-orange-400 mb-1">{cert.issuer}</p>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          {cert.date}
        </div>
        {cert.description && <p className="text-xs text-gray-500 mt-2 line-clamp-2">{cert.description}</p>}
      </div>
    </motion.div>
  );
}

function CertificateModal({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="glass rounded-2xl overflow-hidden max-w-lg w-full border border-white/10"
      >
        {/* Modal header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div>
            <h3 className="text-base font-bold text-white">{cert.title}</h3>
            <p className="text-xs text-orange-400">{cert.issuer}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 transition text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Image */}
        {cert.image && (
          <div className="relative h-64 bg-white/[0.02]">
            <Image src={cert.image} alt={cert.title} fill className="object-contain p-4" />
          </div>
        )}

        <div className="p-4 flex gap-3">
          {cert.pdf && (
            <a
              href={cert.pdf}
              download
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Certificate
            </a>
          )}
          {cert.pdf && (
            <a
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 text-gray-300 text-sm font-medium hover:text-white transition-colors"
            >
              <Eye className="w-4 h-4" />
              Open PDF
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
