import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { questionText, subject, chapter } = await req.json();

    if (!questionText) {
      return NextResponse.json({ error: "Question text required" }, { status: 400 });
    }

    // Heuristic conceptual hint generator (pluggable with Gemini API)
    const hintTemplates = [
      `Recall the fundamental NCERT rule for ${chapter || subject}: look closely at the boundary conditions or exceptions.`,
      `Eliminate options that violate standard physical units or direct NCERT textbook definitions.`,
      `Think about the underlying mechanism in ${subject}: does this involve active transport, equilibrium shift, or vector direction?`,
    ];

    const selectedHint = hintTemplates[Math.floor(Math.random() * hintTemplates.length)];

    return NextResponse.json({
      hint: selectedHint,
      suggestedTags: [subject, chapter, "NCERT-HighYield"].filter(Boolean),
    });
  } catch {
    return NextResponse.json({ error: "Failed to generate hint" }, { status: 500 });
  }
}