"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

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

    // Create nodes
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

      // Draw edges between close particles
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

      // Draw nodes
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

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6">
      {/* Background layers */}
      <div className="hero-grid" />
      <ParticleCanvas />

      {/* Radial fade from center */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full pt-28 pb-24">
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          {/* Status badge */}
          <motion.div variants={stagger.item} className="mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs font-mono text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Building ByteVault
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Learning Distributed Systems
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Backend Engineering Roles
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={stagger.item}>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.05] mb-2">
              Aditya
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.div variants={stagger.item}>
            <p className="font-mono text-sm text-accent/70 mb-6 tracking-wide">
              Backend Engineer · Building with Node | Express | Python | FASTApi
              | Go · Exploring Distributed Systems
            </p>
          </motion.div>

          {/* Description */}
          <motion.div variants={stagger.item}>
            <p className="text-lg md:text-xl text-white/45 leading-relaxed max-w-xl mb-10">
              Building production-focused backend systems with Go. Currently
              working on ByteVault while learning Go, Distributed Systems, Cloud
              Infrastructure, and AI Engineering.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={stagger.item}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-lg transition-all duration-200 group"
            >
              Visit ByteVault
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/[0.1] hover:border-white/[0.2] text-white/70 hover:text-white text-sm font-medium rounded-lg transition-all duration-200 group"
            >
              View Projects
              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <a
              href="https://drive.google.com/file/d/1-rUFHqAQ-yGJOEtWBNyJBjowoeGHlgR3/view"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/[0.1] hover:border-white/[0.2] text-white/70 hover:text-white text-sm font-medium rounded-lg transition-all duration-200 group"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Download Resume
            </a>
          </motion.div>

          {/* Inline tech stack strip */}
          {/* <motion.div
            variants={stagger.item}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="font-mono text-xs text-white/20 mr-1">
              Stack:
            </span>
            {[ "JS", "Express.js", "Next.js", "Python", "PostgreSQL", "MySQL", "MongoDB", "Go",  "Redis", "Docker", "Distributed Systems"].map(
              (tech) => (
                <span key={tech} className="tag tag-gray">
                  {tech}
                </span>
              )
            )}
          </motion.div> */}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/[0.12]" />
          <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
            scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
