"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#process", label: "Process" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((value) => !value)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 top-16 z-40 glass border-b border-border/50 p-6 shadow-xl lg:hidden"
        >
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Button asChild variant="outline" className="w-full">
                <Link href="tel:+917820942754">
                  <Phone className="mr-2 h-4 w-4" />
                  +91 78209 42754
                </Link>
              </Button>
              <Button asChild className="w-full bg-primary text-primary-foreground">
                <Link href="/#contact" onClick={() => setIsOpen(false)}>
                  Book Consultation
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
