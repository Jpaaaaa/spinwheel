import Link from "next/link";
import type { Metadata } from "next";
import { IconCheck, IconMinus } from "@/components/icons/FeatureIcons";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for spin wheel raffles. Free plan available.",
};

const freeFeatures = ["Up to 100 participants", "Up to 10 winners per draw", "Excel & manual upload", "Animated spin wheel", "Community support"];
const proFeatures = ["Unlimited participants", "Unlimited winners", "Custom branding & logo", "Export results to PDF/CSV", "Priority support", "Team accounts (up to 10)", "Audit log & compliance reports"];

const comparison = [
  { feature: "Participants per draw", free: "100", pro: "Unlimited" },
  { feature: "Winners per draw", free: "10", pro: "Unlimited" },
  { feature: "Excel upload", free: true, pro: true },
  { feature: "Manual name entry", free: true, pro: true },
  { feature: "Animated spin wheel", free: true, pro: true },
  { feature: "Custom branding", free: false, pro: true },
  { feature: "Export results", free: false, pro: true },
  { feature: "Team accounts", free: false, pro: true },
  { feature: "Audit log", free: false, pro: true },
  { feature: "Priority support", free: false, pro: true },
];

function Check({ included }: { included: boolean }) {
  return included
    ? <IconCheck className="mx-auto h-5 w-5 text-emerald-600" />
    : <IconMinus className="mx-auto h-5 w-5 text-neutral-300" />;
}

export default function PricingPage() {
  return (
    <div className="safe-px mx-auto max-w-5xl px-4 pt-28 pb-12 sm:px-6 sm:pt-32 sm:pb-16 md:pb-20">
      <div className="text-center">
        <h1 className="section-title">Simple, transparent pricing</h1>
        <p className="section-subtitle mt-4">Start free. Upgrade when you need more.</p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="glass p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-neutral-900">Free</h2>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-neutral-900">€0</span>
            <span className="text-neutral-400">/month</span>
          </div>
          <p className="mt-2 text-sm text-neutral-500">Perfect for small events and teams</p>
          <ul className="mt-8 space-y-3">
            {freeFeatures.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-neutral-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                  <IconCheck className="h-3 w-3 text-emerald-600" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <Link href="/upload" className="btn-secondary mt-8 block w-full text-center">Get started free</Link>
        </div>

        <div className="glass-strong relative border-indigo-200/50 bg-gradient-to-br from-indigo-600/5 to-blue-600/5 p-6 sm:p-8">
          <span className="absolute -top-3 right-6 rounded-full border border-indigo-500 bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-md">Popular</span>
          <h2 className="text-lg font-semibold text-neutral-900">Pro</h2>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-neutral-900">€29</span>
            <span className="text-neutral-400">/month</span>
          </div>
          <p className="mt-2 text-sm text-neutral-500">For professional events and organisations</p>
          <ul className="mt-8 space-y-3">
            {proFeatures.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-neutral-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                  <IconCheck className="h-3 w-3 text-emerald-600" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <button type="button" className="btn-primary mt-8 w-full">Start 14-day trial</button>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-center text-xl font-bold text-neutral-900">Feature comparison</h2>
        <div className="glass mt-8 overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="px-4 py-3 text-left font-semibold text-neutral-700">Feature</th>
                <th className="px-4 py-3 text-center font-semibold text-neutral-700">Free</th>
                <th className="px-4 py-3 text-center font-semibold text-neutral-700">Pro</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.feature} className="border-b border-neutral-100 last:border-0">
                  <td className="px-4 py-3 text-neutral-700">{row.feature}</td>
                  <td className="px-4 py-3 text-center text-neutral-500">
                    {typeof row.free === "boolean" ? <Check included={row.free} /> : row.free}
                  </td>
                  <td className="px-4 py-3 text-center text-neutral-500">
                    {typeof row.pro === "boolean" ? <Check included={row.pro} /> : row.pro}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
