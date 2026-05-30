import SectionHeading from "@/components/SectionHeading";
import { CheckIcon } from "@/components/icons";
import { stats, whyChooseUs } from "@/data/company";

export default function WhyChooseUs() {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-900/40">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          eyebrow="Why Amptek"
          title="Built on Expertise & Accountability"
          subtitle="We combine multidisciplinary engineering depth with single-point delivery — so your project is safe, compliant, and on time."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((point) => (
            <div
              key={point.id}
              className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                <CheckIcon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-bold text-zinc-900 dark:text-white">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats band */}
        <div className="mt-12 grid grid-cols-2 gap-6 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-dark p-8 text-center text-white shadow-elevated lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold sm:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-zinc-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
