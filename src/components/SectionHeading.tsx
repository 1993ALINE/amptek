import Reveal from "@/components/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <Reveal className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-red ${
            centered ? "justify-center" : ""
          }`}
        >
          <span
            aria-hidden
            className="h-px w-7 bg-gradient-to-r from-brand-red/0 to-brand-red"
          />
          {eyebrow}
          {centered && (
            <span
              aria-hidden
              className="h-px w-7 bg-gradient-to-l from-brand-red/0 to-brand-red"
            />
          )}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
