import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { question } = body;

const prompt = `
You are an Indian Legal Assistant.

Answer legal questions clearly.

If possible:
1. Mention relevant law.
2. Mention relevant section.
3. Keep answers beginner-friendly.
4. Do not give final legal advice.
5. Add a disclaimer.

Question:
${question}
`;

const result = await model.generateContent(prompt);

    const response = result.response.text();

    return NextResponse.json({
      answer: response,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}