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

      <div className="rounded-xl border p-8 shadow-sm">
        <h2 className="text-3xl font-semibold mb-3">
          Restaurant Consultant in Jaipur: Complete Guide to Opening a Profitable Restaurant in 2026
        </h2>

        <p className="mb-6 text-muted-foreground">
          Learn how to plan, launch and operate a profitable restaurant,
          cafe, cloud kitchen or QSR with proven consultancy strategies.
        </p>

        <Link
          href="/blog/restaurant-consultant-jaipur-guide"
          className="inline-flex rounded-lg border px-4 py-2 font-medium"
        >
          Read Article →
        </Link>
      </div>
    </main>
  );
}