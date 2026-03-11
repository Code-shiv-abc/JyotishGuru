import { PlanetaryPosition } from "@/lib/astrology";

interface PlanetaryTableProps {
  planets: PlanetaryPosition[];
  ascendant: PlanetaryPosition;
}

export function PlanetaryTable({ planets, ascendant }: PlanetaryTableProps) {
  const allBodies = [ascendant, ...planets];

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-slate-400 font-medium uppercase tracking-wider text-xs">
            <th className="px-4 py-3">Planet</th>
            <th className="px-4 py-3">Sign</th>
            <th className="px-4 py-3">Degree</th>
            <th className="px-4 py-3">Nakshatra</th>
            <th className="px-4 py-3 text-right">House</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {allBodies.map((body, idx) => (
            <tr
              key={idx}
              className="hover:bg-white/5 transition-colors group"
            >
              <td className="px-4 py-3 font-semibold text-slate-200 group-hover:text-mystical-gold transition-colors">
                {body.planet}
                {body.isRetrograde && <span className="text-[10px] ml-1 text-red-400">(R)</span>}
              </td>
              <td className="px-4 py-3 text-slate-300">
                {body.rashi}
              </td>
              <td className="px-4 py-3 text-slate-400 font-mono">
                {body.degree.toFixed(2)}°
              </td>
              <td className="px-4 py-3 text-slate-300">
                {body.nakshatra}
              </td>
              <td className="px-4 py-3 text-right text-slate-400">
                {body.house}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
