import { motion } from "framer-motion";
import Section from "./Section";
import TiltCard from "./cinematic/TiltCard";
import { aboutCards, profile } from "@/lib/data";
import { GraduationCap, Briefcase, Award } from "lucide-react";

const icons = { internship: Briefcase, education: GraduationCap, recognition: Award };
const cards = aboutCards.map((card) => ({ ...card, icon: icons[card.kind] }));

const About = () => (
  <Section
    id="about"
    scene="02"
    eyebrow="About me"
    variant="about"
    title={
      <>
        A fresher who <span className="font-serif-italic normal-case gradient-text">ships</span>.
      </>
    }
  >
    <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      <div>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="whitespace-pre-line text-justify text-lg leading-8 text-muted-foreground"
        >
          {profile.about}
        </motion.p>

        {/* 3D Holographic Capabilities Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {[
            { label: "Full Stack", detail: "React · Node · Python", count: "01" },
            { label: "AI & LLMs", detail: "RAG · Automation", count: "02" },
            { label: "Cloud & DB", detail: "AWS · SQL · REST", count: "03" },
          ].map((item, idx) => (
            <TiltCard
              key={item.label}
              intensity={8}
              className="glass relative overflow-hidden rounded-2xl p-3.5 border border-primary/25 shadow-sm transition-all hover:border-primary hover:shadow-[0_8px_25px_-5px_hsl(var(--primary)/0.3)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div style={{ transform: "translateZ(20px)" }}>
                <span className="font-mono text-[10px] text-primary/80 font-semibold">{item.count} // FOCUS</span>
                <p className="mt-1 font-display text-lg uppercase tracking-wide text-foreground">{item.label}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{item.detail}</p>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>

      <div className="grid content-start gap-3">
        {cards.map((c, i) => (
          <TiltCard
            key={c.id}
            intensity={6}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="glass flex items-start gap-3 rounded-2xl p-3.5 transition-colors hover:border-primary/50"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="rounded-xl bg-primary/15 p-2.5 text-primary" style={{ transform: "translateZ(25px)" }}>
              <c.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1 leading-tight" style={{ transform: "translateZ(15px)" }}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <p className="font-mono text-xs uppercase tracking-wider text-primary">{c.label}</p>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{c.meta}</p>
              </div>
              <p className="mt-1 text-base font-semibold">{c.value}</p>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  </Section>
);

export default About;
