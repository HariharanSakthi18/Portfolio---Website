import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import portrait from "@/assets/portrait.jpg";
import { profile , mailtoLink } from "@/lib/data";

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-background" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
      <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: "var(--gradient-hero)" }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for opportunities
            </div>

            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              Hi, I'm <br />
              <span className="gradient-text">{profile.name}</span>
            </h1>

            <p className="mt-4 text-xl sm:text-2xl text-muted-foreground font-display">{profile.role}</p>

            <p className="mt-6 max-w-xl text-left text-base sm:text-lg text-muted-foreground leading-8 text-justify">
              {profile.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] hover:shadow-[var(--shadow-glow)] transition-all"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/10 hover:text-primary transition-colors font-medium"
              >
                <Mail className="w-4 h-4" /> Contact me
              </a>
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:border-primary hover:bg-primary/10 hover:text-primary transition-colors font-medium"
              >
                <Download className="w-4 h-4" /> Resume
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-muted-foreground">
              <div className="flex items-center gap-2" aria-label="Social links">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                  aria-label="GitHub"
                  className="glass flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all hover:scale-110 hover:border-primary hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                  className="glass flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all hover:scale-110 hover:!border-[hsl(var(--linkedin))] hover:!text-[hsl(var(--linkedin))]"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={mailtoLink}
                  title="Gmail"
                  aria-label="Gmail"
                  className="glass flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all hover:scale-110 hover:!border-[hsl(var(--email))] hover:!text-[hsl(var(--email))]"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
              <span className="font-mono text-xs">{profile.location}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-4 sm:gap-5"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent blur-2xl opacity-50" />
                <div className="relative w-full h-full rounded-full p-1.5 bg-gradient-to-br from-primary via-primary-glow to-accent">
                  <div className="w-full h-full rounded-full overflow-hidden bg-card">
                    <img src={portrait} alt={`${profile.name} portrait`} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 glass rounded-2xl px-4 py-2 font-mono text-xs">
                  <span className="text-primary">{"</>"}</span> Python · React.js · SQL
                </div>
              </div>

              <div className="flex flex-col items-center gap-3" aria-label="Social links">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                  aria-label="GitHub"
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-all hover:scale-110 hover:border-primary hover:text-primary"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                  className="glass social-linkedin flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-all hover:scale-110"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={mailtoLink}
                  title="Gmail"
                  aria-label="Gmail"
                  className="glass social-email flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-all hover:scale-110"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
