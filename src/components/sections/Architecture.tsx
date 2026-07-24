"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/hooks/useInView";

type DiagramKey = "rag" | "storage" | "event_pipeline" | "security";

const diagrams: Record<
  DiagramKey,
  { title: string; subtitle: string; description: string; diagram: string }
> = {
  rag: {
    title: "Multi-Stage RAG & Vector Search (ArchadiLM)",
    subtitle: "Hypothetical Document Embeddings (HyDE) + Reciprocal Rank Fusion + Reranking",
    description:
      "When a user submits a query, it undergoes parallel query expansion (Step-Back + Sub-queries) and HyDE document synthesis. Batch vectors are searched across Qdrant using HNSW indices, merged via Reciprocal Rank Fusion (RRF), re-scored via Cross-Encoder Reranking, and streamed back via SSE with grounded file/timestamp citations.",
    diagram: `
                              User Query ("How do API routes work?")
                                                 │
                                                 ▼
                                     Go API Gateway (8081)
                                                 │
                        ┌────────────────────────┴────────────────────────┐
                        ▼                                                 ▼
             Query Enhancement (Step-Back)                    HyDE Generation (Hypothetical Doc)
                        │                                                 │
                        └────────────────────────┬────────────────────────┘
                                                 ▼
                                Batch Embeddings (OpenAI API)
                                                 │
                                                 ▼
                               Parallel Search in Qdrant Vector DB
                                                 │
                                                 ▼
                               Reciprocal Rank Fusion (RRF Merge)
                                                 │
                                                 ▼
                               Cross-Encoder Reranking & Deduplication
                                                 │
                                                 ▼
                                 Grounded SSE Stream Response
`,
  },
  storage: {
    title: "Cloud-Native Chunked Storage Engine (ByteVault)",
    subtitle: "Resumable Upload State Machine & Distributed Part Assembly",
    description:
      "Files are chunked into content-addressable blocks with SHA-256 integrity verification. Uploads are managed by a Redis-backed atomic state machine with optimistic locking on PostgreSQL, and binary payloads are stored in Cloudflare R2 object storage.",
    diagram: `
                              File Upload Request
                                       │
                                       ▼
                            Go API Gateway Engine
                                       │
                        ┌──────────────┴──────────────┐
                        ▼                             ▼
              Chunk Integrity Check             Upload State Machine
                (SHA-256 Hash)                   (Redis Atomic Key)
                        │                             │
                        ▼                             ▼
              Cloudflare R2 Store             PostgreSQL Metadata
              (raw/course/file)               (Optimistic Locking)
`,
  },
  event_pipeline: {
    title: "Asynchronous Worker Pipelines (Redis Streams)",
    subtitle: "Multi-Stage Event Workers & Dead Letter Queue (DLQ) Resilience",
    description:
      "Heavy document extraction (PDF/VTT/ZIP) is offloaded to Redis Streams. Manifest Worker initializes jobs, Text Processor Worker extracts and chunks content, and Indexer Worker embeds and upserts vectors into Qdrant asynchronously with automatic DLQ retries.",
    diagram: `
                           Raw Document Upload Accepted
                                        │
                                        ▼
                           Redis Stream: pipeline:upload
                                        │
                                        ▼
                              Manifest Worker (Go)
                                        │
                                        ▼
                          Redis Stream: pipeline:manifest
                                        │
                                        ▼
                           Text Processor Worker (Go)
                     (Clean Text + 500-Token Chunking)
                                        │
                                        ▼
                        Redis Stream: pipeline:text-processed
                                        │
                                        ▼
                              Indexer Worker (Go)
                      (OpenAI Embedding + Qdrant Upsert)
`,
  },
  security: {
    title: "Production Security & Magic Byte Validation",
    subtitle: "Zero-Trust Header Inspection, Rate Limiting & Workspace Isolation",
    description:
      "Every uploaded file passes client-side and server-side Magic Byte binary header inspection to prevent extension spoofing. Workspace isolation is enforced at the repository type level (`WorkspaceID`), complemented by JWT RBAC and prompt injection guardrails.",
    diagram: `
                            Incoming Request / File
                                       │
                                       ▼
                       Magic Byte Header Inspection
                     (Reads first 512 bytes binary signature)
                                       │
                   ┌───────────────────┴───────────────────┐
                   ▼                                       ▼
            Valid Signature                        Spoofed / Executable
          (%PDF-, PK\x03\x04, PNG)                       (.exe disguised as .pdf)
                   │                                       │
                   ▼                                       ▼
             Process Request                     400 Security Violation
`,
  },
};

export default function Architecture() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [activeTab, setActiveTab] = useState<DiagramKey>("rag");

  return (
    <SectionWrapper id="architecture" className="py-28 relative bg-[#070a12]">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">
            // System Design & Architecture
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            How The Systems Are Built
          </h2>
          <p className="text-white/50 text-base">
            Deep dive into the underlying distributed pipelines, vector retrieval engines, state machines, and security mechanisms.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {(Object.keys(diagrams) as DiagramKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2.5 rounded-lg font-mono text-xs transition-all duration-200 ${
                activeTab === key
                  ? "bg-accent text-white font-semibold shadow-lg shadow-accent/25"
                  : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {diagrams[key].title.split(" (")[0]}
            </button>
          ))}
        </div>

        {/* Active Diagram Display Card */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#0b0f19] rounded-2xl border border-white/[0.09] p-8 md:p-10 shadow-2xl"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-white mb-1">
              {diagrams[activeTab].title}
            </h3>
            <p className="font-mono text-xs text-accent mb-4">
              {diagrams[activeTab].subtitle}
            </p>
            <p className="text-white/70 text-sm leading-relaxed max-w-3xl">
              {diagrams[activeTab].description}
            </p>
          </div>

          {/* Diagram Display Box */}
          <div className="bg-[#040711] rounded-xl border border-white/[0.08] p-6 font-mono text-xs overflow-x-auto shadow-inner">
            <p className="text-white/30 text-[10px] uppercase tracking-widest mb-4">
              Interactive Topology Diagram
            </p>
            <pre className="text-accent/90 text-[11px] leading-5">
              {diagrams[activeTab].diagram}
            </pre>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
