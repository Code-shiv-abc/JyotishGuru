// Types for the Astrology Engine

export interface BirthDetails {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  latitude: number;
  longitude: number;
  timezone?: number; // Offset from UTC in hours
}

export interface PlanetaryPosition {
  planet: string; // e.g., 'Sun', 'Moon'
  longitude: number; // 0-360 degrees
  rashi: string; // Zodiac Sign
  rashiId: number; // 1-12
  nakshatra: string;
  degree: number; // Degree within the sign (0-30)
  speed: number;
  isRetrograde: boolean;
  house: number; // 1-12
}

export interface KundaliResult {
  meta: {
    birthDetails: BirthDetails;
    calculationEngine: string;
  };
  planets: PlanetaryPosition[];
  ascendant: PlanetaryPosition; // Technically the 'Lagna'
}

// Mock Data for "Zero-Cost" Architecture until swisseph is fully integrated
const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const PLANETS = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];

/**
 * MOCK Calculation Function
 * Returns dummy planetary positions based on input (deterministic hash for consistency).
 */
export async function calculateKundali(details: BirthDetails): Promise<KundaliResult> {
  // Simulate async calculation delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const planets: PlanetaryPosition[] = PLANETS.map((planet, index) => {
    // specific hash logic to make it look dynamic based on date
    const hash = details.day + details.month + details.year + index * 7;
    const rashiIndex = hash % 12;
    const degree = (hash * 13) % 30;
    const totalLongitude = rashiIndex * 30 + degree;

    return {
      planet,
      longitude: totalLongitude,
      rashi: ZODIAC_SIGNS[rashiIndex],
      rashiId: rashiIndex + 1,
      nakshatra: "Ashwini", // Placeholder
      degree: parseFloat(degree.toFixed(2)),
      speed: 1,
      isRetrograde: false,
      house: (index + 1) % 12 || 12, // Dummy house assignment
    };
  });

  const ascHash = details.hour + details.minute;
  const ascRashiIndex = ascHash % 12;
  const ascDegree = (ascHash * 11) % 30;

  const ascendant: PlanetaryPosition = {
    planet: "Ascendant",
    longitude: ascRashiIndex * 30 + ascDegree,
    rashi: ZODIAC_SIGNS[ascRashiIndex],
    rashiId: ascRashiIndex + 1,
    nakshatra: "Unknown",
    degree: parseFloat(ascDegree.toFixed(2)),
    speed: 0,
    isRetrograde: false,
    house: 1,
  };

  return {
    meta: {
      birthDetails: details,
      calculationEngine: "Mock-Swisseph-Wrapper",
    },
    planets,
    ascendant,
  };
}

// Geolocation Utility using OpenStreetMap (Nominatim)
export interface LocationResult {
  name: string;
  lat: number;
  lon: number;
}

export async function searchLocation(query: string): Promise<LocationResult[]> {
  if (!query || query.length < 3) return [];

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
      {
        headers: {
          "User-Agent": "JyotishGuru/1.0", // Nominatim requires a User-Agent
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }

    const data = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((item: any) => ({
      name: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
    }));
  } catch (error) {
    console.error("Location search error:", error);
    return [];
  }
}
