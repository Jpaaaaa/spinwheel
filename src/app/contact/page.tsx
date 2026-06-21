import type { Metadata } from "next";
import ContactForm from "@/components/marketing/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Draw Master team in Berlin, Germany.",
};

export default function ContactPage() {
  return (
    <div className="safe-px mx-auto max-w-5xl px-4 pt-28 pb-12 sm:px-6 sm:pt-32 sm:pb-16 md:pb-20">
      <div className="text-center">
        <h1 className="section-title">Contact us</h1>
        <p className="section-subtitle mt-4">We&apos;d love to hear from you</p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="glass p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-neutral-900">Send a message</h2>
          <p className="mt-2 text-sm text-neutral-500">Fill out the form and our team will respond within 1–2 business days.</p>
          <div className="mt-6"><ContactForm /></div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-neutral-900">Office</h2>
            <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-neutral-500">
              <p className="font-medium text-neutral-700">Draw Master GmbH</p>
              <p>Friedrichstraße 68</p>
              <p>10117 Berlin</p>
              <p>Germany</p>
            </address>
          </div>
          <div className="glass p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-neutral-900">Contact details</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div><dt className="text-neutral-400">Email</dt><dd className="text-neutral-700">hello@drawmaster.de</dd></div>
              <div><dt className="text-neutral-400">Phone</dt><dd className="text-neutral-700">+49 30 1234 5678</dd></div>
              <div><dt className="text-neutral-400">Support hours</dt><dd className="text-neutral-700">Mon–Fri, 9:00–18:00 CET</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
