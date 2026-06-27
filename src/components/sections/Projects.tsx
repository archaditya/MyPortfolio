"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/hooks/useInView";

const mainProject = {
  name: "ByteVault",
  tagline: "Cloud Native File Storage Platform",
  description:
    "ByteVault is a production-grade file transfer and storage platform engineered around scalable architecture, resumable uploads, distributed processing, metadata management, and intelligent transfer optimization.",
  metrics: [
    { label: "Upload Speed", value: "2.4GB/s", sub: "peak throughput" },
    { label: "Latency P99", value: "< 12ms", sub: "metadata operations" },
    { label: "Reliability", value: "99.97%", sub: "uptime SLA" },
    { label: "Concurrency", value: "50k+", sub: "concurrent transfers" },
  ],
  stack: ["Go", "Next", "PostgreSQL", "Redis", "Cloudflare R2", "Docker", "NATS"],
  challenges: [
    "Resumable uploads across unreliable networks without data corruption",
    "Efficient chunked transfer with parallel part assembly",
    "Distributed metadata consistency under concurrent writes",
  ],
  solutions: [
    "Content-addressable chunked upload engine with SHA-256 integrity verification",
    "Redis-backed upload state machine with atomic transitions",
    "Optimistic locking on PostgreSQL with CRDT-style conflict resolution",
  ],
  hightlights: [
    "Resumable uploads",
    "Chunked uploads",
    "Cloudflare R2",
    "Presigned URLs",
    "Background processing",
    "Metadata indexing",
    "Authentication",
    "File sharing",
  ],
};

const otherProjects = [
  {
    name: "Win-Win Marketplace",
    desc: "AI-powered marketplace platform for vehicles, electronics and consumer goods.",
    stack: ["Next", "Node", "Express", "Redis", "MySQL", "Gemini API", "S3"],
    link: "https://winwin-marketplace.com",
  },
  {
    name: "Multi-tenant Hotel Website Builder",
    desc: "A SaaS platform where hotels can create their own websites, manage, payments and customers.",
    stack: ["Node.js", "Next", "Redis", "PostgreSQL", "Cloudinary"],
    link: "https://egs-website-builder-saas-frontend-is3uc8bdh.vercel.app/",
  },
  {
    name: "Healthosyst",
    desc: "A full-stack SaaS platform for healthcare management built with Node.js, React/Next.js, MySQL, Redis, and Socket.io.",
    stack: ["Node.js", "Next", "Redis", "MySQL"],
    link: "https://healthosyst.com",
  },
];

function ArchDiagram() {
  return (
    <div className="bg-[#0d0d0d] rounded-xl border border-white/[0.07] p-6 font-mono text-xs">
      <p className="text-white/20 mb-4 text-[10px] uppercase tracking-widest">
        Architecture Overview
      </p>
      <div className="text-white/50 leading-7 overflow-x-auto">
        <pre className="text-[11px]">{`
    Client ──────────► API Gateway (Go)
              ┌───────────┼────────────┐
              ▼           ▼            ▼
        Upload Svc   Metadata Svc   Auth Svc
           (Go)          (Go)          (Go)
              │           │
              ▼           ▼
        Object Store   PostgreSQL + Redis       
              │
              ▼
        Processor Worker
          (Go routines)
              │
              ▼
        Event Bus (NATS)
`}</pre>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [activeTab, setActiveTab] = useState<"challenges" | "solutions">(
    "challenges",
  );

  return (
    <SectionWrapper
      id="projects"
      label="Featured Work"
      title="Engineering Case Studies"
      subtitle="Projects built with production-grade thinking — not just to ship, but to last."
    >
      <div ref={ref as React.RefObject<HTMLDivElement>}>
        {/* Main Project */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-10 rounded-2xl border border-white/[0.08] bg-[#0f0f0f] overflow-hidden"
        >
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-white/[0.06]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="tag tag-blue">Featured</span>
                  <span className="font-mono text-xs text-white/25">
                    🚧 Currently Building
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {mainProject.name}
                </h3>
                <p className="text-sm text-white/40 font-mono">
                  {mainProject.tagline}
                </p>
              </div>
              <a
                href="https://github.com/archaditya/bytevault"
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/[0.1] hover:border-white/[0.2] rounded-lg text-sm text-white/60 hover:text-white transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left */}
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <p className="text-xs text-white/25 font-mono uppercase tracking-widest">
                  Problem
                </p>
                <span className="text-sm text-white/50 leading-relaxed">
                  Modern applications need secure, resumable and scalable file
                  storage without relying on third-party SaaS.
                </span>
                <p className="text-sm text-white/50 leading-relaxed">
                  {mainProject.description}
                </p>
              </div>

              {/* Metrics */}
              {/* <div className="grid grid-cols-2 gap-3">
                {mainProject.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="bg-[#0a0a0a] rounded-lg p-4 border border-white/[0.05]"
                  >
                    <div className="text-lg font-semibold text-white font-mono mb-0.5">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-white/30 uppercase tracking-wide font-mono">
                      {m.sub}
                    </div>
                    <div className="text-xs text-white/40 mt-1">{m.label}</div>
                  </div>
                ))}
              </div> */}

              {/* Highlights */}
              <div>
                <p className="text-xs text-white/25 font-mono uppercase tracking-widest mb-3">
                  Highlights
                </p>
                <div className="flex flex-col gap-2">
                  {mainProject.hightlights.map((t) => (
                    <li key={t} className="ml-5 text-xs text-white/50 font-mono uppercase w-fit">
                      {t}
                    </li>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <p className="text-xs text-white/25 font-mono uppercase tracking-widest mb-3">
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {mainProject.stack.map((t) => (
                    <span key={t} className="tag tag-gray">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Current Focus */}
              <div>
                <p className="text-xs text-white/25 font-mono uppercase tracking-widest mb-3">
                  Current Focus
                </p>
                <div className="flex flex-col gap-2">
                  {["User Authentication", "Upload Service", "Metadata Service", "Event Bus", "Background Workers"].map((t) => (
                    <li key={t} className="ml-5 text-xs text-white/50 font-mono uppercase w-fit">
                      {t}
                    </li>
                  ))}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-4">
              <ArchDiagram />

              {/* Challenges / Solutions tabs */}
              <div className="rounded-xl border border-white/[0.07] overflow-hidden">
                <div className="flex border-b border-white/[0.07]">
                  {(["challenges", "solutions"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors duration-150 ${
                        activeTab === tab
                          ? "bg-white/[0.04] text-white/70"
                          : "text-white/25 hover:text-white/50"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="p-4 space-y-3">
                  {(activeTab === "challenges"
                    ? mainProject.challenges
                    : mainProject.solutions
                  ).map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="font-mono text-xs text-accent/50 mt-0.5 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-xs text-white/50 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {otherProjects.map((proj, i) => (
            <motion.a
              key={proj.name}
              href={proj.link}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
              className="group block rounded-xl border border-white/[0.07] hover:border-white/[0.13] bg-[#0f0f0f] hover:bg-[#121212] p-6 transition-all duration-250"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-sm font-semibold text-white group-hover:text-white/90">
                  {proj.name}
                </h4>
                <svg
                  className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
              <p className="text-xs text-white/40 leading-relaxed mb-4">
                {proj.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {proj.stack.map((t) => (
                  <span key={t} className="tag tag-gray text-[10px]">
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
