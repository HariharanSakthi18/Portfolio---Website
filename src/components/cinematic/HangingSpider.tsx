import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Spider from "./Spider";
import WebHero from "./WebHero";

interface Props {
  className?: string;
  /** Thread length in px. */
  length?: number;
  delay?: number;
  size?: string;
  /** What hangs from the thread. */
  figure?: "spider" | "hero";
}

/** A spider (or little hero) that drops down on its thread when scrolled into view, then gently swings and bobs. */
const HangingSpider = ({ className, length = 120, delay = 0, size = "h-9 w-9", figure = "spider" }: Props) => (
  <motion.div
    aria-hidden="true"
    className={cn("pointer-events-none absolute top-0 z-20 origin-top", className)}
    initial="up"
    whileInView="down"
    viewport={{ once: true }}
    animate={{ rotate: [-6, 6, -6] }}
    transition={{ rotate: { duration: 5 + delay, repeat: Infinity, ease: "easeInOut" } }}
  >
    <motion.div
      className="flex flex-col items-center"
      variants={{ up: { y: -length - 80 }, down: { y: 0 } }}
      transition={{ type: "spring", stiffness: 60, damping: 9, delay: 0.3 + delay * 0.2 }}
    >
      <motion.div
        className="w-px bg-gradient-to-b from-transparent via-foreground/40 to-foreground/60"
        animate={{ height: [length, length + 22, length] }}
        transition={{ duration: 3.2 + delay, repeat: Infinity, ease: "easeInOut" }}
      />
      {figure === "hero" ? (
        <WebHero className={cn("-mt-0.5 drop-shadow-[0_4px_10px_hsl(var(--primary)/0.45)]", size)} />
      ) : (
        <Spider className={cn("-mt-1 rotate-180 text-foreground/85 drop-shadow-[0_4px_10px_hsl(var(--primary)/0.45)]", size)} />
      )}
    </motion.div>
  </motion.div>
);

export default HangingSpider;
