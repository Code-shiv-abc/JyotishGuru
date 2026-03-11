import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Kundali Generation",
  description: "Generate your free comprehensive Vedic Astrology Kundali (Birth Chart).",
};

export default function KundaliPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-4">
          Free Kundali Generation
        </h1>
        <p className="text-lg text-[#E8E4F0]/80">
          Enter your birth details below to generate your comprehensive Vedic Astrology birth chart.
        </p>
      </div>

      <div className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 shadow-2xl">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                Gender
              </label>
              <select
                id="gender"
                className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors appearance-none"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors [color-scheme:dark]"
              />
            </div>
            <div>
              <label htmlFor="tob" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                Time of Birth
              </label>
              <input
                type="time"
                id="tob"
                className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors [color-scheme:dark]"
              />
            </div>
            <div>
              <label htmlFor="pob" className="block text-sm font-medium text-[#E8E4F0] mb-2">
                Place of Birth
              </label>
              <input
                type="text"
                id="pob"
                className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
                placeholder="City, State"
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="button"
              className="w-full bg-[#C9A84C] text-[#0D0B1A] py-4 rounded-lg font-sans font-bold text-lg hover:bg-[#b09141] transition-colors shadow-lg shadow-[#C9A84C]/20"
            >
              Generate Kundali
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}