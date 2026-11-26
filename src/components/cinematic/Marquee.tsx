const words = [
  "Python",
  "Generative AI",
  "React.js",
  "LLMs & RAG",
  "SQL",
  "AWS Cloud",
  "Flask & REST APIs",
  "Full Stack",
  "JavaScript",
  "Git & GitHub",
];

/** Endless cinematic credits-style band of skills with rotating cyber sparks. */
const Marquee = () => (
  <div className="relative overflow-hidden border-y border-border/70 bg-card/40 py-5 backdrop-blur-sm" aria-hidden="true">
    <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
      {[...words, ...words].map((w, i) => (
        <span key={i} className="flex items-center gap-10 font-display text-3xl sm:text-4xl uppercase tracking-wider">
          <span className={i % 2 ? "text-stroke hover:text-foreground/90 transition-colors" : "text-foreground/90"}>{w}</span>
          <span className="text-primary text-xl inline-block animate-[spin_8s_linear_infinite] drop-shadow-[0_0_8px_hsl(var(--primary))]">✦</span>
        </span>
      ))}
    </div>
    <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-background to-transparent z-10" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-background to-transparent z-10" />
  </div>
);

export default Marquee;
