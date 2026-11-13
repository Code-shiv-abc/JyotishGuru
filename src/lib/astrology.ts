export type AyanamshaSystem = "LAHIRI" | "RAMAN" | "KP" | "SURYASIDDHANTA";

export const RASHI_NAMES = [
  "Aries (Mesha)", "Taurus (Vrishabha)", "Gemini (Mithuna)", "Cancer (Karka)",
  "Leo (Simha)", "Virgo (Kanya)", "Libra (Tula)", "Scorpio (Vrishchika)",
  "Sagittarius (Dhanu)", "Capricorn (Makara)", "Aquarius (Kumbha)", "Pisces (Meena)",
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
  { lord: "Ketu", years: 7 }, { lord: "Venus", years: 20 }, { lord: "Sun", years: 6 },
  { lord: "Moon", years: 10 }, { lord: "Mars", years: 7 }, { lord: "Rahu", years: 18 },
  { lord: "Jupiter", years: 16 }, { lord: "Saturn", years: 19 }, { lord: "Mercury", years: 17 },
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
  const [hour, minute] = tob.split(":").map(Number);
  const utcGuess = new Date(Date.UTC(year, (month || 1) - 1, day || 1, hour || 0, minute || 0, 0));
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timeZone || "Asia/Kolkata",
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    });
    const map: Record<string, number> = {};
    for (const p of formatter.formatToParts(utcGuess)) {
      if (p.type !== "literal") map[p.type] = parseInt(p.value, 10);
    }
    const tzAsUTC = Date.UTC(map.year, map.month - 1, map.day, map.hour === 24 ? 0 : map.hour, map.minute, 0);
    return new Date(utcGuess.getTime() - (tzAsUTC - utcGuess.getTime()));
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
  const lahiri = 23.8570922 + (5028.796195 * T + 1.1054348 * T * T - 17.2 * Math.sin(omega * d2r)) / 3600.0;
  if (system === "RAMAN") return lahiri - 1.4464;
  if (system === "KP") return lahiri - 0.0983;
  if (system === "SURYASIDDHANTA") return lahiri + 0.3812;
  return lahiri;
}

export function getLahiriAyanamsha(jd: number): number {
  return getAyanamsha(jd, "LAHIRI");
}

const PLANET_ELEMENTS: Record<string, number[]> = {
  Earth:   [100.466457, 35999.3728565, 1.000001018, 0.01670863, -0.000042037, 0.0, 0.0, 0.0, 0.0, 102.937348, 0.3225654],
  Mercury: [252.250906, 149472.6746358, 0.38709893, 0.20563069, 0.00002527, 7.00487, -0.0059, 48.33167, -0.12534, 77.45645, 0.15889],
  Venus:   [181.979801, 58517.815676, 0.72333199, 0.00677323, -0.00004938, 3.39471, -0.0008, 76.68069, -0.278, 131.53298, 0.0048],
  Mars:    [355.433, 19140.2993039, 1.52366231, 0.09341233, 0.00011902, 1.85061, -0.0071, 49.57854, -0.295, 336.04084, 0.4439],
  Jupiter: [34.351519, 3034.9056606, 5.20336301, 0.04839266, -0.0001288, 1.3053, -0.0019, 100.55615, 0.1767, 14.75385, 0.2125],
  Saturn:  [50.077444, 1222.1138488, 9.53707032, 0.0541506, -0.0003676, 2.48446, 0.0017, 113.71504, -0.2567, 92.43194, 0.4728],
};

function heliocentricXYZ(name: string, T: number): [number, number] {
  const [L0, L1, a, e0, e1, i0, i1, O0, O1, w0, w1] = PLANET_ELEMENTS[name];
  const L = normalizeDeg(L0 + L1 * T) * d2r;
  const e = e0 + e1 * T;
  const inc = (i0 + i1 * T) * d2r;
  const O = normalizeDeg(O0 + O1 * T) * d2r;
  const w = normalizeDeg(w0 + w1 * T) * d2r;
  const M = normalizeDeg((L - w) * r2d) * d2r;
  let E = M;
  for (let k = 0; k < 7; k++) E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  const xv = a * (Math.cos(E) - e);
  const yv = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const u = Math.atan2(yv, xv) + (w - O);
  const r = Math.hypot(xv, yv);
  return [
    r * (Math.cos(O) * Math.cos(u) - Math.sin(O) * Math.sin(u) * Math.cos(inc)),
    r * (Math.sin(O) * Math.cos(u) + Math.cos(O) * Math.sin(u) * Math.cos(inc)),
  ];
}

