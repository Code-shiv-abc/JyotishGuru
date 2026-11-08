import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JyotishGuru — Acharya Shri Ravindra Shukla Shatri | Vedic Astrologer in Ayodhya Dham";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0D0B1A 0%, #1A1040 50%, #0D0B1A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          border: "8px solid #C9A84C",
          color: "#E8E4F0",
          fontFamily: "serif",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C9A84C",
            marginBottom: 20,
          }}
        >
          Sacred Vedic Astrology • Ayodhya Dham
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "#E8E4F0",
            marginBottom: 16,
          }}
        >
          JyotishGuru
        </div>
        <div
          style={{
            fontSize: 38,
            color: "#C9A84C",
            marginBottom: 28,
          }}
        >
          Acharya Shri Ravindra Shukla Shatri
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#E8E4F0",
            opacity: 0.85,
            maxWidth: 860,
          }}
        >
          Free Parashari Janam Kundali • 36-Guna Ashtakoot Matching • Shodashvarga &amp; Vimshottari Dasha • WhatsApp: +91 80091 24454
        </div>
      </div>
    ),
    { ...size }
  );
}
