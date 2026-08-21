import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink, Quote, Star } from "lucide-react";

import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const title = "Pizza Fresca Case Study | Shree Shyam Kitchen Consultancy";
const description =
  "See how Shree Shyam Kitchen Consultancy supported Pizza Fresca with commercial kitchen planning, menu development, recipe standardisation, food costing, inventory systems, staff training and online-delivery support.";
const url = "https://shreeshyamkitchenconsultancy.com/portfolio/pizza-fresca";
const heroImage =
  "https://shreeshyamkitchenconsultancy.com/images/projects/pizza-fresca/optimized/tandoori-paneer-pizza.jpg";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Pizza Fresca case study",
    "restaurant consultancy portfolio",
    "pizzeria kitchen setup",
    "Italian menu engineering",
    "restaurant consultant Jaipur",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "article",
    url,
    title,
    description,
    images: [{ url: heroImage, alt: "Pizza Fresca tandoori paneer pizza" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [heroImage],
  },
};

const serviceGroups = [
  [
    "Commercial Kitchen Planning & Setup",
    "Equipment & Procurement Planning",
    "Menu Development & Engineering",
    "Recipe Standardisation",
  ],
  [
    "Food Costing",
    "Inventory & Ordering Systems",
    "Vendor & Raw-Material Support",
    "Staff Hiring & Training",
  ],
  [
    "SOP & Operational Systems",
    "Online Food Delivery Platform Integration & Operational Support",
    "Menu Revisions & Promotional Support",
  ],
] as const;

const recipeProcess = ["Recipe", "Portion", "Raw Cost", "Selling Price", "Consistency"] as const;
const inventoryProcess = [
  "Recipe",
  "Ingredient Requirement",
  "Purchase",
  "Stock",
  "Production",
] as const;

const outcomes = [
  "Commercial kitchen planned",
  "Equipment and procurement structure developed",
  "Multi-category menu developed",
  "Standard recipes created",
  "Food-costing framework implemented",
  "Inventory and ordering systems created",
  "Staff hiring and training supported",
  "Vendor and procurement assistance provided",
  "Online Food Delivery Platform Integration & Operational Support",
  "Menu optimisation and promotional support",
] as const;

const gallery = [
  ["margherita-classico.jpg", "Pizza Fresca Margherita Classico pizza"],
  ["pesto-lasagne.jpg", "Pizza Fresca pesto lasagne"],
  ["tomato-basil-bruschetta.jpg", "Pizza Fresca tomato basil bruschetta"],
  ["chipotle-paneer-bowl.jpg", "Pizza Fresca chipotle paneer bowl"],
  ["truffle-mushroom-burger.jpg", "Pizza Fresca truffle mushroom burger"],
  ["mint-mojito.jpg", "Pizza Fresca mint mojito"],
] as const;

const imageBase = "/images/projects/pizza-fresca";

