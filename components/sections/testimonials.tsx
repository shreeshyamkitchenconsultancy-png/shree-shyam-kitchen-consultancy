import Image from "next/image";

import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";

interface TestimonialsProps {
  backgroundImage?: string;
}

export function Testimonials({
  backgroundImage = "/images/herologo/testimoniallogo.png",
}: TestimonialsProps) {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-foreground py-24">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Restaurant consultancy client testimonials"
          fill
          sizes="100vw"
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-secondary/30 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary">
            Testimonials
          </span>
          <h2 className="mb-4 font-serif text-3xl font-bold text-background md:text-4xl lg:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-2xl text-background/70">
            Hear from hospitality entrepreneurs who transformed their businesses with our consultancy.
          </p>
        </div>

        <TestimonialsCarousel />
      </div>
    </section>
  );
}
