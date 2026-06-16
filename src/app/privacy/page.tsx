import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for SpinDraw GmbH — GDPR compliant.",
};

export default function PrivacyPage() {
  return (
    <div className="safe-px mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <h1 className="section-title">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: January 2024 · GDPR compliant</p>

      <div className="glass mt-10 space-y-8 p-6 text-sm leading-relaxed text-slate-600 sm:p-8 sm:text-base">
        {[
          { title: "1. Data Controller", text: "SpinDraw GmbH, Friedrichstraße 68, 10117 Berlin, Germany, is the data controller responsible for your personal data. Contact: privacy@spindraw.de" },
          { title: "2. Data We Collect", text: "On the Free plan, participant lists are stored locally in your browser (localStorage) and are not transmitted to our servers. Pro plan users may provide account information including name, email, and billing details." },
          { title: "3. Legal Basis (GDPR)", text: "We process personal data on the basis of: (a) contract performance for Pro subscribers, (b) legitimate interests for service improvement, and (c) consent where explicitly requested." },
          { title: "4. Data Retention", text: "Free plan data stored in your browser persists until you clear site data. Account data for Pro users is retained for the duration of the subscription plus 3 years for legal compliance." },
          { title: "5. Your Rights", text: "Under the GDPR, you have the right to access, rectify, erase, restrict processing, data portability, and to object to processing. You may lodge a complaint with the Berliner Beauftragte für Datenschutz und Informationsfreiheit." },
          { title: "6. Cookies", text: "We use essential cookies required for the Service to function. Analytics cookies are only set with your consent." },
          { title: "7. Contact", text: "For privacy enquiries, contact our Data Protection Officer at privacy@spindraw.de or write to SpinDraw GmbH, Friedrichstraße 68, 10117 Berlin, Germany." },
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
