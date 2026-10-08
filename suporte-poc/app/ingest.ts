import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

import { RAIZ } from "./config.ts";
import { initSchema, paraVetor, pool } from "./db.ts";
import { embed } from "./embeddings.ts";

const DOCS = join(RAIZ, "docs");

/**
 * Agrupa paragrafos ate se aproximar de `tamanho` caracteres.
 *
 * Cortar em numero fixo de caracteres parte frases no meio e o trecho
 * recuperado fica incompreensivel. Paragrafo e a unidade natural aqui.
 */
export function dividir(texto: string, tamanho = 900, sobreposicao = 150): string[] {
  const paragrafos = texto
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
  const chunks: string[] = [];
  let atual = "";

  for (const paragrafo of paragrafos) {
    if (atual && atual.length + paragrafo.length + 2 > tamanho) {
      chunks.push(atual);
      const cauda = sobreposicao ? atual.slice(-sobreposicao) : "";
      atual = cauda ? `${cauda}\n\n${paragrafo}` : paragrafo;
    } else {
      atual = atual ? `${atual}\n\n${paragrafo}` : paragrafo;
    }
  }

  if (atual) chunks.push(atual);
  return chunks;
}

type Registro = { fonte: string; titulo: string; conteudo: string };

async function ingerir(): Promise<void> {
  await initSchema();
  await pool.query("TRUNCATE chunks"); // ingestao idempotente: recarrega do zero

  const registros: Registro[] = [];
  const arquivos = (await readdir(DOCS)).filter((a) => a.endsWith(".md")).sort();
  for (const arquivo of arquivos) {
    const texto = await readFile(join(DOCS, arquivo), "utf-8");
    const titulo = texto.split("\n")[0].replace(/^#+/, "").trim();
    for (const conteudo of dividir(texto)) {
      registros.push({ fonte: arquivo, titulo, conteudo });
    }
  }

  if (registros.length === 0) {
    throw new Error("nenhum documento encontrado em docs/");
  }

  console.log(`gerando embeddings para ${registros.length} chunks...`);
  const vetores = await embed(registros.map((r) => r.conteudo));

  for (const [i, { fonte, titulo, conteudo }] of registros.entries()) {
    await pool.query(
      "INSERT INTO chunks (fonte, titulo, conteudo, embedding) VALUES ($1, $2, $3, $4)",
      [fonte, titulo, conteudo, paraVetor(vetores[i])],
    );
  }

  console.log(`${registros.length} chunks inseridos`);
}

if (import.meta.main) {
  await ingerir();
  await pool.end();
}
