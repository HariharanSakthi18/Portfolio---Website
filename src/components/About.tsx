import { motion } from "framer-motion";
import Section from "./Section";
import { profile } from "@/lib/data";
import { GraduationCap, Briefcase, Award } from "lucide-react";

const cards = [
  {
    icon: Briefcase,
    label: "Internship",
    meta: "01/08/25 - 01/02/26",
    value: "Besant Technologies — Full Stack Development Internship",
  },
  {
    icon: GraduationCap,
    label: "Education",
    meta: "Batch 2025 / CGPA 7.7",
    value: "B.Sc ( IT ) - KPR College of Arts Science and Research",
  },
  {
    icon: Award,
    label: "Recognition",
    meta: "2024",
    value: "Best Program Organiser — KPR CAS",
  },
];

const About = () => (
  <Section
    id="about"
    eyebrow="About me"
    title={
      <>
        A fresher who <span className="gradient-text">ships</span>.
      </>
    }
  >
    <div className="grid lg:grid-cols-[1.3fr_1fr] lg:items-start gap-10">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="whitespace-pre-line text-justify text-lg leading-8 text-muted-foreground"
      >
        {profile.about}
      </motion.p>

      <div className="grid content-start gap-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass rounded-2xl p-3 flex items-start gap-3 hover:border-primary/40 transition-colors"
          >
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <c.icon className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{c.meta}</p>
              </div>
              <p className="font-medium mt-0.5 text-base">{c.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

export default About;
