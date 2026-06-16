import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about SpinDraw GmbH — professional spin wheel raffles since 2019.",
};

const team = [
  { name: "Dr. Markus Weber", role: "CEO & Co-founder", initials: "MW", color: "border-blue-200/50 bg-blue-600/10 text-blue-600" },
  { name: "Anna Schneider", role: "CTO", initials: "AS", color: "border-cyan-200/50 bg-cyan-600/10 text-cyan-600" },
  { name: "Felix Braun", role: "Head of Product", initials: "FB", color: "border-violet-200/50 bg-violet-600/10 text-violet-600" },
  { name: "Julia Krause", role: "Customer Success", initials: "JK", color: "border-emerald-200/50 bg-emerald-600/10 text-emerald-600" },
];

export default function AboutPage() {
  return (
    <div className="safe-px mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="text-center">
        <h1 className="section-title">About SpinDraw</h1>
        <p className="section-subtitle mt-4">Fair raffles, built in Berlin</p>
      </div>

      <div className="glass mt-12 space-y-6 p-6 text-sm leading-relaxed text-slate-600 sm:p-8 sm:text-base">
        <p>
          SpinDraw was founded in 2019 in Berlin, Germany, with a simple mission: make prize draws
          transparent, professional, and accessible to everyone. What started as a side project for
          a local charity event has grown into a platform trusted by over 10,000 organisations
          across 50 countries.
        </p>
        <p>
          Our team of engineers and event professionals saw firsthand how awkward and unreliable
          manual raffles could be — names pulled from a hat, spreadsheets with typos, disputes over
          fairness. We built SpinDraw to solve that with a beautiful spin wheel experience backed
          by true random selection.
        </p>
      </div>

      <div className="glass-strong mt-8 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-slate-800">Our Mission</h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          To give every organisation — from school assemblies to Fortune 500 town halls — the tools
          to run raffles that are fair, transparent, and genuinely exciting. We believe trust is
          earned through transparency, and every spin on SpinDraw reflects that commitment.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-center text-2xl font-bold text-slate-800">Our Team</h2>
        <p className="mt-2 text-center text-sm text-slate-600">Based in Berlin · Remote across the EU</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {team.map((member) => (
            <div key={member.name} className="glass flex items-center gap-4 p-5">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border text-lg font-bold ${member.color}`}>
                {member.initials}
              </div>
              <div>
                <p className="font-semibold text-slate-800">{member.name}</p>
                <p className="text-sm text-slate-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
