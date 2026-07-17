"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TestimonialsProps {
  backgroundImage?: string;
}

const testimonials = [
  {
    id: 1,
    name: "Himani Sharma",
    role: "Restaurant Owner",
    company: "The Bamboo Nation",
    content: "Working with Shree Shyam Kitchen Consultancy was a game-changer for our restaurant. Chef Ravindra expertise in kitchen planning and menu engineering helped us achieve operational excellence from day one. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Shivansh Saini",
    role: "Cloud Kitchen Owner",
    company: "SKY KITCHEN",
    content: "The team attention to detail and industry knowledge is unparalleled. They didn't just consult - they became partners in our success. Our cafe operations are now streamlined and profitable.",
    rating: 5,
  },
  {
    id: 3,
    name: "Tejas Pareek",
    role: "Pizzeria Founder",
    company: "Pizza Fresca",
    content: "From kitchen setup to Swiggy/Zomato optimization, Shree Shyam provided end-to-end support. Their practical approach and real industry experience made all the difference in our cloud kitchen's success.",
    rating: 5,
  },
];

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

export function Testimonials({ backgroundImage = "/images/herologo/testimoniallogo.png" }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReduceMotion = usePrefersReducedMotion();

  const updateCurrent = (nextIndex: number) => {
    if (transitionTimer.current) {
      clearTimeout(transitionTimer.current);
    }

    if (shouldReduceMotion) {
      setCurrent(nextIndex);
      return;
    }

    setIsTransitioning(true);
    transitionTimer.current = setTimeout(() => {
      setCurrent(nextIndex);
      requestAnimationFrame(() => setIsTransitioning(false));
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (transitionTimer.current) {
        clearTimeout(transitionTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || shouldReduceMotion) return;
    const timer = setInterval(() => {
      updateCurrent((current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, isAutoPlaying, shouldReduceMotion]);

  const next = () => {
    setIsAutoPlaying(false);
    updateCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    updateCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative overflow-hidden bg-foreground py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Hospitality testimonial visual"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div
        className="absolute left-10 top-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl"
      />
      <div
        className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-secondary/30 blur-3xl"
      />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div
          className="mb-12 text-center"
        >
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

        {/* Testimonial Slider */}
        <div className="relative mx-auto max-w-4xl">
            <div
              key={current}
              className={`rounded-3xl border border-background/10 bg-background/5 p-8 backdrop-blur-sm md:p-12 ${
                shouldReduceMotion ? "" : "transition-opacity duration-300"
              } ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              {/* Quote Icon */}
              <Quote className="mb-6 h-12 w-12 text-primary/50" />

              {/* Stars */}
              <div className="mb-6 flex gap-1">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="mb-8 text-xl leading-relaxed text-background md:text-2xl">
                {testimonials[current].content}
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                {/* Avatar Placeholder */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
                  <span className="text-xl font-bold text-primary">
                    {testimonials[current].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-semibold text-background">
                    {testimonials[current].name}
                  </p>
                  <p className="text-sm text-background/70">
                    {testimonials[current].role}, {testimonials[current].company}
                  </p>
                </div>
              </div>
            </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full border-background/20 bg-transparent text-background hover:bg-background/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    updateCurrent(index);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === current
                      ? "w-8 bg-primary"
                      : "w-2 bg-background/30 hover:bg-background/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full border-background/20 bg-transparent text-background hover:bg-background/10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
