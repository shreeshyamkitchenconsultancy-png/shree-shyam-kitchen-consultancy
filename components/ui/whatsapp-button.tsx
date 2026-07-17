"use client";

import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
  href="https://wa.me/917820942754"
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag('event', 'generate_lead', {
      method: 'whatsapp',
      page_path: window.location.pathname,
      page_title: document.title
    });
  }
}}
  className="group flex items-center gap-3"
>
        {/* Tooltip */}
        <span
          className="hidden rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block translate-x-2"
        >
          Chat with us
        </span>

        {/* Button */}
        <div
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40 active:scale-95"
        >
          <FaWhatsapp className="h-7 w-7" />
        </div>
      </Link>
    </div>
  );
}
