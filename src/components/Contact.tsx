import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Section from "./Section";
import { profile , mailtoLink } from "@/lib/data";

type Status = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio contact from ${form.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      if (data.success !== "true" && data.success !== true) throw new Error("Send failed");

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      toast.success("Successfully sent your message!", {
        description: "I'll get back to you as soon as possible.",
      });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      toast.error("Failed to send message", {
        description: "Please try again or email me directly.",
      });
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const info = [
    { icon: Mail, label: "Email", value: profile.email, href: mailtoLink },
    { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Location", value: profile.location },
  ];

  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title={<>Let's build something <span className="gradient-text-accent">together</span>.</>}
      description="Have a role, project, or just want to say hi? Drop a message."
    >
      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6">
        <div className="space-y-3">
          {info.map((i) => {
            const Inner = (
              <>
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <i.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{i.label}</p>
                  <p className="font-medium mt-0.5 break-all">{i.value}</p>
                </div>
              </>
            );
            return i.href ? (
              <a
                key={i.label}
                href={i.href}
                className="glass rounded-2xl p-5 flex items-start gap-4 hover:border-primary/40 transition-colors"
              >
                {Inner}
              </a>
            ) : (
              <div key={i.label} className="glass rounded-2xl p-5 flex items-start gap-4">
                {Inner}
              </div>
            );
          })}
        </div>

        <form onSubmit={onSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Your name">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
                placeholder="Jane Doe"
              />
            </Field>
            <Field label="Email">
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input"
                placeholder="jane@example.com"
              />
            </Field>
          </div>
          <Field label="Message">
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="input resize-none"
              placeholder="Tell me about your project..."
            />
          </Field>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-accent hover:text-accent-foreground hover:shadow-[var(--shadow-glow)] transition-all disabled:opacity-60"
          >
            {status === "loading" ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
            ) : (
              <>Send message <Send className="w-4 h-4" /></>
            )}
          </button>

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-primary/10 border border-primary/30"
            >
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <p className="text-sm">
                Successfully sent your message! I'll get back to you soon.
              </p>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30"
            >
              <AlertCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
              <p className="text-sm">Something went wrong. Please try again or email me directly.</p>
            </motion.div>
          )}
        </form>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: hsl(var(--input));
          border: 1px solid hsl(var(--border));
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          color: hsl(var(--foreground));
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .input:focus {
          border-color: hsl(var(--primary));
          box-shadow: 0 0 0 3px hsl(var(--primary) / 0.2);
        }
        .input::placeholder { color: hsl(var(--muted-foreground)); }
      `}</style>
    </Section>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1.5 block">
      {label}
    </span>
    {children}
  </label>
);

export default Contact;
