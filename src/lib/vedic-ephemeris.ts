// src/lib/vedic-ephemeris.ts
import * as Astronomy from "astronomy-engine";

export const RASHIS = [
  "Aries (Mesha)", "Taurus (Vrishabha)", "Gemini (Mithuna)",
  "Cancer (Karka)", "Leo (Simha)", "Virgo (Kanya)",
  "Libra (Tula)", "Scorpio (Vrishchika)", "Sagittarius (Dhanu)",
  "Capricorn (Makara)", "Aquarius (Kumbha)", "Pisces (Meena)",
] as const;

export const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
  "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
] as const;

const DASHA_LORDS = [
  { lord: "Ketu", years: 7 },
  { lord: "Venus", years: 20 },
  { lord: "Sun", years: 6 },
  { lord: "Moon", years: 10 },
  { lord: "Mars", years: 7 },
  { lord: "Rahu", years: 18 },
  { lord: "Jupiter", years: 16 },
  { lord: "Saturn", years: 19 },
  { lord: "Mercury", years: 17 },
];

/**
 * Computes Lahiri (Chitra Paksha) Ayanamsha in degrees for a given UTC Date.
 * Reference at J2000.0 (2000-01-01T12:00:00Z): 23.853056° with annual precession ~50.29 arcsec.
 */
export function getLahiriAyanamsha(date: Date): number {
  const j2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
  const daysSinceJ2000 = (date.getTime() - j2000) / (1000 * 60 * 60 * 24);
  const yearsSinceJ2000 = daysSinceJ2000 / 365.2425;
  return 23.853056 + (yearsSinceJ2000 * 50.29) / 3600;
}

