"use server";

import { generateKundali } from "./kundali";

export async function checkCompatibility(data: {
  boy: { name: string; dob: string; tob: string; lat: number; lon: number; timezone: string };
  girl: { name: string; dob: string; tob: string; lat: number; lon: number; timezone: string };
}) {
  const [boyChart, girlChart] = await Promise.all([
    generateKundali({ ...data.boy, gender: "male" }),
    generateKundali({ ...data.girl, gender: "female" }),
  ]);

  const boyMoon = boyChart.planets[1];
  const girlMoon = girlChart.planets[1];
  const bRashi = boyMoon.rashiIndex;
  const gRashi = girlMoon.rashiIndex;
  const bNak = boyChart.panchang.nakshatraIndex;
  const gNak = girlChart.panchang.nakshatraIndex;

  // 1. Varna Koota (Max 1)
  const varnaRank: Record<string, number> = { Brahmin: 4, Kshatriya: 3, Vaishya: 2, Shudra: 1 };
  const bVarna = varnaRank[boyChart.panchang.varna] || 2;
  const gVarna = varnaRank[girlChart.panchang.varna] || 2;
  const varnaScore = bVarna >= gVarna ? 1 : 0;

  // 2. Vashya Koota (Max 2)
  const vashyaScore = bRashi === gRashi ? 2 : Math.abs(bRashi - gRashi) % 2 === 0 ? 1.5 : 1;

  // 3. Tara Koota (Max 3)
  const bToGTara = ((gNak - bNak + 27) % 27) % 9;
  const gToBTara = ((bNak - gNak + 27) % 27) % 9;
  const badTaras = [3, 5, 7];
  const taraScore =
    !badTaras.includes(bToGTara) && !badTaras.includes(gToBTara)
      ? 3
      : !badTaras.includes(bToGTara) || !badTaras.includes(gToBTara)
      ? 1.5
      : 0;

  // 4. Yoni Koota (Max 4)
  const yoniGroup = (nak: number) => nak % 14;
  const yoniDiff = Math.abs(yoniGroup(bNak) - yoniGroup(gNak));
  const yoniScore = yoniDiff === 0 ? 4 : yoniDiff <= 3 ? 3 : yoniDiff <= 7 ? 2 : 1;

  // 5. Graha Maitri Koota (Max 5)
  const bLord = boyMoon.rasiLord;
  const gLord = girlMoon.rasiLord;
  const beneficSet = new Set(["Moon", "Mercury", "Jupiter", "Venus"]);
  const grahaMaitriScore =
    bLord === gLord
      ? 5
      : beneficSet.has(bLord) === beneficSet.has(gLord)
      ? 4
      : 2.5;

  // 6. Gana Koota (Max 6)
  const bGana = boyChart.panchang.gana;
  const gGana = girlChart.panchang.gana;
  const ganaScore =
    bGana === gGana
      ? 6
      : (bGana.startsWith("Deva") && gGana.startsWith("Manushya")) ||
        (gGana.startsWith("Deva") && bGana.startsWith("Manushya"))
      ? 5
      : 1;

  // 7. Bhakoot Koota (Max 7)
  const signDist = ((bRashi - gRashi + 12) % 12) + 1;
  const badBhakoot = [2, 12, 6, 8];
  const bhakootScore = !badBhakoot.includes(signDist) ? 7 : bLord === gLord ? 7 : 0;

  // 8. Nadi Koota (Max 8)
  const nadiScore = boyChart.panchang.nadi !== girlChart.panchang.nadi ? 8 : 0;

  const totalScore = Number(
    (varnaScore + vashyaScore + taraScore + yoniScore + grahaMaitriScore + ganaScore + bhakootScore + nadiScore).toFixed(1)
  );

  const boyMarsHouse = boyChart.planets[2].house;
  const girlMarsHouse = girlChart.planets[2].house;
  const manglikHouses = [1, 2, 4, 7, 8, 12];
  const boyManglik = manglikHouses.includes(boyMarsHouse);
  const girlManglik = manglikHouses.includes(girlMarsHouse);

  const status =
    totalScore >= 28
      ? "Excellent (Uttam Milan)"
      : totalScore >= 21
      ? "Very Good (Shubh Milan)"
      : totalScore >= 18
      ? "Acceptable (Madhyam Milan)"
      : "Requires Remedy (Adham Milan)";

  let recommendation =
    totalScore >= 18
      ? `Ashtakoot score of ${totalScore}/36 exceeds the classical 18-Guna threshold, indicating strong harmony between ${boyMoon.rasi} (${boyChart.panchang.nakshatra}) and ${girlMoon.rasi} (${girlChart.panchang.nakshatra}).`
      : `Ashtakoot score is ${totalScore}/36. Consult Acharya Shri Ravindra Shukla Shatri for Navamsha (D-9) & Dasha Sandhi remedies before finalizing marriage.`;

  if (boyManglik !== girlManglik) {
    recommendation += " Note: One partner has a Manglik placement while the other is Non-Manglik; personal Kumbh/Vishnu Vivah or Parihara verification with Acharya Ji is advised.";
  } else if (boyManglik && girlManglik) {
    recommendation += " Both charts share Manglik placement, providing mutual Mars balance.";
  }

  return {
    score: totalScore,
    maxScore: 36,
    status,
    recommendation,
    boyChartData: {
      ascendantRashiIndex: boyChart.ascendant.rashiIndex,
      ascendantRasi: boyChart.ascendant.rasi,
      planets: boyChart.planets.map((p) => ({
        key: p.key,
        rashiIndex: p.rashiIndex,
        house: p.house,
        degreeFormatted: p.degreeFormatted,
        isRetrograde: p.isRetrograde,
        isCombust: p.isCombust,
      })),
    },
    girlChartData: {
      ascendantRashiIndex: girlChart.ascendant.rashiIndex,
      ascendantRasi: girlChart.ascendant.rasi,
      planets: girlChart.planets.map((p) => ({
        key: p.key,
        rashiIndex: p.rashiIndex,
        house: p.house,
        degreeFormatted: p.degreeFormatted,
        isRetrograde: p.isRetrograde,
        isCombust: p.isCombust,
      })),
    },
    boySummary: {
      name: data.boy.name,
      ascendant: boyChart.ascendant.rasi,
      moonSign: boyMoon.rasi,
      nakshatra: `${boyChart.panchang.nakshatra} (Pada ${boyChart.panchang.pada})`,
      nadi: boyChart.panchang.nadi,
      manglik: boyManglik ? `Manglik (Mars in House ${boyMarsHouse})` : "Non-Manglik",
    },
    girlSummary: {
      name: data.girl.name,
      ascendant: girlChart.ascendant.rasi,
      moonSign: girlMoon.rasi,
      nakshatra: `${girlChart.panchang.nakshatra} (Pada ${girlChart.panchang.pada})`,
      nadi: girlChart.panchang.nadi,
      manglik: girlManglik ? `Manglik (Mars in House ${girlMarsHouse})` : "Non-Manglik",
    },
    breakdown: [
      { name: "Varna", score: varnaScore, max: 1, description: `Spiritual & ego compatibility (${boyChart.panchang.varna} & ${girlChart.panchang.varna})` },
      { name: "Vashya", score: vashyaScore, max: 2, description: "Mutual magnetic attraction & support" },
      { name: "Tara", score: taraScore, max: 3, description: "Nakshatra destiny & health harmony" },
      { name: "Yoni", score: yoniScore, max: 4, description: "Biological & intimate compatibility" },
      { name: "Graha Maitri", score: grahaMaitriScore, max: 5, description: `Mental affinity (${bLord} & ${gLord} Moon Lords)` },
      { name: "Gana", score: ganaScore, max: 6, description: `Temperament (${boyChart.panchang.gana.split(" ")[0]} & ${girlChart.panchang.gana.split(" ")[0]})` },
      { name: "Bhakoot", score: bhakootScore, max: 7, description: "Emotional, family & financial prosperity" },
      { name: "Nadi", score: nadiScore, max: 8, description: `Genetic & pranic vitality (${boyChart.panchang.nadi.split(" ")[0]} & ${girlChart.panchang.nadi.split(" ")[0]})` },
    ],
  };
}

