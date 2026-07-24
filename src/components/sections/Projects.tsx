"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/hooks/useInView";

interface ProjectDetail {
  name: string;
  tagline: string;
  description: string;
  metrics: Array<{ label: string; value: string; sub: string }>;
  stack: string[];
  challenges: string[];
  solutions: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  archDiagram: string;
}

const flagshipProjects: ProjectDetail[] = [
  {
    name: "ArchadiLM",
    tagline: "Enterprise Multi-Tenant RAG & Knowledge Workspace",
    description:
      "A high-performance Retrieval-Augmented Generation (RAG) platform designed to index multi-modal knowledge materials (PDFs, VTT/SRT transcripts, ZIP archives, web URLs) with realtime SSE streaming and exact grounded source lineage.",
    metrics: [
      // { label: "Retrieval Latency", value: "< 45ms", sub: "P99 similarity search" },
      // { label: "Top-5 Accuracy", value: "94.2%", sub: "RRF & Rerank precision" },
      // { label: "Indexed Chunks", value: "2,000+", sub: "vector points in Qdrant" },
      // { label: "Stream Speed", value: "~85 t/s", sub: "token streaming via SSE" },
    ],
    stack: ["Go (Golang)", "Python (FastAPI)", "Qdrant", "PostgreSQL", "Redis Streams", "Cloudflare R2", "Docker", "OpenAI"],
    challenges: [
      "Mitigating hallucinations & ensuring strict source-grounded responses across multi-file formats",
      "Handling long-running document extraction & embedding without blocking API threads",
      "Deduplicating retry chunks during worker retries without corrupting vector indices",
    ],
    solutions: [
      "Multi-query expansion (HyDE + Step-Back queries) fused with Reciprocal Rank Fusion (RRF) & Cross-Encoder Reranking",
      "3-stage async event pipeline (Manifest -> Processor -> Indexer) backed by Redis Streams",
      "Strict content-signature deduplication before context assembly and grounded SSE citation payload delivery",
    ],
    highlights: [
      "Multi-Query Expansion (HyDE)",
      "Reciprocal Rank Fusion (RRF)",
      "Cross-Encoder Reranking",
      "Qdrant Vector DB",
      "Redis Stream Workers",
      "Server-Sent Events (SSE)",
      "Magic Byte Security",
      "Source Lineage & Timestamps",
    ],
    liveUrl: "https://archadilm.archadi.dev",
    githubUrl: "https://github.com/archaditya/course-bot",
    archDiagram: `
     User / Web Client (Next.js)
                 │
                 ▼
        Go API Gateway (8081) ──► Magic Byte & Security Validation
                 │
        ┌────────┴────────┐
        ▼                 ▼
   Redis Streams     Python AI Microservice (8000)
 (pipeline:upload)   (HyDE + RRF + Reranker)
        │                 │
        ▼                 ▼
 3-Stage Workers     Qdrant Vector Store (HNSW Index)
(Manifest/Processor)      │
        │                 ▼
        └──────────► PostgreSQL (Metadata & Lineage)
`,
  },
  {
    name: "ByteVault",
    tagline: "Cloud Native File Storage & Transfer Platform",
    description:
      "A production-grade file transfer and storage platform engineered around scalable architecture, resumable chunked uploads, distributed processing, metadata management, and intelligent transfer optimization.",
    metrics: [
      // { label: "Upload Throughput", value: "2.4GB/s", sub: "peak cluster speed" },
      // { label: "Latency P99", value: "< 12ms", sub: "metadata operations" },
      // { label: "Reliability", value: "99.97%", sub: "uptime SLA" },
      // { label: "Concurrency", value: "50k+", sub: "concurrent transfers" },
    ],
    stack: ["Go", "Next.js", "PostgreSQL", "Redis", "Cloudflare R2", "Docker", "NATS"],
    challenges: [
      "Resumable uploads across unreliable networks without data corruption",
      "Efficient chunked transfer with parallel part assembly",
      "Distributed metadata consistency under concurrent writes",
    ],
    solutions: [
      "Content-addressable chunked upload engine with SHA-256 integrity verification",
      "Redis-backed upload state machine with atomic transitions",
      "Optimistic locking on PostgreSQL with conflict resolution",
    ],
    highlights: [
      "Resumable Uploads",
      "Chunked Parallel Transfer",
      "Cloudflare R2 Storage",
      "Presigned URLs",
      "Background Processing",
      "Metadata Indexing",
      "JWT Authentication",
      "Granular Access Control",
    ],
    liveUrl: "https://bytevault.archadi.dev",
    githubUrl: "https://github.com/archaditya/bytevault",
    archDiagram: `
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
        Processor Worker (Go Routines)
              │
              ▼
        Event Bus (NATS)
`,
  },
];

