import type { Metadata } from "next";
import { Suspense } from "react";
import SectionHeading from "@/components/SectionHeading";
import Backdrop from "@/components/Backdrop";
import TrackOrder from "@/components/TrackOrder";

export const metadata: Metadata = {
  title: "Track Order",
  description: "Check the status of your Amptek order using your order number.",
};

export default function TrackPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900/40 dark:to-transparent">
        <Backdrop />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            eyebrow="Order Tracking"
            title="Track Your Order"
            subtitle="Enter your order number to see its current status, items, and total."
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent"
        />
      </section>

      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        {/* useSearchParams (for the ?order= deep link) needs a Suspense boundary. */}
        <Suspense fallback={<div className="h-40" aria-hidden />}>
          <TrackOrder />
        </Suspense>
      </main>
    </>
  );
}
