"use client";

import { useState } from "react";
import { predictHouses } from "@/lib/api";
import { validateHouse } from "@/lib/validation";

const emptyHouse = {
  id: "",
  square_footage: "",
  bedrooms: "2",
  bathrooms: "",
  year_built: "",
  lot_size: "",
  distance_to_city_center: "",
  school_rating: ""
};

export default function PredictionForm({ onPredictions }) {
  const [houses, setHouses] = useState([{ ...emptyHouse }]);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateHouse(index, field, value) {
    const next = [...houses];
    next[index] = {
      ...next[index],
      [field]: value
    };

    setHouses(next);
  }

  function addHouse() {
    setHouses([
      ...houses,
      {
        ...emptyHouse,
        id: `house-${houses.length + 1}`
      }
    ]);
  }

  function removeHouse(index) {
    if (houses.length === 1) {
      return;
    }

    setHouses(houses.filter((_, i) => i !== index));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = {};

    houses.forEach((house, index) => {
      const result = validateHouse(house);

      if (Object.keys(result).length > 0) {
        validationErrors[index] = result;
      }
    });

    setErrors(validationErrors);
    setServerError("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);

      const payload = houses.map((house) => ({
        id: house.id,
        square_footage: Number(house.square_footage),
        bedrooms: Number(house.bedrooms),
        bathrooms: Number(house.bathrooms),
        year_built: Number(house.year_built),
        lot_size: Number(house.lot_size),
        distance_to_city_center: Number(house.distance_to_city_center),
        school_rating: Number(house.school_rating)
      }));

      const result = await predictHouses(payload);

      onPredictions(result);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            House Predictions
          </h2>

          <p className="text-sm text-slate-500">
            Enter one or more properties.
          </p>
        </div>

        <button
          type="button"
          onClick={addHouse}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Add house
        </button>
      </div>

      {serverError && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {houses.map((house, index) => (
          <div
            key={index}
            className="rounded-xl border border-slate-200 p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">
                Property {index + 1}
              </h3>

              {houses.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeHouse(index)}
                  className="text-sm font-medium text-red-600"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Field
                label="ID"
                value={house.id}
                onChange={(value) =>
                  updateHouse(index, "id", value)
                }
                error={errors[index]?.id}
              />

              <Field
                label="Square footage"
                type="number"
                value={house.square_footage}
                onChange={(value) =>
                  updateHouse(index, "square_footage", value)
                }
                error={errors[index]?.square_footage}
              />

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Bedrooms
                </label>

                <select
                  value={house.bedrooms}
                  onChange={(event) =>
                    updateHouse(
                      index,
                      "bedrooms",
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>

                {errors[index]?.bedrooms && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors[index].bedrooms}
                  </p>
                )}
              </div>

              <Field
                label="Bathrooms"
                type="number"
                step="0.5"
                value={house.bathrooms}
                onChange={(value) =>
                  updateHouse(index, "bathrooms", value)
                }
                error={errors[index]?.bathrooms}
              />

              <Field
                label="Year built"
                type="number"
                value={house.year_built}
                onChange={(value) =>
                  updateHouse(index, "year_built", value)
                }
                error={errors[index]?.year_built}
              />

              <Field
                label="Lot size"
                type="number"
                value={house.lot_size}
                onChange={(value) =>
                  updateHouse(index, "lot_size", value)
                }
                error={errors[index]?.lot_size}
              />

              <Field
                label="Distance to city center"
                type="number"
                step="0.1"
                value={house.distance_to_city_center}
                onChange={(value) =>
                  updateHouse(
                    index,
                    "distance_to_city_center",
                    value
                  )
                }
                error={errors[index]?.distance_to_city_center}
              />

              <Field
                label="School rating"
                type="number"
                step="0.1"
                value={house.school_rating}
                onChange={(value) =>
                  updateHouse(index, "school_rating", value)
                }
                error={errors[index]?.school_rating}
              />
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Predicting..." : "Predict prices"}
        </button>
      </form>
    </section>
  );
}

function Field({
  label,
  type = "text",
  step,
  value,
  onChange,
  error
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
      />

      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}