import Link from "next/link";
import Logo from "./Logo";

const footerLinks = {
  Product: [
    { href: "/upload",  label: "Spin Wheel"      },
    { href: "/history", label: "Draw History"    },
    { href: "/pricing", label: "Pricing"         },
    { href: "/faq",     label: "FAQ"             },
  ],
  Company: [
    { href: "/about",   label: "About"           },
    { href: "/contact", label: "Contact"         },
  ],
  Legal: [
    { href: "/terms",   label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy"   },
  ],
};

const socials = [
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://twitter.com",  label: "Twitter"  },
  { href: "https://github.com",   label: "GitHub"   },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-white">
      <div className="safe-px safe-pb mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Professional spin wheel raffles for events, teams, and organisations.
              Trusted across Europe since&nbsp;2019.
            </p>
            <div className="mt-6 flex gap-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 transition-colors hover:text-indigo-600"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-slate-500">{title}</h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-600 transition-colors hover:text-indigo-600">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-100 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">© 2019 Draw Master GmbH. All rights reserved.</p>
          <p className="text-sm text-slate-500">Berlin, Germany · Made in the EU</p>
        </div>
      </div>
    </footer>
  );
}
