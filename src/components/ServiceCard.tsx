import { serviceIcons } from "@/components/icons";
import type { Service } from "@/data/company";

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.id];

  return (
    <article className="group flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue transition-colors group-hover:bg-brand-red group-hover:text-white dark:bg-brand-blue/20 dark:text-white">
        {Icon && <Icon className="h-6 w-6" />}
      </div>

      <div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
          {service.title}
        </h3>
        <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {service.summary}
        </p>
      </div>

      <ul className="mt-auto flex flex-wrap gap-2">
        {service.items.map((item) => (
          <li
            key={item}
            className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
