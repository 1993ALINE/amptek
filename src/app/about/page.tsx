import type { Metadata } from "next";
import ContactCTA from "@/components/ContactCTA";
import SectionHeading from "@/components/SectionHeading";
import Backdrop from "@/components/Backdrop";
import Reveal from "@/components/Reveal";
import { CheckIcon } from "@/components/icons";
import { company, stats, whyChooseUs } from "@/data/company";

export const metadata: Metadata = {
  title: "About",
  description: `${company.name} — a Bangladesh-based engineering firm delivering turnkey electrical, fire safety, and mechanical solutions.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900/40 dark:to-transparent">
        <Backdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            eyebrow="About Us"
            title="Engineering Tomorrow Today"
            subtitle={company.blurb}
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"
        />
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Who We Are
            </h2>
            <div className="mt-4 space-y-4 text-base leading-7 text-zinc-600 dark:text-zinc-300">
              <p>
                Founded in {company.founded}, {company.name} has grown into a
                trusted multidisciplinary engineering partner for industrial,
                commercial, and infrastructure clients across Bangladesh.
              </p>
              <p>
                We deliver complete electrical power, fire safety, mechanical,
                industrial automation, and safety solutions — managing every
                project from design and supply through installation, commissioning,
                and long-term maintenance.
              </p>
              <p>
                Our work is grounded in international standards including NFPA and
                IEC, and our engineers are committed to safety, quality, and
                on-time delivery on every engagement.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Our Mission
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-300">
              To engineer reliable, safe, and efficient systems that power and
              protect our clients&apos; operations — combining technical excellence
              with dependable service.
            </p>
            <ul className="mt-6 space-y-3">
              {whyChooseUs.map((point) => (
                <li key={point.id} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="font-semibold text-zinc-900 dark:text-white">
                      {point.title}.
                    </span>{" "}
                    <span className="text-zinc-600 dark:text-zinc-400">
                      {point.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </Reveal>

        {/* Stats */}
        <Reveal className="mt-16" delay={100}>
          <div className="sheen-top relative grid grid-cols-2 gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-dark p-8 text-center text-white shadow-elevated ring-1 ring-inset ring-white/10 lg:grid-cols-4">
            <div aria-hidden className="deco-grid-fine absolute inset-0 opacity-50" />
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-red/20 blur-3xl"
            />
            {stats.map((stat) => (
              <div key={stat.label} className="relative">
                <div className="text-3xl font-extrabold sm:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-zinc-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <ContactCTA />
    </>
  );
}
