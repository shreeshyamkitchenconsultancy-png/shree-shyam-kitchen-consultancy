import Image from "next/image";
import { Phone } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { HeaderShell } from "@/components/sections/header-shell";
import { MobileNav } from "@/components/sections/mobile-nav";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#process", label: "Process" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <HeaderShell>
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/#top" className="flex items-center gap-2">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl sm:h-16 sm:w-16 lg:h-20 lg:w-20">
            <Image
              src="/images/logos/sskclogo.png"
              alt="Shree Shyam Kitchen Consultancy logo"
              fill
              sizes="(max-width: 640px) 48px, (max-width: 1024px) 64px, 80px"
              className="object-contain"
            />
          </div>
          <div className="hidden text-center sm:flex sm:flex-col sm:items-center">
            <div className="font-serif text-xl font-bold uppercase leading-tight text-foreground sm:text-2xl">
              SHREE SHYAM
            </div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground sm:text-sm">
              KITCHEN CONSULTANCY
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
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
            <Link href="/#contact">Book Consultation</Link>
          </Button>
        </div>

        <MobileNav />
      </div>
    </HeaderShell>
  );
}
