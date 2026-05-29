import type { Metadata } from "next";
import ContactCTA from "@/components/ContactCTA";
import SectionHeading from "@/components/SectionHeading";
import { CheckIcon } from "@/components/icons";
import { company, stats, whyChooseUs } from "@/data/company";

export const metadata: Metadata = {
  title: "About",
  description: `${company.name} — a Bangladesh-based engineering firm delivering turnkey electrical, fire safety, and mechanical solutions.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            eyebrow="About Us"
            title="Engineering Tomorrow Today"
            subtitle={company.blurb}
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
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

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 rounded-2xl bg-brand-blue p-8 text-center text-white lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold sm:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-zinc-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <ContactCTA />
    </>
  );
}
