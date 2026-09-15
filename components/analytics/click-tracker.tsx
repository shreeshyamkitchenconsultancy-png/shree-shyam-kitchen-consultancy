"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function sendEvent(name: string, params: Record<string, string>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, {
    ...params,
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

export function ClickTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") || "";

      if (href.startsWith("https://wa.me/") || href.includes("api.whatsapp.com")) {
        sendEvent("generate_lead", { method: "whatsapp" });
        sendEvent("whatsapp_click", { method: "whatsapp" });
        return;
      }

      if (href.startsWith("tel:")) {
        sendEvent("generate_lead", { method: "phone" });
        sendEvent("phone_click", { method: "phone" });
        return;
      }

      if (href.includes("forms.gle/") || href.includes("docs.google.com/forms")) {
        sendEvent("consultation_click", { method: "form" });
        return;
      }

      if (href.startsWith("/portfolio/") || href.startsWith("#portfolio")) {
        sendEvent("portfolio_click", { destination: href });
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
