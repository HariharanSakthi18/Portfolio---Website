import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Spider from "./Spider";
import { WebCorner } from "./Web";

const SIZE = 26;
const LINE_Y = 15; // vertical position of the silk thread (spider's middle)

/**
 * A spider that crawls across the top of the page as you scroll, spinning a silk
 * thread behind it. Scrolling back up, it reels the thread back in (nothing is left behind).
 */
const ScrollSpider = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 22, mass: 0.35 });
  const x = useTransform(progress, (v) => 6 + v * (window.innerWidth - SIZE - 10));

  // Main dragline: from the corner anchor to the spider, with a slight sag.
  const dragline = useTransform(x, (vx) => {
    const end = vx + SIZE / 2;
    const sag = Math.min(7, end / 120);
    return `M 0 ${LINE_Y - 3} Q ${end / 2} ${LINE_Y + sag} ${end} ${LINE_Y}`;
  });
  const [moving, setMoving] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const idle = useRef<number>();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const prev = scrollYProgress.getPrevious() ?? v;
    if (v !== prev) setDir(v > prev ? 1 : -1);
    setMoving(true);
    window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => setMoving(false), 220);
  });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-10">
      <WebCorner className="absolute left-0 top-0 h-9 w-9 text-foreground/45" />
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        <motion.path
          d={dragline}
          className="stroke-foreground/70 drop-shadow-[0_0_3px_hsl(var(--primary)/0.7)]"
          strokeWidth={1.3}
          fill="none"
        />
      </svg>

      <motion.div style={{ x, top: 2 }} className="absolute left-0">
        <Spider
          crawling={moving}
          className={cn(
            "h-[26px] w-[26px] text-foreground drop-shadow-[0_2px_8px_hsl(var(--primary)/0.6)] transition-transform duration-300",
            dir > 0 ? "rotate-90" : "-rotate-90",
          )}
        />
      </motion.div>
    </div>
  );
};

export default ScrollSpider;
