"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "architecture", label: "Architecture" },
  { id: "experience", label: "Experience" },
  { id: "journey", label: "Journey" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/archaditya",
    icon: (
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5v-1.75c-2.78.62-3.37-1.36-3.37-1.36-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.34 1.12 2.91.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.75 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.32 2.74-1.05 2.74-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9v2.82c0 .28.18.6.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/akkpk",
    icon: (
      <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-1.74.33-3.42 2.48-3.42 2.12 0 2.15 1.98 2.15 3.53V21H22v-7.19c0-3.5-.75-6.19-4.84-6.19-1.96 0-3.28 1.08-3.82 2.1h-.05V8.48Z" />
    ),
  },
  {
    label: "X / Twitter",
    href: "https://x.com/archadi_dev",
    icon: <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.7L4.5 22H1.4l8.1-9.3L1 2h7.1l4.9 6.2L18.9 2Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z" />,
  },
  {
    label: "Email",
    href: "mailto:akkpk933@gmail.com",
    icon: (
      <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1.8 2 6.7 5.2a1 1 0 0 0 1 0L19.2 7H4.8ZM4 8.4V17h16V8.4l-6.6 5.1a3 3 0 0 1-3.6 0L4 8.4Z" />
    ),
  },
];

export default function SideDock() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-16 flex-col items-center justify-between border-r border-white/[0.06] bg-[#080808]/80 py-6 backdrop-blur-sm lg:flex">
      <a
        href="#hero"
        data-cursor-hover
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-purple-500 text-xs font-bold text-white"
      >
        A
      </a>

      <nav className="flex flex-col items-center gap-2">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            data-cursor-hover
            title={s.label}
            className="group relative flex h-8 w-8 items-center justify-center"
          >
            <span
              className={`block rounded-full transition-all duration-200 ${
                active === s.id
                  ? "h-2.5 w-2.5 bg-accent shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  : "h-1.5 w-1.5 bg-white/20 group-hover:bg-white/50 group-hover:h-2 group-hover:w-2"
              }`}
            />
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md border border-white/10 bg-[#111] px-2.5 py-1 font-mono text-[10px] text-white/70 opacity-0 transition-opacity group-hover:opacity-100">
              {s.label}
            </span>
          </a>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-3">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            title={s.label}
            className="text-white/30 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              {s.icon}
            </svg>
          </a>
        ))}
        <div className="mt-1 h-10 w-px bg-gradient-to-b from-white/15 to-transparent" />
      </div>
    </aside>
  );
}
