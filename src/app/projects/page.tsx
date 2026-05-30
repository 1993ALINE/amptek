import type { Metadata } from "next";
import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";
import SectionHeading from "@/components/SectionHeading";
import Backdrop from "@/components/Backdrop";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/company";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected electrical, fire safety, mechanical, and industrial automation projects delivered by Amptek Engineering across Bangladesh.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900/40 dark:to-transparent">
        <Backdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            eyebrow="Our Work"
            title="Featured Projects"
            subtitle="A selection of turnkey engineering projects delivered for clients across Bangladesh."
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"
        />
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.id}
              className="accent-line-top group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-lift dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient scrim lifts the category badge off busy imagery */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/25 to-transparent"
                />
                <span className="absolute left-3 top-3 rounded-md bg-gradient-to-br from-brand-red to-brand-red-dark px-2.5 py-1 text-xs font-bold text-white shadow-sm ring-1 ring-inset ring-white/15">
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
        </Reveal>
      </div>

      <ContactCTA />
    </>
  );
}
