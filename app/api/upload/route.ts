// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdfParser";

export const runtime = "nodejs"; // Required: pdf-parse needs Node.js runtime

export async function POST(req: NextRequest) {
  try {
    // 1. Parse the incoming multipart form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    // 2. Validate that a file was actually sent
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded. Please attach a PDF." },
        { status: 400 }
      );
    }

    // 3. Validate file type — only PDFs allowed
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: `Invalid file type: "${file.type}". Only PDF files are accepted.` },
        { status: 400 }
      );
    }

    // 4. Validate file size — reject files over 10MB
    const MAX_SIZE_MB = 10;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_SIZE_MB}MB.` },
        { status: 400 }
      );
    }

    // 5. Convert the File object to a Node.js Buffer (what pdf-parse needs)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 6. Extract text from the PDF
    const { text, numPages } = await extractTextFromPDF(buffer);

    // 7. Return success response with the extracted text
    return NextResponse.json(
      {
        success: true,
        fileName: file.name,
        numPages,
        characterCount: text.length,
        text, // ← This will be used by Phase 2 (chunking)
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unexpected server error";

    console.error("[Upload API Error]", message);

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}