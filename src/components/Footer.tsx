import { Github, Linkedin, Mail } from "lucide-react";
import { profile, mailtoLink } from "@/lib/data";

const Footer = () => (
  <footer className="relative overflow-hidden border-t border-border/70 py-8 sm:py-10">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ backgroundImage: "var(--gradient-primary)", opacity: 0.6 }} />
    <div className="container flex flex-col items-center gap-4 sm:relative sm:flex-row sm:justify-center">
      <p className="max-w-full text-center font-mono text-[11px] leading-relaxed text-muted-foreground sm:whitespace-nowrap sm:text-sm">
        © Created by <span className="gradient-text">Mr. Hariharan S</span> | All Rights Reserved
      </p>
      <div className="flex items-center justify-center gap-2 sm:absolute sm:right-4 lg:right-0" aria-label="Footer social links">
        <a href={profile.github} target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub" className="icon-btn h-9 w-9">
          <Github className="h-4 w-4" />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn" className="icon-btn h-9 w-9">
          <Linkedin className="h-4 w-4" />
        </a>
        <a href={mailtoLink} title="Email" aria-label="Email" className="icon-btn h-9 w-9">
          <Mail className="h-4 w-4" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