export function getTropicalEclipticLongitude(planet: string, jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  if (planet === "Sun") {
    const L0 = normalizeDeg(280.46646 + 36000.76983 * T);
    const M = normalizeDeg(357.52911 + 35999.05029 * T) * d2r;
    const C = (1.914602 - 0.004817 * T) * Math.sin(M) + 0.019993 * Math.sin(2 * M) + 0.000289 * Math.sin(3 * M);
    return normalizeDeg(L0 + C - 0.00569 - 0.00478 * Math.sin((125.04 - 1934.136 * T) * d2r));
  }
  if (planet === "Moon") {
    const Lp = normalizeDeg(218.3164477 + 481267.88123421 * T);
    const D = normalizeDeg(297.8501921 + 445267.1114034 * T) * d2r;
    const M = normalizeDeg(357.5291092 + 35999.0502909 * T) * d2r;
    const Mp = normalizeDeg(134.9633964 + 477198.8675055 * T) * d2r;
    const F = normalizeDeg(93.272095 + 483202.0175233 * T) * d2r;
    const sumL = 6.288774 * Math.sin(Mp) + 1.274027 * Math.sin(2 * D - Mp) + 0.658314 * Math.sin(2 * D) +
      0.213618 * Math.sin(2 * Mp) - 0.185116 * Math.sin(M) - 0.114332 * Math.sin(2 * F) +
      0.058793 * Math.sin(2 * D - 2 * Mp) + 0.057066 * Math.sin(2 * D - M - Mp) + 0.053322 * Math.sin(2 * D + Mp);
    return normalizeDeg(Lp + sumL);
  }
  if (planet === "Rahu") {
    const omega = normalizeDeg(125.0445479 - 1934.1362891 * T);
    const D = normalizeDeg(297.8501921 + 445267.1114034 * T) * d2r;
    const F = normalizeDeg(93.272095 + 483202.0175233 * T) * d2r;
    return normalizeDeg(omega - 1.4979 * Math.sin(2 * (D - F)));
  }
  const [xe, ye] = heliocentricXYZ("Earth", T);
  const [xp, yp] = heliocentricXYZ(planet, T);
  let pert = 0;
  if (planet === "Jupiter" || planet === "Saturn") {
    const Mj = normalizeDeg(20.0202 + 3034.6962 * T) * d2r;
    const Ms = normalizeDeg(317.0207 + 1222.1138 * T) * d2r;
    pert = (planet === "Jupiter" ? -0.332 : 0.812) * Math.sin(2 * Mj - 5 * Ms - 67.6 * d2r);
  }
  return normalizeDeg(Math.atan2(yp - ye, xp - xe) * r2d + pert);
}

export function getPlanetDailySpeed(planet: string, jd: number): number {
  if (planet === "Rahu" || planet === "Ketu") return -0.053;
  let diff = getTropicalEclipticLongitude(planet, jd + 0.02) - getTropicalEclipticLongitude(planet, jd - 0.02);
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return diff / 0.04;
}

export function getSiderealAngles(jd: number, lat: number, lon: number, ayanamsha: number) {
  const T = (jd - 2451545.0) / 36525.0;
  const gmstDeg = normalizeDeg(280.46061837 + 360.98564736629 * (jd - 2451545.0));
  const ramc = normalizeDeg(gmstDeg + lon) * d2r;
  const eps = (23.43929111 - (46.836769 * T) / 3600.0) * d2r;
  const y = Math.cos(ramc);
  const x = -(Math.sin(ramc) * Math.cos(eps) + Math.tan(lat * d2r) * Math.sin(eps));
  return {
    ascendantSidereal: normalizeDeg(Math.atan2(y, x) * r2d - ayanamsha),
    mcSidereal: normalizeDeg(Math.atan2(Math.sin(ramc), Math.cos(ramc) * Math.cos(eps)) * r2d - ayanamsha),
  };
}

