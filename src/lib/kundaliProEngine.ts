import * as Astronomy from "astronomy-engine";
import { getLahiriAyanamsha, RASHIS } from "./panchangEngine";

const D2R = Math.PI / 180;
const R2D = 180 / Math.PI;
const norm360 = (d: number) => ((d % 360) + 360) % 360;

export interface ProPlanet {
  key: "Sun" | "Moon" | "Mars" | "Mercury" | "Jupiter" | "Venus" | "Saturn" | "Rahu" | "Ketu";
  nameEn: string;
  nameHi: string;
  lon: number;
  rashiIdx: number;
  degInSign: number;
  rashiHouse: number;
  bhavaHouse: number;
  shifted: boolean;
  nakshatraIdx: number;
  pada: number;
  isRetrograde: boolean;
  isCombust: boolean;
  isVargottama: boolean;
  vargas: Record<VargaKey, number>;
}

export type VargaKey =
  | "D1" | "D2" | "D3" | "D4" | "D7" | "D9" | "D10" | "D12"
  | "D16" | "D20" | "D24" | "D27" | "D30" | "D40" | "D45" | "D60";

export const SHODASHVARGA_KEYS: { key: VargaKey; labelEn: string; labelHi: string }[] = [
  { key: "D1", labelEn: "D-1 Rashi", labelHi: "D-1 लग्न" },
  { key: "D2", labelEn: "D-2 Hora", labelHi: "D-2 होरा" },
  { key: "D3", labelEn: "D-3 Drekkana", labelHi: "D-3 द्रेष्काण" },
  { key: "D4", labelEn: "D-4 Chaturthamsha", labelHi: "D-4 चतुर्थांश" },
  { key: "D7", labelEn: "D-7 Saptamsha", labelHi: "D-7 सप्तमांश" },
  { key: "D9", labelEn: "D-9 Navamsha", labelHi: "D-9 नवमांश" },
  { key: "D10", labelEn: "D-10 Dashamsha", labelHi: "D-10 दशमांश" },
  { key: "D12", labelEn: "D-12 Dwadashamsha", labelHi: "D-12 द्वादशांश" },
  { key: "D16", labelEn: "D-16 Shodashamsha", labelHi: "D-16 षोडशांश" },
  { key: "D20", labelEn: "D-20 Vimshamsha", labelHi: "D-20 विंशांश" },
  { key: "D24", labelEn: "D-24 Chaturvimsha", labelHi: "D-24 चतुर्विंशांश" },
  { key: "D27", labelEn: "D-27 Saptavimsha", labelHi: "D-27 सप्तविंशांश" },
  { key: "D30", labelEn: "D-30 Trimshamsha", labelHi: "D-30 त्रिंशांश" },
  { key: "D40", labelEn: "D-40 Khavedamsha", labelHi: "D-40 खवेदांश" },
  { key: "D45", labelEn: "D-45 Akshavedamsha", labelHi: "D-45 अक्षवेदांश" },
  { key: "D60", labelEn: "D-60 Shashtiamsha", labelHi: "D-60 षष्ट्यंश" },
];

export interface BhavaCusp {
  house: number;
  startLon: number;
  midLon: number;
  endLon: number;
  rashiIdx: number;
}

export interface PratyantardashaItem {
  lordEn: string;
  lordHi: string;
  startDate: string;
  endDate: string;
}

export interface AntardashaItem {
  lordEn: string;
  lordHi: string;
  startDate: string;
  endDate: string;
  pratyantardashas: PratyantardashaItem[];
}

export interface MahadashaItem {
  lordEn: string;
  lordHi: string;
  years: number;
  startDate: string;
  endDate: string;
  antardashas: AntardashaItem[];
}

export interface ProKundaliResult {
  ayanamsha: number;
  lagnaLon: number;
  lagnaRashiIdx: number;
  mcLon: number;
  planets: ProPlanet[];
  bhavas: BhavaCusp[];
  bav: Record<"Sun" | "Moon" | "Mars" | "Mercury" | "Jupiter" | "Venus" | "Saturn", number[]>;
  sav: number[];
  savTotal: number;
  dashas: MahadashaItem[];
}

