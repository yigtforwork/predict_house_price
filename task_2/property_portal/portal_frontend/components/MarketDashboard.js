"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getMarketProperties,
  getMarketStatistics
} from "@/lib/api";
import PropertyTable from "./PropertyTable";
import WhatIfAnalysis from "./WhatIfAnalysis";

export default function MarketDashboard() {
  const [properties, setProperties] = useState([]);
  const [statistics, setStatistics] = useState(null);

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minSqFt: "",
    maxSqFt: "",
    minBathrooms: "",
    maxBathrooms: "",
    bedrooms: "",
    minLotSize: "",
    maxLotSize: "",
    minYearBuilt: "",
    maxYearBuilt: "",
    minDis2City: "",
    maxDis2City:"",
    minSchoolRating: "",
    maxSchoolRating: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      setLoading(true);

      const [propertyData, statisticsData] = await Promise.all([
        getMarketProperties(),
        getMarketStatistics()
      ]);

      setProperties(propertyData);
      setStatistics(statisticsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (
        filters.minPrice &&
        property.price < Number(filters.minPrice)
      ) {
        return false;
      }

      if (
        filters.maxPrice &&
        property.price > Number(filters.maxPrice)
      ) {
        return false;
      }
        if (
            filters.minSqFt &&
            property.square_footage < Number(filters.minSqFt)
        ) {
            return false;
        }

        if (
            filters.maxSqFt &&
            property.square_footage > Number(filters.maxSqFt)
        ) {
            return false;
        }
        if (
            filters.minBathrooms &&
            property.bathrooms < Number(filters.minBathrooms)
        ) {
            return false;
        }

        if (
            filters.maxBathrooms &&
            property.bathrooms > Number(filters.maxBathrooms)
        ) {
            return false;
        }
        if (
            filters.minLotSize &&
            property.lot_size < Number(filters.minLotSize)
        ) {
            return false;
        }

        if (
            filters.maxLotSize &&
            property.lot_size > Number(filters.maxLotSize)
        ) {
            return false;
        }
        if (
            filters.minYearBuilt &&
            property.year_built < Number(filters.minYearBuilt)
        ) {
            return false;
        }

        if (
            filters.maxYearBuilt &&
            property.YearBuilt > Number(filters.maxYearBuilt)
        ) {
            return false;
        }
        if (
            filters.minDis2City &&
            property.distance_to_city_center < Number(filters.minDis2City)
        ) {
            return false;
        }

        if (
            filters.maxDis2City &&
            property.distance_to_city_center > Number(filters.maxDis2City)
        ) {
            return false;
        }
      if (
        filters.bedrooms &&
        property.bedrooms !== Number(filters.bedrooms)
      ) {
        return false;
      }

      if (
        filters.minSchoolRating &&
        property.school_rating < Number(filters.minSchoolRating)
      ) {
        return false;
      }

      return true;
    });
  }, [properties, filters]);

  function updateFilter(name, value) {
    setFilters((current) => ({
      ...current,
      [name]: value
    }));
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Property Market Analysis
          </h1>

          <p className="mt-2 text-slate-600">
            Analyze housing market characteristics and explore
            what-if scenarios.
          </p>
          <button
              onClick={() => window.print()}
              className="no-print rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
              Export PDF
          </button>
        </div>
              
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-xl bg-white p-8">
            Loading market data...
          </div>
        ) : (
          <div className="space-y-8">
            <StatisticsCards statistics={statistics} />

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="mb-4 text-xl font-bold">
                Market Filters
              </h2>

              <div className="grid gap-4 md:grid-cols-4">
                <Filter
                  label="Minimum price"
                  value={filters.minPrice}
                  onChange={(value) =>
                    updateFilter("minPrice", value)
                  }
                />

                <Filter
                  label="Maximum price"
                  value={filters.maxPrice}
                  onChange={(value) =>
                    updateFilter("maxPrice", value)
                  }
                />
               <Filter
                   label="Minimum Square footage"
                   value={filters.minSqFt}
                   onChange={(value) =>
                       updateFilter("minSqFt", value)
                   }
               />

               <Filter
                   label="Maximum Square Footage"
                   value={filters.maxSqFt}
                   onChange={(value) =>
                       updateFilter("maxSqFt", value)
                   }
               />
               <Filter
                   label="Minimum bathrooms"
                   value={filters.minBathrooms}
                   onChange={(value) =>
                       updateFilter("minBathrooms", value)
                   }
               />

               <Filter
                   label="Maximum bathrooms"
                   value={filters.maxBathrooms}
                   onChange={(value) =>
                       updateFilter("maxBathrooms", value)
                   }
               />
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Bedrooms
                  </label>

                  <select
                    value={filters.bedrooms}
                    onChange={(event) =>
                      updateFilter(
                        "bedrooms",
                        event.target.value
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  >
                    <option value="">All</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>

                 <Filter
                     label="Minimum lot size"
                     value={filters.minLotSize}
                     onChange={(value) =>
                         updateFilter(
                             "minLotSize",
                             value
                         )
                     }
                 />
                 <Filter
                     label="Maximum lot size"
                     value={filters.maxLotSize}
                     onChange={(value) =>
                         updateFilter(
                             "maxLotSize",
                             value
                         )
                     }
                 />
                 <Filter
                     label="Minimum year built"
                     value={filters.minYearBuilt}
                     onChange={(value) =>
                         updateFilter(
                             "minYearBuilt",
                             value
                         )
                     }
                 />
                 <Filter
                     label="Maximum year built"
                     value={filters.maxYearBuilt}
                     onChange={(value) =>
                         updateFilter(
                             "maxYearBuilt",
                             value
                         )
                     }
                 />
                 <Filter
                     label="Minimum distance to city center"
                     value={filters.minDis2City}
                     onChange={(value) =>
                         updateFilter(
                             "minDis2City",
                             value
                         )
                     }
                 />
                 <Filter
                     label="Maximum distance to city center"
                     value={filters.maxDis2City}
                     onChange={(value) =>
                         updateFilter(
                             "maxDis2City",
                             value
                         )
                     }
                 />
                 
                <Filter
                  label="Minimum school rating"
                  value={filters.minSchoolRating}
                  onChange={(value) =>
                    updateFilter(
                      "minSchoolRating",
                      value
                    )
                  }
                 />
                 <Filter
                     label="Maximum school rating"
                     value={filters.maxSchoolRating}
                     onChange={(value) =>
                         updateFilter(
                             "maxSchoolRating",
                             value
                         )
                     }
                 />
              </div>
            </section>

            <PropertyTable properties={filteredProperties} />

            <WhatIfAnalysis />
          </div>
        )}
      </div>
    </div>
  );
}

function Filter({ label, value, onChange }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">
        {label}
      </label>

      <input
        type="number"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
      />
    </div>
  );
}

function StatisticsCards({ statistics }) {
  if (!statistics) {
    return null;
  }

  const cards = [
    ["Properties", statistics.count],
    ["Average Price", statistics.averagePrice],
    ["Median Price", statistics.medianPrice],
    ["Average Sq. Ft.", statistics.averageSquareFootage]
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(([label, value]) => (
        <div
          key={label}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
        >
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {typeof value === "number"
              ? value.toLocaleString()
              : value}
          </p>
        </div>
      ))}
    </div>
  );
}