export function getVargaRashiIndex(siderealLon: number, division: 1 | 2 | 3 | 4 | 7 | 9 | 10 | 12): number {
  const rashiIndex = Math.floor(siderealLon / 30);
  const degInSign = siderealLon % 30;
  const isOdd = rashiIndex % 2 === 0;
  if (division === 1) return rashiIndex;
  if (division === 2) return isOdd ? (degInSign < 15 ? 4 : 3) : (degInSign < 15 ? 3 : 4);
  if (division === 3) return (rashiIndex + Math.floor(degInSign / 10) * 4) % 12;
  if (division === 4) return (rashiIndex + Math.floor(degInSign / 7.5) * 3) % 12;
  if (division === 7) return ((isOdd ? rashiIndex : (rashiIndex + 6) % 12) + Math.floor((degInSign * 7) / 30)) % 12;
  if (division === 9) return Math.floor(siderealLon / (30 / 9)) % 12;
  if (division === 10) return ((isOdd ? rashiIndex : (rashiIndex + 8) % 12) + Math.floor(degInSign / 3)) % 12;
  if (division === 12) return (rashiIndex + Math.floor(degInSign / 2.5)) % 12;
  return rashiIndex;
}

export function getPlanetaryDignity(planet: string, rashiIndex: number, degInSign: number): string {
  const exalt: Record<string, number> = { Sun: 0, Moon: 1, Mars: 9, Mercury: 5, Jupiter: 3, Venus: 11, Saturn: 6, Rahu: 1, Ketu: 7 };
  const debil: Record<string, number> = { Sun: 6, Moon: 7, Mars: 3, Mercury: 11, Jupiter: 9, Venus: 5, Saturn: 0, Rahu: 7, Ketu: 1 };
  const own: Record<string, number[]> = { Sun: [4], Moon: [3], Mars: [0, 7], Mercury: [2, 5], Jupiter: [8, 11], Venus: [1, 6], Saturn: [9, 10], Rahu: [10], Ketu: [7] };
  if (exalt[planet] === rashiIndex) return "Exalted (Uchcha)";
  if (debil[planet] === rashiIndex) return "Debilitated (Neecha)";
  if (own[planet]?.includes(rashiIndex)) return degInSign <= 15 ? "Moolatrikona" : "Own Sign (Swakshetra)";
  return "Normal (Sama/Mitra)";
}

export function getBaladiAvastha(rashiIndex: number, degInSign: number): string {
  const states = ["Bala (Infant)", "Kumara (Youth)", "Yuva (Peak Adult)", "Vriddha (Aged)", "Mrita (Dormant)"];
  const idx = Math.min(4, Math.floor(degInSign / 6));
  return rashiIndex % 2 === 0 ? states[idx] : states[4 - idx];
}

export function isPlanetCombust(planet: string, planetLon: number, sunLon: number, isRetro: boolean): boolean {
  if (planet === "Sun" || planet === "Rahu" || planet === "Ketu") return false;
  let dist = Math.abs(planetLon - sunLon);
  if (dist > 180) dist = 360 - dist;
  const orbs: Record<string, number> = { Moon: 12, Mars: 17, Mercury: isRetro ? 12 : 14, Jupiter: 11, Venus: isRetro ? 8 : 10, Saturn: 15 };
  return dist <= (orbs[planet] ?? 0);
}

export function computeJaiminiKarakas(planets: { key: string; degInSign: number }[]): Record<string, string> {
  const titles = ["Atmakaraka (AK)", "Amatyakaraka (AmK)", "Bhratrikaraka (BK)", "Matrikaraka (MK)", "Putrakaraka (PK)", "Gnatikaraka (GK)", "Darakaraka (DK)"];
  const map: Record<string, string> = {};
  planets.filter((p) => !["Rahu", "Ketu"].includes(p.key)).sort((a, b) => b.degInSign - a.degInSign).forEach((p, i) => { map[p.key] = titles[i] || "—"; });
  return map;
}

