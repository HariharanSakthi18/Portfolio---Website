import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { profile } from "@/lib/data";

const Resume = () => (
  <section id="resume" className="py-20">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative glass rounded-3xl p-8 sm:p-12 overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/15 rounded-full blur-3xl" />
        <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">// Resume</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">
              Want the full story? <span className="gradient-text">Grab my resume.</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              A one-page PDF with my education, internship experience, projects and skills.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-accent hover:text-accent-foreground hover:shadow-[var(--shadow-glow)] transition-all"
            >
              <Download className="w-4 h-4" /> Download PDF
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:bg-secondary transition-colors font-medium"
            >
              <FileText className="w-4 h-4" /> Preview
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Resume;
