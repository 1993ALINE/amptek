import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";
import Backdrop from "@/components/Backdrop";
import Reveal from "@/components/Reveal";
import { GlobeIcon, LocationIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { company, contact } from "@/data/company";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${company.name} — phone ${contact.phone}, email ${contact.email}.`,
};

const details = [
  {
    id: "phone",
    label: "Phone",
    value: contact.phone,
    href: contact.phoneHref,
    Icon: PhoneIcon,
  },
  {
    id: "email",
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    Icon: MailIcon,
  },
  {
    id: "website",
    label: "Website",
    value: contact.website,
    href: contact.websiteHref,
    Icon: GlobeIcon,
  },
  {
    id: "address",
    label: "Address",
    value: contact.address,
    href: undefined,
    Icon: LocationIcon,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900/40 dark:to-transparent">
        <Backdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            eyebrow="Get In Touch"
            title="Contact Us"
            subtitle="Tell us about your electrical, fire safety, or mechanical project and our engineers will respond promptly."
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"
        />
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          {/* Details */}
          <Reveal>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              {company.name}
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              {company.subtitle}
            </p>

            <ul className="mt-8 space-y-6">
              {details.map(({ id, label, value, href, Icon }) => (
                <li key={id} className="group flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue ring-1 ring-inset ring-brand-blue/15 transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white group-hover:ring-white/20 dark:bg-brand-blue/20 dark:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        className="text-base font-medium text-zinc-900 hover:text-brand-red dark:text-zinc-100"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                        {value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-soft ring-1 ring-inset ring-black/5 dark:border-zinc-800 dark:bg-zinc-900 dark:ring-white/5 sm:p-8">
              <h2 className="mb-6 text-xl font-bold text-zinc-900 dark:text-white">
                Send us a message
              </h2>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
