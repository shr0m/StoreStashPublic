import { useState } from "react";
import {
  Menu,
  ExternalLink,
  Github,
  Package,
  Shield,
  Database,
  BarChart,
} from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-semibold text-lg">StoreStash</span>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
          >
            Features
          </a>
          <a
            href="#tech"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
          >
            Tech
          </a>
          <a
            href="#roadmap"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
          >
            Roadmap
          </a>
          <a
            href="https://app.storestash.co.uk"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800
dark:bg-blue-700 dark:text-white"
          >
            Open App
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 px-6 py-4 flex flex-col gap-4">
          <a href="#features">Features</a>
          <a href="#tech">Tech</a>
          <a href="#roadmap">Roadmap</a>
          <a
            href="https://app.storestash.co.uk"
            className="text-center font-medium px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800
dark:bg-blue-700 dark:text-white"
          >
            Open App
          </a>
        </div>
      )}
    </nav>
  );
}

function Card({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900">
      <Icon className="h-8 w-8 mb-4" />
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">{children}</p>
    </div>
  );
}

export default function StoreStashPortfolio() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white">
      <Navbar />

      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">StoreStash</h1>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-8">
          A secure, role-based stock and inventory management platform for
          modern businesses.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://app.storestash.co.uk"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-900 text-white hover:bg-blue-800
dark:bg-blue-700 dark:text-white font-medium"
          >
            <ExternalLink className="h-4 w-4" /> Launch App
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700"
          >
            <Github className="h-4 w-4" /> View Code
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 mb-24">
        <h2 className="text-2xl font-semibold mb-10 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card icon={Package} title="Inventory Management">
            Batch updates, stock tracking, and category-based organisation.
          </Card>
          <Card icon={Shield} title="Security & Roles">
            Role-based access control, audit logging, and rate-limited
            endpoints.
          </Card>
          <Card icon={Database} title="Reliable Backend">
            PostgreSQL-backed data with automated backups and safe restore
            strategies.
          </Card>
        </div>
      </section>

      {/* Tech */}
      <section id="tech" className="max-w-4xl mx-auto px-6 mb-24 text-center">
        <h2 className="text-2xl font-semibold mb-6">Tech Stack</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          React, Vite, Tailwind CSS, Flask, Supabase (PostgreSQL + Auth), and
          Nginx.
        </p>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="max-w-5xl mx-auto px-6 mb-24">
        <h2 className="text-2xl font-semibold mb-10 text-center">Roadmap</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card icon={BarChart} title="Analytics Dashboard">
            Stock trends, alerts, and usage insights.
          </Card>
          <Card icon={Shield} title="Enterprise Features">
            Multi-tenant support and advanced permission controls.
          </Card>
        </div>
      </section>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} StoreStash. All rights reserved.
      </footer>
    </div>
  );
}
