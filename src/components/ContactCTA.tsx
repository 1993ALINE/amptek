import Link from "next/link";
import { contact } from "@/data/company";
import { ArrowRightIcon, PhoneIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-red to-brand-red-dark">
      {/* Faint grid + soft glows for layered depth */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(120% 120% at 0% 0%, #000 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(120% 120% at 0% 0%, #000 30%, transparent 80%)",
        }}
      />
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-brand-blue/25 blur-3xl" />

      <Reveal className="relative">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
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
            className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-base font-bold text-brand-red shadow-lg shadow-black/10 ring-1 ring-inset ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Get a Quote
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
