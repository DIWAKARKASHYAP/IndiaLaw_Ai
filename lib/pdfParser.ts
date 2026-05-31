// lib/pdfParser.ts
import pdf from "pdf-parse";

/**
 * Extracts plain text from a PDF buffer.
 * @param buffer - The raw bytes of the uploaded PDF file
 * @returns An object with the extracted text and page count
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<{
  text: string;
  numPages: number;
  fileName?: string;
}> {
  try {
    const data = await pdf(buffer);

    // data.text contains all the raw text from the PDF
    // data.numpages is the total number of pages
    const cleanedText = data.text
      .replace(/\n{3,}/g, "\n\n") // collapse excessive blank lines
      .trim();

    if (!cleanedText || cleanedText.length === 0) {
      throw new Error(
        "No readable text found in PDF. It may be a scanned image-only PDF."
      );
    }

    return {
      text: cleanedText,
      numPages: data.numpages,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`PDF extraction failed: ${message}`);
  }
}