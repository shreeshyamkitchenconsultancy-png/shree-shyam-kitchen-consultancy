"use client";

import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { m } from "framer-motion";

export function WhatsAppButton() {
  return (
    <m.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50"
    >
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
        <m.span
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="hidden rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg sm:block"
        >
          Chat with us
        </m.span>

        {/* Button */}
        <m.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-shadow hover:shadow-xl hover:shadow-[#25D366]/40"
        >
          <FaWhatsapp className="h-7 w-7" />
          
          {/* Pulse animation */}
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        </m.div>
      </Link>
    </m.div>
  );
}
