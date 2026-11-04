"use client";

import { useState, useEffect, useTransition } from "react";
import { submitConsultationRequest } from "./actions";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function BookForm() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    consultationType: "",
    query: "",
  });

  useEffect(() => {
    let isMounted = true;
    const serviceParam = searchParams.get("service");

    if (serviceParam && isMounted) {
      setTimeout(() => {
        if (isMounted) {
          setFormData((prev) => {
            if (prev.consultationType !== serviceParam) {
              return { ...prev, consultationType: serviceParam };
            }
            return prev;
          });
        }
      }, 0);
    }

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const response = await submitConsultationRequest(formData);
        if (response.success && response.redirectUrl) {
          window.location.href = response.redirectUrl;
        }
      } catch (error) {
        console.error("Submission failed", error);
        alert("An error occurred while submitting your request. Please try again.");
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-6">
          Schedule Consultation
        </h1>
        <p className="text-lg text-[#E8E4F0]/80 max-w-2xl mx-auto">
          Take the first step towards clarity and guidance. Book an online or in-person consultation session with Acharya Ji.
        </p>
      </div>

      <div className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-3xl p-8 md:p-12 shadow-2xl">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[#E8E4F0] mb-3 uppercase tracking-wider">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-[#0D0B1A] border-b-2 border-[#C9A84C]/20 focus:border-[#C9A84C] py-3 px-2 text-[#E8E4F0] focus:outline-none transition-colors rounded-none placeholder-[#E8E4F0]/60"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#E8E4F0] mb-3 uppercase tracking-wider">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full bg-[#0D0B1A] border-b-2 border-[#C9A84C]/20 focus:border-[#C9A84C] py-3 px-2 text-[#E8E4F0] focus:outline-none transition-colors rounded-none placeholder-[#E8E4F0]/60"
                placeholder="+91 9876543210"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="emailAddress" className="block text-sm font-medium text-[#E8E4F0] mb-3 uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                required
                value={formData.emailAddress}
                onChange={handleChange}
                className="w-full bg-[#0D0B1A] border-b-2 border-[#C9A84C]/20 focus:border-[#C9A84C] py-3 px-2 text-[#E8E4F0] focus:outline-none transition-colors rounded-none placeholder-[#E8E4F0]/60"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="consultationType" className="block text-sm font-medium text-[#E8E4F0] mb-3 uppercase tracking-wider">
                Consultation Type
              </label>
              <select
                id="consultationType"
                name="consultationType"
                required
                value={formData.consultationType}
                onChange={handleChange}
                className="w-full bg-[#0D0B1A] border-b-2 border-[#C9A84C]/20 focus:border-[#C9A84C] py-3 px-2 text-[#E8E4F0] focus:outline-none transition-colors rounded-none appearance-none"
              >
                <option value="">Select Service</option>
                <option value="kundali">Comprehensive Kundali Reading (₹1,100)</option>
                <option value="matching">Kundali Matching (₹1,500)</option>
                <option value="career">Career, Business & Finance (₹1,200)</option>
                <option value="relationship">Relationship & Family Harmony (₹1,200)</option>
                <option value="muhurat">Shubh Muhurat Calculation (₹500)</option>
                <option value="remedies">Gemstone (Ratna) & Vedic Remedies (₹800)</option>
                <option value="other">Other Query</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="query" className="block text-sm font-medium text-[#E8E4F0] mb-3 uppercase tracking-wider">
              Brief Description of Query
            </label>
            <textarea
              id="query"
              name="query"
              rows={4}
              required
              value={formData.query}
              onChange={handleChange}
              className="w-full bg-[#0D0B1A] border-2 border-[#C9A84C]/20 focus:border-[#C9A84C] rounded-xl py-3 px-4 text-[#E8E4F0] focus:outline-none transition-colors placeholder-[#E8E4F0]/60 resize-none"
              placeholder="Please briefly describe what you would like to discuss and include any birth details if available..."
            ></textarea>
          </div>

          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={isPending}
              className="w-full md:w-auto px-16 bg-[#C9A84C] text-[#0D0B1A] py-4 rounded-full font-sans font-bold text-lg hover:bg-[#b09141] transition-colors shadow-lg shadow-[#C9A84C]/20 inline-block uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? "Routing Request..." : "Request Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-[#E8E4F0]">Loading...</div>}>
      <BookForm />
    </Suspense>
  );
}
