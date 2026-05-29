import Link from "next/link";
import { contact } from "@/data/company";
import { ArrowRightIcon, PhoneIcon } from "@/components/icons";

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-brand-red">
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Ready to start your project?
          </h2>
          <p className="mt-2 max-w-xl text-white/90">
            Talk to our engineers about your electrical, fire safety, or mechanical
            requirements. We&apos;ll scope a turnkey solution that fits.
          </p>
          <a
            href={contact.phoneHref}
            className="mt-4 inline-flex items-center gap-2 text-lg font-bold text-white"
          >
            <PhoneIcon className="h-5 w-5" />
            {contact.phone}
          </a>
        </div>

        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-base font-bold text-brand-red transition-colors hover:bg-zinc-100"
        >
          Get a Quote
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
