import pg from "pg";

import { exigir } from "./config.ts";

export const pool = new pg.Pool({
  connectionString: exigir("DATABASE_URL"),
  allowExitOnIdle: true,
});

const STATEMENTS = [
  "CREATE EXTENSION IF NOT EXISTS vector",
  `CREATE TABLE IF NOT EXISTS chunks (
     id        bigserial PRIMARY KEY,
     fonte     text        NOT NULL,
     titulo    text        NOT NULL,
     conteudo  text        NOT NULL,
     embedding vector(384) NOT NULL,
     criado_em timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS chunks_embedding_idx
     ON chunks USING hnsw (embedding vector_cosine_ops)`,
];

export async function initSchema(): Promise<void> {
  for (const stmt of STATEMENTS) {
    await pool.query(stmt);
  }
  console.log("schema pronto");
}

/** O formato de texto do pgvector é '[0.1,0.2,...]' -- um array JSON. */
export function paraVetor(numeros: number[]): string {
  return JSON.stringify(numeros);
}

if (import.meta.main) {
  await initSchema();
  await pool.end();
}
