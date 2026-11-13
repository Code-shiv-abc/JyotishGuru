"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, CheckCircle2, Sparkles } from "lucide-react";

const SERVICE_OPTIONS: Record<string, { label: string; price: string }> = {
  kundali: { label: "Kundali Reading (45 Mins)", price: "₹1100" },
  matching: { label: "Kundali Matching — Guna Milan (45 Mins)", price: "₹1500" },
  career: { label: "Career & Finance Consultation (30 Mins)", price: "₹1200" },
  relationship: { label: "Relationship & Marriage (30 Mins)", price: "₹1200" },
  muhurat: { label: "Muhurat Calculation (20 Mins)", price: "₹500" },
  remedies: { label: "Gemstone & Remedy Consultation (30 Mins)", price: "₹800" },
  other: { label: "Other Spiritual / Custom Query", price: "Custom" },
};

function BookingFormInner() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "kundali";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: SERVICE_OPTIONS[initialService] ? initialService : "kundali",
    dob: "",
    tob: "",
    pob: "",
    preferredMode: "WhatsApp Video / Audio Call",
    query: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    const paramService = searchParams.get("service");
    if (paramService && SERVICE_OPTIONS[paramService]) {
      setFormData((prev) => ({ ...prev, service: paramService }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedService = SERVICE_OPTIONS[formData.service] || SERVICE_OPTIONS.kundali;

    const messageLines = [
      `🙏 *Namaste Acharya Shri Ravindra Shukla Shatri Ji,*`,
      `I would like to book a Vedic Astrology consultation on *JyotishGuru*.`,
      ``,
      `*Client Details:*`,
      `• *Name:* ${formData.name}`,
      `• *Phone:* ${formData.phone}`,
      formData.email ? `• *Email:* ${formData.email}` : null,
      `• *Service:* ${selectedService.label} (${selectedService.price})`,
      `• *Preferred Mode:* ${formData.preferredMode}`,
      formData.dob ? `• *Birth Date:* ${formData.dob}` : null,
      formData.tob ? `• *Birth Time:* ${formData.tob}` : null,
      formData.pob ? `• *Birth Place:* ${formData.pob}` : null,
      formData.query ? `\n*My Query:*\n${formData.query}` : null,
      ``,
      `Please share your next available time slot for confirmation.`,
    ].filter(Boolean);

    const encodedText = encodeURIComponent(messageLines.join("\n"));
    const waLink = `https://wa.me/918009124454?text=${encodedText}`;
    setWhatsappUrl(waLink);
    setSubmitted(true);
    window.open(waLink, "_blank", "noopener,noreferrer");
  };

  if (submitted) {
    return (
      <div className="bg-[#1A1628] border border-[#C9A84C]/40 rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 text-[#C9A84C] mx-auto" />
        <h2 className="text-3xl font-serif font-bold text-[#E8E4F0]">
          Appointment Request Ready!
        </h2>
        <p className="text-[#E8E4F0]/80 max-w-xl mx-auto leading-relaxed">
          Thank you, <strong className="text-[#C9A84C]">{formData.name}</strong>. We have opened WhatsApp (+91 80091 24454) with your consultation details so Acharya Shri Ravindra Shukla Shatri&apos;s office can confirm your slot immediately.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A84C] text-[#0D0B1A] rounded-full font-bold hover:bg-[#d9b85c] transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Send Request on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="inline-flex items-center justify-center px-8 py-4 border border-[#C9A84C]/40 text-[#E8E4F0] rounded-full font-semibold hover:bg-white/5 transition-colors cursor-pointer"
          >
            Edit Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1628] border border-[#C9A84C]/25 rounded-3xl p-8 md:p-12 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="book-name" className="block text-sm font-medium text-[#E8E4F0] mb-2 uppercase tracking-wider">
              Full Name <span className="text-[#C9A84C]">*</span>
            </label>
            <input
              id="book-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#0D0B1A] border border-[#C9A84C]/30 focus:border-[#C9A84C] rounded-xl py-3.5 px-4 text-[#E8E4F0] focus:outline-none transition-colors placeholder-[#E8E4F0]/55"
              placeholder="Aarav Sharma"
            />
          </div>
          <div>
            <label htmlFor="book-phone" className="block text-sm font-medium text-[#E8E4F0] mb-2 uppercase tracking-wider">
              WhatsApp / Phone Number <span className="text-[#C9A84C]">*</span>
            </label>
            <input
              id="book-phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[#0D0B1A] border border-[#C9A84C]/30 focus:border-[#C9A84C] rounded-xl py-3.5 px-4 text-[#E8E4F0] focus:outline-none transition-colors placeholder-[#E8E4F0]/55"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="book-service" className="block text-sm font-medium text-[#E8E4F0] mb-2 uppercase tracking-wider">
              Consultation Type <span className="text-[#C9A84C]">*</span>
            </label>
            <select
              id="book-service"
              required
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full bg-[#0D0B1A] border border-[#C9A84C]/30 focus:border-[#C9A84C] rounded-xl py-3.5 px-4 text-[#E8E4F0] focus:outline-none transition-colors"
            >
              {Object.entries(SERVICE_OPTIONS).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.label} — {item.price}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="book-email" className="block text-sm font-medium text-[#E8E4F0] mb-2 uppercase tracking-wider">
              Email Address (Optional)
            </label>
            <input
              id="book-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#0D0B1A] border border-[#C9A84C]/30 focus:border-[#C9A84C] rounded-xl py-3.5 px-4 text-[#E8E4F0] focus:outline-none transition-colors placeholder-[#E8E4F0]/55"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="p-6 bg-[#0D0B1A]/70 border border-[#C9A84C]/15 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-[#C9A84C] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Birth Details (Optional — Helps Acharya Ji Prepare Your Chart)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="book-dob" className="block text-xs font-medium text-[#E8E4F0]/80 mb-1.5">
                Date of Birth
              </label>
              <input
                id="book-dob"
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full bg-[#1A1628] border border-[#C9A84C]/25 rounded-lg px-3 py-2.5 text-sm text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] [color-scheme:dark]"
              />
            </div>
            <div>
              <label htmlFor="book-tob" className="block text-xs font-medium text-[#E8E4F0]/80 mb-1.5">
                Time of Birth
              </label>
              <input
                id="book-tob"
                type="time"
                value={formData.tob}
                onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                className="w-full bg-[#1A1628] border border-[#C9A84C]/25 rounded-lg px-3 py-2.5 text-sm text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] [color-scheme:dark]"
              />
            </div>
            <div>
              <label htmlFor="book-pob" className="block text-xs font-medium text-[#E8E4F0]/80 mb-1.5">
                Place of Birth
              </label>
              <input
                id="book-pob"
                type="text"
                value={formData.pob}
                onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                placeholder="City, State"
                className="w-full bg-[#1A1628] border border-[#C9A84C]/25 rounded-lg px-3 py-2.5 text-sm text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] placeholder-[#E8E4F0]/55"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="book-query" className="block text-sm font-medium text-[#E8E4F0] mb-2 uppercase tracking-wider">
            Brief Description of Query
          </label>
          <textarea
            id="book-query"
            rows={4}
            value={formData.query}
            onChange={(e) => setFormData({ ...formData, query: e.target.value })}
            className="w-full bg-[#0D0B1A] border border-[#C9A84C]/30 focus:border-[#C9A84C] rounded-xl py-3.5 px-4 text-[#E8E4F0] focus:outline-none transition-colors placeholder-[#E8E4F0]/55 resize-none"
            placeholder="Please describe the questions or life areas you would like to discuss with Acharya Ji..."
          />
        </div>

        <div className="pt-2 text-center">
          <button
            type="submit"
            className="w-full md:w-auto px-14 bg-[#C9A84C] text-[#0D0B1A] py-4 rounded-full font-sans font-bold text-lg hover:bg-[#d9b85c] transition-colors shadow-lg shadow-[#C9A84C]/20 inline-flex items-center justify-center gap-3 uppercase tracking-wide cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Request Appointment</span>
          </button>
          <p className="text-xs text-[#E8E4F0]/65 mt-3">
            Direct WhatsApp confirmation with Acharya Shri Ravindra Shukla Shatri (+91 80091 24454)
          </p>
        </div>
      </form>
    </div>
  );
}

export default function BookPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-6">
          Schedule Consultation
        </h1>
        <p className="text-lg text-[#E8E4F0]/80 max-w-2xl mx-auto">
          Take the first step towards clarity and guidance. Book an online or in-person consultation session with Acharya Shri Ravindra Shukla Shatri.
        </p>
      </div>

      <Suspense fallback={<div className="text-center text-[#C9A84C] py-12">Loading consultation form...</div>}>
        <BookingFormInner />
      </Suspense>
    </div>
  );
              }
