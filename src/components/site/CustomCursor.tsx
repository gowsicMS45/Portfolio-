import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "pointer" | "text";

interface Ripple {
  id: number;
  x: number;
  y: number;
  isPointer: boolean;
}


export function CustomCursor() {
  const arrowRef = useRef<SVGSVGElement>(null);
  const stateRef = useRef<CursorState>("default");
  const [stateDisplay, setStateDisplay] = useState<CursorState>("default");
  const [enabled, setEnabled] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleCounter = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      
      const el = arrowRef.current;
      if (el) {
        el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target as Element;
      let next: CursorState = "default";
      if (target.closest("textarea, input")) next = "text";
      else if (target.closest("a, button, [role='button'], [data-cursor='pointer']")) next = "pointer";

      if (next !== stateRef.current) {
        stateRef.current = next;
        setStateDisplay(next);
      }
    };

    const onDown = (e: MouseEvent) => {
      const id = ++rippleCounter.current;
      const snap = stateRef.current;
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY, isPointer: snap === "pointer" }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 650);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
    };
  }, []);

  if (!enabled) return null;

  const isPointer = stateDisplay === "pointer";
  const isText    = stateDisplay === "text";

  const stroke = isPointer ? "rgba(74,222,128,1)" : "rgba(0,0,0,0.7)";
  const glow   = isPointer
    ? "drop-shadow(0 0 5px rgba(74,222,128,0.9)) drop-shadow(0 1px 2px rgba(0,0,0,0.9))"
    : "drop-shadow(0 1px 3px rgba(0,0,0,0.9))";

  return (
    <>
      {}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="pointer-events-none fixed left-0 top-0 z-[997]"
          style={{ transform: `translate3d(${r.x}px, ${r.y}px, 0)` }}
          aria-hidden="true"
        >
          <div className="absolute rounded-full" style={{
            width: 0, height: 0,
            border: `1.5px solid ${r.isPointer ? "rgba(74,222,128,0.9)" : "rgba(255,255,255,0.8)"}`,
            animation: "rippleBurst1 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
          }} />
          <div className="absolute rounded-full" style={{
            width: 0, height: 0,
            border: `1px solid ${r.isPointer ? "rgba(74,222,128,0.45)" : "rgba(255,255,255,0.35)"}`,
            animation: "rippleBurst2 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s forwards",
          }} />
          <div style={{
            position: "absolute", width: 5, height: 5,
            borderRadius: "50%", marginLeft: -2.5, marginTop: -2.5,
            background: r.isPointer ? "rgba(74,222,128,1)" : "rgba(255,255,255,0.9)",
            animation: "clickDotFlash 0.32s ease-out forwards",
          }} />
        </div>
      ))}

      {}
      <svg
        ref={arrowRef}
        className="pointer-events-none fixed left-0 top-0 z-[999]"
        width={20}
        height={26}
        viewBox="0 0 20 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{
          willChange: "transform",
          
          transform: "translate3d(-300px,-300px,0)",
          filter: glow,
          transition: "filter 0.18s ease",
        }}
      >
        {}
        <path
          d="M 1 1 L 1 19 L 5.5 15 L 9.5 23 L 12 22 L 8 14 L 13.5 14 Z"
          fill="#ffffff"
          stroke={stroke}
          strokeWidth={isPointer ? 1.4 : 1}
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ transition: "stroke 0.18s ease, stroke-width 0.18s ease" }}
        />

        {}
        {isPointer && (
          <path
            d="M 1 1 L 1 14"
            stroke="rgba(74,222,128,0.75)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        )}

        {}
        {isText && (
          <g transform="translate(11,12)">
            <line x1="0" y1="-4" x2="0" y2="4"  stroke="rgba(255,255,255,0.95)" strokeWidth="1.2" strokeLinecap="round"/>
            <line x1="-2.5" y1="-4" x2="2.5" y2="-4" stroke="rgba(255,255,255,0.95)" strokeWidth="1" strokeLinecap="round"/>
            <line x1="-2.5" y1="4"  x2="2.5" y2="4"  stroke="rgba(255,255,255,0.95)" strokeWidth="1" strokeLinecap="round"/>
          </g>
        )}
      </svg>

      <style>{`
        @keyframes rippleBurst1 {
          0%   { width:0;    height:0;    margin-left:0;    margin-top:0;    opacity:1; }
          100% { width:40px; height:40px; margin-left:-20px; margin-top:-20px; opacity:0; }
        }
        @keyframes rippleBurst2 {
          0%   { width:0;    height:0;    margin-left:0;    margin-top:0;    opacity:0.75; }
          100% { width:64px; height:64px; margin-left:-32px; margin-top:-32px; opacity:0; }
        }
        @keyframes clickDotFlash {
          0%   { transform:scale(1);   opacity:1; }
          55%  { transform:scale(2.8); opacity:0.5; }
          100% { transform:scale(0);   opacity:0; }
        }
      `}</style>
    </>
  );
}
