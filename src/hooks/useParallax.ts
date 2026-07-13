import { useEffect, useRef, useState } from "react";


export function useMouseParallax(factor = 1) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetRef.current = {
        x: ((e.clientX - cx) / cx) * factor,
        y: ((e.clientY - cy) / cy) * factor,
      };
    };

    const animate = () => {
      const t = 0.055;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * t;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * t;
      setOffset({ x: currentRef.current.x, y: currentRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [factor]);

  return offset;
}


export function useScrollProgress() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { ref: ref as React.RefObject<any>, progress };
}
