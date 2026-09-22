import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | JyotishGuru",
  description: "Privacy Policy for JyotishGuru. Learn how we collect, use, and protect your data.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | JyotishGuru",
    description: "Privacy Policy for JyotishGuru. Learn how we collect, use, and protect your data.",
    url: `${SITE_URL}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A84C] mb-6">
          Privacy Policy
        </h1>
        <div className="w-24 h-1 bg-[#C9A84C]/50 mx-auto rounded-full"></div>
      </div>

      <div className="bg-[#1A1628] border border-[#C9A84C]/20 rounded-2xl p-8 md:p-12 shadow-2xl relative">
        <div className="space-y-8 text-[#E8E4F0]/90 text-lg leading-relaxed">
          <section>
            <h2 className="text-2xl font-serif font-bold text-[#C9A84C] mb-4">1. Introduction</h2>
            <p>Welcome to JyotishGuru. We are committed to protecting your privacy. This policy explains what data we collect, why we collect it, and how we handle it.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-[#C9A84C] mb-4">2. Data We Collect</h2>
            <p>To provide accurate Vedic Astrology services, we collect specific personal information through our Kundali and consultation booking forms:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Full Name</li>
              <li>Date of Birth</li>
              <li>Time of Birth</li>
              <li>Place of Birth</li>
              <li>Phone Number (for contact/WhatsApp)</li>
              <li>Email Address</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-[#C9A84C] mb-4">3. Purpose of Data Collection</h2>
            <p>The information collected is used solely for:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Generating accurate astrological charts (Kundali) and compatibility matching.</li>
              <li>Contacting you to schedule and conduct consultation sessions.</li>
              <li>Providing customer support and service updates.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-[#C9A84C] mb-4">4. Payment Processing</h2>
            <p>We do not currently process any online payments on this website. Therefore, we do not collect or store credit card numbers or other financial payment details.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-[#C9A84C] mb-4">5. Data Retention & Third Parties</h2>
            <p>Your astrological data is retained only as long as necessary to fulfill the requested services. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except where required by law.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-[#C9A84C] mb-4">6. Contact Us</h2>
            <p>If you have any questions regarding this privacy policy, you may contact us at contact@jyotishguru.in.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
