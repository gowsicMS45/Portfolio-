import { createFileRoute } from "@tanstack/react-router";
import { Award, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { PageHead } from "@/components/site/PageHead";
import { ScrollReveal } from "@/components/site/ScrollReveal";

export const Route = createFileRoute("/certs")({
  head: () => ({
    meta: [
      { title: "Certifications — Gowsic M S" },
      { name: "description", content: "NPTEL Elite (93%) in Human Computer Interaction and other certifications earned by Gowsic M S." },
      { property: "og:title", content: "Certifications — Gowsic M S" },
      { property: "og:description", content: "Credentials that define my learning." },
    ],
  }),
  component: Certs,
});

const badgeColor: Record<string, string> = {
  "NPTEL": "from-amber-500/20 to-yellow-500/10",
  "Google Cloud": "from-blue-500/20 to-cyan-500/10",
  "Workshop": "from-emerald-500/20 to-teal-500/10",
  "Industry": "from-purple-500/20 to-violet-500/10",
};

const certs = [
  { title: "Design & Implementation of HCI", issuer: "IIT Guwahati · NPTEL", meta: "56% · Pass · Jul–Oct 2025", badge: "NPTEL" },
  { title: "Introduction to Internet of Things", issuer: "NPTEL · Swayam", meta: "Completed", badge: "NPTEL" },
  { title: "Introduction to Generative AI", issuer: "Google Cloud · Simplilearn", meta: "Completed", badge: "Google Cloud" },
  { title: "Hands-on Training in Machine Learning", issuer: "Kongu Engineering College · EPOCH 2K25", meta: "01 Feb 2025", badge: "Workshop" },
  { title: "Data Analytics using Statistical Tools", issuer: "Karpagam College of Engineering", meta: "17 Oct 2024", badge: "Workshop" },
  { title: "AI & DS Internship", issuer: "GrowAITech", meta: "GATICNO0232 · Jun 2025", badge: "Industry" },
];

function Certs() {
  return (
    <section className="min-h-screen px-6 pt-28 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <PageHead label="certifications">
            Credentials that <br />
            <em className="font-serif-accent aurora-text">define my learning</em>
          </PageHead>
        </motion.div>

        {}
        <ScrollReveal variant="flipUp" className="mt-10">
          <motion.div
            className="liquid-glass-strong shimmer-border mx-auto max-w-2xl rounded-3xl bg-gradient-to-br from-amber-500/15 to-yellow-500/5 p-10 text-center"
            whileHover={{ scale: 1.015, transition: { duration: 0.25 } }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            >
              <Trophy className="mx-auto h-12 w-12 text-amber-400/80" />
            </motion.div>
            <p className="mt-4 font-mono-accent text-[10px] uppercase tracking-widest text-emerald-400">NPTEL Elite Achiever</p>
            <h2 className="mt-2 text-3xl font-medium text-white">Human Computer Interaction</h2>
            <p className="mt-2 text-sm text-white/60">IIIT Delhi · IIT Madras · NPTEL</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {[["93%", "Score"], ["Elite", "Grade"], ["4", "Credits"]].map(([n, l], i) => (
                <motion.div
                  key={l}
                  className="liquid-glass min-w-24 rounded-2xl p-4 text-center"
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, type: "spring", stiffness: 300, damping: 16 }}
                  whileHover={{ scale: 1.1, y: -4, transition: { duration: 0.18 } }}
                >
                  <p className="text-2xl font-medium text-white">{n}</p>
                  <p className="mt-1 font-mono-accent text-[9px] uppercase tracking-widest text-white/40">{l}</p>
                </motion.div>
              ))}
            </div>
            <p className="mt-4 font-mono-accent text-[10px] uppercase tracking-widest text-white/40">Jan – Apr 2026</p>
          </motion.div>
        </ScrollReveal>

        {}
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {certs.map((c, i) => {
            const variant = i % 3 === 0 ? "swipeRight" : i % 3 === 1 ? "flipUp" : "swipeLeft";
            const color = badgeColor[c.badge] ?? "from-white/10 to-white/5";
            return (
              <ScrollReveal key={c.title} variant={variant as any} delay={i * 0.07}>
                <motion.article
                  className={`liquid-glass-strong rounded-3xl p-6 bg-gradient-to-br ${color} h-full`}
                  whileHover={{
                    scale: 1.04,
                    y: -6,
                    rotateX: 3,
                    transition: { duration: 0.22 },
                  }}
                  style={{ perspective: 800, transformStyle: "preserve-3d" }}
                >
                  <div className="flex items-start justify-between">
                    <motion.span
                      className="liquid-glass flex h-10 w-10 items-center justify-center rounded-2xl text-white/70"
                      whileHover={{ rotate: 20, scale: 1.15, transition: { duration: 0.2 } }}
                    >
                      <Award className="h-4 w-4" />
                    </motion.span>
                    <span className="liquid-glass rounded-full px-3 py-1 font-mono-accent text-[9px] uppercase tracking-widest text-white/60">{c.badge}</span>
                  </div>
                  <h3 className="mt-4 text-base font-medium text-white">{c.title}</h3>
                  <p className="mt-1 text-xs text-white/60">{c.issuer}</p>
                  <p className="mt-2 font-mono-accent text-[10px] uppercase tracking-widest text-white/45">{c.meta}</p>
                </motion.article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
