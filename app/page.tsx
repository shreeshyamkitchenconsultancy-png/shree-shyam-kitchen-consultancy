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