export function computeShadbalaSummary(planets: { key: string; house: number; dignity: string; isRetrograde: boolean }[]) {
  const base: Record<string, [number, number, number]> = {
    Sun: [60, 6.5, 10], Moon: [51.4, 6.0, 4], Mars: [17.1, 5.0, 10],
    Mercury: [25.7, 7.0, 1], Jupiter: [34.3, 6.5, 1], Venus: [42.9, 5.5, 4], Saturn: [8.6, 5.0, 7],
  };
  return planets.filter((p) => base[p.key]).map((p) => {
    const [naisargika, req, peak] = base[p.key];
    const sthana = p.dignity.includes("Exalted") ? 185 : p.dignity.includes("Own") || p.dignity.includes("Mool") ? 160 : p.dignity.includes("Debil") ? 95 : 130;
    const dist = Math.abs(p.house - peak);
    const dig = Math.round(((6 - (dist > 6 ? 12 - dist : dist)) / 6) * 60);
    const totalRupas = Number(((sthana + dig + (p.isRetrograde ? 60 : 40) + 115 + naisargika) / 60).toFixed(2));
    const strengthPct = Math.round((totalRupas / req) * 100);
    return { planet: p.key, totalRupas, requiredRupas: req, strengthPct, status: strengthPct >= 110 ? "Very Strong" : strengthPct >= 95 ? "Balanced" : "Needs Remedy" };
  });
}

export function computeSarvashtakavarga(ascRashiIndex: number, planets: { key: string; rashiIndex: number }[]) {
  const weights = Array.from({ length: 12 }, (_, s) => {
    let sc = 24;
    planets.forEach((p) => {
      if (p.key === "Rahu" || p.key === "Ketu") return;
      const h = ((s - p.rashiIndex + 12) % 12) + 1;
      sc += [3, 6, 10, 11].includes(h) ? 1.2 : [1, 4, 5, 7, 9].includes(h) ? 0.6 : -0.4;
    });
    return Math.max(19, Math.min(38, Math.round(sc)));
  });
  weights[ascRashiIndex] += 337 - weights.reduce((a, b) => a + b, 0);
  return Array.from({ length: 12 }, (_, idx) => {
    const house = ((idx - ascRashiIndex + 12) % 12) + 1;
    const bindus = weights[idx];
    return { rashiIndex: idx, rashiName: RASHI_SANSKRIT[idx], house, bindus, status: bindus >= 30 ? "Auspicious" : bindus >= 25 ? "Balanced" : "Low" };
  }).sort((a, b) => a.house - b.house);
}

export function computeVedicRemedies(ascRashiIndex: number) {
  const MAP: Record<string, { gemstone: string; metal: string; finger: string; day: string; rudraksha: string; mantra: string }> = {
    Sun: { gemstone: "Natural Ruby (Manikya)", metal: "Gold/Copper", finger: "Ring Finger", day: "Sunday", rudraksha: "1 or 12 Mukhi", mantra: "Om Hram Hreem Hroum Sah Suryaya Namah" },
    Moon: { gemstone: "Natural Pearl (Moti)", metal: "Silver", finger: "Little Finger", day: "Monday", rudraksha: "2 Mukhi", mantra: "Om Shram Shreem Shroum Sah Chandraya Namah" },
    Mars: { gemstone: "Red Coral (Moonga)", metal: "Gold/Copper", finger: "Ring Finger", day: "Tuesday", rudraksha: "3 Mukhi", mantra: "Om Kram Kreem Kroum Sah Bhaumaya Namah" },
    Mercury: { gemstone: "Emerald (Panna)", metal: "Gold", finger: "Little Finger", day: "Wednesday", rudraksha: "4 Mukhi", mantra: "Om Bram Breem Broum Sah Budhaya Namah" },
    Jupiter: { gemstone: "Yellow Sapphire (Pukhraj)", metal: "Gold", finger: "Index Finger", day: "Thursday", rudraksha: "5 Mukhi", mantra: "Om Gram Greem Groum Sah Gurave Namah" },
    Venus: { gemstone: "White Sapphire / Opal", metal: "Silver/Platinum", finger: "Middle Finger", day: "Friday", rudraksha: "6 Mukhi", mantra: "Om Dram Dreem Droum Sah Shukraya Namah" },
    Saturn: { gemstone: "Blue Sapphire (Neelam)", metal: "Panchdhatu", finger: "Middle Finger", day: "Saturday", rudraksha: "7 or 14 Mukhi", mantra: "Om Pram Preem Proum Sah Shanaischaraya Namah" },
  };
  const l1 = RASHI_LORDS[ascRashiIndex];
  const l5 = RASHI_LORDS[(ascRashiIndex + 4) % 12];
  const l9 = RASHI_LORDS[(ascRashiIndex + 8) % 12];
  return [
    { role: `Life Stone (1st Lord — ${l1})`, ...MAP[l1] },
    { role: `Intelligence Stone (5th Lord — ${l5})`, ...MAP[l5] },
    { role: `Fortune Stone (9th Lord — ${l9})`, ...MAP[l9] },
  ];
}

