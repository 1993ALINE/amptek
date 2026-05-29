import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import SectionHeading from "@/components/SectionHeading";
import { serviceIcons, CheckIcon } from "@/components/icons";
import { services } from "@/data/company";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Electrical power, fire safety, mechanical, industrial automation, and safety engineering services from Amptek Engineering.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <section className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            eyebrow="Our Capabilities"
            title="Engineering Services"
            subtitle="Turnkey solutions across five integrated disciplines — engineered to standard, delivered with single-point accountability."
          />
        </div>
      </section>

      {/* Detailed service blocks */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-8">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.id];
            return (
              <article
                key={service.id}
                id={service.id}
                className="grid scroll-mt-24 gap-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8 md:grid-cols-[auto_1fr]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue text-white">
                  {Icon && <Icon className="h-8 w-8" />}
                </div>
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-bold text-brand-red">
                      0{i + 1}
                    </span>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                      {service.title}
                    </h2>
                  </div>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                    {service.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-3">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                      >
                        <CheckIcon className="h-4 w-4 text-brand-red" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-zinc-600 dark:text-zinc-400">
          Looking for engineering products too?{" "}
          <Link href="/" className="font-semibold text-brand-blue hover:underline dark:text-white">
            Visit our shop
          </Link>
          .
        </p>
      </div>

      <ContactCTA />
    </>
  );
}
