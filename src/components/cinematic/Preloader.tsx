import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import avatarImg from "@/assets/avatar-hariharan.jpg";

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Cinematic High-Tech Preloader:
 * - Animated walking 3D boy character strolling smoothly along the progress track.
 * - Dynamic laser data-scan beam, glowing stardust particles, and cyber telemetry.
 * - Clean, sleek aesthetic without wireframe square or circle boxes.
 */
const Preloader = () => {
  const [show, setShow] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!show) return;
    const start = performance.now();
    const duration = 2200; // time for the character walking stride
    let id = 0;
    let done: ReturnType<typeof setTimeout>;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setCount(Math.round((1 - Math.pow(1 - p, 2)) * 100));
      if (p < 1) id = requestAnimationFrame(tick);
      else done = setTimeout(() => setShow(false), 500);
    };
    id = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(done);
    };
  }, [show]);

  const isWalking = count > 0 && count < 100;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          style={{ perspective: 1000 }}
        >
          {/* Split-screen cinematic exit curtains */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-background border-b border-border/20"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-background border-t border-border/20"
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease }}
          />

          {/* High-Tech Ambient Scanning & Particle Effects (No Box Shapes) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Smooth vertical laser scan beam */}
            <motion.div
              animate={{ y: ["-100%", "220%"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-primary/10 to-transparent blur-sm"
            />

            {/* Glowing stardust particle sparks */}
            {[
              { x: "15%", y: "22%", size: 3, delay: 0 },
              { x: "82%", y: "28%", size: 4, delay: 0.8 },
              { x: "25%", y: "75%", size: 3, delay: 0.4 },
              { x: "78%", y: "68%", size: 4, delay: 1.2 },
              { x: "50%", y: "18%", size: 3, delay: 0.6 },
              { x: "88%", y: "82%", size: 3, delay: 1.5 },
            ].map((p, idx) => (
              <motion.div
                key={idx}
                animate={{
                  opacity: [0.15, 0.9, 0.15],
                  scale: [0.8, 1.4, 0.8],
                  y: [0, -14, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeInOut",
                }}
                className="absolute rounded-full bg-accent shadow-[0_0_12px_hsl(var(--accent))]"
                style={{
                  left: p.x,
                  top: p.y,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                }}
              />
            ))}

            {/* Subtle Horizon Light Streaks */}
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [0.9, 1.1, 0.9] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/15 blur-3xl"
            />
          </motion.div>

          {/* Central Interactive Content */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center gap-6 px-6 text-center"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            {/* Top pill badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground shadow-sm backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span>Hariharan S · Portfolio 2026</span>
            </motion.div>

            {/* Main Name Heading */}
            <div className="overflow-hidden pb-1">
              <motion.h1
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease }}
                className="font-display text-6xl tracking-tight gradient-text sm:text-8xl md:text-9xl drop-shadow-sm"
              >
                Hariharan S
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-mono text-xs uppercase tracking-[0.35em] text-foreground/85 sm:text-sm"
            >
              Software Developer · AI & Full Stack
            </motion.p>

            {/* 3D Character Walking Track Area */}
            <div className="relative mt-4 w-full max-w-md px-4">
              {/* Walking Boy Character Avatar */}
              <div
                className="absolute -top-16 -translate-x-1/2 transition-[left] duration-75"
                style={{ left: `${Math.max(6, Math.min(94, count))}%` }}
              >
                <motion.div
                  animate={
                    isWalking
                      ? {
                          y: [0, -8, 0, -8, 0],
                          rotate: [-4, 4, -4],
                        }
                      : count === 100
                      ? {
                          y: [0, -12, 0],
                          scale: [1, 1.15, 1],
                        }
                      : { y: 0, rotate: 0 }
                  }
                  transition={
                    isWalking
                      ? {
                          duration: 0.45,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                      : { duration: 0.4 }
                  }
                  className="relative flex flex-col items-center"
                >
                  {/* Status speech bubble when 100% */}
                  {count === 100 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: -4 }}
                      className="absolute -top-8 whitespace-nowrap rounded-full bg-accent px-2.5 py-0.5 font-mono text-[10px] font-bold text-accent-foreground shadow-md"
                    >
                      Ready! ✨
                    </motion.div>
                  )}

                  {/* Character Avatar Container with Glowing Rim */}
                  <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full border-2 border-primary bg-background p-0.5 shadow-[0_4px_24px_hsl(var(--primary)/0.6)] overflow-hidden">
                    <img
                      src={avatarImg}
                      alt="Walking Character"
                      className="h-full w-full object-cover object-top scale-110"
                    />
                    {/* Active pulse aura */}
                    <div className="absolute inset-0 rounded-full border border-accent/40 animate-pulse pointer-events-none" />
                  </div>

                  {/* Character Contact Ground Shadow */}
                  <motion.div
                    animate={
                      isWalking
                        ? { scaleX: [1, 0.65, 1], opacity: [0.7, 0.35, 0.7] }
                        : { scaleX: 1, opacity: 0.7 }
                    }
                    transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
                    className="mt-1 h-1.5 w-8 rounded-full bg-primary/50 blur-[2px]"
                  />
                </motion.div>
              </div>

              {/* Progress Line Track */}
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-secondary/80 border border-border/50">
                <motion.div
                  className="h-full rounded-full transition-all duration-75"
                  style={{
                    width: `${count}%`,
                    background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
                    boxShadow: "0 0 16px hsl(var(--primary-glow))",
                  }}
                />
              </div>

              {/* Numerical indicator & status below track */}
              <div className="mt-3 flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  {count < 100 ? "Character Entering..." : "System Activated"}
                </span>
                <span className="font-semibold text-primary">{count}%</span>
              </div>
            </div>
          </motion.div>

          {/* Clean Telemetry Markers in Corners (Minimalist HUD details) */}
          <div className="pointer-events-none absolute bottom-5 left-6 hidden font-mono text-[10px] text-muted-foreground/60 sm:block uppercase tracking-widest">
            NODE // 11.66° N 78.14° E
          </div>
          <div className="pointer-events-none absolute bottom-5 right-6 hidden font-mono text-[10px] text-muted-foreground/60 sm:block uppercase tracking-widest">
            CORE // AI & FULL STACK
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
