"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/app/components/ServiceWorkerRegister";
import { MessageCircle, CheckCircle2, Sparkles } from "lucide-react";

const SERVICE_OPTIONS: Record<string, { en: string; hi: string; price: string }> = {
  kundali: { en: "Kundali Reading (45 Mins)", hi: "जन्म कुंडली विवेचन (45 मिनट)", price: "₹1100" },
  matching: { en: "Kundali Matching — Guna Milan (45 Mins)", hi: "कुंडली गुण मिलान (45 मिनट)", price: "₹1500" },
  career: { en: "Career & Finance Consultation (30 Mins)", hi: "करियर एवं आर्थिक परामर्श (30 मिनट)", price: "₹1200" },
  relationship: { en: "Relationship & Marriage (30 Mins)", hi: "दांपत्य एवं पारिवारिक सामंजस्य (30 मिनट)", price: "₹1200" },
  muhurat: { en: "Muhurat Calculation (20 Mins)", hi: "शुभ मुहूर्त निर्णय (20 मिनट)", price: "₹500" },
  remedies: { en: "Gemstone & Remedy Consultation (30 Mins)", hi: "रत्न, रुद्राक्ष एवं वैदिक उपाय (30 मिनट)", price: "₹800" },
  other: { en: "Other Spiritual / Custom Query", hi: "अन्य ज्योतिषीय / आध्यात्मिक प्रश्न", price: "Custom" },
};

