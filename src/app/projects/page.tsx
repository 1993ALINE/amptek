import type { Metadata } from "next";
import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/company";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected electrical, fire safety, mechanical, and industrial automation projects delivered by Amptek Engineering across Bangladesh.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            eyebrow="Our Work"
            title="Featured Projects"
            subtitle="A selection of turnkey engineering projects delivered for clients across Bangladesh."
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-md bg-brand-red px-2.5 py-1 text-xs font-bold text-white">
                  {project.category}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
                  <span>{project.location}</span>
                  <span aria-hidden>•</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {project.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ContactCTA />
    </>
  );
}
