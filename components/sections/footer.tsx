"use client";

import { m } from "framer-motion";
import Image from "next/image"
import Link from "next/link";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  MessageCircle,
  Clock,
  ArrowUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { href: "#services", label: "Our Services" },
  { href: "#about", label: "About Us" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#process", label: "Our Process" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

const services = [
  "Kitchen Designing",
  "Menu Engineering",
  "Concept Development",
  "Staff Training",
  "Operations Management",
  "Marketing Strategy",
];

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/shreeshyamkitchenconsultancy?igsh=YTZnOWp2Nmp5ZmU4", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: MessageCircle, href: "https://wa.me/917820942754", label: "WhatsApp" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link href="#top" className="flex items-center gap-3">
  <div className="relative h-12 w-12 sm:h-16 sm:w-16 overflow-hidden rounded-xl flex-shrink-0">
    <Image
      src="/images/logos/sskclogo.png"
      alt="Shree Shyam Kitchen Consultancy logo"
      fill
      sizes="(max-width: 640px) 48px, 64px"
      className="object-contain"
    />
  </div>

  <div>
    <h3 className="font-serif text-xl font-bold text-background">
      Shree Shyam
    </h3>

    <p className="text-sm text-background/70">
      Kitchen Consultancy
    </p>
  </div>
</Link>
            <p className="leading-relaxed text-background/70">
              Transforming restaurant ideas into profitable hospitality businesses 
              with end-to-end consulting services across India.
            </p>
            <p className="text-sm italic text-background/50">
              &quot;Designed For Hospitality Growth & Operational Excellence&quot;
            </p>
          </m.div>

          {/* Quick Links */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="mb-6 text-lg font-semibold text-background">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Services */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="mb-6 text-lg font-semibold text-background">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="#services"
                    className="text-background/70 transition-colors hover:text-primary"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>

          {/* Contact Info */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="mb-6 text-lg font-semibold text-background">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="tel:+917820942754"
                  className="flex items-center gap-3 text-background/70 transition-colors hover:text-primary"
                >
                  <Phone className="h-5 w-5" />
                  +91 78209 42754
                </Link>
              </li>
              <li>
                <a
                  href="mailto:shreeshyamkitchenconsultancy@gmail.com"
                  className="flex items-start gap-3 break-all text-background/70 transition-colors hover:text-primary"
                >
                  <Mail className="mt-1 h-5 w-5 shrink-0" />
                  shreeshyamkitchenconsultancy@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="mt-1 h-5 w-5 shrink-0" />
                <span>Jaipur, Rajasthan, India</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Clock className="h-5 w-5" />
                Mon - Sat: 10:00 AM - 8:00 PM
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/10 transition-all hover:bg-primary hover:text-primary-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </m.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Shree Shyam Kitchen Consultancy. All rights reserved.
          </p>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="rounded-full bg-background/10 text-background hover:bg-primary hover:text-primary-foreground"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
