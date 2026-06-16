import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for SpinDraw GmbH spin wheel raffle platform.",
};

export default function TermsPage() {
  return (
    <div className="safe-px mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <h1 className="section-title">Terms of Service</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: January 2024</p>

      <div className="glass mt-10 space-y-8 p-6 text-sm leading-relaxed text-slate-600 sm:p-8 sm:text-base">
        {[
          { title: "1. Agreement", text: "By accessing or using SpinDraw (\"the Service\"), operated by SpinDraw GmbH (\"we\", \"us\", \"our\"), registered in Berlin, Germany, you agree to be bound by these Terms of Service." },
          { title: "2. Description of Service", text: "SpinDraw provides an online spin wheel raffle platform that allows users to upload participant lists and conduct random prize draws. The Service is provided on an \"as is\" and \"as available\" basis." },
          { title: "3. User Responsibilities", text: "You are responsible for ensuring you have the right to use any participant data uploaded to the Service. You must comply with applicable data protection laws, including the GDPR." },
          { title: "4. Free and Pro Plans", text: "Free plan features are provided at no charge subject to usage limits. Pro plan subscriptions are billed monthly at the rate displayed on our Pricing page." },
          { title: "5. Limitation of Liability", text: "To the maximum extent permitted by German law, SpinDraw GmbH shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service." },
          { title: "6. Governing Law", text: "These Terms are governed by the laws of the Federal Republic of Germany. The courts of Berlin shall have exclusive jurisdiction." },
          { title: "7. Contact", text: "For questions about these Terms, contact us at legal@spindraw.de or SpinDraw GmbH, Friedrichstraße 68, 10117 Berlin, Germany." },
        ].map((s) => (
          <section key={s.title}>
            <h2 className="text-lg font-semibold text-slate-800">{s.title}</h2>
            <p className="mt-3">{s.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
