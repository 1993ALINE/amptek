// Decorative backdrop for light section headers and panels: a faint engineering
// grid plus two soft, blurred brand-coloured glows. Purely presentational and
// inert to pointer/AT. Drop it as the first child of a `relative overflow-hidden`
// container, then give the real content `relative` so it paints above.
export default function Backdrop({
  className = "",
  variant = "grid",
}: {
  className?: string;
  /** Texture flavour: faint grid lines or a softer dot field. */
  variant?: "grid" | "dots";
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className={`absolute inset-0 ${variant === "dots" ? "deco-dots" : "deco-grid"}`} />
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-blue/[0.07] blur-3xl" />
      <div className="absolute -right-40 -top-32 h-80 w-80 rounded-full bg-brand-red/[0.05] blur-3xl" />
    </div>
  );
}
