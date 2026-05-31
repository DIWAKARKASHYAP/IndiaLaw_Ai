// lib/embeddings.ts
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Document } from "langchain/document";
import { ChunkMetadata } from "./chunker";

/**
 * Gemini embedding model.
 * "text-embedding-004" is Google's latest embedding model.
 * It produces 768-dimensional vectors.
 */
const embeddingModel = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY!,
  modelName: "text-embedding-004",
});

export interface EmbeddedChunk {
  document: Document<ChunkMetadata>; // original chunk with metadata
  embedding: number[];               // 768-dimensional float vector
  id: string;                        // unique ID for Pinecone storage
}

/**
 * Embeds an array of Document chunks using Gemini.
 *
 * We process in batches of 20 to avoid hitting API rate limits.
 *
 * @param documents - Chunks from chunkText() in lib/chunker.ts
 * @returns         - Array of EmbeddedChunk objects (doc + vector + id)
 */
export async function embedChunks(
  documents: Document<ChunkMetadata>[]
): Promise<EmbeddedChunk[]> {
  if (documents.length === 0) {
    throw new Error("No documents provided for embedding.");
  }

  const BATCH_SIZE = 20; // Gemini allows up to 100, but 20 is safe
  const results: EmbeddedChunk[] = [];

  console.log(`[Embeddings] Starting embedding of ${documents.length} chunks...`);

  // Process documents in batches to avoid rate limits
  for (let i = 0; i < documents.length; i += BATCH_SIZE) {
    const batch = documents.slice(i, i + BATCH_SIZE);

    // Extract just the text content for the API call
    const texts = batch.map((doc) => doc.pageContent);

    // Call Gemini Embeddings API — returns number[][] (one vector per text)
    const vectors = await embeddingModel.embedDocuments(texts);

    // Zip each document with its embedding vector
    batch.forEach((doc, batchIndex) => {
      const globalIndex = i + batchIndex;

      results.push({
        document: doc,
        embedding: vectors[batchIndex],
        // Unique ID: fileName + chunkIndex (safe for Pinecone)
        id: generateChunkId(doc.metadata.fileName, globalIndex),
      });
    });

    console.log(
      `[Embeddings] Batch ${Math.floor(i / BATCH_SIZE) + 1} done ` +
        `(${Math.min(i + BATCH_SIZE, documents.length)}/${documents.length} chunks)`
    );

    // Small delay between batches to be kind to the API
    if (i + BATCH_SIZE < documents.length) {
      await delay(500);
    }
  }

  console.log(`[Embeddings] ✅ All ${results.length} chunks embedded.`);
  return results;
}

/**
 * Embeds a single query string (used during RAG retrieval in Phase 5).
 * The query vector is compared against stored chunk vectors in Pinecone.
 *
 * @param query - The user's question
 * @returns     - A single embedding vector (number[])
 */
export async function embedQuery(query: string): Promise<number[]> {
  if (!query || query.trim().length === 0) {
    throw new Error("Query cannot be empty.");
  }

  const vector = await embeddingModel.embedQuery(query);
  console.log(`[Embeddings] Query embedded: "${query.slice(0, 60)}..."`);
  return vector;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Creates a deterministic, Pinecone-safe ID from fileName + index.
 * Pinecone IDs must be strings with no special characters.
 */
function generateChunkId(fileName: string, index: number): string {
  // Remove extension, replace spaces/dots with dashes, lowercase
  const safeName = fileName
    .replace(/\.[^/.]+$/, "")   // remove .pdf
    .replace(/[^a-zA-Z0-9]/g, "-") // replace special chars
    .toLowerCase()
    .slice(0, 40);               // limit length

  return `${safeName}-chunk-${index}`;
}

/** Simple promise-based delay */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}