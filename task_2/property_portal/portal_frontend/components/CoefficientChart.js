"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine
} from "recharts";

export default function CoefficientChart({ parameters }) {
  const data = Object.entries(parameters)
    .filter(([key]) => key !== "intercept")
    .map(([name, value]) => ({
      name,
      value: Number(value)
    }));

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Regression Coefficients
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Intercept:{" "}
          <span className="font-semibold text-slate-700">
            {Number(parameters.intercept).toLocaleString()}
          </span>
        </p>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-20}
              textAnchor="end"
              height={80}
            />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={0} stroke="#64748b" />
            <Bar dataKey="value" fill="#7c3aed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}