"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";
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
      <motion.div
        className="absolute left-10 top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-secondary/20 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
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
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-background/10 bg-background/5 p-8 text-center backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-background/10"
            >
              {/* Icon */}
              <motion.div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className="h-8 w-8 text-primary" />
              </motion.div>

              {/* Counter */}
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                className="mb-2 block text-4xl font-bold text-background md:text-5xl"
              />

              {/* Label */}
              <h3 className="mb-2 text-lg font-semibold text-background">
                {stat.label}
              </h3>
              <p className="text-sm text-background/60">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
