"use client";

import { useEffect, useState } from "react";
import PredictionForm from "@/components/PredictionForm";
import PredictionTable from "@/components/PredictionTable";
import PredictionChart from "@/components/PredictionChart";
import CoefficientChart from "@/components/CoefficientChart";
import HistoryTable from "@/components/HistoryTable";
import { getParameters, getHistory } from "@/lib/api";

export default function EstimatorPage() {
  const [parameters, setParameters] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      const [parameterData, historyData] = await Promise.all([
        getParameters(),
        getHistory()
      ]);

      setParameters(parameterData);
      setHistory(historyData);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handlePredictions(results) {
    setPredictions(results);
    loadData();
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Property Value Estimator
          </h1>

          <p className="mt-2 text-slate-600">
            Estimate house prices using the deployed linear regression model.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-8">
          <PredictionForm onPredictions={handlePredictions} />

          {predictions.length > 0 && (
            <>
              <PredictionTable predictions={predictions} />
              <PredictionChart predictions={predictions} />
            </>
          )}

          {parameters && (
            <CoefficientChart parameters={parameters} />
          )}

          <HistoryTable history={history} />
        </div>
      </div>
    </div>
  );
}