export function computePanchang(utcDate: Date, sunLon: number, moonLon: number, moonRashiIdx: number, moonHouse: number) {
  const TITHIS = ["Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima/Amavasya"];
  const YOGAS = ["Vishkumbha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma", "Dhriti", "Shula", "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra", "Siddhi", "Vyatipata", "Variyan", "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti"];
  const VARAS = ["Ravivara (Sun)", "Somavara (Mon)", "Mangalavara (Tue)", "Budhavara (Wed)", "Guruvara (Thu)", "Shukravara (Fri)", "Shanivara (Sat)"];
  const elong = normalizeDeg(moonLon - sunLon);
  const tIdx = Math.floor(elong / 12);
  const nakSpan = 360 / 27;
  const nakIdx = Math.floor(moonLon / nakSpan);
  const pada = Math.floor((moonLon % nakSpan) / (nakSpan / 4)) + 1;
  const kIdx = Math.floor(elong / 6);
  const movK = ["Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti"];
  return {
    vara: VARAS[utcDate.getUTCDay()],
    tithi: `${tIdx < 15 ? "Shukla" : "Krishna"} ${TITHIS[tIdx % 15]}`,
    nakshatra: NAKSHATRA_NAMES[nakIdx],
    nakshatraIndex: nakIdx,
    pada,
    yoga: YOGAS[Math.floor(normalizeDeg(sunLon + moonLon) / nakSpan)],
    karana: kIdx === 0 ? "Kimstughna" : kIdx >= 57 ? "Shakuni" : movK[(kIdx - 1) % 7],
    paya: [1, 6, 11].includes(moonHouse) ? "Swarna (Gold)" : [2, 5, 9].includes(moonHouse) ? "Rajata (Silver)" : [3, 7, 10].includes(moonHouse) ? "Tamra (Copper)" : "Loha (Iron)",
    gana: [0, 4, 6, 7, 12, 14, 16, 21, 26].includes(nakIdx) ? "Deva (Divine)" : [1, 3, 5, 10, 11, 19, 20, 24, 25].includes(nakIdx) ? "Manushya (Human)" : "Rakshasa (Intense)",
    nadi: [0, 5, 6, 11, 12, 17, 18, 23, 24].includes(nakIdx) ? "Adi (Vata)" : [1, 4, 7, 10, 13, 16, 19, 22, 25].includes(nakIdx) ? "Madhya (Pitta)" : "Antya (Kapha)",
    varna: ["Kshatriya", "Vaishya", "Shudra", "Brahmin"][moonRashiIdx % 4],
  };
}

export function computeVimshottariDasha(utcBirthDate: Date, moonSiderealLon: number) {
  const nakSpan = 360 / 27;
  const nakIdx = Math.floor(moonSiderealLon / nakSpan);
  const rem = 1.0 - (moonSiderealLon % nakSpan) / nakSpan;
  const startSeq = nakIdx % 9;
  const YR_MS = 365.2425 * 86400000;
  const nowMs = Date.now();
  let cur = utcBirthDate.getTime();
  return Array.from({ length: 9 }, (_, i) => {
    const seqIdx = (startSeq + i) % 9;
    const { lord, years } = VIMSHOTTARI_SEQ[seqIdx];
    const fullMs = years * YR_MS;
    const startMs = i === 0 ? utcBirthDate.getTime() : cur;
    const endMs = startMs + (i === 0 ? fullMs * rem : fullMs);
    cur = endMs;
    let aCur = endMs - fullMs;
    const antardashas = VIMSHOTTARI_SEQ.map((_, j) => {
      const aLord = VIMSHOTTARI_SEQ[(seqIdx + j) % 9];
      const aStart = aCur;
      const aEnd = aStart + ((years * aLord.years) / 120.0) * YR_MS;
      aCur = aEnd;
      return { lord: `${lord} – ${aLord.lord}`, startDate: new Date(Math.max(aStart, utcBirthDate.getTime())).toISOString().split("T")[0], endDate: new Date(aEnd).toISOString().split("T")[0], isCurrent: nowMs >= aStart && nowMs < aEnd, valid: aEnd > utcBirthDate.getTime() };
    }).filter((a) => a.valid);
    return { lord, years, startDate: new Date(startMs).toISOString().split("T")[0], endDate: new Date(endMs).toISOString().split("T")[0], isCurrent: nowMs >= startMs && nowMs < endMs, antardashas };
  });
}

