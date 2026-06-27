"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/hooks/useInView";

type DiagramKey = "request" | "microservice" | "database" | "events";

const diagrams: Record<
  DiagramKey,
  { title: string; description: string; diagram: string }
> = {
  request: {
    title: "Request Lifecycle",
    description: "How an HTTP request travels through the system layers",
    diagram: `
                                  Client
                                      │
                                      ▼
                          Cloudflare / CDN
                                    │
                                    ▼
                      Nginx Reverse Proxy
                                    │
                                    ▼
                  Express / FastAPI Server
                                    │
          ┌─────────┴─────────┐
          ▼                                               ▼
  Authentication                              Rate Limiter
          │                                                │
          └─────────┬─────────┘
                                  ▼
                          Business Logic
                                  │
          ┌────────┴────────┐
          ▼                                          ▼
    Redis Cache                       PostgreSQL
          │                                           │
          └────────┬────────┘
                                ▼
                Response Returned`,
  },
  microservice: {
    title: "Background Processing",
    description: "",
    diagram: `
                API Request
                        │
                        ▼
            Store Job in Queue
                        │
                        ▼
              BullMQ / Celery
                        │
      ┌──────┴──────┐
      ▼                                ▼
 Image Worker           Email Worker
      ▼                                ▼
Notification           Image Processing
      ▼                                ▼
 Update DB             Upload to Storage`,
  },
  database: {
    title: "Payment & Subscription Flow",
    description: "",
  //   diagram: `
  // ┌──────────────────────────┐
  // │         PostgreSQL        │  Primary write node
  // │  users · files · chunks  │
  // └──────────┬───────────────┘
  //            │ streaming replication
  // ┌──────────▼───────────────┐
  // │      Read Replicas (2)   │  Horizontal read scaling
  // └──────────────────────────┘

  // ┌──────────────────────────┐
  // │          Redis           │  Cache + Pub/Sub
  // │  sessions · upload state │
  // │  rate limits · queues    │
  // └──────────────────────────┘

  // ┌──────────────────────────┐
  // │       Object Store       │  Binary data (S3 compatible)
  // │     chunks · assets      │
  // └──────────────────────────┘`,
    diagram: `
  User

 │

 ▼

Create Order

 │

 ▼

Razorpay / Stripe

 │

 ▼

Webhook

 │

 ▼

Verify Signature

 │

 ▼

Activate Subscription

 │

 ▼

Transaction History

 │

 ▼

Email Notification
    `,
  },
  events: {
    title: "AI Processing Pipeline",
    description: "Win-win AI API pipeline",
    diagram: `
  User Uploads Image

          │

          ▼

Image Validation

          │

          ▼

Object Detection

          │

          ▼

Attribute Extraction

          │

     ┌────┴────┐

     ▼         ▼

Vehicle?      Product?

     ▼         ▼

OCR       Category Match

     ▼

Plate Region

     ▼

Gov Lookup

     ▼

Blur Number Plate

     ▼

Save Metadata`,
  },
};

export default function Architecture() {
  const [active, setActive] = useState<DiagramKey>("request");
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const tabs: DiagramKey[] = ["request", "microservice", "database", "events"];

  return (
    <SectionWrapper
      id="architecture"
      label="ENGINEERING EXPERIENCE"
      title="How I Build Production Systems"
      subtitle="A behind-the-scenes look at the engineering patterns, architecture decisions and production workflows I've implemented across real-world applications and ByteVault."
    >
      <div ref={ref as React.RefObject<HTMLDivElement>}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/[0.07] bg-[#0f0f0f] overflow-hidden"
        >
          {/* Tab bar */}
          <div className="flex border-b border-white/[0.07] overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`flex-1 min-w-max px-5 py-3.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  active === tab
                    ? "text-white bg-white/[0.04] border-b border-accent"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                {diagrams[tab].title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-sm text-white/35 mb-6 font-mono">
                  // {diagrams[active].description}
                </p>
                <pre className="text-[13px] text-emerald-400/70 leading-6 font-mono overflow-x-auto whitespace-pre bg-[#080808] rounded-xl p-6 border border-white/[0.05]">
                  {diagrams[active].diagram}
                </pre>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer bar */}
          {/* <div className="px-8 py-4 border-t border-white/[0.05] flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500/60 animate-pulse" />
            <span className="font-mono text-xs text-white/20">
              production pattern · battle-tested
            </span>
            <div className="flex-1" />
            <span className="font-mono text-xs text-white/15">
              {active}.arch.go
            </span>
          </div> */}
        </motion.div>

        {/* Quick principles row */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4"
        >
          {[
            ["Idempotency", "Safe to retry without side effects"],
            ["Observability", "Metrics, traces and structured logs"],
            ["Graceful Degradation", "Partial availability over total failure"],
            ["Backpressure", "Flow control from consumer to producer"],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-lg border border-white/[0.06] p-4 bg-[#0f0f0f]"
            >
              <p className="text-xs font-semibold text-white/60 mb-1">
                {title}
              </p>
              <p className="text-[11px] text-white/25 leading-relaxed">{desc}</p>
            </div>
          ))}
        </motion.div> */}
      </div>
    </SectionWrapper>
  );
}
