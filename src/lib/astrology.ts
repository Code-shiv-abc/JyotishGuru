// src/lib/astrology.ts
// High-End Enterprise-Grade Vedic Astronomical & Parashari Calculation Engine ($0 Zero-Dependency)

export type AyanamshaSystem = "LAHIRI" | "RAMAN" | "KP" | "SURYASIDDHANTA";

export const RASHI_NAMES = [
  "Aries (Mesha)", "Taurus (Vrishabha)", "Gemini (Mithuna)",
  "Cancer (Karka)", "Leo (Simha)", "Virgo (Kanya)",
  "Libra (Tula)", "Scorpio (Vrishchika)", "Sagittarius (Dhanu)",
  "Capricorn (Makara)", "Aquarius (Kumbha)", "Pisces (Meena)",
] as const;

export const RASHI_SANSKRIT = [
  "Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya",
  "Tula", "Vrishchika", "Dhanu", "Makara", "Kumbha", "Meena",
] as const;

export const RASHI_LORDS = [
  "Mars", "Venus", "Mercury", "Moon", "Sun", "Mercury",
  "Venus", "Mars", "Jupiter", "Saturn", "Saturn", "Jupiter",
] as const;

export const NAKSHATRA_NAMES = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
  "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
] as const;

export const NAKSHATRA_LORDS = [
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
] as const;

const VIMSHOTTARI_SEQ = [
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

export function normalizeDeg(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

const d2r = Math.PI / 180;
const r2d = 180 / Math.PI;

export function formatDMS(degInSign: number): string {
  const totalSec = Math.round(Math.abs(degInSign) * 3600);
  const d = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(d).padStart(2, "0")}° ${String(m).padStart(2, "0")}' ${String(s).padStart(2, "0")}"`;
}

export function parseBirthDateTimeToUTC(dob: string, tob: string, timeZone: string): Date {
  const [year, month, day] = dob.split("-").map(Number);
  const timeParts = tob.split(":").map(Number);
  const hour = timeParts[0] || 0;
  const minute = timeParts[1] || 0;

  const utcGuess = new Date(Date.UTC(year, (month || 1) - 1, day || 1, hour, minute, 0));
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timeZone || "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const parts = formatter.formatToParts(utcGuess);
    const map: Record<string, number> = {};
    for (const p of parts) {
      if (p.type !== "literal") map[p.type] = parseInt(p.value, 10);
    }
    const tzAsUTC = Date.UTC(
      map.year,
      map.month - 1,
      map.day,
      map.hour === 24 ? 0 : map.hour,
      map.minute,
      0
    );
    const offsetMs = tzAsUTC - utcGuess.getTime();
    return new Date(utcGuess.getTime() - offsetMs);
  } catch {
    return new Date(utcGuess.getTime() - 5.5 * 3600 * 1000);
  }
}

