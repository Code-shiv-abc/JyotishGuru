import type { Metadata } from "next";
import { Playfair_Display, Merriweather, Inter, Lato } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Toaster } from "@/components/ui/Toaster";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "JyotishGuru - Modern Mystical Astrology",
  description: "Accurate Kundali generation, Daily Horoscopes, and spiritual insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${merriweather.variable} ${inter.variable} ${lato.variable} antialiased font-sans`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
