import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, FileText, Download, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { PageHead } from "@/components/site/PageHead";
import gowsicPhoto from "@/assets/gowsic.jpg";
import resumePdf from "@/assets/resume.pdf";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useTilt, useCountUp } from "@/hooks/useCreativeAnimations";
import { ScrollReveal } from "@/components/site/ScrollReveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Gowsic M S" },
      { name: "description", content: "AI & Data Science undergrad at Dr. N.G.P. Institute of Technology, Coimbatore. CGPA 8.34, NPTEL Elite, GrowAITech intern." },
      { property: "og:title", content: "About — Gowsic M S" },
      { property: "og:description", content: "The mind behind the machine — AI-native developer from Coimbatore." },
      { property: "og:image", content: gowsicPhoto },
    ],
  }),
  component: About,
});

const timeline = [
  { title: "B.Tech — AI & Data Science", org: "Dr. N.G.P. Institute of Technology", meta: "2023 – 2027 · CGPA: 8.34", current: true, color: "bg-emerald-400" },
  { title: "HSC (12th Grade)", org: "A.K.T Matric Higher Secondary School", meta: "Kallakurichi", color: "bg-blue-400" },
  { title: "SSLC (10th Grade)", org: "Sacred Heart Convent Anglo Indian School", meta: "Villupuram", color: "bg-purple-400" },
];

const badges = [
  "🎓 Dr. N.G.P. Institute · 2023–2027",
  "🏆 NPTEL Elite · 93% · HCI",
  "💼 GrowAITech Intern · Jun 2025",
  "📍 Coimbatore, Tamil Nadu",
  "🧠 AI-Native Developer",
  "🐍 Python · React · Node.js",
];

function RevealSection({ children, className = "", direction = "up", delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  delay?: number;
}) {
  const { ref, inView } = useScrollAnimation({ threshold: 0.1 });
  const cls = direction === "up" ? "reveal" : direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : "reveal-scale";
  return (
    <div
      ref={ref}
      className={`${cls} ${inView ? "in-view" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delay}s` : "0s" }}
    >
      {children}
    </div>
  );
}

function TiltProfileCard({ children }: { children: React.ReactNode }) {
  const ref = useTilt(6);
  return (
    <div ref={ref} className="liquid-glass-strong rounded-3xl p-8 text-center" style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}

function AnimatedStat({ target, suffix = "", label, delay = 0, decimals = 0 }: {
  target: number; suffix?: string; label: string; delay?: number; decimals?: number;
}) {
  const { count, ref } = useCountUp(target, 1400);
  const displayValue = decimals > 0 ? (count / Math.pow(10, decimals)).toFixed(decimals) : count;
  return (
    <motion.div
      ref={ref as any}
      className="liquid-glass rounded-2xl p-3"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.45, type: "spring", stiffness: 280, damping: 18 }}
      whileHover={{ scale: 1.06, transition: { duration: 0.18 } }}
    >
      <p className="font-mono-accent text-2xl font-medium text-white">{displayValue}{suffix}</p>
      <p className="text-xs text-white/55">{label}</p>
    </motion.div>
  );
}

