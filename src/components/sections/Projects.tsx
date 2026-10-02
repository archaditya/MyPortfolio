"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/hooks/useInView";

interface Project {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  highlights: string[];
  liveUrl: string;
  githubUrl: string;
  status: string;
  uiPreviewType: "storage" | "pr_review" | "rag";
}

const projects: Project[] = [
  {
    name: "PushPostVault",
    tagline: "High-Concurrency Chunked Storage & Secure File Distribution Platform",
    description:
      "A production SaaS platform engineered for large-scale file delivery and collection. Built with a Go high-concurrency API engine, resumable chunked upload pipelines with client-and-server SHA-256 verification, and an atomic Redis-backed state machine with optimistic locking on PostgreSQL. Features self-expiring download links, guest invite portals with quota limits, Cloudflare R2 object storage, and Razorpay billing.",
    stack: ["Go (Golang)", "Next.js 15", "PostgreSQL", "Redis", "Cloudflare R2", "Razorpay", "Docker"],
    metrics: [
      { label: "Architecture", value: "Chunked Resumable" },
      { label: "Integrity", value: "SHA-256 Checksums" },
      { label: "State Machine", value: "Redis Atomic Lease" },
      { label: "Storage", value: "Cloudflare R2" },
    ],
    highlights: [
      "Resumable Chunked File Upload Engine",
      "Self-Expiring One-Time Share Links",
      "Guest Upload Invites with Enforced Limits",
      "Atomic Quota Reservation via Redis",
      "SHA-256 Multi-Part Checksum Verification",
      "Zero-Ingress Cloudflare R2 Storage",
      "Razorpay Tiered Subscription Billing",
      "JWT Authentication & Distributed Rate Limiting",
    ],
    liveUrl: "https://www.pushpostvault.com",
    githubUrl: "https://github.com/archaditya/bytevault",
    status: "Live Production SaaS",
    uiPreviewType: "storage",
  },
  {
    name: "AI PR Review Bot",
    tagline: "Multi-Tenant Code Review Intelligence with Neo4j Knowledge Graph & Social Engine",
    description:
      "An enterprise-ready AI code review platform operating across three decoupled microservices (GitHub App Webhook + Node/Express API + Python/FastAPI AI Engine). It parses pull request ASTs, constructs a code dependency knowledge graph in Neo4j, traces cross-file breaking changes with grounded evidence, and allows contributors to @mention the bot directly on PR lines for interactive code discussions. Features an AES-256-GCM encrypted BYOK engine, tenant admin dashboard, and an automated engine that converts merged PRs into LinkedIn and X posts with synthesized preview cards.",
    stack: ["Python", "FastAPI", "Node.js", "Express", "Neo4j", "PostgreSQL", "Inngest", "Next.js", "GitHub App"],
    metrics: [
      { label: "Graph Engine", value: "Neo4j Graph AST" },
      { label: "Security", value: "AES-256-GCM BYOK" },
      { label: "Orchestration", value: "Inngest Event Bus" },
      { label: "Review Accuracy", value: "100% Grounded" },
    ],
    highlights: [
      "Neo4j Code Dependency & Impact Graph",
      "Grounded Line-Specific Code Findings",
      "Inline GitHub @mention Follow-up Chat",
      "Bring Your Own Key (BYOK) Encryption (AES-256-GCM)",
      "Multi-Tenant Admin & Feature Gating Dashboard",
      "Automated Social Post Generator (LinkedIn / X)",
      "Dynamic Social Preview Image Generation",
      "Strict Prompt Injection Guardrails",
    ],
    liveUrl: "https://pr-review-bot.archadi.dev",
    githubUrl: "https://github.com/archaditya/github-pr-review-bot",
    status: "Live Platform",
    uiPreviewType: "pr_review",
  },
  {
    name: "ArchadiLM",
    tagline: "Enterprise Multi-Tenant RAG Engine with Cross-Encoder Reranking",
    description:
      "A high-throughput Retrieval-Augmented Generation workspace engineered to index multi-modal developer resources (PDFs, VTT transcripts, source archives, API documentation). Employs Step-Back Query Expansion with HyDE document synthesis, Qdrant HNSW vector indexing, Reciprocal Rank Fusion (RRF), Cross-Encoder reranking, and ultra-low latency SSE token streaming.",
    stack: ["Go (Golang)", "Python (FastAPI)", "Qdrant", "PostgreSQL", "Redis Streams", "Cloudflare R2", "OpenAI"],
    metrics: [
      { label: "Retrieval", value: "HyDE + RRF + Reranker" },
      { label: "Vector DB", value: "Qdrant HNSW" },
      { label: "Worker Pipeline", value: "Redis Streams" },
      { label: "Streaming", value: "Grounded SSE" },
    ],
    highlights: [
      "Multi-Query Expansion (Step-Back + HyDE)",
      "Reciprocal Rank Fusion (RRF) Ranking",
      "Cross-Encoder Re-scoring & Deduplication",
      "Asynchronous 3-Stage Redis Stream Workers",
      "Server-Sent Events (SSE) Realtime Streaming",
      "Magic Byte Binary File Validation",
      "Granular Source Lineage & Exact Citations",
      "Workspace Level Tenant Data Isolation",
    ],
    liveUrl: "https://archadilm.archadi.dev",
    githubUrl: "https://github.com/archaditya/course-bot",
    status: "Production",
    uiPreviewType: "rag",
  },
];

