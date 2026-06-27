"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  // { label: "Philosophy", href: "#philosophy" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Architecture", href: "#architecture" },
  { label: "Writing", href: "#writing" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(8,8,8,0.92)] backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-mono text-sm font-semibold text-white tracking-tight flex items-center gap-2"
        >
          <span className="w-6 h-6 rounded bg-accent flex items-center justify-center text-xs font-bold text-white">
            A
          </span>
          <span className="text-white/80 font-medium">aditya</span>
          <span className="text-white/20">/</span>
          <span className="text-accent/80 font-light text-xs">backend</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-white/50 hover:text-white/90 transition-colors duration-200 rounded-md hover:bg-white/[0.04]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="px-4 py-1.5 text-sm font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/20 rounded-md transition-all duration-200"
          >
            Contact
          </a>
          <a
            href="/resume.pdf"
            className="px-4 py-1.5 text-sm font-medium bg-accent hover:bg-accent/90 text-white rounded-md transition-all duration-200"
          >
            Resume
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-white/50 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`block h-px bg-current transition-all ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block h-px bg-current transition-all ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px bg-current transition-all ${mobileOpen ? "-rotate-45 -translate-y-[9px]" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#111] border-t border-white/[0.06] px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex gap-3">
            <a
              href="#contact"
              className="flex-1 py-2 text-sm text-center border border-white/10 rounded-md text-white/70"
            >
              Contact
            </a>
            <a
              href="/resume.pdf"
              className="flex-1 py-2 text-sm text-center bg-accent rounded-md text-white"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
