import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { BarChart, Code, MessageSquare, Monitor, Server, Sparkles, Terminal, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHead } from "@/components/site/PageHead";
import { ScrollReveal, staggerContainer, blurRise } from "@/components/site/ScrollReveal";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Gowsic M S" },
      { name: "description", content: "AI/ML, NLP, Frontend, Backend, Data, and AI tools used by Gowsic M S to build intelligent systems." },
      { property: "og:title", content: "Skills — Gowsic M S" },
      { property: "og:description", content: "Tools used to build intelligent systems." },
    ],
  }),
  component: Skills,
});

type Cat = "AI/ML" | "NLP" | "Frontend" | "Backend" | "Data & Viz" | "Dev Tools" | "Languages" | "AI Tools";

type SkillItem = { name: string; level?: number };

const cats: { key: Cat; icon: typeof Wand2; color: string; accentColor: string; items: SkillItem[] }[] = [
  {
    key: "AI/ML", icon: Wand2, color: "from-emerald-500/20 to-teal-500/10", accentColor: "rgba(16,185,129,0.6)",
    items: [
      { name: "Scikit-learn", level: 88 },
      { name: "Random Forest", level: 85 },
      { name: "SMOTE", level: 80 },
      { name: "TensorFlow", level: 72 },
      { name: "BART", level: 75 },
      { name: "Hugging Face", level: 78 },
      { name: "Prompt Engineering", level: 90 },
      { name: "Generative AI", level: 82 },
    ],
  },
  {
    key: "NLP", icon: MessageSquare, color: "from-blue-500/20 to-cyan-500/10", accentColor: "rgba(59,130,246,0.6)",
    items: [
      { name: "spaCy", level: 85 },
      { name: "ROUGE Metrics", level: 80 },
      { name: "NER", level: 88 },
      { name: "Text Summarization", level: 82 },
      { name: "CUAD Dataset", level: 75 },
    ],
  },
  {
    key: "Frontend", icon: Monitor, color: "from-purple-500/20 to-pink-500/10", accentColor: "rgba(168,85,247,0.6)",
    items: [
      { name: "React.js", level: 88 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 92 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Streamlit", level: 82 },
      { name: "Flexbox", level: 94 },
      { name: "CSS Grid", level: 90 },
    ],
  },
  {
    key: "Backend", icon: Server, color: "from-orange-500/20 to-amber-500/10", accentColor: "rgba(249,115,22,0.6)",
    items: [
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 80 },
      { name: "REST APIs", level: 88 },
      { name: "JWT Auth", level: 78 },
      { name: "MongoDB", level: 80 },
    ],
  },
  {
    key: "Languages", icon: Code, color: "from-rose-500/20 to-red-500/10", accentColor: "rgba(244,63,94,0.6)",
    items: [
      { name: "Python", level: 92 },
      { name: "JavaScript", level: 85 },
      { name: "Java", level: 70 },
    ],
  },
  {
    key: "Data & Viz", icon: BarChart, color: "from-yellow-500/20 to-lime-500/10", accentColor: "rgba(234,179,8,0.6)",
    items: [
      { name: "Pandas", level: 88 },
      { name: "NumPy", level: 85 },
      { name: "Matplotlib", level: 82 },
      { name: "Seaborn", level: 78 },
      { name: "NetworkX", level: 80 },
    ],
  },
  {
    key: "AI Tools", icon: Sparkles, color: "from-violet-500/20 to-indigo-500/10", accentColor: "rgba(139,92,246,0.6)",
    items: [
      { name: "Claude", level: 95 },
      { name: "ChatGPT", level: 93 },
      { name: "Gemini", level: 88 },
      { name: "GitHub Copilot", level: 90 },
      { name: "Cursor AI", level: 92 },
      { name: "Lovable", level: 88 },
    ],
  },
  {
    key: "Dev Tools", icon: Terminal, color: "from-slate-500/20 to-gray-500/10", accentColor: "rgba(100,116,139,0.6)",
    items: [
      { name: "Git", level: 88 },
      { name: "GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 82 },
      { name: "Arduino IDE", level: 75 },
    ],
  },
];

const tabs = ["All", "AI/ML", "NLP", "Frontend", "Backend", "Data & Viz", "Dev Tools"] as const;


function Skills() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const visible = useMemo(
    () => (tab === "All" ? cats : cats.filter((c) => c.key === tab)),
    [tab]
  );

  return (
    <section className="min-h-screen px-6 pt-28 pb-16 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <PageHead label="skills">
            Tools I use to build <br />
            <em className="font-serif-accent aurora-text">intelligent systems</em>
          </PageHead>
        </motion.div>

        {}
        <motion.div
          className="mt-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex gap-3 marquee-track whitespace-nowrap">
            {[...Array(3)].map((_, ri) =>
              cats.flatMap((c) => c.items.slice(0, 3)).map((item, i) => (
                <span
                  key={`${ri}-${i}`}
                  className="liquid-glass rounded-full px-4 py-2 font-mono-accent text-[10px] uppercase tracking-widest text-white/45 flex-shrink-0"
                >
                  {item.name}
                </span>
              ))
            )}
          </div>
        </motion.div>

        {}
        <motion.div
          className="mt-8 flex flex-wrap gap-2 relative"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {tabs.map((t, i) => (
            <motion.button
              key={t}
              onClick={() => setTab(t)}
              className={`relative rounded-full px-4 py-2 text-xs cursor-pointer transition-colors ${t === tab ? "text-white" : "text-white/65 hover:text-white"}`}
              initial={{ opacity: 0, y: -16, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.06, type: "spring", stiffness: 300, damping: 20 }}
              whileTap={{ scale: 0.92 }}
            >
              {t === tab && (
                <motion.span
                  layoutId="skills-tab"
                  className="absolute inset-0 rounded-full liquid-glass-strong"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{t}</span>
            </motion.button>
          ))}
        </motion.div>

        {}
        <div className="mt-10 gap-4 lg:columns-3 md:columns-2 [&>*]:mb-4 [&>*]:break-inside-avoid">
          <AnimatePresence mode="popLayout">
            {visible.map(({ key, icon: Icon, color, accentColor, items }, ci) => (
              <motion.div
                key={key}
                layout
                initial={{ opacity: 0, y: 50, rotateX: -20, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, y: -20, transition: { duration: 0.22 } }}
                transition={{ delay: ci * 0.07, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                style={{ perspective: 1000, transformStyle: "preserve-3d" }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
              >
                <motion.div
                  className={`liquid-glass-strong rounded-3xl p-6 bg-gradient-to-br ${color}`}
                  whileHover={{
                    y: -6,
                    rotateY: 2,
                    transition: { duration: 0.25, ease: "easeOut" },
                  }}
                  style={{ borderTop: `1px solid ${accentColor.replace("0.6", "0.25")}` }}
                >
                  {}
                  <div className="flex items-center gap-3 mb-5">
                    <motion.span
                      className="liquid-glass flex h-9 w-9 items-center justify-center rounded-2xl"
                      style={{ color: accentColor.replace("0.6", "0.9") }}
                      whileHover={{ rotate: 22, scale: 1.18, transition: { duration: 0.2 } }}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.span>
                    <p className="text-sm font-medium text-white">{key}</p>
                    <span className="ml-auto font-mono-accent text-xs text-white/30">{items.length}</span>
                  </div>

                  {}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {items.map((s, si) => (
                      <motion.span
                        key={s.name}
                        className="liquid-glass rounded-full px-3 py-1.5 text-xs text-white/80"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: ci * 0.05 + si * 0.03,
                          duration: 0.35,
                          type: "spring",
                          stiffness: 300,
                          damping: 18,
                        }}
                        whileHover={{ scale: 1.08, y: -2, transition: { duration: 0.12 } }}
                      >
                        {s.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
