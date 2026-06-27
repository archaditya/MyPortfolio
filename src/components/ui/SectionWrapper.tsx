"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

export default function SectionWrapper({
  id,
  label,
  title,
  subtitle,
  children,
  className,
  innerClassName,
}: SectionWrapperProps) {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={cn("py-24 px-6", className)}
    >
      <div className={cn("max-w-6xl mx-auto", innerClassName)}>
        {(label || title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            {label && <p className="section-label mb-3">{label}</p>}
            {title && (
              <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base text-white/45 max-w-xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
