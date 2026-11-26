import { motion } from "framer-motion";

/**
 * 3D Holographic Gyroscope Orbital System.
 * Uses CSS 3D transforms with multi-axis gyro rings that rotate in X, Y, and Z planes
 * around Hariharan's portrait, creating genuine physical depth and dynamic 3D perspective.
 */
const PortraitBackdrop = () => {
  return (
    <div
      className="pointer-events-none absolute -inset-20 sm:-inset-28 flex items-center justify-center select-none"
      aria-hidden="true"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* 1. Deep Chromatic Core Aura */}
      <motion.div
        animate={{
          scale: [1, 1.14, 1],
          opacity: [0.45, 0.65, 0.45],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-80 w-80 sm:h-[450px] sm:w-[450px] rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.6) 0%, hsl(var(--accent) / 0.4) 40%, hsl(240 85% 65% / 0.2) 70%, transparent 80%)",
          transform: "translateZ(-40px)",
        }}
      />

      {/* 2. 3D Gyroscope Ring 1 — Tilted Pitch Axis (X-plane) */}
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute h-[130%] w-[130%] rounded-full border border-primary/40 shadow-[0_0_15px_hsl(var(--primary)/0.25)]"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(68deg) rotateY(15deg)",
        }}
      >
        {/* Orbital satellite node on Ring 1 */}
        <span
          className="absolute -top-1.5 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_15px_hsl(var(--primary-glow))]"
          style={{ transform: "rotateX(-68deg)" }}
        />
      </motion.div>

      {/* 3. 3D Gyroscope Ring 2 — Tilted Yaw Axis (Y-plane, counter-rotating) */}
      <motion.div
        animate={{ rotateZ: -360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        className="absolute h-[125%] w-[125%] rounded-full border border-accent/40 shadow-[0_0_15px_hsl(var(--accent)/0.25)]"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(65deg) rotateX(-20deg)",
        }}
      >
        {/* Satellite node on Ring 2 */}
        <span
          className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]"
          style={{ transform: "rotateY(-65deg)" }}
        />
      </motion.div>

      {/* 4. 3D Gyroscope Ring 3 — Diagonal Precision Plane */}
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        className="absolute h-[138%] w-[138%] rounded-full border border-primary/25 border-dashed"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(45deg) rotateY(-45deg)",
        }}
      >
        {/* 4 Cardinal Nodes */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-accent" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-accent" />
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary" />
        <span className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary" />
      </motion.div>

      {/* 5. Front Facing Luminous Arc Ring */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute h-[116%] w-[116%]"
        viewBox="0 0 400 400"
        style={{ transform: "translateZ(10px)" }}
      >
        <circle
          cx="200"
          cy="200"
          r="174"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="2.5"
          strokeDasharray="80 280"
          strokeLinecap="round"
          className="opacity-90 drop-shadow-[0_0_14px_hsl(var(--primary-glow))]"
        />
        <circle
          cx="374"
          cy="200"
          r="4.5"
          fill="hsl(var(--accent))"
          className="drop-shadow-[0_0_12px_hsl(var(--primary-glow))]"
        />
        <circle cx="374" cy="200" r="2" fill="#ffffff" />
      </motion.svg>

      {/* 6. Expanding Radar Wave Ping */}
      <motion.div
        animate={{
          scale: [0.95, 1.25],
          opacity: [0.6, 0],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute h-[112%] w-[112%] rounded-full border border-primary/50"
        style={{ transform: "translateZ(-10px)" }}
      />
    </div>
  );
};

export default PortraitBackdrop;
