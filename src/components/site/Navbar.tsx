import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, FileText, Download, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import resumePdf from "@/assets/resume.pdf";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/certs", label: "Certs" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
        <motion.nav
          className="mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3"
          animate={{
            backdropFilter: scrolled ? "blur(72px) saturate(160%)" : "blur(32px) saturate(140%)",
            backgroundColor: scrolled ? "rgba(4,10,7,0.75)" : "rgba(4,10,7,0.55)",
          }}
          transition={{ duration: 0.35 }}
          style={{
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.12)"
              : "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {}
          <Link to="/" className="flex items-center gap-2.5 group" aria-label="Home">
            <motion.span
              className="liquid-glass flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold tracking-tighter text-white spin-border-wrap"
              whileHover={{ scale: 1.12, rotate: 8 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              GM
            </motion.span>
            <span className="font-mono-accent text-sm font-semibold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              gowsic.ms
            </span>
          </Link>

          {}
          <div className="hidden items-center gap-0.5 lg:flex relative">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs transition-colors z-10 ${
                    active ? "text-white" : "text-white/65 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              );
            })}
          </div>

          {}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => window.dispatchEvent(new CustomEvent("open-resume"))}
              className="liquid-glass hidden items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs text-white/80 hover:text-white md:flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View Resume"
            >
              <FileText className="h-3.5 w-3.5 text-emerald-400" />
              Resume
            </motion.button>

            <div className="liquid-glass hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs text-white/70 md:flex">
              <span className="h-2 w-2 rounded-full bg-green-400 pulse-dot" />
              Available
            </div>

            <button
              aria-label="Open navigation menu"
              onClick={() => setOpen(true)}
              className="liquid-glass flex h-9 w-9 items-center justify-center rounded-full text-white/80 lg:hidden hover:text-white transition-colors"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </motion.nav>
      </header>

      {}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "rgba(0,4,2,0.85)",
                backdropFilter: "blur(40px) saturate(140%)",
              }}
              onClick={() => setOpen(false)}
            />

            {}
            <motion.div
              className="absolute inset-x-4 top-4 bottom-4 liquid-glass-strong rounded-3xl p-8 flex flex-col overflow-hidden"
              initial={{ scale: 0.94, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(16,185,129,0.25) 0%, transparent 70%)",
                }}
              />

              <div className="relative flex items-center justify-between">
                <span className="font-mono-accent text-sm font-semibold tracking-tight text-white">gowsic.ms</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white hover:text-emerald-400 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative mt-10 flex flex-col gap-2">
                {links.map((l, i) => {
                  const active = pathname === l.to;
                  return (
                    <motion.div
                      key={l.to}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between rounded-2xl px-5 py-4 text-base transition-all ${
                          active
                            ? "liquid-glass-strong text-white"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span>{l.label}</span>
                        {active && <ChevronRight className="h-4 w-4 text-emerald-400" />}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.button
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: links.length * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => {
                    setOpen(false);
                    window.dispatchEvent(new CustomEvent("open-resume"));
                  }}
                  className="liquid-glass flex items-center justify-between rounded-2xl px-5 py-4 text-base text-white/70 w-full text-left hover:text-white hover:bg-white/5 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-emerald-400" />
                    Resume
                  </span>
                  <Download className="h-4 w-4 text-white/50" />
                </motion.button>
              </div>

              <div className="relative mt-auto flex items-center justify-between">
                <div className="liquid-glass flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-white/70">
                  <span className="h-2 w-2 rounded-full bg-green-400 pulse-dot" />
                  Available for internships
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