// Classical Brihat Parashara Hora Shastra 16 Shodashvarga formulas
export function computeVargaSign(lon: number, key: VargaKey): number {
  const s = Math.floor(lon / 30); // 0..11
  const deg = lon % 30;
  const isOdd = s % 2 === 0; // Aries=0 is odd sign (1st)
  const mod = (n: number) => ((n % 12) + 12) % 12;

  switch (key) {
    case "D1": return s;
    case "D2": return isOdd ? (deg < 15 ? 4 : 3) : (deg < 15 ? 3 : 4); // Leo / Cancer Hora
    case "D3": return mod(s + Math.floor(deg / 10) * 4);
    case "D4": return mod(s + Math.floor(deg / 7.5) * 3);
    case "D7": return mod((isOdd ? s : s + 6) + Math.floor(deg / (30 / 7)));
    case "D9": return Math.floor(lon / (30 / 9)) % 12;
    case "D10": return mod((isOdd ? s : s + 8) + Math.floor(deg / 3));
    case "D12": return mod(s + Math.floor(deg / 2.5));
    case "D16": {
      const start = s % 3 === 0 ? 0 : s % 3 === 1 ? 4 : 8; // Movable->Ar, Fixed->Le, Dual->Sg
      return mod(start + Math.floor(deg / (30 / 16)));
    }
    case "D20": {
      const start = s % 3 === 0 ? 0 : s % 3 === 1 ? 8 : 4; // Movable->Ar, Fixed->Sg, Dual->Le
      return mod(start + Math.floor(deg / 1.5));
    }
    case "D24": return mod((isOdd ? 4 : 3) + Math.floor(deg / 1.25));
    case "D27": {
      const start = s % 4 === 0 ? 0 : s % 4 === 1 ? 3 : s % 4 === 2 ? 6 : 9;
      return mod(start + Math.floor(deg / (30 / 27)));
    }
    case "D30": {
      if (isOdd) {
        if (deg < 5) return 0; // Mars
        if (deg < 10) return 10; // Saturn
        if (deg < 18) return 8; // Jupiter
        if (deg < 25) return 2; // Mercury
        return 6; // Venus
      }
      if (deg < 5) return 1; // Venus
      if (deg < 12) return 5; // Mercury
      if (deg < 20) return 11; // Jupiter
      if (deg < 25) return 9; // Saturn
      return 7; // Mars
    }
    case "D40": return mod((isOdd ? 0 : 6) + Math.floor(deg / 0.75));
    case "D45": {
      const start = s % 3 === 0 ? 0 : s % 3 === 1 ? 4 : 8;
      return mod(start + Math.floor(deg / (30 / 45)));
    }
    case "D60": return mod(s + Math.floor(deg / 0.5));
  }
}

// Classical Parashari 337-Bindu Ashtakavarga Contributor Tables (1-indexed house offsets)
const ASHTAKA_RULES: Record<"Sun" | "Moon" | "Mars" | "Mercury" | "Jupiter" | "Venus" | "Saturn", number[][]> = {
  // Contributors order: [Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Lagna]
  Sun: [
    [1,2,4,7,8,9,10,11], [3,6,10,11], [1,2,4,7,8,9,10,11], [3,5,6,9,10,11,12],
    [5,6,9,11], [6,7,12], [1,2,4,7,8,9,10,11], [3,4,6,10,11,12],
  ],
  Moon: [
    [3,6,7,8,10,11], [1,3,6,7,10,11], [2,3,5,6,9,10,11], [1,3,4,5,7,8,10,11],
    [1,4,7,8,10,11,12], [3,4,5,7,9,10,11], [3,5,6,11], [3,6,10,11],
  ],
  Mars: [
    [3,5,6,10,11], [3,6,11], [1,2,4,7,8,10,11], [3,5,6,11],
    [6,10,11,12], [6,8,11,12], [1,4,7,8,9,10,11], [1,3,6,10,11],
  ],
  Mercury: [
    [5,6,9,11,12], [2,4,6,8,10,11], [1,2,4,7,8,9,10,11], [1,3,5,6,9,10,11,12],
    [6,8,11,12], [1,2,3,4,5,8,9,11], [1,2,4,7,8,9,10,11], [1,2,4,6,8,10,11],
  ],
  Jupiter: [
    [1,2,3,4,7,8,9,10,11], [2,5,7,9,11], [1,2,4,7,8,10,11], [1,2,4,5,6,9,10,11],
    [1,2,3,4,7,8,10,11], [2,5,6,9,10,11], [3,5,6,12], [1,2,4,5,6,7,9,10,11],
  ],
  Venus: [
    [8,11,12], [1,2,3,4,5,8,9,11,12], [3,5,6,9,11,12], [3,5,6,9,11],
    [5,8,9,10,11], [1,2,3,4,5,8,9,10,11], [3,4,5,8,9,10,11], [1,2,3,4,5,8,9,11],
  ],
  Saturn: [
    [1,2,4,7,8,10,11], [3,6,11], [3,5,6,10,11,12], [6,8,9,10,11,12],
    [5,6,11,12], [6,11,12], [3,5,6,11], [1,3,4,6,10,11],
  ],
};

