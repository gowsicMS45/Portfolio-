import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4";

export function Background() {
  const { scrollY } = useScroll();
  
  const vignetteOpacity = useTransform(scrollY, [0, 600], [0.5, 0.75]);

  return (
    <>
      {}
      <video
        className="fixed inset-0 z-0 h-full w-full object-cover"
        style={{ opacity: 0.68, filter: "brightness(0.7) saturate(1.7) hue-rotate(10deg)" }}
        src={VIDEO}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {}
      <div
        className="fixed inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(135deg, rgba(4,16,10,0.58) 0%, rgba(0,25,18,0.42) 40%, rgba(0,12,28,0.48) 100%)",
        }}
        aria-hidden="true"
      />

      {}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 10%, rgba(16,185,129,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 70% 60% at 80% 30%, rgba(59,130,246,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 50% 80%, rgba(139,92,246,0.09) 0%, transparent 60%)
          `,
        }}
        aria-hidden="true"
      />

      {}
      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          opacity: vignetteOpacity,
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.65) 100%)",
        }}
        aria-hidden="true"
      />

      {}
      <div
        className="fixed inset-0 z-[2] pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          mixBlendMode: "overlay",
        }}
        aria-hidden="true"
      />
    </>
  );
}
