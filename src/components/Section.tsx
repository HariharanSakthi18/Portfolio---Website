import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionVariant = "about" | "certifications" | "projects" | "skills" | "contact" | "default";

interface Props {
  id: string;
  scene: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children: ReactNode;
  className?: string;
  variant?: SectionVariant;
  blueTheme?: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;

const variantThemeClasses: Record<SectionVariant, string> = {
  about: "section-theme-about",
  certifications: "section-theme-certifications",
  projects: "section-theme-projects",
  skills: "section-theme-skills",
  contact: "section-theme-contact",
  default: "bg-background",
};

const Section = ({
  id,
  scene,
  eyebrow,
  title,
  description,
  children,
  className,
  variant,
  blueTheme,
}: Props) => {
  // Backwards compatibility for blueTheme
  const effectiveVariant: SectionVariant = blueTheme ? "projects" : (variant ?? "default");

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-24 sm:py-32 transition-colors duration-500",
        variantThemeClasses[effectiveVariant],
        className
      )}
    >
      {/* Dynamic Themed Ambient Light Orbs & Decor for each section */}
      {effectiveVariant === "about" && (
        <>
          <div className="ambient-orb pointer-events-none absolute -left-28 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/14 blur-[125px]" />
          <div className="ambient-orb pointer-events-none absolute -right-28 bottom-1/4 h-[450px] w-[450px] rounded-full bg-accent/12 blur-[130px]" />
          {/* Subtle neural circuit grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(hsl(217 91% 60%) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </>
      )}

      {effectiveVariant === "certifications" && (
        <>
          <div className="ambient-orb pointer-events-none absolute -right-24 top-1/4 h-[550px] w-[550px] rounded-full bg-primary/16 blur-[130px]" />
          <div className="ambient-orb pointer-events-none absolute -left-24 bottom-1/4 h-[480px] w-[480px] rounded-full bg-accent/14 blur-[130px]" />
          {/* Subtle celestial constellation sparks */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(hsl(188 95% 52%) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </>
      )}

      {effectiveVariant === "projects" && (
        <>
          <div className="ambient-orb pointer-events-none absolute -left-32 top-1/4 h-[550px] w-[550px] rounded-full bg-blue-600/22 blur-[135px]" />
          <div className="ambient-orb pointer-events-none absolute -right-32 bottom-1/4 h-[550px] w-[550px] rounded-full bg-cyan-500/18 blur-[135px]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(hsl(217 91% 60%) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </>
      )}

      {effectiveVariant === "skills" && (
        <>
          <div className="ambient-orb pointer-events-none absolute -left-28 top-1/3 h-[520px] w-[520px] rounded-full bg-cyan-500/18 blur-[130px]" />
          <div className="ambient-orb pointer-events-none absolute -right-28 bottom-1/4 h-[480px] w-[480px] rounded-full bg-sky-500/15 blur-[125px]" />
          {/* Cyber matrix grid dot pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(hsl(190 90% 50%) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
        </>
      )}

      {effectiveVariant === "contact" && (
        <>
          <div className="ambient-orb pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[500px] w-[750px] rounded-full bg-primary/20 blur-[140px]" />
          <div className="ambient-orb pointer-events-none absolute -left-20 top-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/15 blur-[120px]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(hsl(217 91% 60%) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </>
      )}

      {effectiveVariant === "default" && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl ${
            Number(scene) % 2 ? "right-10" : "left-10"
          }`}
        />
      )}

      <div className="container relative z-10">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em]"
          >
            <span className="text-primary font-semibold">0{scene}</span>
            <span className="h-px w-8 bg-primary/50" />
            <span className="text-muted-foreground font-medium">{eyebrow}</span>
          </motion.div>
          <div className="overflow-hidden pb-2">
            <motion.h2
              initial={{ y: "105%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease }}
              className="font-display text-5xl uppercase leading-[0.95] sm:text-6xl lg:text-7xl"
            >
              {title}
            </motion.h2>
          </div>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mt-5 text-lg text-muted-foreground"
            >
              {description}
            </motion.p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;
