import type { Metadata } from "next";
import Accordion from "@/components/marketing/Accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about SpinDraw spin wheel raffles.",
};

const faqItems = [
  { question: "How does SpinDraw ensure fairness?", answer: "Every spin uses JavaScript's cryptographically secure random number generator. Each winner is selected uniformly from remaining participants — no participant has an advantage over another." },
  { question: "Can the same person win twice?", answer: "No. Once a participant is selected as a winner, they are removed from the pool for subsequent spins. Each draw produces unique winners up to your configured winner count." },
  { question: "What file formats are supported for upload?", answer: "SpinDraw currently supports Excel files in .xlsx format. Names should be listed in the first column, one per row. A header row labelled 'Name' is automatically detected and skipped." },
  { question: "Is there a limit on participants?", answer: "The Free plan supports up to 100 participants per draw. Pro plan users enjoy unlimited participants. The spin wheel automatically adjusts label sizing for larger lists." },
  { question: "Do I need to create an account?", answer: "No account is required to get started. Simply upload your participant list and begin spinning. Pro features such as team accounts and audit logs require a paid subscription." },
  { question: "Can I use SpinDraw for commercial events?", answer: "Absolutely. SpinDraw is used by trade show organisers, marketing teams, and HR departments for commercial prize draws. The Pro plan includes custom branding for a professional presentation." },
  { question: "Is my participant data stored permanently?", answer: "Participant data is stored locally in your browser session via localStorage and is not transmitted to our servers on the Free plan. When you clear site data, the list is removed." },
  { question: "Can I display the spin wheel on a projector or live stream?", answer: "Yes. The spin page is fully responsive and looks great on large screens. Many customers run SpinDraw on a laptop connected to a projector for live audience events." },
  { question: "What happens if I close the browser mid-draw?", answer: "Your participant list persists in localStorage until you clear it or upload a new list. Winner results from the current session are not persisted — we recommend noting winners as they are drawn." },
  { question: "How do I upgrade to Pro?", answer: "Visit our Pricing page and click 'Start 14-day trial'. You'll receive onboarding instructions within minutes. All Pro features activate immediately upon subscription." },
];

export default function FAQPage() {
  return (
    <div className="safe-px mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div className="text-center">
        <h1 className="section-title">Frequently asked questions</h1>
        <p className="section-subtitle mt-4">Everything you need to know about running fair raffles with SpinDraw</p>
      </div>
      <div className="mt-12"><Accordion items={faqItems} /></div>
    </div>
  );
}
