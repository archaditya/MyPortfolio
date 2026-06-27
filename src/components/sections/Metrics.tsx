"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCounter } from "@/hooks/useCounter";

const metrics = [
  { label: "Production Applications", value: 4, suffix: "+", desc: "Worked on multiple production applications across e-commerce, healthcare and hospitality." },
  {
    label: "Payments",
    value: 2,
    suffix: "+",
    desc: "Integrated Razorpay & Stripe with subscriptions, one-time payments and webhook verification.",
  },
  {
    label: "Async Processing",
    value: 3,
    suffix: "",
    desc: "Built reliable background jobs using BullMQ and Celery for notifications, image processing and scheduled tasks.",
  },
  {
    label: "AI Integrations",
    value: 25,
    suffix: "+",
    desc: "Developed image analysis pipelines for automated categorization, OCR and metadata extraction.",
  },
  {
    label: "Authentication",
    value: 8,
    suffix: "",
    desc: "Role-based access control, JWT authentication, session management and permissions.",
  },
  {
    label: "Deployment",
    value: 30,
    suffix: "+",
    desc: "Docker, Linux, Cloudflare R2, Redis, Nginx, Production deployments.",
  },
];

function MetricCard({
  metric,
  isInView,
  index,
}: {
  metric: (typeof metrics)[0];
  isInView: boolean;
  index: number;
}) {
  const count = useCounter(metric.value, 2000, isInView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="rounded-xl border border-white/[0.07] bg-[#0f0f0f] p-6 group hover:border-white/[0.12] transition-all duration-200"
    >
      {/* <div className="font-mono text-3xl font-semibold text-white mb-1">
        {count}
        <span className="text-accent">{metric.suffix}</span>
      </div> */}
      <div className="text-sm font-medium text-white/60 mb-1">{metric.label}</div>
      <div className="text-xs text-white/25">{metric.desc}</div>
    </motion.div>
  );
}

export default function Metrics() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section className="py-24 px-6 bg-[#0a0a0a] border-y border-white/[0.05]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label mb-3">By The Numbers</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Engineering Highlights
          </h2>
        </motion.div>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {metrics.map((m, i) => (
            <MetricCard key={m.label} metric={m} isInView={isInView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
