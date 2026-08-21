import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kundali Matching (Ashtakoot Guna Milan)",
  description: "Check compatibility for marriage using traditional Vedic Astrology Kundali Matching.",
};

export default function KundaliMatchingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-4">
          Kundali Matching
        </h1>
        <p className="text-lg text-[#E8E4F0]/80 max-w-2xl mx-auto">
          Enter birth details of both partners to calculate compatibility (Guna Milan) based on traditional Vedic Astrology principles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
        {/* Decorative Divider for LG screens */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[#C9A84C]/20 -translate-x-1/2 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0D0B1A] w-12 h-12 rounded-full border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] font-serif text-2xl z-10">
            &
          </div>
        </div>

        {/* Boy's Details */}
        <div className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 relative z-10">
          <h2 className="text-2xl font-serif font-bold text-[#C9A84C] mb-6 border-b border-[#C9A84C]/20 pb-4">
            Boy's Details
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#E8E4F0] mb-2">Name</label>
              <input type="text" className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors" placeholder="Groom's Name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#E8E4F0] mb-2">Date</label>
                <input type="date" className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors [color-scheme:dark]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#E8E4F0] mb-2">Time</label>
                <input type="time" className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors [color-scheme:dark]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#E8E4F0] mb-2">Place of Birth</label>
              <input type="text" className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors" placeholder="City, State" />
            </div>
          </form>
        </div>

        {/* Girl's Details */}
        <div className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 relative z-10 mt-8 lg:mt-0">
          <h2 className="text-2xl font-serif font-bold text-[#C9A84C] mb-6 border-b border-[#C9A84C]/20 pb-4">
            Girl's Details
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#E8E4F0] mb-2">Name</label>
              <input type="text" className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors" placeholder="Bride's Name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#E8E4F0] mb-2">Date</label>
                <input type="date" className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors [color-scheme:dark]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#E8E4F0] mb-2">Time</label>
                <input type="time" className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors [color-scheme:dark]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#E8E4F0] mb-2">Place of Birth</label>
              <input type="text" className="w-full bg-[#0D0B1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#E8E4F0] focus:outline-none focus:border-[#C9A84C]/50 transition-colors" placeholder="City, State" />
            </div>
          </form>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button
          type="button"
          className="bg-[#C9A84C] text-[#0D0B1A] px-12 py-4 rounded-full font-sans font-bold text-lg hover:bg-[#b09141] transition-colors shadow-lg shadow-[#C9A84C]/20 w-full sm:w-auto min-w-[300px]"
        >
          Check Compatibility
        </button>
      </div>
    </div>
  );
}