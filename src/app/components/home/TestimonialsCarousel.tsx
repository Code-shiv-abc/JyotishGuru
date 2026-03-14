"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    quote: "Acharya Ji's guidance gave me immense clarity during a difficult phase. The Kundali reading was incredibly accurate.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    location: "Mumbai",
    quote: "We consulted him for Kundali matching before our marriage. His profound knowledge and remedies brought peace to our families.",
    rating: 5,
  },
  {
    name: "Anjali Singh",
    location: "Lucknow",
    quote: "The daily horoscope insights are spot on. I feel more prepared to face the day knowing what the stars have in store.",
    rating: 5,
  },
];

export default function TestimonialsCarousel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.2 }}
          className="bg-[#1A1628] border-t-4 border-t-[#C9A84C] border border-[#C9A84C]/10 rounded-xl p-8 shadow-lg flex flex-col justify-between"
        >
          <div>
            <div className="flex gap-1 mb-6 text-[#C9A84C]">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-[#E8E4F0]/90 italic mb-8 leading-relaxed font-sans text-lg">
              "{testimonial.quote}"
            </p>
          </div>
          <div>
            <h4 className="font-serif font-bold text-[#E8E4F0] text-xl">
              {testimonial.name}
            </h4>
            <p className="text-[#C9A84C] text-sm font-medium tracking-wide">
              {testimonial.location}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}