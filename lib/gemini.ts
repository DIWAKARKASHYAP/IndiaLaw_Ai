import { GoogleGenerativeAI } from "@google/generative-ai";

function getGeminiApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not set. Add it to your environment variables."
    );
  }
  return apiKey;
}

export function getGeminiModel() {
  const genAI = new GoogleGenerativeAI(getGeminiApiKey());
  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });
}

