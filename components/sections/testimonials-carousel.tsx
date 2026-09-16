"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateCurrent = (nextIndex: number) => {
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    setIsTransitioning(true);
    transitionTimer.current = setTimeout(() => {
      setCurrent(nextIndex);
      requestAnimationFrame(() => setIsTransitioning(false));
    }, 150);
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isAutoPlaying || reduced) return;
    const timer = window.setInterval(() => {
      updateCurrent((current + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [current, isAutoPlaying]);

  useEffect(() => () => {
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
  }, []);

  const item = testimonials[current];

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className={`rounded-3xl border border-background/10 bg-background/5 p-8 backdrop-blur-sm transition-opacity duration-300 md:p-12 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        <Quote className="mb-6 h-12 w-12 text-primary/50" aria-hidden="true" />
        <div className="mb-6 flex gap-1" role="img" aria-label={`${item.rating} out of 5 stars`}>
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-primary text-primary" aria-hidden="true" />
          ))}
        </div>
        <blockquote className="mb-8 text-xl leading-relaxed text-background md:text-2xl">
          {item.content}
        </blockquote>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20" aria-hidden="true">
            <span className="text-xl font-bold text-primary">{item.name.charAt(0)}</span>
          </div>
          <div>
            <p className="text-lg font-semibold text-background">{item.name}</p>
            <p className="text-sm text-background/70">{item.role}, {item.company}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <Button variant="outline" size="icon" aria-label="Previous testimonial" onClick={() => {
          setIsAutoPlaying(false);
          updateCurrent((current - 1 + testimonials.length) % testimonials.length);
        }} className="rounded-full border-background/20 bg-transparent text-background hover:bg-background/10">
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === current ? "true" : undefined}
              onClick={() => {
                setIsAutoPlaying(false);
                updateCurrent(index);
              }}
              className={`h-2 rounded-full transition-all ${index === current ? "w-8 bg-primary" : "w-2 bg-background/30 hover:bg-background/50"}`}
            />
          ))}
        </div>

        <Button variant="outline" size="icon" aria-label="Next testimonial" onClick={() => {
          setIsAutoPlaying(false);
          updateCurrent((current + 1) % testimonials.length);
        }} className="rounded-full border-background/20 bg-transparent text-background hover:bg-background/10">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
