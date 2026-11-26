import { cn } from "@/lib/utils";

const toXY = (cx: number, cy: number, r: number, a: number) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];

/** Builds sagging ring segments between spokes, like a real web. */
const buildWeb = (cx: number, cy: number, start: number, end: number, spokes: number, radius: number, rings: number, closed: boolean) => {
  const angles = Array.from({ length: spokes }, (_, i) => start + ((end - start) * i) / (closed ? spokes : spokes - 1));
  const spokePaths = angles.map((a) => {
    const [x, y] = toXY(cx, cy, radius, a);
    return `M${cx} ${cy} L${x.toFixed(1)} ${y.toFixed(1)}`;
  });
  const ringPaths: string[] = [];
  for (let k = 1; k <= rings; k++) {
    const r = (radius * k) / (rings + 0.4);
    let d = "";
    const count = closed ? angles.length : angles.length - 1;
    for (let i = 0; i < count; i++) {
      const a1 = angles[i];
      const a2 = angles[(i + 1) % angles.length] + (closed && i === angles.length - 1 ? Math.PI * 2 : 0);
      const [x1, y1] = toXY(cx, cy, r, a1);
      const [x2, y2] = toXY(cx, cy, r, a2);
      const [qx, qy] = toXY(cx, cy, r * 0.86, (a1 + a2) / 2);
      d += `${i === 0 ? `M${x1.toFixed(1)} ${y1.toFixed(1)}` : ""} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
    }
    ringPaths.push(d);
  }
  return [...spokePaths, ...ringPaths];
};

const cornerPaths = buildWeb(0, 0, 0, Math.PI / 2, 7, 200, 7, false);
const fullPaths = buildWeb(100, 100, 0, Math.PI * 2, 14, 98, 9, true);

/** Corner cobweb. The web's anchor is the top-left; flip with Tailwind scale utilities for other corners. */
export const WebCorner = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" aria-hidden="true" className={cn("pointer-events-none", className)} fill="none" stroke="currentColor" strokeWidth={0.8}>
    {cornerPaths.map((d, i) => (
      <path key={i} d={d} />
    ))}
  </svg>
);

/** Full round spider web. */
export const SpiderWeb = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" aria-hidden="true" className={cn("pointer-events-none", className)} fill="none" stroke="currentColor" strokeWidth={0.5}>
    {fullPaths.map((d, i) => (
      <path key={i} d={d} />
    ))}
  </svg>
);