export function evaluateYogas(ascRashiIdx: number, planets: { key: string; rashiIndex: number; house: number; dignity: string }[]) {
  const byKey = Object.fromEntries(planets.map((p) => [p.key, p]));
  const kendras = [1, 4, 7, 10];
  const isStrong = (d: string) => d.includes("Exalted") || d.includes("Mool") || d.includes("Own");
  const yogas: { name: string; category: string; badge: string; description: string }[] = [];
  if (kendras.includes(((byKey.Jupiter.rashiIndex - byKey.Moon.rashiIndex + 12) % 12) + 1)) {
    yogas.push({ name: "Gajakesari Yoga", category: "Dhana & Fame Yoga", badge: "Auspicious", description: "Jupiter in Kendra from Moon grants wisdom, noble reputation, and lasting prosperity." });
  }
  if (byKey.Sun.rashiIndex === byKey.Mercury.rashiIndex) {
    yogas.push({ name: "Budhaditya Nipuna Yoga", category: "Jnana Yoga", badge: "Auspicious", description: "Sun-Mercury conjunction bestows sharp intellect, communication mastery, and respect." });
  }
  const manglik = [1, 2, 4, 7, 8, 12].includes(byKey.Mars.house);
  const cancelled = isStrong(byKey.Mars.dignity) || [3, 4].includes(ascRashiIdx) || byKey.Mars.rashiIndex === byKey.Jupiter.rashiIndex;
  yogas.push({
    name: !manglik ? "Non-Manglik Chart" : cancelled ? "Mangal Dosha (Cancelled / Parihara)" : "Mangal Dosha (Kuja Dosha)",
    category: "Marital Check",
    badge: !manglik ? "Clear" : cancelled ? "Cancelled" : "Remedy Advised",
    description: !manglik ? `Mars in House ${byKey.Mars.house} renders the chart free from Mangal Dosha.` : `Mars in House ${byKey.Mars.house} (${cancelled ? "Mitigated by Parashari Parihara" : "Verify Ashtakoot & Manglik compatibility"}).`,
  });
  return yogas;
}

