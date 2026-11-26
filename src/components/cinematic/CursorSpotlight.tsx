import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Fluid ambient spotlight that follows the user's cursor across the page. */
const CursorSpotlight = () => {
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);

  const spring = { damping: 28, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(mx, spring);
  const smoothY = useSpring(my, spring);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 dark:opacity-40 light:opacity-10 blur-3xl"
        style={{
          left: smoothX,
          top: smoothY,
          width: 520,
          height: 520,
          background: "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, hsl(var(--accent) / 0.05) 50%, transparent 70%)",
        }}
      />
    </div>
  );
};

export default CursorSpotlight;

