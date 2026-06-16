import Link from "next/link";
import type { Metadata } from "next";
import { IconBalance, IconZap, IconShieldCheck, IconTable } from "@/components/icons/FeatureIcons";

export const metadata: Metadata = {
  title: "SpinDraw — Professional Spin Wheel Raffles",
  description:
    "Fair, fast, and official spin wheel raffles for events and organisations. Upload participants, spin, and draw winners in seconds.",
};

const steps = [
  { num: "01", title: "Upload",  desc: "Import your participant list from Excel or add names manually. Set how many winners you need." },
  { num: "02", title: "Spin",    desc: "Launch the animated spin wheel. Each spin uses cryptographically fair random selection." },
  { num: "03", title: "Winners", desc: "Collect your winners in real time. Export results and share with your audience instantly." },
];

const features = [
  { icon: <IconBalance className="h-7 w-7" />, color: "from-indigo-500 to-blue-500",   glow: "rgba(99,102,241,0.35)",  title: "Fair",         desc: "True random selection with no bias. Every participant has an equal chance to win." },
  { icon: <IconZap      className="h-7 w-7" />, color: "from-amber-400 to-orange-500", glow: "rgba(245,158,11,0.35)",  title: "Fast",         desc: "From upload to first spin in under 60 seconds. No setup, no installation required." },
  { icon: <IconShieldCheck className="h-7 w-7" />, color: "from-violet-500 to-purple-600", glow: "rgba(124,58,237,0.35)", title: "Official",  desc: "Professional presentation trusted by HR teams, event organisers, and schools across Europe." },
  { icon: <IconTable    className="h-7 w-7" />, color: "from-emerald-500 to-teal-500", glow: "rgba(16,185,129,0.35)",  title: "Excel Support",desc: "Drop in your .xlsx file and we handle the rest. First-column import, zero configuration." },
];

const stats = [
  { value: "10,000+", label: "Events hosted"       },
  { value: "500k+",   label: "Participants drawn"   },
  { value: "50+",     label: "Countries worldwide"  },
];

const testimonials = [
  { quote: "SpinDraw transformed our annual company raffle. Professional, transparent, and our team loved the live spin experience.", name: "Katrin Hoffmann", role: "HR Director, Merkle GmbH",        initials: "KH" },
  { quote: "We use it for every trade show giveaway. Upload the lead list, spin on the big screen — clients are always impressed.",  name: "Thomas Berger",   role: "Events Manager, Messe Berlin",   initials: "TB" },
  { quote: "Finally a raffle tool that looks official enough for school assemblies. Simple, fair, and completely free to start.",    name: "Sarah Müller",    role: "Principal, Gymnasium München",   initials: "SM" },
];

export default function LandingPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Glow halo behind hero text */}
        <div className="pointer-events-none absolute left-1/2 top-32 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-400/20 blur-[120px]" />

        <div className="safe-px relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 md:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <div className="badge-glass mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Trusted since 2019 · Berlin, Germany
            </div>

            <h1 className="display-heading text-5xl text-slate-900 sm:text-6xl md:text-7xl">
              Professional spin wheel raffles,{" "}
              <span className="text-gradient">built for trust</span>
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-xl font-medium leading-relaxed text-slate-700 sm:text-2xl">
              Upload your participants, spin the wheel, and draw winners fairly — in seconds.
              The official raffle platform for events, teams, and organisations.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/upload" className="btn-primary w-full !px-8 !py-4 !text-base sm:w-auto">
                Start Free
              </Link>
              <Link href="/pricing" className="btn-secondary w-full !px-8 !py-4 !text-base sm:w-auto">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 sm:py-24">
        <div className="safe-px mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="section-title">How it works</h2>
            <p className="section-subtitle">Three steps from sign-up to winner</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {steps.map((step) => (
              <div key={step.num} className="glass p-6 sm:p-8">
                <span className="font-display text-4xl font-extrabold text-gradient opacity-50 sm:text-5xl">
                  {step.num}
                </span>
                <h3 className="font-display mt-4 text-2xl font-extrabold tracking-tight text-slate-900">{step.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-700">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 sm:py-24">
        <div className="safe-px mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="section-title">Everything you need for a fair draw</h2>
            <p className="section-subtitle">Built for professionals who take raffles seriously</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="glass p-6 sm:p-7">
                {/* Glass icon container with per-feature gradient */}
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${f.color} text-slate-900`}
                  style={{
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.25), 0 6px 20px ${f.glow}`,
                    border: "1px solid rgba(255,255,255,0.20)",
                  }}
                >
                  {f.icon}
                </div>
                <h3 className="font-display mt-5 text-xl font-extrabold tracking-tight text-slate-900">{f.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-700">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 sm:py-20">
        <div className="safe-px mx-auto max-w-6xl px-4 sm:px-6">
          {/* Glow behind stats */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-violet-400/12 blur-3xl" />
            <div className="glass-strong relative px-6 py-12 sm:px-12 sm:py-16">
              <p className="font-display text-center text-sm font-bold uppercase tracking-widest text-slate-600">
                Trusted by organisations worldwide
              </p>
              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p
                      className="text-4xl font-bold sm:text-5xl"
                      style={{ background: "linear-gradient(135deg,#a5b4fc,#e879f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                    >
                      {s.value}
                    </p>
                    <p className="mt-2 text-base font-medium text-slate-700">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 sm:py-24">
        <div className="safe-px mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="section-title">Loved by event professionals</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="glass flex flex-col p-6">
                <p className="flex-1 text-base italic leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-display text-sm font-bold text-slate-900"
                    style={{ background: "linear-gradient(135deg,#6366f1,#7c3aed)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 6px 18px rgba(99,102,241,0.45)" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-display text-base font-bold tracking-tight text-slate-900">{t.name}</p>
                    <p className="text-sm font-medium text-slate-600">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pb-20 sm:pb-28">
        <div className="safe-px mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative overflow-hidden">
            {/* Coloured glow behind CTA card */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-indigo-500/15 blur-3xl" />
            <div
              className="glass-strong relative px-6 py-14 text-center sm:px-12 sm:py-20"
              style={{ background: "rgba(255,255,255,0.22)" }}
            >
              <h2 className="display-heading text-3xl text-slate-900 sm:text-4xl">Ready to run your next raffle?</h2>
              <p className="mx-auto mt-4 max-w-lg text-lg font-medium text-slate-700">
                Join thousands of organisations using SpinDraw for fair, professional prize draws.
              </p>
              <Link href="/upload" className="btn-primary mt-8 inline-flex !px-8 !py-4 !text-base">
                Start Free — No credit card required
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
