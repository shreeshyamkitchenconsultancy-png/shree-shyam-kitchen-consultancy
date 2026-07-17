import { MotionDiv } from "@/components/ui/motion";
import { 
  ChefHat,
  Lightbulb,
  UtensilsCrossed,
  Users,
  BarChart3,
  Settings,
  Megaphone,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: ChefHat,
    title: "Kitchen Designing & Setup",
    description: "Complete kitchen layout planning with workflow optimization, MEP layouts, BOQ preparation, equipment placement, and on-site supervision.",
    features: ["2D Kitchen Layouts", "Workflow Planning", "Equipment Placement", "Vendor Coordination"],
  },
  {
    icon: Lightbulb,
    title: "Concept Development",
    description: "Strategic restaurant concept planning including branding, theme development, business model creation, and market analysis.",
    features: ["Restaurant Concepts", "Branding Strategy", "Theme Planning", "Market Analysis"],
  },
  {
    icon: UtensilsCrossed,
    title: "Menu Designing & Engineering",
    description: "Profitable menu creation across cuisines with food costing, signature dish development, and menu psychology optimization.",
    features: ["Multi-Cuisine Menus", "Food Costing", "Signature Dishes", "Pricing Strategy"],
  },
  {
    icon: Users,
    title: "Staff Training & SOPs",
    description: "Comprehensive staff training programs covering kitchen operations, service standards, and customer handling protocols.",
    features: ["Kitchen SOPs", "Service Training", "Workflow Systems", "Quality Standards"],
  },
  {
    icon: BarChart3,
    title: "Inventory & Cost Control",
    description: "Strategic inventory management systems for optimal food cost control, wastage reduction, and profitability improvement.",
    features: ["Cost Analysis", "Inventory Systems", "Wastage Control", "Profit Optimization"],
  },
  {
    icon: Settings,
    title: "Operations Management",
    description: "End-to-end operations consulting including workflow optimization, quality audits, and customer experience enhancement.",
    features: ["Workflow Optimization", "Quality Audits", "Process Improvement", "Retainership Support"],
  },
  {
    icon: Megaphone,
    title: "Sales & Marketing",
    description: "Strategic marketing solutions including social media strategy, Swiggy/Zomato optimization, and brand positioning.",
    features: ["Social Media Strategy", "Online Presence", "Platform Optimization", "Growth Systems"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-card py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Our Expert Services
          </span>
          <h2 className="mb-6 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            <span className="text-balance">Comprehensive Hospitality Solutions for Your Success</span>
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            From concept to launch and beyond, we provide end-to-end consulting services 
            tailored to transform your hospitality vision into a thriving business.
          </p>
        </MotionDiv>

        {/* Services Grid */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Hover gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Icon */}
              <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
                <service.icon className="h-7 w-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="relative mb-3 text-xl font-bold text-foreground">
                {service.title}
              </h3>
              <p className="relative mb-4 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              {/* Features */}
              <ul className="relative mb-4 space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-foreground/70">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Learn More Link */}
              <a
                href="#contact"
                className="relative inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:translate-x-1 hover:gap-3"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </a>

              {/* Service number */}
              <span className="absolute right-4 top-4 font-serif text-5xl font-bold text-foreground/5">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </MotionDiv>
      </div>
    </section>
  );
}
