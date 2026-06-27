"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { useInView } from "@/hooks/useInView";

const journey = [
  {
    date: "July 2022",
    title: "Graduate Trainee",
    company: "Wipro",
    description:
      "Started my professional career in Enterprise IT Support, working on incident management, troubleshooting, production support and system reliability.",
    technologies: [
      "Enterprise IT",
      "Production Support",
      "Troubleshooting",
      "Incident Management",
    ],
    current: false,
  },
  {
    date: "December 2023",
    title: "Transition to Software Development",
    company: "Self Learning",
    description:
      "Left IT operations and started learning software development from scratch, focusing on fundamentals before frameworks.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "React",
      "Next.js",
    ],
    current: false,
  },
  {
    date: "February 2025",
    title: "Full Stack Developer Intern",
    company: "Production Internship",
    description:
      "Worked on multiple production applications, shipping features, fixing bugs and maintaining real-world applications deployed using cPanel.",
    technologies: [
      "Node.js",
      "Express",
      "React",
      "Next.js",
      "MySQL",
      "cPanel",
    ],
    current: false,
  },
  {
    date: "August 2025",
    title: "Software Engineer",
    company: "Backend Team",
    description:
      "Converted into a full-time Software Engineer and started contributing to backend services, APIs and production systems using Node.js and FastAPI.",
    technologies: [
      "Node.js",
      "Express",
      "FastAPI",
      "REST APIs",
      "Backend",
    ],
    current: false,
  },
  {
    date: "Present",
    title: "Building ByteVault",
    company: "Personal Engineering",
    description:
      "Outside of work, I'm building ByteVault while learning Go, Distributed Systems, Cloud Infrastructure and Generative AI.",
    technologies: [
      "Go",
      "ByteVault",
      "Cloudflare R2",
      "Docker",
      "Distributed Systems",
      "GenAI",
    ],
    current: true,
  },
];

function JourneyCard({
  item,
  index,
  isInView,
}: {
  item: (typeof journey)[0];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-12"
    >
      {/* Timeline Line */}
      {index !== journey.length - 1 && (
        <div className="absolute left-[15px] top-8 h-full w-px bg-white/10" />
      )}

      {/* Timeline Dot */}
      <div
        className={`absolute left-0 top-2 h-8 w-8 rounded-full border flex items-center justify-center text-xs font-semibold
        ${
          item.current
            ? "bg-white text-black border-white"
            : "bg-[#111] border-white/10 text-white/60"
        }`}
      >
        {item.current ? "★" : ""}
      </div>

      {/* Card */}
      <div
        className={`rounded-xl border p-6 transition-all duration-300
        ${
          item.current
            ? "border-white/20 bg-white/[0.03]"
            : "border-white/10 bg-[#111] hover:bg-[#141414]"
        }`}
      >
        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>

          <span className="text-xs text-white/40 uppercase tracking-wider">
            {item.date}
          </span>
        </div>

        <p className="text-sm text-white/60 mb-4">{item.company}</p>

        <p className="text-sm leading-7 text-white/50">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/55"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Philosophy() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <SectionWrapper
      id="journey"
      label="PROFESSIONAL JOURNEY"
      title="From IT Support to Backend Engineering"
      subtitle="My career started in enterprise IT support and gradually evolved into software engineering. Every step has been driven by curiosity, continuous learning, and building real-world systems."
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="relative mx-auto max-w-4xl space-y-10"
      >
        {journey.map((item, index) => (
          <JourneyCard
            key={`${item.date}-${item.title}`}
            item={item}
            index={index}
            isInView={isInView}
          />
        ))}

        {/* Current Focus Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: journey.length * 0.12 }}
          className="ml-12 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-white/30 mb-3">
            Current Focus
          </p>

          <h3 className="text-xl font-semibold text-white mb-3">
            Building for the Next Chapter
          </h3>

          <p className="text-white/55 leading-7">
            Professionally, I contribute to backend systems using Node.js,
            Express and FastAPI. Personally, I'm investing my time in Go,
            Distributed Systems, Cloud Infrastructure and building
            <span className="text-white font-medium"> ByteVault</span> — a
            cloud-native file storage platform designed with scalability and
            production engineering principles in mind.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}