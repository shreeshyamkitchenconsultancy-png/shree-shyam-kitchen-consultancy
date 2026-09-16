"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["All", "Restaurant", "Cafe", "Cloud Kitchen", "QSR"];

export function PortfolioControls() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [matchedCount, setMatchedCount] = useState(0);
  const [showMoreTarget, setShowMoreTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setShowMoreTarget(document.getElementById("portfolio-show-more"));
  }, []);

  useEffect(() => {
    const section = document.getElementById("portfolio");
    if (!section) return;

    const cards = Array.from(
      section.querySelectorAll<HTMLElement>("[data-portfolio-card]")
    );

    let visibleIndex = 0;
    let matches = 0;

    cards.forEach((card) => {
      const matchesCategory =
        activeCategory === "All" || card.dataset.category === activeCategory;

      if (matchesCategory) {
        matches += 1;
        const shouldShow = showAll || visibleIndex < 6;
        card.hidden = !shouldShow;
        visibleIndex += 1;
      } else {
        card.hidden = true;
      }
    });

    setMatchedCount(matches);
  }, [activeCategory, showAll]);

  const changeCategory = (category: string) => {
    setActiveCategory(category);
    setShowAll(false);
  };

  return (
    <>
      <div className="mb-12 flex flex-wrap justify-center gap-3" aria-label="Filter portfolio projects">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => changeCategory(category)}
            aria-pressed={activeCategory === category}
            className={`rounded-full transition-all ${
              activeCategory === category
                ? "bg-primary text-primary-foreground shadow-lg"
                : "hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {showMoreTarget && matchedCount > 6
        ? createPortal(
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll((value) => !value)}
              aria-expanded={showAll}
              className="group border-2 px-8"
            >
              {showAll ? "Show Less" : `View All ${matchedCount} Projects`}
              <ArrowRight
                className={`ml-2 h-4 w-4 transition-transform ${
                  showAll ? "rotate-90" : "group-hover:translate-x-1"
                }`}
              />
            </Button>,
            showMoreTarget
          )
        : null}
    </>
  );
}