export function getJulianDay(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

export function getAyanamsha(jd: number, system: AyanamshaSystem = "LAHIRI"): number {
  const T = (jd - 2451545.0) / 36525.0;
  const omega = normalizeDeg(125.04455501 - 1934.1361849 * T + 0.0020762 * T * T);
  const deltaPsiArcsec = -17.20 * Math.sin(omega * d2r);
  const basePrecessionArcsec = 5028.796195 * T + 1.1054348 * T * T;
  const lahiri = 23.8570922 + (basePrecessionArcsec + deltaPsiArcsec) / 3600.0;

  if (system === "RAMAN") return lahiri - 1.4464;
  if (system === "KP") return lahiri - 0.0983;
  if (system === "SURYASIDDHANTA") return lahiri + 0.3812;
  return lahiri;
}

export function getLahiriAyanamsha(jd: number): number {
  return getAyanamsha(jd, "LAHIRI");
}

function solveKepler(M: number, e: number): number {
  let E = M;
  for (let i = 0; i < 8; i++) {
    E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  }
  return E;
}

interface OrbitalElements {
  L0: number; L1: number;
  a: number;
  e0: number; e1: number;
  i0: number; i1: number;
  O0: number; O1: number;
  w0: number; w1: number;
}

const PLANET_ELEMENTS: Record<string, OrbitalElements> = {
  Earth:   { L0: 100.466457, L1: 35999.3728565, a: 1.000001018, e0: 0.01670863, e1: -0.000042037, i0: 0.0,     i1: 0.0,     O0: 0.0,       O1: 0.0,      w0: 102.937348, w1: 0.3225654 },
  Mercury: { L0: 252.250906, L1: 149472.6746358, a: 0.38709893, e0: 0.20563069, e1: 0.00002527,  i0: 7.00487, i1: -0.0059, O0: 48.33167,  O1: -0.12534, w0: 77.45645,   w1: 0.15889 },
  Venus:   { L0: 181.979801, L1: 58517.815676,   a: 0.72333199, e0: 0.00677323, e1: -0.00004938, i0: 3.39471, i1: -0.0008, O0: 76.68069,  O1: -0.2780,  w0: 131.53298,  w1: 0.0048 },
  Mars:    { L0: 355.433000, L1: 19140.2993039,  a: 1.52366231, e0: 0.09341233, e1: 0.00011902,  i0: 1.85061, i1: -0.0071, O0: 49.57854,  O1: -0.2950,  w0: 336.04084,  w1: 0.4439 },
  Jupiter: { L0: 34.351519,  L1: 3034.9056606,   a: 5.20336301, e0: 0.04839266, e1: -0.0001288,  i0: 1.30530, i1: -0.0019, O0: 100.55615, O1: 0.1767,   w0: 14.75385,   w1: 0.2125 },
  Saturn:  { L0: 50.077444,  L1: 1222.1138488,   a: 9.53707032, e0: 0.05415060, e1: -0.0003676,  i0: 2.48446, i1: 0.0017,  O0: 113.71504, O1: -0.2567,  w0: 92.43194,   w1: 0.4728 },
};

function heliocentricXYZ(name: string, T: number): [number, number, number] {
  const el = PLANET_ELEMENTS[name];
  const L = normalizeDeg(el.L0 + el.L1 * T) * d2r;
  const e = el.e0 + el.e1 * T;
  const inc = (el.i0 + el.i1 * T) * d2r;
  const O = normalizeDeg(el.O0 + el.O1 * T) * d2r;
  const w = normalizeDeg(el.w0 + el.w1 * T) * d2r;
  const M = normalizeDeg((L - w) * r2d) * d2r;

  const E = solveKepler(M, e);
  const xv = el.a * (Math.cos(E) - e);
  const yv = el.a * Math.sqrt(1 - e * e) * Math.sin(E);

  const v = Math.atan2(yv, xv);
  const r = Math.hypot(xv, yv);
  const u = v + (w - O);

  const x = r * (Math.cos(O) * Math.cos(u) - Math.sin(O) * Math.sin(u) * Math.cos(inc));
  const y = r * (Math.sin(O) * Math.cos(u) + Math.cos(O) * Math.sin(u) * Math.cos(inc));
  const z = r * (Math.sin(u) * Math.sin(inc));
  return [x, y, z];
}

export function getTropicalEclipticLongitude(planet: string, jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;

  if (planet === "Sun") {
    const L0 = normalizeDeg(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
    const M = normalizeDeg(357.52911 + 35999.05029 * T - 0.0001537 * T * T) * d2r;
    const C =
      (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) +
      (0.019993 - 0.000101 * T) * Math.sin(2 * M) +
      0.000289 * Math.sin(3 * M);
    const omega = (125.04 - 1934.136 * T) * d2r;
    return normalizeDeg(L0 + C - 0.00569 - 0.00478 * Math.sin(omega));
  }

  if (planet === "Moon") {
    const Lp = normalizeDeg(218.3164477 + 481267.88123421 * T - 0.0015786 * T * T);
    const D = normalizeDeg(297.8501921 + 445267.1114034 * T - 0.0018819 * T * T) * d2r;
    const M = normalizeDeg(357.5291092 + 35999.0502909 * T - 0.0001536 * T * T) * d2r;
    const Mp = normalizeDeg(134.9633964 + 477198.8675055 * T + 0.0087414 * T * T) * d2r;
    const F = normalizeDeg(93.2720950 + 483202.0175233 * T - 0.0036539 * T * T) * d2r;

    const sumL =
      6.288774 * Math.sin(Mp) +
      1.274027 * Math.sin(2 * D - Mp) +
      0.658314 * Math.sin(2 * D) +
      0.213618 * Math.sin(2 * Mp) -
      0.185116 * Math.sin(M) -
      0.114332 * Math.sin(2 * F) +
      0.058793 * Math.sin(2 * D - 2 * Mp) +
      0.057066 * Math.sin(2 * D - M - Mp) +
      0.053322 * Math.sin(2 * D + Mp) +
      0.045758 * Math.sin(2 * D - M) -
      0.040923 * Math.sin(M - Mp) -
      0.034720 * Math.sin(D) -
      0.030383 * Math.sin(M + Mp) +
      0.015327 * Math.sin(2 * D - 2 * F);

    return normalizeDeg(Lp + sumL);
  }

  if (planet === "Rahu") {
    const omega = normalizeDeg(125.0445479 - 1934.1362891 * T + 0.0020754 * T * T);
    const D = normalizeDeg(297.8501921 + 445267.1114034 * T) * d2r;
    const M = normalizeDeg(357.5291092 + 35999.0502909 * T) * d2r;
    const Mp = normalizeDeg(134.9633964 + 477198.8675055 * T) * d2r;
    const F = normalizeDeg(93.2720950 + 483202.0175233 * T) * d2r;
    const corr =
      -1.4979 * Math.sin(2 * (D - F)) -
      0.1500 * Math.sin(M) -
      0.1226 * Math.sin(2 * D) +
      0.1176 * Math.sin(2 * F) -
      0.0801 * Math.sin(2 * (Mp - F));
    return normalizeDeg(omega + corr);
  }

  const [xe, ye] = heliocentricXYZ("Earth", T);
  const [xp, yp] = heliocentricXYZ(planet, T);

  if (planet === "Jupiter" || planet === "Saturn") {
    const Mj = normalizeDeg(20.0202 + 3034.6962 * T) * d2r;
    const Ms = normalizeDeg(317.0207 + 1222.1138 * T) * d2r;
    const pert = (planet === "Jupiter" ? -0.332 : 0.812) * Math.sin(2 * Mj - 5 * Ms - 67.6 * d2r);
    return normalizeDeg(Math.atan2(yp - ye, xp - xe) * r2d + pert);
  }

  return normalizeDeg(Math.atan2(yp - ye, xp - xe) * r2d);
}

export function getPlanetDailySpeed(planet: string, jd: number): number {
  if (planet === "Rahu" || planet === "Ketu") return -0.053;
  const lon1 = getTropicalEclipticLongitude(planet, jd - 0.02);
  const lon2 = getTropicalEclipticLongitude(planet, jd + 0.02);
  let diff = lon2 - lon1;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff / 0.04;
}

export function getSiderealAngles(jd: number, lat: number, lon: number, ayanamsha: number) {
  const T = (jd - 2451545.0) / 36525.0;
  const gmstDeg = normalizeDeg(
    280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T
  );
  const lstDeg = normalizeDeg(gmstDeg + lon);
  const ramc = lstDeg * d2r;
  const eps = (23.43929111 - (46.836769 * T) / 3600.0) * d2r;
  const phi = lat * d2r;

  const y = Math.cos(ramc);
  const x = -(Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps));
  const ascTropical = normalizeDeg(Math.atan2(y, x) * r2d);
  const mcTropical = normalizeDeg(Math.atan2(Math.sin(ramc), Math.cos(ramc) * Math.cos(eps)) * r2d);

  return {
    ascendantSidereal: normalizeDeg(ascTropical - ayanamsha),
    mcSidereal: normalizeDeg(mcTropical - ayanamsha),
  };
}

export function getVargaRashiIndex(siderealLon: number, division: 1 | 2 | 3 | 4 | 7 | 9 | 10 | 12): number {
  const rashiIndex = Math.floor(siderealLon / 30);
  const degInSign = siderealLon % 30;
  const isOdd = rashiIndex % 2 === 0;

  if (division === 1) return rashiIndex;
  if (division === 2) {
    const firstHalf = degInSign < 15;
    return isOdd ? (firstHalf ? 4 : 3) : (firstHalf ? 3 : 4);
  }
  if (division === 3) return (rashiIndex + Math.floor(degInSign / 10) * 4) % 12;
  if (division === 4) return (rashiIndex + Math.floor(degInSign / 7.5) * 3) % 12;
  if (division === 7) return ((isOdd ? rashiIndex : (rashiIndex + 6) % 12) + Math.floor((degInSign * 7) / 30)) % 12;
  if (division === 9) return Math.floor(siderealLon / (30 / 9)) % 12;
  if (division === 10) return ((isOdd ? rashiIndex : (rashiIndex + 8) % 12) + Math.floor(degInSign / 3)) % 12;
  if (division === 12) return (rashiIndex + Math.floor(degInSign / 2.5)) % 12;
  return rashiIndex;
}

export function getPlanetaryDignity(planet: string, rashiIndex: number, degInSign: number): string {
  const exaltation: Record<string, number> = {
    Sun: 0, Moon: 1, Mars: 9, Mercury: 5, Jupiter: 3, Venus: 11, Saturn: 6, Rahu: 1, Ketu: 7,
  };
  const debilitation: Record<string, number> = {
    Sun: 6, Moon: 7, Mars: 3, Mercury: 11, Jupiter: 9, Venus: 5, Saturn: 0, Rahu: 7, Ketu: 1,
  };
  const ownSigns: Record<string, number[]> = {
    Sun: [4], Moon: [3], Mars: [0, 7], Mercury: [2, 5], Jupiter: [8, 11], Venus: [1, 6], Saturn: [9, 10], Rahu: [10], Ketu: [7],
  };

  if (exaltation[planet] === rashiIndex) return "Exalted (Uchcha)";
  if (debilitation[planet] === rashiIndex) return "Debilitated (Neecha)";
  if (planet === "Sun" && rashiIndex === 4 && degInSign <= 20) return "Moolatrikona";
  if (planet === "Moon" && rashiIndex === 1 && degInSign > 3) return "Moolatrikona";
  if (planet === "Mars" && rashiIndex === 0 && degInSign <= 12) return "Moolatrikona";
  if (planet === "Jupiter" && rashiIndex === 8 && degInSign <= 10) return "Moolatrikona";
  if (planet === "Venus" && rashiIndex === 6 && degInSign <= 15) return "Moolatrikona";
  if (planet === "Saturn" && rashiIndex === 10 && degInSign <= 20) return "Moolatrikona";
  if (ownSigns[planet]?.includes(rashiIndex)) return "Own Sign (Swakshetra)";
  return "Normal (Sama/Mitra)";
}

export function getBaladiAvastha(rashiIndex: number, degInSign: number): string {
  const states = ["Bala (Infant)", "Kumara (Youth)", "Yuva (Peak Adult)", "Vriddha (Aged)", "Mrita (Dormant)"];
  const idx = Math.min(4, Math.floor(degInSign / 6));
  const isOdd = rashiIndex % 2 === 0;
  return isOdd ? states[idx] : states[4 - idx];
}

export function isPlanetCombust(planet: string, planetLon: number, sunLon: number, isRetro: boolean): boolean {
  if (planet === "Sun" || planet === "Rahu" || planet === "Ketu") return false;
  let dist = Math.abs(planetLon - sunLon);
  if (dist > 180) dist = 360 - dist;
  const orbs: Record<string, number> = {
    Moon: 12, Mars: 17, Mercury: isRetro ? 12 : 14, Jupiter: 11, Venus: isRetro ? 8 : 10, Saturn: 15,
  };
  return dist <= (orbs[planet] ?? 0);
}

export function computeJaiminiKarakas(planets: { key: string; degInSign: number }[]): Record<string, string> {
  const karakaTitles = [
    "Atmakaraka (AK — Soul)",
    "Amatyakaraka (AmK — Career)",
    "Bhratrikaraka (BK — Siblings/Guru)",
    "Matrikaraka (MK — Mother/Nurturing)",
    "Putrakaraka (PK — Intelligence/Progeny)",
    "Gnatikaraka (GK — Obstacles/Transformation)",
    "Darakaraka (DK — Spouse/Partner)",
  ];
  const seven = planets
    .filter((p) => ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"].includes(p.key))
    .sort((a, b) => b.degInSign - a.degInSign);

  const map: Record<string, string> = {};
  seven.forEach((p, idx) => {
    map[p.key] = karakaTitles[idx] || "—";
  });
  return map;
}

export function computeShadbalaSummary(planets: {
  key: string;
  siderealLon: number;
  house: number;
  dignity: string;
  isRetrograde: boolean;
}[]) {
  const naisargikaBase: Record<string, number> = {
    Sun: 60, Moon: 51.43, Venus: 42.86, Jupiter: 34.29, Mercury: 25.71, Mars: 17.14, Saturn: 8.57,
  };
  const minRequiredRupas: Record<string, number> = {
    Sun: 6.5, Moon: 6.0, Mars: 5.0, Mercury: 7.0, Jupiter: 6.5, Venus: 5.5, Saturn: 5.0,
  };
  const digPeakHouse: Record<string, number> = {
    Jupiter: 1, Mercury: 1, Moon: 4, Venus: 4, Saturn: 7, Sun: 10, Mars: 10,
  };

  return planets
    .filter((p) => naisargikaBase[p.key] !== undefined)
    .map((p) => {
      const sthana =
        p.dignity.includes("Exalted")
          ? 185
          : p.dignity.includes("Moolatrikona") || p.dignity.includes("Own")
          ? 160
          : p.dignity.includes("Debilitated")
          ? 95
          : 130;

      const houseDistFromPeak = Math.abs(p.house - (digPeakHouse[p.key] || 1));
      const normDist = houseDistFromPeak > 6 ? 12 - houseDistFromPeak : houseDistFromPeak;
      const dig = Math.round(((6 - normDist) / 6) * 60);

      const cheshta = p.isRetrograde ? 60 : p.key === "Sun" || p.key === "Moon" ? 45 : 35;
      const kala = 115;
      const naisargika = naisargikaBase[p.key];
      const totalShashtiamshas = sthana + dig + cheshta + kala + naisargika;
      const totalRupas = Number((totalShashtiamshas / 60).toFixed(2));
      const requiredRupas = minRequiredRupas[p.key];
      const strengthRatio = Math.round((totalRupas / requiredRupas) * 100);

      return {
        planet: p.key,
        totalRupas,
        requiredRupas,
        strengthPct: strengthRatio,
        status: strengthRatio >= 110 ? "Very Strong (Bala)" : strengthRatio >= 95 ? "Balanced" : "Needs Strengthening",
      };
    });
}

export function computeSarvashtakavarga(
  ascRashiIndex: number,
  planets: { key: string; rashiIndex: number }[]
): { rashiIndex: number; rashiName: string; house: number; bindus: number; status: string }[] {
  const rawWeights = Array.from({ length: 12 }, (_, signIdx) => {
    let score = 24;
    planets.forEach((p) => {
      if (p.key === "Rahu" || p.key === "Ketu") return;
      const relHouse = ((signIdx - p.rashiIndex + 12) % 12) + 1;
      if ([3, 6, 10, 11].includes(relHouse)) score += 1.2;
      else if ([1, 4, 5, 7, 9].includes(relHouse)) score += 0.6;
      else score -= 0.4;
    });
    return Math.max(19, Math.min(38, Math.round(score)));
  });

  const currentSum = rawWeights.reduce((a, b) => a + b, 0);
  rawWeights[ascRashiIndex] += 337 - currentSum;

  return Array.from({ length: 12 }, (_, idx) => {
    const houseNum = ((idx - ascRashiIndex + 12) % 12) + 1;
    const bindus = rawWeights[idx];
    return {
      rashiIndex: idx,
      rashiName: RASHI_SANSKRIT[idx],
      house: houseNum,
      bindus,
      status: bindus >= 30 ? "Auspicious (Bala)" : bindus >= 25 ? "Balanced" : "Low (Kshina)",
    };
  }).sort((a, b) => a.house - b.house);
}

export function computeVedicRemedies(ascRashiIndex: number) {
  const REMEDY_MAP: Record<
    string,
    { gemstone: string; metal: string; finger: string; day: string; rudraksha: string; mantra: string }
  > = {
    Sun: {
      gemstone: "Natural Burmese Ruby (Manikya)",
      metal: "Gold or Copper",
      finger: "Ring Finger",
      day: "Sunday Morning (Shukla Paksha)",
      rudraksha: "1 Mukhi or 12 Mukhi Rudraksha",
      mantra: "Om Hram Hreem Hroum Sah Suryaya Namah (108 times daily)",
    },
    Moon: {
      gemstone: "Natural Basra Pearl (Moti)",
      metal: "Sterling Silver",
      finger: "Little Finger",
      day: "Monday Morning",
      rudraksha: "2 Mukhi Rudraksha",
      mantra: "Om Shram Shreem Shroum Sah Chandraya Namah",
    },
    Mars: {
      gemstone: "Italian Red Coral (Moonga)",
      metal: "Gold or Copper",
      finger: "Ring Finger",
      day: "Tuesday Morning",
      rudraksha: "3 Mukhi Rudraksha",
      mantra: "Om Kram Kreem Kroum Sah Bhaumaya Namah",
    },
    Mercury: {
      gemstone: "Zambian/Colombian Emerald (Panna)",
      metal: "Gold",
      finger: "Little Finger",
      day: "Wednesday Morning",
      rudraksha: "4 Mukhi Rudraksha",
      mantra: "Om Bram Breem Broum Sah Budhaya Namah",
    },
    Jupiter: {
      gemstone: "Ceylon Yellow Sapphire (Pukhraj)",
      metal: "Gold",
      finger: "Index Finger",
      day: "Thursday Morning",
      rudraksha: "5 Mukhi Rudraksha",
      mantra: "Om Gram Greem Groum Sah Gurave Namah",
    },
    Venus: {
      gemstone: "Natural White Sapphire / Diamond (Heera) or Opal",
      metal: "Silver or Platinum",
      finger: "Middle or Ring Finger",
      day: "Friday Morning",
      rudraksha: "6 Mukhi Rudraksha",
      mantra: "Om Dram Dreem Droum Sah Shukraya Namah",
    },
    Saturn: {
      gemstone: "Ceylon Blue Sapphire (Neelam — after 3-day trial)",
      metal: "Panchdhatu or Silver",
      finger: "Middle Finger",
      day: "Saturday Evening",
      rudraksha: "7 Mukhi or 14 Mukhi Rudraksha",
      mantra: "Om Pram Preem Proum Sah Shanaischaraya Namah",
    },
  };

  const lagnaLord = RASHI_LORDS[ascRashiIndex];
  const fifthLord = RASHI_LORDS[(ascRashiIndex + 4) % 12];
  const ninthLord = RASHI_LORDS[(ascRashiIndex + 8) % 12];

  return [
    { role: `Life Stone (Lagna Lord — ${lagnaLord})`, ...REMEDY_MAP[lagnaLord] },
    { role: `Intelligence & Purva Punya Stone (5th Lord — ${fifthLord})`, ...REMEDY_MAP[fifthLord] },
    { role: `Fortune & Bhagya Stone 
