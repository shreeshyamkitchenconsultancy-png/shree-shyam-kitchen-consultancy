import { CTA } from "@/components/sections/cta";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-24">
      <h1 className="text-5xl font-bold mb-4">
        Restaurant Consultancy Insights
      </h1>

      <p className="text-lg text-muted-foreground mb-12">
        Expert guides on restaurant setup, commercial kitchen design,
        menu engineering, staff training, operations and profitability.
      </p>

      <div className="rounded-xl border overflow-hidden shadow-sm">
        <div className="relative h-64 w-full">
          <Image
            src="/images/blog/blogimage1.png"
            alt="Restaurant Consultant in Jaipur"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="p-8">
          <span className="text-sm font-medium">
            Restaurant Consultancy
          </span>

          <h2 className="text-3xl font-semibold mt-3 mb-3">
            Restaurant Consultant in Jaipur:
            Complete Guide to Opening a Profitable Restaurant in 2026
          </h2>

                    <p className="text-muted-foreground mb-6">
            Learn how to plan, launch and operate a profitable
            restaurant, cafe, cloud kitchen or QSR.
          </p>

          <Link
            href="/blog/restaurant-consultant-jaipur-guide"
            className="inline-flex rounded-lg border px-4 py-2 font-medium"
          >
            Read Article →
          </Link>
        </div>
      </div>

      <div className="rounded-xl border overflow-hidden shadow-sm mt-10">
    <div className="p-8">
    <span className="text-sm font-medium">
      Restaurant Setup Guide
    </span>

    <h2 className="text-3xl font-semibold mt-3 mb-3">
      Restaurant Setup Cost in Jaipur (2026):
      Complete Investment Guide
    </h2>

    <p className="text-muted-foreground mb-6">
      Detailed investment breakdown for cloud kitchens, cafes,
      QSRs and casual dining restaurants in Jaipur.
    </p>

    <Link
      href="/blog/restaurant-setup-cost-jaipur-2026"
      className="inline-flex rounded-lg border px-4 py-2 font-medium"
    >
      Read Article →
    </Link>
     </div>
    </div>   

    <div className="rounded-xl border overflow-hidden shadow-sm mt-10">
    <div className="p-8">
    <span className="text-sm font-medium">
      Restaurant Staffing Guide
    </span>

    <h2 className="text-3xl font-semibold mt-3 mb-3">
      How Many Staff Does Your Restaurant Actually Need? | Staffing Guide Jaipur 2026
    </h2>

    <p className="text-muted-foreground mb-6">
      A practical staffing model for restaurant owners, café operators and QSR founders in Jaipur.
      Learn how to control labour cost, eliminate overstaffing and build a role-based production system.
    </p>

    <Link
      href="/blog/restaurant-staffing-guide"
      className="inline-flex rounded-lg border px-4 py-2 font-medium"
    >
      Read Article →
    </Link>
     </div>
    </div>   
            {/* CTA SECTION */}
      <div className="mt-20">
        <CTA />
      </div>
    </main>
  );
}
