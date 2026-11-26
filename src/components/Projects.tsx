import { Github, ArrowUpRight, ExternalLink } from "lucide-react";
import Section from "./Section";
import TiltCard from "./cinematic/TiltCard";
import { projects } from "@/lib/data";

const Projects = () => (
  <Section
    id="projects"
    scene="4"
    eyebrow="Selected work"
    blueTheme={true}
    title={
      <>
        Projects I'm <span className="font-serif-italic normal-case gradient-text">proud of</span>.
      </>
    }
    description="A few things I've built while learning and interning."
  >
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => {
        const isPrimary = p.accent === "primary";
        return (
          <TiltCard
            key={p.title}
            intensity={8}
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: (i % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="project-card group/proj relative flex flex-col overflow-hidden rounded-3xl backdrop-blur-xl shadow-lg transition-all duration-500"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
              <img
                src={p.image}
                alt={`${p.title} project screenshot`}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/tilt:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent transition-opacity duration-500 group-hover/tilt:opacity-80" />
              <div
                className={`absolute left-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-xl border font-display text-xl shadow-lg ring-2 ring-background/70 transition-transform duration-300 group-hover/tilt:scale-110 ${
                  isPrimary
                    ? "border-primary/60 bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
                    : "border-accent/60 bg-accent text-accent-foreground shadow-[0_0_15px_hsl(var(--accent)/0.4)]"
                }`}
                style={{ transform: "translateZ(45px)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6" style={{ transform: "translateZ(25px)" }}>
              <h3 className="font-display text-3xl uppercase leading-none tracking-wide transition-colors group-hover/tilt:text-primary">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <li key={s} className="project-stack-badge rounded-full px-2.5 py-1 font-mono text-[11px] transition-all">
                    {s}
                  </li>
                ))}
              </ul>

              <div className="relative z-10 mt-5 grid grid-cols-2 gap-2" style={{ transform: "translateZ(35px)" }}>
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-3 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-foreground/40 hover:bg-secondary"
                >
                  <Github className="h-4 w-4" /> Code
                </a>
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className={`group/btn inline-flex items-center justify-center gap-2 rounded-full border px-3 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 ${
                    isPrimary
                      ? "border-blue-400/50 bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.6)]"
                      : "border-cyan-400/50 bg-cyan-600 text-white hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                  }`}
                >
                  <ExternalLink className="h-4 w-4" /> Live
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                </a>
              </div>
            </div>
          </TiltCard>
        );
      })}
    </div>
  </Section>
);

export default Projects;
