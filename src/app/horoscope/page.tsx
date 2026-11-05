import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import * as Astronomy from "astronomy-engine";
import { getTropicalEclipticLongitude, getLahiriAyanamsha, RASHIS, NAKSHATRAS, normalizeDeg } from "@/lib/vedic-ephemeris";
import HoroscopeGrid, { RashiForecast } from "@/app/components/horoscope/HoroscopeGrid";

export const revalidate = 3600; // Cache for 1 hour

export const metadata: Metadata = {
  title: "Daily Horoscope | JyotishGuru",
  description: "Read your daily horoscope and discover what the stars have in store for your zodiac sign.",
  alternates: {
    canonical: `${SITE_URL}/horoscope`,
  },
  openGraph: {
    title: "Daily Horoscope | JyotishGuru",
    description: "Read your daily horoscope and discover what the stars have in store for your zodiac sign.",
    url: `${SITE_URL}/horoscope`,
  },
};

function generateDailyForecast(
  rashiIndex: number,
  moonHouse: number,
  jupiterHouse: number,
  saturnHouse: number
): { forecast: string; luckyColor: string; luckyNumber: number; upaya: string } {
  // Deterministic but dynamic-feeling generation based on transit houses
  const colors = ["Crimson Red", "White", "Emerald Green", "Silver", "Gold", "Navy Blue", "Saffron", "Maroon", "Yellow", "Indigo", "Cyan", "Sea Green"];
  const luckyColor = colors[(rashiIndex + moonHouse) % colors.length];
  const luckyNumber = (rashiIndex + moonHouse + jupiterHouse) % 9 + 1;

  let forecast = "";
  if (moonHouse === 1 || moonHouse === 5 || moonHouse === 9) {
    forecast = "The Moon graces your trine houses today, bringing emotional clarity and creative bursts. A highly favorable time for new beginnings.";
  } else if (moonHouse === 6 || moonHouse === 8 || moonHouse === 12) {
    forecast = "The Moon transits a challenging house (Dusthana). Practice mindfulness, avoid hasty financial decisions, and focus on spiritual routines.";
  } else if (moonHouse === 10 || moonHouse === 11) {
    forecast = "Strong career and financial energy surrounds you today. Professional networking will yield positive, long-term results.";
  } else {
    forecast = "A balanced day awaits. Focus on domestic harmony, clear communication, and maintaining your current routines without drastic changes.";
  }

  if (jupiterHouse === 1 || jupiterHouse === 7 || jupiterHouse === 5 || jupiterHouse === 9) {
    forecast += " Jupiter's aspect provides immense divine protection and wisdom, paving the way for unexpected blessings.";
  }

  if (saturnHouse === 8 && rashiIndex !== 9 && rashiIndex !== 10) {
    forecast += " Saturn demands patience today. Do not rush the process; slow and steady wins the race.";
  } else if (saturnHouse === 11) {
    forecast += " Saturn brings solid, tangible gains from your past hard work.";
  }

  const upayas = [
    "Offer water to the Sun (Surya Arghya) in the morning.",
    "Chant 'Om Namah Shivaya' 108 times.",
    "Feed stray dogs or crows to appease Saturn.",
    "Donate yellow sweets to the needy.",
    "Light a ghee lamp facing North in the evening.",
    "Recite the Hanuman Chalisa for protection and courage."
  ];
  const upaya = upayas[(rashiIndex + saturnHouse) % upayas.length];

  return { forecast, luckyColor, luckyNumber, upaya };
}

export default async function HoroscopePage() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const ayanamsha = getLahiriAyanamsha(now);

  // Compute live planetary sidereal longitudes
  const moonSidereal = normalizeDeg(getTropicalEclipticLongitude(Astronomy.Body.Moon, now) - ayanamsha);
  const sunSidereal = normalizeDeg(getTropicalEclipticLongitude(Astronomy.Body.Sun, now) - ayanamsha);
  const jupiterSidereal = normalizeDeg(getTropicalEclipticLongitude(Astronomy.Body.Jupiter, now) - ayanamsha);
  const saturnSidereal = normalizeDeg(getTropicalEclipticLongitude(Astronomy.Body.Saturn, now) - ayanamsha);

  // Determine global transiting rashis
  const moonRashiIdx = Math.floor(moonSidereal / 30);
  const sunRashiIdx = Math.floor(sunSidereal / 30);
  const jupiterRashiIdx = Math.floor(jupiterSidereal / 30);
  const saturnRashiIdx = Math.floor(saturnSidereal / 30);

  const moonNakshatraIndex = Math.floor(moonSidereal / (360 / 27));
  const currentMoonNakshatra = NAKSHATRAS[moonNakshatraIndex];

  // Build forecasts for all 12 Rashis
  const forecasts: RashiForecast[] = RASHIS.map((rashiName, idx) => {
    // House = ((Transit_Rashi - Natal_Rashi + 12) % 12) + 1
    const moonHouse = ((moonRashiIdx - idx + 12) % 12) + 1;
    const sunHouse = ((sunRashiIdx - idx + 12) % 12) + 1;
    const jupiterHouse = ((jupiterRashiIdx - idx + 12) % 12) + 1;
    const saturnHouse = ((saturnRashiIdx - idx + 12) % 12) + 1;

    const { forecast, luckyColor, luckyNumber, upaya } = generateDailyForecast(idx, moonHouse, jupiterHouse, saturnHouse);

    return {
      rashi: rashiName,
      rashiIndex: idx,
      dateStr,
      moonNakshatra: currentMoonNakshatra,
      transits: {
        moonHouse,
        sunHouse,
        jupiterHouse,
        saturnHouse
      },
      forecast,
      luckyColor,
      luckyNumber,
      upaya
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-[#C9A84C] mb-4">
          Daily Vedic Horoscope
        </h1>
        <p className="text-lg text-[#E8E4F0]/80 max-w-2xl mx-auto">
          Live Transit Predictions for {dateStr}
        </p>
      </div>

      <HoroscopeGrid forecasts={forecasts} />
    </div>
  );
}