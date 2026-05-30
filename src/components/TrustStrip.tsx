import { BadgeCheckIcon, CashIcon, ReturnIcon, TruckIcon } from "@/components/icons";

const items = [
  { id: "cod", Icon: CashIcon, title: "Cash on Delivery", subtitle: "Pay when you receive" },
  { id: "fast", Icon: TruckIcon, title: "Fast Delivery", subtitle: "Nationwide shipping" },
  { id: "genuine", Icon: BadgeCheckIcon, title: "Genuine Products", subtitle: "100% authentic parts" },
  { id: "returns", Icon: ReturnIcon, title: "Easy Returns", subtitle: "Hassle-free policy" },
];

export default function TrustStrip() {
  return (
    <section className="grid grid-cols-2 gap-x-4 gap-y-5 rounded-xl border border-zinc-200/80 bg-white p-5 shadow-soft dark:border-zinc-800 dark:bg-zinc-900 sm:grid-cols-4">
      {items.map(({ id, Icon, title, subtitle }) => (
        <div key={id} className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue dark:bg-brand-blue/20 dark:text-white">
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <div className="text-sm font-bold text-zinc-900 dark:text-white">{title}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</div>
          </div>
        </div>
      ))}
    </section>
  );
}
