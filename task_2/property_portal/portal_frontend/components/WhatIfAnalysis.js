"use client";

import { useState } from "react";
import { predictMarketProperty } from "@/lib/api";

export default function WhatIfAnalysis() {
  const [house, setHouse] = useState({
    id: "what-if-1",
    square_footage: 2000,
    bedrooms: 3,
    bathrooms: 2,
    year_built: 2000,
    lot_size: 6000,
    distance_to_city_center: 10,
    school_rating: 7
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setHouse((current) => ({
      ...current,
      [field]: field === "bedrooms"
        ? Number(value)
        : Number(value)
    }));
  }

  async function calculate() {
    try {
      setLoading(true);
      setError("");

      const prediction = await predictMarketProperty(house);

      setResult(prediction);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          What-If Analysis
        </h2>

        <p className="text-sm text-slate-500">
          Change property characteristics and estimate the resulting price.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["square_footage", "Square footage"],
          ["bathrooms", "Bathrooms"],
          ["year_built", "Year built"],
          ["lot_size", "Lot size"],
          ["distance_to_city_center", "Distance to city center"],
          ["school_rating", "School rating"]
        ].map(([field, label]) => (
          <div key={field}>
            <label className="mb-1 block text-sm font-medium">
              {label}
            </label>

            <input
              type="number"
              value={house[field]}
              onChange={(event) =>
                update(field, event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
        ))}

        <div>
          <label className="mb-1 block text-sm font-medium">
            Bedrooms
          </label>

          <select
            value={house.bedrooms}
            onChange={(event) =>
              update("bedrooms", event.target.value)
            }
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={calculate}
        disabled={loading}
        className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Calculating..." : "Calculate"}
      </button>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-6 rounded-xl bg-blue-50 p-6">
          <p className="text-sm text-blue-700">
            Estimated property value
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-900">
            ${Number(result.price).toLocaleString()}
          </p>
        </div>
      )}
    </section>
  );
}