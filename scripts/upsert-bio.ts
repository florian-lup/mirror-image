#!/usr/bin/env tsx

import 'dotenv/config';

/**
 * Upsert bio.md chunks into Pinecone.
 *
 * Index: "flo"
 * Namespace: "bio"
 * Embedding model: text-embedding-3-small (1536-D, cosine)
 *
 * Usage:
 *   pnpm run upsert          # or npm run upsert / yarn upsert
 *
 * Environment variables required (see README or .env.local):
 *   OPENAI_API_KEY        – OpenAI secret key
 *   PINECONE_API_KEY      – Pinecone secret key
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import process from 'node:process';

// External SDKs
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

// ────────────────────────────────────────────────────────────────────────────────
// Config ✏️ adjust if needed
// ────────────────────────────────────────────────────────────────────────────────
const INDEX_NAME = 'flo';
const NAMESPACE = 'bio';
const EMBEDDING_MODEL = 'text-embedding-3-small';
const SOURCE_FILE = path.resolve('documents', 'bio.md');

// ────────────────────────────────────────────────────────────────────────────────
// Entry point
// ────────────────────────────────────────────────────────────────────────────────
async function main() {
  const { OPENAI_API_KEY, PINECONE_API_KEY } = process.env;

  // Basic runtime checks to fail early if something is missing
  if (!OPENAI_API_KEY) throw new Error('Missing OPENAI_API_KEY');
  if (!PINECONE_API_KEY) throw new Error('Missing PINECONE_API_KEY');

  // Initialise SDK clients (both are lightweight)
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
  const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });

  // 1. Read markdown file
  const markdown = await fs.readFile(SOURCE_FILE, 'utf8');
  const chunks = splitMarkdown(markdown);
  console.log(`Split markdown into ${chunks.length} chunks`);

  // 2. Embed all chunks in one batch – OpenAI can handle up to 2048 inputs
  const { data: embeddings } = (await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: chunks,
  })) as { data: { embedding: number[] }[] };

  // 3. Build vectors to upsert
  const vectors = embeddings.map((item, i) => ({
    id: sha256(chunks[i]).slice(0, 16),
    values: item.embedding as number[],
    metadata: {
      text: chunks[i],
      source: 'bio.md',
      index: i,
    },
  }));

  // 4. Upsert into Pinecone
  const index = pinecone.index(INDEX_NAME).namespace(NAMESPACE);
  await index.upsert(vectors);
  console.log(`✔ Upserted ${vectors.length} vectors into ${INDEX_NAME}/${NAMESPACE}`);
}

// ────────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────────
function sha256(text: string) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

/**
 * Very simple markdown splitter.
 *   • Every heading ("#", "##" …) starts a new chunk.
 *   • Every list item ("- ") becomes its own chunk.
 *   • Otherwise we accumulate lines until ≈ 250 tokens (~ 1700 chars) then cut.
 */
function splitMarkdown(md: string): string[] {
  const approxTokenLimit = 250 * 4.5; // ~4.5 chars per token on average
  const chunks: string[] = [];
  let buffer: string[] = [];

  const push = () => {
    if (buffer.length) {
      chunks.push(buffer.join('\n').trim());
      buffer = [];
    }
  };

  for (const line of md.split('\n')) {
    if (/^#/.test(line) || /^- /.test(line)) {
      push();
      chunks.push(line.trim());
    } else {
      buffer.push(line);
      const charCount = buffer.reduce((acc, l) => acc + l.length, 0);
      if (charCount >= approxTokenLimit) push();
    }
  }
  push();
  return chunks.filter(Boolean);
}

// Execute if called directly (node scripts/upsert-bio.ts)
if (require.main === module) {
  main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
} 