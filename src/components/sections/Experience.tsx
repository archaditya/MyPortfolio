"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/hooks/useInView";

const timeline = [
  {
    period: "2024 – Present",
    title: "Backend & Infrastructure Engineering",
    desc: "Deepening expertise in Go and Python for building production systems. Focused on distributed architecture, observability, and infrastructure automation with Docker and CI/CD pipelines.",
    tags: ["Go", "Python", "Docker", "Observability", "CI/CD"],
    accent: "bg-accent",
  },
  {
    period: "2023 – 2024",
    title: "AI Systems & LLM Integration",
    desc: "Building AI-powered backends — RAG pipelines, vector search infrastructure, multi-agent orchestration, and LLM-integrated APIs. Shipped an AI assistant platform serving real users.",
    tags: ["LLM APIs", "RAG", "Vector DB", "LangChain", "FastAPI"],
    accent: "bg-violet-500",
  },
  {
    period: "2022 – 2023",
    title: "Node.js & API Development",
    desc: "Shipped production REST and GraphQL APIs with Node.js and Express. Deep-dived into PostgreSQL query optimization, Redis caching patterns, and MongoDB aggregation pipelines.",
    tags: ["Node.js", "Express", "PostgreSQL", "GraphQL", "Redis"],
    accent: "bg-emerald-500",
  },
  {
    period: "2021 – 2022",
    title: "Backend Foundations",
    desc: "Started with Python and Flask, built first production APIs, learned relational data modeling, deployed first containerized applications. Fell in love with systems thinking.",
    tags: ["Python", "Flask", "SQL", "REST", "Linux"],
    accent: "bg-orange-500",
  },
];

export default function Experience() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <SectionWrapper
      id="experience"
      label="Experience"
      title="Engineering Journey"
      subtitle="A timeline of how I've grown as an engineer — each phase building on the last."
    >
      <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-6 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/10 to-transparent" />

        <div className="space-y-10">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-8 pl-12 relative"
            >
              {/* Dot */}
              <div
                className={`absolute left-[14px] top-1.5 w-[11px] h-[11px] rounded-full ${item.accent} ring-[3px] ring-[#080808]`}
              />

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-white/25 tracking-wider">
                    {item.period}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed mb-4">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag tag-gray">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
