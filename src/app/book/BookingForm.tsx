"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, CheckCircle2, Calendar, Clock, Sparkles } from "lucide-react";

const SERVICE_OPTIONS: Record<string, { label: string; price: string }> = {
  kundali: { label: "Comprehensive Kundali Reading (45 Mins)", price: "₹1,100" },
  matching: { label: "Kundali Matching — Ashtakoot & Manglik (45 Mins)", price: "₹1,500" },
  career: { label: "Career, Business & Finance Consultation (30 Mins)", price: "₹1,200" },
  relationship: { label: "Relationship & Family Harmony (30 Mins)", price: "₹1,200" },
  muhurat: { label: "Shubh Muhurat Calculation (20 Mins)", price: "₹500" },
  remedies: { label: "Gemstone & Vedic Remedy Consultation (30 Mins)", price: "₹800" },
  other: { label: "General Spiritual / Custom Query", price: "Custom" },
};

export default function BookingForm() {
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
      `🙏 *Namaste Acharya Shri Pankaj Shukla Ji,*`,
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
      `Please share your next available time slot and UPI details for confirmation.`,
    ].filter(Boolean);

    const encodedText = encodeURIComponent(messageLines.join("\n"));
    const waLink = `https://wa.me/917233972105?text=${encodedText}`;
    setWhatsappUrl(waLink);
    setSubmitted(true);
    window.open(waLink, "_blank", "noopener,noreferrer");
  };

  if (submitted) {
    return (
      <div className="bg-[#1A1628] border border-[#C9A84C]/40 rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 text-[#C9A84C] mx-auto" />
        <h2 className="text-3xl font-serif font-bold text-[#E8E4F0]">
          Consultation Request Prepared!
        </h2>
        <p className="text-[#E8E4F0]/80 max-w-xl mx-auto leading-relaxed">
          Thank you, <strong className="text-[#C9A84C]">{formData.name}</strong>. We have opened WhatsApp with your complete birth and consultation details so Acharya Shri Pankaj Shukla&apos;s office in Ayodhya Dham can confirm your time slot immediately.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A84C] text-[#0D0B1A] rounded-full font-bold hover:bg-[#d9b85c] transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Open WhatsApp Confirmation</span>
          </a>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="inline-flex items-center justify-center px-8 py-4 border border-[#C9A84C]/40 text-[#E8E4F0] rounded-full font-semibold hover:bg-white/5 transition-colors"
          >
            Edit Booking Details
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
              className="w-full bg-[#0D0B1A] border border-[#C9A84C]/30 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/40 rounded-xl py-3.5 px-4 text-[#E8E4F0] focus:outline-none transition-all placeholder-[#E8E4F0]/55"
              placeholder="e.g., Aarav Sharma"
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
              className="w-full bg-[#0D0B1A] border border-[#C9A84C]/30 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/40 rounded-xl py-3.5 px-4 text-[#E8E4F0] focus:outline-none transition-all placeholder-[#E8E4F0]/55"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="book-service" className="block text-sm font-medium text-[#E8E4F0] mb-2 uppercase tracking-wider">
              Consultation Service <span className="text-[#C9A84C]">*</span>
            </label>
            <select
              id="book-service"
              required
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full bg-[#0D0B1A] border border-[#C9A84C]/30 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/40 rounded-xl py-3.5 px-4 text-[#E8E4F0] focus:outline-none transition-all"
            >
              {Object.entries(SERVICE_OPTIONS).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.label} — {item.price}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="book-mode" className="block text-sm font-medium text-[#E8E4F0] mb-2 uppercase tracking-wider">
              Consultation Mode
            </label>
            <select
              id="book-mode"
              value={formData.preferredMode}
              onChange={(e) => setFormData({ ...formData, preferredMode: e.target.value })}
              className="w-full bg-[#0D0B1A] border border-[#C9A84C]/30 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/40 rounded-xl py-3.5 px-4 text-[#E8E4F0] focus:outline-none transition-all"
            >
              <option value="WhatsApp Video / Audio Call">WhatsApp Video / Audio Call</option>
              <option value="Direct Phone Call">Direct Phone Call</option>
              <option value="Zoom / Google Meet">Zoom / Google Meet</option>
              <option value="In-Person (Ayodhya Dham)">In-Person (Ayodhya Dham)</option>
            </select>
          </div>
        </div>

        {/* Optional Birth Details for Pre-Session Chart Preparation */}
        <div className="p-6 bg-[#0D0B1A]/70 border border-[#C9A84C]/15 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-[#C9A84C] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Birth Details (Recommended so Acharya Ji can prepare your Kundali)</span>
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
                Place of Birth (City, State)
              </label>
              <input
                id="book-pob"
                type="text"
                value={formData.pob}
                onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
                placeholder="e.g., Lucknow, UP"
                className="w-full bg-[#1A1628] border border-[#C9A84C]/25 rounded-lg px-3 py-2.5 text-sm text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C] placeholder-[#E8E4F0]/55"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="book-query" className="block text-sm font-medium text-[#E8E4F0] mb-2 uppercase tracking-wider">
            Key Questions or Life Areas to Discuss
          </label>
          <textarea
            id="book-query"
            rows={4}
            value={formData.query}
            onChange={(e) => setFormData({ ...formData, query: e.target.value })}
            className="w-full bg-[#0D0B1A] border border-[#C9A84C]/30 focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/40 rounded-xl py-3.5 px-4 text-[#E8E4F0] focus:outline-none transition-all placeholder-[#E8E4F0]/55 resize-none"
            placeholder="Share your questions regarding career, marriage compatibility, health, or planetary dashas..."
          />
        </div>

        <div className="pt-2 text-center">
          <button
            type="submit"
            className="w-full md:w-auto px-12 bg-gradient-to-r from-[#C9A84C] to-[#D4A017] text-[#0D0B1A] py-4 rounded-full font-sans font-bold text-lg hover:brightness-110 transition-all shadow-lg shadow-[#C9A84C]/25 inline-flex items-center justify-center gap-3 uppercase tracking-wide cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Confirm Slot via WhatsApp</span>
          </button>
          <p className="text-xs text-[#E8E4F0]/65 mt-3">
            Zero advance gateway fees • Direct slot confirmation with Acharya Shri Pankaj Shukla&apos;s office
          </p>
        </div>
      </form>
    </div>
  );
}