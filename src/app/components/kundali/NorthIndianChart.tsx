import React from "react";

// North Indian Chart House Array Indices
// Indices correspond to houses 1 through 12.
// Standard North Indian Diamond positions:
// 1 = Top Center Diamond
// 2 = Top Left Triangle
// 3 = Left Middle Triangle
// 4 = Center Left Diamond
// 5 = Bottom Left Triangle
// 6 = Bottom Middle Triangle
// 7 = Bottom Center Diamond
// 8 = Bottom Right Triangle
// 9 = Right Middle Triangle
// 10 = Center Right Diamond
// 11 = Top Right Triangle
// 12 = Top Middle Triangle

interface NorthIndianChartProps {
  houses: { houseNumber: number; planets: string[]; signNumber: number }[];
  title?: string;
  width?: number | string;
  height?: number | string;
}

export default function NorthIndianChart({
  houses,
  title = "Lagna Kundali",
  width = "100%",
  height = "auto",
}: NorthIndianChartProps) {
  // SVG ViewBox dimensions
  const vbWidth = 400;
  const vbHeight = 400;

  // The outer square
  const outerSquare = "M 0 0 L 400 0 L 400 400 L 0 400 Z";

  // The two inner diagonals (X)
  const diag1 = "M 0 0 L 400 400";
  const diag2 = "M 400 0 L 0 400";

  // The inner square (diamond)
  const innerDiamond = "M 200 0 L 400 200 L 200 400 L 0 200 Z";

  // Coordinates for the text in each house (X, Y for text center)
  // Adjusted for North Indian standard positions
  const textCoords: Record<number, { x: number; y: number }> = {
    1: { x: 200, y: 100 },
    2: { x: 100, y: 50 },
    3: { x: 50, y: 100 },
    4: { x: 100, y: 200 },
    5: { x: 50, y: 300 },
    6: { x: 100, y: 350 },
    7: { x: 200, y: 300 },
    8: { x: 300, y: 350 },
    9: { x: 350, y: 300 },
    10: { x: 300, y: 200 },
    11: { x: 350, y: 100 },
    12: { x: 300, y: 50 },
  };

  // Helper to format planet abbreviations (e.g., "Sun (Surya)" -> "Su")
  const formatPlanet = (name: string) => {
    if (name.includes("Sun")) return "Su";
    if (name.includes("Moon")) return "Mo";
    if (name.includes("Mars")) return "Ma";
    if (name.includes("Mercury")) return "Me";
    if (name.includes("Jupiter")) return "Ju";
    if (name.includes("Venus")) return "Ve";
    if (name.includes("Saturn")) return "Sa";
    if (name.includes("Rahu")) return "Ra";
    if (name.includes("Ketu")) return "Ke";
    return name.substring(0, 2);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      {title && (
        <h4 className="text-xl font-serif text-[#C9A84C] mb-4 text-center font-bold">
          {title}
        </h4>
      )}
      <svg
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        width={width}
        height={height}
        className="stroke-[#C9A84C] fill-transparent"
        style={{ maxWidth: "100%", height: "auto" }}
      >
        <path d={outerSquare} strokeWidth="2" />
        <path d={diag1} strokeWidth="2" />
        <path d={diag2} strokeWidth="2" />
        <path d={innerDiamond} strokeWidth="2" />

        {houses.map((house) => {
          const coords = textCoords[house.houseNumber];
          if (!coords) return null;

          return (
            <g key={house.houseNumber} className="fill-[#E8E4F0]">
              {/* Sign Number */}
              <text
                x={coords.x}
                y={coords.y - 15}
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                className="fill-[#C9A84C]/50"
              >
                {house.signNumber}
              </text>

              {/* Planets */}
              <text
                x={coords.x}
                y={coords.y + 10}
                textAnchor="middle"
                fontSize="16"
                fontWeight="bold"
              >
                {house.planets.map(formatPlanet).join(", ")}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
