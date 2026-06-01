import { NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { question } = body;
    if (!question || typeof question !== "string" || !question.trim()) {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    const prompt = `
You are NyayaAI, an Indian legal information assistant.

Your goal is to provide educational legal information related to Indian law.

Response rules:
1. Keep the answer clear and beginner-friendly.
2. Mention applicable Acts/rules and specific sections when reasonably known.
3. If the user's location/jurisdiction is unclear, ask a short follow-up question.
4. Never claim to be a lawyer and do not provide final legal advice.
5. End with a brief disclaimer: "This is general legal information, not legal advice."
6. If unsure, clearly say what is uncertain instead of guessing.

Question:
${question}
`;

    const model = getGeminiModel();
    const result = await model.generateContent(prompt);

    const response = result.response.text();

    return NextResponse.json({
      answer: response,
    });
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}