"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/hooks/useInView";

const skillGroups = [
  {
    category: "Backend",
    color: "blue",
    skills: ["Go", "Node.js", "Python", "FastAPI", "Express"],
  },
  {
    category: "Frontend",
    color: "pink",
    skills: ["React", "Next.js", "Typescript", "Tailwind CSS"],
  },
  {
    category: "Databases",
    color: "emerald",
    skills: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "Cloud & DevOps",
    color: "violet",
    skills: ["Docker", "Linux",, "Cloudflare R2", "Nginx", "Github Actions"],
  },
  {
    category: "Currently Exploring",
    color: "orange",
    skills: [
      "Currently Exploring",
      "System Design",
      "Generative AI",
      "Event Driven Architecture",
      "Message Queues",
    ],
  },
  // {
  //   category: "AI Systems",
  //   color: "pink",
  //   skills: ["LLM Integration", "RAG", "Vector Search", "AI Agents"],
  // },
];

const colorMap: Record<string, string> = {
  blue: "hover:border-blue-500/25 hover:bg-blue-500/[0.06] hover:text-blue-200",
  emerald:
    "hover:border-emerald-500/25 hover:bg-emerald-500/[0.06] hover:text-emerald-200",
  violet:
    "hover:border-violet-500/25 hover:bg-violet-500/[0.06] hover:text-violet-200",
  orange:
    "hover:border-orange-500/25 hover:bg-orange-500/[0.06] hover:text-orange-200",
  pink: "hover:border-pink-500/25 hover:bg-pink-500/[0.06] hover:text-pink-200",
};

const dotColorMap: Record<string, string> = {
  blue: "bg-blue-400",
  emerald: "bg-emerald-400",
  violet: "bg-violet-400",
  orange: "bg-orange-400",
  pink: "bg-pink-400",
};

export default function Skills() {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <SectionWrapper
      id="skills"
      label="Technical Skills"
      title="Technologies I Work With"
      subtitle="Technologies I use professionally and the areas I'm currently exploring to build reliable backend systems."
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="space-y-8"
      >
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: gi * 0.08 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`w-1.5 h-1.5 rounded-full ${dotColorMap[group.color]}`}
              />
              <span className="font-mono text-xs font-medium text-white/35 uppercase tracking-widest">
                {group.category}
              </span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: gi * 0.08 + si * 0.04 }}
                  className={`skill-pill ${colorMap[group.color]} transition-all duration-150`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
