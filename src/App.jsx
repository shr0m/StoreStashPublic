import { useState } from "react";
import {
  Menu,
  ExternalLink,
  Package,
  Shield,
  Database,
  BarChart,
  AlertCircle,
  Container,
  Crown,
} from "lucide-react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

/* ----------------------------- Navbar ----------------------------- */

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-semibold text-lg">StoreStash</span>

        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="nav-link">
            Features
          </a>
          <a href="#enquire" className="nav-link">
            Enquire
          </a>
          <a
            href="https://app.storestash.co.uk"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800 dark:bg-blue-700"
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
          <a href="#enquire">Enquire</a>
          <a
            href="https://app.storestash.co.uk"
            className="text-center font-medium px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800 dark:bg-blue-700"
          >
            Open App
          </a>
        </div>
      )}
    </nav>
  );
}

/* ----------------------------- Card ----------------------------- */

function Card({ icon: Icon, title, children }) {
  return (
    <motion.div
      className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
    >
      <Icon className="h-8 w-8 mb-4" />
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">{children}</p>
    </motion.div>
  );
}

/* ----------------------------- Feature Data ----------------------------- */

const FEATURES = [
  {
    icon: Package,
    title: "Stock Management",
    description:
      "Track stock levels, manage items, and keep your inventory organised with clear ownership and status visibility.",
  },
  {
    icon: BarChart,
    title: "Stock Assignment & Returns",
    description:
      "Assign equipment to cadets and staff, process returns, and retain a full audit trail.",
  },
  {
    icon: Container,
    title: "Container & Store Locations",
    description:
      "Represent real-world stores, cupboards, and rooms with structured locations.",
  },
  {
    icon: AlertCircle,
    title: "Low Stock Alerts",
    description: "Get notified when quantities fall below defined thresholds.",
  },
  {
    icon: Database,
    title: "People Records & Labels",
    description:
      "Maintain clear records for cadets, staff, and roles with tagging and filtering.",
  },
  {
    icon: Crown,
    title: "Designed for Flexibility",
    description:
      "Purpose-built for RAF Air Cadets - adaptable for any organisation.",
  },
];

/* ----------------------------- EnquireForm ----------------------------- */

function EnquireForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.Name.value,
      email: e.target.Email.value,
      message: e.target.Message.value,
    };

    try {
      const res = await fetch("http://localhost:5000/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Enquiry sent successfully!");
        e.target.reset();
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send enquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
      <input
        type="text"
        name="Name"
        placeholder="Your name"
        required
        className="rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-3 bg-white dark:bg-zinc-950 text-black dark:text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      />

      <input
        type="email"
        name="Email"
        placeholder="Your email address"
        required
        className="rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-3 bg-white dark:bg-zinc-950 text-black dark:text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      />

      <textarea
        name="Message"
        rows={5}
        placeholder="Tell us about your squadron or use case..."
        required
        className="rounded-xl border border-zinc-300 dark:border-zinc-700 px-4 py-3 bg-white dark:bg-zinc-950 text-black dark:text-white placeholder:text-zinc-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      />

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={!loading ? { scale: 1.03 } : {}}
        whileTap={!loading ? { scale: 0.97 } : {}}
        className={`mt-2 inline-flex justify-center items-center gap-2 px-6 py-3 rounded-xl bg-blue-900 dark:bg-blue-700 text-white font-medium ${
          loading ? "cursor-not-allowed opacity-60" : ""
        }`}
      >
        {loading ? (
          <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
        ) : (
          "Send Enquiry"
        )}
      </motion.button>
    </form>
  );
}

/* ----------------------------- Page ----------------------------- */

export default function StoreStashPortfolio() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-black dark:text-white">
      <Navbar />

      <Toaster position="top-right" reverseOrder={false} />

      {/* Hero */}
      <motion.section
        className="px-6 py-24 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">StoreStash</h1>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto mb-8">
          StoreStash is a secure inventory and stock assignment platform,
          designed primarily for RAF Air Cadets to maintain accountability,
          visibility, and control of squadron assets.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="https://app.storestash.co.uk"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-900 text-white hover:bg-blue-800 dark:bg-blue-700 font-medium"
          >
            <ExternalLink className="h-4 w-4" />
            Launch App
          </a>

          <a
            href="#enquire"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700"
          >
            Enquire
          </a>
        </div>
      </motion.section>

      {/* Screenshot */}
      <section className="relative max-w-6xl mx-auto px-6 mb-24">
        <div
          className="absolute inset-0 -z-10 rounded-3xl"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 20% 30%, white, transparent),
              radial-gradient(1px 1px at 80% 40%, white, transparent),
              radial-gradient(1px 1px at 50% 70%, white, transparent)
            `,
            backgroundSize: "200px 200px",
            opacity: 0.35,
          }}
        />

        <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-blue-500/60 via-purple-500/60 to-cyan-400/60">
          <div className="rounded-[22px] overflow-hidden bg-white dark:bg-zinc-900 shadow-2xl">
            <img
              src="/stock-overview.png"
              alt="StoreStash dashboard"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Built For */}
      <motion.section
        id="features"
        className="max-w-6xl mx-auto px-6 mb-24"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-10 text-center">
          Built For RAF Air Cadets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card icon={Shield} title="Squadron Accountability">
            Maintain clear responsibility for uniform, radios, weapons training
            aids, and other squadron assets.
          </Card>

          <Card icon={Container} title="Real-World Stores">
            Match your digital inventory to actual squadron stores and
            locations.
          </Card>

          <Card icon={Database} title="Audit-Ready Records">
            Keep a full history of assignments and returns to support
            inspections and continuity.
          </Card>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        id="features"
        className="max-w-6xl mx-auto px-6 mb-24"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-10 text-center">
          Core Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <Card key={feature.title} icon={feature.icon} title={feature.title}>
              {feature.description}
            </Card>
          ))}
        </div>
      </motion.section>

      {/* Why StoreStash */}
      <motion.section
        className="max-w-4xl mx-auto px-6 mb-24 text-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-6">Why StoreStash?</h2>

        <ul className="space-y-3 text-zinc-600 dark:text-zinc-400 inline-block text-left">
          <li>✔ Designed specifically around cadet unit workflows</li>
          <li>✔ No spreadsheets or fragmented systems</li>
          <li>✔ Clear ownership and accountability</li>
          <li>✔ Simple to use, easy to maintain</li>
        </ul>
      </motion.section>

      {/* Security */}
      <section className="max-w-4xl mx-auto px-6 mb-24 text-center">
        <h2 className="text-2xl font-semibold mb-6">Security & Reliability</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Built using modern infrastructure, protected APIs, and role-based
          access to ensure data integrity and operational reliability.
        </p>
      </section>

      {/* Enquire */}
      <motion.section
        id="enquire"
        className="max-w-4xl mx-auto px-6 mb-24"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Enquire About StoreStash
        </h2>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-10">
          Interested in using StoreStash for your squadron or organisation? Send
          us a message and we’ll be in touch.
        </p>

        {/* Gradient frame */}
        <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-blue-500/40 via-purple-500/40 to-cyan-400/40">
          {/* Inner panel */}
          <div className="rounded-[22px] bg-white dark:bg-zinc-900 p-8 shadow-xl">
            <EnquireForm />
          </div>
        </div>
      </motion.section>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Jan Korzybski
      </footer>
    </div>
  );
}