const sideProjects = [
  {
    name: "AI Engineering Playground",
    desc: "A modular Next.js 15 cohort workspace: one dashboard, one page per GenAI assignment — persona chat, multi-LLM voting, RAG chat, tool calling, memory agents, and MCP protocol integrations.",
    stack: ["Next.js 15", "TypeScript", "OpenAI SDK", "Anthropic SDK", "LangChain"],
    link: "https://ai-playground.archadi.dev",
    linkLabel: "Live Demo",
    badge: "Interactive",
  },
  {
    name: "Verkin",
    desc: "An intelligent networking platform: engage in natural AI technical conversations, where topic semantics match you with other engineers discussing complementary technical problems.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Vector Search"],
    link: null,
    linkLabel: null,
    badge: "In Development",
  },
];

function ProjectUIPreview({ type }: { type: "storage" | "pr_review" | "rag" }) {
  if (type === "storage") {
    return (
      <div className="bg-[#050811] rounded-xl border border-white/10 p-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse" />
            <span className="text-white/80 font-semibold text-[11px]">PushPostVault Engine // Session #ppv-8492</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Active Transfer
          </span>
        </div>

        <div className="space-y-3">
          <div className="bg-white/[0.03] p-3 rounded-lg border border-white/[0.05]">
            <div className="flex justify-between text-[11px] mb-1.5">
              <span className="text-white/70">dataset_production_v3.tar.gz</span>
              <span className="text-accent font-semibold">100% Chunked</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-accent to-emerald-400 h-full w-full" />
            </div>
            <div className="flex justify-between text-[10px] text-white/40 mt-1.5">
              <span>Size: 3.82 GB (16 Chunks)</span>
              <span>SHA-256: 9b2d...4f18 ✓ Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-white/[0.02] p-2.5 rounded border border-white/[0.04]">
              <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-1">Storage Target</span>
              <span className="text-white/80 font-medium">Cloudflare R2 [Zero Egress]</span>
            </div>
            <div className="bg-white/[0.02] p-2.5 rounded border border-white/[0.04]">
              <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-1">Quota State</span>
              <span className="text-emerald-400 font-medium">Redis Atomic Lease: Locked</span>
            </div>
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded p-2.5 flex items-center justify-between">
            <span className="text-white/80 text-[11px]">Share Link Generated:</span>
            <span className="text-accent font-bold text-[11px]">ppv.link/x8k29m (Expires in 24h)</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "pr_review") {
    return (
      <div className="bg-[#050811] rounded-xl border border-white/10 p-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-white/80 font-semibold text-[11px]">GitHub PR #42 // PR-Review-Bot</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
            Graph Grounded
          </span>
        </div>

        <div className="space-y-3">
          <div className="bg-[#080d1a] p-3 rounded-lg border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                ⚠️ Impact Warning
              </span>
              <span className="text-white/60 text-[11px]">internal/auth/session.go:88</span>
            </div>
            <p className="text-white/80 text-[11px] leading-relaxed">
              Neo4j AST traversal detected that modifying <code className="text-accent">InvalidateSession()</code> directly breaks 3 downstream consumers in <code className="text-accent">api/gateway/auth.go</code>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-white/[0.02] p-2.5 rounded border border-white/[0.04]">
              <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-1">BYOK Engine</span>
              <span className="text-emerald-400 font-medium">AES-256-GCM Secure</span>
            </div>
            <div className="bg-white/[0.02] p-2.5 rounded border border-white/[0.04]">
              <span className="text-white/40 block text-[9px] uppercase tracking-wider mb-1">Social Distribution</span>
              <span className="text-white/80 font-medium">LinkedIn/X Drafts Ready</span>
            </div>
          </div>

          <div className="bg-white/[0.02] p-2.5 rounded border border-white/[0.05] text-[10px] text-white/50 flex items-center justify-between">
            <span>Inline @mention Interactive Chat: Enabled</span>
            <span className="text-accent font-semibold">pr-review-bot.archadi.dev ↗</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050811] rounded-xl border border-white/10 p-5 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-white/80 font-semibold text-[11px]">ArchadiLM // Grounded RAG Query Inspector</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          SSE Streaming
        </span>
      </div>

      <div className="space-y-3">
        <div className="bg-white/[0.03] p-3 rounded-lg border border-white/[0.05]">
          <span className="text-white/40 text-[9px] uppercase tracking-wider block mb-1">Query Enhancement (HyDE)</span>
          <p className="text-white/80 text-[11px]">"Explain chunk integrity verification and optimistic locking"</p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="bg-white/[0.02] p-2 rounded border border-white/[0.04]">
            <span className="text-white/40 block text-[9px]">Vector DB</span>
            <span className="text-accent font-bold">Qdrant HNSW</span>
          </div>
          <div className="bg-white/[0.02] p-2 rounded border border-white/[0.04]">
            <span className="text-white/40 block text-[9px]">Merge Metric</span>
            <span className="text-purple-400 font-bold">RRF (k=60)</span>
          </div>
          <div className="bg-white/[0.02] p-2 rounded border border-white/[0.04]">
            <span className="text-white/40 block text-[9px]">Reranker</span>
            <span className="text-emerald-400 font-bold">0.96 Score</span>
          </div>
        </div>

        <div className="bg-white/[0.02] p-2.5 rounded border border-white/[0.05] text-[10px] text-white/60 flex items-center justify-between">
          <span>Source Lineage: storage_engine.go:42 [Verified]</span>
          <span className="text-accent font-semibold">TTFT: 24ms</span>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <SectionWrapper id="projects" className="py-24 relative">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14">
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">
            // Production Deployments & Work
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Production Systems & Applied AI Platforms
          </h2>
          <p className="text-white/50 max-w-2xl text-base">
            Live products and microservice ecosystems engineered for high availability, zero-data-loss storage, AST code graph intelligence, and low-latency retrieval.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="space-y-12 mb-20">
          {projects.map((project, idx) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="bg-[#090d18] rounded-2xl border border-white/[0.09] p-8 md:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-purple-500 to-transparent" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Project Details */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        {project.name}
                      </h3>
                      <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono rounded-full font-semibold">
                        {project.status}
                      </span>
                    </div>

                    <p className="font-mono text-xs text-accent/90 mb-4 font-medium">
                      {project.tagline}
                    </p>

                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Metric Pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-2.5 text-center"
                        >
                          <span className="text-[10px] font-mono text-white/40 block mb-0.5">
                            {m.label}
                          </span>
                          <span className="text-xs font-mono text-white/90 font-semibold">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] text-white/80 rounded font-mono text-[11px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-accent hover:bg-accent/90 text-white text-xs font-semibold rounded-lg transition-all shadow-lg shadow-accent/25 flex items-center gap-1.5"
                    >
                      <span>Visit Live Platform</span>
                      <span>↗</span>
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 border border-white/20 hover:border-white/40 text-white/80 hover:text-white text-xs font-mono rounded-lg transition-all flex items-center gap-1.5"
                    >
                      <span>View GitHub Source</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Live Interactive Visual UI Preview */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <ProjectUIPreview type={project.uiPreviewType} />

                  {/* Engineering Highlights Accordion / List */}
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-white/40 font-bold mb-3">
                      Core Engineering Architecture
                    </p>
                    <div className="space-y-2">
                      {project.highlights.slice(0, 4).map((h) => (
                        <div key={h} className="flex items-start gap-2 text-xs text-white/70">
                          <span className="text-accent font-mono mt-0.5 shrink-0">▸</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Side Projects / Also Building */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white">Other Explorations & Tools</h3>
            <p className="text-white/40 text-sm">Targeted prototypes and open-source modular toolkits.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sideProjects.map((item) => (
              <div
                key={item.name}
                className="bg-[#090d18] border border-white/[0.08] rounded-xl p-6 flex flex-col justify-between hover:border-white/20 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="text-lg font-semibold text-white">{item.name}</h4>
                    {item.badge && (
                      <span className="px-2.5 py-0.5 bg-accent/15 border border-accent/30 text-accent text-[10px] font-mono rounded-full font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed mb-4">{item.desc}</p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.stack.map((st) => (
                      <span
                        key={st}
                        className="px-2 py-0.5 bg-white/[0.04] text-[10px] font-mono text-white/60 rounded"
                      >
                        {st}
                      </span>
                    ))}
                  </div>

                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-1"
                    >
                      {item.linkLabel} ↗
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-white/30">Private Sandbox</span>
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