export function calculateEnterpriseKundali(data: { name: string; gender: string; dob: string; tob: string; lat: number; lon: number; timezone: string; ayanamshaSystem?: AyanamshaSystem }) {
  const system: AyanamshaSystem = data.ayanamshaSystem || "LAHIRI";
  const utcDate = parseBirthDateTimeToUTC(data.dob, data.tob, data.timezone || "Asia/Kolkata");
  const jd = getJulianDay(utcDate);
  const ayanamsha = getAyanamsha(jd, system);
  const { ascendantSidereal, mcSidereal } = getSiderealAngles(jd, data.lat, data.lon, ayanamsha);
  const ascRashiIndex = Math.floor(ascendantSidereal / 30);
  const ascNavamshaIndex = getVargaRashiIndex(ascendantSidereal, 9);
  const ascDashamshaIndex = getVargaRashiIndex(ascendantSidereal, 10);
  const bodies = [
    ["Sun", "Sun (Surya)"], ["Moon", "Moon (Chandra)"], ["Mars", "Mars (Mangal)"],
    ["Mercury", "Mercury (Budha)"], ["Jupiter", "Jupiter (Guru)"], ["Venus", "Venus (Shukra)"],
    ["Saturn", "Saturn (Shani)"], ["Rahu", "Rahu (North Node)"], ["Ketu", "Ketu (South Node)"],
  ];
  const rahuTrop = getTropicalEclipticLongitude("Rahu", jd);
  const sunSid = normalizeDeg(getTropicalEclipticLongitude("Sun", jd) - ayanamsha);
  const rawPlanets = bodies.map(([key, label]) => {
    const trop = key === "Rahu" ? rahuTrop : key === "Ketu" ? normalizeDeg(rahuTrop + 180) : getTropicalEclipticLongitude(key, jd);
    const siderealLon = normalizeDeg(trop - ayanamsha);
    const rashiIndex = Math.floor(siderealLon / 30);
    const degInSign = siderealLon % 30;
    const nakIndex = Math.floor(siderealLon / (360 / 27));
    const pada = Math.floor((siderealLon % (360 / 27)) / (360 / 108)) + 1;
    const isRetrograde = key === "Rahu" || key === "Ketu" ? true : getPlanetDailySpeed(key, jd) < 0;
    const navIdx = getVargaRashiIndex(siderealLon, 9);
    const dashIdx = getVargaRashiIndex(siderealLon, 10);
    return {
      key, name: label, siderealLon: Number(siderealLon.toFixed(4)), degInSign, rashiIndex,
      rasi: RASHI_NAMES[rashiIndex], rasiLord: RASHI_LORDS[rashiIndex], degreeFormatted: formatDMS(degInSign),
      nakshatra: NAKSHATRA_NAMES[nakIndex], nakshatraLord: NAKSHATRA_LORDS[nakIndex], pada,
      house: ((rashiIndex - ascRashiIndex + 12) % 12) + 1,
      navamshaRashiIndex: navIdx, navamshaRasi: RASHI_NAMES[navIdx], navamshaHouse: ((navIdx - ascNavamshaIndex + 12) % 12) + 1,
      dashamshaRashiIndex: dashIdx, dashamshaRasi: RASHI_NAMES[dashIdx], dashamshaHouse: ((dashIdx - ascDashamshaIndex + 12) % 12) + 1,
      vargas: {
        D1: RASHI_NAMES[rashiIndex], D2: RASHI_NAMES[getVargaRashiIndex(siderealLon, 2)],
        D3: RASHI_NAMES[getVargaRashiIndex(siderealLon, 3)], D4: RASHI_NAMES[getVargaRashiIndex(siderealLon, 4)],
        D7: RASHI_NAMES[getVargaRashiIndex(siderealLon, 7)], D9: RASHI_NAMES[navIdx],
        D10: RASHI_NAMES[dashIdx], D12: RASHI_NAMES[getVargaRashiIndex(siderealLon, 12)],
      },
      isRetrograde, isCombust: isPlanetCombust(key, siderealLon, sunSid, isRetrograde),
      dignity: getPlanetaryDignity(key, rashiIndex, degInSign), avastha: getBaladiAvastha(rashiIndex, degInSign),
    };
  });
  const jMap = computeJaiminiKarakas(rawPlanets);
  const planets = rawPlanets.map((p) => ({ ...p, charaKaraka: jMap[p.key] || "—" }));
  const moon = planets[1];
  return {
    meta: { name: data.name, gender: data.gender, dob: data.dob, tob: data.tob, timezone: data.timezone || "Asia/Kolkata", ayanamshaName: system, ayanamshaValue: formatDMS(ayanamsha) },
    ascendant: { rashiIndex: ascRashiIndex, rasi: RASHI_NAMES[ascRashiIndex], rasiLord: RASHI_LORDS[ascRashiIndex], degreeFormatted: formatDMS(ascendantSidereal % 30), nakshatra: NAKSHATRA_NAMES[Math.floor(ascendantSidereal / (360 / 27))], nakshatraLord: NAKSHATRA_LORDS[Math.floor(ascendantSidereal / (360 / 27))], pada: Math.floor((ascendantSidereal % (360 / 27)) / (360 / 108)) + 1, navamshaRashiIndex: ascNavamshaIndex, navamshaRasi: RASHI_NAMES[ascNavamshaIndex], dashamshaRashiIndex: ascDashamshaIndex, dashamshaRasi: RASHI_NAMES[ascDashamshaIndex], mcRasi: RASHI_NAMES[Math.floor(mcSidereal / 30)] },
    panchang: computePanchang(utcDate, sunSid, moon.siderealLon, moon.rashiIndex, moon.house),
    planets, vimshottari: computeVimshottariDasha(utcDate, moon.siderealLon),
    yogas: evaluateYogas(ascRashiIndex, planets), shadbala: computeShadbalaSummary(planets),
    ashtakavarga: computeSarvashtakavarga(ascRashiIndex, planets), remedies: computeVedicRemedies(ascRashiIndex),
  };
}