function About() {
  return (
    <section className="min-h-screen px-6 pt-28 pb-16 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <PageHead label="about">
            The mind behind <br />
            <em className="font-serif-accent aurora-text">the machine</em>
          </PageHead>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {}
          <RevealSection direction="left" delay={0.1}>
            <TiltProfileCard>
              {}
              <div className="relative mx-auto mb-6 flex h-40 w-40 items-center justify-center">
                {}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, rgba(74,222,128,0.9), rgba(59,130,246,0.7), rgba(139,92,246,0.7), rgba(74,222,128,0.9))",
                    padding: "2px",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                >
                  <div className="h-full w-full rounded-full bg-black/60" />
                </motion.div>

                {}
                <motion.div
                  className="absolute inset-3 rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(74,222,128,0.2) 0%, transparent 70%)" }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {}
                <motion.img
                  src={gowsicPhoto}
                  alt="Gowsic M S"
                  className="relative z-10 h-32 w-32 rounded-full object-cover"
                  style={{ boxShadow: "0 0 30px rgba(74,222,128,0.15)" }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.7, type: "spring", stiffness: 200, damping: 18 }}
                />
              </div>

              <h2 className="text-2xl font-medium text-white">Gowsic M S</h2>
              <p className="text-sm text-white/65">AI & DS · Full Stack Developer</p>
              <p className="mt-1 font-mono-accent text-xs text-white/45">📍 Coimbatore, Tamil Nadu</p>

              <div className="liquid-glass my-6 h-px w-full" />

              {}
              <div className="grid grid-cols-2 gap-3">
                <AnimatedStat target={834} suffix="" label="CGPA" decimals={2} delay={0.35} />
                <AnimatedStat target={7} suffix="+" label="Projects" delay={0.45} />
                <AnimatedStat target={7} suffix="+" label="Certs" delay={0.55} />
                <AnimatedStat target={1} suffix="" label="Internship" delay={0.65} />
              </div>

              {}
              <div className="mt-6 flex justify-center gap-3">
                {[
                  { href: "https://github.com/gowsicms45", label: "GitHub", icon: <Github className="h-4 w-4" /> },
                  { href: "https://www.linkedin.com/in/gowsic-m-s-ngp-727a192ba", label: "LinkedIn", icon: <Linkedin className="h-4 w-4" /> },
                  { href: "mailto:msgowsicneuro@gmail.com", label: "Email", icon: <Mail className="h-4 w-4" /> },
                ].map(({ href, label, icon }, i) => (
                  <motion.a
                    key={label}
                    aria-label={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-all hover:text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    whileHover={{ scale: 1.18, rotate: 8, transition: { duration: 0.15 } }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>

              {}
              <div className="mt-5 flex flex-wrap gap-3 justify-center">
                <motion.button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-resume"))}
                  className="liquid-glass-strong inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs text-white transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="h-3.5 w-3.5 text-emerald-400" /> View Resume
                </motion.button>
                <motion.a
                  href={resumePdf}
                  download="Gowsic_M_S_Resume.pdf"
                  className="liquid-glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs text-white/80 hover:text-white transition-transform hover:scale-105 active:scale-95"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </motion.a>
              </div>

              {}
              <motion.div
                className="mt-5 liquid-glass rounded-2xl p-3 flex items-center justify-center gap-2"
                animate={{ boxShadow: ["0 0 0 0 rgba(74,222,128,0)", "0 0 15px 3px rgba(74,222,128,0.15)", "0 0 0 0 rgba(74,222,128,0)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
                <span className="text-xs text-emerald-400 font-medium">Open to Internships</span>
                <span className="text-xs text-white/40">· Remote friendly</span>
              </motion.div>
            </TiltProfileCard>
          </RevealSection>

          {}
          <div className="flex flex-col gap-6">
            {}
            <ScrollReveal variant="swipeLeft" delay={0.1}>
              <div className="liquid-glass-strong rounded-3xl p-8 bg-gradient-to-br from-emerald-500/10 to-teal-500/5">
                <p className="font-mono-accent text-xs uppercase tracking-[0.32em] text-white/45">Who I Am</p>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-white/70">
                  <p>I'm Gowsic M S, an AI & Data Science undergraduate at Dr. N.G.P. Institute of Technology, Coimbatore (CGPA: 8.34). I build intelligent systems — from Diabetes Classifiers to Legal Contract Analyzers — combining ML, NLP, and Full Stack development.</p>
                  <p>Currently in my 4th year, I've worked as a Web Development Intern at GrowAITech, earned NPTEL Elite status (93%) in Human Computer Interaction from IIIT Delhi & IIT Madras, and built 7+ production-ready projects across AI, NLP, and Web.</p>
                  <p>I use tools like Claude, ChatGPT, GitHub Copilot, and Cursor AI to accelerate development — making me an AI-native developer by practice.</p>
                </div>
                <div className="liquid-glass my-6 h-px" />
                <div className="flex flex-wrap gap-2">
                  {badges.map((b, i) => (
                    <motion.span
                      key={b}
                      className="liquid-glass rounded-full px-4 py-2 text-xs text-white/80"
                      initial={{ opacity: 0, y: 20, scale: 0.75 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.08, duration: 0.45, type: "spring", stiffness: 280, damping: 18 }}
                      whileHover={{ scale: 1.08, y: -2, transition: { duration: 0.12 } }}
                    >
                      {b}
                    </motion.span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {}
            <ScrollReveal variant="springPop" delay={0.05}>
              <div className="liquid-glass rounded-3xl p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/5 relative overflow-hidden">
                <Quote className="absolute top-4 right-4 h-16 w-16 text-white/5" />
                <p className="font-serif-accent text-xl italic leading-relaxed text-white/85">
                  "The best intelligence is not born from data alone, but from the courage to ask{" "}
                  <span className="text-emerald-400">the right questions</span>."
                </p>
                <p className="font-mono-accent mt-3 text-[10px] uppercase tracking-[0.3em] text-white/35">— Design philosophy</p>
              </div>
            </ScrollReveal>

            {}
            <ScrollReveal variant="tiltIn" delay={0.2}>
              <div className="liquid-glass-strong rounded-3xl p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/5">
                <p className="font-mono-accent text-xs uppercase tracking-[0.32em] text-white/45">Education Path</p>
                <ol className="mt-6 space-y-0">
                  {timeline.map((t, i) => (
                    <motion.li
                      key={t.title}
                      className="relative pl-8"
                      initial={{ opacity: 0, x: 30, filter: "blur(6px)" }}
                      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {}
                      <motion.span
                        className={`absolute left-0 top-1.5 h-3 w-3 rounded-full ${t.color}`}
                        style={{ boxShadow: `0 0 8px currentColor` }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.1, type: "spring", stiffness: 400, damping: 16 }}
                      />

                      {}
                      {i < timeline.length - 1 && (
                        <motion.span
                          className="absolute left-[5px] top-5 w-px bg-gradient-to-b from-white/20 to-white/5"
                          style={{ height: "calc(100% + 1.5rem)" }}
                          initial={{ scaleY: 0, originY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.15 + 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}

                      <div className={`pb-8 ${i === timeline.length - 1 ? "pb-0" : ""}`}>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium text-white">{t.title}</p>
                          {t.current && (
                            <span className="liquid-glass rounded-full px-2.5 py-0.5 font-mono-accent text-[9px] uppercase tracking-widest text-emerald-400">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/65">{t.org}</p>
                        <p className="font-mono-accent text-xs text-white/40">{t.meta}</p>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>

            {}
            <ScrollReveal variant="springPop" delay={0.1}>
              <div className="liquid-glass flex flex-wrap items-center gap-3 rounded-2xl p-4">
                <span className="font-mono-accent text-[10px] uppercase tracking-widest text-white/40 mr-2">Languages</span>
                {[
                  { label: "English", level: "Proficient", color: "text-blue-400" },
                  { label: "Tamil", level: "Native", color: "text-emerald-400" },
                ].map((l) => (
                  <motion.span
                    key={l.label}
                    className="liquid-glass rounded-full px-3 py-1 text-xs text-white/70"
                    whileHover={{ scale: 1.08, transition: { duration: 0.12 } }}
                  >
                    {l.label} <span className={`${l.color} ml-1 font-medium`}>— {l.level}</span>
                  </motion.span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
