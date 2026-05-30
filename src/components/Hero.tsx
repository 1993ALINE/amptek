import Link from "next/link";
import { company } from "@/data/company";
import { ArrowRightIcon } from "@/components/icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-blue-dark text-white">
      {/* Decorative brand gradient + grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-blue-dark" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-red/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
        <span className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-200">
          {company.name} · Bangladesh
        </span>
        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {company.tagline}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-200 sm:text-xl">
          {company.subtitle}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
          {company.blurb}
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-red/20 transition-all hover:bg-brand-red-dark hover:shadow-xl hover:shadow-brand-red/25"
          >
            Explore Services
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