const DASHA_LORDS = [
  { en: "Ketu", hi: "केतु", years: 7 },
  { en: "Venus", hi: "शुक्र", years: 20 },
  { en: "Sun", hi: "सूर्य", years: 6 },
  { en: "Moon", hi: "चन्द्र", years: 10 },
  { en: "Mars", hi: "मंगल", years: 7 },
  { en: "Rahu", hi: "राहु", years: 18 },
  { en: "Jupiter", hi: "गुरु", years: 16 },
  { en: "Saturn", hi: "शनि", years: 19 },
  { en: "Mercury", hi: "बुध", years: 17 },
];

const COMBUST_ORB: Record<string, number> = {
  Moon: 12, Mars: 17, Mercury: 14, Jupiter: 11, Venus: 10, Saturn: 15,
};

function getSiderealBodyLon(body: Astronomy.Body, date: Date, ayanamsha: number): number {
  if (body === Astronomy.Body.Sun) return norm360(Astronomy.SunPosition(date).elon - ayanamsha);
  if (body === Astronomy.Body.Moon) return norm360(Astronomy.EclipticGeoMoon(date).lon - ayanamsha);
  const vec = Astronomy.GeoVector(body, date, true);
  return norm360(Astronomy.Ecliptic(vec).elon - ayanamsha);
}

function getTrueRahuSidereal(date: Date, ayanamsha: number): number {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525.0;
  const meanNode = norm360(125.04452 - 1934.136261 * T + 0.0020708 * T * T);
  const D = norm360(297.8501921 + 445267.1114034 * T);
  const F = norm360(93.2720950 + 483202.0175233 * T);
  const trueNode = norm360(meanNode - 1.4979 * Math.sin(2 * (D - F) * D2R));
  return norm360(trueNode - ayanamsha);
}

// Compute Apparent Lagna & Midheaven (MC) + Sripati Bhava Chalit Cusps
function computeSripatiBhavas(date: Date, lat: number, lon: number, ayanamsha: number) {
  const gastHours = Astronomy.SiderealTime(date);
  const lstDeg = norm360(gastHours * 15 + lon);
  const jd = date.getTime() / 86400000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525.0;
  const eps = (23.439291 - 0.0130042 * T) * D2R;
  const ramc = lstDeg * D2R;
  const latR = lat * D2R;

  const mcTrop = norm360(Math.atan2(Math.sin(ramc), Math.cos(ramc) * Math.cos(eps)) * R2D);
  const ascTrop = norm360(
    Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(latR) * Math.sin(eps))) * R2D
  );

  const lagnaLon = norm360(ascTrop - ayanamsha);
  const mcLon = norm360(mcTrop - ayanamsha);
  const icLon = norm360(mcLon + 180);
  const descLon = norm360(lagnaLon + 180);

  // Sripati Porphyry trisection of the 4 quadrants
  const arc = (a: number, b: number) => norm360(b - a);
  const q1 = arc(lagnaLon, icLon) / 3;
  const q2 = arc(icLon, descLon) / 3;
  const q3 = arc(descLon, mcLon) / 3;
  const q4 = arc(mcLon, lagnaLon) / 3;

  const mids = [
    lagnaLon,
    norm360(lagnaLon + q1),
    norm360(lagnaLon + 2 * q1),
    icLon,
    norm360(icLon + q2),
    norm360(icLon + 2 * q2),
    descLon,
    norm360(descLon + q3),
    norm360(descLon + 2 * q3),
    mcLon,
    norm360(mcLon + q4),
    norm360(mcLon + 2 * q4),
  ];

  const bhavas: BhavaCusp[] = mids.map((midLon, i) => {
    const prevMid = mids[(i + 11) % 12];
    const nextMid = mids[(i + 1) % 12];
    const startLon = norm360(prevMid + arc(prevMid, midLon) / 2);
    const endLon = norm360(midLon + arc(midLon, nextMid) / 2);
    return { house: i + 1, startLon, midLon, endLon, rashiIdx: Math.floor(midLon / 30) };
  });

  return { lagnaLon, mcLon, bhavas };
}

