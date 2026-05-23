"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  FolderOpen, 
  MessageCircle, 
  Award, 
  MapPin, 
  Utensils, 
  CheckCircle2, 
  Search 
} from "lucide-react";
import Link from "next/link";
import { AnimatedCounter } from "@/components/ui/animated-counter";

interface HeroProps {
  heroMain?: string;
  heroSecondaryOne?: string;
  heroSecondaryTwo?: string;
}

const trustBadges = [
  { icon: Award, text: "10+ Years Industry Experience" },
  { icon: MapPin, text: "Pan India Consultancy" },
  { icon: Utensils, text: "End-to-End Restaurant Solutions" },
  { icon: CheckCircle2, text: "15+ Projects Delivered" },
];

const stats = [
  { value: 15, suffix: "+", label: "Projects Delivered" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

const searchTargets = [
  { label: "Services", href: "#services", aliases: ["services", "service", "offerings", "consulting"] },
  { label: "About", href: "#about", aliases: ["about", "founder", "story"] },
  { label: "Portfolio", href: "#portfolio", aliases: ["portfolio", "projects", "work"] },
  { label: "Process", href: "#process", aliases: ["process", "workflow", "how we work"] },
  { label: "Testimonials", href: "#testimonials", aliases: ["testimonials", "reviews", "clients"] },
  { label: "Contact", href: "#contact", aliases: ["contact", "book", "consultation"] },
];

export function Hero({
  heroMain = "/images/herologo/heromainlogo.png",
  heroSecondaryOne = "/images/herologo/kitchenlayout1.png",
  heroSecondaryTwo = "/images/herologo/hero2logo.png",
}: HeroProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFeedback, setSearchFeedback] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = searchQuery.trim().toLowerCase();

    if (!trimmed) {
      setSearchFeedback("Type a section name like Services, Portfolio, or Contact.");
      return;
    }

    const match = searchTargets.find((target) =>
      target.label.toLowerCase().includes(trimmed) ||
      target.aliases.some((alias) => alias.includes(trimmed))
    );

    if (match) {
      const element = document.querySelector(match.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", match.href);
      }
      setSearchFeedback(`Navigating to ${match.label}...`);
      return;
    }

    setSearchFeedback("No match found. Try Services, Portfolio, Process, Testimonials, About, or Contact.");
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-accent/20">
      {/* Floating decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -left-20 bottom-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 pb-16 pt-24 lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
           
           {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
            >
              <span className="text-balance">Transforming Restaurant Ideas Into</span>{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Profitable Businesses
              </span>
            </motion.h1>

             {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              End-to-end restaurant consultancy for cafes, restaurants, cloud kitchens, 
              bakeries, resorts & hospitality ventures across India.
            </motion.p>

              <motion.form
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="space-y-3"
            >
              <div className="relative max-w-xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search sections: Services, Portfolio, Contact..."
                  className="pl-11 pr-28"
                  aria-label="Search website sections"
                />
                  <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Search
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {searchFeedback || "Search site sections like Services, About, Portfolio, Process, Testimonials, Contact."}
              </p>
            </motion.form>
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
               <Button
                asChild
                size="lg"
                className="bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
              >
              <Link href="#contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free Consultation
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-foreground/20 bg-transparent px-8 transition-all hover:bg-foreground hover:text-background"
              >
                <Link href="#portfolio">
                  <FolderOpen className="mr-2 h-5 w-5" />
                  View Our Projects
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-[#25D366] px-8 text-white shadow-lg transition-all hover:bg-[#128C7E] hover:shadow-xl"
              >
                <Link href="https://wa.me/917820942754" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </Link>
              </Button>
            </motion.div>

             {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-3"
            >
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="glass flex items-center gap-3 rounded-xl p-3 transition-all hover:shadow-lg"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <badge.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

            {/* Right Content - Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Main Image */}
              <motion.div
                className="col-span-2 overflow-hidden rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                <Image
  src={heroMain}
  alt="Modern hospitality kitchen interior"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="eager"
  priority
  className="object-cover"
/>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
              </div>
              </motion.div>

              {/* Secondary Images */}
              <motion.div
                className="overflow-hidden rounded-xl shadow-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-square overflow-hidden rounded-xl">
               <Image
  src={heroSecondaryOne}
  alt="Hospitality kitchen planning visual"
  fill
  sizes="(max-width: 768px) 50vw, 25vw"
  loading="eager"
  priority
  className="object-cover"
/>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
              </div>
              </motion.div>

              <motion.div
                className="overflow-hidden rounded-xl shadow-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
  src={heroSecondaryTwo}
  alt="Restaurant interior design concept"
  fill
  sizes="(max-width: 768px) 50vw, 25vw"
  loading="lazy"
  className="object-cover"
/>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
              </div>
              </motion.div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              className="glass absolute -bottom-6 -left-6 rounded-2xl p-4 shadow-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <Award className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">15+</p>
                  <p className="text-xs text-muted-foreground">Projects Completed</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="rounded-2xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="text-3xl font-bold text-primary md:text-4xl"
              />
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}