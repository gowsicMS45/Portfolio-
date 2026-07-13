import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LETTERS = ["G", "O", "W", "S", "I", "C"];

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"enter" | "reveal" | "exit">("enter");

  useEffect(() => {
    
    const start = performance.now();
    const duration = 1300;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      
      setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) requestAnimationFrame(tick);
      else setPhase("reveal");
    };
    requestAnimationFrame(tick);

    const exitTimer = setTimeout(() => setPhase("exit"), 1100);
    return () => clearTimeout(exitTimer);
  }, []);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "radial-gradient(ellipse at 50% 50%, #030b06 0%, #000 70%)" }}
        >
          {}
          <div className="scan-line" aria-hidden="true" />

          {}
          <div className="pointer-events-none absolute inset-0">
            <div className="orb orb-1" style={{ opacity: 0.35 }} />
            <div className="orb orb-2" style={{ opacity: 0.3 }} />
            <div className="orb orb-3" style={{ opacity: 0.25 }} />
          </div>

          {}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-white/5"
                style={{ width: 120 + i * 80, height: 120 + i * 80 }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {}
          <div className="relative flex flex-col items-center gap-10">
            {}
            <div className="relative flex h-24 w-24 items-center justify-center">
              {}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, rgba(74,222,128,0.9), rgba(59,130,246,0.7), rgba(139,92,246,0.7), rgba(74,222,128,0.9))",
                  padding: "2px",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
              >
                <div className="h-full w-full rounded-full bg-black" />
              </motion.div>

              {}
              <motion.div
                className="absolute inset-2 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 70%)" }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {}
              <motion.span
                className="relative z-10 font-mono-accent text-lg font-bold tracking-tighter text-white"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 300 }}
              >
                GM
              </motion.span>
            </div>

            {}
            <div className="flex items-center gap-1.5">
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  className="font-mono-accent text-sm font-semibold uppercase tracking-[0.4em] text-white"
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.3 + i * 0.08,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
              <motion.span
                className="ml-1 font-mono-accent text-sm font-semibold uppercase tracking-[0.4em] text-emerald-400"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85, duration: 0.4 }}
              >
                .ms
              </motion.span>
            </div>

            {}
            <div className="w-64">
              <div className="h-px w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #4ade80, #38bdf8, #a78bfa)",
                    boxShadow: "0 0 12px rgba(74,222,128,0.7), 0 0 24px rgba(59,130,246,0.4)",
                  }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <motion.p
                  className="font-mono-accent text-[10px] uppercase tracking-[0.35em] text-white/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Initializing
                </motion.p>
                <motion.span
                  className="font-mono-accent text-[10px] text-emerald-400/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {progress}%
                </motion.span>
              </div>
            </div>

            {}
            <motion.p
              className="text-[10px] uppercase tracking-[0.3em] text-white/25"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0.25, 0.5] }}
              transition={{ delay: 0.7, duration: 1.2, repeat: Infinity }}
            >
              AI · Data Science · Full Stack
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
