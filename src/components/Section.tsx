import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children: ReactNode;
}

const Section = ({ id, eyebrow, title, description, children }: Props) => (
  <section id={id} className="py-20 sm:py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mb-12"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-3">
          // {eyebrow}
        </p>
        <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight">{title}</h2>
        {description && (
          <p className="mt-4 text-muted-foreground text-lg">{description}</p>
        )}
      </motion.div>
      {children}
    </div>
  </section>
);

export default Section;
