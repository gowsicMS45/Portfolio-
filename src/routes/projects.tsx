import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useRef, useCallback } from "react";
import {
  ArrowRight, Brain, FileText, Flame, Heart, Link as LinkIcon,
  Network, Scale, type LucideIcon, Sparkles, Code, Terminal,
  CheckCircle, Github, X, ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHead } from "@/components/site/PageHead";
import { useTilt } from "@/hooks/useCreativeAnimations";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Gowsic M S" },
      { name: "description", content: "AI, NLP, Full Stack and IoT projects built by Gowsic M S — 5G SON Dashboard, DiabetAI, FinBriefAI, LexAI, NexLink and more." },
      { property: "og:title", content: "Projects — Gowsic M S" },
      { property: "og:description", content: "Things I've built — AI, NLP, Full Stack and IoT." },
    ],
  }),
  component: Projects,
});

type Project = {
  icon: LucideIcon;
  category: string;
  filter: "AI/ML" | "NLP" | "Full Stack" | "IoT";
  title: string;
  stack: string;
  description: string;
  stats?: string[];
  tech: string[];
  github?: string;
  note?: string;
  challenge: string;
  solution: string;
  result: string;
  accentColor: string;
};

const projects: Project[] = [
  {
    icon: Network, category: "AI · Network", filter: "AI/ML",
    title: "5G SON Dashboard", stack: "Python · Streamlit · NetworkX",
    description: "Interactive 5G network simulation with 12 gNB nodes. Dijkstra-based auto-rerouting for congestion resolution. AI Auto Heal monitors and restores node health automatically. Includes heatmap tab.",
    stats: ["12 gNB Nodes"],
    tech: ["Python", "Streamlit", "NetworkX", "Matplotlib", "Pandas"],
    github: "https://github.com/gowsicms45/NextGen-Ai-_project",
    accentColor: "rgba(16,185,129,0.15)",
    challenge: "Visualizing and dynamically managing 5G cell network congestion on 12 gNB nodes in real-time without causing connection dropouts.",
    solution: "Developed a Python simulation with NetworkX for topological analysis and Dijkstra's algorithm for automatic, dynamic packet rerouting away from high-traffic channels.",
    result: "Enabled an AI Auto Heal agent that automatically monitors cell status and recovers congested nodes, visualized on an interactive Streamlit heatmap.",
  },
  {
    icon: Heart, category: "ML · Healthcare", filter: "AI/ML",
    title: "DiabetAI", stack: "Python · Scikit-learn · SMOTE",
    description: "ML classifier on PIMA Indians dataset (768 patients). Random Forest achieved 81.2% accuracy and 0.87 ROC-AUC. Applied SMOTE for class balancing. Interactive UI with sliders, probability gauge, and clinical risk advice.",
    stats: ["81.2% Accuracy", "0.87 ROC-AUC"],
    tech: ["Python", "Random Forest", "SMOTE", "Scikit-learn", "Pandas"],
    github: "https://github.com/gowsicms45/NLP",
    accentColor: "rgba(239,68,68,0.12)",
    challenge: "Accurately classifying diabetes risk on clinical data (PIMA Indians dataset) which suffers from heavy class imbalance.",
    solution: "Applied SMOTE (Synthetic Minority Over-sampling Technique) to balance the data, trained a Random Forest model, and designed a custom probability mapping algorithm.",
    result: "Achieved 81.2% classification accuracy (0.87 ROC-AUC) and built a slider-based patient risk input UI complete with real-time clinical risk recommendations.",
  },
  {
    icon: FileText, category: "NLP · Finance", filter: "NLP",
    title: "FinBriefAI", stack: "Python · BART · Hugging Face",
    description: "Financial news abstractive summarization using BART-large-CNN fine-tuned on CNN/DailyMail dataset. Evaluates outputs using ROUGE-1, ROUGE-2, and ROUGE-L metrics.",
    tech: ["Python", "BART", "Hugging Face", "ROUGE"],
    github: "https://github.com/gowsicms45/NLP",
    accentColor: "rgba(59,130,246,0.12)",
    challenge: "Condensing verbose financial news articles into abstractive, readable summaries without losing critical numerical, regulatory, or market context.",
    solution: "Leveraged a pre-trained BART-large-CNN transformer model using Hugging Face pipelines, optimizing inference speed and fine-tuning prompt contexts for financial text.",
    result: "Implemented ROUGE metric evaluations (ROUGE-1, ROUGE-2, ROUGE-L) to mathematically verify semantic fidelity, tested on actual earnings call transcripts.",
  },
  {
    icon: Scale, category: "NLP · Legal", filter: "NLP",
    title: "LexAI", stack: "Python · spaCy · CUAD Dataset",
    description: "Legal contract analysis system extracting 8 clause types. Uses spaCy NER for ORG, DATE, MONEY, GPE entities. 92% accuracy on party name detection. Benchmarked on 13,000+ CUAD contracts.",
    stats: ["92% Party Name Accuracy"],
    tech: ["Python", "spaCy", "CUAD", "Regex", "Pandas"],
    github: "https://github.com/gowsicms45/NLP",
    accentColor: "rgba(139,92,246,0.12)",
    challenge: "Extracting specific clause structures (governing law, termination terms, etc.) from dense, complex legal contracts with high accuracy.",
    solution: "Built a customized NLP extraction pipeline utilizing spaCy's Named Entity Recognition (NER) combined with regular expression post-processing.",
    result: "Achieved 92% accuracy on party name detection benchmarked across the 13,000+ contracts in the CUAD dataset, inspired by JPMorgan's NLP contract pipeline.",
  },
  {
    icon: LinkIcon, category: "Full Stack", filter: "Full Stack",
    title: "NexLink — AI URL Shortener", stack: "Node.js · Express.js · MongoDB",
    description: "Full stack URL shortener with JWT authentication, click analytics dashboard, and QR code generation. RESTful API architecture.",
    tech: ["Node.js", "Express", "MongoDB", "JWT", "REST API"],
    github: "https://github.com/gowsicms45/katomaran-url-shortener-Nexlink",
    accentColor: "rgba(6,182,212,0.12)",
    challenge: "Developing a performant URL shortener capable of real-time redirection and tracking visitor analytics securely.",
    solution: "Created a Node.js/Express RESTful backend with MongoDB storage, JWT-based user authentication, and dynamic SVG QR code generators.",
    result: "Delivered a complete, responsive analytics dashboard showcasing click statistics, device types, and geographical user distribution.",
  },
  {
    icon: Brain, category: "DL · Computer Vision", filter: "AI/ML",
    title: "LeafScan AI", stack: "Python · FastAPI · OpenCV · GCP",
    description: "Computer-vision application detecting 38+ plant leaf diseases from images. Achieves 94% top-3 classification accuracy on the PlantVillage dataset. Deployed containerized FastAPI on GCP Compute Engine.",
    stats: ["94% Accuracy", "38+ Diseases"],
    tech: ["Python", "FastAPI", "OpenCV", "TensorFlow", "GCP", "Docker", "Nginx", "PM2"],
    github: "https://github.com/gowsicms45",
    accentColor: "rgba(52,211,153,0.12)",
    challenge: "Detecting 38+ distinct plant diseases accurately from diverse, real-world leaf images containing varied lighting and background noise.",
    solution: "Built a deep learning computer-vision model trained on the PlantVillage dataset, integrated OpenCV for image pre-processing, and wrapped it in a high-performance FastAPI backend.",
    result: "Achieved 94% top-3 classification accuracy and deployed the containerized app on GCP Compute Engine using Nginx and PM2 for production-grade reliability.",
  },
  {
    icon: Flame, category: "IoT · Embedded", filter: "IoT",
    title: "Gas Leakage Smart Detector", stack: "Arduino · MQ-2 · Servo Motor",
    description: "IoT safety device detecting LPG gas leaks via MQ-2 sensor. Automatically shuts gas regulator using servo motor. Activates buzzer and exhaust fan. B.Tech Mini Project 2025.",
    tech: ["Arduino", "MQ-2 Sensor", "Servo Motor", "Embedded C"],
    note: "B.Tech Mini Project · Apr 2025",
    accentColor: "rgba(251,146,60,0.12)",
    challenge: "Mitigating domestic gas leak hazards by detecting LPG leakage and physically shutting off the gas supply without manual intervention.",
    solution: "Programmed an Arduino microcontroller wired to an MQ-2 analog gas sensor and a high-torque servo motor attached to the gas regulator valve.",
    result: "Automatically shuts down the regulator, rings a physical buzzer alarm, and spins an exhaust ventilation fan immediately upon leak detection (Submitted as B.Tech Mini Project 2025).",
  },
  {
    icon: Brain, category: "Deep Learning", filter: "AI/ML",
    title: "Deep Learning Lab Experiments", stack: "Python · TensorFlow · Google Colab",
    description: "Academic deep learning experiments covering CNNs, RNNs, and transfer learning. Documented model architectures with results.",
    tech: ["Python", "TensorFlow", "NumPy", "Google Colab"],
    github: "https://github.com/gowsicms45/deep-learning-lab-experiments",
    accentColor: "rgba(168,85,247,0.12)",
    challenge: "Building, training, and systematically comparison-testing CNN and RNN architectures for image and sequence datasets.",
    solution: "Designed and trained Convolutional Neural Networks (CNNs) and Recurrent Neural Networks (RNNs) in TensorFlow, utilizing GPU runtimes on Google Colab.",
    result: "Successfully documented model training metrics, validation losses, confusion matrices, and transfer learning performance on custom datasets.",
  },
];

