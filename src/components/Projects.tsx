import { motion } from "framer-motion";
import { Github, ArrowUpRight, ExternalLink } from "lucide-react";
import Section from "./Section";
import { projects } from "@/lib/data";

const Projects = () => (
  <Section
    id="projects"
    eyebrow="Selected work"
    title={<>Projects I'm <span className="gradient-text">proud of</span>.</>}
    description="A few things I've built while learning and interning."
  >
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((p, i) => (
        <motion.article
          key={p.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          whileHover={{ y: -6 }}
          className="group glass rounded-2xl overflow-hidden flex flex-col hover:border-primary/40 transition-colors"
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
            <img
              src={p.image}
              alt={`${p.title} project screenshot`}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <div
              className={`absolute left-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-xl border-2 font-display text-base font-bold shadow-lg ring-2 ring-background/70 ${
                p.accent === "primary"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-accent bg-accent text-accent-foreground"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
          </div>

          <div className="p-6 flex flex-col flex-1">


            <h3 className="font-display font-semibold text-xl">{p.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 flex-1 leading-relaxed">
              {p.description}
            </p>

            <ul className="flex flex-wrap gap-1.5 mt-4">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="px-2.5 py-1 rounded-md bg-secondary text-xs font-mono text-muted-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-border bg-card hover:bg-secondary hover:border-primary/40 transition-all text-sm font-medium"
              >
                <Github className="w-4 h-4" /> Code
              </a>
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="group/btn inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-accent/30 bg-accent/15 text-accent transition-all text-sm font-medium hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                <ExternalLink className="w-4 h-4" /> Live
                <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />

              </a>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  </Section>
);


export default Projects;
