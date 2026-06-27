import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aditya — Backend Engineer & Systems Builder",
  description:
    "Backend engineer specializing in distributed systems, infrastructure, Go, Python, and AI-powered products. Building systems that scale.",
  keywords: [
    "backend engineer",
    "distributed systems",
    "Go",
    "Python",
    "infrastructure",
    "software engineer",
    "AI systems",
  ],
  authors: [{ name: "Aditya" }],
  openGraph: {
    title: "Aditya — Backend Engineer & Systems Builder",
    description:
      "Building scalable backend systems, distributed architectures, and AI-powered products.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya — Backend Engineer & Systems Builder",
    description:
      "Building scalable backend systems, distributed architectures, and AI-powered products.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#080808] text-white antialiased">{children}</body>
    </html>
  );
}
