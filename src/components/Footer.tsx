import Link from "next/link";
import { company, contact, navLinks, services } from "@/data/company";
import { GlobeIcon, LocationIcon, MailIcon, PhoneIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-brand-blue-dark text-zinc-300">
      {/* Brand accent strip */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-red via-brand-red to-brand-blue" />
      {/* Faint grid + glow for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-brand-blue/30 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl gap-x-8 gap-y-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="text-xl font-extrabold tracking-tight text-white">
            <span className="text-brand-red">Amp</span>tek
            <span className="ml-1 text-sm font-medium uppercase tracking-widest text-zinc-400">
              Engineering
            </span>
          </Link>
          <p className="mt-3 text-sm leading-6 text-zinc-400">{company.blurb}</p>
          <p className="mt-4 text-sm font-semibold text-brand-red">{company.tagline}</p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white">
            Company
          </h3>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block text-zinc-400 transition-all hover:translate-x-0.5 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white">
            Services
          </h3>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href="/services"
                  className="inline-block text-zinc-400 transition-all hover:translate-x-0.5 hover:text-white"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <a href={contact.phoneHref} className="transition-colors hover:text-white">
                {contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <a href={`mailto:${contact.email}`} className="transition-colors hover:text-white">
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <GlobeIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <a
                href={contact.websiteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {contact.website}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <LocationIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <span>{contact.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-zinc-400 sm:px-6">
          © {company.founded}–2026 {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
