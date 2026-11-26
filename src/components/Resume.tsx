import { Download, FileText } from "lucide-react";
import TiltCard from "./cinematic/TiltCard";
import { profile } from "@/lib/data";

const Resume = () => (
  <section
    id="resume"
    className="section-theme-resume relative overflow-hidden py-24 transition-colors duration-500"
  >
    {/* Subtle Sapphire Ambient Depth Orb */}
    <div className="ambient-orb pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-sky-500/15 blur-[130px]" />
    
    <div className="container relative z-10">
      <TiltCard
        intensity={4}
        initial={{ opacity: 0, y: 50, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="resume-card relative overflow-hidden rounded-[2rem] p-8 sm:p-12 transition-all duration-500"
      >
        <span
          className="pointer-events-none absolute -bottom-10 right-4 select-none font-display text-[clamp(6rem,18vw,14rem)] leading-none text-stroke"
          style={{ transform: "translateZ(25px)" }}
        >
          Resume
        </span>
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em]">
              <span className="text-primary font-semibold">06</span>
              <span className="h-px w-8 bg-primary/50" />
              <span className="text-muted-foreground font-medium">Resume</span>
            </p>
            <h2 className="font-display text-4xl uppercase leading-[0.95] sm:text-6xl">
              Want the full story?{" "}
              <span className="font-serif-italic normal-case gradient-text">Grab my resume.</span>
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              A one-page PDF with my education, internship experience, projects and skills.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={profile.resumeUrl} download className="btn-primary">
              <Download className="h-4 w-4" /> Download PDF
            </a>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-ghost">
              <FileText className="h-4 w-4" /> Preview
            </a>
          </div>
        </div>
      </TiltCard>
    </div>
  </section>
);

export default Resume;
