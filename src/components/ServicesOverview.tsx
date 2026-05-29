import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { ArrowRightIcon } from "@/components/icons";
import { services } from "@/data/company";

export default function ServicesOverview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading
        eyebrow="What We Do"
        title="Engineering Services"
        subtitle="Five integrated disciplines, delivered end-to-end — from design and supply through installation, commissioning, and maintenance."
        centered
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}

        {/* Call-to-action tile filling the grid */}
        <Link
          href="/services"
          className="flex flex-col justify-center gap-3 rounded-2xl bg-brand-blue p-6 text-white transition-colors hover:bg-brand-blue-dark"
        >
          <span className="text-lg font-bold">Explore all services</span>
          <span className="text-sm text-zinc-200">
            See full capabilities, standards, and scope across every discipline.
          </span>
          <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold">
            View Services <ArrowRightIcon className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}
