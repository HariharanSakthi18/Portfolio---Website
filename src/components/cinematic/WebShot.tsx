import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SpiderWeb } from "./Web";

type Shot = { id: number; x: number; y: number };

/** Every click shoots a little web where you clicked. */
const WebShot = () => {
  const [shots, setShots] = useState<Shot[]>([]);

  useEffect(() => {
    let id = 0;
    const onClick = (e: MouseEvent) => {
      const shot = { id: ++id, x: e.clientX, y: e.clientY };
      setShots((s) => [...s.slice(-5), shot]);
      setTimeout(() => setShots((s) => s.filter((x) => x.id !== shot.id)), 900);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[65]" aria-hidden="true">
      <AnimatePresence>
        {shots.map((s) => (
          <motion.div
            key={s.id}
            className="absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-foreground/80"
            style={{ left: s.x, top: s.y }}
            initial={{ scale: 0, opacity: 1, rotate: -30 }}
            animate={{ scale: 1, opacity: 0, rotate: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <SpiderWeb className="h-full w-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WebShot;
