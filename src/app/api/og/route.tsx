import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Extract dynamic content from query params or use defaults
    const title = searchParams.get("title") || "JyotishGuru";
    const description = searchParams.get("desc") || "Discover Your Cosmic Destiny with Zero-Cost Vedic Astrology";

    // "Sacred Cosmos" theme variables (matching the app's palette)
    const bgDark = "#0D0B1A";
    const bgCard = "#1A1628";
    const accentGold = "#C9A84C";
    const textLight = "#E8E4F0";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: bgDark,
            backgroundImage: `radial-gradient(circle at 50% 120%, ${bgCard} 0%, ${bgDark} 100%)`,
            fontFamily: "sans-serif", // Using sans-serif fallback for standard support
            padding: "40px",
          }}
        >
          {/* Main Card Wrapper */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: bgCard,
              border: `2px solid ${accentGold}`,
              borderRadius: "20px",
              padding: "60px",
              boxShadow: `0px 20px 40px rgba(0, 0, 0, 0.8)`,
              maxWidth: "900px",
              textAlign: "center",
            }}
          >
            {/* Logo Placeholder / Icon */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: bgDark,
                border: `2px solid ${accentGold}`,
                marginBottom: "30px",
              }}
            >
              <span
                style={{
                  color: accentGold,
                  fontSize: "40px",
                  fontWeight: "bold",
                }}
              >
                ॐ
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: "60px",
                fontWeight: "bold",
                color: accentGold,
                marginBottom: "20px",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: "30px",
                color: textLight,
                lineHeight: 1.4,
                marginBottom: "0",
                opacity: 0.9,
              }}
            >
              {description}
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error("Error generating OG Image", e);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
