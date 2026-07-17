"use client";

import Image from "next/image";
import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

interface Project {
  id: number;
  name: string;
  category: string;
  cuisine: string;
  services: string[];
  description: string;
  featured: boolean;
  image?: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "The Bamboo Nation",
    category: "Restaurant",
    cuisine: "Multi-Cuisine",
    image: "/images/portfolio/bamboonation2.png",
    services: [
      "Complete restaurant concept development",
      "Kitchen planning & workflow design",
      "Menu engineering & cuisine planning",
      "Kitchen equipment consultation",
      "Staff hiring & operational training",
      "SOP development",
      "Launch support & operational setup",
      "Branding consultation",
    ],
    description: "A modern hospitality dining concept designed with a nature-inspired ambiance and operationally optimized kitchen workflow. Focused on customer experience, menu profitability, and scalable restaurant operations.",
    featured: true,
  },
  {
    id: 2,
    name: "SKY Kitchen",
    category: "Cloud Kitchen",
    cuisine: "Multi-Cuisine",
    image: "/images/portfolio/theskykitchen.jpg",
    services: [
      "Cloud kitchen setup consultancy",
      "Kitchen layout planning",
      "Production workflow optimization",
      "Menu engineering",
      "Inventory management systems",
      "Food costing & profitability setup",
      "Staff training",
      "Swiggy/Zomato onboarding",
    ],
    description: "A delivery-focused cloud kitchen project developed for high-efficiency food production, optimized delivery operations, and scalable online food business growth.",
    featured: true,
  },
  {
    id: 3,
    name: "The Lari Restaurant",
    category: "FineRestaurant",
    cuisine: "Multi-Cuisine",
    image: "/images/portfolio/larirestaurant.jpg",
    services: [
      "Restaurant concept planning",
      "Theme & branding consultation",
      "2d & 3d interior design",
      "Kitchen layout & design",
      "Menu development",
      "SOP creation",
      "Staff operational training",
      "Swiggy/Zomato & POS onboarding",
      "Service workflow management",
            "Launch execution support",
    ],
    description: "A vibrant restaurant concept blending modern dining aesthetics with practical hospitality operations, designed to maximize customer engagement and operational efficiency.",
    featured: true,
  },
  {
    id: 4,
    name: "Cafe Light",
    category: "Cafe",
    cuisine: "Coffee & Cocktails",
    image: "/images/portfolio/cafelight.jpg",
    services: [
      "Cafe concept development",
      "Bar & Cofee Setup",
      "Beverage & cafe menu training",
      "Kitchen workflow setup",
      "Staff training & SOPs",
      "Inventory systems setup",
    ],
    description: "A premium cafe setup focused on modern ambiance, optimized cafe operations, beverage innovation, and customer-centric dining experiences.",
    featured: true,
  },
  {
    id: 5,
    name: "Pizza Fresca",
    category: "QSR",
    cuisine: "Italian",
    image: "/images/portfolio/pizzafresca.jpg",
    services: [
      "Italian menu engineering",
      "Kitchen setup & design",
      "Equipment consultation",
      "Recipe standardization",
      "Food costing systems",
      "Staff training",
      "Swiggy/Zomato & POS onboarding",
    ],
    description: "An Italian-focused pizza brand developed with streamlined kitchen operations, authentic menu planning, and profitability-focused production systems.",
    featured: true,
  },
  {
    id: 6,
    name: "Kammo's Kitchen",
    category: "Cloud Kitchen & Cafe",
    cuisine: "Multicuisine",
    image: "/images/portfolio/kammoskitchen.jpg",
    services: ["Concept Development", "Menu Engineering", "Kitchen Setup"],
    description: "Authentic North Indian dining experience with traditional recipes and modern presentation.",
    featured: true,
  },
  {
    id: 7,
    name: "Walker's Stop Cafe House",
    category: "Cafe",
    cuisine: "Continental",
    image: "/images/portfolio/walkerstopcafehouse.jpg",
    services: ["Operations Management", "Menu Planning", "Staff Training"],
    description: "Cozy cafe concept with continental offerings and specialty beverages.",
    featured: true,
  },
  {
    id: 8,
    name: "Burger Heaven",
    category: "Cloud Kitchen",
    cuisine: "American",
    image: "/images/portfolio/burgerheavenlogo.png",
    services: ["QSR Setup", "Kitchen Design", "Operations"],
    description: "Quick service burger joint with efficient production systems.",
    featured: true,
  },
  {
    id: 9,
    name: "Indian Fusion",
    category: "Cloud Kitchen",
    cuisine: "Fusion",
    image: "/images/portfolio/indianfusionlogo.png",
    services: ["Concept Development", "Menu Engineering", "Launch Support"],
    description: "Modern fusion dining combining Indian flavors with global techniques.",
    featured: true,
  },
  {
    id: 10,
    name: "NV's Cafe Sikar",
    category: "Cafe",
    cuisine: "Fast Food",
    image: "/images/logos/cafenvslogo.png",
    services: ["Cafe Setup", "Training", "Operations"],
    description: "Regional cafe with diverse menu offerings.",
    featured: true,
  },
  {
    id: 11,
    name: "House of Moong",
    category: "QSR",
    cuisine: "Healthy",
     image: "/images/portfolio/houseofmoong.jpg",
    services: ["Concept Development", "Menu Engineering"],
    description: "Health-focused dining with nutritious offerings.",
    featured: true,
  },
  {
    id: 12,
    name: "Snack Chat Cafe",
    category: "Cafe",
    cuisine: "Snacks & Beverages",
    image: "/images/logos/Snackchatlogo.png",
    services: ["Cafe Setup", "Staff Training", "Interior Design", "Menu Planning"],
    description: "Casual snacking destination with quick bites.",
    featured: true,
  },
  {
    id: 13,
    name: "The Three Tree Cafe",
    category: "Cafe",
    cuisine: "Continental",
    image: "/images/portfolio/threetree.jpg",
    services: ["Kitchen Designing", "Complete Setup", "Menu Designing", "Operations"],
    description: "Nature-themed cafe with diverse menu.",
    featured: true,
  },
  {
    id: 14,
    name: "The Bamboo Nation 2.0",
    category: "Restaurant",
    cuisine: "Multi-Cuisine",
    image: "/images/portfolio/bamboonation.jpg",
    services: ["Expansion Consulting", "Operations Optimization", "Menu Engineering", "Staff Training",],
    description: "Successful expansion of the original Bamboo Nation concept.",
    featured: true,
  },
];

