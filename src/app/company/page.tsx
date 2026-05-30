import type { Metadata } from "next";
import ContactCTA from "@/components/ContactCTA";
import FeaturedStrip from "@/components/FeaturedStrip";
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import WhyChooseUs from "@/components/WhyChooseUs";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Company",
  description: company.blurb,
};

// FeaturedStrip reads featured products live from Supabase.
export const dynamic = "force-dynamic";

// The corporate landing page (formerly the homepage).
export default function CompanyPage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <FeaturedStrip />
      <ContactCTA />
    </>
  );
}