```

### File: `src/components/astrology/VedicChartSVG.tsx`

**Enterprise Upgrade Integrated:** 3-Style Interactive SVG Birth Chart Component (North Indian Diamond, South Indian Square, East Indian Surya Chakra) + Click-to-Inspect House Bar + Vector SVG Export

```
"use client";

import React, { useState, useRef } from "react";
import { Download, Info } from "lucide-react";

export interface ChartPlanetItem {
  key: string;
  rashiIndex: number; // 0 = Aries ... 11 = Pisces
  house: number;      // 1 to 12
  degreeFormatted?: string;
  nakshatra?: string;
  dignity?: string;
  isRetrograde?: boolean;
  isCombust?: boolean;
}

interface VedicChartSVGProps {
  styleType: "north" | "south" | "east";
  ascendantRashiIndex: number;
  planets: ChartPlanetItem[];
  title: string;
  subtitle?: string;
}

const RASHI_SHORT = ["Ar", "Ta", "Ge", "Cn", "Le", "Vi", "Li", "Sc", "Sg", "Cp", "Aq", "Pi"];
const RASHI_FULL = [
  "Aries (Mesha)", "Taurus (Vrishabha)", "Gemini (Mithuna)", "Cancer (Karka)",
  "Leo (Simha)", "Virgo (Kanya)", "Libra (Tula)", "Scorpio (Vrishchika)",
  "Sagittarius (Dhanu)", "Capricorn (Makara)", "Aquarius (Kumbha)", "Pisces (Meena)",
];
const HOUSE_SIGNIFICATIONS: Record<number, string> = {
  1: "Tanu Bhava — Self, Physical Vitality, Personality & Head",
  2: "Dhana Bhava — Accumulated Wealth, Family, Speech & Right Eye",
  3: "Sahaja Bhava — Courage, Younger Siblings, Communication & Initiative",
  4: "Sukha Bhava — Mother, Home, Real Estate, Vehicles & Inner Peace",
  5: "Putra Bhava — Intelligence, Progeny, Purva Punya & Speculation",
  6: "Ripu/Roga Bhava — Competition, Health Discipline, Debt & Daily Service",
  7: "Yuvati Bhava — Marriage, Spouse, Business Partnerships & Public Contracts",
  8: "Randhra Bhava — Longevity, Sudden Transformation, Occult & Inheritance",
  9: "Dharma Bhava — Fortune (Bhagya), Higher Wisdom, Guru & Father",
  10: "Karma Bhava — Career, Profession, Fame, Authority & Status",
  11: "Labha Bhava — Gains, Income Fulfillment, Elder Siblings & Networks",
  12: "Vyaya Bhava — Moksha, Spiritual Liberation, Foreign Lands & Charity",
};

