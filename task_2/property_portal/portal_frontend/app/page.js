import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Property Analytics Portal
          </p>

          <h1 className="text-4xl font-bold text-slate-900">
            Property Intelligence Platform
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Estimate property values using a linear regression model and
            analyze housing market patterns using interactive analytics.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/estimator"
            className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold text-slate-900">
              Property Value Estimator
            </h2>

            <p className="mt-3 text-slate-600">
              Predict house prices, inspect regression coefficients, visualize
              results, and review previous estimates.
            </p>

            <span className="mt-6 inline-block font-semibold text-blue-600">
              Open estimator
            </span>
          </Link>

          <Link
            href="/market-analysis"
            className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold text-slate-900">
              Property Market Analysis
            </h2>

            <p className="mt-3 text-slate-600">
              Explore property segments, market statistics, distributions,
              tables, and what-if scenarios.
            </p>

            <span className="mt-6 inline-block font-semibold text-blue-600">
              Open market analysis
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}