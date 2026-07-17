import Image from "next/image";
import { 
  MessageSquare, 
  Search, 
  Lightbulb, 
  UtensilsCrossed, 
  Building2, 
  Truck, 
  Users, 
  Rocket 
} from "lucide-react";

interface ProcessProps {
  processImage?: string;
}

const steps = [
  {
    icon: MessageSquare,
    title: "Initial Consultation",
    subtitle: "Business Understanding",
    description: "We understand your goals, investment range, target audience, cuisine preferences, and complete business vision.",
  },
  {
    icon: Search,
    title: "Market Research",
    subtitle: "Feasibility Analysis",
    description: "Conduct competitor analysis, location study, customer behavior research, and profitability assessment.",
  },
  {
    icon: Lightbulb,
    title: "Concept Development",
    subtitle: "Brand Strategy",
    description: "Develop restaurant identity, cuisine direction, theme planning, branding concepts, and customer positioning.",
  },
  {
    icon: UtensilsCrossed,
    title: "Menu Planning",
    subtitle: "Menu Engineering",
    description: "Design profitable menus with cuisine specialization, food costing, signature dishes, and menu psychology.",
  },
  {
    icon: Building2,
    title: "Kitchen Design",
    subtitle: "Operational Planning",
    description: "Create workflow-efficient kitchen layouts, equipment planning, MEP coordination, and operational zoning.",
  },
  {
    icon: Truck,
    title: "Vendor Coordination",
    subtitle: "Setup Execution",
    description: "Coordinate with equipment vendors, interior teams, suppliers, and oversee smooth project delivery.",
  },
  {
    icon: Users,
    title: "Staff Training",
    subtitle: "SOP Development",
    description: "Build operational systems, train staff, implement SOPs, service standards, and customer handling processes.",
  },
  {
    icon: Rocket,
    title: "Launch Support",
    subtitle: "Growth Optimization",
    description: "Provide launch assistance, operational audits, marketing guidance, and ongoing business growth support.",
  },
];

export function Process({ processImage = "/images/herologo/processlogo.png" }: ProcessProps) {
  return (
    <section id="process" className="relative overflow-hidden bg-card py-24">
      {/* Premium Background */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  
  {/* Background Image */}
  <Image
    src={processImage}
    alt="Process Background"
    fill
    className="object-cover opacity-[0.5] scale-105"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-background/25" />

  {/* Premium Gradient Glow */}
  <div className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
  <div className="absolute bottom-20 left-0 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-3xl" />

  {/* Subtle Grid Texture */}
  <div
    className="absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage:
        "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }}
  />
</div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Our Process
          </span>
          <h2 className="mb-6 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            <span className="text-balance">How We Work</span>
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            A systematic, proven approach to transform your hospitality vision 
            into a successful, profitable business.
          </p>
        </div>
        
        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-secondary to-primary/20 lg:block" />

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative flex flex-col lg:flex-row lg:items-center ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div className={`lg:w-[calc(50%-40px)] ${index % 2 === 0 ? "lg:pr-8 lg:text-right" : "lg:pl-8"}`}>
                  <div
                     className="group rounded-2xl border border-border/50 bg-background/80 backdrop-blur-md p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:shadow-xl"
                  >
                    {/* Mobile Icon */}
                    <div className="mb-4 flex items-center gap-4 lg:hidden">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg">
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="font-serif text-3xl font-bold text-primary/20">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Desktop Layout */}
                    <div className={`hidden items-center gap-4 lg:flex ${index % 2 === 0 ? "justify-end" : ""}`}>
                      {index % 2 !== 0 && (
                        <span className="font-serif text-4xl font-bold text-primary/20">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      )}
                      <div>
                        <p className="text-sm font-medium uppercase tracking-wide text-primary">
                          {step.subtitle}
                        </p>
                        <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                      </div>
                      {index % 2 === 0 && (
                        <span className="font-serif text-4xl font-bold text-primary/20">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      )}
                    </div>

                    {/* Mobile Title */}
                    <div className="lg:hidden">
                      <p className="text-sm font-medium uppercase tracking-wide text-primary">
                        {step.subtitle}
                      </p>
                      <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                    </div>

                    <p className={`mt-3 text-muted-foreground ${index % 2 === 0 ? "lg:text-right" : ""}`}>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Icon - Desktop */}
                <div className="relative z-10 hidden lg:flex lg:w-20 lg:justify-center">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30 transition-transform duration-300 hover:rotate-[10deg] hover:scale-110"
                  >
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block lg:w-[calc(50%-40px)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
