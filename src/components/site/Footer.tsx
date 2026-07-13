import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, ArrowUp, Heart } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/certs", label: "Certifications" },
  { to: "/contact", label: "Contact" },
] as const;

const socials = [
  { href: "https://github.com/gowsicms45", label: "GitHub", icon: Github, hoverColor: "hover:text-white" },
  { href: "https://www.linkedin.com/in/gowsic-m-s-ngp-727a192ba", label: "LinkedIn", icon: Linkedin, hoverColor: "hover:text-blue-400" },
  { href: "mailto:msgowsicneuro@gmail.com", label: "Email", icon: Mail, hoverColor: "hover:text-emerald-400" },
];

const builtWith = ["React", "TypeScript", "Framer Motion", "Tailwind CSS", "TanStack"];

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-24 px-6 pb-8 lg:px-16">
      <div className="liquid-glass-strong mx-auto max-w-7xl rounded-3xl overflow-hidden">
        {}
        <div
          className="h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.5), rgba(59,130,246,0.5), rgba(139,92,246,0.5), transparent)",
          }}
        />

        {}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-20"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(16,185,129,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative p-8">
          {}
          <div className="grid gap-8 md:grid-cols-3 items-start">
            {}
            <div>
              <motion.div
                className="flex items-center gap-2.5 mb-3"
                whileHover={{ x: 3, transition: { duration: 0.2 } }}
              >
                <motion.span
                  className="liquid-glass flex h-9 w-9 items-center justify-center rounded-full font-mono-accent text-sm font-bold text-white spin-border-wrap"
                  whileHover={{ scale: 1.12, rotate: 8, transition: { duration: 0.2 } }}
                >
                  GM
                </motion.span>
                <span className="shimmer-text font-mono-accent text-sm font-semibold">Gowsic M S</span>
              </motion.div>
              <p className="text-xs text-white/50 max-w-[200px] leading-relaxed">
                AI & DS · Full Stack Developer building intelligent systems from Coimbatore, India.
              </p>

              {}
              <div className="mt-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
                <span className="font-mono-accent text-[10px] uppercase tracking-widest text-emerald-400/80">
                  Open to work
                </span>
              </div>
            </div>

            {}
            <div className="flex flex-wrap items-start gap-x-4 gap-y-2 md:justify-center">
              {links.map((l, i) => (
                <motion.div key={l.to}>
                  <Link
                    to={l.to}
                    className="font-mono-accent text-[10px] uppercase tracking-widest text-white/45 transition-colors hover:text-emerald-400"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {}
            <div className="flex flex-col items-start gap-4 md:items-end">
              <div className="flex items-center gap-2">
                {socials.map(({ href, label, icon: Icon, hoverColor }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className={`liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white/55 transition-colors ${hoverColor}`}
                    whileHover={{ scale: 1.15, rotate: 8, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>

              {}
              <motion.button
                onClick={scrollToTop}
                className="liquid-glass flex items-center gap-2 rounded-full px-4 py-2 text-xs text-white/60 hover:text-white transition-colors"
                whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.95 }}
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-3.5 w-3.5 text-emerald-400" />
                Back to top
              </motion.button>
            </div>
          </div>

          {}
          <div className="liquid-glass mt-6 h-px w-full" />

          {}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono-accent text-[10px] uppercase tracking-widest text-white/25">
              © {year} GOWSIC M S · ALL RIGHTS RESERVED
            </p>

            {}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono-accent text-[10px] uppercase tracking-widest text-white/20">Built with</span>
              {builtWith.map((tech) => (
                <motion.span
                  key={tech}
                  className="liquid-glass rounded-full px-2 py-0.5 font-mono-accent text-[9px] uppercase tracking-widest text-white/35"
                  whileHover={{ scale: 1.1, color: "rgba(255,255,255,0.7)", transition: { duration: 0.12 } }}
                >
                  {tech}
                </motion.span>
              ))}
              <Heart className="h-3 w-3 text-red-400/70 float-anim" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
