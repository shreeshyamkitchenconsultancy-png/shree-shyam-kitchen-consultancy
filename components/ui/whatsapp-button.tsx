import Link from "next/link";

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
  href="https://wa.me/917820942754"
  target="_blank"
  rel="noopener noreferrer"
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
          <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
            className="h-7 w-7 fill-current"
          >
            <path d="M16.04 3C8.85 3 3 8.75 3 15.82c0 2.49.73 4.92 2.12 6.99L3 29l6.4-2.05a13.2 13.2 0 0 0 6.63 1.78h.01C23.22 28.73 29 23 29 15.92 29 8.75 23.23 3 16.04 3Zm7.58 18.22c-.32.9-1.88 1.72-2.58 1.8-.66.07-1.5.1-2.42-.15-.56-.15-1.28-.42-2.2-.82-3.87-1.67-6.4-5.56-6.6-5.82-.2-.27-1.58-2.1-1.58-4 0-1.9 1-2.83 1.35-3.22.36-.4.78-.5 1.04-.5.26 0 .52 0 .75.01.24.01.56-.09.88.67.32.77 1.09 2.66 1.18 2.85.1.2.16.43.03.69-.13.26-.2.42-.39.65-.2.23-.41.52-.59.7-.2.2-.4.42-.17.81.23.4 1.03 1.7 2.21 2.75 1.52 1.35 2.8 1.77 3.2 1.97.39.2.62.17.85-.1.23-.26.98-1.14 1.24-1.53.26-.4.52-.33.88-.2.36.13 2.27 1.07 2.66 1.27.39.2.65.3.75.46.1.16.1.92-.23 1.82Z"/>
          </svg>
        </div>
      </Link>
    </div>
  );
}