const categories = ["All", "Restaurant", "Cafe", "Cloud Kitchen", "QSR"];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [expandedServices, setExpandedServices] = useState<Set<number>>(new Set());

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  const toggleServiceExpansion = (projectId: number) => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedServices(newExpanded);
  };

  return (
    <section id="portfolio" className="relative overflow-hidden bg-background py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-0 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Our Portfolio
          </span>
          <h2 className="mb-6 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            <span className="text-balance">Projects & Success Stories</span>
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            Explore our diverse portfolio of hospitality projects delivered across India, 
            from fine dining restaurants to cloud kitchens.
          </p>
        </m.div>

        {/* Filter Tabs */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {category}
            </Button>
          ))}
        </m.div>

        {/* Projects Grid */}
        <m.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => (
              <m.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5">
                  <Image
                    src={project.image ?? "/images/portfolio/bamboonation2.png"}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Button size="sm" className="bg-primary text-primary-foreground">
                      View Details <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <Badge className="absolute right-4 top-4 bg-background/90 text-foreground">
                    {project.category}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-foreground">{project.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {project.cuisine}
                    </Badge>
                  </div>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  {project.featured && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                        Services Delivered:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {expandedServices.has(project.id)
                          ? project.services.map((service) => (
                              <Badge
                                key={service}
                                variant="secondary"
                                className="text-xs"
                              >
                                {service.length > 20 ? service.slice(0, 20) + "..." : service}
                              </Badge>
                            ))
                          : project.services.slice(0, 3).map((service) => (
                              <Badge
                                key={service}
                                variant="secondary"
                                className="text-xs"
                              >
                                {service.length > 20 ? service.slice(0, 20) + "..." : service}
                              </Badge>
                            ))}
                        {project.services.length > 3 && (
                          <button
                            onClick={() => toggleServiceExpansion(project.id)}
                            className="inline-flex items-center"
                          >
                            <Badge 
                              variant="secondary" 
                              className="cursor-pointer text-xs hover:bg-secondary/80 transition-colors"
                            >
                              {expandedServices.has(project.id)
                                ? "Show Less"
                                : `+${project.services.length - 3} more`}
                            </Badge>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>

        {/* Show More Button */}
        {filteredProjects.length > 6 && (
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="group border-2 px-8"
            >
              {showAll ? "Show Less" : `View All ${filteredProjects.length} Projects`}
              <ArrowRight className={`ml-2 h-4 w-4 transition-transform ${showAll ? "rotate-90" : "group-hover:translate-x-1"}`} />
            </Button>
          </m.div>
        )}
      </div>
    </section>
  );
}