export function normalizeDeg(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

export function getTropicalEclipticLongitude(body: Astronomy.Body, date: Date): number {
  const time = Astronomy.MakeTime(date);
  const vec = Astronomy.GeoVector(body, time, true);
  const ecl = Astronomy.Ecliptic(vec);
  return normalizeDeg(ecl.elon);
}

/**
 * Mean Lunar Node (Rahu) tropical longitude in degrees
 */
export function getMeanRahuTropical(date: Date): number {
  const j2000 = Date.UTC(2000, 0, 1, 12, 0, 0);
  const T = (date.getTime() - j2000) / (1000 * 60 * 60 * 24 * 36525);
  const omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T;
  return normalizeDeg(omega);
}

/**
 * Computes Sidereal Ascendant (Lagna) in degrees for given UTC Date and geographic coordinates
 */
export function getSiderealAscendant(date: Date, lat: number, lon: number, ayanamsha: number): number {
  const time = Astronomy.MakeTime(date);
  const gmstHours = Astronomy.SiderealTime(time); // Greenwich apparent sidereal time in hours
  const lstDeg = normalizeDeg(gmstHours * 15 + lon);
  const ramcRad = (lstDeg * Math.PI) / 180;
  const epsRad = (23.4392911 * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;

  const y = Math.cos(ramcRad);
  const x = -(Math.sin(epsRad) * Math.tan(latRad) + Math.cos(epsRad) * Math.sin(ramcRad));
  let ascTropical = (Math.atan2(y, x) * 180) / Math.PI;
  ascTropical = normalizeDeg(ascTropical);
  return normalizeDeg(ascTropical - ayanamsha);
}

export interface VedicPlanet {
  name: string;
  siderealLon: number;
  rashiIndex: number; // 0–11
  rashi: string;
  degreeInSign: string;
  navamshaRashi: string;
  nakshatraIndex: number; // 0–26
  nakshatra: string;
  pada: number; // 1–4
  house: number; // 1–12 (Whole Sign from Lagna)
}

export interface FullKundaliData {
  ascendant: {
    rashiIndex: number;
    rashi: string;
    degreeInSign: string;
    nakshatra: string;
    pada: number;
  };
  planets: VedicPlanet[];
  moonNakshatra: string;
  currentMahadasha: string;
  manglik: {
    isManglik: boolean;
    marsHouse: number;
    summary: string;
  };
}

export function computeVedicKundali(utcDate: Date, lat: number, lon: number): FullKundaliData {
  const ayanamsha = getLahiriAyanamsha(utcDate);
  const ascLon = getSiderealAscendant(utcDate, lat, lon, ayanamsha);
  const ascRashiIndex = Math.floor(ascLon / 30);
  const ascNakshatraIndex = Math.floor(ascLon / (360 / 27));
  const ascPada = Math.floor((ascLon % (360 / 27)) / (360 / 108)) + 1;

  const bodies: { name: string; lon: number }[] = [
    { name: "Sun (Surya)", lon: normalizeDeg(getTropicalEclipticLongitude(Astronomy.Body.Sun, utcDate) - ayanamsha) },
    { name: "Moon (Chandra)", lon: normalizeDeg(getTropicalEclipticLongitude(Astronomy.Body.Moon, utcDate) - ayanamsha) },
    { name: "Mars (Mangal)", lon: normalizeDeg(getTropicalEclipticLongitude(Astronomy.Body.Mars, utcDate) - ayanamsha) },
    { name: "Mercury (Budha)", lon: normalizeDeg(getTropicalEclipticLongitude(Astronomy.Body.Mercury, utcDate) - ayanamsha) },
    { name: "Jupiter (Guru)", lon: normalizeDeg(getTropicalEclipticLongitude(Astronomy.Body.Jupiter, utcDate) - ayanamsha) },
    { name: "Venus (Shukra)", lon: normalizeDeg(getTropicalEclipticLongitude(Astronomy.Body.Venus, utcDate) - ayanamsha) },
    { name: "Saturn (Shani)", lon: normalizeDeg(getTropicalEclipticLongitude(Astronomy.Body.Saturn, utcDate) - ayanamsha) },
  ];

  const rahuSidereal = normalizeDeg(getMeanRahuTropical(utcDate) - ayanamsha);
  const ketuSidereal = normalizeDeg(rahuSidereal + 180);
  bodies.push({ name: "Rahu", lon: rahuSidereal });
  bodies.push({ name: "Ketu", lon: ketuSidereal });

  const planets: VedicPlanet[] = bodies.map((b) => {
    const rashiIndex = Math.floor(b.lon / 30);
    const degInSign = b.lon % 30;
    const nakshatraIndex = Math.floor(b.lon / (360 / 27));
    const pada = Math.floor((b.lon % (360 / 27)) / (360 / 108)) + 1;
    const navamshaIndex = Math.floor(b.lon / (30 / 9)) % 12;
    const house = ((rashiIndex - ascRashiIndex + 12) % 12) + 1;

    return {
      name: b.name,
      siderealLon: Number(b.lon.toFixed(2)),
      rashiIndex,
      rashi: RASHIS[rashiIndex],
      degreeInSign: `${Math.floor(degInSign)}° ${Math.floor((degInSign % 1) * 60)}'`,
      navamshaRashi: RASHIS[navamshaIndex],
      nakshatraIndex,
      nakshatra: NAKSHATRAS[nakshatraIndex],
      pada,
      house,
    };
  });

  const moon = planets[1];
  const mars = planets[2];
  const dashaLordObj = DASHA_LORDS[moon.nakshatraIndex % 9];

  // Traditional Parashari Manglik houses: 1, 2, 4, 7, 8, 12 from Lagna
  const manglikHouses = [1, 2, 4, 7, 8, 12];
  const isManglik = manglikHouses.includes(mars.house);

  return {
    ascendant: {
      rashiIndex: ascRashiIndex,
      rashi: RASHIS[ascRashiIndex],
      degreeInSign: `${Math.floor(ascLon % 30)}° ${Math.floor(((ascLon % 30) % 1) * 60)}'`,
      nakshatra: NAKSHATRAS[ascNakshatraIndex],
      pada: ascPada,
    },
    planets,
    moonNakshatra: `${moon.nakshatra} (Pada ${moon.pada})`,
    currentMahadasha: `${dashaLordObj.lord} Mahadasha at Birth`,
    manglik: {
      isManglik,
      marsHouse: mars.house,
      summary: isManglik
        ? `Mangal resides in House ${mars.house} (${mars.rashi}). Manglik Yoga is present; check cancellation rules before marriage.`
        : `Mangal resides in House ${mars.house} (${mars.rashi}). Chart is free from Mangal Dosha.`,
    },
  };
}
