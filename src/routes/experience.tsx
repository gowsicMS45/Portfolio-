import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PageHead } from "@/components/site/PageHead";
import { ScrollReveal } from "@/components/site/ScrollReveal";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Gowsic M S" },
      { name: "description", content: "Web Development Intern at GrowAITech and frontend tasks for Prodigy Infotech." },
      { property: "og:title", content: "Experience — Gowsic M S" },
      { property: "og:description", content: "Where I've worked." },
    ],
  }),
  component: Experience,
});

const xp = [
  {
    company: "GrowAITech (GAT)", role: "Web Development Intern",
    date: "Jun 2025", location: "Salem, Tamil Nadu",
    cert: "Certificate No. GATICNO0232",
    color: "from-emerald-500/15 to-teal-500/5",
    accent: "text-emerald-400",
    points: [
      "Built responsive e-commerce web interfaces using HTML, CSS, JavaScript",
      "Designed product listings, navigation bar and category-based UI components",
      "Integrated MongoDB for storing and retrieving product data (CRUD operations)",
      "Optimised layouts for mobile and desktop using Flexbox and CSS Grid",
      "Collaborated using Git and GitHub in structured team development workflow",
    ],
    tags: ["HTML", "CSS", "JavaScript", "MongoDB", "Git", "GitHub", "Flexbox"],
  },
  {
    company: "Prodigy Infotech", role: "Web Development Tasks",
    date: "2024", location: "Remote",
    color: "from-blue-500/15 to-cyan-500/5",
    accent: "text-blue-400",
    points: [
      "Completed 5 frontend tasks (PRODIGY_WD_01 to WD_05)",
      "Built sticky navbar with scroll effects",
      "Developed stopwatch application",
      "Created tic-tac-toe game with JS logic",
      "Built personal portfolio page",
      "Developed weather app with API integration",
      "All projects public on GitHub",
    ],
    tags: ["HTML", "CSS", "JavaScript", "GitHub", "API Integration", "Frontend"],
  },
];

function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  
  const headerY = useTransform(scrollYProgress, [0, 0.3], [-30, 0]);

  return (
    <section ref={sectionRef} className="min-h-screen px-6 pt-28 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ y: headerY }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <PageHead label="experience">
            Where I've <em className="font-serif-accent aurora-text">worked</em>
          </PageHead>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical line */}
          <motion.span
            className="absolute left-4 top-0 w-px bg-gradient-to-b from-emerald-500/60 via-blue-500/30 to-white/5 lg:left-1/2"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />

          <div className="space-y-16">
            {xp.map((x, i) => {
              const right = i % 2 === 1;
              return (
                <div key={x.company} className="relative">
                  {/* Dot on timeline */}
                  <motion.div
                    className="absolute left-4 top-8 -translate-x-1/2 lg:left-1/2"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 350, damping: 18 }}
                  >
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br ${x.color} ring-2 ring-white/20`}>
                      <span className={`h-2 w-2 rounded-full ${x.accent} bg-current`} />
                    </span>
                  </motion.div>

                  <div className={`pl-12 lg:pl-0 ${right ? "lg:ml-[54%]" : "lg:mr-[54%]"}`}>
                    <motion.article
                      className={`liquid-glass-strong rounded-3xl p-7 bg-gradient-to-br ${x.color}`}
                      initial={{
                        opacity: 0,
                        x: right ? 80 : -80,
                        rotateY: right ? -15 : 15,
                        scale: 0.9,
                      }}
                      whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
                      whileHover={{
                        scale: 1.02,
                        rotateY: right ? 2 : -2,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-lg font-semibold text-white">{x.company}</h3>
                        <motion.span
                          className="liquid-glass rounded-full px-3 py-1 font-mono-accent text-[10px] uppercase tracking-widest text-white/60"
                          initial={{ opacity: 0, scale: 0.7 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                        >
                          {x.date}
                        </motion.span>
                      </div>
                      <p className={`mt-1 text-sm font-medium ${x.accent}`}>{x.role}</p>
                      <p className="text-xs text-white/50">{x.location}</p>
                      {x.cert && (
                        <motion.span
                          className="liquid-glass mt-3 inline-block rounded-full px-3 py-1 font-mono-accent text-[10px] uppercase tracking-widest text-emerald-400/70"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                        >
                          ✦ {x.cert}
                        </motion.span>
                      )}

                      <div className="liquid-glass my-5 h-px" />

                      <ul className="space-y-2">
                        {x.points.map((p, pi) => (
                          <motion.li
                            key={p}
                            className="flex gap-2 text-sm text-white/65"
                            initial={{ opacity: 0, x: -16, filter: "blur(4px)" }}
                            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            viewport={{ once: true }}
                            transition={{ delay: pi * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <span className={`${x.accent} opacity-60`}>▸</span>
                            <span>{p}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {x.tags.map((t, ti) => (
                          <motion.span
                            key={t}
                            className="liquid-glass rounded-full px-3 py-1 text-xs text-white/70"
                            initial={{ opacity: 0, scale: 0.6, y: 10 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: ti * 0.06, duration: 0.35, type: "spring", stiffness: 300, damping: 16 }}
                            whileHover={{ scale: 1.1, transition: { duration: 0.12 } }}
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    </motion.article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal variant="flipUp" className="mt-24 mb-16">
          <motion.div
            className="liquid-glass-strong mx-auto max-w-2xl rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 p-10 text-center"
            whileHover={{ scale: 1.015, transition: { duration: 0.25 } }}
          >
            <h2 className="text-3xl font-medium text-white">Open to Opportunities</h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-white/60">
              Currently seeking internships in AI/ML, NLP, Full Stack Development, or Data Science.
              Available immediately and open to remote or Coimbatore-based roles.
            </p>
            <motion.div
              className="mt-6 inline-block"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="liquid-glass-strong inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm text-white"
              >
                Get In Touch <Mail className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
