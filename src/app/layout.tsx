import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://archadi.dev"),
  title: "Aditya — Backend & Applied AI Engineer & Systems Builder",
  description:
    "Backend & Applied AI engineer building PushPostVault (live SaaS), AI PR Review Bot, and multi-tenant RAG systems. High-concurrency Go, Python, distributed event pipelines, and Neo4j AST knowledge graphs.",
  keywords: [
    "Backend & Applied AI engineer",
    "distributed systems",
    "Go",
    "Python",
    "infrastructure",
    "software engineer",
    "AI systems",
    "Neo4j",
    "PushPostVault",
    "PR Review Bot",
  ],
  authors: [{ name: "Aditya Kumar Kushwaha", url: "https://archadi.dev" }],
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "192x192", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Aditya — Backend & Applied AI Engineer & Systems Builder",
    description:
      "Building scalable Backend & Applied AI systems, distributed architectures, and AI-powered products.",
    url: "https://archadi.dev",
    siteName: "Aditya Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aditya — Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya — Backend & Applied AI Engineer & Systems Builder",
    description:
      "Building scalable Backend & Applied AI systems, distributed architectures, and AI-powered products.",
    creator: "@archadi_dev",
    images: ["/og-image.jpg"],
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
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=2" />
        <link rel="icon" type="image/png" sizes="64x64" href="/brand/icon-64.png?v=2" />
        <link rel="apple-touch-icon" sizes="192x192" href="/apple-touch-icon.png?v=2" />
      </head>
      <body className="bg-[#080808] text-white antialiased">{children}</body>
      <GoogleAnalytics gaId="G-SM976PDKTF" />
    </html>
  );
}
