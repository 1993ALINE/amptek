import Link from "next/link";
import { company, contact, navLinks, services } from "@/data/company";
import { GlobeIcon, LocationIcon, MailIcon, PhoneIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="mt-16 bg-brand-blue-dark text-zinc-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
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
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
            Services
          </h3>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link href="/services" className="transition-colors hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
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

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-zinc-400 sm:px-6">
          © {company.founded}–2026 {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
