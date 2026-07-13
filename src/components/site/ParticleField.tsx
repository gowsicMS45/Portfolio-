import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

interface ParticleFieldProps {
  count?: number;
  connectionRadius?: number;
  mouseInfluence?: number;
  className?: string;
}

export function ParticleField({
  count = 80,
  connectionRadius = 120,
  mouseInfluence = 80,
  className = "",
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const finalCount = isMobile ? 25 : count;

    
    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };
    resize();

    
    particlesRef.current = Array.from({ length: finalCount }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.15,
      hue: Math.random() > 0.6 ? 152 : Math.random() > 0.5 ? 210 : 270, 
    }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      
      const mouseInfluenceSq = mouseInfluence * mouseInfluence;
      const connectionRadiusSq = connectionRadius * connectionRadius;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        if (distSq < mouseInfluenceSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (mouseInfluence - dist) / mouseInfluence;
          p.vx += (dx / dist) * force * 0.4;
          p.vy += (dy / dist) * force * 0.4;
        }

        
        p.vx *= 0.985;
        p.vy *= 0.985;

        
        const speedSq = p.vx * p.vx + p.vy * p.vy;
        if (speedSq > 1.44) { 
          const speed = Math.sqrt(speedSq);
          p.vx = (p.vx / speed) * 1.2;
          p.vy = (p.vy / speed) * 1.2;
        }

        p.x += p.vx;
        p.y += p.vy;

        
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity})`;
        ctx.fill();

        
        let connections = 0;
        for (let j = i + 1; j < particles.length; j++) {
          if (connections >= 3) break;
          const q = particles[j];
          const cx = p.x - q.x;
          const cy = p.y - q.y;
          const distSq = cx * cx + cy * cy;
          if (distSq < connectionRadiusSq) {
            connections++;
            const d = Math.sqrt(distSq);
            const alpha = (1 - d / connectionRadius) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${(p.hue + q.hue) / 2}, 70%, 70%, ${alpha})`;
            ctx.lineWidth = 0.55;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
    };
  }, [count, connectionRadius, mouseInfluence]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
