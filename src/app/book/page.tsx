import { Metadata } from "next";
import { Suspense } from "react";
import { SITE_URL } from "@/lib/constants";
import BookingForm from "./BookingForm";

export const metadata: Metadata = {
  title: "Book a Consultation | JyotishGuru",
  description: "Schedule a Vedic astrology consultation with Acharya Shri Ravindra Shukla Shatri in Ayodhya Dham.",
  alternates: {
    canonical: `${SITE_URL}/book`,
  },
  openGraph: {
    title: "Book a Consultation | JyotishGuru",
    description: "Schedule a Vedic astrology consultation with Acharya Shri Ravindra Shukla Shatri.",
    url: `${SITE_URL}/book`,
  },
};

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
        <BookingForm />
      </Suspense>
    </div>
  );
}
