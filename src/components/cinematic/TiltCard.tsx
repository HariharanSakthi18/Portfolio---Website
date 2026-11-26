import { HTMLMotionProps, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PointerEvent } from "react";
import { cn } from "@/lib/utils";

interface Props extends HTMLMotionProps<"div"> {
  intensity?: number;
}

/** A card that tilts in 3D toward the mouse with a soft light glare. Touch devices stay flat. */
const TiltCard = ({ intensity = 8, className, children, ...rest }: Props) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [0, 1], [intensity, -intensity]), spring);
  const rotateY = useSpring(useTransform(x, [0, 1], [-intensity, intensity]), spring);
  const gx = useTransform(x, (v) => `${v * 100}%`);
  const gy = useTransform(y, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, hsl(var(--primary-glow) / 0.18), transparent 60%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      {...rest}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: "preserve-3d", ...rest.style }}
      className={cn("group/tilt relative will-change-transform transition-all duration-500 hover:shadow-[0_16px_40px_-15px_hsl(var(--primary)/0.35)]", className)}
    >
      {children as React.ReactNode}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100 z-20"
        style={{ background: glare }}
      />
    </motion.div>
  );
};

export default TiltCard;
