import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description: "Schedule a Vedic astrology consultation with Acharya Shri Ravindra Shukla Shastri.",
};

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

      <div className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-3xl p-8 md:p-12 shadow-2xl">
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-[#E8E4F0] mb-3 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                className="w-full bg-[#0D0B1A] border-b-2 border-[#C9A84C]/20 focus:border-[#C9A84C] py-3 px-2 text-[#E8E4F0] focus:outline-none transition-colors rounded-none placeholder-[#E8E4F0]/30"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#E8E4F0] mb-3 uppercase tracking-wider">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full bg-[#0D0B1A] border-b-2 border-[#C9A84C]/20 focus:border-[#C9A84C] py-3 px-2 text-[#E8E4F0] focus:outline-none transition-colors rounded-none placeholder-[#E8E4F0]/30"
                placeholder="+91 9876543210"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-[#E8E4F0] mb-3 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                className="w-full bg-[#0D0B1A] border-b-2 border-[#C9A84C]/20 focus:border-[#C9A84C] py-3 px-2 text-[#E8E4F0] focus:outline-none transition-colors rounded-none placeholder-[#E8E4F0]/30"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#E8E4F0] mb-3 uppercase tracking-wider">
                Consultation Type
              </label>
              <select className="w-full bg-[#0D0B1A] border-b-2 border-[#C9A84C]/20 focus:border-[#C9A84C] py-3 px-2 text-[#E8E4F0] focus:outline-none transition-colors rounded-none appearance-none">
                <option value="">Select Service</option>
                <option value="kundali">Kundali Reading</option>
                <option value="matching">Match Making</option>
                <option value="career">Career Advice</option>
                <option value="other">Other Query</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#E8E4F0] mb-3 uppercase tracking-wider">
              Brief Description of Query
            </label>
            <textarea
              rows={4}
              className="w-full bg-[#0D0B1A] border-2 border-[#C9A84C]/20 focus:border-[#C9A84C] rounded-xl py-3 px-4 text-[#E8E4F0] focus:outline-none transition-colors placeholder-[#E8E4F0]/30 resize-none"
              placeholder="Please briefly describe what you would like to discuss..."
            ></textarea>
          </div>

          <div className="pt-4 text-center">
            <button
              type="button"
              className="w-full md:w-auto px-16 bg-[#C9A84C] text-[#0D0B1A] py-4 rounded-full font-sans font-bold text-lg hover:bg-[#b09141] transition-colors shadow-lg shadow-[#C9A84C]/20 inline-block uppercase tracking-wide"
            >
              Request Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}