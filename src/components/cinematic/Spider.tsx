import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  /** Animate the legs like the spider is walking. */
  crawling?: boolean;
}

const legsA = ["M27 28 L18 19 L13 8", "M38 31 L50 27 L59 24", "M26 35 L14 39 L5 45", "M37 39 L45 49 L50 60"];
const legsB = ["M37 28 L46 19 L51 8", "M26 31 L14 27 L5 24", "M38 35 L50 39 L59 45", "M27 39 L19 49 L14 60"];

/** Simple vector spider. Head points up by default; rotate it to change direction. */
const Spider = ({ className, crawling = false }: Props) => (
  <svg
    viewBox="0 0 64 64"
    aria-hidden="true"
    className={cn("spider", crawling && "spider-crawl", className)}
    fill="none"
    stroke="currentColor"
    strokeWidth={2.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <g className="spider-legs-a">
      {legsA.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
    <g className="spider-legs-b">
      {legsB.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
    <ellipse cx="32" cy="42" rx="8.5" ry="11" fill="currentColor" stroke="none" />
    <circle cx="32" cy="27.5" r="6" fill="currentColor" stroke="none" />
    <path d="M29 37 L35 37 L32 42 L35 47 L29 47 L32 42Z" className="fill-primary" stroke="none" />
    <circle cx="29.8" cy="25.5" r="1.3" className="fill-primary" stroke="none" />
    <circle cx="34.2" cy="25.5" r="1.3" className="fill-primary" stroke="none" />
  </svg>
);

export default Spider;
