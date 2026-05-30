import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { ArrowRightIcon } from "@/components/icons";
import { services } from "@/data/company";
import Reveal from "@/components/Reveal";

export default function ServicesOverview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionHeading
        eyebrow="What We Do"
        title="Engineering Services"
        subtitle="Five integrated disciplines, delivered end-to-end — from design and supply through installation, commissioning, and maintenance."
        centered
      />

      <Reveal className="mt-12" delay={100}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}

          {/* Call-to-action tile filling the grid */}
          <Link
            href="/services"
            className="sheen-top group relative flex flex-col justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-blue to-brand-blue-dark p-6 text-white shadow-card ring-1 ring-inset ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
          >
            <div
              aria-hidden
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-red/25 blur-2xl transition-transform duration-500 group-hover:scale-125"
            />
            <span className="relative text-lg font-bold">Explore all services</span>
            <span className="relative text-sm text-zinc-200">
              See full capabilities, standards, and scope across every discipline.
            </span>
            <span className="relative mt-2 inline-flex items-center gap-2 text-sm font-semibold">
              View Services
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