function BookingFormInner() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "kundali";

  const [formData, setFormData] = useState({
    name: "", phone: "", email: "",
    service: SERVICE_OPTIONS[initialService] ? initialService : "kundali",
    dob: "", tob: "", pob: "", query: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sel = SERVICE_OPTIONS[formData.service] || SERVICE_OPTIONS.kundali;
    const msg = [
      `🙏 *Namaste Acharya Shri Ravindra Shukla Shatri Ji,*`,
      `I would like to book a Vedic Astrology consultation on *JyotishGuru*.`,
      ``,
      `*Client Details:*`,
      `• *Name:* ${formData.name}`,
      `• *Phone:* ${formData.phone}`,
      formData.email ? `• *Email:* ${formData.email}` : null,
      `• *Service:* ${sel.en} (${sel.price})`,
      formData.dob ? `• *Birth Date:* ${formData.dob}` : null,
      formData.tob ? `• *Birth Time:* ${formData.tob}` : null,
      formData.pob ? `• *Birth Place:* ${formData.pob}` : null,
      formData.query ? `\n*My Query:*\n${formData.query}` : null,
      ``,
      `Please share your next available time slot for confirmation.`,
    ].filter(Boolean).join("\n");

    const waLink = `https://wa.me/918009124454?text=${encodeURIComponent(msg)}`;
    setWhatsappUrl(waLink);
    setSubmitted(true);
    window.open(waLink, "_blank", "noopener,noreferrer");
  };

  if (submitted) {
    return (
      <div className="bg-[#1A1628] border border-[#C9A84C]/40 rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-6">
        <CheckCircle2 className="w-16 h-16 text-[#C9A84C] mx-auto" />
        <h2 className="text-3xl font-serif font-bold text-[#E8E4F0]">
          {isHi ? "परामर्श अनुरोध तैयार है!" : "Appointment Request Ready!"}
        </h2>
        <p className="text-[#E8E4F0]/80 max-w-xl mx-auto leading-relaxed">
          {isHi
            ? `धन्यवाद, ${formData.name}। आचार्य श्री रविन्द्र शुक्ल शास्त्री जी के कार्यालय से तुरंत समय सुनिश्चित करने के लिए हमने आपका विवरण व्हाट्सएप (+91 80091 24454) पर खोल दिया है।`
            : `Thank you, ${formData.name}. We have opened WhatsApp (+91 80091 24454) with your consultation details so Acharya Shri Ravindra Shukla Shatri's office can confirm your slot immediately.`}
        </p>
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A84C] text-[#0D0B1A] rounded-full font-bold hover:bg-[#d9b85c]">
            <MessageCircle className="w-5 h-5" />
            <span>{isHi ? "व्हाट्सएप पर अनुरोध भेजें" : "Send Request on WhatsApp"}</span>
          </a>
          <button type="button" onClick={() => setSubmitted(false)} className="px-8 py-4 border border-[#C9A84C]/40 text-[#E8E4F0] rounded-full font-semibold hover:bg-white/5 cursor-pointer">
            {isHi ? "विवरण बदलें" : "Edit Details"}
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
              {isHi ? "पूरा नाम *" : "Full Name *"}
            </label>
            <input id="book-name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/30 rounded-xl py-3.5 px-4 text-[#E8E4F0]" placeholder={isHi ? "अपना नाम लिखें" : "Aarav Sharma"} />
          </div>
          <div>
            <label htmlFor="book-phone" className="block text-sm font-medium text-[#E8E4F0] mb-2 uppercase tracking-wider">
              {isHi ? "व्हाट्सएप / फोन नंबर *" : "WhatsApp / Phone Number *"}
            </label>
            <input id="book-phone" type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/30 rounded-xl py-3.5 px-4 text-[#E8E4F0]" placeholder="+91 98765 43210" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="book-service" className="block text-sm font-medium text-[#E8E4F0] mb-2 uppercase tracking-wider">
              {isHi ? "परामर्श सेवा प्रकार *" : "Consultation Type *"}
            </label>
            <select id="book-service" required value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/30 rounded-xl py-3.5 px-4 text-[#E8E4F0]">
              {Object.entries(SERVICE_OPTIONS).map(([key, item]) => (
                <option key={key} value={key}>{isHi ? item.hi : item.en} — {item.price}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="book-email" className="block text-sm font-medium text-[#E8E4F0] mb-2 uppercase tracking-wider">
              {isHi ? "ईमेल पता (वैकल्पिक)" : "Email Address (Optional)"}
            </label>
            <input id="book-email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/30 rounded-xl py-3.5 px-4 text-[#E8E4F0]" placeholder="you@example.com" />
          </div>
        </div>

        <div className="p-6 bg-[#0D0B1A]/70 border border-[#C9A84C]/15 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-[#C9A84C] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>{isHi ? "जन्म विवरण (वैकल्पिक — आचार्य जी को आपकी कुंडली तैयार करने में सहायता करता है)" : "Birth Details (Optional — Helps Acharya Ji Prepare Your Chart)"}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="book-dob" className="block text-xs font-medium text-[#E8E4F0]/80 mb-1.5">{isHi ? "जन्म तिथि" : "Date of Birth"}</label>
              <input id="book-dob" type="date" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} className="w-full bg-[#1A1628] border border-[#C9A84C]/25 rounded-lg px-3 py-2.5 text-sm text-[#E8E4F0] [color-scheme:dark]" />
            </div>
            <div>
              <label htmlFor="book-tob" className="block text-xs font-medium text-[#E8E4F0]/80 mb-1.5">{isHi ? "जन्म समय" : "Time of Birth"}</label>
              <input id="book-tob" type="time" value={formData.tob} onChange={(e) => setFormData({ ...formData, tob: e.target.value })} className="w-full bg-[#1A1628] border border-[#C9A84C]/25 rounded-lg px-3 py-2.5 text-sm text-[#E8E4F0] [color-scheme:dark]" />
            </div>
            <div>
              <label htmlFor="book-pob" className="block text-xs font-medium text-[#E8E4F0]/80 mb-1.5">{isHi ? "जन्म स्थान" : "Place of Birth"}</label>
              <input id="book-pob" type="text" value={formData.pob} onChange={(e) => setFormData({ ...formData, pob: e.target.value })} placeholder={isHi ? "शहर, राज्य" : "City, State"} className="w-full bg-[#1A1628] border border-[#C9A84C]/25 rounded-lg px-3 py-2.5 text-sm text-[#E8E4F0]" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="book-query" className="block text-sm font-medium text-[#E8E4F0] mb-2 uppercase tracking-wider">
            {isHi ? "प्रश्न का संक्षिप्त विवरण" : "Brief Description of Query"}
          </label>
          <textarea id="book-query" rows={4} value={formData.query} onChange={(e) => setFormData({ ...formData, query: e.target.value })} className="w-full bg-[#0D0B1A] border border-[#C9A84C]/30 rounded-xl py-3.5 px-4 text-[#E8E4F0] resize-none" placeholder={isHi ? "कृपया उन प्रश्नों या जीवन क्षेत्रों का उल्लेख करें जिन पर आप आचार्य जी से चर्चा करना चाहते हैं..." : "Please describe the questions or life areas you would like to discuss with Acharya Ji..."} />
        </div>

        <div className="pt-2 text-center">
          <button type="submit" className="w-full md:w-auto px-14 bg-[#C9A84C] text-[#0D0B1A] py-4 rounded-full font-sans font-bold text-lg hover:bg-[#d9b85c] transition-colors shadow-lg inline-flex items-center justify-center gap-3 uppercase tracking-wide cursor-pointer">
            <MessageCircle className="w-5 h-5" />
            <span>{isHi ? "परामर्श समय बुक करें" : "Request Appointment"}</span>
          </button>
          <p className="text-xs text-[#E8E4F0]/65 mt-3">
            {isHi
              ? "आचार्य श्री रविन्द्र शुक्ल शास्त्री (+91 80091 24454) के साथ सीधा व्हाट्सएप पुष्टिकरण"
              : "Direct WhatsApp confirmation with Acharya Shri Ravindra Shukla Shatri (+91 80091 24454)"}
          </p>
        </div>
      </form>
    </div>
  );
}

export default function BookPage() {
  const { lang } = useLanguage();
  const isHi = lang === "hi";
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-6">
          {isHi ? "परामर्श समय निर्धारित करें" : "Schedule Consultation"}
        </h1>
        <p className="text-lg text-[#E8E4F0]/80 max-w-2xl mx-auto">
          {isHi
            ? "स्पष्टता और सही मार्गदर्शन की ओर पहला कदम बढ़ाएं। आचार्य श्री रविन्द्र शुक्ल शास्त्री के साथ ऑनलाइन या व्यक्तिगत परामर्श सत्र बुक करें।"
            : "Take the first step towards clarity and guidance. Book an online or in-person consultation session with Acharya Shri Ravindra Shukla Shatri."}
        </p>
      </div>
      <Suspense fallback={<div className="text-center text-[#C9A84C] py-12">Loading consultation form...</div>}>
        <BookingFormInner />
      </Suspense>
    </div>
  );
}
