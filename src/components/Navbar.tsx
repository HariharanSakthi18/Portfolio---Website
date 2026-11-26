import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import avatarImg from "@/assets/avatar-hariharan.jpg";
import { useTheme } from "@/hooks/use-theme";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#certifications", label: "Certifications" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const ease = [0.16, 1, 0.3, 1] as const;
const pill = { type: "spring", stiffness: 420, damping: 34 } as const;

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.55 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: -16, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLight, toggle: toggleTheme } = useTheme();
  const [active, setActive] = useState("#home");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="container">
        <motion.nav
          initial={{ opacity: 0, y: -40, scaleX: 0.6, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scaleX: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className={`relative mx-auto flex items-center justify-between gap-3 rounded-full px-4 py-2.5 transition-[max-width,background-color,border-color,box-shadow] duration-700 sm:px-6 ${
            scrolled
              ? "navbar-scrolled max-w-5xl border border-border/70 bg-background/80 shadow-[var(--shadow-elegant)] backdrop-blur-xl"
              : "max-w-full border border-transparent"
          }`}
        >
          {/* glowing silk line under the bar once you scroll */}
          <motion.span
            aria-hidden="true"
            initial={false}
            animate={{ opacity: scrolled ? 1 : 0, scaleX: scrolled ? 1 : 0.2 }}
            transition={{ duration: 0.7, ease }}
            className="pointer-events-none absolute inset-x-10 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          />

          <a href="#home" className="group flex shrink-0 items-center gap-2.5 font-display text-2xl tracking-wide sm:text-3xl md:text-[2rem]">
            <motion.span
              initial={{ y: -30, scale: 0 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 140, damping: 11, delay: 0.6 }}
              className="relative inline-flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-full border-2 border-primary/60 shadow-[0_0_14px_hsl(var(--primary)/0.4)] transition-all duration-300 group-hover:scale-110 group-hover:border-accent"
            >
              <img
                src={avatarImg}
                alt="Hariharan S avatar"
                className="h-full w-full object-cover object-top"
              />
            </motion.span>
            <motion.span
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1, delay: 0.75, ease }}
              className="gradient-text"
            >
              Hariharan S
            </motion.span>
          </a>

          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="show"
            onMouseLeave={() => setHovered(null)}
            className="hidden items-center gap-1 md:flex"
          >
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <motion.li key={l.href} variants={itemVariants} className="relative">
                  <a
                    href={l.href}
                    onMouseEnter={() => setHovered(l.href)}
                    onFocus={() => setHovered(l.href)}
                    className={`nav-link-item relative isolate block rounded-full px-3 py-2 text-sm transition-colors duration-300 lg:px-4 ${
                      isActive ? "is-active text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {hovered === l.href && !isActive && (
                      <motion.span
                        layoutId="nav-hover"
                        transition={pill}
                        className="nav-pill-hover absolute inset-0 -z-10 rounded-full"
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={pill}
                        className="nav-pill-active absolute inset-0 -z-10 rounded-full"
                      >
                        <span className="absolute -bottom-px left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent" />
                      </motion.span>
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            className="flex items-center gap-2"
          >
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full transition-colors hover:bg-secondary hover:text-primary"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isLight ? "moon" : "sun"}
                  initial={{ y: 18, rotate: -90, opacity: 0 }}
                  animate={{ y: 0, rotate: 0, opacity: 1 }}
                  exit={{ y: -18, rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="inline-flex"
                >
                  {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <a href="#contact" className="btn-primary hidden !px-5 !py-2 text-sm md:inline-flex">
              Hire me
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary md:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex"
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </motion.div>
        </motion.nav>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ clipPath: "circle(0% at 92% 0%)", opacity: 0.6 }}
              animate={{ clipPath: "circle(150% at 92% 0%)", opacity: 1 }}
              exit={{ clipPath: "circle(0% at 92% 0%)", opacity: 0.6 }}
              transition={{ duration: 0.6, ease }}
              className="mt-2 flex flex-col rounded-3xl border border-border/70 bg-background/90 p-3 backdrop-blur-xl md:hidden"
            >
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease }}
                >
                  <a
                    onClick={() => setOpen(false)}
                    href={l.href}
                    className={`flex items-center justify-between rounded-2xl px-4 py-2.5 font-display text-2xl uppercase tracking-wide transition-colors hover:bg-secondary hover:text-primary ${
                      active === l.href ? "text-primary" : ""
                    }`}
                  >
                    {l.label}
                    <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
