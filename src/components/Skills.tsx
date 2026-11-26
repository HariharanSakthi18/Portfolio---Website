import { motion } from "framer-motion";
import Section from "./Section";
import TiltCard from "./cinematic/TiltCard";
import { skills } from "@/lib/data";

const Skills = () => (
  <Section
    id="skills"
    scene="05"
    eyebrow="Toolbox"
    variant="skills"
    title={
      <>
        Skills & <span className="font-serif-italic normal-case gradient-text">expertise</span>.
      </>
    }
    description="A practical foundation across software development, computer science, and cloud tools."
  >
    <div className="grid gap-5 md:grid-cols-2">
      {Object.entries(skills).map(([category, items], idx) => (
        <TiltCard
          key={category}
          intensity={5}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: (idx % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="glass overflow-hidden rounded-3xl p-6 transition-colors hover:border-primary/50"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span
            className="pointer-events-none absolute -bottom-8 right-2 font-display text-[8rem] leading-none text-stroke"
            style={{ transform: "translateZ(35px)" }}
          >
            {String(idx + 1).padStart(2, "0")}
          </span>
          <div className="relative mb-5 flex items-center justify-between gap-4" style={{ transform: "translateZ(25px)" }}>
            <h3 className="font-display text-3xl uppercase tracking-wide">
              <span className="mr-2 font-mono text-sm text-primary">{String(idx + 1).padStart(2, "0")}.</span>
              {category}
            </h3>
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_16px_hsl(var(--primary)/0.8)]" aria-hidden="true" />
          </div>
          <ul className="relative flex flex-wrap gap-2.5" style={{ transform: "translateZ(20px)" }}>
            {items.map((skill, skillIndex) => (
              <motion.li
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + skillIndex * 0.04 }}
                className="skill-pill group flex items-center gap-2.5 rounded-full px-4 py-2 transition-all hover:border-primary/60 hover:bg-primary/15 hover:shadow-[0_0_15px_hsl(var(--primary-glow)/0.35)] cursor-default"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-all duration-300 group-hover:scale-150 group-hover:bg-primary-glow group-hover:shadow-[0_0_8px_hsl(var(--primary-glow))]" aria-hidden="true" />
                <span className="text-sm font-medium transition-colors group-hover:text-foreground">{skill.name}</span>
              </motion.li>
            ))}
          </ul>
        </TiltCard>
      ))}
    </div>
  </Section>
);

export default Skills;
