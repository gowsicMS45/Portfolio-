import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Background } from "@/components/site/Background";
import { LoadingScreen } from "@/components/site/LoadingScreen";
import { CustomCursor } from "@/components/site/CustomCursor";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Download, ExternalLink, FileText } from "lucide-react";
import resumePdf from "@/assets/resume.pdf";

function NotFoundComponent() {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <div className="liquid-glass-strong max-w-md rounded-3xl p-10 text-center">
        <p className="font-mono-accent text-xs uppercase tracking-[0.4em] text-emerald-400/70 mb-4">Error 404</p>
        <h1 className="text-7xl font-medium text-white shimmer-text">404</h1>
        <p className="mt-3 text-sm text-white/60">This page drifted into the void.</p>
        <a href="/" className="liquid-glass mt-6 inline-block rounded-full px-6 py-2.5 text-xs text-white/80 hover:text-white transition-all hover:scale-105">
          ← Go home
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
      <div className="liquid-glass-strong max-w-md rounded-3xl p-10 text-center">
        <h1 className="text-xl font-medium text-white">Something broke</h1>
        <p className="mt-2 text-sm text-white/60">Try again or head home.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="liquid-glass-strong rounded-full px-5 py-2 text-xs text-white">Retry</button>
          <a href="/" className="liquid-glass rounded-full px-5 py-2 text-xs text-white/80">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Gowsic M S — AI & Data Science · Full Stack Developer" },
      { name: "description", content: "Portfolio of Gowsic M S — AI & Data Science undergraduate and full stack developer based in Coimbatore, India." },
      { name: "author", content: "Gowsic M S" },
      { property: "og:title", content: "Gowsic M S — AI & Data Science · Full Stack Developer" },
      { property: "og:description", content: "AI & DS undergrad building ML models, NLP pipelines & full stack apps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Source+Serif+4:ital,wght@1,400;1,500&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}


function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[300] origin-left"
      style={{
        height: "2px",
        scaleX,
        background: "linear-gradient(90deg, #4ade80, #38bdf8, #a78bfa, #f472b6, #4ade80)",
        backgroundSize: "200% 100%",
        boxShadow: "0 0 12px rgba(74,222,128,0.8), 0 0 24px rgba(59,130,246,0.4)",
      }}
    />
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [loaded, setLoaded] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1450);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleOpen = () => setResumeOpen(true);
    window.addEventListener("open-resume", handleOpen);
    return () => window.removeEventListener("open-resume", handleOpen);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {}
      <Background />
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />
      <div className="orb orb-4" aria-hidden="true" />
      <div className="orb orb-5" aria-hidden="true" />

      {}
      <CustomCursor />

      {}
      <ScrollProgressBar />

      {}
      <AnimatePresence>{!loaded && <LoadingScreen key="loader" />}</AnimatePresence>

      {}
      <Navbar />

      {}
      <main className="relative z-10">
        <Outlet />
      </main>

      {}
      <Footer />

      {}
      <Dialog open={resumeOpen} onOpenChange={setResumeOpen}>
        <DialogContent className="liquid-glass-strong border border-white/10 text-white max-w-4xl w-[95vw] h-[90vh] rounded-3xl p-6 shadow-2xl backdrop-blur-2xl flex flex-col">
          <DialogHeader className="flex flex-row items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-400" />
              <DialogTitle className="text-xl font-semibold text-white tracking-tight">Resume — Gowsic M S</DialogTitle>
            </div>
            <div className="flex items-center gap-3 pr-8">
              <a
                href={resumePdf}
                target="_blank"
                rel="noreferrer"
                className="liquid-glass inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs text-white/80 hover:text-white transition-all"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Open in New Tab
              </a>
              <a
                href={resumePdf}
                download="Gowsic_M_S_Resume.pdf"
                className="liquid-glass-strong inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs text-white transition-all hover:scale-105 active:scale-95"
              >
                <Download className="h-3.5 w-3.5" /> Download
              </a>
            </div>
          </DialogHeader>
          <div className="flex-1 mt-4 overflow-hidden rounded-2xl border border-white/5 bg-black/25">
            <iframe
              src={`${resumePdf}#toolbar=0`}
              title="Gowsic M S Resume"
              className="w-full h-full border-none"
            />
          </div>
        </DialogContent>
      </Dialog>
    </QueryClientProvider>
  );
}
