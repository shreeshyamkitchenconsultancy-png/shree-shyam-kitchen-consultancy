import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  FolderOpen, 
  MessageCircle, 
  Award, 
  MapPin, 
  Utensils, 
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

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

export function Hero({
  heroMain = "/images/herologo/heromainlogo.png",
  heroSecondaryOne = "/images/herologo/kitchenlayout1.png",
  heroSecondaryTwo = "/images/herologo/hero2logo.png",
}: HeroProps) {

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-accent/20">
      {/* Floating decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          className="absolute -left-20 bottom-40 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 pb-16 pt-24 lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
           
           {/* Headline */}
            <h1
              className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              <span className="text-balance">Transforming Restaurant Ideas Into</span>{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Profitable Businesses
              </span>
            </h1>

             {/* Subheadline */}
            <p
              className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl"
            >
              End-to-end restaurant consultancy for cafes, restaurants, cloud kitchens, 
              bakeries, resorts & hospitality ventures across India.
            </p>
            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-4"
            >
               <Button
                asChild
                size="lg"
                className="bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
              >
              <Link href="#contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Start Free Consultation
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
                className="bg-[#075E54] px-8 text-white shadow-lg transition-all hover:bg-[#06483F] hover:shadow-xl"
              >
                <Link href="https://wa.me/917820942754" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </Link>
              </Button>
            </div>

             {/* Trust Badges */}
            <div
              className="grid grid-cols-2 gap-3"
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.text}
                  className="glass flex items-center gap-3 rounded-xl p-3 transition-all hover:shadow-lg"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <badge.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

            {/* Right Content - Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Main Image */}
              <div
                className="col-span-2 overflow-hidden rounded-2xl shadow-2xl"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                <Image
  src={heroMain}
  alt="Modern hospitality kitchen interior"
  fill
  priority
  fetchPriority="high"
  quality={70}
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
/>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
              </div>
              </div>

              {/* Secondary Images */}
              <div
                className="overflow-hidden rounded-xl shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl">
               <Image
  src={heroSecondaryOne}
  alt="Hospitality kitchen planning visual"
  fill
  quality={65}
  sizes="(max-width: 768px) 50vw, 25vw"
  className="object-cover"
/>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
              </div>
              </div>

              <div
                className="overflow-hidden rounded-xl shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
  src={heroSecondaryTwo}
  alt="Restaurant interior design concept"
  fill
  quality={65}
  sizes="(max-width: 768px) 50vw, 25vw"
  loading="lazy"
  className="object-cover"
/>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
              </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <div
              className="glass absolute -bottom-6 -left-6 rounded-2xl p-4 shadow-xl"
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
            </div>
          </div>
        </div>

        {/* Animated Stats Section */}
        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <span className="block text-3xl font-bold text-primary md:text-4xl" aria-label={`${stat.value}${stat.suffix} ${stat.label}`}>{stat.value}{stat.suffix}</span>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
