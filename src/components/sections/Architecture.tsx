"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/hooks/useInView";

type DiagramKey = "storage" | "pr_review" | "rag" | "event_pipeline" | "security";

interface ArchitectureItem {
  id: DiagramKey;
  tabLabel: string;
  projectBadge: string;
  title: string;
  subtitle: string;
  description: string;
  stages: { step: string; title: string; tech: string; detail: string }[];
  diagram: string;
}

const architectures: Record<DiagramKey, ArchitectureItem> = {
  storage: {
    id: "storage",
    tabLabel: "PushPostVault Storage",
    projectBadge: "PushPostVault",
    title: "Cloud-Native Chunked Storage Engine",
    subtitle: "Resumable Upload State Machine & Distributed Part Assembly",
    description:
      "Files are chunked into content-addressable blocks with SHA-256 integrity verification. Uploads are managed by a Redis-backed atomic state machine with optimistic locking on PostgreSQL, and binary payloads are stored in Cloudflare R2 object storage with zero egress overhead.",
    stages: [
      { step: "01", title: "Client Upload Request", tech: "Next.js / Browser", detail: "File sliced into 10MB chunks with client SHA-256 hash pre-computation." },
      { step: "02", title: "API Gateway & Quota", tech: "Go Engine (Port 8080)", detail: "Enforces guest limits, performs atomic quota reservation on Redis keys." },
      { step: "03", title: "Integrity & Storage", tech: "Cloudflare R2", detail: "Verifies binary checksum per chunk and writes directly to object storage." },
      { step: "04", title: "Commit & Assembly", tech: "PostgreSQL + Redis", detail: "Optimistic locking commits metadata and generates self-expiring download link." },
    ],
    diagram: [
      '              File Upload Request',
      '                       |',
      '                       v',
      '            Go API Gateway Engine',
      '                       |',
      '           +-----------+-----------+',
      '           v                       v',
      '  Chunk Integrity Check     Upload State Machine',
      '    (SHA-256 Hash)          (Redis Atomic Key)',
      '           |                       |',
      '           v                       v',
      '  Cloudflare R2 Store      PostgreSQL Metadata',
      '  (raw/course/file)        (Optimistic Locking)',
    ].join('\n'),
  },
  pr_review: {
    id: "pr_review",
    tabLabel: "PR Review Intelligence",
    projectBadge: "PR Review Bot",
    title: "Multi-Tenant Code Review Intelligence",
    subtitle: "GitHub App + Neo4j Code Graph + BYOK AES-256-GCM + Social Engine",
    description:
      "When a PR is opened, the GitHub App webhook triggers an Inngest event. The Node/Express API fetches the diff, the Python/FastAPI AI service builds a codebase knowledge graph in Neo4j, traces cross-file impact of changed functions, and produces a grounded review. A BYOK engine (AES-256-GCM) ensures enterprise data privacy.",
    stages: [
      { step: "01", title: "GitHub Webhook", tech: "GitHub App", detail: "Captures PR opened, synchronize, or inline @mention comment events." },
      { step: "02", title: "Event Dispatch", tech: "Inngest + Express", detail: "Queues background execution with retry guarantees and rate limiting." },
      { step: "03", title: "Code Graph & Review", tech: "Neo4j + Python AI", detail: "Builds AST caller/callee graph; detects cross-file regressions with grounded citations." },
      { step: "04", title: "Inline Posting & Social", tech: "FastAPI + Next.js", detail: "Posts GitHub comments; optionally drafts LinkedIn/X post with synthesized image." },
    ],
    diagram: [
      '        GitHub PR Opened / @mention',
      '                    |',
      '                    v',
      '         GitHub App Webhook',
      '                    |',
      '                    v',
      '    Node/Express API (Port 3001)',
      '      +--------+--------+',
      '      |        |        |',
      '      v        v        v',
      ' PostgreSQL  Inngest  BYOK Engine',
      '(Users/PRs) (Events) (AES-256-GCM)',
      '               |',
      '               v',
      '  Python/FastAPI AI Service (8000)',
      '      +--------+--------+',
      '      |        |        |',
      '      v        v        v',
      '   Neo4j    Review    Social',
      '(Knowledge  Agent    Agent',
      '  Graph)  (Grounded) (LinkedIn/X)',
      '      |',
      '      v',
      '  Next.js Dashboard (3000)',
      ' (Admin / User / Analytics)',
    ].join('\n'),
  },
  rag: {
    id: "rag",
    tabLabel: "Multi-Stage RAG",
    projectBadge: "ArchadiLM",
    title: "Multi-Stage RAG & Vector Search",
    subtitle: "HyDE + Reciprocal Rank Fusion + Cross-Encoder Reranking",
    description:
      "When a user submits a query, it undergoes parallel query expansion (Step-Back + Sub-queries) and HyDE document synthesis. Batch vectors are searched across Qdrant using HNSW indices, merged via Reciprocal Rank Fusion (RRF), re-scored via Cross-Encoder Reranking, and streamed back via SSE with grounded file/timestamp citations.",
    stages: [
      { step: "01", title: "Query Expansion", tech: "Step-Back & HyDE", detail: "Synthesizes hypothetical answer document and extracts conceptual sub-queries." },
      { step: "02", title: "Vector Search", tech: "Qdrant HNSW", detail: "Conducts parallel cosine distance vector searches across millions of chunk embeddings." },
      { step: "03", title: "RRF Fusion & Rerank", tech: "Cross-Encoder", detail: "Merges ranked lists using RRF (k=60), then applies cross-encoder neural reranking." },
      { step: "04", title: "SSE Streaming", tech: "Server-Sent Events", detail: "Streams tokens in realtime with exact grounded citation line numbers." },
    ],
    diagram: [
      '              User Query ("How do API routes work?")',
      '                                |',
      '                                v',
      '                    Go API Gateway (8081)',
      '                                |',
      '           +--------------------+--------------------+',
      '           v                                         v',
      '  Query Enhancement                     HyDE Generation',
      '    (Step-Back)                       (Hypothetical Doc)',
      '           |                                         |',
      '           +--------------------+--------------------+',
      '                                v',
      '               Batch Embeddings (OpenAI API)',
      '                                |',
      '                                v',
      '              Parallel Search in Qdrant Vector DB',
      '                                |',
      '                                v',
      '              Reciprocal Rank Fusion (RRF Merge)',
      '                                |',
      '                                v',
      '              Cross-Encoder Reranking & Dedup',
      '                                |',
      '                                v',
      '                Grounded SSE Stream Response',
    ].join('\n'),
  },
  event_pipeline: {
    id: "event_pipeline",
    tabLabel: "Worker Pipelines",
    projectBadge: "Distributed Events",
    title: "Asynchronous Worker Pipelines",
    subtitle: "Multi-Stage Event Workers & DLQ Resilience (Redis Streams)",
    description:
      "Heavy document extraction (PDF/VTT/ZIP) is offloaded to Redis Streams. Manifest Worker initializes jobs, Text Processor Worker extracts and chunks content, and Indexer Worker embeds and upserts vectors into Qdrant asynchronously with automatic DLQ retries.",
    stages: [
      { step: "01", title: "Stream Ingestion", tech: "Redis Streams", detail: "Fast ingestion of uploaded documents to pipeline:upload stream with zero client wait." },
      { step: "02", title: "Manifest Worker", tech: "Go Worker 1", detail: "Inspects file manifests, unpacks ZIP archives, and generates document hierarchy." },
      { step: "03", title: "Text Processor", tech: "Go Worker 2", detail: "Cleans transcripts, normalizes text, and creates 500-token semantic chunks." },
      { step: "04", title: "Vector Indexer", tech: "Go Worker 3", detail: "Calls OpenAI embedding API in parallel batches and writes vectors to Qdrant." },
    ],
    diagram: [
      '           Raw Document Upload Accepted',
      '                        |',
      '                        v',
      '           Redis Stream: pipeline:upload',
      '                        |',
      '                        v',
      '              Manifest Worker (Go)',
      '                        |',
      '                        v',
      '          Redis Stream: pipeline:manifest',
      '                        |',
      '                        v',
      '           Text Processor Worker (Go)',
      '     (Clean Text + 500-Token Chunking)',
      '                        |',
      '                        v',
      '     Redis Stream: pipeline:text-processed',
      '                        |',
      '                        v',
      '              Indexer Worker (Go)',
      '      (OpenAI Embedding + Qdrant Upsert)',
    ].join('\n'),
  },
  security: {
    id: "security",
    tabLabel: "Security & Magic Byte",
    projectBadge: "Zero-Trust",
    title: "Production Security & Magic Byte Validation",
    subtitle: "Zero-Trust Header Inspection & Workspace Isolation",
    description:
      "Every uploaded file passes client-side and server-side Magic Byte binary header inspection to prevent extension spoofing. Workspace isolation is enforced at the repository type level, complemented by JWT RBAC and prompt injection guardrails.",
    stages: [
      { step: "01", title: "Request Header Check", tech: "Go Middleware", detail: "Validates content length, MIME types, and authenticates JWT claims." },
      { step: "02", title: "Binary Inspection", tech: "Magic Byte Validator", detail: "Reads first 512 bytes of payload to confirm binary file signatures (%PDF, PK, PNG)." },
      { step: "03", title: "Isolation Enforcement", tech: "PostgreSQL RLS", detail: "Enforces strict tenant boundary checks so cross-tenant access is impossible." },
      { step: "04", title: "LLM Guardrails", tech: "FastAPI Filter", detail: "Screens user prompts and diff inputs against prompt injection payloads." },
    ],
    diagram: [
      '            Incoming Request / File',
      '                       |',
      '                       v',
      '       Magic Byte Header Inspection',
      '     (Reads first 512 bytes binary sig)',
      '                       |',
      '           +-----------+-----------+',
      '           v                       v',
      '     Valid Signature        Spoofed / Executable',
      '   (%PDF-, PK, PNG)       (.exe as .pdf)',
      '           |                       |',
      '           v                       v',
      '     Process Request       400 Security Violation',
    ].join('\n'),
  },
};

