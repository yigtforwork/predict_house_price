"use client";

import { useMemo, useState } from "react";
import { downloadCsv } from "../lib/csv";
export default function PropertyTable({ properties }) {
  const [sortField, setSortField] = useState("price");
  const [ascending, setAscending] = useState(false);

  const sorted = useMemo(() => {
    return [...properties].sort((a, b) => {
      const first = Number(a[sortField]);
      const second = Number(b[sortField]);

      if (Number.isNaN(first) || Number.isNaN(second)) {
        return String(a[sortField]).localeCompare(
          String(b[sortField])
        );
      }

      return ascending ? first - second : second - first;
    });
  }, [properties, sortField, ascending]);

  function sortBy(field) {
    if (field === sortField) {
      setAscending((current) => !current);
    } else {
      setSortField(field);
      setAscending(true);
    }
  }

  const columns = [
    ["price", "Price"],
    ["square_footage", "Sq. Ft."],
    ["bedrooms", "Bedrooms"],
    ["bathrooms", "Bathrooms"],
    ["year_built", "Year"],
    ["lot_size", "Lot Size"],
    ["school_rating", "School"]
  ];

    return (
        
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div>
                <button
                    onClick={() =>
                        downloadCsv(
                            properties,
                            "market-properties.csv"
                        )
                    }
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                >
                    Export CSV
                </button>
            </div>
      <h2 className="mb-4 text-xl font-bold">
        Housing Dataset
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="px-4 py-3">ID</th>

              {columns.map(([field, label]) => (
                <th key={field} className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => sortBy(field)}
                    className="font-semibold hover:text-blue-600"
                  >
                    {label}
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sorted.map((property) => (
              <tr key={property.id} className="border-b">
                <td className="px-4 py-3">
                  {property.id}
                </td>

                <td className="px-4 py-3">
                  ${Number(property.price).toLocaleString()}
                </td>

                <td className="px-4 py-3">
                  {property.square_footage}
                </td>

                <td className="px-4 py-3">
                  {property.bedrooms}
                </td>

                <td className="px-4 py-3">
                  {property.bathrooms}
                </td>

                <td className="px-4 py-3">
                  {property.year_built}
                </td>

                <td className="px-4 py-3">
                  {property.lot_size}
                </td>

                <td className="px-4 py-3">
                  {property.school_rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}