"use client";

/**
 * TestimonialsSection — testimonials from mentors, users, and colleagues.
 * Data from data/testimonials.json. Hidden if only placeholders.
 */
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import testimonialsData from "../../../data/testimonials.json";

type Testimonial = (typeof testimonialsData)[0];

export default function TestimonialsSection() {
  const real = testimonialsData.filter(
    (t) => !("placeholder" in t && t.placeholder)
  );

  // Hide the whole section if no real testimonials
  if (real.length === 0) return null;

  return (
    <section id="testimonials" className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="What People Say"
          subtitle="Feedback from mentors, collaborators, and users who've seen the work up close."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {real.map((testimonial, i) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial as Testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="gradient-border glass rounded-2xl p-6 border border-white/5 hover:border-orange-500/20 card-hover flex flex-col gap-4"
    >
      {/* Quote icon */}
      <Quote className="w-7 h-7 text-orange-500/40" />

      {/* Text */}
      <p className="text-sm text-gray-300 leading-relaxed flex-1 italic">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
        {testimonial.avatar ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-white">{testimonial.name}</p>
          <p className="text-xs text-gray-500">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}