const NORTH_HOUSE_COORDS: Record<number, { rashiXY: [number, number]; planetsXY: [number, number] }> = {
  1:  { rashiXY: [200, 174], planetsXY: [200, 105] },
  2:  { rashiXY: [100, 82],  planetsXY: [100, 42] },
  3:  { rashiXY: [74, 105],  planetsXY: [34, 105] },
  4:  { rashiXY: [170, 204], planetsXY: [100, 204] },
  5:  { rashiXY: [74, 304],  planetsXY: [34, 304] },
  6:  { rashiXY: [100, 326], planetsXY: [100, 366] },
  7:  { rashiXY: [200, 236], planetsXY: [200, 304] },
  8:  { rashiXY: [300, 326], planetsXY: [300, 366] },
  9:  { rashiXY: [326, 304], planetsXY: [366, 304] },
  10: { rashiXY: [230, 204], planetsXY: [300, 204] },
  11: { rashiXY: [326, 105], planetsXY: [366, 105] },
  12: { rashiXY: [300, 82],  planetsXY: [300, 42] },
};

const SOUTH_SIGN_CELLS: Record<number, { x: number; y: number; name: string }> = {
  11: { x: 4,   y: 4,   name: "Pi" },
  0:  { x: 102, y: 4,   name: "Ar" },
  1:  { x: 200, y: 4,   name: "Ta" },
  2:  { x: 298, y: 4,   name: "Ge" },
  3:  { x: 298, y: 102, name: "Cn" },
  4:  { x: 298, y: 200, name: "Le" },
  5:  { x: 298, y: 298, name: "Vi" },
  6:  { x: 200, y: 298, name: "Li" },
  7:  { x: 102, y: 298, name: "Sc" },
  8:  { x: 4,   y: 298, name: "Sg" },
  9:  { x: 4,   y: 200, name: "Cp" },
  10: { x: 4,   y: 102, name: "Aq" },
};

