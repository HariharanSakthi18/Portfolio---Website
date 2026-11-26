import { lazy, Suspense, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Download, Github, Linkedin, Mail } from "lucide-react";
import portraitImg from "@/assets/portrait-hariharan.jpg";
import { profile, mailtoLink } from "@/lib/data";
import AmbientAurora from "./cinematic/AmbientAurora";

const HeroScene = lazy(() => import("./cinematic/HeroScene"));

const ease = [0.16, 1, 0.3, 1] as const;

const socials = [
  { href: profile.github, label: "GitHub", icon: Github, external: true },
  { href: profile.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
  { href: mailtoLink, label: "Gmail", icon: Mail, external: false },
];

const SocialLink = ({ s, size }: { s: (typeof socials)[number]; size: "sm" | "lg" }) => (
  <a
    href={s.href}
    {...(s.external ? { target: "_blank", rel: "noreferrer" } : {})}
    title={s.label}
    aria-label={s.label}
    className={`icon-btn ${size === "lg" ? "h-11 w-11" : "h-9 w-9"}`}
  >
    <s.icon className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
  </a>
);

const Hero = () => {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Portrait tilts toward the cursor in 3D.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 120, damping: 16 });
  const rotX = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 120, damping: 16 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    mx.set((e.clientX / window.innerWidth) * 2 - 1);
    my.set((e.clientY / window.innerHeight) * 2 - 1);
  };

  return (
    <section
      ref={section}
      id="home"
      onPointerMove={onMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-background" />
      
      {/* Restored Original 3D Three.js Hero Scene (Icosahedron orb, orbital rings, sparkles) */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      <AmbientAurora />
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="pointer-events-none absolute inset-0 vignette" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="mb-6 flex flex-wrap items-center gap-4"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary font-semibold">01 · Overview</span>
              <span className="h-px w-8 bg-primary/50" />
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-500 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for opportunities
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
              className="font-serif-italic text-3xl text-muted-foreground sm:text-4xl"
            >
              Hi, I'm
            </motion.p>
            <h1 className="font-display text-[clamp(4rem,10vw,8.5rem)] uppercase leading-[0.85]">
              {profile.name.split(" ").map((word, i) => (
                <span key={word} className="mr-[0.2em] inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay: 0.5 + i * 0.12, ease }}
                    className="inline-block gradient-text"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease }}
            >
              <p className="mt-4 font-mono text-sm uppercase tracking-[0.25em] text-foreground/90 sm:text-base">
                {profile.role}
              </p>

              <p className="mt-6 max-w-xl text-justify text-base leading-8 text-muted-foreground sm:text-lg">
                {profile.tagline}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#projects" className="btn-primary group">
                  View Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#contact" className="btn-ghost">
                  <Mail className="h-4 w-4" /> Contact me
                </a>
                <a href={profile.resumeUrl} download className="btn-ghost">
                  <Download className="h-4 w-4" /> Resume
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-muted-foreground">
                <div className="flex items-center gap-2" aria-label="Social links">
                  {socials.map((s) => (
                    <SocialLink key={s.label} s={s} size="sm" />
                  ))}
                </div>
                <span className="font-mono text-xs">{profile.location}</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateY: -25 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.3, delay: 0.5, ease }}
            className="relative mx-auto"
            style={{ perspective: 1200 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-4 sm:gap-6"
            >
              {/* Portrait Photo Container with 3D Mouse Parallax and Floating Pill Badge */}
              <motion.div
                style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
                className="relative aspect-square w-[min(58vw,17rem)] sm:h-80 sm:w-80 lg:h-96 lg:w-96"
              >
                <div
                  className="relative h-full w-full rounded-full p-1.5 shadow-[0_10px_50px_rgba(37,99,235,0.35)] transition-all duration-500 hover:shadow-[0_15px_60px_rgba(6,182,212,0.5)]"
                  style={{ backgroundImage: "var(--gradient-primary)", transform: "translateZ(20px)" }}
                >
                  <div className="h-full w-full overflow-hidden rounded-full bg-card shadow-inner">
                    <img
                      src={portraitImg}
                      alt={`${profile.name} portrait`}
                      className="h-full w-full object-cover object-top scale-105 transition-transform duration-700 hover:scale-110"
                      fetchPriority="high"
                    />
                  </div>
                </div>

                <div
                  className="absolute -bottom-4 -right-3 z-10 flex items-center gap-2 whitespace-nowrap rounded-full border border-primary/40 bg-background/90 px-3.5 py-2 font-mono text-xs font-semibold text-foreground backdrop-blur-md shadow-[0_4px_20px_hsl(var(--primary)/0.35)] sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  AI Full Stack <span className="text-accent">·</span> LLMs <span className="text-primary">·</span> Python <span className="text-accent">·</span> React
                </div>
              </motion.div>

              <div className="flex flex-col items-center gap-3" aria-label="Social links">
                {socials.map((s) => (
                  <SocialLink key={s.label} s={s} size="lg" />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary sm:flex"
      >
        Scroll
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
};

export default Hero;
