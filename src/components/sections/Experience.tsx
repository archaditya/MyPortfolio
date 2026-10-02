"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/hooks/useInView";

const timeline = [
  {
    period: "Aug 2025 – Present",
    title: "Backend Developer & Applied AI — Spirehubs Softwares",
    desc: "Currently building an AI SaaS agent bot, and leading a major backend refactor on DWIVE, a ride-hailing platform for the Caribbean region: splitting a large FastAPI monolith into a modular structure, implementing RBAC across hundreds of routes, unifying API response formats, and migrating auth to a two-token (access + refresh) JWT system.",
    tags: ["FastAPI", "AI Agents", "RBAC", "JWT Auth", "DWIVE"],
    accent: "bg-accent",
  },
  {
    period: "Feb 2025 – Aug 2025",
    title: "Full Stack Developer (MERN) — Evren Global Solutions",
    desc: "Shipped full-stack features end to end on the MERN stack, working across the API and the React frontend.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    accent: "bg-violet-500",
  },
];

export default function Experience() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <SectionWrapper
      id="experience"
      label="Experience"
      title="Where I Work"
      subtitle="Professional roles, most recent first."
    >
      <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
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
