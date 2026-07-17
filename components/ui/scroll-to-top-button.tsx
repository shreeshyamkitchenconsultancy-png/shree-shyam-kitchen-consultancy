"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={scrollToTop}
      className="rounded-full bg-background/10 text-background hover:bg-primary hover:text-primary-foreground"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
