"use client";

import { useEffect, useRef, useState } from "react";

// Magnetic dot-and-ring cursor. Common signature on awwwards-style portfolios.
// No-ops silently on touch devices.
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let mouseX = ringX;
    let mouseY = ringY;
    let frame: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      frame = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest("a, button, [data-cursor-hover]");
      setActive(!!el);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent pointer-events-none mix-blend-difference"
      />
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none transition-[width,height,border-color] duration-200 ease-out ${
          active ? "h-10 w-10 border-accent" : "h-7 w-7 border-white/25"
        }`}
      />
    </>
  );
}
