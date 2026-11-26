import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

/**
 * Little web-slinging hero holding a thread with one raised hand.
 * The hand sits at the top-center of the drawing so a thread can attach straight to it.
 */
const WebHero = ({ className }: Props) => (
  <svg viewBox="0 0 48 64" aria-hidden="true" className={cn("overflow-visible", className)} strokeLinecap="round" strokeLinejoin="round">
    {/* legs */}
    <path d="M14 42 Q12 50 10 57" className="stroke-suit" strokeWidth={5} fill="none" />
    <path d="M20 42 Q23.5 49.5 26.5 56" className="stroke-suit" strokeWidth={5} fill="none" />
    <path d="M10.4 55 L9.3 60.5" className="stroke-primary" strokeWidth={5.4} fill="none" />
    <path d="M26 54 L28 59.5" className="stroke-primary" strokeWidth={5.4} fill="none" />

    {/* lower arm */}
    <path d="M11.5 30 Q5 34 5.5 41" className="stroke-primary" strokeWidth={4.6} fill="none" />
    <circle cx="5.6" cy="41.5" r="2.5" className="fill-primary" />

    {/* torso */}
    <rect x="9.5" y="26.5" width="14" height="17" rx="5.5" className="fill-primary" />
    <path d="M9.5 33 Q11 39 10.5 43.5 L13 43.5 Q12.5 37 9.5 33Z" className="fill-suit" />
    <path d="M23.5 33 Q22 39 22.5 43.5 L20 43.5 Q20.5 37 23.5 33Z" className="fill-suit" />
    <rect x="10" y="39" width="13" height="5" rx="2" className="fill-suit" />
    {/* chest emblem */}
    <g className="stroke-suit" strokeWidth={0.8} fill="none">
      <path d="M14.5 30 L16.5 32 L18.5 30" />
      <path d="M14 35.5 L16.5 33.5 L19 35.5" />
    </g>
    <ellipse cx="16.5" cy="32.8" rx="1.1" ry="1.6" className="fill-suit" />

    {/* raised arm holding the thread */}
    <path d="M21 29.5 Q27 21 24 4.5" className="stroke-primary" strokeWidth={4.6} fill="none" />
    <circle cx="24" cy="3.6" r="2.7" className="fill-primary" />

    {/* head */}
    <circle cx="16.3" cy="18.5" r="8.8" className="fill-primary" />
    <g className="stroke-suit" strokeWidth={0.55} fill="none" opacity={0.55}>
      <path d="M16.3 9.7 V27.3" />
      <path d="M7.5 18.5 H25.1" />
      <path d="M10 12.3 L22.6 24.7" />
      <path d="M22.6 12.3 L10 24.7" />
      <path d="M12.6 13.6 Q16.3 11.8 20 13.6" />
      <path d="M10.5 22.6 Q16.3 26 22.1 22.6" />
    </g>
    {/* eyes */}
    <path d="M9.4 16.6 Q12.3 14.8 14.9 18.3 Q13.4 21.6 10.7 21 Q8.9 19.7 9.4 16.6Z" className="fill-primary-foreground stroke-suit" strokeWidth={1.1} />
    <path d="M23.2 16.6 Q20.3 14.8 17.7 18.3 Q19.2 21.6 21.9 21 Q23.7 19.7 23.2 16.6Z" className="fill-primary-foreground stroke-suit" strokeWidth={1.1} />
  </svg>
);

export default WebHero;
