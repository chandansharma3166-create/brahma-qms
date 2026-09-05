import { NextResponse } from "next/server";
import { SEED_QUESTIONS } from "../../../data/seedQuestions";

export async function GET() {
  const sheetCsvUrl = process.env.GOOGLE_SHEETS_CSV_URL;

  // Fallback to local high-yield seed data if no Sheets URL is configured
  if (!sheetCsvUrl) {
    return NextResponse.json({
      source: "LOCAL_SEED",
      count: SEED_QUESTIONS.length,
      questions: SEED_QUESTIONS,
    });
  }

  try {
    const res = await fetch(sheetCsvUrl, { next: { revalidate: 60 } });
    if (!res.ok) {
      throw new Error(`Sheets fetch failed with status: ${res.status}`);
    }

    const csvText = await res.text();
    const rows = csvText
      .split("\n")
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    // Skip header row and map rows to questions
    const parsedQuestions = rows.slice(1).map((row, index) => {
      const cols = row.split(",").map((c) => c.replace(/^"|"$/g, "").trim());
      return {
        id: cols[0] || `SHEET-${index + 1}`,
        subject: (cols[1]?.toUpperCase() || "BIOLOGY") as "BIOLOGY" | "PHYSICS" | "CHEMISTRY",
        chapter: cols[2] || "General NCERT",
        topic: cols[3] || "Core Theory",
        questionType: "MCQ" as const,
        questionText: cols[4] || "Empty question stem",
        options: [
          { id: "A", text: cols[5] || "Option A", isCorrect: cols[9]?.toUpperCase() === "A" },
          { id: "B", text: cols[6] || "Option B", isCorrect: cols[9]?.toUpperCase() === "B" },
          { id: "C", text: cols[7] || "Option C", isCorrect: cols[9]?.toUpperCase() === "C" },
          { id: "D", text: cols[8] || "Option D", isCorrect: cols[9]?.toUpperCase() === "D" },
        ],
        explanation: cols[10] || "NCERT Reference explanation pending.",
        difficulty: (cols[11]?.toUpperCase() || "MEDIUM") as "EASY" | "MEDIUM" | "HARD",
        source: cols[12] || "Google Sheets Sync",
        tags: ["Sheets-Sync"],
      };
    });

    return NextResponse.json({
      source: "GOOGLE_SHEETS",
      count: parsedQuestions.length,
      questions: parsedQuestions,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Failed to read Google Sheet",
        fallback: true,
        questions: SEED_QUESTIONS,
      },
      { status: 500 }
    );
  }
}