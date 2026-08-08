import { motion } from "framer-motion";
import { BadgeCheck, FolderOpen, ArrowUpRight } from "lucide-react";
import Section from "./Section";
import { certifications, certificationsDriveUrl } from "@/lib/data";

const Certifications = () => (
  <Section
    id="certifications"
    eyebrow="Certifications"
    title={
      <>
        Verified <span className="gradient-text-accent">credentials</span>.
      </>
    }
    description="Programs I've completed to deepen my craft."
  >
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {certifications.map((c, i) => (
        <motion.article
          key={c.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          whileHover={{ y: -6 }}
          className="group relative flex h-full flex-col glass rounded-2xl p-6 overflow-hidden hover:border-primary/50 transition-colors"
         >
           <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors" />
           <BadgeCheck className="w-8 h-8 text-primary mb-4" />
           <h3 className="font-display font-semibold text-lg leading-snug">{c.title}</h3>
           <p className="font-mono text-xs text-primary mt-1">{c.issuer}</p>
           <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{c.description}</p>

           {c.link && (
             <a
               href={c.link}
               target="_blank"
               rel="noreferrer"
               className="relative mt-auto inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-secondary hover:border-primary/40 transition-all group/btn"
            >
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                <FolderOpen className="w-4 h-4" /> View Certificate
              </span>
              <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </motion.article>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-10 flex justify-center"
    >
      <a
        href={certificationsDriveUrl}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-accent hover:text-accent-foreground hover:shadow-[var(--shadow-glow)] transition-all"
      >
        <FolderOpen className="w-4 h-4" />
        View all certifications
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </motion.div>
  </Section>
);

export default Certifications;
