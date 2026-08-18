import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const historyFile = path.join(
  process.cwd(),
  "..",
  "history",
  "estimates.csv"
);

export async function GET() {
  try {
    const content = await fs.readFile(
      historyFile,
      "utf8"
    );

    const lines = content
      .trim()
      .split("\n");

    if (lines.length <= 1) {
      return NextResponse.json([]);
    }

    const headers = lines[0].split(",");

    const rows = lines
      .slice(1)
      .filter(Boolean)
      .map((line) => {
        const values = line.split(",");

        return headers.reduce((row, header, index) => {
          row[header] = values[index];
          return row;
        }, {});
      });

    return NextResponse.json(rows.reverse());
  } catch (error) {
    return NextResponse.json(
      [],
      { status: 200 }
    );
  }
}