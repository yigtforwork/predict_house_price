import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const MODEL_API_URL =
  process.env.MODEL_API_URL ||
  "http://localhost:8000";

const historyFile = path.join(
  process.cwd(),
  "..",
  "history",
  "estimates.csv"
);

export async function POST(request) {
  try {
    const houses = await request.json();

    if (!Array.isArray(houses)) {
      return NextResponse.json(
        { error: "Request body must be an array." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${MODEL_API_URL}/predict`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(houses),
        cache: "no-store"
      }
    );

    if (!response.ok) {
      const message = await response.text();

      return NextResponse.json(
        {
          error:
            message || "Model server prediction failed."
        },
        { status: response.status }
      );
      }
      const predictions = await response.json();
    await appendHistory(predictions);

    return NextResponse.json(predictions);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error.message ||
          "Unable to process prediction."
      },
      { status: 500 }
    );
  }
}

async function appendHistory(predictions) {
  await fs.mkdir(
    path.dirname(historyFile),
    { recursive: true }
  );

  let existing = "";

  try {
    existing = await fs.readFile(
      historyFile,
      "utf8"
    );
  } catch {
    existing =
      "timestamp,id,square_footage,bedrooms,bathrooms,year_built,lot_size,distance_to_city_center,school_rating,price\n";
  }

  const rows = predictions.map((house) => {
    return [
      new Date().toISOString(),
      house.id,
      house.square_footage,
      house.bedrooms,
      house.bathrooms,
      house.year_built,
      house.lot_size,
      house.distance_to_city_center,
      house.school_rating,
      house.price
    ]
      .map(csvEscape)
      .join(",");
  });

  await fs.writeFile(
    historyFile,
    existing.trimEnd() +
      "\n" +
      rows.join("\n") +
      "\n",
    "utf8"
  );
}

function csvEscape(value) {
  const text = String(value ?? "");

  if (
    text.includes(",") ||
    text.includes('"') ||
    text.includes("\n")
  ) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}