import { Suspense } from "react";
import BookingForm from "./BookingForm";

export default function BookPage() {
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

      <Suspense fallback={<div className="text-center text-[#E8E4F0]">Loading form...</div>}>
        <BookingForm />
      </Suspense>
    </div>
  );
}