function findBhavaHouse(lon: number, bhavas: BhavaCusp[]): number {
  for (const b of bhavas) {
    if (b.startLon <= b.endLon) {
      if (lon >= b.startLon && lon < b.endLon) return b.house;
    } else {
      if (lon >= b.startLon || lon < b.endLon) return b.house;
    }
  }
  return 1;
}

function computeThreeLevelDasha(birthDate: Date, moonLon: number): MahadashaItem[] {
  const nakSpan = 360 / 27;
  const nakIdx = Math.floor(moonLon / nakSpan);
  const fracRemaining = 1 - (moonLon % nakSpan) / nakSpan;
  const startLordIdx = nakIdx % 9;
  const yearMs = 365.2425 * 86400000;
  const fmt = (ms: number) => new Date(ms).toISOString().slice(0, 10);

  let cursor = birthDate.getTime() - (1 - fracRemaining) * DASHA_LORDS[startLordIdx].years * yearMs;
  const dashas: MahadashaItem[] = [];

  for (let i = 0; i < 9; i++) {
    const mdLord = DASHA_LORDS[(startLordIdx + i) % 9];
    const mdStart = cursor;
    const mdDur = mdLord.years * yearMs;
    const mdEnd = mdStart + mdDur;

    let adCursor = mdStart;
    const antardashas: AntardashaItem[] = [];
    for (let j = 0; j < 9; j++) {
      const adLord = DASHA_LORDS[(startLordIdx + i + j) % 9];
      const adDur = (mdDur * adLord.years) / 120;
      const adEnd = adCursor + adDur;

      let pdCursor = adCursor;
      const pratyantardashas: PratyantardashaItem[] = [];
      for (let k = 0; k < 9; k++) {
        const pdLord = DASHA_LORDS[(startLordIdx + i + j + k) % 9];
        const pdDur = (adDur * pdLord.years) / 120;
        const pdEnd = pdCursor + pdDur;
        pratyantardashas.push({
          lordEn: pdLord.en,
          lordHi: pdLord.hi,
          startDate: fmt(pdCursor),
          endDate: fmt(pdEnd),
        });
        pdCursor = pdEnd;
      }

      antardashas.push({
        lordEn: adLord.en,
        lordHi: adLord.hi,
        startDate: fmt(adCursor),
        endDate: fmt(adEnd),
        pratyantardashas,
      });
      adCursor = adEnd;
    }

    dashas.push({
      lordEn: mdLord.en,
      lordHi: mdLord.hi,
      years: mdLord.years,
      startDate: fmt(Math.max(mdStart, birthDate.getTime())),
      endDate: fmt(mdEnd),
      antardashas,
    });
    cursor = mdEnd;
  }

  return dashas;
}

