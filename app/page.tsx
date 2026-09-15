import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Process } from "@/components/sections/process";
import { Portfolio } from "@/components/sections/portfolio";
import { Clients } from "@/components/sections/clients";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Restaurant Consultant Jaipur | Shree Shyam Kitchen Consultancy",
  description:
    "Chef-led restaurant consultancy in Jaipur for cafes, QSRs, cloud kitchens and restaurants: kitchen planning, menu, costing, recipes, training and launch support.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Restaurant Consultant Jaipur | Shree Shyam Kitchen Consultancy",
    description:
      "Kitchen planning, menu engineering, food costing, recipe standardisation, staff training and launch support for food businesses.",
    url: "https://shreeshyamkitchenconsultancy.com/",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Services />
      <Stats />
      <About />
      <WhyChooseUs />
      <Process />
      <Portfolio />
      <Clients />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
