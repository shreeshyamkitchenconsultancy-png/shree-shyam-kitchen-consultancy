"use client";

import { motion } from "framer-motion";
import { 
  Target, 
  Sparkles, 
  Puzzle, 
  CheckCircle, 
  Zap, 
  HandshakeIcon, 
  Briefcase,
  HeartHandshake 
} from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Customized Solutions",
    description: "Tailored consulting strategies designed specifically for your business goals and market segment."
  },
  {
    icon: Sparkles,
    title: "Profit-Focused Consulting",
    description: "Every recommendation is engineered to maximize your ROI and long-term profitability."
  },
  {
    icon: Puzzle,
    title: "Real Kitchen Experience",
    description: "Our team brings hands-on kitchen and hospitality experience, not just theoretical knowledge."
  },
  {
    icon: CheckCircle,
    title: "Pan India Project Experience",
    description: "Successfully delivered projects across multiple cities and diverse market conditions."
  },
  {
    icon: Zap,
    title: "End-to-End Support",
    description: "From concept to launch and beyond, we support you at every stage of your journey."
  },
  {
    icon: HandshakeIcon,
    title: "Hands-On Operational Expertise",
    description: "We work alongside your team, ensuring seamless implementation of all systems."
  },
  {
    icon: Briefcase,
    title: "Practical Industry Knowledge",
    description: "Real-world insights from years of managing kitchens, menus, and hospitality operations."
  },
  {
    icon: HeartHandshake,
    title: "Real Hospitality Background",
    description: "Built by professionals who have lived and breathed hospitality at the highest levels."
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Why Choose Us
          </span>
          <h2 className="mb-6 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            <span className="text-balance">Where Culinary Expertise Meets Business Strategy</span>
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            We combine hands-on culinary expertise, operational knowledge, and business strategy to help hospitality brands build scalable, profitable, and operationally efficient food businesses.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl"
            >
              {/* Hover gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Icon */}
              <motion.div
                className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <reason.icon className="h-6 w-6 text-primary" />
              </motion.div>

              {/* Content */}
              <h3 className="relative mb-2 text-lg font-bold text-foreground">
                {reason.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-muted-foreground">
                {reason.description}
              </p>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
