import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, BookOpen, Brain, Download, Github, Linkedin,
  Mail, Plus, Sparkles, Wand2, ChevronDown, Zap, Code2, TrendingUp,
} from "lucide-react";
import resumePdf from "@/assets/resume.pdf";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useTilt, useMagnetic, useTypewriter, useCountUp } from "@/hooks/useCreativeAnimations";
import { ParticleField } from "@/components/site/ParticleField";
import { useMouseParallax } from "@/hooks/useParallax";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Gowsic M S — AI & Data Science · Full Stack Developer" },
      { name: "description", content: "AI & DS undergrad building ML models, NLP pipelines, and full stack apps from Coimbatore, India." },
      { property: "og:title", content: "Gowsic M S — Engineering the intelligence behind tomorrow" },
      { property: "og:description", content: "AI & DS undergrad · 7+ projects across ML, NLP, and Full Stack." },
    ],
  }),
  component: Home,
}) as any);


const charContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025, delayChildren: 0.3 } },
};
const charVariant = {
  hidden: { opacity: 0, y: 50, rotateX: -45, filter: "blur(8px)" },
  visible: {
    opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function CharReveal({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={className}
      variants={charContainer}
      initial="hidden"
      animate="visible"
      style={{ display: "inline-flex", flexWrap: "wrap", gap: "0.22em", perspective: 800 }}
    >
      {text.split(" ").map((word, wi) => (
        <span key={wi} style={{ display: "inline-flex", overflow: "hidden" }}>
          {word.split("").map((char, ci) => (
            <motion.span key={ci} variants={charVariant} style={{ display: "inline-block" }}>
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}


function StatCounter({ target, suffix = "", label, delay = 0 }: {
  target: number; suffix?: string; label: string; delay?: number;
}) {
  const { count, ref } = useCountUp(target, 1500);
  return (
    <motion.div
      ref={ref as any}
      className="liquid-glass-strong rounded-2xl p-4 text-center"
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06, y: -4, transition: { duration: 0.2 } }}
    >
      <p className="font-mono-accent text-3xl font-semibold text-white">
        {count}{suffix}
      </p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-white/60">{label}</p>
    </motion.div>
  );
}

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);
  const parallax = useMouseParallax(0.4);

  return (
    <>
      {}
      <section ref={heroRef} className="relative min-h-screen pt-24 lg:flex lg:items-center lg:pt-20">

        {}
        <ParticleField
          count={70}
          connectionRadius={110}
          className="absolute inset-0 z-0 h-full w-full opacity-60"
        />

        {}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.07]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(74,222,128,0.8)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {}
        <div className="mx-auto max-w-7xl w-full relative z-10 flex flex-col lg:flex-row lg:items-stretch">
          {}
          <motion.div
            className="relative w-full px-4 pb-6 lg:w-[52%] lg:px-6"
            style={{ y: heroY, opacity: heroOpacity }}
          >
            <div className="liquid-glass-strong relative flex min-h-[80vh] flex-col rounded-3xl p-6 lg:min-h-[640px] lg:p-10 overflow-hidden">
              {}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-40"
                style={{
                  background: "radial-gradient(ellipse 70% 50% at 0% 0%, rgba(16,185,129,0.2) 0%, transparent 70%)",
                }}
              />

              <div className="relative flex flex-1 flex-col items-start justify-center gap-7 lg:gap-9">
                {}
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="liquid-glass rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/70">
                    AI & Data Science · 2023–2027
                  </span>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
                </motion.div>

                {}
                <motion.h1
                  className="leading-[1.01] tracking-[-0.055em] text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <CharReveal text="Engineering the" className="text-5xl lg:text-7xl" />
                  <br />
                  <motion.em
                    className="font-serif-accent aurora-text block text-5xl lg:text-7xl"
                    initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    intelligence
                  </motion.em>
                  <CharReveal text="behind tomorrow" className="text-5xl lg:text-7xl" />
                </motion.h1>

                {}
                <motion.p
                  className="max-w-xs text-sm leading-relaxed text-white/65"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.55 }}
                >
                  AI & DS undergrad building ML models, NLP pipelines & full stack apps from Coimbatore, India.
                </motion.p>

                {}
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.92, duration: 0.55 }}
                >
                  <MagneticBtn>
                    <Link
                      to="/projects"
                      className="liquid-glass-strong group relative flex items-center gap-3 overflow-hidden rounded-full py-2 pl-5 pr-2 text-sm text-white"
                    >
                      <span>Explore Work</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30">
                        <ArrowRight className="h-4 w-4 text-emerald-400 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </MagneticBtn>
                  <MagneticBtn>
                    <a
                      href={resumePdf}
                      download="Gowsic_M_S_Resume.pdf"
                      className="liquid-glass group flex items-center gap-3 rounded-full py-2 pl-5 pr-2 text-sm text-white"
                    >
                      <span>Download CV</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                        <Download className="h-4 w-4 text-white" />
                      </span>
                    </a>
                  </MagneticBtn>
                </motion.div>

                {}
                <motion.div className="flex flex-wrap gap-2">
                  {[
                    { label: "ML & AI", icon: <Brain className="h-3 w-3" /> },
                    { label: "NLP Systems", icon: <Zap className="h-3 w-3" /> },
                    { label: "Full Stack", icon: <Code2 className="h-3 w-3" /> },
                  ].map(({ label, icon }, i) => (
                    <motion.span
                      key={label}
                      className="liquid-glass flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs text-white/80"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.05 + i * 0.09, duration: 0.4, type: "spring", stiffness: 300, damping: 15 }}
                      whileHover={{ scale: 1.1, transition: { duration: 0.15 } }}
                    >
                      <span className="text-emerald-400">{icon}</span>
                      {label}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

              {}
              <motion.div
                className="relative mt-10 border-t border-white/5 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <p className="font-mono-accent text-[10px] uppercase tracking-[0.32em] text-white/40">Building Intelligence</p>
                <p className="mt-3 max-w-md text-base leading-snug text-white/80">
                  We turn <em className="font-serif-accent text-emerald-400">raw data</em> into real solutions.
                </p>
                <div className="mt-4 flex items-center gap-3 font-mono-accent text-[10px] tracking-[0.3em] text-white/35">
                  <span className="h-px flex-1 bg-white/15" /> GOWSIC M S <span className="h-px flex-1 bg-white/15" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {}
          <motion.div
            className="relative flex w-full flex-col gap-6 px-4 pb-6 lg:w-[48%] lg:px-2 lg:pr-6 lg:pb-6 justify-center"
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transform: `translate(${parallax.x * -8}px, ${parallax.y * -4}px)`,
            }}
          >
            {}
            <motion.div
              className="flex flex-wrap items-center justify-between gap-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { href: "https://github.com/gowsicms45", label: "GitHub", icon: <Github className="h-3.5 w-3.5 text-white/90" />, hoverColor: "hover:text-white" },
                  { href: "https://www.linkedin.com/in/gowsicms", label: "LinkedIn", icon: <Linkedin className="h-3.5 w-3.5 text-blue-400" />, hoverColor: "hover:text-blue-400" },
                ].map(({ href, label, icon, hoverColor }, i) => (
                  <motion.a
                    key={label}
                    aria-label={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className={`liquid-glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-white/70 transition-all ${hoverColor}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.52 + i * 0.1, type: "spring", stiffness: 350, damping: 16 }}
                    whileHover={{ scale: 1.08, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {icon}
                    <span>{label}</span>
                  </motion.a>
                ))}
              </div>
              <Link
                to="/contact"
                className="liquid-glass-strong flex items-center gap-2 rounded-full px-4 py-2 text-xs text-white transition-transform hover:scale-105"
              >
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> Connect Live
              </Link>
            </motion.div>

            {}
            <TiltCard delay={0.52}>
              <div className="liquid-glass-strong w-full rounded-3xl p-5 holo-card">
                <TypewriterStats />
              </div>
            </TiltCard>

            {}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.82, duration: 0.6 }}
            >
              <div className="liquid-glass rounded-[2rem] p-3">
                <div className="flex gap-3">
                  {[
                    { icon: <Wand2 className="h-8 w-8 text-emerald-400" />, title: "AI & ML", sub: "7 Projects", color: "from-emerald-500/10 to-teal-500/5" },
                    { icon: <BookOpen className="h-8 w-8 text-blue-400" />, title: "NPTEL Elite", sub: "93% · HCI", color: "from-blue-500/10 to-cyan-500/5" },
                  ].map(({ icon, title, sub, color }, i) => (
                    <TiltCard key={title} delay={0.88 + i * 0.1} maxDeg={8} className="flex-1">
                      <div className={`liquid-glass h-full rounded-3xl p-4 bg-gradient-to-br ${color}`}>
                        {icon}
                        <p className="mt-3 text-sm text-white">{title}</p>
                        <p className="text-xs text-white/60">{sub}</p>
                      </div>
                    </TiltCard>
                  ))}
                </div>

                <motion.div
                  className="liquid-glass mt-3 flex items-center gap-4 rounded-3xl p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.05, duration: 0.55 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <div className="liquid-glass flex h-16 w-24 items-center justify-center rounded-2xl text-emerald-400/80">
                    <Brain className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Full Stack + AI Developer</p>
                    <p className="font-mono-accent text-xs text-white/55">React · Node.js · MongoDB · Python</p>
                  </div>
                  <button aria-label="More details" className="liquid-glass flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-transform hover:scale-105 hover:text-emerald-400">
                    <Plus className="h-4 w-4" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {}
        <motion.div
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <span className="font-mono-accent text-[9px] uppercase tracking-[0.35em] text-white/30">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4 text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {}
      <div className="relative overflow-hidden border-t border-white/5 py-5">
        <div className="flex gap-8 marquee-track whitespace-nowrap">
          {[...Array(3)].map((_, ri) =>
            ["Python · ML · NLP · React.js · Node.js · MongoDB · TensorFlow · spaCy · Scikit-learn · BART · Hugging Face · Prompt Engineering · REST APIs · Git · AWS · Generative AI · Data Science · Full Stack"].map((t, i) => (
              <span key={`${ri}-${i}`} className="font-mono-accent text-[10px] uppercase tracking-[0.3em] text-white/25 px-6">
                {t}
                <span className="mx-3 text-emerald-500/50">✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {}
      <div className="px-6 py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {}
          <motion.p
            className="font-mono-accent mb-8 text-center text-[10px] uppercase tracking-[0.35em] text-white/35"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            By the numbers
          </motion.p>

          {}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCounter target={7} suffix="+" label="Projects Built" delay={0} />
            <StatCounter target={93} suffix="%" label="NPTEL Score" delay={0.1} />
            <StatCounter target={834} suffix="" label="CGPA × 100" delay={0.2} />
            <StatCounter target={4} suffix="th" label="Year · AI & DS" delay={0.3} />
          </div>

          {}
          <motion.div
            className="mt-6 liquid-glass-strong rounded-2xl p-4 flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 pulse-dot" />
            <span className="font-mono-accent text-xs uppercase tracking-widest text-white/60">Currently Building</span>
            <span className="ml-auto flex items-center gap-2 text-xs text-white/50">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              AI-powered portfolio · Next-gen NLP tools
            </span>
          </motion.div>
        </div>
      </div>

      {}
      <div className="relative overflow-hidden border-t border-white/5 py-5 mb-8">
        <div className="flex gap-8 marquee-track-reverse whitespace-nowrap">
          {[...Array(3)].map((_, ri) =>
            ["Open Source · Internships · AI Native · Coimbatore · Tamil Nadu · India · CGPA 8.34 · ML Engineer · NLP Specialist · Full Stack Dev · React Native · Deep Learning"].map((t, i) => (
              <span key={`${ri}-${i}`} className="font-mono-accent text-[10px] uppercase tracking-[0.3em] text-white/20 px-6">
                {t}
                <span className="mx-3 text-blue-500/40">◆</span>
              </span>
            ))
          )}
        </div>
      </div>
    </>
  );
}


function TiltCard({ children, delay = 0, maxDeg = 12, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  maxDeg?: number;
  className?: string;
}) {
  const ref = useTilt(maxDeg);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}


function MagneticBtn({ children }: { children: React.ReactNode }) {
  const ref = useMagnetic(0.32);
  return <div ref={ref} style={{ display: "inline-block" }}>{children}</div>;
}


function TypewriterStats() {
  const role = useTypewriter(
    ["Open to Internships", "AI/ML Engineer", "Full Stack Dev", "NLP Specialist"],
    72, 2000
  );
  return (
    <>
      <p className="text-sm font-medium text-white">Quick Stats</p>
      <p className="font-mono-accent mt-1 text-xs text-white/60">CGPA 8.34 · 7+ Projects · NPTEL 93%</p>
      <motion.span
        className="liquid-glass mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono-accent text-[10px] uppercase tracking-widest text-emerald-400 min-w-[170px]"
        animate={{ boxShadow: ["0 0 0 0 rgba(74,222,128,0)", "0 0 10px 2px rgba(74,222,128,0.2)", "0 0 0 0 rgba(74,222,128,0)"] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" />
        {role}<span className="animate-pulse opacity-70">|</span>
      </motion.span>
    </>
  );
}


