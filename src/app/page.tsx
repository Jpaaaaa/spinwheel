"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroVisual from "@/components/marketing/HeroVisual";
import LogoBar from "@/components/marketing/LogoBar";
import { IconBalance, IconShieldCheck, IconTable, IconZap } from "@/components/icons/FeatureIcons";

const steps = [
  { num: "01", title: "Upload", desc: "Import your participant list from Excel or add names manually. Set how many winners you need." },
  { num: "02", title: "Spin", desc: "Launch the animated spin wheel. Each spin uses cryptographically fair random selection." },
  { num: "03", title: "Winners", desc: "Collect your winners in real time. Export results and share with your audience instantly." },
];

const features = [
  { icon: <IconBalance className="h-6 w-6 text-neutral-800" />, title: "Fair", desc: "True random selection with no bias. Every participant has an equal chance to win." },
  { icon: <IconZap className="h-6 w-6 text-neutral-800" />, title: "Fast", desc: "From upload to first spin in under 60 seconds. No setup, no installation required." },
  { icon: <IconShieldCheck className="h-6 w-6 text-neutral-800" />, title: "Official", desc: "Professional presentation trusted by HR teams, event organisers, and schools." },
  { icon: <IconTable className="h-6 w-6 text-neutral-800" />, title: "Excel Support", desc: "Drop in your .xlsx file and we handle the rest. First-column import, zero configuration." },
];

const stats = [
  { value: "10,000+", label: "Events hosted" },
  { value: "500k+", label: "Participants drawn" },
  { value: "50+", label: "Countries worldwide" },
];

const testimonials = [
  { quote: "Draw Master transformed our annual company raffle. Professional, transparent, and our team loved the live spin experience.", name: "Katrin Hoffmann", role: "HR Director", initials: "KH" },
  { quote: "We use it for every trade show giveaway. Upload the lead list, spin on the big screen — clients are always impressed.", name: "Thomas Berger", role: "Events Manager", initials: "TB" },
  { quote: "Finally a raffle tool that looks official enough for assemblies. Simple, fair, and completely free to start.", name: "Sarah Müller", role: "Principal", initials: "SM" },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

export default function LandingPage() {
  return (
    <div className="relative bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32 md:pb-16 lg:pt-36">
        <div className="safe-px mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-8">
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              className="order-2 lg:order-1"
            >
              <motion.div variants={fadeUp} className="badge-glass mb-6">
                <svg className="h-3.5 w-3.5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2A11.954 11.954 0 0110 1.944z" clipRule="evenodd" />
                </svg>
                Trusted by thousands of teams since 2019
              </motion.div>

              <motion.h1 variants={fadeUp} className="display-heading text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem]">
                Run fair giveaways{" "}
                <span className="text-indigo-600">with confidence.</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-600">
                Spin the wheel, draw winners, and manage raffles in seconds. Easy, transparent, and fair.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/login" className="btn-primary w-full sm:w-auto">
                  Start Free
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="/pricing" className="btn-secondary w-full sm:w-auto">
                  See Pricing
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-6">
                <span className="flex items-center gap-2 text-sm font-medium text-neutral-600">
                  <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  100% Fair &amp; Transparent
                </span>
                <span className="flex items-center gap-2 text-sm font-medium text-neutral-600">
                  <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure &amp; Privacy First
                </span>
              </motion.div>
            </motion.div>

            <div className="relative order-1 mb-4 flex justify-center sm:mb-0 lg:order-2 lg:justify-end">
              <HeroVisual />
            </div>
          </div>
        </div>
      </section>

      <LogoBar />

      {/* How it works */}
      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="safe-px mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="section-title">How it works</h2>
            <p className="section-subtitle">Three steps from sign-up to winner</p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-3 sm:gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass flex flex-col items-start p-8 sm:p-10"
              >
                <span className="font-display text-3xl font-bold text-indigo-200">{step.num}</span>
                <h3 className="font-display mt-6 text-xl font-bold tracking-tight text-neutral-900">{step.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-neutral-50/50 py-20 sm:py-28">
        <div className="safe-px mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="section-title">Engineered for a fair draw</h2>
            <p className="section-subtitle">Built for professionals who take raffles seriously</p>
          </div>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, idx) => (
              <motion.div
                key={f.title}
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass group p-8"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-100 transition-colors group-hover:bg-indigo-600">
                  <div className="text-neutral-800 group-hover:text-white transition-colors">{f.icon}</div>
                </div>
                <h3 className="font-display mt-6 text-lg font-bold tracking-tight text-neutral-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 sm:py-28">
        <div className="safe-px mx-auto max-w-6xl px-4 sm:px-6">
          <div className="glass-strong flex flex-col items-center px-6 py-16 sm:px-12 sm:py-20">
            <p className="font-display text-center text-sm font-semibold uppercase tracking-widest text-neutral-500">
              Trusted by organisations worldwide
            </p>
            <div className="mt-12 grid w-full grid-cols-1 gap-10 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0 divide-neutral-200">
              {stats.map((s) => (
                <div key={s.label} className="text-center pt-8 sm:pt-0">
                  <p className="text-4xl font-bold text-neutral-900 sm:text-5xl">{s.value}</p>
                  <p className="mt-3 text-sm font-medium text-neutral-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-neutral-50/50 py-20 sm:py-28">
        <div className="safe-px mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="section-title">Loved by event professionals</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass flex flex-col p-8"
              >
                <p className="flex-1 text-base leading-relaxed text-neutral-600">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-display text-xs font-bold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold tracking-tight text-neutral-900">{t.name}</p>
                    <p className="text-xs font-medium text-neutral-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 pt-10 sm:pb-32 sm:pt-16">
        <div className="safe-px mx-auto max-w-4xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 px-6 py-16 text-center shadow-2xl shadow-indigo-500/30 sm:px-12 sm:py-24">
            <h2 className="display-heading text-3xl text-white sm:text-4xl md:text-5xl">Ready to run your next raffle?</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-indigo-100">
              Join thousands of organisations using Draw Master for fair, professional prize draws.
            </p>
            <Link
              href="/login"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-indigo-700 transition-all hover:bg-indigo-50"
            >
              Start Free — No credit card required
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
