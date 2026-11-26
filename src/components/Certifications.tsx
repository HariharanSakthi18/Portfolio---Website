import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, FolderOpen, ArrowUpRight } from "lucide-react";
import Section from "./Section";
import TiltCard from "./cinematic/TiltCard";
import { certifications, certificationsDriveUrl, type Certification } from "@/lib/data";
import { Button } from "@/components/ui/button";

const CertificatePreview = lazy(() => import("./CertificatePreview"));

const Certifications = () => {
  const [selected, setSelected] = useState<Certification | null>(null);
  return (
    <>
  <Section
    id="certifications"
    scene="03"
    eyebrow="Certifications"
    variant="certifications"
    title={
      <>
        Verified <span className="font-serif-italic normal-case gradient-text">credentials</span>.
      </>
    }
    description="Programs I've completed to deepen my craft."
  >
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {certifications.map((c, i) => (
        <TiltCard
          key={c.title}
          initial={{ opacity: 0, y: 50, rotateX: 20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="glass flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-colors hover:border-primary/50 hover:shadow-card"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span
            className="pointer-events-none absolute right-4 top-2 font-display text-[6rem] leading-none text-stroke"
            style={{ transform: "translateZ(35px)" }}
          >
            0{i + 1}
          </span>
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/15 blur-2xl transition-all duration-500 group-hover/tilt:bg-primary/25 group-hover/tilt:scale-125" />
          <BadgeCheck
            className="relative mb-5 h-9 w-9 text-primary transition-transform duration-300 group-hover/tilt:scale-110 group-hover/tilt:text-accent drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
            style={{ transform: "translateZ(30px)" }}
          />
          <h3 className="relative text-lg font-semibold leading-snug transition-colors group-hover/tilt:text-primary" style={{ transform: "translateZ(20px)" }}>{c.title}</h3>
          <p className="relative mt-1 font-mono text-xs text-primary" style={{ transform: "translateZ(15px)" }}>{c.issuer}</p>
          <p className="relative mb-6 mt-3 text-sm leading-relaxed text-muted-foreground" style={{ transform: "translateZ(15px)" }}>{c.description}</p>

          {c.link && (
            <Button
              variant="ghost"
              onClick={() => setSelected(c)}
              className="group/btn relative z-10 mt-auto inline-flex w-full items-center justify-between rounded-full border border-border bg-card/60 px-5 py-2.5 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_16px_hsl(var(--primary)/0.4)]"
            >
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                 <FolderOpen className="h-4 w-4" /> {c.linkLabel ?? "View Certificate"}
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </Button>
          )}
        </TiltCard>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-12 flex justify-center"
    >
      <a href={certificationsDriveUrl} target="_blank" rel="noreferrer" className="btn-primary group">
        <FolderOpen className="h-4 w-4" />
        View all certifications
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </motion.div>
  </Section>
    <Suspense fallback={null}>
      {selected && <CertificatePreview certificate={selected} onClose={() => setSelected(null)} />}
    </Suspense>
    </>
  );
};

export default Certifications;
