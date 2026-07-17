import Image from "next/image";
import { MotionDiv } from "@/components/ui/motion";
import { Utensils, Clock, MapPin, Award } from "lucide-react";

const stats = [
  {
    icon: Utensils,
    value: 15,
    suffix: "+",
    label: "Projects Handled",
    description: "Successful hospitality projects delivered"
  },
  {
    icon: Clock,
    value: 10,
    suffix: "+",
    label: "Years Experience",
    description: "Of industry expertise"
  },
  {
    icon: MapPin,
    value: 5,
    suffix: "+",
    label: "Cities Covered",
    description: "Pan India client network"
  },
  {
    icon: Award,
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
    description: "End-to-end consulting support"
  },
];

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-foreground py-20">
      {/* Premium Background Image */}
<div className="absolute inset-0">
  <Image
    src="/images/herologo/extralogo.png"
    alt="Restaurant Consultancy Background"
    fill
    className="object-cover opacity-50"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-grey/5" />

  {/* Gradient Accent */}
  <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/5 to-white/5" />
</div>

      {/* Floating elements */}
      <div
        className="absolute left-10 top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-secondary/20 blur-3xl"
      />

      <div className="container relative z-10 mx-auto px-4">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-serif text-3xl font-bold text-background md:text-4xl">
            Proven Results That Speak
          </h2>
          <p className="mx-auto max-w-2xl text-background/70">
            Our track record of success in transforming hospitality businesses across India
          </p>
        </MotionDiv>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-background/10 bg-background/5 p-8 text-center backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-background/10"
            >
              {/* Icon */}
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 transition-transform duration-300 group-hover:rotate-[10deg] group-hover:scale-110"
              >
                <stat.icon className="h-8 w-8 text-primary" />
              </div>

              {/* Counter */}
              <span className="mb-2 block text-4xl font-bold text-background md:text-5xl">
                {stat.value}
                {stat.suffix}
              </span>

              {/* Label */}
              <h3 className="mb-2 text-lg font-semibold text-background">
                {stat.label}
              </h3>
              <p className="text-sm text-background/60">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
