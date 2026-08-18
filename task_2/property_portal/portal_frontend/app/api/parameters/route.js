import { NextResponse } from "next/server";

const MODEL_API_URL =
  process.env.MODEL_API_URL ||
  "http://localhost:8000";

export async function GET() {
  try {
    const response = await fetch(
      `${MODEL_API_URL}/parameters`,
      {
        cache: "no-store"
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Unable to retrieve model parameters."
        },
        { status: response.status }
      );
    }

    const parameters = await response.json();

    return NextResponse.json(parameters);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message
      },
      { status: 500 }
    );
  }
}