"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
  duration?: number;
}

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

export function AnimatedNumber({
  value,
  suffix = "",
  label,
  className,
  duration = 1400,
}: AnimatedNumberProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimatedRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      hasAnimatedRef.current = true;
      setDisplayValue(value);
      return;
    }

    const animate = () => {
      hasAnimatedRef.current = true;
      let startTime: number | null = null;
      setDisplayValue(0);

      const step = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const nextValue = Math.round(value * easeOutCubic(progress));

        setDisplayValue(nextValue);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
        }
      };

      animationFrameRef.current = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasAnimatedRef.current) return;
        observer.disconnect();
        animate();
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [duration, value]);

  return (
    <span
      ref={elementRef}
      className={className}
      aria-label={`${value}${suffix} ${label}`}
    >
      {displayValue}
      {suffix}
    </span>
  );
}
