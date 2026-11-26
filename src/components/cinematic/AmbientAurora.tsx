import { motion } from "framer-motion";

/**
 * Bespoke ambient aurora & fluid light waves.
 * Replaces generic grid boxes with an organic, multi-layered chromatic depth field.
 */
const AmbientAurora = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
      {/* Primary luminous aurora bloom (upper right, framing the portrait) */}
      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, -30, 15, 0],
          scale: [1, 1.15, 0.95, 1],
          opacity: [0.35, 0.5, 0.38, 0.35],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="ambient-orb absolute -right-20 -top-20 h-[550px] w-[550px] sm:h-[750px] sm:w-[750px] rounded-full blur-[110px]"
        style={{
          background: "radial-gradient(circle at 45% 45%, hsl(var(--primary) / 0.45) 0%, hsl(var(--accent) / 0.25) 40%, transparent 70%)",
        }}
      />

      {/* Secondary ambient deep violet/indigo bloom (left side, grounding the typography) */}
      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 25, -25, 0],
          scale: [1, 1.1, 0.9, 1],
          opacity: [0.25, 0.4, 0.3, 0.25],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="ambient-orb absolute -left-28 top-1/4 h-[480px] w-[480px] sm:h-[650px] sm:w-[650px] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle at 50% 50%, hsl(245 80% 60% / 0.28) 0%, hsl(217 91% 60% / 0.18) 50%, transparent 75%)",
        }}
      />

      {/* Tertiary subtle cyan horizon flare (bottom center) */}
      <motion.div
        animate={{
          scaleX: [1, 1.25, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-44 w-3/4 rounded-full blur-[90px]"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--accent) / 0.22) 0%, transparent 75%)",
        }}
      />
    </div>
  );
};

export default AmbientAurora;