export default function PizzaFrescaCaseStudyPage() {
  return (
    <main className="relative bg-background">
      <section className="relative min-h-[680px] overflow-hidden bg-foreground pt-28 text-background md:min-h-[720px] md:pt-32">
        <Image
          src={`${imageBase}/optimized/tandoori-paneer-pizza.jpg`}
          alt="Tandoori paneer pizza developed for Pizza Fresca"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/20" />

        <div className="container relative z-10 mx-auto flex min-h-[540px] items-center px-4 py-16 md:min-h-[580px]">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap gap-2">
              <Badge className="bg-primary text-primary-foreground">Cloud Kitchen · Jaipur</Badge>
              <Badge variant="outline" className="border-background/40 bg-background/10 text-background">
                Italian &amp; Continental
              </Badge>
            </div>
            <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-background md:text-6xl lg:text-7xl">
              Pizza Fresca
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-background/85 md:text-xl">
              From commercial kitchen planning and menu development to recipe standardisation,
              food costing, inventory systems, staff training and online-delivery support, SSKC
              helped build the operational foundation behind Pizza Fresca.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group bg-primary text-primary-foreground shadow-xl">
                <Link href="#case-study">
                  Explore the Case Study
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-background/40 bg-background/10 text-background hover:bg-background/20 hover:text-background"
              >
                <Link href="/#portfolio">Back to Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="case-study" className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                Project Overview
              </span>
              <h2 className="mb-6 font-serif text-3xl font-bold text-foreground md:text-4xl">
                Building the Operational Foundation for a Multi-Category Cloud Kitchen
              </h2>
              <div className="space-y-5 leading-relaxed text-muted-foreground">
                <p>
                  Pizza Fresca required an integrated operating system connecting commercial
                  kitchen planning, equipment, menu development, standard recipes and food
                  costing with the practical needs of day-to-day production.
                </p>
                <p>
                  The work also connected procurement, inventory, staff hiring, training and
                  operating procedures with online food delivery platform support, creating a
                  coordinated foundation for a multi-category cloud kitchen.
                </p>
              </div>
            </div>

            <Card className="rounded-2xl border-border/60 shadow-lg">
              <CardContent className="px-6 md:px-8">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Services Delivered
                </p>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {serviceGroups.map((group, groupIndex) => (
                    <ul key={groupIndex} className="space-y-3">
                      {group.map((service) => (
                        <li key={service} className="flex items-start gap-3 text-sm text-foreground">
                          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Kitchen Planning
            </span>
            <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Layout designed around production flow
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              The preview preserves the complete plan without cropping. Open the original layout
              for full-resolution inspection and browser zoom controls.
            </p>
          </div>

          <Card className="pizza-layout-card overflow-hidden rounded-2xl border-border/60 bg-card p-0 shadow-lg">
            <div className="pizza-layout-scroll overflow-x-auto p-3 md:p-5">
              <div className="pizza-layout-preview relative min-h-[310px] min-w-[1200px] overflow-hidden rounded-xl bg-white">
                <Image
                  src={`${imageBase}/optimized/kitchen-layout-preview.jpg`}
                  alt="Pizza Fresca kitchen equipment and workflow layout preview"
                  fill
                  sizes="1200px"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-between gap-4 border-t px-6 py-5 sm:flex-row sm:items-center">
              <p className="text-sm text-muted-foreground">
                On mobile, swipe horizontally to inspect the preview.
              </p>
              <Button asChild variant="outline" className="shrink-0 border-2">
                <Link
                  href={`${imageBase}/kitchen-layout.png`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Full Layout <ExternalLink />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="rounded-2xl border-border/60 shadow-sm">
              <CardContent className="px-6 md:px-8">
                <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  Menu Systems
                </span>
                <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
                  Recipe Standardisation &amp; Food Costing
                </h2>
                <p className="mb-8 leading-relaxed text-muted-foreground">
                  Standard recipe cards documented ingredients, quantities, production methods,
                  portions and yields, with costing structured separately. This supported
                  repeatable execution without exposing proprietary recipes or confidential raw costs.
                </p>
                <ProcessFlow items={recipeProcess} />
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/60 shadow-sm">
              <CardContent className="px-6 md:px-8">
                <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  Supply Systems
                </span>
                <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
                  Inventory &amp; Procurement Systems
                </h2>
                <p className="mb-8 leading-relaxed text-muted-foreground">
                  Documented inventory, ordering, dry-store and purchase-planning systems connected
                  menu requirements with stock control. Vendor and raw-material support helped the
                  team plan procurement around production needs.
                </p>
                <ProcessFlow items={inventoryProcess} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-border/60 bg-card p-7 shadow-sm md:p-9">
              <h2 className="mb-5 font-serif text-3xl font-bold text-foreground">
                Staff Training &amp; Operational Systems
              </h2>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                Support covered staff hiring, product preparation, portion consistency, recipe
                execution, kitchen workflow, practical training, SOPs and day-to-day operational
                discipline.
              </p>
              <p className="rounded-xl bg-primary/10 p-4 text-sm leading-relaxed text-foreground">
                The client's Google feedback independently recognises staff hiring, training and
                system development.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-7 shadow-sm md:p-9">
              <h2 className="mb-5 font-serif text-3xl font-bold text-foreground">
                Online Delivery &amp; Menu Optimisation
              </h2>
              <p className="mb-5 font-semibold text-primary">
                Online Food Delivery Platform Integration &amp; Operational Support
              </p>
              <p className="leading-relaxed text-muted-foreground">
                The documented work included online menu revisions, promotional pricing, and offer
                and menu support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Product Development
            </span>
            <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Products Developed During the Project
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              These images represent menu and product development undertaken during the
              consultancy, spanning pizza, lasagne, bowls, quick-service items and beverages.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map(([filename, alt], index) => (
              <figure
                key={filename}
                className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm ${
                  index === 0 || index === 5 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={`${imageBase}/optimized/${filename}`}
                    alt={alt}
                    fill
                    sizes={
                      index === 0 || index === 5
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
                        : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    }
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Project Outcome
            </span>
            <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
              Operational deliverables completed for Pizza Fresca
            </h2>
            <p className="text-muted-foreground">
              The engagement delivered a structured operational foundation across kitchen planning,
              menu systems, costing, inventory, training and online delivery support.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {outcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-5 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-foreground py-20 text-background md:py-24">
        <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <span className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary">
                Client Review
              </span>
              <h2 className="font-serif text-3xl font-bold text-background md:text-4xl">
                Feedback from Pizza Fresca
              </h2>
            </div>

            <div className="grid items-center gap-8 rounded-3xl border border-background/10 bg-background/5 p-5 backdrop-blur-sm md:grid-cols-[0.8fr_1.2fr] md:p-10">
              <div>
                <Quote className="mb-5 size-12 text-primary/60" />
                <div className="mb-5 flex gap-1" aria-label="Five-star review">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mb-6 text-lg leading-relaxed text-background md:text-xl">
                  Very good experience , ravinder sir delivered what he proposed. Menu development,
                  training , system development, staff hiring. The dishes were authentic and delicious.
                  Overall good consultancy and value for money.
                </blockquote>
                <p className="text-lg font-semibold text-background">tejasvi pareek</p>
                <p className="mt-1 text-sm text-background/70">Pizza Fresca</p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white">
                <Image
                  src={`${imageBase}/pizza-fresca-google-review.jpg`}
                  alt="Original Google review screenshot from Pizza Fresca"
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-contain"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-background/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                  Original Google Review
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}

function ProcessFlow({ items }: { items: readonly string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-2" aria-label={items.join(" to ")}>
      {items.map((item, index) => (
        <li key={item} className="flex items-center gap-2">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-semibold text-foreground">
            {item}
          </span>
          {index < items.length - 1 ? (
            <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