const tabs = ["All", "AI/ML", "NLP", "Full Stack", "IoT"] as const;


function SpotlightCard({ children, className = "", accentColor }: {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRef = useTilt(8);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--x", `${x}%`);
    card.style.setProperty("--y", `${y}%`);
  }, []);

  return (
    <div ref={tiltRef} style={{ perspective: 1000, transformStyle: "preserve-3d" }}>
      <div
        ref={cardRef}
        className={`spotlight-card ${className}`}
        onMouseMove={handleMouseMove}
        style={{ "--accent": accentColor } as any}
      >
        {children}
      </div>
    </div>
  );
}

function Projects() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const visible = useMemo(
    () => (tab === "All" ? projects : projects.filter((p) => p.filter === tab)),
    [tab]
  );

  return (
    <section className="min-h-screen px-6 pt-28 pb-16 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <PageHead label="projects">
            Things I've <em className="font-serif-accent aurora-text">built</em>
          </PageHead>
        </motion.div>

        {/* Impact numbers strip */}
        <motion.div
          className="mt-6 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {[
            { label: "7+ Projects", color: "text-emerald-400" },
            { label: "4 Categories", color: "text-blue-400" },
            { label: "15+ Technologies", color: "text-purple-400" },
            { label: "1 Published Internship", color: "text-amber-400" },
          ].map(({ label, color }) => (
            <span key={label} className={`liquid-glass font-mono-accent rounded-full px-3 py-1 text-[10px] uppercase tracking-widest ${color}`}>
              {label}
            </span>
          ))}
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="mt-8 flex flex-wrap gap-2 relative"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5 }}
        >
          {tabs.map((t, i) => (
            <motion.button
              key={t}
              onClick={() => setTab(t)}
              className={`relative rounded-full px-4 py-2 text-xs transition-colors cursor-pointer ${t === tab ? "text-white" : "text-white/65 hover:text-white"}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.22 + i * 0.06 }}
              whileTap={{ scale: 0.94 }}
            >
              {t === tab && (
                <motion.span
                  layoutId="project-tab"
                  className="absolute inset-0 rounded-full liquid-glass-strong"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{t}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Cards grid — bento layout */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => {
              const Icon = p.icon;
              const isFeatured = i === 0;
              return (
                <SpotlightCard
                  key={p.title}
                  accentColor={p.accentColor}
                  className={`${isFeatured ? "md:col-span-2 lg:col-span-2" : ""}`}
                >
                  <motion.article
                    custom={i}
                    initial={{ opacity: 0, y: 50, rotateX: -18, scale: 0.88, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)", transition: { delay: i * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] } }}
                    exit={{ opacity: 0, scale: 0.88, y: -20, transition: { duration: 0.22 } }}
                    layout
                    onClick={() => setSelectedProject(p)}
                    className="liquid-glass-strong flex flex-col rounded-3xl p-6 cursor-pointer group h-full relative overflow-hidden"
                    whileTap={{ scale: 0.98 }}
                    style={{ background: `linear-gradient(135deg, ${p.accentColor} 0%, rgba(0,0,0,0) 60%)` }}
                  >
                    {/* Glow accent inside card */}
                    <div
                      className="absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl opacity-30 pointer-events-none"
                      style={{ background: p.accentColor.replace("0.12", "0.8") }}
                    />

                    <div className="relative flex items-start justify-between">
                      <motion.span
                        className="liquid-glass flex h-11 w-11 items-center justify-center rounded-2xl text-white/80"
                        whileHover={{ rotate: 15, scale: 1.12, transition: { duration: 0.2 } }}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.span>
                      <span className="liquid-glass rounded-full px-3 py-1 font-mono-accent text-[10px] uppercase tracking-widest text-white/55">
                        {p.category}
                      </span>
                    </div>

                    <h3 className="relative mt-4 text-lg font-medium text-white group-hover:text-emerald-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="relative font-mono-accent mt-1 text-xs text-white/50">{p.stack}</p>
                    <p className="relative mt-3 text-sm leading-relaxed text-white/65 line-clamp-3">{p.description}</p>

                    {(p.stats?.length ?? 0) > 0 && (
                      <div className="relative mt-4 flex flex-wrap gap-2">
                        {p.stats!.map((s) => (
                          <span key={s} className="liquid-glass rounded-full px-3 py-1 text-xs text-white/80 font-medium">
                            ✦ {s}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="relative mt-4 flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span key={t} className="liquid-glass rounded-full px-2.5 py-1 font-mono-accent text-[10px] text-white/55">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="relative mt-auto pt-5 flex items-center justify-between">
                      <motion.span
                        className="text-xs text-emerald-400 font-medium inline-flex items-center gap-1.5"
                        whileHover={{ x: 3, transition: { duration: 0.15 } }}
                      >
                        Case Study <ArrowRight className="h-3 w-3" />
                      </motion.span>
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="liquid-glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-white/65 hover:text-white transition-colors"
                        >
                          <Github className="h-3 w-3" /> GitHub
                        </a>
                      )}
                    </div>
                  </motion.article>
                </SpotlightCard>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Side panel modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProject(null)}
            />

            {/* Panel */}
            <motion.aside
              className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-xl liquid-glass-strong border-l border-white/8 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              style={{
                background: `linear-gradient(135deg, rgba(4,10,7,0.92) 0%, ${selectedProject.accentColor.replace("0.12", "0.18")} 100%)`,
              }}
            >
              {/* Panel header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/8 bg-black/30 backdrop-blur-xl p-6">
                <div className="flex items-center gap-3">
                  <span className="liquid-glass flex h-10 w-10 items-center justify-center rounded-2xl text-emerald-400">
                    {(() => { const Icon = selectedProject.icon; return <Icon className="h-5 w-5" />; })()}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-white">{selectedProject.title}</h2>
                    <p className="font-mono-accent text-xs text-white/50">{selectedProject.stack}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="liquid-glass flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:text-white transition-colors"
                  aria-label="Close panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Panel content */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <p className="text-sm leading-relaxed text-white/70">{selectedProject.description}</p>

                {/* Stats */}
                {(selectedProject.stats?.length ?? 0) > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stats!.map((s) => (
                      <span key={s} className="liquid-glass-strong rounded-full px-4 py-2 text-sm text-white font-medium">
                        ✦ {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* Technologies */}
                <div>
                  <p className="font-mono-accent text-[10px] uppercase tracking-widest text-white/35 mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <motion.span
                        key={t}
                        className="liquid-glass rounded-full px-3 py-1.5 text-xs text-white/80"
                        whileHover={{ scale: 1.08, transition: { duration: 0.12 } }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* CSR breakdown */}
                <div className="space-y-4 border-t border-white/8 pt-4">
                  {[
                    { color: "red", icon: <Terminal className="h-4 w-4" />, label: "The Challenge", text: selectedProject.challenge },
                    { color: "blue", icon: <Code className="h-4 w-4" />, label: "The Solution", text: selectedProject.solution },
                    { color: "emerald", icon: <CheckCircle className="h-4 w-4" />, label: "The Result", text: selectedProject.result },
                  ].map(({ color, icon, label, text }, i) => (
                    <motion.div
                      key={label}
                      className="flex gap-3"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                    >
                      <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-${color}-500/12 text-${color}-400`}>
                        {icon}
                      </span>
                      <div>
                        <h4 className={`font-mono-accent text-[10px] font-semibold uppercase tracking-widest text-${color}-400`}>{label}</h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-white/75">{text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer actions */}
                <div className="flex items-center justify-between border-t border-white/8 pt-4">
                  <span className="liquid-glass rounded-full px-3 py-1 font-mono-accent text-xs text-white/55">
                    {selectedProject.category}
                  </span>
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="liquid-glass-strong inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs text-white hover:scale-105 active:scale-95 transition-transform"
                    >
                      <Github className="h-3.5 w-3.5" />
                      View Source Code
                      <ExternalLink className="h-3 w-3 text-emerald-400" />
                    </a>
                  )}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