export function calculateProKundali(input: {
  dateStr: string;
  timeStr: string;
  lat: number;
  lon: number;
  utcOffsetMin: number;
}): ProKundaliResult {
  const [y, m, d] = input.dateStr.split("-").map(Number);
  const [hh, mm] = input.timeStr.split(":").map(Number);
  const utcMs = Date.UTC(y, m - 1, d, hh, mm, 0) - input.utcOffsetMin * 60000;
  const date = new Date(utcMs);
  const datePlus1h = new Date(utcMs + 3600000);

  const ayanamsha = getLahiriAyanamsha(date);
  const { lagnaLon, mcLon, bhavas } = computeSripatiBhavas(date, input.lat, input.lon, ayanamsha);
  const lagnaRashiIdx = Math.floor(lagnaLon / 30);

  const defs: { key: ProPlanet["key"]; en: string; hi: string; body?: Astronomy.Body }[] = [
    { key: "Sun", en: "Sun", hi: "सूर्य", body: Astronomy.Body.Sun },
    { key: "Moon", en: "Moon", hi: "चन्द्र", body: Astronomy.Body.Moon },
    { key: "Mars", en: "Mars", hi: "मंगल", body: Astronomy.Body.Mars },
    { key: "Mercury", en: "Mercury", hi: "बुध", body: Astronomy.Body.Mercury },
    { key: "Jupiter", en: "Jupiter", hi: "गुरु", body: Astronomy.Body.Jupiter },
    { key: "Venus", en: "Venus", hi: "शुक्र", body: Astronomy.Body.Venus },
    { key: "Saturn", en: "Saturn", hi: "शनि", body: Astronomy.Body.Saturn },
    { key: "Rahu", en: "Rahu", hi: "राहु" },
    { key: "Ketu", en: "Ketu", hi: "केतु" },
  ];

  const sunLon = getSiderealBodyLon(Astronomy.Body.Sun, date, ayanamsha);
  const rahuLon = getTrueRahuSidereal(date, ayanamsha);

  const planets: ProPlanet[] = defs.map((def) => {
    let lon = 0;
    let isRetrograde = false;

    if (def.body !== undefined) {
      lon = getSiderealBodyLon(def.body, date, ayanamsha);
      const lonNext = getSiderealBodyLon(def.body, datePlus1h, ayanamsha);
      const diff = ((lonNext - lon + 540) % 360) - 180;
      isRetrograde = def.key !== "Sun" && def.key !== "Moon" && diff < 0;
    } else if (def.key === "Rahu") {
      lon = rahuLon;
      isRetrograde = true;
    } else {
      lon = norm360(rahuLon + 180);
      isRetrograde = true;
    }

    const rashiIdx = Math.floor(lon / 30);
    const rashiHouse = ((rashiIdx - lagnaRashiIdx + 12) % 12) + 1;
    const bhavaHouse = findBhavaHouse(lon, bhavas);
    const nakshatraIdx = Math.floor(lon / (360 / 27));
    const pada = Math.floor((lon % (360 / 27)) / (360 / 108)) + 1;

    const sunSep = Math.min(norm360(lon - sunLon), norm360(sunLon - lon));
    const isCombust = def.key in COMBUST_ORB ? sunSep <= COMBUST_ORB[def.key] : false;

    const vargas = {} as Record<VargaKey, number>;
    for (const v of SHODASHVARGA_KEYS) {
      vargas[v.key] = computeVargaSign(lon, v.key);
    }

    return {
      key: def.key,
      nameEn: def.en,
      nameHi: def.hi,
      lon,
      rashiIdx,
      degInSign: lon % 30,
      rashiHouse,
      bhavaHouse,
      shifted: rashiHouse !== bhavaHouse,
      nakshatraIdx,
      pada,
      isRetrograde,
      isCombust,
      isVargottama: vargas.D1 === vargas.D9,
      vargas,
    };
  });

  // Exact 337-Bindu Bhinna & Sarvashtakavarga
  const contributorSigns = [
    planets[0].rashiIdx, planets[1].rashiIdx, planets[2].rashiIdx, planets[3].rashiIdx,
    planets[4].rashiIdx, planets[5].rashiIdx, planets[6].rashiIdx, lagnaRashiIdx,
  ];
  const bav = {} as ProKundaliResult["bav"];
  const sav = new Array(12).fill(0);

  (["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"] as const).forEach((pKey) => {
    const row = new Array(12).fill(0);
    ASHTAKA_RULES[pKey].forEach((offsets, cIdx) => {
      const baseSign = contributorSigns[cIdx];
      offsets.forEach((h) => {
        const targetSign = (baseSign + h - 1) % 12;
        row[targetSign] += 1;
        sav[targetSign] += 1;
      });
    });
    bav[pKey] = row;
  });

  const savTotal = sav.reduce((a, b) => a + b, 0);
  const dashas = computeThreeLevelDasha(date, planets[1].lon);

  return {
    ayanamsha,
    lagnaLon,
    lagnaRashiIdx,
    mcLon,
    planets,
    bhavas,
    bav,
    sav,
    savTotal,
    dashas,
  };
}

export { RASHIS };
// END OF FILE