export default function Architecture() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState<DiagramKey>("storage");
  const [showRawTopology, setShowRawTopology] = useState<boolean>(false);

  const current = architectures[activeTab];

  return (
    <SectionWrapper id="architecture" className="py-24 relative bg-[#070a12]">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">
            // System Design & Architecture
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            How The Systems Are Engineered
          </h2>
          <p className="text-white/50 text-base">
            Detailed view into the distributed state machines, Neo4j code graphs, asynchronous event workers, and multi-stage vector search pipelines.
          </p>
        </div>

        {/* Tab Selection Bar - Clean 5-tab grid/flex */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(Object.keys(architectures) as DiagramKey[]).map((key) => {
            const item = architectures[key];
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? "bg-accent text-white font-semibold shadow-lg shadow-accent/25"
                    : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                <span>{item.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Architecture Details Card */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-[#0b0f19] rounded-2xl border border-white/[0.09] p-8 md:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Card Top Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {current.title}
                </h3>
                <span className="px-2.5 py-1 bg-accent/15 border border-accent/30 text-accent text-[11px] font-mono rounded font-medium">
                  {current.projectBadge}
                </span>
              </div>
              <p className="font-mono text-xs text-accent/80 font-medium">
                {current.subtitle}
              </p>
            </div>

            {/* Toggle Raw ASCII vs Visual Cards */}
            <button
              onClick={() => setShowRawTopology(!showRawTopology)}
              className="px-3.5 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.03] text-white/70 hover:text-white font-mono text-xs transition-all self-start md:self-auto"
            >
              {showRawTopology ? "Show Visual Flow" : "Show ASCII Topology"}
            </button>
          </div>

          <p className="text-white/70 text-sm leading-relaxed max-w-4xl mb-8">
            {current.description}
          </p>

          {/* Visual Stages or Raw Topology */}
          {!showRawTopology ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {current.stages.map((st) => (
                <div
                  key={st.step}
                  className="bg-[#070a14] rounded-xl border border-white/[0.07] p-5 flex flex-col justify-between hover:border-accent/30 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-accent font-bold group-hover:text-cyan-400 transition-colors">
                        STAGE {st.step}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/50">
                        {st.tech}
                      </span>
                    </div>
                    <h4 className="text-white font-semibold text-sm mb-2">
                      {st.title}
                    </h4>
                    <p className="text-white/60 text-xs leading-relaxed">
                      {st.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#040711] rounded-xl border border-white/[0.08] p-6 font-mono text-xs overflow-x-auto shadow-inner">
              <p className="text-white/30 text-[10px] uppercase tracking-widest mb-4">
                System Topology (ASCII)
              </p>
              <pre className="text-accent/90 text-[11px] leading-5 whitespace-pre">
                {current.diagram}
              </pre>
            </div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
