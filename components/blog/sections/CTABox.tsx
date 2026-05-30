import Link from "next/link";

export function CTABox() {
  return (
    <div className="mt-16 p-8 border rounded-xl bg-primary text-white">
      <h3 className="text-2xl font-bold mb-3">
        Start Your Restaurant Project
      </h3>

      <p className="mb-6 text-white/90">
        Get expert consultation for setup, menu, kitchen design and operations.
      </p>

      <Link
        href="/contact"
        className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-medium"
      >
        Book Consultation
      </Link>
    </div>
  );
}