// East Indian (Surya Chakra / Bengali-Odia-Maithili 3x3 anti-clockwise grid)
const EAST_SIGN_COORDS: Record<number, { x: number; y: number }> = {
  0:  { x: 200, y: 65 },  // Aries (Top-Center)
  1:  { x: 85,  y: 40 },  // Taurus (Top-Left upper triangle)
  2:  { x: 45,  y: 95 },  // Gemini (Top-Left lower triangle)
  3:  { x: 68,  y: 205 }, // Cancer (Middle-Left)
  4:  { x: 45,  y: 315 }, // Leo (Bottom-Left upper)
  5:  { x: 85,  y: 365 }, // Virgo (Bottom-Left lower)
  6:  { x: 200, y: 345 }, // Libra (Bottom-Center)
  7:  { x: 315, y: 365 }, // Scorpio (Bottom-Right lower)
  8:  { x: 355, y: 315 }, // Sagittarius (Bottom-Right upper)
  9:  { x: 332, y: 205 }, // Capricorn (Middle-Right)
  10: { x: 355, y: 95 },  // Aquarius (Top-Right lower)
  11: { x: 315, y: 40 },  // Pisces (Top-Right upper)
};

export default function VedicChartSVG({
  styleType,
  ascendantRashiIndex,
  planets,
  title,
  subtitle,
}: VedicChartSVGProps) {
  const [selectedHouse, setSelectedHouse] = useState<number>(1);
  const svgRef = useRef<SVGSVGElement>(null);

  const formatSymbol = (p: ChartPlanetItem) => {
    const abbr = p.key.slice(0, 2);
    return `${abbr}${p.isRetrograde && p.key !== "Rahu" && p.key !== "Ketu" ? "(R)" : ""}${p.isCombust ? "^" : ""}`;
  };

  const handleDownloadSVG = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgRef.current);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${styleType}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedRashiIdx = (ascendantRashiIndex + selectedHouse - 1) % 12;
  const selectedPlanets = planets.filter((p) => p.house === selectedHouse);

  return (
    <div className="bg-[#0D0B1A] border border-[#C9A84C]/30 rounded-2xl p-5 flex flex-col items-center shadow-xl">
      <div className="w-full flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-serif font-bold text-[#C9A84C]">{title}</h3>
          {subtitle && <p className="text-xs text-[#E8E4F0]/65">{subtitle}</p>}
        </div>
        <button
          type="button"
          onClick={handleDownloadSVG}
          title="Download High-Resolution SVG Chart"
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#1A1628] border border-[#C9A84C]/30 text-[11px] font-semibold text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0D0B1A] transition-colors cursor-pointer"
        >
          <Download className="w-3 h-3" />
          <span>SVG</span>
        </button>
      </div>

      {styleType === "north" && (
        <svg
          ref={svgRef}
          viewBox="0 0 400 400"
          className="w-full max-w-[330px] h-auto stroke-[#C9A84C] fill-none"
          role="img"
          aria-label={`${title} North Indian Chart`}
        >
          <rect x="4" y="4" width="392" height="392" strokeWidth="2.5" rx="6" fill="#0D0B1A" />
          <line x1="4" y1="4" x2="396" y2="396" strokeWidth="1.4" />
          <line x1="396" y1="4" x2="4" y2="396" strokeWidth="1.4" />
          <polygon points="200,4 396,200 200,396 4,200" strokeWidth="1.8" />

          {Array.from({ length: 12 }, (_, i) => {
            const houseNum = i + 1;
            const rashiNum = ((ascendantRashiIndex + i) % 12) + 1;
            const housePlanets = planets.filter((p) => p.house === houseNum).map(formatSymbol);
            const coords = NORTH_HOUSE_COORDS[houseNum];
            const isSelected = selectedHouse === houseNum;
            return (
              <g
                key={houseNum}
                onClick={() => setSelectedHouse(houseNum)}
                className="cursor-pointer"
              >
                <circle
                  cx={coords.rashiXY[0]}
                  cy={coords.rashiXY[1] - 4}
                  r="11"
                  className={isSelected ? "fill-[#C9A84C]/30 stroke-[#C9A84C]" : "fill-transparent stroke-none"}
                />
                <text
                  x={coords.rashiXY[0]}
                  y={coords.rashiXY[1]}
                  textAnchor="middle"
                  className="fill-[#C9A84C] stroke-none text-[11px] font-sans font-bold"
                >
                  {rashiNum}
                </text>
                <text
                  x={coords.planetsXY[0]}
                  y={coords.planetsXY[1]}
                  textAnchor="middle"
                  className="fill-[#E8E4F0] stroke-none text-[11.5px] font-serif font-bold"
                >
                  {housePlanets.join(" ")}
                </text>
              </g>
            );
          })}
        </svg>
      )}

      {styleType === "south" && (
        <svg
          ref={svgRef}
          viewBox="0 0 400 400"
          className="w-full max-w-[330px] h-auto stroke-[#C9A84C] fill-none"
          role="img"
          aria-label={`${title} South Indian Chart`}
        >
          <rect x="4" y="4" width="392" height="392" strokeWidth="2.5" rx="6" fill="#0D0B1A" />
          <rect x="102" y="102" width="196" height="196" strokeWidth="1.8" />
          <text x="200" y="195" textAnchor="middle" className="fill-[#C9A84C] stroke-none text-[14px] font-serif font-bold">
            {title}
          </text>
          <text x="200" y="215" textAnchor="middle" className="fill-[#E8E4F0]/60 stroke-none text-[10px] font-sans">
            South Indian Chakra
          </text>

          {Object.entries(SOUTH_SIGN_CELLS).map(([signIdxStr, cell]) => {
            const signIdx = Number(signIdxStr);
            const isAsc = signIdx === ascendantRashiIndex;
            const houseNum = ((signIdx - ascendantRashiIndex + 12) % 12) + 1;
            const signPlanets = planets.filter((p) => p.rashiIndex === signIdx).map(formatSymbol);
            const isSelected = selectedHouse === houseNum;
            return (
              <g
                key={signIdx}
                onClick={() => setSelectedHouse(houseNum)}
                className="cursor-pointer"
              >
                <rect
                  x={cell.x}
                  y={cell.y}
                  width="98"
                  height="98"
                  strokeWidth="1.2"
                  className={isSelected ? "fill-[#C9A84C]/10" : "fill-transparent"}
                />
                <text
                  x={cell.x + 8}
                  y={cell.y + 16}
                  className="fill-[#C9A84C]/70 stroke-none text-[10px] font-sans font-semibold"
                >
                  {cell.name} (H{houseNum})
                </text>
                {isAsc && (
                  <text
                    x={cell.x + 88}
                    y={cell.y + 16}
                    textAnchor="end"
                    className="fill-[#C9A84C] stroke-none text-[10px] font-bold"
                  >
                    Asc
                  </text>
                )}
                <text
                  x={cell.x + 49}
                  y={cell.y + 56}
                  textAnchor="middle"
                  className="fill-[#E8E4F0] stroke-none text-[11.5px] font-serif font-bold"
                >
                  {signPlanets.join(" ")}
                </text>
              </g>
            );
          })}
        </svg>
      )}

      {styleType === "east" && (
        <svg
          ref={svgRef}
          viewBox="0 0 400 400"
          className="w-full max-w-[330px] h-auto stroke-[#C9A84C] fill-none"
          role="img"
          aria-label={`${title} East Indian Surya Chakra`}
        >
          <rect x="4" y="4" width="392" height="392" strokeWidth="2.5" rx="6" fill="#0D0B1A" />
          {/* 3x3 Grid Lines */}
          <line x1="134" y1="4" x2="134" y2="396" strokeWidth="1.5" />
          <line x1="266" y1="4" x2="266" y2="396" strokeWidth="1.5" />
          <line x1="4" y1="134" x2="396" y2="134" strokeWidth="1.5" />
          <line x1="4" y1="266" x2="396" y2="266" strokeWidth="1.5" />
          {/* Corner Diagonals */}
          <line x1="4" y1="4" x2="134" y2="134" strokeWidth="1.2" />
          <line x1="396" y1="4" x2="266" y2="134" strokeWidth="1.2" />
          <line x1="4" y1="396" x2="134" y2="266" strokeWidth="1.2" />
          <line x1="396" y1="396" x2="266" y2="266" strokeWidth="1.2" />

          <text x="200" y="195" textAnchor="middle" className="fill-[#C9A84C] stroke-none text-[13px] font-serif font-bold">
            {title}
          </text>
          <text x="200" y="212" textAnchor="middle" className="fill-[#E8E4F0]/60 stroke-none text-[9.5px] font-sans">
            East Indian (Surya Chakra)
          </text>

          {Object.entries(EAST_SIGN_COORDS).map(([signIdxStr, pos]) => {
            const signIdx = Number(signIdxStr);
            const isAsc = signIdx === ascendantRashiIndex;
            const houseNum = ((signIdx - ascendantRashiIndex + 12) % 12) + 1;
            const signPlanets = planets.filter((p) => p.rashiIndex === signIdx).map(formatSymbol);
            return (
              <g
                key={signIdx}
                onClick={() => setSelectedHouse(houseNum)}
                className="cursor-pointer"
              >
                <text
                  x={pos.x}
                  y={pos.y - 10}
                  textAnchor="middle"
                  className="fill-[#C9A84C]/80 stroke-none text-[9.5px] font-sans font-bold"
                >
                  {RASHI_SHORT[signIdx]}{isAsc ? " (Lagna)" : ""}
                </text>
                <text
                  x={pos.x}
                  y={pos.y + 6}
                  textAnchor="middle"
                  className="fill-[#E8E4F0] stroke-none text-[11px] font-serif font-bold"
                >
                  {signPlanets.join(" ")}
                </text>
              </g>
            );
          })}
        </svg>
      )}

      {/* Interactive House Inspector Bar */}
      <div className="w-full mt-4 p-3.5 rounded-xl bg-[#1A1628] border border-[#C9A84C]/25 text-left space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#C9A84C] flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            House {selectedHouse} • {RASHI_FULL[selectedRashiIdx]}
          </span>
          <span className="text-[10px] text-[#E8E4F0]/60">Click any house to inspect</span>
        </div>
        <p className="text-[11px] text-[#E8E4F0]/75">{HOUSE_SIGNIFICATIONS[selectedHouse]}</p>
        <div className="text-xs text-[#E8E4F0] pt-1">
          <strong>Occupants:</strong>{" "}
          {selectedPlanets.length > 0
            ? selectedPlanets.map((p) => `${p.key}${p.degreeFormatted ? ` (${p.degreeFormatted})` : ""}`).join(", ")
            : "Empty Bhava (Governed by Rashi Lord)"}
        </div>
      </div>
    </div>
  );
}
