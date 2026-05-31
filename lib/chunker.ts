// lib/chunker.ts
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "langchain/document";

/**
 * Configuration for the text splitter.
 * - chunkSize: max characters per chunk (1000)
 * - chunkOverlap: characters shared between adjacent chunks (200)
 *   Overlap ensures context isn't lost at chunk boundaries.
 */
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,

  // These separators are tried in order — paragraph → sentence → word → char
  separators: ["\n\n", "\n", " ", ""],
});

export interface ChunkMetadata {
  fileName: string;
  chunkIndex: number;
  totalChunks?: number;
  charStart?: number;
}

/**
 * Splits a large text string into overlapping Document chunks.
 *
 * @param text     - The full extracted text from a PDF
 * @param fileName - The original PDF filename (stored in metadata)
 * @returns        - Array of LangChain Document objects ready for embedding
 */
export async function chunkText(
  text: string,
  fileName: string
): Promise<Document<ChunkMetadata>[]> {
  if (!text || text.trim().length === 0) {
    throw new Error("Cannot chunk empty text.");
  }

  // Split the text into raw string chunks
  const rawChunks = await splitter.splitText(text);

  if (rawChunks.length === 0) {
    throw new Error("Text splitting produced no chunks.");
  }

  // Wrap each chunk in a LangChain Document with metadata
  const documents: Document<ChunkMetadata>[] = rawChunks.map(
    (chunkContent, index) => {
      return new Document<ChunkMetadata>({
        pageContent: chunkContent,
        metadata: {
          fileName,         // which PDF this came from
          chunkIndex: index, // position in the document (for citations)
          totalChunks: rawChunks.length,
        },
      });
    }
  );

  console.log(
    `[Chunker] "${fileName}" → ${documents.length} chunks created ` +
      `(chunkSize=1000, overlap=200)`
  );

  return documents;
}