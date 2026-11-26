import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import WebHero from "./WebHero";

const REST = 72;
const PULL = 32;

/**
 * Little hero swinging on a web at the right edge of the screen.
 * Pull him down (or tap him) to switch between dark and light themes.
 */
const ThemeSwingHero = ({ position = "right" }: { position?: "left" | "right" }) => {
  const { isLight, toggle } = useTheme();
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const thread = useTransform([x, y], ([vx, vy]: number[]) => `M 60 0 L ${60 + vx} ${REST + vy + 2}`);
  const [dragging, setDragging] = useState(false);
  const [used, setUsed] = useState(false);
  const didDrag = useRef(false);

  const flip = () => {
    toggle();
    setUsed(true);
  };

  return (
    <motion.div
      className={`pointer-events-none absolute top-0 h-0 w-0 origin-top ${position === "left" ? "left-12 lg:left-16" : "right-12 lg:right-24"}`}
      animate={dragging || reduce ? { rotate: 0 } : { rotate: [-5, 5, -5] }}
      transition={dragging || reduce ? { duration: 0.3 } : { duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg
        aria-hidden="true"
        className="absolute -left-[60px] top-0 overflow-visible"
        width="120"
        height={REST}
      >
        <motion.path d={thread} className="stroke-foreground/60" strokeWidth={1.2} fill="none" />
      </svg>

      <motion.button
        type="button"
        aria-label={isLight ? "Pull to switch to dark theme" : "Pull to switch to light theme"}
        title="Pull me to switch theme"
        drag
        dragSnapToOrigin
        dragElastic={0.25}
        dragConstraints={{ left: -12, right: 12, top: -15, bottom: 45 }}
        dragTransition={{ bounceStiffness: 320, bounceDamping: 11 }}
        style={{ x, y, top: REST - 4 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        onDragStart={() => {
          didDrag.current = true;
          setDragging(true);
        }}
        onDragEnd={(_, info) => {
          setDragging(false);
          if (info.offset.y > PULL) flip();
          window.setTimeout(() => (didDrag.current = false), 60);
        }}
        onTap={() => {
          if (didDrag.current) return;
          flip();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            flip();
          }
        }}
        className="pointer-events-auto absolute -left-[21px] h-14 w-[42px] cursor-grab touch-none rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing"
      >
        <WebHero className="h-full w-full drop-shadow-[0_6px_14px_hsl(var(--primary)/0.55)]" />
        {!used && (
          <span className="pointer-events-none absolute left-1/2 top-full mt-2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-border/70 bg-card/90 px-2 py-1 font-mono text-[10px] uppercase text-foreground shadow-card">
            {isLight ? <Moon className="h-3 w-3 text-primary" /> : <Sun className="h-3 w-3 text-primary" />}
            Pull me
          </span>
        )}
      </motion.button>
    </motion.div>
  );
};

export default ThemeSwingHero;
