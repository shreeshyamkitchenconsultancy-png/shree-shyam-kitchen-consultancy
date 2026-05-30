"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass border-b border-border/50 py-1 shadow-lg" : "bg-transparent py-2"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link href="#top" className="flex items-center gap-2">
            <div className="relative h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 overflow-hidden rounded-xl flex-shrink-0">
              <Image
  src="/images/logos/sskclogo.png"
  alt="Shree Shyam Kitchen Consultancy logo"
  fill
  sizes="(max-width: 768px) 100vw, 20vw"
  className="object-contain"
/>
            </div>
            <div className="hidden sm:flex sm:flex-col items-center text-center">
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-foreground uppercase leading-tight">SHREE SHYAM</h1>
              <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">KITCHEN CONSULTANCY</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden items-center gap-4 md:flex">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-foreground hover:text-primary"
            >
              <Link href="tel:+917820942754">
                <Phone className="mr-2 h-4 w-4" />
                +91 78209 42754
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
            >
              <Link href="#contact">Book Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 glass border-b border-border/50 p-6 shadow-xl lg:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                >
                  <Link href="tel:+917820942754">
                    <Phone className="mr-2 h-4 w-4" />
                    +91 78209 42754
                  </Link>
                </Button>
                <Button asChild className="w-full bg-primary text-primary-foreground">
                  <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                    Book Consultation
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
