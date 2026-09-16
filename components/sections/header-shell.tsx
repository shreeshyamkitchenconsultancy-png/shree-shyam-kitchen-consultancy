"use client";

import { useEffect, useState } from "react";

export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass border-b border-border/50 py-1 shadow-lg" : "bg-transparent py-2"
      }`}
    >
      {children}
    </header>
  );
}