const otherProjects = [
  {
    name: "Win-Win Marketplace",
    desc: "AI-powered marketplace platform for vehicles, electronics and consumer goods.",
    stack: ["Next.js", "Node.js", "Express", "Redis", "MySQL", "Gemini API", "S3"],
    link: "https://winwin-marketplace.com",
  },
  {
    name: "Multi-tenant Hotel SaaS Builder",
    desc: "A multi-tenant SaaS platform enabling hotels to construct white-labeled websites, handle bookings, and process payments.",
    stack: ["Node.js", "Next.js", "Redis", "PostgreSQL", "Cloudinary"],
    link: "https://egs-website-builder-saas-frontend-is3uc8bdh.vercel.app/",
  },
  {
    name: "Healthosyst Platform",
    desc: "Healthcare management SaaS platform featuring realtime patient tracking, appointment scheduling, and automated notifications.",
    stack: ["Node.js", "Next.js", "Redis", "MySQL", "Socket.io"],
    link: "https://healthosyst.com",
  },
];

export default function Projects() {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"challenges" | "solutions">("challenges");

  const project = flagshipProjects[selectedProjectIndex];

  return (
    <SectionWrapper id="projects" className="py-28 relative">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">
            // Featured Work
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Production Systems & AI Architecture
          </h2>
          <p className="text-white/50 max-w-xl text-base">
            High-throughput backend microservices, async event processing, vector engines, and Applied AI systems engineered for scale.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex gap-4 mb-10 border-b border-white/[0.08] pb-4">
          {flagshipProjects.map((p, idx) => (
            <button
              key={p.name}
              onClick={() => setSelectedProjectIndex(idx)}
              className={`px-5 py-2.5 rounded-lg font-mono text-sm transition-all duration-200 ${
                selectedProjectIndex === idx
                  ? "bg-accent/20 text-accent border border-accent/40 font-semibold"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Main Flagship Card */}
        <motion.div
          key={project.name}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#0b0f19] rounded-2xl border border-white/[0.09] p-8 md:p-10 shadow-2xl mb-16"
        >
          {/* Header & Tagline */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/[0.06] pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl md:text-4xl font-semibold text-white">
                  {project.name}
                </h3>
                <span className="px-3 py-1 bg-accent/15 border border-accent/30 text-accent text-xs font-mono rounded-full">
                  Flagship
                </span>
              </div>
              <p className="font-mono text-sm text-accent/80">{project.tagline}</p>
            </div>

            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-accent hover:bg-accent/90 text-white text-xs font-semibold rounded-lg transition-all"
                >
                  Live Demo ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-white/20 hover:border-white/40 text-white/80 text-xs font-mono rounded-lg transition-all"
                >
                  GitHub Repository
                </a>
              )}
            </div>
          </div>

          <p className="text-white/70 text-base leading-relaxed mb-8 max-w-3xl">
            {project.description}
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
              >
                <p className="text-2xl font-bold text-white font-mono">{m.value}</p>
                <p className="text-xs font-medium text-white/70 mt-1">{m.label}</p>
                <p className="text-[10px] text-white/40 font-mono mt-0.5">{m.sub}</p>
              </div>
            ))}
          </div>

          {/* Tech Stack Badges */}
          <div className="mb-8">
            <p className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3">
              Technologies & Infrastructure
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 bg-white/[0.05] border border-white/[0.08] text-white/80 rounded-md font-mono text-xs"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture Diagram & Technical Insights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ASCII Architecture Diagram */}
            <div className="bg-[#060912] rounded-xl border border-white/[0.08] p-5 font-mono text-xs">
              <p className="text-accent/60 mb-3 text-[11px] uppercase tracking-widest font-bold">
                System Topology & Data Flow
              </p>
              <pre className="text-white/60 text-[11px] leading-5 overflow-x-auto">
                {project.archDiagram}
              </pre>
            </div>

            {/* Challenges / Solutions Toggle */}
            <div className="bg-white/[0.02] rounded-xl border border-white/[0.07] p-6 flex flex-col">
              <div className="flex gap-4 border-b border-white/[0.08] pb-3 mb-4">
                <button
                  onClick={() => setActiveTab("challenges")}
                  className={`text-xs font-mono font-semibold uppercase tracking-wider pb-1 transition-all ${
                    activeTab === "challenges"
                      ? "text-accent border-b-2 border-accent"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  Architectural Challenges
                </button>
                <button
                  onClick={() => setActiveTab("solutions")}
                  className={`text-xs font-mono font-semibold uppercase tracking-wider pb-1 transition-all ${
                    activeTab === "solutions"
                      ? "text-accent border-b-2 border-accent"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  Engineering Solutions
                </button>
              </div>

              <ul className="space-y-3 flex-1 text-xs text-white/70 leading-relaxed">
                {(activeTab === "challenges" ? project.challenges : project.solutions).map(
                  (item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent font-mono mt-0.5">▸</span>
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Other Notable Projects */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">
            Other Production Platforms
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((op) => (
              <div
                key={op.name}
                className="bg-[#0b0f19] border border-white/[0.08] hover:border-white/20 rounded-xl p-6 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">{op.name}</h4>
                  <p className="text-xs text-white/60 leading-relaxed mb-4">{op.desc}</p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {op.stack.map((st) => (
                      <span
                        key={st}
                        className="px-2 py-1 bg-white/[0.04] text-[10px] font-mono text-white/50 rounded"
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                  {op.link && (
                    <a
                      href={op.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-1"
                    >
                      View Project ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
