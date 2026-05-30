import Link from "next/link";
import { company } from "@/data/company";
import { ArrowRightIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-blue-dark text-white">
      {/* Decorative brand gradient + layered depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-blue-dark" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(120% 110% at 80% 0%, #000 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(120% 110% at 80% 0%, #000 30%, transparent 80%)",
        }}
      />
      {/* Soft brand glows for atmospheric depth */}
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-red/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-brand-blue/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-200 backdrop-blur-sm">
            <span aria-hidden className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-red" />
            </span>
            {company.name} · Bangladesh
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {company.tagline}
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-4 max-w-xl text-lg text-zinc-200 sm:text-xl">
            {company.subtitle}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
            {company.blurb}
          </p>
        </Reveal>

        <Reveal delay={230}>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="sheen-top group inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-b from-brand-red to-brand-red-dark px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-red/25 ring-1 ring-inset ring-white/10 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-red/30"
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
        </Reveal>
      </div>

      {/* Thin brand accent divider grounding the hero into the page below */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-red/60 to-transparent"
      />
    </section>
  );
}
