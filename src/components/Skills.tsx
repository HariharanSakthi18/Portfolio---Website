import { motion } from "framer-motion";
import Section from "./Section";
import { skills } from "@/lib/data";

const Skills = () => (
  <Section
    id="skills"
    eyebrow="Toolbox"
    title={<>Skills & <span className="gradient-text">expertise</span>.</>}
    description="A practical foundation across software development, computer science, and cloud tools."
  >
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(skills).map(([category, items], idx) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="glass rounded-2xl p-6"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <h3 className="font-display text-lg font-semibold">
              <span className="mr-2 font-mono text-sm text-primary">{String(idx + 1).padStart(2, "0")}.</span>
              {category}
            </h3>
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_16px_hsl(var(--primary)/0.7)]" aria-hidden="true" />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            {items.map((skill, skillIndex) => (
              <motion.li
                key={skill.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.1 + skillIndex * 0.08 }}
                className="group flex items-center gap-3 rounded-xl border border-border/70 bg-secondary/40 px-3.5 py-3 transition-colors hover:border-primary/50 hover:bg-secondary"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70 transition-transform group-hover:scale-150" aria-hidden="true" />
                <span className="text-sm font-medium">{skill.name}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </Section>
);

export default Skills;
