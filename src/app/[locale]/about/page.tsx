import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Acharya Shri Ravindra Shukla Shastri",
  description: "Learn about the experience and expertise of Acharya Shri Ravindra Shukla Shastri in Vedic Astrology.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-6">
          About Acharya Ji
        </h1>
        <div className="w-24 h-1 bg-[#C9A84C]/50 mx-auto rounded-full"></div>
      </div>

      <div className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden relative">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-[#C9A84C]/30 flex-shrink-0 bg-[#0D0B1A] flex items-center justify-center overflow-hidden relative shadow-lg shadow-[#C9A84C]/10">
            {/* Image Placeholder */}
            <span className="text-6xl text-[#C9A84C]/50 font-serif">ॐ</span>
          </div>

          <div className="space-y-6 text-[#E8E4F0]/90 text-lg leading-relaxed text-center md:text-left">
            <h2 className="text-3xl font-serif font-bold text-[#C9A84C]">
              Acharya Shri Ravindra Shukla Shastri
            </h2>
            <p>
              Based in the holy city of Ayodhya Dham, Acharya Shri Ravindra Shukla Shastri is a distinguished Vedic Astrologer dedicated to helping individuals find their karmic path.
            </p>
            <p>
              With extensive knowledge in ancient Vedic scriptures and years of practical experience, Acharya Ji provides profound insights into life's challenges, career guidance, relationship compatibility, and spiritual growth.
            </p>
            <p className="font-semibold text-[#E8E4F0] border-l-4 border-[#C9A84C] pl-4 italic">
              "Astrology is not about changing your destiny, but understanding it to navigate life with wisdom and grace."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}