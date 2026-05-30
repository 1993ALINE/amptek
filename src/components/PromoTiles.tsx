import { ArrowRightIcon } from "@/components/icons";

const promos = [
  {
    id: "promo-switchgear",
    title: "Switchgear Deals",
    subtitle: "Up to 20% off HT/LT panels",
    cta: "Shop Now",
    gradient: "from-brand-red to-brand-red-dark",
  },
  {
    id: "promo-fire",
    title: "Fire Safety Bundles",
    subtitle: "Detection + suppression kits",
    cta: "Explore",
    gradient: "from-brand-blue to-brand-blue-dark",
  },
];

// Two stacked promo tiles that sit beside the main banner carousel.
export default function PromoTiles() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:flex lg:h-full lg:flex-col">
      {promos.map((promo) => (
        <a
          key={promo.id}
          href="#"
          className={`group relative flex min-h-[110px] flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br p-4 text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated lg:flex-1 ${promo.gradient}`}
        >
          <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10" />
          <div className="relative">
            <h3 className="text-base font-bold leading-tight sm:text-lg">{promo.title}</h3>
            <p className="mt-1 text-xs text-white/90 sm:text-sm">{promo.subtitle}</p>
          </div>
          <span className="relative mt-2 inline-flex items-center gap-1 text-xs font-semibold">
            {promo.cta}
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </a>
      ))}
    </div>
  );
}
