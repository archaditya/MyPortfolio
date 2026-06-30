"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/hooks/useInView";

const articles = [
  {
    title: "Building ByteVault in Public",
    excerpt:
      "A deep dive into every engineering decision, mistake and architectural trade-off while building ByteVault from scratch.",
    tag: "Series",
    readTime: "2 min",
    link: "https://github.com/archaditya/bytevault/tree/main/docs/Engineering-Journal",
    date: "Updates Frequently",
  },
  {
    title: "Learning GenAI using JavaScript",
    excerpt:
      "Learning the Generative AI in the Javascipt from 'GenAI with Javascript 2026' Cohort from chaicode.com",
    tag: "Series",
    readTime: "2 - 5 mins",
    link: "https://aditya-engineering.hashnode.dev/",
    date: "Updates Frequently",
  },
  {
    title: "Lessons from Production",
    excerpt:
      "Interesting backend problems I solve at work, generalized without exposing company-specific implementation.",
    tag: "Production",
    readTime: "2 min",
    link: "",
    date: "Comming Soon",
  },
  {
    title: "Go Learning Notes",
    excerpt: "Concurrency, Interfaces, Memory, Context,Patterns.",
    tag: "Learning",
    readTime: "2 min",
    link: "",
    date: "Comming Soon",
  },
  {
    title: "Docker Learning Notes",
    excerpt: "Docker, Docker Compose, Docekr bild, RUN, Images.",
    tag: "Learning",
    readTime: "2 min",
    link: "https://github.com/archaditya/bytevault/tree/main/docs/Docker-Learning",
    date: "Updates Frequently",
  },
];

export default function Writing() {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <SectionWrapper
      id="writing"
      label="Engineering Notes"
      title="Learning in Public"
      subtitle="Notes from building production systems, learning Go, distributed systems, AI engineering and everything in between."
    >
      <div ref={ref as React.RefObject<HTMLDivElement>} className="space-y-3">
        {articles.map((article, i) => (
          <motion.a
            key={article.title}
            href={article.link}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.09 }}
            className="group flex flex-col md:flex-row md:items-center gap-4 rounded-xl border border-white/[0.07] hover:border-white/[0.13] bg-[#0f0f0f] hover:bg-[#121212] p-6 transition-all duration-200"
          >
            {/* Date + tag */}
            <div className="md:w-36 flex-shrink-0 flex md:flex-col items-center md:items-start gap-3 md:gap-1">
              <span className="font-mono text-xs text-white/20">
                {article.date}
              </span>
              <span className="tag tag-blue">{article.tag}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white group-hover:text-white/90 mb-1.5 leading-snug">
                {article.title}
              </h3>
              <p className="text-xs text-white/35 leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
            </div>

            {/* Read time + arrow */}
            <div className="flex-shrink-0 flex items-center gap-3 md:flex-col md:items-end md:gap-1">
              <span className="font-mono text-xs text-white/20">
                {article.readTime}
              </span>
              <svg
                className="w-4 h-4 text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
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
          </motion.a>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-6 text-center"
      >
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm text-white/30 hover:text-white/60 transition-colors font-mono"
        >
          View all articles
          <svg
            className="w-3.5 h-3.5"
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
      </motion.div>
    </SectionWrapper>
  );
}
