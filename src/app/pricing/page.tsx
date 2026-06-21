import Link from "next/link";
import type { Metadata } from "next";
import { IconCheck, IconMinus } from "@/components/icons/FeatureIcons";
import PremiumUpgradeButton from "@/components/marketing/PremiumUpgradeButton";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free draws for small events. Premium adds Excel import, unlimited participants, and more.",
};

const freeFeatures = [
  "Up to 100 participants per draw",
  "Up to 10 winners per draw",
  "Manual name entry",
  "Animated spin wheel",
  "Draw history on this device",
  "Community support",
];

const premiumFeatures = [
  "Unlimited participants",
  "Unlimited winners",
  "Excel (.xlsx) file import",
  "Custom branding & logo",
  "Export results to PDF",
  "Priority email support",
  "Team accounts (up to 10)",
  "Audit log & compliance reports",
];

const comparison = [
  { feature: "Participants per draw", free: "100", premium: "Unlimited" },
  { feature: "Winners per draw", free: "10", premium: "Unlimited" },
  { feature: "Excel upload", free: false, premium: true },
  { feature: "Manual name entry", free: true, premium: true },
  { feature: "Animated spin wheel", free: true, premium: true },
  { feature: "Draw history", free: true, premium: true },
  { feature: "Custom branding", free: false, premium: true },
  { feature: "Export results (PDF)", free: false, premium: true },
  { feature: "Team accounts", free: false, premium: true },
  { feature: "Audit log", free: false, premium: true },
  { feature: "Priority support", free: false, premium: true },
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
        <p className="badge-glass mx-auto mb-4 w-fit">Pricing</p>
        <h1 className="section-title">Plans built for fair draws</h1>
        <p className="section-subtitle mx-auto mt-4 max-w-2xl">
          Use Draw Master free for small raffles. Upgrade to Premium when you need Excel import,
          unlimited participants, and professional export tools.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="glass p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-neutral-900">Free</h2>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-neutral-900">€0</span>
            <span className="text-neutral-400">/month</span>
          </div>
          <p className="mt-2 text-sm text-neutral-500">
            For classrooms, team events, and small giveaways — no credit card required.
          </p>
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
          <Link href="/login" className="btn-secondary mt-8 block w-full text-center">
            Start draw — it&apos;s free
          </Link>
        </div>

        <div className="glass-strong relative border-indigo-200/50 bg-gradient-to-br from-indigo-600/5 to-violet-600/5 p-6 sm:p-8">
          <span className="absolute -top-3 right-6 rounded-full border border-indigo-500 bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
            Premium
          </span>
          <h2 className="text-lg font-semibold text-neutral-900">Premium</h2>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-neutral-900">€29</span>
            <span className="text-neutral-400">/month</span>
          </div>
          <p className="mt-2 text-sm text-neutral-500">
            For schools, companies, and organisers running larger or recurring raffles.
          </p>
          <p className="mt-3 rounded-lg border border-amber-200/80 bg-amber-50 px-3 py-2 text-xs text-amber-900">
            Premium upgrades are temporarily unavailable while we finish billing setup.
          </p>
          <ul className="mt-6 space-y-3">
            {premiumFeatures.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-neutral-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                  <IconCheck className="h-3 w-3 text-emerald-600" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <PremiumUpgradeButton />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-center text-xl font-bold text-neutral-900">Compare plans</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-neutral-500">
          Excel import and unlimited draw sizes are Premium only. Everything else you need to
          run a fair raffle is included on Free.
        </p>
        <div className="glass mt-8 overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="px-4 py-3 text-left font-semibold text-neutral-700">Feature</th>
                <th className="px-4 py-3 text-center font-semibold text-neutral-700">Free</th>
                <th className="px-4 py-3 text-center font-semibold text-indigo-700">Premium</th>
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
                    {typeof row.premium === "boolean" ? <Check included={row.premium} /> : row.premium}
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
