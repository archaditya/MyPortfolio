"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Marquee from "@/components/ui/Marquee";

// Simple particle canvas for subtle system-nodes aesthetic
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      opacity: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 38; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59,130,246,${0.06 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${p.opacity})`;
        ctx.fill();
      }
      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// Live IST clock for the side panel — a small "this is a real terminal" touch.
function LiveClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--:--"}</span>;
}

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } },
  item: { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } },
};

const marqueeItems = ["Backend Engineering", "Applied AI", "Distributed Systems", "Go", "Python", "TypeScript"];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="hero-grid" />
      <ParticleCanvas />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full px-6 pt-32 pb-16">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12 items-end">
          {/* Left: massive display name + copy */}
          <motion.div variants={stagger.container} initial="hidden" animate="show">
            <motion.div variants={stagger.item} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs font-mono text-white/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Building PushPostVault
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                Open to Backend &amp; Applied AI roles
              </span>
            </motion.div>

            <motion.h1
              variants={stagger.item}
              className="relative font-mono font-bold tracking-tighter leading-[0.85] text-[18vw] lg:text-[8.5vw] mb-2"
            >
              <span className="glow-orb w-96 h-96 -left-16 -top-24 -z-10" aria-hidden="true" />
              <span className="text-gradient-blue">Aditya</span>
            </motion.h1>

            <motion.p variants={stagger.item} className="font-mono text-xs text-white/30 mb-8">
              Aditya Kumar Kushwaha
            </motion.p>

            <motion.p
              variants={stagger.item}
              className="text-lg md:text-2xl text-white/50 leading-snug max-w-2xl mb-10 font-light"
            >
              Building production-focused Backend &amp; Applied AI systems &mdash; from a live SaaS
              product (<span className="text-white font-medium">PushPostVault</span>) to a
              self-hosted PR review bot and a multi-tenant RAG engine (
              <span className="text-white font-medium">ArchadiLM</span>).
            </motion.p>

            <motion.div variants={stagger.item} className="flex flex-wrap items-center gap-4">
              <a
                href="https://www.pushpostvault.com"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-lg transition-all duration-200 group"
              >
                Visit PushPostVault
              </a>
              <a
                href="#projects"
                data-cursor-hover
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/[0.1] hover:border-white/[0.2] text-white/70 hover:text-white text-sm font-medium rounded-lg transition-all duration-200 group"
              >
                View Projects
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="https://www.pushpostvault.com/s/111d33ec-35ef-49b9-8991-946407df92cc"
                data-cursor-hover
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/[0.1] hover:border-white/[0.2] text-white/70 hover:text-white text-sm font-medium rounded-lg transition-all duration-200 group"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Right: floating terminal-style status panel — asymmetric counterweight to the huge name */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden lg:block card-glow rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-5 font-mono text-xs"
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/[0.06]">
              <span className="text-white/30">~/status.log</span>
              <span className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white/10" />
                <span className="w-2 h-2 rounded-full bg-white/10" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
              </span>
            </div>
            <div className="space-y-3 text-white/50">
              <div className="flex justify-between gap-4">
                <span className="text-white/25">location</span>
                <span>India (IST)</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/25">local_time</span>
                <LiveClock />
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/25">role</span>
                <span className="text-right">Backend &amp; Applied AI</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/25">focus</span>
                <span className="text-right text-accent">PushPostVault</span>
              </div>
              <div className="pt-3 mt-1 border-t border-white/[0.06] text-white/25 leading-relaxed">
                Go · Python · TypeScript
                <br />
                PostgreSQL · Redis · Qdrant
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="relative flex flex-col items-center gap-2 pb-10"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/[0.12]" />
        <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">scroll</span>
      </motion.div>

      <div className="relative">
        <Marquee items={marqueeItems} speed={30} />
      </div>
    </section>
  );
}