export function calculateEnterpriseCompatibility(data: {
  boy: { name: string; dob: string; tob: string; lat: number; lon: number; timezone: string };
  girl: { name: string; dob: string; tob: string; lat: number; lon: number; timezone: string };
}) {
  const boyChart = calculateEnterpriseKundali({ ...data.boy, gender: "male" });
  const girlChart = calculateEnterpriseKundali({ ...data.girl, gender: "female" });
  const bM = boyChart.planets[1], gM = girlChart.planets[1];
  const bNak = boyChart.panchang.nakshatraIndex, gNak = girlChart.panchang.nakshatraIndex;
  const vRank: Record<string, number> = { Brahmin: 4, Kshatriya: 3, Vaishya: 2, Shudra: 1 };
  const varnaScore = (vRank[boyChart.panchang.varna] || 2) >= (vRank[girlChart.panchang.varna] || 2) ? 1 : 0;
  const vashyaScore = bM.rashiIndex === gM.rashiIndex ? 2 : Math.abs(bM.rashiIndex - gM.rashiIndex) % 2 === 0 ? 1.5 : 1;
  const badT = [3, 5, 7];
  const taraScore = !badT.includes(((gNak - bNak + 27) % 27) % 9) && !badT.includes(((bNak - gNak + 27) % 27) % 9) ? 3 : 1.5;
  const yDiff = Math.abs((bNak % 14) - (gNak % 14));
  const yoniScore = yDiff === 0 ? 4 : yDiff <= 3 ? 3 : yDiff <= 7 ? 2 : 1;
  const ben = new Set(["Moon", "Mercury", "Jupiter", "Venus"]);
  const grahaMaitriScore = bM.rasiLord === gM.rasiLord ? 5 : ben.has(bM.rasiLord) === ben.has(gM.rasiLord) ? 4 : 2.5;
  const ganaScore = boyChart.panchang.gana === girlChart.panchang.gana ? 6 : 4;
  const bhakootScore = ![2, 12, 6, 8].includes(((bM.rashiIndex - gM.rashiIndex + 12) % 12) + 1) ? 7 : 0;
  const nadiScore = boyChart.panchang.nadi !== girlChart.panchang.nadi ? 8 : 0;
  const score = Number((varnaScore + vashyaScore + taraScore + yoniScore + grahaMaitriScore + ganaScore + bhakootScore + nadiScore).toFixed(1));
  const bMang = [1, 2, 4, 7, 8, 12].includes(boyChart.planets[2].house);
  const gMang = [1, 2, 4, 7, 8, 12].includes(girlChart.planets[2].house);
  return {
    score, maxScore: 36,
    status: score >= 28 ? "Excellent (Uttam Milan)" : score >= 21 ? "Very Good (Shubh Milan)" : score >= 18 ? "Acceptable (Madhyam)" : "Remedy Advised",
    recommendation: `Ashtakoot score is ${score}/36 between ${bM.rasi} and ${gM.rasi}. ${bMang === gMang ? "Manglik status is balanced." : "Consult Acharya Shri Ravindra Shukla Shatri for Manglik Parihara."}`,
    boyChartData: { ascendantRashiIndex: boyChart.ascendant.rashiIndex, ascendantRasi: boyChart.ascendant.rasi, planets: boyChart.planets },
    girlChartData: { ascendantRashiIndex: girlChart.ascendant.rashiIndex, ascendantRasi: girlChart.ascendant.rasi, planets: girlChart.planets },
    boySummary: { name: data.boy.name, ascendant: boyChart.ascendant.rasi, moonSign: bM.rasi, nakshatra: boyChart.panchang.nakshatra, nadi: boyChart.panchang.nadi, manglik: bMang ? "Manglik" : "Non-Manglik" },
    girlSummary: { name: data.girl.name, ascendant: girlChart.ascendant.rasi, moonSign: gM.rasi, nakshatra: girlChart.panchang.nakshatra, nadi: girlChart.panchang.nadi, manglik: gMang ? "Manglik" : "Non-Manglik" },
    breakdown: [
      { name: "Varna", score: varnaScore, max: 1, description: "Spiritual compatibility" },
      { name: "Vashya", score: vashyaScore, max: 2, description: "Mutual attraction" },
      { name: "Tara", score: taraScore, max: 3, description: "Nakshatra destiny harmony" },
      { name: "Yoni", score: yoniScore, max: 4, description: "Intimate compatibility" },
      { name: "Graha Maitri", score: grahaMaitriScore, max: 5, description: "Mental affinity" },
      { name: "Gana", score: ganaScore, max: 6, description: "Temperament match" },
      { name: "Bhakoot", score: bhakootScore, max: 7, description: "Family & prosperity" },
      { name: "Nadi", score: nadiScore, max: 8, description: "Vitality & health" },
    ],
  };
}
// END OF ASTROLOGY.TS
